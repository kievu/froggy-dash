import React, { useState, useEffect } from 'react';
import { Card, CircularProgress, Button, TextField } from '@material-ui/core';
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

import { colors } from '../../styles';
import { withFirebase } from '../../Firebase';
import SimpleLineChart from '../SimpleLineChart';

class MotionGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sensor: {},
      id: null,
      isIdentifying: false,
      name: '',
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
      id: this.props.id || this.props.match.params.id,
    });

    this.props.firebase
      .measurement(this.props.id || this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          sensor: snapshot.val(),
        });
      });

    this.props.firebase
      .sensor(this.props.id || this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          name: snapshot.val().name,
          isIdentifying: snapshot.val().isIdentifying,
          loading: false,
        });
      });
  }

  sortedAndFormattedMeasurements = () =>
    sortBy(Object.values(this.state.sensor), 'timestamp').map(measurement => ({
      motion: measurement.motion,
      timestamp: moment(measurement.timestamp).format('DD.MM.YY h:mm'),
    }));

  setIdentifying(isIdentifying) {
    this.props.firebase.setSensorIsIdentifying(this.props.id, isIdentifying);
    this.setState({
      isIdentifying: isIdentifying,
    });
  }

  setNewName = event => {
    this.props.firebase.setSensorName(this.props.id, event.target.value);
  };

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }
    const data = this.sortedAndFormattedMeasurements();
    return (
      <Card style={{ width: '50%', marginTop: 50 }}>
        <div style={{ marginTop: '8px', marginLeft: '8px' }}>
          <TextField
            id="sensorHeader"
            label="MotionGraph"
            defaultValue={this.state.name}
            margin="normal"
            onChange={this.setNewName}
          />
        </div>
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
      </Card>
    );
  }
}

export default withFirebase(withRouter(MotionGraph));
