import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import React from 'react'

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = React.useState(false)

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default LayoutProvider
