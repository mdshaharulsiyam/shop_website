import type React from 'react'
import type { IOrder, IProduct, IProfile, IThemeColor } from './dataTypes'
import type { SetState } from './functionsTypes'


export interface IContextData {
  theme: string,
  themeColor: IThemeColor,
  width: number,
  height: number,
  user:IProfile |undefined
}

export interface IOrderCard {
  item: {
    id?: string,
    _id?: string,
    name: string,
    image: string,
    quantity: number,
    price: number,
  },
  type?: 'order' | 'checkout',
  handler?: (id: string, count: number) => void,
  removeHandler?: (id: string) => void,
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
export interface ICategorySub {
  name: string,
  _id: string,
  subCategories: {
    name: string,
    _id: string
  }[]
}
export interface IDropdownMenuTitle {
  setShowMenu: (show: boolean) => void,
  showMenu: boolean,
  title: string,
  data: ICategorySub[]
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
  data: ICategorySub[]

}
export interface IMapTitleMenu {
  data: Array<{
    name: string,
    _id: string,
    subCategories: {
      name: string,
      _id: string
    }[]
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
  data: IProductDetails
}
export interface IProductDetails {
  _id: string;
  name: string;
  description: string;
  sort_description: string;
  price: number;
  discount: number;
  img: string[];
  category: ICategory;
  sub_category: ISubCategory;
  is_approved: boolean;
  is_featured: boolean;
  stock: number;
  user: IUser;
  business: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
  attributes: IProductAttribute[];
}

export interface ICategory {
  _id: string;
  name: string;
  img: string[];
  label: string;
  parent_id: string | null;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISubCategory {
  _id: string;
  name: string;
  img: string[];
  parent_id: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  img: string | null;
  password: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'VENDOR' | 'CUSTOMER' | string;
  block: boolean;
  provider: 'CREDENTIAL' | 'GOOGLE' | 'FACEBOOK' | string;
  accessToken: string;
  use_type: 'BASIC' | 'PREMIUM' | string;
  is_identity_verified: boolean;
  documents: string[];
  stripe: string | null;
}

export interface IProductAttribute {
  _id: string;
  name: string;
  value: string[];
  product_attribute_id: string;
}

export interface ICartCard {
  item: {
    id?: string,
    name: string,
    price: number,
    image: string,
    quantity?: number,
    total_price?: number,
    variants?: { name: string; value: string }[]
  },
  setOpen: (arg: boolean) => void,
  removeHandler?: (id: string) => void
}