import { useGlobalContext } from '@/providers/ContextProvider'
import type { IBadge } from '@/types/propsTypes'


const Badges = ({ title, classnames, styles }: IBadge) => {
  const { themeColor } = useGlobalContext()
  return (
    <div className={`absolute -top-2 -left-2  px-3 py-1 rounded-full text-sm font-semibold ${classnames}`} style={{
      backgroundColor: themeColor?.black,
      color: themeColor?.white,
      ...styles
    }}>
      {title}
    </div>
  )
}

export default Badges
