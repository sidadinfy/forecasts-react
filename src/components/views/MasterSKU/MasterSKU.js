import React from "react";
import { Helmet } from "react-helmet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { linkNameMasterSKU } from "../../../routes";
import { Button } from "primereact/button";
import StaticDataService from "../../../services/DataService";

import SimpleDropdown from "../../SimpleDropdown/SimpleDropdown";
import { InputText } from "primereact/inputtext";

class MasterSKU extends React.Component {
  constructor(props) {
    super(props);
    this.dt = React.createRef();
    this.state = {
      filter: {},
      data: [],
      original: [],
      categoryList: [],
      sku: "",
      selectedCategory: "",
    };
  }

  componentDidMount() {
    this.getMasterSKUData();
    this.getProductCategories();
  }

  getMasterSKUData = () => {
    StaticDataService.getAllMasterSKUData().then((res) => {
      if (res) {
        this.setState({ data: res.data, original: res.data });
      }
    });
  };

  getProductCategories = () => {
    StaticDataService.getProductCategories().then((res) => {
      if (res) {
        this.setState({ categoryList: res.data });
      }
    });
  };

  getSKUBasedOnCategory = (category) => {
    StaticDataService.getSKUBasedOnCategory(category)
      .then((res) => {
        if (res) {
          this.setState({ sku: res.data.sku });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleReset = () => {
    this.setState({ selectedCategory: "", sku: "" }, () => {
      this.getMasterSKUData();
    });
  };

  handleSearch = () => {
    let allData = [...this.state.original];
    let selectedCategory = this.state.selectedCategory;
    console.log("all", allData);
    let filtered = allData.filter(
      (item) => item.category.toLowerCase() === selectedCategory
    );
    console.log("Filtered", filtered);
    this.setState({ data: filtered });
  };

  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{linkNameMasterSKU}</title>
        </Helmet>
        <div className="mx-auto max-w-3xl">
          <div className="text-3xl font-bold text-center">View SKU Master</div>
          <div className="flex items-center w-full mt-6">
            <div className="grid grid-cols-3 col-gap-0">
              <div className="flex items-center">Product Category</div>
              <div className="">
                <SimpleDropdown
                  options={this.state.categoryList}
                  value={this.state.selectedCategory}
                  handleChange={(val) => {
                    this.setState({ selectedCategory: val }, () => {
                      this.getSKUBasedOnCategory(val);
                    });
                  }}
                  className="w-11/12"
                />
              </div>
              <div className="flex items-center">
                <div className="pr-4">SKU</div>
                <div className="w-10/12">
                  <InputText
                    disabled
                    id="sku"
                    type="text"
                    value={this.state.sku}
                    placeholder="SKU"
                    className="w-10/12 "
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div>
                <Button
                  icon="pi pi-search"
                  className="p-button-raised p-button-rounded"
                  tooltip="Search"
                  tooltipOptions={{ position: "top" }}
                  onClick={this.handleSearch}
                />
              </div>
              <div className="ml-2">
                <Button
                  icon="pi pi-times"
                  disabled={!this.state.selectedCategory ? true : false}
                  className="p-button-rounded p-button-danger p-button-raised p-button-outlined"
                  onClick={this.handleReset}
                />
              </div>
              <div className="ml-2">
                <Button
                  label="Export"
                  className="p-button-info"
                  onClick={() => {
                    this.dt.current.exportCSV();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 datatable-responsive-demo">
          <DataTable
            ref={this.dt}
            value={this.state.data}
            className="p-datatable-striped datatable-responsive-demo w-full"
            scrollable={true}
            paginator={true}
            rows={10}
          >
            <Column
              field="category"
              header="Product Category"
              style={{ width: "100px" }}
            ></Column>
            <Column
              field="sku"
              header="SKU Code"
              style={{ width: "100px" }}
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="sku_description"
              header="Description"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="sourcing_location"
              header="Location"
            ></Column>
            <Column style={{ width: "90px" }} field="uom" header="UOM"></Column>
            <Column
              style={{ width: "50px" }}
              field="abc_class"
              header="ABC Class"
            ></Column>
            <Column
              style={{ width: "70px" }}
              field="xyz_class"
              header="XYZ Class"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="movement_class"
              header="Movement Class"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="purchase_price"
              header="Purchase Price"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="sell_price"
              header="Sell Price"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="margin"
              header="Margin"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="moq"
              header="MOQ"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="soh"
              header="SOH"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="soh_days"
              header="SOH Days"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="avg_demand_per_day"
              header="Avg Demand / Day"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="stock_value"
              header="Stock Value"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="stock_transit"
              header="Stock Transit"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="open_po_qty"
              header="Open PO Qty"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="open_so_qty"
              header="Open SO Qty"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="lead_time_in_days"
              header="Lead Time In Days"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="roq_units"
              header="ROQ Units"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="safety_stock_units"
              header="Safety Stock Units"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="min_units"
              header="Min Units"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="max_units"
              header="Max Units"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="tm_forecast_accuracy"
              header="Twelve Month Forecast Accuracy"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="shortage_units"
              header="Shortage Units"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="excess_units"
              header="Excess Units"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="target_fill"
              header="Target Fill"
            ></Column>
            <Column
              style={{ width: "100px" }}
              field="actual_fill"
              header="Actual Fill"
            ></Column>
          </DataTable>
        </div>
      </>
    );
  }
}

export default MasterSKU;
