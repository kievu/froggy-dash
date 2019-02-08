import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router';

import Sensor from '../Sensor';
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
          <Sensor id={sensorId} key={sensorId} />
        ))}
      </div>
    );
  }
}

export default withFirebase(withRouter(Room));
