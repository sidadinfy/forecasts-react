import React from "react";
import { Helmet } from "react-helmet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { linkNameMaintain } from "../../../routes";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import SimpleDropdown from "../../SimpleDropdown/SimpleDropdown";
const citySelectItems = [
  { label: "New York", value: "NY" },
  { label: "Rome", value: "RM" },
  { label: "London", value: "LDN" },
  { label: "Istanbul", value: "IST" },
  { label: "Paris", value: "PRS" },
];
class Maintain extends React.Component {
  constructor(props) {
    super(props);
    this.df = React.createRef();
    this.state = {
      value: "",
      products: [
        {
          id: "70a34114-1c75-4592-9866-26fb94b5a402",
          product_category: "Dental",
          sku_code: "ABC123",
          uom: "Case",
          period: "23-Apr-2020",
          stats_forecast: 27,
        },
        {
          id: "b4fa6945-15b8-4ded-8ffb-82c9015f5460",
          product_category: "Detergents",
          sku_code: "Tide",
          uom: "Case",
          period: "12-Nov-2020",
          stats_forecast: 93,
        },
        {
          id: "4513cec3-bc5f-4ce3-aee5-7acec96d5e65",
          product_category: "Dental",
          sku_code: "ABC123",
          uom: "Case",
          period: "05-Jul-2020",
          stats_forecast: 59,
        },
        {
          id: "243832d7-7a0e-4531-995c-9a2998dcec2a",
          product_category: "Detergents",
          sku_code: "Tide",
          uom: "Case",
          period: "21-Mar-2020",
          stats_forecast: 39,
        },
        {
          id: "ccfc31a1-d6b2-4b0b-8fa2-92d7b25456b0",
          product_category: "Dental",
          sku_code: "ABC123",
          uom: "Case",
          period: "03-Sep-2020",
          stats_forecast: 20,
        },
        {
          id: "7b59a582-31cf-4b87-8b58-fb006087b17c",
          product_category: "Detergents",
          sku_code: "Tide",
          uom: "Case",
          period: "24-May-2020",
          stats_forecast: 29,
        },
        {
          id: "4b648056-cd3a-474f-b28c-455610238ea7",
          product_category: "Dental",
          sku_code: "ABC123",
          uom: "Case",
          period: "08-Mar-2020",
          stats_forecast: 70,
        },
        {
          id: "d757a278-0ecd-4c9b-901f-d6e4c716ee32",
          product_category: "Detergents",
          sku_code: "Tide",
          uom: "Case",
          period: "22-Jun-2020",
          stats_forecast: 53,
        },
        {
          id: "03f5ad06-fa90-41d9-b5e4-c615d4dd1c92",
          product_category: "Dental",
          sku_code: "ABC123",
          uom: "Case",
          period: "11-Oct-2020",
          stats_forecast: 28,
        },
        {
          id: "3f4c09fc-a381-4a78-b489-f0ec78c8b6bb",
          product_category: "Detergents",
          sku_code: "Tide",
          uom: "Case",
          period: "15-Jan-2021",
          stats_forecast: 98,
        },
      ],
    };
  }

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
  render() {
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
          <div className="grid grid-cols-3 col-gap-0 mt-3">
            <div>Forecast Period</div>
            <div className="flex items-center">
              <div className="pr-4">From</div>
              <div className="w-10/12">
                <InputText
                  id="firstname52"
                  type="text"
                  placeholder="Firstname"
                  style={{ width: "90.333333%" }}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="pr-4">To</div>
              <div className="w-10/12">
                <InputText
                  id="firstname5"
                  type="text"
                  placeholder="Firstname"
                  style={{ width: "86.333333%" }}
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 mt-2 col-gap-0 mb-6">
            <div>Product Category</div>
            <div className="">
              <SimpleDropdown
                options={citySelectItems}
                value={this.state.value}
                handleChange={(val) => {
                  this.setState({ value: val });
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
                  placeholder="SKU"
                  className="w-10/12 "
                />
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto my-5">
          <DataTable
            ref={this.df}
            value={this.state.products}
            className="p-datatable-striped w-full"
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
              headerStyle={{ textAlign: "center", width: "180px" }}
              bodyStyle={{ textAlign: "center", width: "180px" }}
              field="period"
              header="Period"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center" }}
              bodyStyle={{ textAlign: "center" }}
              field="stats_forecast"
              header="Statistical Forecast"
            ></Column>
            <Column
              headerStyle={{ textAlign: "center" }}
              bodyStyle={{ textAlign: "center" }}
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
