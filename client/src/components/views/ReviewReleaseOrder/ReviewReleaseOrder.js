import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React from "react";
import { Toast } from "primereact/toast";
import { Helmet } from "react-helmet";
import { linkNameReviewReleaseOrder } from "../../../routes";
import StaticDataService from "../../../services/DataService";
import ReleaseService from "../../../services/ReleaseService";
import Datepicker from "../../Datepicker/Datepicker";
import Importer from "../../Importer/Importer";
import SearchDropdown from "../../SearchDropdown/SearchDropdown";
import SimpleDropdown from "../../SimpleDropdown/SimpleDropdown";

class ReviewReleaseOrder extends React.Component {
  constructor(props) {
    super(props);
    this.df = React.createRef();
    this.importRef = React.createRef();
    this.toastRef = React.createRef();
    this.state = {
      dataChanged: false,
      updatedItems: {},
      filter: {
        fromDateValue: null,
        toDateValue: null,
        selectedCategory: "",
      },
      loading: true,
      importMap: {},
      data: [],
      originalData: [],
      categoryList: [],
      skuCodes: [],
      originalSKUCodes: [],
      sku: "",
    };
  }

  componentDidMount() {
    this.getAllOrders();
    this.getAllProductCategories();
    this.getAllSKUCodes();
  }

  getAllOrders = () => {
    ReleaseService.getAllReleaseOrders()
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
        console.log(err);
      });
  };

  getAllSKUCodes = () => {
    StaticDataService.getAllSKUCodes().then((res) => {
      if (res) {
        this.setState({ skuCodes: res.data, originalSKUCodes: res.data });
      }
    });
  };

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
    debugger;
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
    if (this.state.filter && this.state.filter.selectedCategory) {
      debugger;
      //Only Selected Category
      filtered = allProducts.filter(
        (item) =>
          item.product_category.toLowerCase() ===
          this.state.filter.selectedCategory
      );
    }
    if (this.state.sku) {
      //Only SKU
      filtered = allProducts.filter(
        (item) => item.sku.toLowerCase() === this.state.sku.toLowerCase()
      );
    }
    if (this.state.filter.selectedCategory && this.state.sku) {
      //Both Category and SKU
      filtered = allProducts.filter((item) => {
        if (
          item.product_category.toLowerCase() ===
            this.state.filter.selectedCategory &&
          item.sku.toLowerCase() === this.state.sku.toLowerCase()
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
          item.sku.toLowerCase() === this.state.sku.toLowerCase()
        ) {
          return item;
        }
        return null;
      });
    }

    if (
      fromDateValue &&
      toDateValue &&
      this.state.filter &&
      this.state.filter.selectedCategory
    ) {
      //All From Date and To Date and Category
      filtered = allProducts.filter((item) => {
        if (
          new Date(item.period) >= fromDateValue &&
          new Date(item.period) <= toDateValue &&
          item.product_category.toLowerCase() ===
            this.state.filter.selectedCategory
        ) {
          return item;
        }
        return null;
      });
    }

    if (
      fromDateValue &&
      toDateValue &&
      this.state.filter &&
      this.state.filter.selectedCategory &&
      this.state.sku
    ) {
      //All From Date and To date and Category and SKu
      filtered = allProducts.filter((item) => {
        if (
          new Date(item.period) >= fromDateValue &&
          new Date(item.period) <= toDateValue &&
          item.product_category.toLowerCase() ===
            this.state.filter.selectedCategory &&
          item.sku.toLowerCase() === this.state.sku.toLowerCase()
        ) {
          return item;
        }
        return null;
      });
    }

    this.setState({ data: filtered });
  };

  renderRevisedQty = (rowdata) => {
    return (
      <div>
        <InputText
          value={
            rowdata.revised_order_qty !== "" ||
            rowdata.revised_order_qty !== null
              ? rowdata.revised_order_qty
              : ""
          }
          id={rowdata._id}
          type="text"
          placeholder="Revised Quantity"
          onChange={(e) => {
            let maintainData = this.state.data;
            if (maintainData.length > 0) {
              let currentProd = maintainData.filter(
                (item) => item._id === rowdata._id
              );

              currentProd[0].revised_order_qty = e.target.value;

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

  handleReset = () => {
    this.setState({ filter: {}, data: [], sku: "" }, () => {
      this.getAllOrders();
    });
  };

  handleUploader = (event) => {
    var reader = new FileReader();
    let arr = [];
    reader.onload = (e) => {
      var rows = e.target.result.split("\n");
      for (let i = 1; i < rows.length; i++) {
        let obj = {};
        let cells = rows[i].split("#");
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
            obj.lead_time = cells[j];
          }
          if (j === 4) {
            obj.sourcing_location = cells[j];
          }
          if (j === 5) {
            obj.days_of_stock = cells[j];
          }
          if (j === 6) {
            obj.intransit_inventory_days = cells[j];
          }
          if (j === 7) {
            obj.forecast_demand = cells[j];
          }
          if (j === 8) {
            obj.recommended_order = cells[j];
          }
          if (j === 9) {
            obj.revised_order_qty = cells[j];
          }
        }
        //obj["id"] = Math.abs(i - 1);
        arr.push(obj);
        this.setState({
          data: arr,
        });
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

  searchSKU = (event) => {
    let { skuCodes } = this.state;
    setTimeout(() => {
      let filteredCountries;
      if (!event.query.trim().length) {
        filteredCountries = [...skuCodes];
      } else {
        filteredCountries = skuCodes.filter((code) => {
          return code.value.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }
      this.setState({ suggestedSKU: filteredCountries });
    }, 250);
  };

  saveData = () => {
    if (Object.keys(this.state.updatedItems).length > 0) {
      let data = this.state.updatedItems;
      for (const key in data) {
        ReleaseService.updateSingleReleaseOrder(
          data[key]["sku_code"],
          data[key]["uom"],
          data[key]
        )
          .then((res) => {
            if (res) {
              console.log("Success", data[key]["_id"]);
              this.setState({ loading: true }, () => {
                this.getAllOrders();
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
        ReleaseService.updateSingleReleaseOrder(
          item["sku_code"],
          item["uom"],
          item
        )
          .then((res) => {
            if (res) {
              console.log("Success - Export", item);
              this.setState({ loading: true }, () => {
                this.getAllOrders();
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
          <title>{linkNameReviewReleaseOrder}</title>
        </Helmet>
        <Toast ref={this.toastRef} />
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
                    value={
                      this.state.filter && this.state.filter.selectedCategory
                    }
                    handleChange={(val) => {
                      this.setState(
                        {
                          filter: {
                            ...this.state.filter,
                            selectedCategory: val,
                          },
                        },
                        () => {
                          this.getSKUBasedOnCategory(val);
                        }
                      );
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
                    !this.state.filter.selectedCategory &&
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
        <div className="max-w-8xl mx-auto my-5 datatable-responsive-demo">
          <DataTable
            ref={this.df}
            value={this.state.data}
            className="p-datatable-striped datatable-responsive-demo w-full"
            scrollable={true}
            emptyMessage="No Data Found"
            footer={this.renderFooter()}
            loading={this.state.loading}
            csvSeparator="#"
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
