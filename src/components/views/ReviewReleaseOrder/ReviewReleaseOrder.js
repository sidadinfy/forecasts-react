import React from "react";

import { Helmet } from "react-helmet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { linkNameReviewReleaseOrder } from "../../../routes";
import { Button } from "primereact/button";
import StaticDataService from "../../../services/DataService";
import Datepicker from "../../Datepicker/Datepicker";

import SimpleDropdown from "../../SimpleDropdown/SimpleDropdown";
import { InputText } from "primereact/inputtext";

class ReviewReleaseOrder extends React.Component {
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
    StaticDataService.getAllRevisedReleasedOrders()
      .then((res) => {
        if (res) {
          this.setState({ data: res.data });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  renderRevisedQty = (rowdata) => {
    return (
      <div>
        <InputText
          value={rowdata.rec_forecast}
          id={rowdata.id}
          type="text"
          placeholder="Revised Quantity"
          onChange={(e) => {
            let maintainData = this.state.data;
            if (maintainData.length > 0) {
              let currentProd = maintainData.filter(
                (item) => item.id === rowdata.id
              );
              currentProd[0].rec_forecast = e.target.value;

              this.setState({ maintainData });
            }
          }}
        />
      </div>
    );
  };
  render() {
    let { filter } = this.state;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{linkNameReviewReleaseOrder}</title>
        </Helmet>
        <div className="mx-auto max-w-3xl">
          <div className="text-3xl font-bold text-center">
            Review And Release Order
          </div>
          <div className="flex items-center w-full">
            <div>
              <div className="grid grid-cols-3 col-gap-0 mt-3">
                <div>Forecast Period</div>
                <div className="flex items-center">
                  <div className="pr-4">From</div>
                  <div className="w-10/12">
                    <Datepicker
                      value={filter.fromDateValue}
                      style={{ width: "90.333333%" }}
                      handleDateValue={(val) => {
                        this.setState({
                          filter: { ...this.state.filter, fromDateValue: val },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="pr-4">To</div>
                  <div className="w-10/12">
                    <Datepicker
                      value={this.state.filter && this.state.filter.toDateValue}
                      style={{ width: "86.333333%" }}
                      disabled={
                        this.state.filter && !this.state.filter.fromDateValue
                      }
                      minDate={filter.fromDateValue}
                      handleDateValue={(val) => {
                        this.setState({
                          filter: { ...this.state.filter, toDateValue: val },
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 mt-2 col-gap-0 mb-6">
                <div>Product Category</div>
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
                  disabled={
                    this.state.filter &&
                    !this.state.filter.fromDateValue &&
                    !this.state.filter.toDateValue &&
                    !this.state.selectedCategory
                      ? true
                      : false
                  }
                  className="p-button-rounded p-button-danger p-button-raised p-button-outlined"
                  onClick={this.handleReset}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-8xl mx-auto my-5 datatable-responsive-demo">
          <DataTable
            ref={this.df}
            value={this.state.data}
            className="p-datatable-striped datatable-responsive-demo w-full"
            scrollable={true}
          >
            <Column
              headerStyle={{ textAlign: "center", width: "180px" }}
              bodyStyle={{ textAlign: "center", width: "180px" }}
              field="product_category"
              header="Product Category"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "110px" }}
              bodyStyle={{ textAlign: "center", width: "110px" }}
              field="sku"
              header="SKU"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="uom"
              header="UOM"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="lead_time"
              header="Lead Time"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="sourcing_location"
              header="Sourcing Location"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="days_of_stock"
              header="Days Of Stock"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="intransit_inventory_days"
              header="Intransit Inventory Days"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="forecast_demand"
              header="Forecast Demand"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="recommended_order"
              header="Recommended Order"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "220px" }}
              bodyStyle={{ textAlign: "center", width: "220px" }}
              field="revised_order_qty"
              header="Revised Order Qty"
              body={(rowdata) => this.renderRevisedQty(rowdata)}
            ></Column>
          </DataTable>
        </div>
      </>
    );
  }
}

export default ReviewReleaseOrder;
