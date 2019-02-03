import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

export default function SequenceList({ sequences }) {
  if (sequences.length === 0) {
    return (
      <div>
        <h1>Sequences</h1>
        <p>
          There are no sequences in the data folder. Please run
          the <code>import-data</code> script on an RDF file to
          import it.
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Sequences</h1>
        <ul>
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
