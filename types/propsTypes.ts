import { IThemeColor } from './dataTypes';

export interface IContextData {
  theme: string,
  themeColor: IThemeColor
}
export interface IIconButton {
  handler: () => void,
  icon?: React.ReactNode,
  style?: React.CSSProperties,
  classNames?: string
}
export interface INextPrevButtonProps extends IIconButton {
  parentStyle?: React.CSSProperties,
  parentClassNames?: string
}

export interface IDiscountBadge {
  discount: string
}
export interface ICircleImage {
  image: string
}