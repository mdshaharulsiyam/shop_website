import { useGlobalContext } from '@/providers/ContextProvider'
import type { INextPrevButtonProps } from '@/types/propsTypes'
import IconButton from './IconButton'
const NextPrevButton = ({ handler, icon, style, classNames, parentClassNames, parentStyle }: INextPrevButtonProps) => {
  const { themeColor } = useGlobalContext()
  return (
    <div
      style={{
        backgroundColor: themeColor.white,
        ...parentStyle
      }}
      className={`absolute -left-4 top-1/2 transform -translate-y-1/2  rounded-full transition-colors z-10 cursor-pointer ${parentClassNames}`}
    >
      <IconButton
        handler={handler}
        icon={icon}
        style={style}
        classNames={classNames}
      />
    </div>
  )
}

export default NextPrevButton
