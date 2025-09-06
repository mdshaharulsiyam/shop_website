import type { IOrder, IProduct, IThemeColor } from './dataTypes'
import type { SetState } from './functionsTypes'


export interface IContextData {
  theme: string,
  themeColor: IThemeColor,
  width: number,
  height: number
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
export interface IPaginationDots {
  slideNumber: number,
  setDirection: SetState<number>,
  setCurrentSlide: SetState<number>,
  currentSlide: number
}
export interface IProductCard {
  product: IProduct,
  index: number,
  isVisible: boolean
}

export interface IDetailsDescType {
  data: {
    "product_name": String,
    "sku": Number,
    "in_stock": Boolean,
    "images": Array<String>,
    "current_price": Number,
    "discount_percentage": Number,
    "original_price": Number,
    "ratings": {
      "average_rating": Number,
      "number_of_ratings": Number
    },
    "real_time_visitors": Number,
    "sale_timer": {
      "days": Number,
      "hours": Number,
      "minutes": Number,
      "seconds": Number
    },
    "product_description": String,
    "product_details": {
      "closure": String,
      "sole": String,
      "width": String,
      "outer_material": String
    },
    "available_sizes": Array<String>,
    "available_colors": Array<String>
  }

}

export interface ICartCard {
  item: {
    name: string,
    price: number,
    image: string
  }
}
export interface IOrderTable {
  status: string
}
export interface IOrderCard {
  item: IOrder
}