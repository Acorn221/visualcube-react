import { Axis } from '../../math';
import { AxisSymbolToAxis } from '../constants';

export function parseRotationSequence(rawSequence: string): [Axis, number][] {
  const rotationRegex = /([xyz]-?[0-9][0-9]?[0-9]?)/g;
  let match;
  const rotations: [Axis, number][] = [];

  do {
    match = rotationRegex.exec(rawSequence);
    if (match) {
      const matchText: string = match[0];
      const axisSymbol = matchText.charAt(0);
      const value = matchText.substr(1);
      const axis = AxisSymbolToAxis[axisSymbol];
      rotations.push([axis, parseInt(value)]);
    }
  } while (match);

  return rotations;
}
