import {toHex} from './encode';

type RGB = {r: number; g: number; b: number};
export function hexToRGB(hex: number | string): RGB | null {
  const num = Number(hex);
  if (typeof num !== 'number') return null;
  return {
    b: num & 0xff,
    g: (num >> 8) & 0xff,
    r: (num >> 16) & 0xff,
  };
}

export function rgbToHex(red: number, green: number, blue: number): string {
  const num = ((red << 16) & 0xff) | ((green << 8) & 0xff) | (blue & 0xff);
  return toHex(num);
}
