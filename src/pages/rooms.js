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
        {Object.entries(this.state.rooms).map(([roomId, room]) => (
          <Card key={roomId}>
            <CardHeader
              to={`/rooms/${roomId}`}
              color="primary"
              component={Link}
              variant="contained"
              style={{ height: '40px', minWidth: '130px' }}
              title={roomId}
            />
            <CardContent>
              <p>
                {Object.entries(room.rooms).map(([roomId, room]) => (
                  <Room id={roomId} />
                ))}
              </p>
            </CardContent>
          </Card>
        ))}
      </Layout>
    );
  }
}

export default withFirebase(Rooms);
