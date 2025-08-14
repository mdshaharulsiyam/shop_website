"use client"

import { Button } from "@/components/ui/button"
import { useGlobalContext } from '@/providers/ContextProvider'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, Heart, LogOut, Menu, PanelsTopLeft, Search, Settings, ShoppingCart, User, UserCircle, X } from "lucide-react"
import { useState } from "react"

interface NavbarProps {
  toggleSideBar: () => void
  showSideBar: boolean
}

const Navbar = ({ toggleSideBar, showSideBar }: NavbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false)
  const [showPagesMenu, setShowPagesMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { themeColor } = useGlobalContext()

  const categoriesData = [
    {
      title: "Fashion",
      items: ["Clothes", "Shoes", "Accessories", "Bags", "Jewelry"],
    },
    {
      title: "Beauty",
      items: ["Makeup", "Skincare", "Perfumes", "Hair Care", "Nail Care"],
    },
    {
      title: "Electronics",
      items: ["Phones", "Laptops", "Headphones", "Cameras", "Gaming"],
    },
    {
      title: "Home & Living",
      items: ["Furniture", "Decor", "Kitchen", "Bedding", "Storage"],
    },
  ]

  const pagesData = [
    "About Us",
    "Contact",
    "FAQ",
    "Privacy Policy",
    "Terms of Service",
    "Shipping Info",
    "Returns",
    "Size Guide",
  ]

  return (
    <nav className=" border-b border-gray-200 px-4 py-3 sticky top-0 z-50 shadow-sm rounded-[10px]"
      style={{
        backgroundColor: themeColor.white
      }}
    >
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle */}
          <Button className='cursor-pointer' variant="ghost" size="icon" onClick={toggleSideBar}>
            <motion.div animate={{ rotate: showSideBar ? 0 : 0 }} transition={{ duration: 0.2 }}>
              {/* {showSideBar ? <ListFilterPlus className="h-5 w-5" /> : <Menu className="h-5 w-5" />} */}
              <PanelsTopLeft size={24} color="currentColor" />
            </motion.div>
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Siyam</span>
          </div>
        </div>

        {/* Center navigation - hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-8">
          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Home
          </a>

          {/* Categories Mega Menu */}
          <div
            className="relative"
            onMouseEnter={() => setShowCategoriesMenu(true)}
            onMouseLeave={() => setShowCategoriesMenu(false)}
          >
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center transition-colors">
              Categories
              <motion.div animate={{ rotate: showCategoriesMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 ml-1" />
              </motion.div>
            </a>

            <AnimatePresence>
              {showCategoriesMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-1/2 transform -translate-x-1/2 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 p-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {categoriesData.map((category, index) => (
                      <motion.div
                        key={category.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <h3 className="font-semibold text-gray-900 mb-3">{category.title}</h3>
                        <ul className="space-y-2">
                          {category.items.map((item) => (
                            <li key={item}>
                              <a
                                href="#"
                                className="text-sm text-gray-600 hover:text-gray-900 transition-colors block py-1"
                              >
                                {item}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a href="#" className="text-gray-700 hover:text-gray-900 font-medium transition-colors">
            Products
          </a>

          {/* Pages Menu */}
          <div
            className="relative"
            onMouseEnter={() => setShowPagesMenu(true)}
            onMouseLeave={() => setShowPagesMenu(false)}
          >
            <a href="#" className="text-gray-700 hover:text-gray-900 font-medium flex items-center transition-colors">
              Pages
              <motion.div animate={{ rotate: showPagesMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4 ml-1" />
              </motion.div>
            </a>

            <AnimatePresence>
              {showPagesMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                >
                  {pagesData.map((page, index) => (
                    <motion.a
                      key={page}
                      href="#"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {page}
                    </motion.a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
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
          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
            <motion.div animate={{ rotate: showMobileMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
          >
            <div className="space-y-4">
              <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Home
              </a>

              {/* Mobile Categories */}
              <div>
                <button
                  onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Categories
                  <motion.div animate={{ rotate: showCategoriesMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showCategoriesMenu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 ml-4 space-y-3"
                    >
                      {categoriesData.map((category, index) => (
                        <motion.div
                          key={category.title}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <h4 className="font-medium text-gray-900 mb-2">{category.title}</h4>
                          <div className="ml-4 space-y-1">
                            {category.items.map((item) => (
                              <a
                                key={item}
                                href="#"
                                className="block text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="#" className="block text-gray-700 hover:text-gray-900 font-medium transition-colors">
                Products
              </a>

              {/* Mobile Pages */}
              <div>
                <button
                  onClick={() => setShowPagesMenu(!showPagesMenu)}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-gray-900 font-medium transition-colors"
                >
                  Pages
                  <motion.div animate={{ rotate: showPagesMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {showPagesMenu && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 ml-4 space-y-2"
                    >
                      {pagesData.map((page, index) => (
                        <motion.a
                          key={page}
                          href="#"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2, delay: index * 0.05 }}
                          className="block text-sm text-gray-600 hover:text-gray-900 transition-colors py-1"
                        >
                          {page}
                        </motion.a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Search */}
              <div className="pt-4 border-t border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
