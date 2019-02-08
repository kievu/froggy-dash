import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { withRouter } from 'react-router';
import moment from 'moment';
import { sortBy } from 'lodash';

import { HTMLEntities } from '../../utils/stringUtils';
import { withFirebase } from '../../Firebase';
import SimpleLineChart from '../SimpleLineChart';

class Sensor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sensor: {},
      id: null,
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
          loading: false,
        });
      });
  }

  sortedAndFormattedMeasurements = () =>
    sortBy(Object.values(this.state.sensor), 'timestamp').map(measurement => ({
      ...measurement,
      timestamp: moment(measurement.timestamp).format('DD.MM.YY h:mm'),
    }));

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    return (
      <div style={{ width: '100%' }}>
        <h4>Sensor {this.state.id}</h4>
        <SimpleLineChart data={this.sortedAndFormattedMeasurements()} />
      </div>
    );
  }
}

export default withFirebase(withRouter(Sensor));
