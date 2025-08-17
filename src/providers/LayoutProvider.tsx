"use client"

import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import { hexToRGBA1 } from '@/utils/hexToRGBA'
import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect } from "react"
import { Outlet } from 'react-router-dom'
import { useGlobalContext } from './ContextProvider'

const LayoutProvider = () => {
  const [showSideBar, setShowSideBar] = React.useState(false)
  const { themeColor } = useGlobalContext()
  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth >= 1024) {
        setShowSideBar(true)
      }

      const handleResize = () => {
        if (window.innerWidth >= 1024) {
          setShowSideBar(true)
        } else {
          setShowSideBar(false)
        }
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])
  return (
    <div className={`min-h-screen`}
      style={{
        backgroundColor: hexToRGBA1(themeColor.black)
      }}
    >
      {/* Sidebar */}
      <AnimatePresence>
        {showSideBar && (
          <>
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 z-40 h-full py-10 pt-16 sm:pt-10"
            >
              <Sidebar />
            </motion.div>

            {/* Mobile overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-30 bg-opacity-50 lg:hidden"
              style={{
                backgroundColor: themeColor.black
              }}
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
        <main className=" container mx-auto">
          <Outlet />
        </main>
      </motion.div>
    </div>
  )
}

export default LayoutProvider
