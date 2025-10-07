import { Button } from '@/components/ui/button'
import { useGlobalContext } from '@/providers/ContextProvider'
import type { IProfilePopup } from '@/types/propsTypes'
import { AnimatePresence, motion } from 'framer-motion'
import { LogOut, Package, User, UserCircle } from 'lucide-react'
import { FaShippingFast } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
const ProfilePopup = ({ setShowProfileMenu, showProfileMenu }: IProfilePopup) => {
  const { user } = useGlobalContext()
  const navigate = useNavigate()

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
            <Link
              to={`/profile`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <UserCircle className="h-4 w-4 mr-3" />
              My Profile
            </Link>
            <Link
              to={`/order`}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <FaShippingFast className="h-4 w-4 mr-3" />
              My Order
            </Link>
            {
               !user?.business?._id &&  <Link
               to="/register-seller"
               className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
             >
               <Package className="h-4 w-4 mr-3" />
               Sell Product
             </Link>
            }
           
            <hr className="my-1" />
            <button
              onClick={() => {
                localStorage.removeItem('token')
                navigate('/login')
              }}
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-4 w-4 mr-3" />
              Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>

  )
}

export default ProfilePopup
