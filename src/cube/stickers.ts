import { ColorName, ColorCode } from '../colors';
import { ICubeOptionsComplete } from './options';
import { makeMasking } from './masking';
import { CubeData } from './simulation';
import { parseAlgorithm, parseCase, Turn } from './parsing/algorithm';
import { AllFaces, Masking } from './constants';

const applyMask = (options: ICubeOptionsComplete, cube: CubeData, mask: Masking) => {
  if(!options.mask) return;
  cube.faces = cube.faces.map(face => {

  });
};

// TODO: Cognitive Complexity is 25, needs to be reduced!
// eslint-disable-next-line import/prefer-default-export
export function makeStickerColors(options: ICubeOptionsComplete): string[] {
  let stickerColors: string[] = options.stickerColors || [];
  let mask = options.mask ? makeMasking(options.mask, options.cubeSize) : null;
  const maskColor = typeof options.maskColor === 'string'
    ? options.maskColor
    : ColorCode.DarkGray;

  if (mask && options.maskAlg) {
    const maskCubeData = new CubeData(options.cubeSize, mask);
    const alg = parseAlgorithm(options.maskAlg);
    alg.forEach((turn) => {
      maskCubeData.turn(turn);
    });
    mask = maskCubeData.faces;
  }

  // Fill with color scheme if sticker colors not predefined.
  if (stickerColors.length === 0) {
    // TODO: refactor, this is dodgy code
    stickerColors = [].concat.apply(
      [],
      AllFaces.map((face) => Array.apply(
        null,
        Array(options.cubeSize * options.cubeSize),
      ).map(() => options.colorScheme[face])),
    );
  }

  const faceMappedStickers: {[key: number]: string[] } = AllFaces.reduce((acc, face) => {
    if (!acc[face]) acc[face] = [];

    for (let i = 0; i < options.cubeSize; i++) {
      for (let j = 0; j < options.cubeSize; j++) {
        const faceIndex = AllFaces.indexOf(face);
        const stickerNumber = i * options.cubeSize + j;
        const colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber;

        if (stickerColors.length <= colorIndex) {
          acc[face][options.cubeSize * i + j] = ColorName.Black;
        } else {
          acc[face][options.cubeSize * i + j] = stickerColors[colorIndex];
        }

        if (mask && !mask[face][options.cubeSize * i + j]) {
          acc[face][options.cubeSize * i + j] = maskColor;
        }
      }
    }
    return acc;
  }, {});

  console.log('FaceMappedStickers: ', faceMappedStickers);
  //  ------------- Apply Algorithm -------------
  const cubeData = new CubeData(options.cubeSize, faceMappedStickers);

  let alg: Turn[] = [];

  if (options.case) {
    alg = parseCase(options.case);
  } else if (options.algorithm) {
    alg = parseAlgorithm(options.algorithm);
  }

  alg.forEach((move) => {
    cubeData.turn(move);
  });
  // ------------- Apply Algorithm -------------

  //return [...AllFaces.map((face) => cubeData.faces[face])];

  return [].concat.apply(
    [],
    AllFaces.map((face) => cubeData.faces[face].slice()),
  );
}
