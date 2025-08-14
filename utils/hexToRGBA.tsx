export const hexToRGBA = (hex: string, alpha: number) => {
  let r = parseInt(hex.substring(1, 3), 16);
  let g = parseInt(hex.substring(3, 5), 16);
  let b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
export const hexToRGBA1 = (hex: string) => hexToRGBA(hex, 0.1);
export const hexToRGBA2 = (hex: string) => hexToRGBA(hex, 0.2);
export const hexToRGBA3 = (hex: string) => hexToRGBA(hex, 0.3);
export const hexToRGBA4 = (hex: string) => hexToRGBA(hex, 0.4);
export const hexToRGBA5 = (hex: string) => hexToRGBA(hex, 0.5);
export const hexToRGBA6 = (hex: string) => hexToRGBA(hex, 0.6);
export const hexToRGBA7 = (hex: string) => hexToRGBA(hex, 0.7);
export const hexToRGBA8 = (hex: string) => hexToRGBA(hex, 0.8);
export const hexToRGBA9 = (hex: string) => hexToRGBA(hex, 0.9);
export const hexToRGBA10 = (hex: string) => hexToRGBA(hex, 1);