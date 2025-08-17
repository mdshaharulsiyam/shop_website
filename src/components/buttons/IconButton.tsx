
import { useGlobalContext } from '@/providers/ContextProvider'
import type { IIconButton } from '@/types/propsTypes'
import { hexToRGBA1 } from '@/utils/hexToRGBA'
import { motion } from "framer-motion"
import { ChevronLeft } from 'lucide-react'
const IconButton = ({ handler, icon, style, classNames }: IIconButton) => {
  const { themeColor } = useGlobalContext()
  return (
    <motion.button
      style={{
        backgroundColor: hexToRGBA1(themeColor.black),
        ...style
      }}
      onClick={handler}
      className={`rounded-full p-2 transition-colors z-10 cursor-pointer ${classNames}`}
    >
      {icon ? icon : <ChevronLeft style={{
        color: themeColor.black
      }} />}
    </motion.button>
  )
}

export default IconButton
