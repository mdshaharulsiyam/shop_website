import { useGlobalContext } from '@/providers/ContextProvider'
import { INextPrevButtonProps } from '@/types/propsTypes'
import IconButton from './IconButton'
const NextPrevButton = ({ handler, icon }: INextPrevButtonProps) => {
  const { themeColor } = useGlobalContext()
  return (
    <IconButton
      handler={handler}
      icon={icon}
    />
  )
}

export default NextPrevButton
