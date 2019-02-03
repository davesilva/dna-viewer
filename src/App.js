import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as sequenceActions from './actions/sequenceActions';
import './App.css';
import DnaSequence from './components/DnaSequence';

const mapStateToProps = (state, props) => ({
  sequenceName: _.last(props.pathname.split('/')),
  nucleotideCount: state.sequence.nucleotideCount,
  annotations: state.sequence.annotations
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
    }
  }

  render() {
    if (_.isEmpty(this.props.sequenceName)) {
      return (
        <div className="App">
          Sequences
        </div>
      );
    } else {
      return <DnaSequence {...this.props}/>;
    }
  }
}

export default connect(mapStateToProps, actions)(App);
