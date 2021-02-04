import React from "react";
import { Helmet } from "react-helmet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { linkNameMaintain } from "../../../routes";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import SimpleDropdown from "../../SimpleDropdown/SimpleDropdown";
import StaticDataService from "../../../services/DataService";
import Datepicker from "../../Datepicker/Datepicker";
class Maintain extends React.Component {
  constructor(props) {
    super(props);
    this.df = React.createRef();
    this.state = {
      selectedCategory: "",
      sku: "",
      fromDateValue: null,
      toDateValue: null,
      categoryList: [],
      products: [],
      filter: {
        fromDateValue: null,
        toDateValue: null,
        selectedCategory: "",
        sku: "",
      },
    };
  }

  componentDidMount() {
    this.getAllProducts();
    this.getAllProductCategories();
  }

  getAllProductCategories = () => {
    StaticDataService.getProductCategories()
      .then((res) => {
        if (res) {
          this.setState({ categoryList: res.data });
        }
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  getAllProducts = () => {
    StaticDataService.getAllProducts()
      .then((res) => {
        if (res) {
          this.setState({ products: res.data });
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  renderRecBody = (rowdata) => {
    return (
      <div>
        <InputText
          id={rowdata.id}
          type="text"
          placeholder="Recommended Forecast"
          onChange={(e) => {
            let products = this.state.products;
            if (products.length > 0) {
              let currentProd = products.filter(
                (item) => item.id === rowdata.id
              );
              currentProd[0].rec_forecast = e.target.value;

              this.setState({ products });
            }
          }}
        />
      </div>
    );
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

  handleSearch = () => {
    let allProducts = [...this.state.products];
    let fromDateValue = this.state.filter && this.state.filter.fromDateValue;
    let toDateValue = this.state.filter && this.state.filter.toDateValue;
    if (fromDateValue && toDateValue) {
      let filtered = allProducts.filter((item) => {
        console.log(new Date(item.period) - toDateValue <= 0);
        if (
          new Date(item.period) >= fromDateValue &&
          new Date(item.period) <= toDateValue
        ) {
          return item;
        }
        return null;
      });
      this.setState({ products: filtered });
      console.log("Filtered", filtered);
    }
  };

  handleReset = () => {
    this.setState({ filter: {} }, () => {
      this.getAllProducts();
    });
  };

  render() {
    let { filter } = this.state;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{linkNameMaintain}</title>
        </Helmet>
        <div className="mx-auto max-w-2xl">
          <div className="text-3xl font-bold text-center">
            Maintain Forecast
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
                    !this.state.filter.toDateValue
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
        <div className="max-w-6xl mx-auto my-5 datatable-responsive-demo">
          <DataTable
            ref={this.df}
            value={this.state.products}
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
              field="sku_code"
              header="SKU Code"
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
              field="period"
              header="Period"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "120px" }}
              bodyStyle={{ textAlign: "center", width: "120px" }}
              field="stats_forecast"
              header="Statistical Forecast"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center", width: "220px" }}
              bodyStyle={{ textAlign: "center", width: "220px" }}
              field="rec_forecast"
              header="Recommended Forecast"
              body={(rowdata) => this.renderRecBody(rowdata)}
            ></Column>
          </DataTable>
          <Button
            label="Export"
            className="p-button-success"
            onClick={() => {
              this.df.current.exportCSV();
            }}
          />
        </div>
      </>
    );
  }
}

export default Maintain;
