import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import React from "react";
import { Helmet } from "react-helmet";
import { linkNameMaintain } from "../../../routes";
import StaticDataService from "../../../services/DataService";
import MaintainService from "../../../services/MaintainService";
import Datepicker from "../../Datepicker/Datepicker";
import Importer from "../../Importer/Importer";
import SearchDropdown from "../../SearchDropdown/SearchDropdown";
import SimpleDropdown from "../../SimpleDropdown/SimpleDropdown";
class Maintain extends React.Component {
  constructor(props) {
    super(props);
    this.df = React.createRef();
    this.toastRef = React.createRef();
    this.importRef = React.createRef();
    this.state = {
      isProcessing: false,
      suggestedSKU: [],
      loading: true,
      updatedItems: {},
      sku: "",
      categoryList: [],
      data: [],
      dataChanged: false,
      originalData: [],
      skuCodes: [],
      filter: {
        fromDateValue: null,
        toDateValue: null,
        selectedCategory: "",
      },
    };
  }

  componentDidMount() {
    this.getAllProducts();
    this.getAllProductCategories();
    this.getAllSKUCodes();
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
    MaintainService.getAllForecasts()
      .then((res) => {
        if (res) {
          this.setState({
            data: res.data,
            originalData: res.data,
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  getAllSKUCodes = () => {
    StaticDataService.getAllSKUCodes().then((res) => {
      if (res) {
        this.setState({ skuCodes: res.data, originalSKUCodes: res.data });
      }
    });
  };

  processData = () => {
    this.setState({ isProcessing: true });
    MaintainService.processData()
      .then((res) => {
        if (res) {
          console.log("Data Processed", res.data);
          this.setState({ isProcessing: false });
          this.toastRef.current.show({
            severity: "warn",
            summary: "Info Message",
            detail: res.data.data,
            sticky: true,
          });
        }
      })
      .catch((err) => {
        this.toastRef.current.show({
          severity: "error",
          summary: "Error Message",
          detail: "Something Wen Wrong",
          sticky: true,
        });
        this.setState({ isProcessing: false });
        console.log("Error In Processing", err);
      });
  };

  renderRecBody = (rowdata) => {
    return (
      <div>
        <InputText
          value={
            rowdata.rec_forecast !== "" || rowdata.rec_forecast !== null
              ? rowdata.rec_forecast
              : ""
          }
          id={rowdata.id}
          type="text"
          placeholder="Recommended Forecast"
          onChange={(e) => {
            let maintainData = this.state.data;
            if (maintainData.length > 0) {
              let currentProd = maintainData.filter(
                (item) => item._id === rowdata._id
              );
              currentProd[0].rec_forecast = e.target.value || "";
              this.setState({
                data: maintainData,
                updatedItems: {
                  ...this.state.updatedItems,
                  [rowdata._id]: rowdata,
                },
              });
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
    let allProducts = [...this.state.originalData];
    let filtered = [...this.state.originalData];
    let fromDateValue = this.state.filter && this.state.filter.fromDateValue;
    let toDateValue = this.state.filter && this.state.filter.toDateValue;
    if (fromDateValue && toDateValue) {
      //Only From Date and To Date
      filtered = allProducts.filter((item) => {
        console.log(new Date(item.period) - toDateValue <= 0);
        if (
          new Date(item.period) >= fromDateValue &&
          new Date(item.period) <= toDateValue
        ) {
          return item;
        }
        return null;
      });
    }
    if (this.state.selectedCategory) {
      //Only Selected Category
      filtered = allProducts.filter(
        (item) =>
          item.product_category.toLowerCase() === this.state.selectedCategory
      );
    }
    if (this.state.sku) {
      //Only SKU
      filtered = allProducts.filter(
        (item) => item.sku_code.toLowerCase() === this.state.sku.toLowerCase()
      );
    }
    if (this.state.selectedCategory && this.state.sku) {
      //Both Category and SKU
      filtered = allProducts.filter((item) => {
        if (
          item.product_category.toLowerCase() === this.state.selectedCategory &&
          item.sku_code.toLowerCase() === this.state.sku.toLowerCase()
        ) {
          return item;
        } else {
          return null;
        }
      });
    }

    if (fromDateValue && toDateValue && this.state.sku) {
      //All From Date and To Date and SKU
      filtered = allProducts.filter((item) => {
        if (
          new Date(item.period) >= fromDateValue &&
          new Date(item.period) <= toDateValue &&
          item.sku_code.toLowerCase() === this.state.sku.toLowerCase()
        ) {
          return item;
        }
        return null;
      });
    }

    if (fromDateValue && toDateValue && this.state.selectedCategory) {
      //All From Date and To Date and Category
      filtered = allProducts.filter((item) => {
        if (
          new Date(item.period) >= fromDateValue &&
          new Date(item.period) <= toDateValue &&
          item.product_category.toLowerCase() === this.state.selectedCategory
        ) {
          return item;
        }
        return null;
      });
    }

    if (
      fromDateValue &&
      toDateValue &&
      this.state.selectedCategory &&
      this.state.sku
    ) {
      //All From Date and To date and Category and SKu
      filtered = allProducts.filter((item) => {
        if (
          new Date(item.period) >= fromDateValue &&
          new Date(item.period) <= toDateValue &&
          item.product_category.toLowerCase() === this.state.selectedCategory &&
          item.sku_code.toLowerCase() === this.state.sku.toLowerCase()
        ) {
          return item;
        }
        return null;
      });
    }

    this.setState({ data: filtered });
  };

  handleReset = () => {
    this.setState(
      { filter: {}, data: [], selectedCategory: "", sku: "" },
      () => {
        this.getAllProducts();
      }
    );
  };

  saveData = () => {
    if (Object.keys(this.state.updatedItems).length > 0) {
      let data = this.state.updatedItems;
      for (const key in data) {
        MaintainService.updateSingleMaintain(data[key]["_id"], data[key])
          .then((res) => {
            if (res) {
              console.log("Success", data[key]["_id"]);
              this.setState({ loading: true }, () => {
                this.getAllProducts();
              });
            }
          })
          .catch((err) => {
            console.log("Error", err);
            this.toastRef.current.show({
              severity: "error",
              summary: "Error Message",
              detail: "Some Items Did Not Save Properly",
              sticky: true,
            });
            return;
          });
      }
    } else if (this.state.dataChanged) {
      let data = this.state.data;
      data.map((item, index) => {
        MaintainService.updateSingleMaintain(item["_id"], item)
          .then((res) => {
            if (res) {
              console.log("Success - Export", item);
              this.setState({ loading: true }, () => {
                this.getAllProducts();
              });
            }
          })
          .catch((err) => {
            let { keyValue } = err.response.data.error;
            let keys = Object.keys(keyValue);
            let values = Object.values(keyValue);
            console.log("Error", err.response.data.error.keyValue);
            this.toastRef.current.show({
              severity: "error",
              summary: "Error Message",
              detail: `${keys[0]} of value ${values[0]} is duplicate item`,
              sticky: true,
              closable: true,
            });
            return;
          });
      });
    }
  };

  genRanHex = (size) =>
    [...Array(size)]
      .map(() => Math.floor(Math.random() * 16).toString(16))
      .join("");

  handleUploader = (event) => {
    var reader = new FileReader();
    let arr = [];
    reader.onload = (e) => {
      var rows = e.target.result.split("\n");
      let idExists = false;
      for (let i = 0; i < rows.length; i++) {
        let obj = {};
        let cells = rows[i].split(",");

        for (let j = 0; j < cells.length; j++) {
          cells[j] = cells[j].toString().replace(/["']/g, "");
          if (i == 0) {
            if (cells[j] === "ID") {
              idExists = true;
              console.log("CELLS", cells[j], j);
            } else {
              console.log("ID Doesnt exxists");
            }
          } else {
            if (j === 0) {
              if (idExists && cells[j] !== "") {
                obj._id = cells[j];
              } else {
                obj._id = this.genRanHex(12);
              }
            }
            if (j === 1) {
              obj.product_category = cells[j];
            }
            if (j === 2) {
              obj.sku_code = cells[j];
            }
            if (j === 3) {
              obj.uom = cells[j];
            }
            if (j === 4) {
              obj.period = cells[j];
            }
            if (j === 5) {
              obj.stats_forecast = cells[j];
            }
            if (j === 6) {
              obj.rec_forecast = cells[j];
            }
          }
        }
        if (i == 0) {
          //Do Nothing
        } else {
          arr.push(obj);
          this.setState({
            data: arr,
          });
        }
      }
    };
    reader.onloadend = (e) => {
      console.log("Loaded", e.loaded);
      this.setState({
        filter: {},
        selectedCategory: "",
        sku: "",
        dataChanged: true,
      });
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
          <div className="mr-2">
            <Button
              label="Save"
              className="p-button-success"
              onClick={this.saveData}
            />
          </div>
          <div>
            <Button
              disabled={this.state.isProcessing}
              icon={
                this.state.isProcessing
                  ? "pi pi-spin pi-spinner"
                  : "pi pi-chart-line"
              }
              label="Process Data"
              className="p-button-warning"
              onClick={this.processData}
            />
          </div>
        </div>
      </div>
    );
  }

  searchSKU = (event) => {
    let { skuCodes } = this.state;
    setTimeout(() => {
      let filteredCountries;
      if (!event.query.trim().length) {
        filteredCountries = [...skuCodes];
      } else {
        filteredCountries = skuCodes.filter((code) => {
          return code.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.setState({ suggestedSKU: filteredCountries });
    }, 250);
  };
  render() {
    let { filter } = this.state;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{linkNameMaintain}</title>
        </Helmet>
        <Toast ref={this.toastRef} />
        <div className="mx-auto max-w-3xl">
          <div className="text-3xl font-bold text-center">
            Maintain Forecast
          </div>
          <div className="flex items-center w-full">
            <div>
              <div className="grid grid-cols-3 col-gap-0 mt-3">
                <div>Forecast Period</div>
                <div className="flex items-center">
                  <div className="pr-4">From</div>
                  <div>
                    <Datepicker
                      value={filter.fromDateValue}
                      handleDateValue={(val) => {
                        this.setState({
                          filter: {
                            ...this.state.filter,
                            fromDateValue: val,
                            toDateValue: val,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center ml-4">
                  <div className="pr-4">To</div>
                  <div>
                    <Datepicker
                      value={this.state.filter && this.state.filter.toDateValue}
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
              <div className="grid grid-cols-3 mt-2 col-gap-0">
                <div>Product Category</div>
                <div className="w-full">
                  <SimpleDropdown
                    style={{ width: "100%" }}
                    options={this.state.categoryList}
                    value={this.state.selectedCategory}
                    handleChange={(val) => {
                      this.setState({ selectedCategory: val }, () => {
                        this.getSKUBasedOnCategory(val);
                      });
                    }}
                  />
                </div>
                <div className="flex items-center ml-4">
                  <div className="pr-4">SKU</div>
                  <div>
                    <SearchDropdown
                      dropdown
                      sku={this.state.sku}
                      suggestedSKU={this.state.suggestedSKU}
                      searchSKU={this.searchSKU}
                      skuChangeHandler={(val) => {
                        this.setState({ sku: val });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center ml-4">
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
                    !this.state.selectedCategory &&
                    !this.state.sku
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
            value={this.state.data}
            className="p-datatable-striped datatable-responsive-demo w-full"
            scrollable={true}
            footer={this.renderFooter()}
            emptyMessage="No Data Found"
            loading={this.state.loading}
          >
            <Column
              style={{ display: "none" }}
              field="_id"
              header="ID"
              body={(rowdata) => ""}
            ></Column>
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
              body={(rowdata) =>
                rowdata.period === ""
                  ? rowdata.period
                  : new Date(rowdata.period).toLocaleDateString()
              }
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
