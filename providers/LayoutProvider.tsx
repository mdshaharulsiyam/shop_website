import React from 'react'

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = React.useState(false)

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  return (
    <div>
      {children}
    </div>
  )
}

export default LayoutProvider
