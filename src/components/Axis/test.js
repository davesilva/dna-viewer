import React from 'react';
import { shallow } from 'enzyme';
import { Axis as D3Axis } from 'react-d3-axis';
import { scaleLinear } from 'd3-scale';
import Axis from './index';

describe('Axis', () => {
  it('renders a d3 axis', () => {
    const result = shallow(<Axis scale={scaleLinear()} nucleotideCount={1000}/>);
    expect(result.find(D3Axis).length).toBe(1);
    expect(result.find(D3Axis).prop('values')).toBeInstanceOf(Array);
  });

  it('adds a tick mark at the sequence end', () => {
    const scale = scaleLinear().domain([0,51]).range([50, 500]);
    const result = shallow(<Axis scale={scale} nucleotideCount={51}/>);
    expect(result.find(D3Axis).prop('values')).toContain(51);
  });

  it('filters out decimal values', () => {
    const scale = scaleLinear().domain([0.0, 1.0]).range([50, 500]);
    const result = shallow(<Axis scale={scale} nucleotideCount={1000}/>);
    expect(result.find(D3Axis).prop('values')).not.toContain(0.1);
    expect(result.find(D3Axis).prop('values')).toContain(0);
    expect(result.find(D3Axis).prop('values')).toContain(1);
  });
});
