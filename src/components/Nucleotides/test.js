import React from 'react';
import { shallow } from 'enzyme';
import { Axis as D3Axis } from 'react-d3-axis';
import { scaleLinear } from 'd3-scale';
import SvgContainer from '../SvgContainer';
import Nucleotides from './index';

describe('Nucleotides', () => {
  it('renders an empty SvgContainer if zoomed too far out to see', () => {
    const scale = scaleLinear().domain([0, 100]).range([0, 100]);
    const result = shallow(
      <Nucleotides getNucleotideAtIndex={() => 'a'}
                   scale={scale}/>
    );
    expect(result.find(SvgContainer).length).toBe(1);
  });

  it('renders nucleotides if zoomed in close enough to see', () => {
    const scale = scaleLinear().domain([0, 2]).range([0, 100]);
    const result = shallow(
      <Nucleotides getNucleotideAtIndex={() => 'a'}
                   scale={scale}/>
    );
    expect(result.find('text').length).toBe(3);
    expect(result.find('text').first().prop('style')).toEqual({ fontSize: 16 });
  });

  it('scales the text when at an intermediate zoom level', () => {
    const scale = scaleLinear().domain([0, 2]).range([0, 20]);
    const result = shallow(
      <Nucleotides getNucleotideAtIndex={() => 'a'}
        scale={scale}/>
    );
    expect(result.find('text').length).toBe(3);
    expect(result.find('text').first().prop('style')).toEqual({ fontSize: 8 });
  });
});
