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
      .sensor(this.props.id || this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          sensor: snapshot.val(),
          loading: false,
        });
      });
  }

  sortedMeasurements = () =>
    sortBy(Object.values(this.state.sensor), 'timestamp').reverse();

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    return (
      <Card>
        <CardHeader title={`Sensor ${this.state.id}`} />
        <CardContent>
          {this.sortedMeasurements().map(measurement => (
            <div key={measurement.timestamp}>
              <h4>{moment(measurement.timestamp).format()}</h4>
              <ul>
                <li>
                  {measurement.temperature}
                  {HTMLEntities.celsius}
                </li>
                <li>{measurement.light} lumen</li>
                <li>
                  {measurement.motion ? 'Det er folk her 👋' : 'Ingen folk her'}
                </li>
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }
}

export default withFirebase(withRouter(Sensor));
