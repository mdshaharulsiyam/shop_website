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