import React from 'react';
import { Layout, Center } from '../elements';
import {
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import Room from '../components/Room';

class Rooms extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      rooms: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.rooms().on('value', snapshot => {
      this.setState({
        rooms: snapshot.val(),
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Layout>
          <Center>
            <CircularProgress />
          </Center>
        </Layout>
      );
    }

    return (
      <Layout>
        {Object.values(this.state.rooms).map(roomId => (
          <Room id={roomId} key={roomId} />
        ))}
      </Layout>
    );
  }
}

export default withFirebase(Rooms);
