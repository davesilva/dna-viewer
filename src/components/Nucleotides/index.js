import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import SvgContainer from '../SvgContainer';
import './styles.css';

export default function Nucleotides({ scale, getNucleotideAtIndex }) {
  const [containerX, containerWidth] = scale.range();
  const width = scale(1) - scale(0);
  const startIndex = Math.ceil(scale.invert(containerX));
  const endIndex = Math.ceil(scale.invert(containerWidth + 1));
  if (width > 5) {
    const textSize = Math.min(10, (width - 5)) / 10;
    return (
      <SvgContainer className='Nucleotides'>
        {
          _.map(_.range(startIndex, endIndex), index => (
            <text style={{ fontSize: textSize * 16 }}
                  key={index}
                  x={scale(index)}
                  y={20}>
              {getNucleotideAtIndex(index) || '.'}
            </text>
          ))
        }
      </SvgContainer>
    );
  } else {
    return <SvgContainer/>;
  }
}

Nucleotides.propTypes = {
  scale: PropTypes.func.isRequired,
  getNucleotideAtIndex: PropTypes.func.isRequired
};
