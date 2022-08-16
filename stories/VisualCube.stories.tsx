import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Face, ICubeOptions, VisualCube, VisualCubeProps, Masking } from '../src';

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

export const WithArrows = Template.bind({});

export const AlternateView = Template.bind({});

export const CustomColourScheme = Template.bind({});

export const Transparency = Template.bind({});

export const MaskingCube = Template.bind({});

Default.args = {};

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

AlternateView.args = {
  options: {
    ...defaultOptions,
    view: 'plan',
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
    mask: Masking.LL,
  },
};