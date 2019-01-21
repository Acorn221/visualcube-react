import { CubeData } from './cube/simulation';
import * as SVG from 'svg.js'
import { makeCubeGeometry } from './cube/geometry';
import { Vec3, Axis } from './math';
import { renderCube, renderArrow } from './cube/drawing';
import { ICubeOptions } from './cube/options';
import { DefaultColorScheme, AllFaces, Face, JapaneseColorScheme } from './cube/constants';
import { ColorName, ColorCode } from './constants';
import { parseAlgorithm } from './cube/parsing/algorithm';
import { Arrow } from './cube/models/arrow';
import { StickerDefinition } from './cube/models/sticker';
import { arrowPattern } from './cube/parsing/arrow';

// $DEFAULTS = Array(
//   'fmt'   => 'svg',
//   'pzl'   => '3',
//   'size'  => '128',
//   'view'  => '',
//   'stage' => '',
//   'r'     => 'y45x-34',
//   'alg'   => '',
//   'case'  => '',
//   'fd'    => '',
//   'fc'    => '',
//   'sch'   => 'yrbwog',
//   'bg'    => 'white',
//   'cc'    => 'black',
//   'co'    => '100',
//   'fo'    => '100',
//   'dist'  => '5',
// );

// Outline width
let outlineWidth = 0.94;

// Stroke width
let strokeWidth = 0;

// Viewport
let ox = -0.9;
let oy = -0.9;
let vw = 1.8;
let vh = 1.8;
let dist = 5;

let cubeOpacity = 100;

// Default rotation sequence
let viewportRotation: [Axis, number][] = [
  [Axis.Y, 45],
  [Axis.X, -34],
];

let cubeSize = 3;
let centerTranslation: Vec3 = [-cubeSize/2, -cubeSize/2, -cubeSize/2];
let zPosition: Vec3 = [0, 0, dist];

function makeStickerColors(options: ICubeOptions): string[] {
  let stickerColors = options.stickerColors;
  
  // Fill with color scheme if sticker colors not predefined.
  if (!stickerColors) {
    stickerColors = [].concat.apply([], AllFaces.map(face => {
      return Array.apply(null, Array(options.cubeSize * options.cubeSize)).map(() => options.colorScheme[face])
    }));
  }

  let faceMappedStickers = AllFaces.reduce((acc, face) => {
    if (!acc[face]) acc[face] = [];

    for (let i = 0; i < options.cubeSize; i++) {
      for (let j = 0; j < options.cubeSize; j++) {
        const faceIndex = AllFaces.indexOf(face);
        const stickerNumber = (i * options.cubeSize) + j;
        const colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber;

        if (stickerColors.length <= colorIndex) {
          acc[face][(options.cubeSize * i) + j] = ColorName.Black;
        } else {
          acc[face][(options.cubeSize * i) + j] = stickerColors[colorIndex];
        }
      }
    }

    return acc;
  }, {});

  // Apply Algorithm
  let cubeData = new CubeData(options.cubeSize, faceMappedStickers);
  let alg = parseAlgorithm(options.algorithm);

  alg.forEach(move => {
    cubeData.turn(move);
  });

  return [].concat.apply([], AllFaces.map(face => cubeData.faces[face].slice()));
}

(SVG as any).on(document, 'DOMContentLoaded', function() {
  
  let u0: StickerDefinition = {
    face: Face.U,
    n: 0
  };

  let u2: StickerDefinition = {
    face: Face.U,
    n: 2
  }

  let u8: StickerDefinition = {
    face: Face.U,
    n: 8
  }

  let r6: StickerDefinition = {
    face: Face.R,
    n: 6
  }

  let r2: StickerDefinition = {
    face: Face.R,
    n: 2
  }

  let r0: StickerDefinition = {
    face: Face.R,
    n: 0
  }

  let options: ICubeOptions = {
    algorithm: 'S2 M2 E2',
    cubeColor: 'black',
    cubeSize: cubeSize,
    cubeOpacity: cubeOpacity,
    strokeWidth: strokeWidth,
    outlineWidth: outlineWidth,
    colorScheme: DefaultColorScheme,
    // stickerColors: [].concat.apply([], AllFaces.map(face => test.faces[face].slice())),
    stickerOpacity: 100,
    centerTranslation: centerTranslation,
    zPosition: zPosition,
    viewportRotations: viewportRotation,
    backgroundColor: 'white',
    width: 512,
    height: 512,
    viewbox: {
      x: ox,
      y: oy,
      width: vw,
      height: vh
    },
    arrows: 'U0U2,U2U8,R6R2R0-s8-i5-yellow'
  };

  let geometry = makeCubeGeometry(options);
  options.stickerColors = makeStickerColors(options); // Colors of stickers after algorithms / masking applies

  renderCube('drawing', geometry, options);
})