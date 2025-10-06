
import logo from '@/assets/logo.png'
import { Button } from "@/components/ui/button"
import { navbarData } from '@/constant/data'
import { useGlobalContext } from '@/providers/ContextProvider'
import { useGetCategoriesWithSubQuery } from '@/Redux/apis/categorySlice'
import { hexToRGBA2 } from '@/utils/hexToRGBA'
import { motion } from "framer-motion"
import { Menu, PanelsTopLeft, X } from "lucide-react"
import { useState } from "react"
import { Link } from 'react-router-dom'
import DropdownMenu from '../dropdown/DropdownMenu'
import DropdownMenuTitle from '../dropdown/DropdownMenuTitle'
import MenuLink from '../Links/MenuLink'
import MobileMenu from './MobileMenu'
import CartButton from './navbar/CartButton'
import ProfilePopup from './navbar/ProfilePopup'
import SearchIcon from './navbar/SearchIcon'
interface NavbarProps {
  toggleSideBar: () => void
  showSideBar: boolean
}

const Navbar = ({ toggleSideBar, showSideBar }: NavbarProps) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false)
  const [showPagesMenu, setShowPagesMenu] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { themeColor, user } = useGlobalContext()
  const { data } = useGetCategoriesWithSubQuery(undefined)
  // const categoriesData = data?.data?.map((item: any) => ({
  //   title: item.name,
  //   _id: item._id,
  //   items: item.subCategories.map((sub: any) => ({
  //     title: sub.name,
  //     _id: sub._id,
  //   })),
  // }))
  // const categoriesData = [
  //   {
  //     title: "Fashion",
  //     items: ["Clothes", "Shoes", "Accessories", "Bags", "Jewelry"],
  //   },
  //   {
  //     title: "Beauty",
  //     items: ["Makeup", "Skincare", "Perfumes", "Hair Care", "Nail Care"],
  //   },
  //   {
  //     title: "Electronics",
  //     items: ["Phones", "Laptops", "Headphones", "Cameras", "Gaming"],
  //   },
  //   {
  //     title: "Home & Living",
  //     items: ["Furniture", "Decor", "Kitchen", "Bedding", "Storage"],
  //   },
  // ]


  return (
    <nav className=" border-b px-4 py-3 sticky top-0 z-50 shadow-sm rounded-[10px]"
      style={{
        backgroundColor: themeColor.white,
        borderColor: hexToRGBA2(themeColor.black)
      }}
    >
      <div className="flex items-center justify-between">

        {/* Left section */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle */}
          <Button className='cursor-pointer' variant="ghost" size="icon" onClick={toggleSideBar}>
            <motion.div animate={{ rotate: showSideBar ? 0 : 0 }} transition={{ duration: 0.2 }}>
              <PanelsTopLeft size={24} color="currentColor" />
            </motion.div>
          </Button>

          {/* Logo */}
          <MenuLink
            title=''
            href='/'
          >
            <img
              src={logo}
              alt='Logo'
              width={40}
              height={40}
            />
          </MenuLink>
        </div>

        {/* Center navigation - hidden on mobile */}
        <div className="hidden lg:flex items-center space-x-8">
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
                return (
                  <DropdownMenuTitle
                    setShowMenu={setShowCategoriesMenu}
                    showMenu={showCategoriesMenu}
                    data={data?.data}
                    title="Categories"
                  />
                )
              }
              if (item?.type === "dropdown_title") {
                return (
                  <DropdownMenuTitle
                    setShowMenu={setShowCategoriesMenu}
                    showMenu={showCategoriesMenu}
                    data={data?.data}
                    title={item?.title}
                  />
                )
              }
              if (item?.type === "dropdown" && Array.isArray(item?.options) && item?.options?.length > 0) {
                return (
                  <DropdownMenu
                    setShowMenu={setShowPagesMenu}
                    showMenu={showPagesMenu}
                    data={item?.options}
                    title="Pages"
                  />
                )
              }
            })
          }
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">


          <SearchIcon />

          {
            user?._id ? <>

              {/* Profile dropdown */}
              <ProfilePopup
                setShowProfileMenu={setShowProfileMenu}
                showProfileMenu={showProfileMenu}
              />
              {/* <BadgesButton
            count={3}
            icon={<Heart className="h-5 w-5" />}
            handler={() => console.log('Heart button clicked')}
          /> */}
              <CartButton />
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowMobileMenu(!showMobileMenu)}>
                <motion.div animate={{ rotate: showMobileMenu ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.div>
              </Button>
            </> : <Link
              to={`/login`}
            >
              <Button className="cursor-pointer">
                Login
              </Button>
            </Link>
          }
        </div>
      </div>

      <MobileMenu
        showMobileMenu={showMobileMenu}
        setShowMobileMenu={setShowMobileMenu}
        setShowCategoriesMenu={setShowCategoriesMenu}
        showCategoriesMenu={showCategoriesMenu}
        setShowPagesMenu={setShowPagesMenu}
        showPagesMenu={showPagesMenu}
        data={data?.data}
      />
    </nav>
  )
}

export default Navbar
