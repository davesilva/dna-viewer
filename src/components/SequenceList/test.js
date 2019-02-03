import React from 'react';
import { shallow } from 'enzyme';
import SequenceList from './index';

describe('SequenceList', () => {
  it('renders a helpful message if there are no sequences', () => {
    const result = shallow(<SequenceList sequences={[]}/>);
    expect(result.text()).toContain('There are no sequences');
  });

  it('renders a list of sequence links if there are sequences', () => {
    const result = shallow(<SequenceList sequences={['test']}/>);
    expect(result.find('li').text()).toContain('test');
    expect(result.find('a').prop('href')).toBe('/test');
  });
});
