import _ from 'lodash';
import React, { Component } from 'react';
import * as d3 from 'd3';
import { scaleLinear } from 'd3-scale';
import { zoom } from 'd3-zoom';
import SvgContainer from '../SvgContainer';
import Axis from '../Axis';
import Annotation from '../Annotation';
import Nucleotides from '../Nucleotides';
import Margins from '../Margins';
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

  getScale() {
    const scale = scaleLinear()
          .domain([0, this.props.nucleotideCount])
          .range([MARGIN, this.state.width - MARGIN]);
    if (this.state.zoomTransform) {
      scale.domain(this.state.zoomTransform.rescaleX(scale).domain());
    }
    return scale;
  }

  handleZoom() {
    this.setState({
      zoomTransform: d3.event.transform
    });
    const [scaleStart, scaleEnd] = this.getScale().domain();
    if (scaleEnd - scaleStart < 1000) {
      if (!this.props.getNucleotideAtIndex(scaleStart)) {
        const start = Math.floor(scaleStart / 1000) * 1000;
        this.props.fetchNucleotides(this.props.sequenceName, start, start + 1000);
      }
      if (!this.props.getNucleotideAtIndex(scaleEnd)) {
        const start = Math.floor(scaleEnd / 1000) * 1000;
        this.props.fetchNucleotides(this.props.sequenceName, start, start + 1000);
      }
    }
  }

  render() {
    const scale = this.getScale();

    return (
      <svg ref={this.ref} className='DnaSequence'>
        <SvgContainer translateY={10}>
          <Nucleotides scale={scale}
                       getNucleotideAtIndex={this.props.getNucleotideAtIndex}/>
        </SvgContainer>
        <SvgContainer translateY={50}>
          <Axis scale={scale} nucleotideCount={this.props.nucleotideCount} />
        </SvgContainer>
        <SvgContainer translateY={100}>
          {
            _.map(this.props.annotations, (row, index) => (
              <SvgContainer key={index} translateY={25 * index}>
                {
                  _.map(row, (annotation, index) => (
                    <Annotation key={index}
                                color={index % 4 + 1}
                                scale={scale}
                                annotation={annotation}/>
                  ))
                }
              </SvgContainer>
            ))
          }
        </SvgContainer>
        <Margins width={MARGIN}/>
      </svg>
    );
  }
}
