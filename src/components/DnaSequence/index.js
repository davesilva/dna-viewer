import _ from 'lodash';
import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import SvgContainer from '../SvgContainer';
import Axis from '../Axis';
import Annotation from '../Annotation';
import Nucleotides from '../Nucleotides';
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

    return (
      <svg ref={this.ref} style={{width: '100%', height: '100%'}}>
        <SvgContainer translateY={10}>
          <Nucleotides scale={scale}
                       getNucleotideAtIndex={this.props.getNucleotideAtIndex}/>
        </SvgContainer>
        <SvgContainer translateY={50}>
          <Axis scale={scale} nucleotideCount={this.props.nucleotideCount} />
        </SvgContainer>
        <SvgContainer translateY={100}>
          {
            _.map(this.props.annotations, annotation => (
              <Annotation key={annotation.name + annotation.start + annotation.end}
                          scale={scale}
                          annotation={annotation}/>
            ))
          }
        </SvgContainer>
      </svg>
    );
  }
}
