import baseApis from '../baseApi';

const messageSlice = baseApis.injectEndpoints({
  endpoints: (builder) => ({
    // Get all conversations for current user
    getAllConversations: builder.query({
      query: (args?: { page?: number; limit?: number }) => ({
        url: 'conversation/get-all',
        method: 'GET',
        params: { page: args?.page || 1, limit: args?.limit || 50 }
      }),
      providesTags: ['Conversation']
    }),
    
    // Create or get conversation with a vendor
    createConversation: builder.mutation({
      query: (vendorId: string) => ({
        url: 'conversation/create',
        method: 'POST',
        body: { user: vendorId }
      }),
      invalidatesTags: ['Conversation']
    }),

    // Get all messages in a conversation
    getConversationMessages: builder.query({
      query: ({ conversationId, page = 1, limit = 50 }) => ({
        url: 'message/get-all',
        method: 'GET',
        params: { conversation_id: conversationId, page, limit }
      }),
      providesTags: ['Message']
    }),

    // Send a message
    sendMessage: builder.mutation({
      query: (messageData: { conversation_id: string; message?: string; img?: string }) => ({
        url: 'message/create',
        method: 'POST',
        body: messageData
      }),
      invalidatesTags: ['Message', 'Conversation']
    }),

    // Delete conversation
    deleteConversation: builder.mutation({
      query: (id: string) => ({
        url: `conversation/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Conversation']
    }),

    // Delete message
    deleteMessage: builder.mutation({
      query: (id: string) => ({
        url: `message/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message']
    })
  }),
});

export const {
  useGetAllConversationsQuery,
  useCreateConversationMutation,
  useGetConversationMessagesQuery,
  useSendMessageMutation,
  useDeleteConversationMutation,
  useDeleteMessageMutation
} = messageSlice;

export default messageSlice;
