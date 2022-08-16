import React, { HTMLAttributes, useLayoutEffect, useRef } from 'react';

import { ColorName } from './colors'
import { makeCubeGeometry } from './cube/geometry'
import { Axis } from './math'
import { renderCube } from './cube/drawing'
import { ICubeOptions, ICubeOptionsComplete } from './cube/options'
import { DefaultColorScheme } from './cube/constants'
import { makeStickerColors } from './cube/stickers'
import { parseOptions } from './cube/parsing/options'
import { parseFaceletDefinitions } from './cube/parsing/faceletDefinitions'

export { Masking, Face } from './cube/constants'
export { Axis } from './math'
export { StickerDefinition } from './cube/models/sticker'
export { Arrow } from './cube/models/arrow'
export { ICubeOptions } from './cube/options'

const defaultOptions: ICubeOptionsComplete = {
  cubeSize: 3,
  width: 128,
  height: 128,
  viewportRotations: [[Axis.Y, 45], [Axis.X, -34]],
  colorScheme: DefaultColorScheme,
  cubeColor: ColorName.Black,
  cubeOpacity: 100,
  stickerOpacity: 100,
  dist: 5,
  outlineWidth: 0.94,
  strokeWidth: 0,
  viewbox: {
    x: -0.9,
    y: -0.9,
    width: 1.8,
    height: 1.8,
  },
}

export function cubeSVG(container: HTMLElement | string, extraOptions?: ICubeOptions) {
  if (extraOptions === void 0) {
    extraOptions = {}
  }
  let options = getOptions(defaultOptions, extraOptions)
  let geomety = makeCubeGeometry(options)
  options.stickerColors = makeStickerColors(options)

  return renderCube(container, geomety, options)
}

const getOptions = (baseOptions: ICubeOptions, extraOptions: string | ICubeOptions): ICubeOptionsComplete => {
  let parsedOptions: ICubeOptions
  if (typeof extraOptions === 'string') {
    parsedOptions = parseOptions(extraOptions)
  } else {
    parsedOptions = extraOptions
  }

  if (typeof parsedOptions.facelets === 'string') {
    parsedOptions.facelets = parseFaceletDefinitions(parsedOptions.facelets)
  }

  // @ts-ignore: This is valid because we know that the type of baseOptions is ICubeOptionsComplete
  return { ...baseOptions, ...parsedOptions }
}


export interface VisualCubeProps extends HTMLAttributes<HTMLDivElement> {
  /** custom content, defaults to 'the snozzberries taste like snozzberries' */
  options: ICubeOptions;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A custom Thing component. Neat!
 */
// : FC<VisualCubeProps> 
export const VisualCube =  ({options}: VisualCubeProps) => {
  //const [svgData, setSVGData] = useState<svgjs.Doc>();
  const container = useRef<HTMLDivElement>(null);


  useLayoutEffect(() => {
      if(container.current !== null) cubeSVG(container.current, options);
  }, [options]);

  
  return (
    <div>
      <h1>hi</h1>
      <div ref={container} />
    </div>
  )
};