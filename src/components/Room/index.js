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
import Sensor from '../Sensor';
import { HTMLEntities } from '../../utils/stringUtils';
import { withFirebase } from '../../Firebase';

class Room extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      room: {},
      id: null,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
      id: this.props.id || this.props.match.params.id,
    });

    this.props.firebase
      .room(this.props.id || this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          room: snapshot.val(),
          loading: false,
        });
      });
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    return (
      <div>
        <h2>Rom: {this.state.room.name}</h2>
        {Object.values(this.state.room.sensors || []).map(sensorId => (
          <Sensor id={sensorId} />
        ))}
      </div>
    );
  }
}

export default withFirebase(withRouter(Room));
