import React from "react";
import { AutoComplete } from "primereact/autocomplete";
import StaticDataService from "../../services/DataService";
class SearchDropdown extends React.Component {
  state = {
    selectedCountry: "",
    allSKUCodes: [],
    orginalData: [],
    filteredSKU: [],
  };

  render() {
    return (
      <AutoComplete
        value={this.props.sku}
        field="name"
        suggestions={this.props.suggestedSKU}
        completeMethod={(e) => this.props.searchSKU(e)}
        onChange={(e) => this.props.skuChangeHandler(e.value)}
        {...this.props}
      />
    );
  }
}

export default SearchDropdown;
