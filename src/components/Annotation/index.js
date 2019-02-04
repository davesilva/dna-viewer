import React from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
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
    let points;
    if (annotation.strand === '+' && width > 20) {
      points =
        `${x} 0, ${x + width - 20} 0, ${x + width} 10, ${x + width - 20} 20, ${x} 20`;
    } else if (annotation.strand === '-' && width > 20) {
      points = `${x + 20} 0, ${x + width} 0, ${x + width} 20, ${x + 20} 20, ${x} 10`;
    } else {
      points = `${x} 0, ${x + width} 0, ${x + width} 20, ${x} 20`;
    }
    const tooltip = `
      ${annotation.name}<br/>
      start: ${annotation.start}<br/>
      end: ${annotation.end}<br/>
      strand: ${annotation.strand}<br/>
    `;
    return (
      <SvgContainer width={width} height={20}>
        <polygon className={`Annotation Annotation-${color}`}
                 points={points}
                 data-tip={tooltip}/>
        {
          shouldShowName && (
            <svg x={Math.max(x + 20, 60)}
                 y={0}
                 width={width - 40}
                 height={20}
                 data-tip={tooltip}>
              <text x={0} y={15}>
                {annotation.name}
              </text>
            </svg>
          )
        }
        <foreignObject>
          <ReactTooltip place='bottom' className='Annotation-tooltip' multiline/>
        </foreignObject>
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
