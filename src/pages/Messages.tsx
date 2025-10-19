import { useState, useEffect, useRef } from 'react'
import { useGetAllConversationsQuery, useGetConversationMessagesQuery, useSendMessageMutation } from '@/Redux/apis/messageSlice'
import { Avatar, Input, Button, Empty, Spin, Badge } from 'antd'
import { SendOutlined, UserOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import toast from 'react-hot-toast'
import { io, Socket } from 'socket.io-client'
import { server } from '@/Redux/baseApi'
import { useGlobalContext } from '@/providers/ContextProvider'

const BASE_URL = server

const Messages = () => {
  const { user } = useGlobalContext()
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [message, setMessage] = useState('')
  const [socket, setSocket] = useState<Socket | null>(null)
  const [onlineUsers, setOnlineUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const userId = user?._id
  
  const { data: conversations, isLoading: loadingConversations } = useGetAllConversationsQuery({ page: 1, limit: 50 })
  const { data: messages, isLoading: loadingMessages, refetch: refetchMessages } = useGetConversationMessagesQuery(
    { conversationId: selectedConversation?._id },
    { skip: !selectedConversation }
  )
  const [sendMessage, { isLoading: sending }] = useSendMessageMutation()

  // Socket connection
  useEffect(() => {
    if (!userId) {
      console.log('No userId available for socket connection')
      return
    }

    console.log('Attempting socket connection to:', BASE_URL, 'with userId:', userId)
    
    const newSocket = io(BASE_URL, {
      query: { user_id: userId },
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })
    
    newSocket.on('connect', () => {
      console.log('Socket connected successfully:', newSocket.id)
    })

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error)
    })

    newSocket.on('get-online-user', (users: string[]) => {
      console.log('Online users updated:', users)
      setOnlineUsers(users)
    })

    // Listen for general new message event
    newSocket.on('new-message', (data) => {
      console.log('New message received (general):', data)
      refetchMessages()
    })

    newSocket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason)
    })

    setSocket(newSocket)

    return () => {
      console.log('Cleaning up socket connection')
      newSocket.disconnect()
    }
  }, [userId, refetchMessages])

  // Listen for conversation-specific messages
  useEffect(() => {
    if (!socket || !selectedConversation) return

    const eventName = `new-message::${selectedConversation._id}`
    console.log('Listening for messages on:', eventName)
    
    const handleNewMessage = (data: any) => {
      console.log('New message in conversation:', data)
      refetchMessages()
    }

    socket.on(eventName, handleNewMessage)

    return () => {
      socket.off(eventName, handleNewMessage)
    }
  }, [socket, selectedConversation, refetchMessages])

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages?.data])

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedConversation) return

    try {
      await sendMessage({
        conversation_id: selectedConversation._id,
        message: message.trim()
      }).unwrap()
      
      setMessage('')
      
      // Emit socket event
      if (socket) {
        socket.emit('send-message', {
          conversationId: selectedConversation._id,
          users: selectedConversation.users
        })
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Failed to send message')
    }
  }

  const getOtherUser = (conversation: any) => {
    return conversation?.users?.find((u: any) => String(u._id) !== String(userId))
  }

  const isUserOnline = (user: any) => {
    return onlineUsers.includes(user?._id)
  }

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Messages</h1>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]'>
        {/* Conversation List - Hidden on mobile when conversation is selected */}
        <div className={`bg-white rounded-lg shadow overflow-y-auto ${
          selectedConversation ? 'hidden md:block' : 'block'
        }`}>
          <div className='p-4 border-b'>
            <h2 className='font-semibold'>Conversations</h2>
          </div>
          
          {loadingConversations ? (
            <div className='flex justify-center p-8'>
              <Spin />
            </div>
          ) : conversations?.data?.length > 0 ? (
            <div>
              {conversations.data.map((conv: any) => {
                const otherUser = getOtherUser(conv)
                const isOnline = isUserOnline(otherUser)
                const isSelected = selectedConversation?._id === conv._id
                
                return (
                  <div
                    key={conv._id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className='flex items-center gap-3'>
                      <Badge dot={isOnline} status={isOnline ? 'success' : 'default'}>
                        <Avatar
                          size={48}
                          src={otherUser?.img ? `${BASE_URL}/${otherUser.img}` : undefined}
                          icon={!otherUser?.img && <UserOutlined />}
                        />
                      </Badge>
                      <div className='flex-1'>
                        <h3 className='font-medium'>{otherUser?.name || 'Unknown'}</h3>
                        <p className='text-sm text-gray-500'>{otherUser?.email || ''}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <Empty description='No conversations yet' className='mt-8' />
          )}
        </div>

        {/* Chat Area - Hidden on mobile when no conversation is selected */}
        <div className={`md:col-span-2 bg-white rounded-lg shadow flex flex-col ${
          selectedConversation ? 'block' : 'hidden md:flex'
        }`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className='p-4 border-b'>
                <div className='flex items-center gap-3'>
                  {/* Back button - only visible on mobile */}
                  <Button
                    type='text'
                    icon={<ArrowLeftOutlined />}
                    onClick={() => setSelectedConversation(null)}
                    className='md:hidden'
                  />
                  <Badge dot={isUserOnline(getOtherUser(selectedConversation))} status='success'>
                    <Avatar
                      size={40}
                      src={getOtherUser(selectedConversation)?.img ? 
                        `${BASE_URL}/${getOtherUser(selectedConversation).img}` : undefined}
                      icon={<UserOutlined />}
                    />
                  </Badge>
                  <div>
                    <h3 className='font-semibold'>{getOtherUser(selectedConversation)?.name}</h3>
                    <p className='text-xs text-gray-500'>
                      {isUserOnline(getOtherUser(selectedConversation)) ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className='flex-1 overflow-y-auto p-4 space-y-4' style={{ maxHeight: 'calc(600px - 140px)' }}>
                {loadingMessages ? (
                  <div className='flex justify-center items-center h-full'>
                    <Spin />
                  </div>
                ) : messages?.data?.length > 0 ? (
                  <>
                    {messages.data.map((msg: any) => {
                      const senderId = typeof msg.sender === 'object' ? msg.sender._id : msg.sender
                      const isMine = String(senderId) === String(userId)
                      return (
                        <div
                          key={msg._id}
                          className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[70%] rounded-lg p-3 ${
                              isMine 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {msg.img && (
                              <img
                                src={`${BASE_URL}/${msg.img}`}
                                alt='attachment'
                                className='max-w-full rounded mb-2'
                              />
                            )}
                            {msg.message && <p>{msg.message}</p>}
                            <p className={`text-xs mt-1 ${isMine ? 'text-blue-100' : 'text-gray-500'}`}>
                              {new Date(msg.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <Empty description='No messages yet. Start the conversation!' />
                )}
              </div>

              {/* Input */}
              <div className='p-4 border-t'>
                <div className='flex gap-2'>
                  <Input
                    placeholder='Type a message...'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onPressEnter={handleSendMessage}
                    disabled={sending}
                  />
                  <Button
                    type='primary'
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                    loading={sending}
                    disabled={!message.trim()}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className='flex items-center justify-center h-full'>
              <Empty description='Select a conversation to start messaging' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
