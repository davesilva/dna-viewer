import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sequenceActions from './actions/sequenceActions';
import SequenceList from './components/SequenceList';
import DnaSequence from './components/DnaSequence';

const PAGE_SIZE = 5000;

const mapStateToProps = (state, props) => ({
  sequenceName: _.last(props.pathname.split('/')),
  sequences: state.sequenceList,
  nucleotideCount: state.sequence.nucleotideCount,
  annotations: state.sequence.annotations,
  getNucleotideAtIndex: index => {
    return state.sequence.nucleotides[0].slice(index, index + 1);
  }
});

const actions = {
  fetchSequenceList: sequenceActions.fetchSequenceList,
  fetchSequence: sequenceActions.fetchSequence,
  fetchNucleotides: sequenceActions.fetchNucleotides
};

class App extends Component {
  componentDidMount() {
    if (_.isEmpty(this.props.sequenceName)) {
      this.props.fetchSequenceList();
    } else {
      this.props.fetchSequence(this.props.sequenceName);
      this.props.fetchNucleotides(this.props.sequenceName, 0, PAGE_SIZE);
    }
  }

  render() {
    if (_.isEmpty(this.props.sequenceName)) {
      return <SequenceList sequences={this.props.sequences}/>;
    } else {
      return <DnaSequence {...this.props}/>;
    }
  }
}

export default connect(mapStateToProps, actions)(App);
