import React from 'react';
import { Meta, Story } from '@storybook/react';
import { VisualCube, VisualCubeProps } from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: VisualCube,
  argTypes: {
    options: {
      name: 'options',
      defaultValue: {
        cubeSize: 4,
      },
    }
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<VisualCubeProps> = args => <VisualCube {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
