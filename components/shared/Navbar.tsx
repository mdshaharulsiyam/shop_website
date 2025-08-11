"use client"

import { Button } from "@/components/ui/button"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Heart, LogOut, Menu, Search, Settings, ShoppingCart, User, UserCircle, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  toggleSideBar: () => void
  showSideBar: boolean
}

const Navbar = ({ toggleSideBar, showSideBar }: NavbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle */}
          <Button variant="ghost" size="icon" onClick={toggleSideBar}>
            <motion.div animate={{ rotate: showSideBar ? 180 : 0 }} transition={{ duration: 0.2 }}>
              {showSideBar ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Mantu</span>
          </div>
        </div>

        {/* Center navigation - hidden on mobile */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Home
          </a>
          <div className="relative group">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center transition-colors">
              Categories
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </a>
          </div>
          <div className="relative group">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center transition-colors">
              Products
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </a>
          </div>
          <div className="relative group">
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center transition-colors">
              Pages
              <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:rotate-180" />
            </a>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>

          {/* Profile dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onMouseEnter={() => setShowProfileMenu(true)}
              onMouseLeave={() => setShowProfileMenu(false)}
            >
              <User className="h-5 w-5" />
            </Button>

            <AnimatePresence>
              {showProfileMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                  onMouseEnter={() => setShowProfileMenu(true)}
                  onMouseLeave={() => setShowProfileMenu(false)}
                >
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <UserCircle className="h-4 w-4 mr-3" />
                    My Profile
                  </a>
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-3" />
                    Settings
                  </a>
                  <hr className="my-1" />
                  <a
                    href="#"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-3" />
                    Sign Out
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
            >
              3
            </motion.span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center"
            >
              2
            </motion.span>
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
