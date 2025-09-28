"use client"

import { useGetCategoryGroupQuery } from '@/Redux/apis/categorySlice'
import { imageUrl } from '@/Redux/baseApi'
import { AnimatePresence, motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useState } from "react"
interface ILabel {
  label: string;
  category: ICategory[];
}

interface ICategory {
  _id: string;
  name: string;
  img?: string | null;
  subCategories: ISubCategory[];
}

interface ISubCategory {
  _id: string;
  name: string;
  parent_id: string;
}
const Sidebar = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>(["clothes"])
  const { data } = useGetCategoryGroupQuery({})
  const toggleExpanded = (item: string) => {
    setExpandedItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }
  console.log({ data })
  return (
    <div className="w-64 h-full bg-slate-800 text-white overflow-y-auto shadow-xl rounded-r-2xl">
      <div className="p-4">
        {data?.data?.map((section: ILabel) => (
          <motion.div
            key={section?.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"

          >
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{section?.label}</h3>
            <ul className="space-y-1">
              {section?.category?.map((item, index) => (
                <motion.li
                  key={item?.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => toggleExpanded(item?.name)}
                >
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-700 cursor-pointer transition-colors group">
                    <div className="flex items-center space-x-3">
                      {/* <span className="text-lg">{item.icon}</span> */}
                      <img className='h-5 w-5' src={imageUrl(item?.img?.[0] + "")} />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {item?.subCategories?.length > 0 && (
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
                    {item?.subCategories?.length > 0 && expandedItems.includes(item.name) && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="ml-8 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.subCategories?.map((subItem, subIndex) => (
                          <motion.li
                            key={subItem?._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                            className="p-2 text-sm text-gray-300 hover:text-white hover:bg-slate-700 rounded cursor-pointer transition-colors"
                          >
                            {subItem?.name}
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
