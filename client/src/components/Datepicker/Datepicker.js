import React from "react";
import { Calendar } from "primereact/calendar";
class Datepicker extends React.Component {
  render() {
    return (
      <div>
        <Calendar
          value={this.props.value}
          onChange={(e) => this.props.handleDateValue(e.value)}
          showIcon={true}
          {...this.props}
        ></Calendar>
      </div>
    );
  }
}

export default Datepicker;
