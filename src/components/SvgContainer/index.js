import React from 'react';
import PropTypes from 'prop-types';

export default function SvgContainer({
  translateX,
  translateY,
  children,
  className
}) {
  return (
    <g className={className}
       transform={`translate(${translateX || 0},${translateY || 0})`}>
      {children}
    </g>
  );
}

SvgContainer.propTypes = {
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  children: PropTypes.node
};
