import React from "react";
import { Dropdown } from "primereact/dropdown";
const citySelectItems = [
  { label: "New York", value: "NY" },
  { label: "Rome", value: "RM" },
  { label: "London", value: "LDN" },
  { label: "Istanbul", value: "IST" },
  { label: "Paris", value: "PRS" },
];
class SimpleDropdown extends React.Component {
  render() {
    return (
      <Dropdown
        value={this.props.value}
        options={citySelectItems}
        onChange={(e) => this.props.handleChange(e.value)}
        placeholder="Select a City"
        {...this.props}
      />
    );
  }
}

export default SimpleDropdown;
