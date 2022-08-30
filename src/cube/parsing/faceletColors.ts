import { parseColor } from './color';
import { ColorAbbreviationToCode } from '../../constants';

export function parseFaceletColors(rawValue: string): string[] {
  const colors = [];
  if (rawValue.indexOf(',') > -1) {
    // Parse as comma separated colors
    rawValue.split(',').forEach((value) => {
      const parsed = parseColor(value);
      if (parsed) {
        colors.push(parsed);
      }
    });
  } else {
    // parse as abbreviations (ex 'yyyyyyyyyrrrrrrrrrbbbbbbbbb....')
    for (let i = 0; i < rawValue.length; i++) {
      colors.push(ColorAbbreviationToCode[rawValue.charAt(i)]);
    }
  }
  return colors;
}
