import SVG from 'svg.js';
import { ColorCode, ColorName } from '../colors';
import { FaceletToFace, FaceletToColor } from '../constants';
import {
  CubeGeometry,
  FaceStickers,
  FaceRotations,
  rotateFaces,
} from './geometry';
import {
  Vec3, transScale, scale, translate, radians2Degrees,
} from '../math';
import { Face, AllFaces } from './constants';
import { ICubeOptionsComplete } from './options';
import { Arrow } from './models/arrow';
import { parseArrows } from './parsing/arrow';

/**
 * Utility methods for rendering cube geometry using svg.js
 */

// Rotation vectors to track visibility of each face
const defaultFaceRotations: FaceRotations = {
  [Face.U]: [0, -1, 0],
  [Face.R]: [1, 0, 0],
  [Face.F]: [0, 0, -1],
  [Face.D]: [0, 1, 0],
  [Face.L]: [-1, 0, 0],
  [Face.B]: [0, 0, 1],
};

/**
 * Determines face render order based on z position. Faces further away
 * will render first so anything closer will be drawn on top.
 */
const getRenderOrder = (faceRotations: FaceRotations): Face[] => [...AllFaces].sort((a: Face, b: Face) => faceRotations[b][2] - faceRotations[a][2]);

function faceVisible(face: Face, rotations: FaceRotations) {
  return rotations[face][2] < -0.105;
}

function getCubeOutlineGroup(
  svg: SVG.Doc,
  options: ICubeOptionsComplete,
): SVG.G {
  const cubeOutlineGroup = svg.group();
  cubeOutlineGroup.opacity(options.cubeOpacity / 100);
  cubeOutlineGroup.attr({
    'stroke-width': '0.1',
    'stroke-linejoin': 'round',
  });
  return cubeOutlineGroup;
}

function getOllLayerGroup(svg: SVG.Doc, options: ICubeOptionsComplete): SVG.G {
  const group = svg.group();
  group.opacity(options.stickerOpacity / 100);
  group.attr({
    'stroke-opacity': '1',
    'stroke-width': 0.02,
    'stroke-linejoin': 'round',
  });
  return group;
}

const renderBackground = (svg: SVG.Doc, options: ICubeOptionsComplete) => {
  const backgroundSvg = svg.rect(options.viewbox.width, options.viewbox.height);
  backgroundSvg.x(options.viewbox.x);
  backgroundSvg.y(options.viewbox.y);
  if (!options.backgroundColor) {
    backgroundSvg.fill('none');
    backgroundSvg.opacity(0);
  } else {
    backgroundSvg.fill({
      color: options.backgroundColor,
    });
  }
};

function renderCubeOutline(
  svg: SVG.G,
  face: FaceStickers,
  options: ICubeOptionsComplete,
): SVG.Polygon {
  const cubeSize = face.length - 1;
  const width = options.outlineWidth;
  const outlinePoints = [
    [face[0][0][0] * width, face[0][0][1] * width],
    [face[cubeSize][0][0] * width, face[cubeSize][0][1] * width],
    [face[cubeSize][cubeSize][0] * width, face[cubeSize][cubeSize][1] * width],
    [face[0][cubeSize][0] * width, face[0][cubeSize][1] * width],
  ];
  const polygon = svg.polygon(outlinePoints);
  polygon.fill(options.cubeColor);
  polygon.stroke(options.cubeColor);
  return polygon;
}

/**
 * Starting with U, stickers are numbered from
 * their face starting with the top left corner
 * sticker.
 *
 * U Face
 * 1 | 2 | 3
 * ----------
 * 4 | 5 | 6
 * ----------
 * 7 | 8 | 9
 *
 * And so on for faces R, F, D, L, B.
 * So R's top left corner for a 3x3 cube would be # 10
 *
 * An individual sticker's color is obtained by indexing
 * into the array of sticker colors by the number the sticker is
 */
function getStickerColor(
  face: Face,
  row: number,
  col: number,
  options: ICubeOptionsComplete,
): string {
  const faceIndex = AllFaces.indexOf(face);
  const stickerNumber = row * options.cubeSize + col;
  const colorIndex = faceIndex * (options.cubeSize * options.cubeSize) + stickerNumber;

  if (!Array.isArray(options.facelets) && Array.isArray(options.stickerColors)) {
    if (options.stickerColors.length <= colorIndex) {
      return ColorName.Black;
    }

    return options.stickerColors[colorIndex];
  }

  if (Array.isArray(options.facelets)) {
    if (options.facelets.length <= colorIndex) {
      return ColorCode.DarkGray;
    }

    const fd = options.facelets[colorIndex];
    if (FaceletToFace[fd] != null) {
      const faceletFace = FaceletToFace[fd];
      return options.colorScheme[faceletFace];
    }
    if (fd !== 'o' && fd !== 'n' && fd !== 't') {
      return ColorCode.DarkGray;
    }
    return FaceletToColor[fd];
  }
  return options.colorScheme[face] || ColorName.Black;
}

function renderSticker(
  g: SVG.G,
  p1: Vec3,
  p2: Vec3,
  p3: Vec3,
  p4: Vec3,
  stickerColor: string,
  cubeColor: string,
): SVG.Polygon {
  const stickerPoints = [
    [p1[0], p1[1]],
    [p2[0], p2[1]],
    [p3[0], p3[1]],
    [p4[0], p4[1]],
  ];
  const polygon = g.polygon(stickerPoints);
  polygon.fill(stickerColor);
  polygon.stroke(cubeColor);
  return polygon;
}

function renderFaceStickers(
  svg: SVG.Doc,
  face: Face,
  stickers: FaceStickers,
  options: ICubeOptionsComplete,
): SVG.G {
  const cubeSize = stickers.length - 1;
  const group = svg.group();
  group.opacity(options.stickerOpacity / 100);
  group.attr({
    'stoke-opacity': '0.5',
    'stroke-width': options.strokeWidth,
    'stroke-linejoin': 'round',
  });

  for (let i = 0; i < cubeSize; i++) {
    for (let j = 0; j < cubeSize; j++) {
      const centerPoint: Vec3 = [
        (stickers[j][i][0] + stickers[j + 1][i + 1][0]) / 2,
        (stickers[j][i][1] + stickers[j + 1][i + 1][1]) / 2,
        0,
      ];

      // Scale points in towards centre
      const p1 = transScale(stickers[j][i], centerPoint, 0.85);
      const p2 = transScale(stickers[j + 1][i], centerPoint, 0.85);
      const p3 = transScale(stickers[j + 1][i + 1], centerPoint, 0.85);
      const p4 = transScale(stickers[j][i + 1], centerPoint, 0.85);

      const color = getStickerColor(face, i, j, options);
      if (color !== ColorName.Transparent) {
        renderSticker(group, p1, p2, p3, p4, color, options.cubeColor);
      }
    }
  }

  return group;
}

/**
 * Generates svg for an arrow pointing from sticker s1 to s2
 */
export function renderArrow(
  group: SVG.G,
  geometry: CubeGeometry,
  arrow: Arrow,
) {
  const cubeSize = geometry[0].length - 1;

  // Find center point for each facelet
  const p1y = Math.floor(arrow.s1.n / cubeSize);
  const p1x = arrow.s1.n % cubeSize;
  let p1: Vec3 = [
    (geometry[arrow.s1.face][p1x][p1y][0]
      + geometry[arrow.s1.face][p1x + 1][p1y + 1][0])
      / 2,
    (geometry[arrow.s1.face][p1x][p1y][1]
      + geometry[arrow.s1.face][p1x + 1][p1y + 1][1])
      / 2,
    0,
  ];

  const p2y = Math.floor(arrow.s2.n / cubeSize);
  const p2x = arrow.s2.n % cubeSize;
  let p2: Vec3 = [
    (geometry[arrow.s1.face][p2x][p2y][0]
      + geometry[arrow.s1.face][p2x + 1][p2y + 1][0])
      / 2,
    (geometry[arrow.s1.face][p2x][p2y][1]
      + geometry[arrow.s1.face][p2x + 1][p2y + 1][1])
      / 2,
    0,
  ];

  // Find midpoint between p1 and p2
  const center: Vec3 = [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2, 0];

  // Shorten arrows towards midpoint according to config
  p1 = transScale(p1, center, arrow.scale / 10);
  p2 = transScale(p2, center, arrow.scale / 10);

  let p3: Vec3 | null = null;
  if (arrow.s3) {
    const p3y = Math.floor(arrow.s3.n / cubeSize);
    const p3x = arrow.s3.n % cubeSize;
    p3 = [
      (geometry[arrow.s1.face][p3x][p3y][0]
        + geometry[arrow.s1.face][p3x + 1][p3y + 1][0])
        / 2,
      (geometry[arrow.s1.face][p3x][p3y][1]
        + geometry[arrow.s1.face][p3x + 1][p3y + 1][1])
        / 2,
      0,
    ];
    p3 = transScale(p3, center, arrow.influence / 5);
  }

  // Calculate arrow rotation
  const pR = p3 || p1;
  let rotation = pR[1] > p2[1] ? 270 : 90;
  if (p2[0] - pR[0] !== 0) {
    rotation = radians2Degrees(Math.atan((p2[1] - pR[1]) / (p2[0] - pR[0])));
    rotation = pR[0] > p2[0] ? rotation + 180 : rotation;
  }

  const lineMid = p3 ? `Q ${p3[0]},${p3[1]}` : 'L';
  const linePath = `M ${p1[0]},${p1[1]} ${lineMid} ${p2[0]},${p2[1]}`;
  const headPath = 'M 5.77,0.0 L -2.88,5.0 L -2.88,-5.0 L 5.77,0.0 z';

  if (arrow.outline) {
    // Draw line outline
    const outlineLineSvg = group.path(linePath);
    outlineLineSvg.fill('none');
    outlineLineSvg.stroke({
      color: arrow.outlineColor,
      opacity: arrow.outlineOpacity,
      width: arrow.width + arrow.outlineWidth,
    });

    // Draw arrow head
    const outlineHeadSvg = group.path(headPath);
    outlineHeadSvg.attr({
      transform: `translate(${p2[0]},${p2[1]}) scale(${
        (0.033 / cubeSize) + (arrow.width / 10) + (arrow.outlineWidth / 30)
      }) rotate(${rotation})`,
    });
    outlineHeadSvg.fill('none');
    outlineHeadSvg.stroke({
      color: arrow.outlineColor,
      opacity: arrow.outlineOpacity,
      width: arrow.width + arrow.outlineWidth * 50, // 30 is an arbitrary scaling factor, but it looks good
    });
  }

  // Draw line
  const lineSvg = group.path(linePath);
  lineSvg.fill('none');
  lineSvg.stroke({
    color: arrow.color,
    opacity: arrow.opacity,
    width: arrow.width,
  });

  // Draw arrow head
  const headSvg = group.path(headPath);
  headSvg.attr({
    transform: `translate(${p2[0]},${p2[1]}) scale(${
      (0.033 / cubeSize) + (arrow.width / 10)
    }) rotate(${rotation})`,
  });

  headSvg.style({
    fill: arrow.color,
    opacity: arrow.opacity,
  });
  headSvg.attr({
    'stroke-width': 0,
    'stroke-linejoin': 'round',
  });
}

function getArrowGroup(svg: SVG.Doc, cubeSize: number): SVG.G {
  const arrowGroup = svg.group();
  arrowGroup.attr({
    opacity: 1,
    'stroke-opacity': 1,
    'stroke-width': 0.12 / cubeSize,
    'stroke-linecap': 'round',
  });
  return arrowGroup;
}

// Renders the top rim of the R U L and B faces out from side of cube
export function renderOLLStickers(
  group: SVG.G,
  face: Face,
  stickers: FaceStickers,
  rotations: FaceRotations,
  options: ICubeOptionsComplete,
) {
  // Translation vector, to move faces out
  const v1 = scale(rotations[face], 0);
  const v2 = scale(rotations[face], 0.2);
  for (let i = 0; i < options.cubeSize; i++) {
    // find center point of sticker
    const centerPoint: Vec3 = [
      (stickers[i][0][0] + stickers[i + 1][1][0]) / 2,
      (stickers[i][0][1] + stickers[i + 1][1][1]) / 2,
      0,
    ];
    const p1 = translate(transScale(stickers[i][0], centerPoint, 0.94), v1);
    const p2 = translate(transScale(stickers[i + 1][0], centerPoint, 0.94), v1);
    const p3 = translate(transScale(stickers[i + 1][1], centerPoint, 0.94), v2);
    const p4 = translate(transScale(stickers[i][1], centerPoint, 0.94), v2);

    const stickerColor = getStickerColor(face, 0, i, options);

    if (stickerColor !== ColorName.Transparent) {
      renderSticker(group, p1, p2, p3, p4, stickerColor, options.cubeColor);
    }
  }
}

export const renderCube = (
  container: HTMLElement | string,
  geometry: CubeGeometry,
  options: ICubeOptionsComplete,
) => {
  const faceRotations = rotateFaces(
    defaultFaceRotations,
    options.viewportRotations,
  );
  const renderOrder = getRenderOrder(faceRotations);
  const svg = SVG(container as HTMLElement).size(options.width, options.height);
  svg.viewbox(
    options.viewbox.x,
    options.viewbox.y,
    options.viewbox.width,
    options.viewbox.height,
  );

  const hiddenFaces = renderOrder.filter(
    (face) => !faceVisible(face, faceRotations),
  );
  const visibleFaces = renderOrder.filter((face) => faceVisible(face, faceRotations));

  let cubeOutlineGroup: SVG.G;

  renderBackground(svg, options);
  // Render hidden faces if cube color has transparency
  if (options.cubeOpacity < 100) {
    cubeOutlineGroup = getCubeOutlineGroup(svg, options);
    hiddenFaces.forEach((face) => {
      renderFaceStickers(svg, face, geometry[face], options);
      renderCubeOutline(cubeOutlineGroup, geometry[face], options);
    });
  }

  cubeOutlineGroup = getCubeOutlineGroup(svg, options);
  visibleFaces.forEach((face) => {
    renderCubeOutline(cubeOutlineGroup, geometry[face], options);
    renderFaceStickers(svg, face, geometry[face], options);
  });

  if (options.view === 'plan') {
    const ollGroup = getOllLayerGroup(svg, options);
    [Face.R, Face.F, Face.L, Face.B].forEach((face) => {
      renderOLLStickers(ollGroup, face, geometry[face], faceRotations, options);
    });
  }

  const arrowGroup = getArrowGroup(svg, geometry[0].length - 1);
  let arrowDefinitions: Arrow[] = [];

  if (Array.isArray(options.arrows)) {
    arrowDefinitions = options.arrows;
  } else if (typeof options.arrows === 'string') {
    arrowDefinitions = parseArrows(options.arrows);
  }

  arrowDefinitions.map((opts) => new Arrow(opts)).forEach((arrow) => {
    renderArrow(arrowGroup, geometry, arrow);
  });

  return svg;
};
