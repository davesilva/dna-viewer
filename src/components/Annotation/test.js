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

  it('renders a polygon pointing to the right if strand is "+"', () => {
    const result = shallow(<Annotation scale={scale} annotation={annotation}/>);
    const polygon = result.find('polygon');
    expect(polygon.prop('points')).toBe('500 0, 730 0, 750 10, 730 20, 500 20');
  });

  it('renders a polygon pointing to the left if strand is "-"', () => {
    const result = shallow(
      <Annotation scale={scale} annotation={{ ...annotation, strand: '-' }}/>
    );
    const polygon = result.find('polygon');
    expect(polygon.prop('points')).toBe('520 0, 750 0, 750 20, 520 20, 500 10');
  });

  it('renders a rectangle with no point if the annotation is not wide enough', () => {
    const result = shallow(
      <Annotation scale={scale}
                  annotation={{ ...annotation, start: 50, end: 51 }}/>
    );
    const polygon = result.find('polygon');
    expect(polygon.prop('points')).toBe('500 0, 510 0, 510 20, 500 20');
  });

  it('renders the name if the annotation is wide enough', () => {
    const result = shallow(<Annotation scale={scale} annotation={annotation}/>);
    const text = result.find('text');
    const nestedSvg = result.find('svg');
    expect(text.text()).toContain('test');
    expect(nestedSvg.prop('x')).toBe(520);
    expect(nestedSvg.prop('y')).toBe(0);
    expect(text.prop('x')).toBe(0);
    expect(text.prop('y')).toBe(15);
  });

  it('does not allow the annotation name to overlap the margin', () => {
    const result = shallow(
      <Annotation scale={scale} annotation={{ ...annotation, start: 0 }}/>
    );
    const text = result.find('text');
    const nestedSvg = result.find('svg');
    expect(text.text()).toContain('test');
    expect(nestedSvg.prop('x')).toBe(60);
    expect(nestedSvg.prop('y')).toBe(0);
    expect(text.prop('x')).toBe(0);
    expect(text.prop('y')).toBe(15);
  });

  it('does not render the name if the annotation is not wide enough', () => {
    const result = shallow(
      <Annotation scale={scale} annotation={{...annotation, end: 51}} />
    );
    expect(result.find('text').length).toBe(0);
  });
});
