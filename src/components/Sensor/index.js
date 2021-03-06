import React from 'react';
import { Card, CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router';
import moment from 'moment';
import { sortBy } from 'lodash';
import { withFirebase } from '../../Firebase';
import SimpleLineChart from '../SimpleLineChart';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import LightAndMovementChart from '../LightAndMovementChart';
import MotionGraph from '../Dashboard/MotionGraph';

const LIGHT_IS_OFF_THRESHOLD = 500;

class Sensor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sensor: {},
      id: null,
      isIdentifying: false,
      name: '',
      chartType: null,
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
    sortBy(Object.values(this.state.sensor), 'timestamp')
      .filter(measurement => moment(measurement.timestamp).minute() % 20 === 0)
      .map(measurement => ({
        ...measurement,
        timestamp: moment(measurement.timestamp).format('ddd H:mm'),
        light: measurement.light > LIGHT_IS_OFF_THRESHOLD ? 0 : 1,
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

  renderChart = () => {
    switch (this.props.chartType) {
      case 'light':
        return (
          <LightAndMovementChart data={this.sortedAndFormattedMeasurements()} />
        );
      case 'motion':
        return <MotionGraph data={this.sortedAndFormattedMeasurements()} />;
      default:
        return <SimpleLineChart data={this.sortedAndFormattedMeasurements()} />;
    }
  };

  render() {
    if (this.state.loading) {
      return (
        <Card
          style={{
            width: '100%',
            marginTop: 50,
            height: 300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Card>
      );
    }

    return (
      <Card style={{ width: '100%', marginTop: 50, height: 300 }}>
        <div
          style={{
            marginTop: '8px',
            marginLeft: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 2rem 0 1rem',
            alignItems: 'center',
          }}
        >
          <TextField
            id="sensorHeader"
            label="Sensor"
            defaultValue={this.state.name}
            margin="normal"
            onChange={this.setNewName}
          />
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: this.state.isIdentifying
                ? 'rgb(244, 191, 66)'
                : '#76af21',
              color: 'white',
              height: '2rem',
            }}
            onClick={() => this.setIdentifying(!this.state.isIdentifying)}
          >
            Identifiser
          </Button>
        </div>
        {this.renderChart()}
      </Card>
    );
  }
}

export default withFirebase(withRouter(Sensor));
