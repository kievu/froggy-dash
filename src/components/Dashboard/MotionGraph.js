import React from 'react';
import { Card, CircularProgress, TextField } from '@material-ui/core';
import { withRouter } from 'react-router';
import moment from 'moment';
import { sortBy } from 'lodash';

import {
  ResponsiveContainer,
  Brush,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Legend,
} from 'recharts';

import { withFirebase } from '../../Firebase';

const MotionGraph = ({ data }) => (
  <ResponsiveContainer width="99%" height={200}>
    <BarChart
      width={600}
      height={200}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      barGap={0}
      barCategoryGap={0}
    >
      <XAxis type="category" dataKey="timestamp" />
      <Tooltip />
      <Legend />
      <Brush height={20} />
      <Bar dataKey="motion" fill="#76AF21" stackId="a" />
    </BarChart>
  </ResponsiveContainer>
);

export default withFirebase(withRouter(MotionGraph));
