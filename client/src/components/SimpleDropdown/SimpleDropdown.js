import React from "react";
import { Dropdown } from "primereact/dropdown";

class SimpleDropdown extends React.Component {
  render() {
    return (
      <Dropdown
        value={this.props.value}
        onChange={(e) => this.props.handleChange(e.value)}
        placeholder="Select a Category"
        {...this.props}
      />
    );
  }
}

export default SimpleDropdown;
