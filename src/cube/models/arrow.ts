import { colourNameToHex, invertColor } from '../parsing/color';
import { StickerDefinition } from './sticker';

interface ArrowOptions {
  s1: StickerDefinition;
  s2: StickerDefinition;
  s3?: StickerDefinition;
  color?: string;
  opacity?: number;
  scale?: number;
  influence?: number;
  width?: number;
  outline?: boolean;
  outlineColor?: string;
  outlineWidth?: number;
  outlineOpacity?: number;
}

// TODO: change to default export
// eslint-disable-next-line import/prefer-default-export
export class Arrow {
  s1: StickerDefinition;

  s2: StickerDefinition;

  s3?: StickerDefinition; // optional third sticker if drawing curved arrow

  scale: number = 10; // Var range = 0 to 20, default 10

  influence: number = 10; // Var range = 0 to 50, default 10

  color: string;

  width: number = 0.03;

  opacity: number = 1;

  outline: boolean = false;

  outlineColor: string;

  outlineWidth: number = 0.05;

  outlineOpacity: number = 1;

  constructor(options: ArrowOptions) {
    this.s1 = options.s1;
    this.s2 = options.s2;
    this.color = options.color || '#000000';
    if (options.opacity) this.opacity = options.opacity;
    if (options.width) this.width = options.width;
    if (options.scale) {
      this.scale = options.scale;
    }
    if (options.influence) {
      this.influence = options.influence;
    }
    if (options.s3) {
      this.s3 = options.s3;
    }
    if (options.outline) {
      this.outline = options.outline;
      this.outline = true;
      if (options.outlineColor) {
        this.outlineColor = options.outlineColor;
      } else {
        this.setDefaultOutlineColor();
      }

      if (options.outlineWidth) this.outlineWidth = options.outlineWidth;
      if (options.outlineOpacity) this.outlineOpacity = options.outlineOpacity;
    }
  }

  /**
   * Sets the arrow color to the opposite of the arrow color
   */
  setDefaultOutlineColor() {
    if (this.color.startsWith('#')) {
      // if it's short hex, convert to long hex
      if (this.color.length === 3) this.color = this.color.concat(this.color);
    } else {
      this.color = colourNameToHex(this.color);
    }

    try {
      this.outlineColor = invertColor(this.color);
    } catch (e) {
      this.outlineColor = '#212121';
    }
  }
}
