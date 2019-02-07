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
import Room from '../Room';
import { HTMLEntities } from '../../utils/stringUtils';
import { withFirebase } from '../../Firebase';

class Building extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      building: {},
      id: null,
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
      id: this.props.id || this.props.match.params.id,
    });

    this.props.firebase
      .building(this.props.id || this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          building: snapshot.val(),
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
        <h1>Bygg: {this.state.building.name}</h1>
        {Object.keys(this.state.building.rooms || []).map(roomId => (
          <Room id={roomId} />
        ))}
      </div>
    );
  }
}

export default withFirebase(withRouter(Building));
