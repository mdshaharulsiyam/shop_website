import { Button } from '@/components/ui/button'
import type { IProfilePopup } from '@/types/propsTypes'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Settings, User, UserCircle } from 'lucide-react'
import { FaShippingFast } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const ProfilePopup = ({ setShowProfileMenu, showProfileMenu }: IProfilePopup) => {
  return (
    <div className="relative cursor-pointer">
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
            <Link
              to={`/order`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaShippingFast className="h-4 w-4 mr-3" />
              My Order
            </Link>
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

  )
}

export default ProfilePopup
