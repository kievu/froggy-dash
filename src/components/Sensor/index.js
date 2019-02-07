import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import { Layout, Center } from '../../elements';
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

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    return (
      <Card>
        <CardHeader title={`Sensor ${this.state.id}`} />
        <CardContent>
          <p>
            {this.state.sensor.temperature}
            {HTMLEntities.celsius}
          </p>
          <p>{this.state.sensor.light} lumen</p>
          <p>
            {this.state.sensor.motion ? 'Det er folk her 👋' : 'Ingen folk her'}
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default withFirebase(withRouter(Sensor));
