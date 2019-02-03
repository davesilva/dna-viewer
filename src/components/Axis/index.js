import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Axis as D3Axis, axisPropsFromTickScale } from 'react-d3-axis';

export default function Axis({ scale, nucleotideCount }) {
  const axisProps = axisPropsFromTickScale(scale, 10);
  let values = [...axisProps.values, nucleotideCount];
  values = _.filter(values, v => v === Math.trunc(v));
  return (
    <D3Axis {...axisProps} values={values}/>
  );
}

Axis.propTypes = {
  scale: PropTypes.func.isRequired,
  nucleotideCount: PropTypes.number.isRequired
};
