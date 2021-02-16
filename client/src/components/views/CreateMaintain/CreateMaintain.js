import React from "react";
import MaintainService from "../../../services/MaintainService";
import StaticDataService from "../../../services/DataService";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Datepicker from "../../Datepicker/Datepicker";
class CreateMaintain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productCategory: "",
      skuCode: "",
      UOM: "",
      period: new Date(),
      statsForecast: 0,
      formInvalid: false,
      showSuccessMessage: false,
      recForecast: 0,
    };
  }

  resetFields = () => {
    this.setState({
      productCategory: "",
      skuCode: "",
      UOM: "",
      period: new Date(),
      statsForecast: 0,
      recForecast: 0,
    });
  };

  generateSKU = () => {
    StaticDataService.generateSKU(201, 301);
  };

  addNewMaintainItem = () => {
    let myObj = {
      product_category: this.state.productCategory,
      sku_code: this.state.skuCode,
      uom: this.state.UOM,
      period: this.state.period,
      stats_forecast: this.state.statsForecast,
      rec_forecast: this.state.recForecast,
    };
    if (this.state.productCategory && this.state.skuCode && this.state.UOM) {
      MaintainService.addNewMaintainItem(myObj)
        .then((res) => {
          if (res) {
            console.log("Success");
            this.setState(
              { formInvalid: false, showSuccessMessage: true },
              () => this.resetFields()
            );
          }
        })
        .catch((err) => {
          console.error(err, "error");
        });
    } else {
      this.setState({ formInvalid: true, showSuccessMessage: false });
      return;
    }
  };
  render() {
    return (
      <div className="max-w-sm sm:max-w-5xl mx-auto">
        <div className="text-2xl font-bold mb-10 mt-8 sm:mt-10">
          Create a Forecast Item
        </div>
        <div className="p-fluid p-formgrid p-grid">
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="firstname6">
              Product Category<sup>*</sup>
            </label>
            <InputText
              placeholder="Dental*"
              value={this.state.productCategory}
              onChange={(e) =>
                this.setState({ productCategory: e.target.value })
              }
              id="firstname6"
              type="text"
            />
          </div>
          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="lastname6">
              SKU<sup>*</sup>
            </label>
            <InputText
              placeholder="ABC123*"
              value={this.state.skuCode}
              onChange={(e) => this.setState({ skuCode: e.target.value })}
              id="lastname6"
              type="text"
            />
          </div>
          <div className="p-field p-col-12 p-md-2">
            <label htmlFor="lastname6">
              UOM<sup>*</sup>
            </label>
            <InputText
              placeholder="Tide*"
              id="lastname6"
              type="text"
              onChange={(e) => this.setState({ UOM: e.target.value })}
              value={this.state.UOM}
            />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="lastname6">Period</label>
            <Datepicker
              value={this.state.period}
              handleDateValue={(val) => this.setState({ period: val })}
            />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="city">Statistical Forecast</label>
            <InputText
              value={this.state.statsForecast}
              onChange={(e) => this.setState({ statsForecast: e.target.value })}
              type="number"
            />
          </div>
          <div className="p-field p-col-12 p-md-4">
            <label htmlFor="zip">Recommended Forecast</label>
            <InputText
              value={this.state.recForecast}
              onChange={(e) => this.setState({ recForecast: e.target.value })}
              type="number"
            />
          </div>
          <div className="p-field p-col-12 mt-4 sm:mt-10 mb-8 sm:mb-0">
            <Button
              onClick={this.addNewMaintainItem}
              type="button"
              label="Submit"
            />
            {this.state.formInvalid ? (
              <div
                id="username2-help"
                className="p-error p-d-block text-center"
              >
                Fill All Required Fields
              </div>
            ) : (
              ""
            )}
            {this.state.showSuccessMessage ? (
              <div className="text-green-400 text-center">
                Item Added Successfully
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default CreateMaintain;
