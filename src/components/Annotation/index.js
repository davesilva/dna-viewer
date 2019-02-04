import React from 'react';
import PropTypes from 'prop-types';
import SvgContainer from '../SvgContainer';
import './styles.css';

export default function Annotation({ scale, annotation, color }) {
  const screenStart = scale.range()[0] - 50;
  const screenEnd = scale.range()[1] + 50;
  const screenWidth = screenEnd - screenStart;
  const x = Math.max(screenStart, scale(annotation.start));
  const width = Math.min(screenWidth, scale(annotation.end) - x);
  const shouldShowName = width >= 100;

  if (scale(annotation.start) < screenEnd && scale(annotation.end) > screenStart) {
    return (
      <SvgContainer width={width} height={20}>
        <rect className={`Annotation Annotation-${color}`}
              x={x}
              y={0}
              width={width}
              height={20}/>
        {
          shouldShowName && (
            <text style={{ textAnchor: 'middle' }} x={x + width / 2} y={15}>
              {annotation.name}
            </text>
          )
        }
      </SvgContainer>
    );
  } else {
    return null;
  }
}

Annotation.propTypes = {
  scale: PropTypes.func.isRequired,
  annotation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired,
    strand: PropTypes.oneOf(['+', '-']).isRequired
  }).isRequired,
  color: PropTypes.oneOf([1,2,3,4])
};
