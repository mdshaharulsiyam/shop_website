import { navbarData } from '@/constant/data'
import { useGlobalContext } from '@/providers/ContextProvider'

import type { IMobileMenu } from '@/types/propsTypes'
import { hexToRGBA2, hexToRGBA5 } from '@/utils/hexToRGBA'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MenuLink from '../Links/MenuLink'
import MapTitleMenu from './MapTitleMenu'

const MobileMenu = ({ showMobileMenu, setShowCategoriesMenu, showCategoriesMenu, setShowPagesMenu, showPagesMenu, data }: IMobileMenu) => {
  const { themeColor } = useGlobalContext()
  return (
    <AnimatePresence >
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          style={{
            borderColor: hexToRGBA2(themeColor.black),
            position: 'relative',
          }}
          className="lg:hidden border-t"
        >
          <div
            className="space-y-4 p-4 overflow-y-auto"
            style={{
              maxHeight: '70vh',
              scrollbarWidth: 'thin',
              scrollbarColor: `${themeColor.black} ${themeColor.black}20`,
            }}
          >
            {
              navbarData?.map((item, index) => {
                if (item?.type === "link") {
                  return (
                    <MenuLink
                      key={item.title + index + item?.href}
                      href={item.href}
                      title={item.title}
                    />
                  )
                }
                if (item?.type === "dropdown_title" && item?.title === 'Categories') {
                  return <div>
                    <button
                      onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                      style={{
                        color: hexToRGBA5(themeColor.black)
                      }}
                      className="flex items-center justify-between w-full font-medium transition-colors"
                    >
                      {item?.title}
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
                          <MapTitleMenu data={data} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                }
                if (item?.type === "dropdown_title") {
                  return <div>
                    <button
                      style={{
                        color: hexToRGBA5(themeColor.black)
                      }}
                      onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
                      className="flex items-center justify-between w-full  font-medium transition-colors"
                    >
                      {item?.title}
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
                          <MapTitleMenu data={data} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                }
                if (item?.type === "dropdown" && Array.isArray(item?.options) && item?.options?.length > 0) {
                  return <div>
                    <button
                      style={{
                        color: hexToRGBA5(themeColor.black)
                      }}
                      onClick={() => setShowPagesMenu(!showPagesMenu)}
                      className="flex items-center justify-between w-full  font-medium transition-colors"
                    >
                      {item?.title}
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
                          {item?.options.map((item2, index) => (
                            <MenuLink
                              href={item2?.href}
                              title=''
                              className='font-normal block'
                            >
                              <motion.p
                                whileHover={{ color: themeColor.black }}
                                key={item2?.href + item2?.title + index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.2, delay: index * 0.05 }}
                                className=" px-4 py-2 text-sm transition-colors"
                              >
                                {item2?.title}
                              </motion.p>
                            </MenuLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                }
              })
            }
          </div>
          {/* Fade effect at the bottom */}
          <div
            className="w-full h-8 sticky bottom-0 left-0 right-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${themeColor.white} 0%, transparent 100%)`,
              marginTop: '-2rem',
            }}
          />
          {/* Custom scrollbar styling */}
          <style>{`
            [style*="max-height: 70vh"]::-webkit-scrollbar {
              width: 4px;
            }
            [style*="max-height: 70vh"]::-webkit-scrollbar-track {
              background: ${themeColor.black}10;
              border-radius: 2px;
            }
            [style*="max-height: 70vh"]::-webkit-scrollbar-thumb {
              background: ${themeColor.black}50;
              border-radius: 2px;
            }
            [style*="max-height: 70vh"]::-webkit-scrollbar-thumb:hover {
              background: ${themeColor.black}70;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MobileMenu
