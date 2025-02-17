import { Axis } from '../math';
import { Arrow } from './models/arrow';
import { Masking } from './constants';
import { FaceletDefinition } from '../constants';

/**
 * Options for the cube, so the input can be simplified and the rest can be filled in with defaults.
 */
export interface ICubeOptions {
  dist?: number;
  algorithm?: string;
  case?: string;
  backgroundColor?: string;
  cubeColor?: string;
  outlineWidth?: number;
  strokeWidth?: number;
  cubeSize?: number;
  cubeOpacity?: number;
  stickerOpacity?: number;
  colorScheme?: { [face: number]: string };
  maskColor?: string;
  stickerColors?: string[];
  facelets?: string[] | FaceletDefinition[];
  viewportRotations?: [Axis, number][];
  view?: string;
  width?: number;
  height?: number;
  mask?: Masking;
  maskBeforeAlgorithm?: boolean;
  maskAlg?: string;
  arrows?: Arrow[] | string;
  viewbox?: {
    // SVG viewbox settings
    x: number;
    y: number;
    width: number;
    height: number;
  };
}
/**
 * The options for the cube.
 * This has all the options required to create the cube.
 */
export interface ICubeOptionsComplete {
  cubeSize: number;
  width: number;
  height: number;
  viewportRotations: [Axis, number][];
  colorScheme: { [face: number]: string };
  cubeColor: string;
  cubeOpacity: number;
  stickerOpacity: number;
  dist: number;
  outlineWidth: number;
  strokeWidth: number;

  viewbox: {
    // SVG viewbox settings
    x: number;
    y: number;
    width: number;
    height: number;
  };

  algorithm?: string;
  case?: string;
  backgroundColor?: string;
  maskColor?: string;
  stickerColors?: string[];
  facelets?: FaceletDefinition[];
  view?: string;
  mask?: Masking;
  maskBeforeAlgorithm?: boolean;
  maskAlg?: string;
  arrows?: Arrow[] | string;
}
