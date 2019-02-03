import React from 'react';
import { shallow } from 'enzyme';
import SvgContainer from './index';

const DummyChild = () => <div/>;

describe('SvgContainer', () => {
  it('renders a g element with no translation by default', () => {
    const result = shallow(<SvgContainer/>);
    expect(result.find('g').length).toBe(1);
    expect(result.find('g').prop('transform')).toBe('translate(0,0)');
  });

  it('renders a g element with the given translation', () => {
    const result = shallow(<SvgContainer translateX={10} translateY={20}/>);
    expect(result.find('g').prop('transform')).toBe('translate(10,20)');
  });

  it('renders children', () => {
    const result = shallow(<SvgContainer><DummyChild/></SvgContainer>);
    expect(result.find(DummyChild).length).toBe(1);
  });
});
