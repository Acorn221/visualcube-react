import {
  cubeRotations, TurnAbbreviation, AlgorithmUnit, possibleMoves,
} from '../constants';
import { TurnType } from '../simulation';

export interface Turn {
  move: AlgorithmUnit;
  turnType: TurnType;
  slices: number;
}

const turnRegex = /([2-9]+)?([UuFfRrDdLlBbMESxyz])(w)?(\d+'|'\d+|\d+|')?/g;

const Opposite = {
  [TurnType.Clockwise]: TurnType.CounterClockwise,
  [TurnType.CounterClockwise]: TurnType.Clockwise,
  [TurnType.Double]: TurnType.Double,
};

function getSlices(rawSlices, outerBlockIndicator): number {
  if (outerBlockIndicator && !rawSlices) {
    return 2;
  } if (!outerBlockIndicator && rawSlices) {
    throw new Error(
      'Invalid move: Cannot specify num slices if outer block move indicator \'w\' is not present',
    );
  } else if (!outerBlockIndicator && !rawSlices) {
    return 1;
  } else {
    return parseInt(rawSlices, 10);
  }
}

function getMove(rawFace: string): AlgorithmUnit {
  if (possibleMoves.indexOf(rawFace) < 0) {
    throw new Error(
      `Invalid move (${rawFace}): Possible turn faces are [U R F L D B M E S x y z]`,
    );
  } else return rawFace as AlgorithmUnit;
}

function getTurnType(rawType: string): TurnType {
  switch (rawType) {
    case TurnAbbreviation.Clockwise:
      return TurnType.Clockwise;
    case TurnAbbreviation.CounterClockwise:
      return TurnType.CounterClockwise;
    case TurnAbbreviation.Double:
    case TurnAbbreviation.DoubleCounter1:
    case TurnAbbreviation.DoubleCounter2:
      return TurnType.Double;
    default:
      // Attempt to parse non standard turn type
      // (for invalid but reasonable moves like "y3")
      let reversed = false;
      if (rawType.charAt(0) === "'") {
        reversed = true;
        rawType = rawType.substring(1, rawType.length);
      } else if (rawType.charAt(rawType.length - 1) === "'") {
        reversed = true;
      }

      let turns = parseInt(rawType, 10) % 4;

      if (Number.isNaN(turns)) {
        throw new Error(`Invalid move modifier (${rawType})`);
      }

      if (turns === 0) {
        return TurnType.None;
      }

      if (turns === 3) {
        reversed = !reversed;
        turns = 1;
      }

      if (turns === 2) {
        return TurnType.Double;
      }

      return reversed ? TurnType.CounterClockwise : TurnType.Clockwise;
  }
}

/**
 * Takes in an algorithm string and parses the turns from it
 * algorithm string format should be moves separated by a single space
 * (ex. "U R2 L' x")
 *
 * https://www.worldcubeassociation.org/regulations/#article-12-notation
 */
export function parseAlgorithm(algorithm: string): Turn[] {
  if (!algorithm) {
    return [];
  }
  const turns: Turn[] = [];
  let match;
  do {
    match = turnRegex.exec(algorithm);
    if (match) {
      const rawSlices: string = match[1];
      let rawFace: string = match[2];
      const outerBlockIndicator = match[3];
      const rawType = match[4] || TurnAbbreviation.Clockwise; // Default to clockwise
      const isLowerCaseMove = rawFace === rawFace.toLowerCase()
        && cubeRotations.indexOf(rawFace) === -1;

      if (isLowerCaseMove) {
        rawFace = rawFace.toUpperCase();
      }

      const turn: Turn = {
        move: getMove(rawFace),
        turnType: getTurnType(rawType),
        slices: isLowerCaseMove ? 2 : getSlices(rawSlices, outerBlockIndicator),
      };

      turns.push(turn);
    }
  } while (match);

  return turns;
}

export function parseCase(algorithm: string): Turn[] {
  return parseAlgorithm(algorithm)
    .map((turn) => <Turn>{
      turnType: Opposite[turn.turnType],
      move: turn.move,
      slices: turn.slices,
    })
    .reverse();
}
