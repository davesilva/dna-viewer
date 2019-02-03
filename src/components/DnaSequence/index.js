import _ from 'lodash';
import React, { Component } from 'react';
import { Axis, axisPropsFromTickScale } from 'react-d3-axis';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import './styles.css';

const MARGIN = 50;

export default class DnaSequence extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state = { width: 0 };
  }

  componentDidMount() {
    const { width } = this.ref.current.getBoundingClientRect();
    this.setState({
      width
    });
    this.zoom = zoom()
      .scaleExtent([1, Infinity])
      .translateExtent([[0, 0], [width, 0]])
      .extent([[0, 0], [width, 0]])
      .on('zoom', this.handleZoom.bind(this));
    d3.select(this.ref.current)
      .call(this.zoom)
      .on('wheel', () => { d3.event.preventDefault(); });
  }

  handleZoom() {
    this.setState({
      zoomTransform: d3.event.transform
    });
  }

  render() {
    const scale = scaleLinear()
          .domain([0, this.props.nucleotideCount])
          .range([MARGIN, this.state.width - (MARGIN * 2)]);
    if (this.state.zoomTransform) {
      scale.domain(this.state.zoomTransform.rescaleX(scale).domain());
    }

    const props = axisPropsFromTickScale(scale, 10);
    return (
      <svg ref={this.ref} style={{width: '100%', height: '100%'}}>
        <g transform='translate(0,50)'>
          <Axis {...props} values={[...props.values, this.props.nucleotideCount]} />
        </g>
        {
          _.map(this.props.annotations, annotation => (
            <g key={annotation.name + annotation.start + annotation.end}>
              <rect className='DnaSequence-annotation'
                    x={scale(annotation.start)}
                    y={100}
                    width={scale(annotation.end) - scale(annotation.start)}
                    height={20}/>
              {
                scale(annotation.end) - scale(annotation.start) > 100 && (
                  <text x={scale(annotation.start)}
                        y={115}>
                    {annotation.name}
                  </text>
                )
              }
            </g>
          ))
        }
      </svg>
    );
  }
}
