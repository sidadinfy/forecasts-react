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

  componentDidMount() {
    this.getAllSKUCodes();
  }

  getAllSKUCodes = () => {
    StaticDataService.getAllSKUCodes()
      .then((res) => {
        if (res) {
          this.setState({ allSKUCodes: res.data, orginalData: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  searchCountry = (event) => {
    let { allSKUCodes } = this.state;
    setTimeout(() => {
      let filteredCountries;
      if (!event.query.trim().length) {
        filteredCountries = [...allSKUCodes];
      } else {
        filteredCountries = allSKUCodes.filter((code) => {
          return code.value.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.setState({ filteredSKU: filteredCountries });
    }, 250);
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
