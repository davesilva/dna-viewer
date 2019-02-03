import React from 'react';
import { shallow } from 'enzyme';
import { Axis as D3Axis } from 'react-d3-axis';
import { scaleLinear } from 'd3-scale';
import Annotation from './index';

describe('Annotation', () => {
  const annotation = {
    name: 'test',
    start: 50,
    end: 75,
    strand: '+'
  };
  const scale = scaleLinear().domain([0,100]).range([0,1000]);

  it('renders a rect with the correct x position and width', () => {
    const result = shallow(<Annotation scale={scale} annotation={annotation}/>);
    const rect = result.find('rect');
    expect(rect.prop('x')).toBe(500);
    expect(rect.prop('width')).toBe(250);
  });

  it('renders the name if the annotation is wide enough', () => {
    const result = shallow(<Annotation scale={scale} annotation={annotation}/>);
    const text = result.find('text');
    expect(text.text()).toContain('test');
    expect(text.prop('x')).toBe(510);
    expect(text.prop('y')).toBe(15);
  });

  it('does not render the name if the annotation is not wide enough', () => {
    const result = shallow(
      <Annotation scale={scale} annotation={{...annotation, end: 51}} />
    );
    expect(result.find('text').length).toBe(0);
  });
});
