import React from "react";
import { Helmet } from "react-helmet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { linkNameMaintain } from "../../../routes";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import SimpleDropdown from "../../SimpleDropdown/SimpleDropdown";
import StaticDataService from "../../../services/DataService";
import { Toast } from "primereact/toast";
import Datepicker from "../../Datepicker/Datepicker";
import Importer from "../../Importer/Importer";
class Maintain extends React.Component {
  constructor(props) {
    super(props);
    this.df = React.createRef();
    this.toastRef = React.createRef();
    this.importRef = React.createRef();
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
          value={rowdata.rec_forecast}
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
    this.setState({ filter: {}, products: [] }, () => {
      this.getAllProducts();
    });
  };

  saveData = () => {
    this.toastRef.current.show({
      severity: "success",
      summary: "Success Message",
      detail: "Data Saved",
    });
  };

  handleUploader = (event) => {
    var reader = new FileReader();
    let arr = [];
    reader.onload = (e) => {
      var rows = e.target.result.split("\n");
      for (let i = 1; i < rows.length; i++) {
        let obj = {};

        let cells = rows[i].split(",");
        for (let j = 0; j < cells.length; j++) {
          cells[j] = cells[j].toString().replace(/["']/g, "");
          if (j === 0) {
            obj.product_category = cells[j];
          }
          if (j === 1) {
            obj.sku_code = cells[j];
          }
          if (j === 2) {
            obj.uom = cells[j];
          }
          if (j === 3) {
            obj.period = cells[j];
          }
          if (j === 4) {
            obj.stats_forecast = cells[j];
          }
          if (j === 5) {
            obj.rec_forecast = cells[j];
          }
        }

        arr.push(obj);
        this.setState({
          products: arr,
        });
      }
    };
    reader.onloadend = (e) => {
      console.log("Loaded", e.loaded);
      this.importRef.current.clear();
    };
    reader.readAsText(event.files[0]);
    //event.files == files to upload
  };

  renderFooter() {
    return (
      <div className="flex justify-between mt-2">
        <div>
          <Button
            label="Export"
            className="p-button-info"
            onClick={() => {
              this.df.current.exportCSV();
            }}
          />
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <Importer
              uploadBoxref={this.importRef}
              myUploader={this.handleUploader}
            />
          </div>
          <div>
            <Button
              label="Save"
              className="p-button-success"
              onClick={this.saveData}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    let { filter } = this.state;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{linkNameMaintain}</title>
        </Helmet>
        <Toast ref={this.toastRef} />
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
            footer={this.renderFooter()}
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
        </div>
      </>
    );
  }
}

export default Maintain;
