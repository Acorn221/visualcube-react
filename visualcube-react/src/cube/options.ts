import { Axis } from './../math'
import { Arrow } from './models/arrow'
import { Masking } from './constants'
import { FaceletDefinition } from '../constants'

export interface ICubeOptions {
  dist?: number
  algorithm?: string
  case?: string
  backgroundColor?: string
  cubeColor?: string
  outlineWidth?: number
  strokeWidth?: number
  cubeSize?: number
  cubeOpacity?: number
  stickerOpacity?: number
  colorScheme?: { [face: number]: string }
  maskColor?: string
  stickerColors?: string[]
  facelets?: string[] | FaceletDefinition[]
  viewportRotations?: [Axis, number][]
  view?: string
  width?: number
  height?: number
  mask?: Masking
  maskAlg?: string
  arrows?: Arrow[] | string
  viewbox?: {
    // SVG viewbox settings
    x: number
    y: number
    width: number
    height: number
  }
}

export interface ICubeOptionsComplete {
  cubeSize: number
  width: number
  height: number
  viewportRotations: [Axis, number][]
  colorScheme: { [face: number]: string }
  cubeColor: string
  cubeOpacity: number
  stickerOpacity: number
  dist: number
  outlineWidth: number
  strokeWidth: number

  viewbox: {
    // SVG viewbox settings
    x: number
    y: number
    width: number
    height: number
  }

  algorithm?: string
  case?: string
  backgroundColor?: string  
  maskColor?: string
  stickerColors?: string[]
  facelets?: FaceletDefinition[]
  view?: string
  mask?: Masking
  maskAlg?: string
  arrows?: Arrow[] | string
  
}