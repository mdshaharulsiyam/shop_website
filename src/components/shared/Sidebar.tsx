"use client"

import { useGetCategoriesWithSubQuery } from '@/Redux/apis/categorySlice'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useState } from "react"

const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["clothes"])
  const { data } = useGetCategoriesWithSubQuery(undefined)
  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  const menuItems = [
    {
      id: "fashion",
      title: "FASHION",
      items: [
        {
          name: "Clothes",
          icon: "👕",
          hasSubmenu: true,
          subItems: ["T-Shirts", "Jeans", "Dresses", "Jackets", "Sweaters"],
        },
        {
          name: "Shoes",
          icon: "👠",
          hasSubmenu: true,
          subItems: ["Sneakers", "Boots", "Sandals", "Heels"],
        },
        {
          name: "Glasses",
          icon: "🕶️",
          hasSubmenu: true,
          subItems: ["Sunglasses", "Reading Glasses", "Blue Light Glasses"],
        },
        {
          name: "Bags",
          icon: "👜",
          hasSubmenu: true,
          subItems: ["Handbags", "Backpacks", "Wallets", "Travel Bags"],
        },
        {
          name: "Hat",
          icon: "🎩",
          hasSubmenu: true,
          subItems: ["Baseball Caps", "Beanies", "Sun Hats"],
        },
      ],
    },
    {
      id: "beauty",
      title: "BEAUTY",
      items: [
        {
          name: "Makeup",
          icon: "💄",
          hasSubmenu: true,
          subItems: ["Lipstick", "Foundation", "Mascara", "Eyeshadow"],
        },
        {
          name: "Cosmetics",
          icon: "💅",
          hasSubmenu: true,
          subItems: ["Skincare", "Nail Polish", "Perfume", "Face Masks"],
        },
      ],
    },
    {
      id: "bakery",
      title: "BAKERY",
      items: [
        {
          name: "Cake",
          icon: "🍰",
          hasSubmenu: true,
          subItems: ["Birthday Cakes", "Cupcakes", "Cheesecakes", "Wedding Cakes"],
        },
        {
          name: "Bread",
          icon: "🍞",
          hasSubmenu: true,
          subItems: ["White Bread", "Whole Wheat", "Sourdough", "Bagels"],
        },
      ],
    },
    {
      id: "vegetables",
      title: "VEGETABLES",
      items: [
        {
          name: "Tuber Root",
          icon: "🥔",
          hasSubmenu: true,
          subItems: ["Potatoes", "Sweet Potatoes", "Carrots", "Radishes"],
        },
        {
          name: "Tomato",
          icon: "🍅",
          hasSubmenu: true,
          subItems: ["Cherry Tomatoes", "Roma Tomatoes", "Beefsteak"],
        },
      ],
    },
    {
      id: "fruits",
      title: "FRUITS",
      items: [
        {
          name: "Lemon",
          icon: "🍋",
          hasSubmenu: true,
          subItems: ["Fresh Lemons", "Lemon Juice", "Dried Lemons"],
        },
      ],
    },
  ]

  return (
    <div className="w-64 h-full bg-slate-800 text-white overflow-y-auto shadow-xl rounded-r-2xl">
      <div className="p-4">
        {menuItems.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"

          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{section.title}</h3>
            <ul className="space-y-1">
              {section.items.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => toggleExpanded(item.name)}
                >
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors group">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {item.hasSubmenu && (
                      <motion.button

                        className="p-1 hover:bg-slate-600 rounded"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <motion.div
                          animate={{ rotate: expandedItems.includes(item.name) ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      </motion.button>
                    )}
                  </div>
                  <AnimatePresence>
                    {item.hasSubmenu && expandedItems.includes(item.name) && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-8 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.subItems?.map((subItem, subIndex) => (
                          <motion.li
                            key={subItem}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                            className="p-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 rounded cursor-pointer transition-colors"
                          >
                            {subItem}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
