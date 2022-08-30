import React from 'react';
import { Default as VisualCube } from '../stories/VisualCube.stories';
import { render } from '@testing-library/react'

describe('Thing', () => {
  it('renders without crashing', () => {
    render(<VisualCube />)
  });
});
