import { IThemeColor } from './dataTypes';

export interface IContextData {
  theme: string,
  themeColor: IThemeColor
}

export interface INextPrevButtonProps {
  handler: () => void,
  icon?: React.ReactNode,
  style?: React.CSSProperties,
  classNames?: string
}
export interface IIconButton extends INextPrevButtonProps {

}