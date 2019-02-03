import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

export default function SequenceList({ sequences }) {
  if (sequences.length === 0) {
    return (
      <div>
        There are no sequences in the data folder. Please run
        the <pre>import-data</pre> script on an RDF file to
        import it.
      </div>
    );
  } else {
    return (
      <ul>
        {
          _.map(sequences, sequence => (
            <li key={sequence}>
              <a href={`/${sequence}`}>{sequence}</a>
            </li>
          ))
        }
      </ul>
    );
  }
}

SequenceList.propTypes = {
  sequences: PropTypes.arrayOf(PropTypes.string).isRequired
};
