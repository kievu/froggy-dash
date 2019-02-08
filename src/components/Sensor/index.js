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
import { colors } from '../../styles'
import { HTMLEntities } from '../../utils/stringUtils';
import { withFirebase } from '../../Firebase';
import SimpleLineChart from '../SimpleLineChart';
import Button from "@material-ui/core/Button/Button";
import TextField from "@material-ui/core/TextField/TextField";

class Sensor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sensor: {},
      id: null,
      isIdentifying: false,
      name: ""
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
          sensor: snapshot.val()
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
      ...measurement,
      timestamp: moment(measurement.timestamp).format('DD.MM.YY h:mm'),
    }));

  setIdentifying(isIdentifying) {
    this.props.firebase.setSensorIsIdentifying(this.props.id, isIdentifying)
    this.setState({
      isIdentifying: isIdentifying
      }
    )
  }

  setNewName = (event) => {
    this.props.firebase.setSensorName(this.props.id, event.target.value)
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    return (
      <div style={{ width: '100%' }}>
        <div style={{marginTop: "8px", marginLeft: "8px"}}>
          <TextField
            id="sensorHeader"
            label="Sensor"
            defaultValue={this.state.name}
            margin="normal"
            onChange={this.setNewName}
          />
          <Button variant="contained" size="small" style={{backgroundColor: this.state.isIdentifying? colors.secondary : colors.primary}} onClick={() => this.setIdentifying(!this.state.isIdentifying)}>
            Identify
          </Button>
        </div>
        <SimpleLineChart data={this.sortedAndFormattedMeasurements()} />
      </div>
    );
  }
}

export default withFirebase(withRouter(Sensor));
