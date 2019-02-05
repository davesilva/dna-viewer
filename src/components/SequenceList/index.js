import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export default function SequenceList({ sequences }) {
  if (sequences.length === 0) {
    return (
      <div className='SequenceList'>
        <h1 className='SequenceList-title'>Sequences</h1>
        <p>
          There are no sequences in the data folder. Please run
          the <code>import-data</code> script on an RDF file to
          import it.
        </p>
      </div>
    );
  } else {
    return (
      <div className='SequenceList'>
        <h1 className='SequenceList-title'>Sequences</h1>
        <ul className='SequenceList-list'>
          {
            _.map(sequences, sequence => (
              <li key={sequence}>
                <a href={`/${sequence}`}>{sequence}</a>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

SequenceList.propTypes = {
  sequences: PropTypes.arrayOf(PropTypes.string).isRequired
};
