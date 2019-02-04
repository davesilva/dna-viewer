import React from 'react';
import PropTypes from 'prop-types';
import SvgContainer from '../SvgContainer';

export default function Margins({ width }) {
  return (
    <SvgContainer>
      <defs>
        <linearGradient id='left'>
          <stop offset='50%' stopColor='#eee' stopOpacity='1' />
          <stop offset='100%' stopColor='#eee' stopOpacity='0' />
        </linearGradient>
        <linearGradient id='right'>
          <stop offset='0%' stopColor='#eee' stopOpacity='0' />
          <stop offset='50%' stopColor='#eee' stopOpacity='1' />
        </linearGradient>
      </defs>

      <rect style={{ fill: 'url(#left)' }}
            x='0'
            y='0'
            width={width}
            height='100%'/>
      <rect style={{ fill: 'url(#right)' }}
            x={`calc(100% - ${width})`}
            y='0'
            width={width}
            height='100%'/>
    </SvgContainer>
  );
}

Margins.propTypes = {
  width: PropTypes.number.isRequired
};
