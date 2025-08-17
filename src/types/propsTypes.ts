import type { IThemeColor } from './dataTypes'


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
export interface IBadgesButton {
  handler: () => void,
  icon?: React.ReactNode,
  count: number | string
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

export interface IBadge {
  title: string,
  classnames?: string,
  styles?: React.CSSProperties
}

export interface IDropdownMenuTitle {
  setShowMenu: (show: boolean) => void,
  showMenu: boolean,
  title: string,
  data: Array<{
    title: string,
    items: string[]
  }>
}
export interface IDropdownMenu {
  setShowMenu: (show: boolean) => void,
  showMenu: boolean,
  title: string,
  data: Array<{ title: string, href: string, type: string }>
}

export interface INavLink {
  href?: string,
  title: string,
  children?: React.ReactNode,
  className?: string
  style?: React.CSSProperties
}
export interface IMobileMenu {
  showMobileMenu: boolean,
  setShowMobileMenu: (show: boolean) => void,
  setShowCategoriesMenu: (show: boolean) => void,
  showCategoriesMenu: boolean,
  setShowPagesMenu: (show: boolean) => void,
  showPagesMenu: boolean,
  data: Array<{
    title: string,
    items: string[]
  }>

}
export interface IMapTitleMenu {
  data: Array<{
    title: string,
    items: string[]
  }>
}
export interface IProfilePopup {
  setShowProfileMenu: (show: boolean) => void,
  showProfileMenu: boolean
}