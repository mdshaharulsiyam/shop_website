"use client"

import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import { AnimatePresence, motion } from "framer-motion"
import React from "react"

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSideBar, setShowSideBar] = React.useState(true)

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AnimatePresence>
        {showSideBar && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 z-40 h-full py-10"
            >
              <Sidebar />
            </motion.div>

            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
              onClick={toggleSideBar}
            />
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        animate={{
          marginLeft: showSideBar ? (typeof window !== "undefined" && window.innerWidth >= 1024 ? 256 : 0) : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="min-h-screen px-4"
      >
        <Navbar toggleSideBar={toggleSideBar} showSideBar={showSideBar} />
        <main className="bg-gray-50">{children}</main>
      </motion.div>
    </div>
  )
}

export default LayoutProvider
