export interface IThemeColor {
  gray: string,
  black: string,
  white: string,
  red: string,
  green: string,
  blue: string,
  yellow: string,
}
export interface ITheme {
  light: IThemeColor
}
export interface ICategory {
  title: string,
  discount: string,
  items: number,
  images: string[]
}
export interface IProduct {
  id: number,
  image: string,
  badge: { text: string, color: string },
  category: string,
  sizes: string[],
  name: string,
  originalPrice: number,
  salePrice: number,
  colors: string[],
  rating: number,
}