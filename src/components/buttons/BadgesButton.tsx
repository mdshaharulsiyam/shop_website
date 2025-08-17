import { useGlobalContext } from '@/providers/ContextProvider'
import type { IBadgesButton } from '@/types/propsTypes'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
const BadgesButton = ({ count, icon, handler }: IBadgesButton) => {
  const { themeColor } = useGlobalContext()
  return (
    <Button variant="ghost" size="icon" className="relative cursor-pointer" onClick={handler}>
      {icon}
      <motion.span
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{
          backgroundColor: themeColor.red,
          color: themeColor.white
        }}
        className="absolute -top-1 -right-1 text-xs rounded-full h-4 w-4 flex items-center justify-center"
      >
        {count}
      </motion.span>
    </Button>
  )
}

export default BadgesButton
