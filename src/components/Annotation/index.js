import React from 'react';
import PropTypes from 'prop-types';
import SvgContainer from '../SvgContainer';
import './styles.css';

export default function Annotation({ scale, annotation }) {
  const width = scale(annotation.end) - scale(annotation.start);
  const shouldShowName = width >= 100;
  return (
    <SvgContainer width={width} height={20}>
      <rect className='Annotation'
            x={scale(annotation.start)}
            y={0}
            width={width}
            height={20}/>
      {
        shouldShowName && (
          <text x={scale(annotation.start) + 10} y={15}>
            {annotation.name}
          </text>
        )
      }
    </SvgContainer>
  );
}

Annotation.propTypes = {
  scale: PropTypes.func.isRequired,
  annotation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    strand: PropTypes.oneOf(['+', '-']).isRequired
  }).isRequired
};
