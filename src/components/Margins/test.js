import React from 'react';
import { shallow } from 'enzyme';
import Margins from './index';

describe('Margins', () => {
  it('renders two margins', () => {
    const result = shallow(<Margins width={50}/>);
    expect(result.find('rect').length).toBe(2);
  });
});
