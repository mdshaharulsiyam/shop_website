import { useGlobalContext } from '@/providers/ContextProvider'
import type { IDropdownMenuTitle } from '@/types/propsTypes'
import { hexToRGBA2 } from '@/utils/hexToRGBA'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import MenuLink from '../Links/MenuLink'
import MapTitleMenu from '../shared/MapTitleMenu'

const DropdownMenuTitle = ({ setShowMenu, showMenu, data, title }: IDropdownMenuTitle) => {
  const { themeColor } = useGlobalContext()
  return (
    <div
      className="relative"
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
    >
      <MenuLink
        title={title}
      >
        <motion.div animate={{ rotate: showMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 ml-1" />
        </motion.div>
      </MenuLink>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: themeColor.white,
              borderColor: hexToRGBA2(themeColor.black),
              maxHeight: '80vh',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              width: '100%',
              left: 0,
              right: 0,
              margin: '0 auto',
              maxWidth: '1440px',
              boxSizing: 'border-box',
              scrollbarColor: `${themeColor.black} ${themeColor.black}80`,
            }}
            className="fixed mt-2 rounded-lg shadow-xl border p-6 z-50"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              <MapTitleMenu data={data} />
            </div>
            {/* Custom scrollbar styling */}
            <style>{`
              .fixed::-webkit-scrollbar {
                width: 6px;
                height: 6px;
              }
              .fixed::-webkit-scrollbar-track {
                background: ${themeColor.black}19;
                border-radius: 10px;
              }
              .fixed::-webkit-scrollbar-thumb {
                background: ${themeColor.black};
                border-radius: 10px;
              }
              .fixed::-webkit-scrollbar-thumb:hover {
                opacity: 0.8;
              }
            `}</style>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default DropdownMenuTitle
