import { useGlobalContext } from '@/providers/ContextProvider';
import type { INavLink } from '@/types/propsTypes'; //
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';
const MenuLink = ({ href, title, children, className, style }: INavLink) => {
  const { themeColor } = useGlobalContext();
  return (
    <motion.div
      style={{
        color: themeColor.gray,
        ...style
      }}
      className={`font-medium transition-colors flex justify-start items-center cursor-pointer ${className}`}
      whileHover={{
        color: themeColor.black,
      }}
    >
      {href ? <NavLink to={href}>
        {title}
      </NavLink> : <p

      >{title}</p>}
      {href ? <NavLink to={href}>
        {children}
      </NavLink> : children}
    </motion.div>
  )
}

export default MenuLink
