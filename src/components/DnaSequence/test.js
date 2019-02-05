import React from 'react';
import { mount } from 'enzyme';
import { Axis as D3Axis } from 'react-d3-axis';
import { scaleLinear } from 'd3-scale';
import Nucleotides from '../Nucleotides';
import Axis from '../Axis';
import Annotation from '../Annotation';
import DnaSequence from './index';

describe('DnaSequence', () => {
  const getNucleotideAtIndex = () => 'g';
  const annotation = {
    name: 'test',
    start: 50,
    end: 75,
    strand: '+'
  };
  const defaultProps = {
    getNucleotideAtIndex,
    sequenceName: 'test',
    annotations: [[annotation]]
  };

  it('renders Nucleotides', () => {
    const result = mount(<DnaSequence {...defaultProps}/>);
    expect(result.find(Nucleotides).length).toBe(1);
  });

  it('renders an Axis if nucleotideCount is present', () => {
    const result = mount(<DnaSequence {...defaultProps} nucleotideCount={10}/>);
    expect(result.find(Axis).length).toBe(1);
  });

  it('does not render an Axis if nucleotideCount is not present', () => {
    const result = mount(<DnaSequence {...defaultProps}/>);
    expect(result.find(Axis).length).toBe(0);
  });

  it('renders Annotations', () => {
    const result = mount(<DnaSequence {...defaultProps}/>);
    expect(result.find(Annotation).length).toBe(1);
  });
});
