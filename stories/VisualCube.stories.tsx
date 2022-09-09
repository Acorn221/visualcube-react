import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react';
import {
  Face, ICubeOptions, VisualCube, VisualCubeProps, Masking, Axis,
} from '../src';

const defaultOptions: ICubeOptions = {
  cubeSize: 3,
  algorithm: 'M2 E2 S2',
  height: 300,
  width: 300,
};

const meta: Meta = {
  title: 'Default VisualCube',
  component: VisualCube,
  argTypes: {
    options: {
      name: 'Options',
      description: 'Options for the cube object',
      defaultValue: defaultOptions,
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<VisualCubeProps> = (args) => <VisualCube {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing

export const Default = Template.bind({});

Default.args = {
  options: {
    ...defaultOptions,
    algorithm: '',
  },
};

export const AlternateView = Template.bind({});

AlternateView.args = {
  options: {
    ...defaultOptions,
    view: 'plan',
  },
};

export const AlternateDistance = Template.bind({});

AlternateDistance.args = {
  options: {
    ...defaultOptions,
    dist: 2,
    width: 300,
    height: 350,
  },
};

export const CustomColourScheme = Template.bind({});

CustomColourScheme.args = {
  options: {
    ...defaultOptions,
    colorScheme: {
      [Face.U]: '#cfcf30',
      [Face.R]: '#d73b28',
      [Face.F]: '#444dbb',
      [Face.D]: '#c7cbcc',
      [Face.L]: '#eabd3d',
      [Face.B]: '#2bd52a',
    },
  },
};

export const Transparency = Template.bind({});

Transparency.args = {
  options: {
    ...defaultOptions,
    cubeOpacity: 50,
    stickerOpacity: 50,
  },
};

export const MaskingCubeBeforeAlg = Template.bind({});

MaskingCubeBeforeAlg.args = {
  options: {
    ...defaultOptions,
    mask: Masking.F2L,
    algorithm: 'R U R',
    maskBeforeAlgorithm: true,
  },
};

export const MaskingCubeAfterAlg = Template.bind({});

MaskingCubeAfterAlg.args = {
  options: {
    ...defaultOptions,
    mask: Masking.F2L,
    algorithm: 'R U R',
    maskBeforeAlgorithm: false,
  },
};

export const Rotation = Template.bind({});

Rotation.args = {
  options: {
    ...defaultOptions,
    viewportRotations: [
      [Axis.X, 130],
      [Axis.Y, -38],
    ],
    algorithm: '',
  },
};

export const BigCubes = Template.bind({});

BigCubes.args = {
  options: {
    ...defaultOptions,
    cubeSize: 5,
    algorithm: 'R U Uw2 Bw\' Dw L\' F\' Lw\' Dw Lw\' B Lw2 Bw B2 U2 L\' Fw Rw D\' Rw\' Bw D\' Rw2 L2 B L2 Bw L B\' R\' F\' R\' B\' Dw2 Lw2 D2 Dw\' B Lw L\' R\' Fw Uw2 R2 Bw\' Lw\' B R L\' Dw2 F D2 Bw\' U\' Uw F\' B R\' D2 Bw2',
  },
};

export const DefaultArrows = Template.bind({});

DefaultArrows.args = {
  options: {
    cubeSize: 3,
    arrows: [
      {
        s1: { face: Face.U, n: 0 },
        s2: { face: Face.U, n: 2 },
        s3: { face: Face.U, n: 6 },
        scale: 8,
        influence: 5,
      },
      {
        s1: { face: Face.R, n: 6 },
        s2: { face: Face.R, n: 2 },
        s3: { face: Face.R, n: 0 },
        scale: 8,
        influence: 5,
        color: 'yellow',
      },
    ],
    ...defaultOptions,
  },
};

export const CustomArrows = Template.bind({});

CustomArrows.args = {
  options: {
    cubeSize: 3,
    arrows: [
      {
        s1: { face: Face.U, n: 2 },
        s2: { face: Face.U, n: 6 },
        s3: { face: Face.U, n: 0 },
        scale: 8,
        influence: 3,
        outline: true,
        color: '#FF0000',
      },
      {
        s1: { face: Face.R, n: 6 },
        s2: { face: Face.R, n: 2 },
        s3: { face: Face.R, n: 0 },
        scale: 8,
        influence: 5,
        color: 'sandybrown',
        outline: true,
      },
      {
        s1: { face: Face.F, n: 0 },
        s2: { face: Face.F, n: 8 },
        scale: 8,
        color: '#AFAFAF',
        outlineColor: '#FF0000',
        width: 0.08,
        opacity: 1,
        outlineOpacity: 0.5,
        outline: true,
      },
    ],
    ...defaultOptions,
  },
};

export const StickerColors = Template.bind({});

/**
 * Generates a random sticker colour (all above 127 to make them a little brighter)
 */
const randStickerColours = [...Array(54).keys()].map(() => `#${Math.floor((Math.random() * 8388607) + 8388607).toString(16)}`);

StickerColors.args = {
  options: {
    ...defaultOptions,
    algorithm: '',
    stickerColors: randStickerColours,
  },
};
