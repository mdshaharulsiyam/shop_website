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
export interface IOrder {
  "name": string,
  "image": string,
  "quantity": number,
  "price": number,
  "total_price": number
  "payment_by": string,
  "isPaid": boolean
}

export interface IProductFromApi {
  _id: string;
  name: string;
  price: number;
  discount: number;
  img: string[];
}

export interface IGroup {
  label: string;
  products: IProductFromApi[];
}
export interface IProfile {
  _id: string;
  name: string;
  email: string;
  phone: string;
  img: string | null;
  role: "SUPER_ADMIN" | "ADMIN" | "USER" | string; // extendable
  block: boolean;
  is_verified: boolean;
  provider: "CREDENTIAL" | "GOOGLE" | "FACEBOOK" | string;
  accessToken: string;
  use_type: "BASIC" | "PREMIUM" | "PRO" | string; // extendable
  is_identity_verified: boolean;
  documents: string[]; // assuming document IDs or URLs
}
