import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Face, ICubeOptions, VisualCube, VisualCubeProps, Masking, Axis } from '../src';

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
    }
  },
  parameters: {
    controls: { expanded: true,  },
  },
};

export default meta;

const Template: Story<VisualCubeProps> = args => <VisualCube {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

export const AlternateView = Template.bind({});

export const AlternateDistance =  Template.bind({});

export const CustomColourScheme = Template.bind({});

export const Transparency = Template.bind({});

export const MaskingCube = Template.bind({});

export const Rotation = Template.bind({});

export const BigCubes = Template.bind({});

export const WithArrows = Template.bind({});

export const StickerColors = Template.bind({});

Default.args = {
  options: {
    ...defaultOptions,
    algorithm: '',
  }
};

AlternateView.args = {
  options: {
    ...defaultOptions,
    view: 'plan',
  },
};

AlternateDistance.args = {
  options: {
    ...defaultOptions,
    dist: 2,
    width: 300,
    height: 350,
  },
};

CustomColourScheme.args = {
  options: {
    ...defaultOptions,
    colorScheme: {
      [Face.U]: '#cfcf30',
      [Face.R]: '#d73b28',
      [Face.F]: '#444dbb',
      [Face.D]: '#c7cbcc',
      [Face.L]: '#eabd3d',
      [Face.B]: '#2bd52a'
    },
  },
};

Transparency.args = {
  options: {
    ...defaultOptions,
    cubeOpacity: 50,
    stickerOpacity: 50,
  },
};

MaskingCube.args = {
  options: {
    ...defaultOptions,
    mask: Masking.CROSS,
  },
};

Rotation.args = {
  options: {
    ...defaultOptions,
    viewportRotations: [
      [Axis.X, 130],
      [Axis.Y, -38]
    ],
    algorithm: '',
  },
};

BigCubes.args = {
  options: {
    ...defaultOptions,
    cubeSize: 5,
    algorithm: 'R U Uw2 Bw\' Dw L\' F\' Lw\' Dw Lw\' B Lw2 Bw B2 U2 L\' Fw Rw D\' Rw\' Bw D\' Rw2 L2 B L2 Bw L B\' R\' F\' R\' B\' Dw2 Lw2 D2 Dw\' B Lw L\' R\' Fw Uw2 R2 Bw\' Lw\' B R L\' Dw2 F D2 Bw\' U\' Uw F\' B R\' D2 Bw2',
  },
};

WithArrows.args = {
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
        color: 'yellow'
      },
    ],
    ...defaultOptions,
  }
};

StickerColors.args = {
  options: {
    ...defaultOptions,
    viewportRotations: [[Axis.Y, 120], [Axis.X, 300]],
    algorithm: '',
    stickerColors:
      [
        "#FEFEFF",
        "#FEFE00",
        "#FEFE00",
        "#FEFE00",
        "#FEFE00",
        "#FEFE00",
        "#FEFE00",
        "#FEFE00",
        "#FEFEFF",
        "#EE00FF",
        "#EE0000",
        "#EE0000",
        "#EE0000",
        "#EE0000",
        "#EE0000",
        "#EE0000",
        "#EE0000",
        "#EE00FF",
        "#FF00F2",
        "#00FFF2",
        "#0000F2",
        "#0000F2",
        "#0000F2",
        "#0000F2",
        "#0000F2",
        "#0000F2",
        "#00FFF2",
        "#FFFF00",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#FFFFFF",
        "#00FF00",
        "#FFA100",
        "#FFA100",
        "#FFA100",
        "#FFA100",
        "#FFA100",
        "#FFA100",
        "#FFA100",
        "#FFA100",
        "#FFA1FF",
        "#FFFFFF",
        "#00D800",
        "#00D800",
        "#00D800",
        "#00D800",
        "#00D800",
        "#00D800",
        "#00D800",
        "#00D8FF"
     ]
  },
};