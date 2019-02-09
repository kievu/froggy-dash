import React from 'react';
import Select from "@material-ui/core/Select/Select";
import OutlinedInput from "@material-ui/core/OutlinedInput/OutlinedInput";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import { DatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';
import * as ReactDOM from "react-dom";
import DateFnsUtils from '@date-io/date-fns';
import Button from "@material-ui/core/Button/Button";
import SvgIcon from "@material-ui/core/SvgIcon/SvgIcon";

class SelectorTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      building: 'Voksenåsen',
      room: 'Rom 1',
      date: new Date(),
      labelWidth: 100,
    };
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleDateChange = date => {
    this.setState({ date });
  };

  render() {
    return (
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", marginTop: "32px"}}>
        <SvgIcon style={{marginRight: "8px"}}>
          <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"/>
        </SvgIcon>
        <div style={{marginRight: "32px"}}>Filter:</div>
        <FormControl variant="outlined" style={{marginRight: "32px"}} >
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Bygg
          </InputLabel>
          <Select
            native
            margin="dense"
            value={this.state.building}
            onChange={this.handleChange('building')}
            input={
              <OutlinedInput
                name="building"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value={10}>Voksenåsen Bygg 1</option>
            <option value={20}>Voksenåsen Bygg 2</option>
            <option value={30}>Voksenåsen Bygg 3</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" style={{marginRight: "32px"}}>
          <InputLabel
            ref={ref => {
              this.InputLabelRef = ref;
            }}
            htmlFor="outlined-age-native-simple"
          >
            Rom
          </InputLabel>
          <Select
            native
            margin="dense"
            value={this.state.room}
            onChange={this.handleChange('room')}
            input={
              <OutlinedInput
                name="room"
                labelWidth={this.state.labelWidth}
                id="outlined-age-native-simple"
              />
            }
          >
            <option value={10}>Rom 1</option>
            <option value={20}>Rom 2</option>
            <option value={30}>Rom 3</option>
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin="dense"
              label="Dato"
              value={this.state.date}
              onChange={this.handleDateChange}
              variant="outlined"
            />
        </MuiPickersUtilsProvider>
        <Button style={{marginRight: "16px", marginLeft: "32px"}}>
          Dag
        </Button>
        <Button style={{marginRight: "16px"}} color="primary">
          Måned
        </Button>
        <Button style={{marginRight: "16px"}} color="primary">
          År
        </Button>
      </div>
    );
  }
}

export default SelectorTab;
