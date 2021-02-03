import React from "react";
import { Helmet } from "react-helmet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { linkNameMaintain } from "../../../routes";
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
    this.state = {
      value: "",
      products: [
        {
          id: "1000",
          code: "f230fh0g3",
          name: "Bamboo Watch",
          description: "Product Description",
          image: "bamboo-watch.jpg",
          price: 65,
          category: "Accessories",
          quantity: 24,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1001",
          code: "nvklal433",
          name: "Black Watch",
          description: "Product Description",
          image: "black-watch.jpg",
          price: 72,
          category: "Accessories",
          quantity: 61,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1002",
          code: "zz21cz3c1",
          name: "Blue Band",
          description: "Product Description",
          image: "blue-band.jpg",
          price: 79,
          category: "Fitness",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1003",
          code: "244wgerg2",
          name: "Blue T-Shirt",
          description: "Product Description",
          image: "blue-t-shirt.jpg",
          price: 29,
          category: "Clothing",
          quantity: 25,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1004",
          code: "h456wer53",
          name: "Bracelet",
          description: "Product Description",
          image: "bracelet.jpg",
          price: 15,
          category: "Accessories",
          quantity: 73,
          inventoryStatus: "INSTOCK",
          rating: 4,
        },
        {
          id: "1005",
          code: "av2231fwg",
          name: "Brown Purse",
          description: "Product Description",
          image: "brown-purse.jpg",
          price: 120,
          category: "Accessories",
          quantity: 0,
          inventoryStatus: "OUTOFSTOCK",
          rating: 4,
        },
        {
          id: "1006",
          code: "bib36pfvm",
          name: "Chakra Bracelet",
          description: "Product Description",
          image: "chakra-bracelet.jpg",
          price: 32,
          category: "Accessories",
          quantity: 5,
          inventoryStatus: "LOWSTOCK",
          rating: 3,
        },
        {
          id: "1007",
          code: "mbvjkgip5",
          name: "Galaxy Earrings",
          description: "Product Description",
          image: "galaxy-earrings.jpg",
          price: 34,
          category: "Accessories",
          quantity: 23,
          inventoryStatus: "INSTOCK",
          rating: 5,
        },
        {
          id: "1008",
          code: "vbb124btr",
          name: "Game Controller",
          description: "Product Description",
          image: "game-controller.jpg",
          price: 99,
          category: "Electronics",
          quantity: 2,
          inventoryStatus: "LOWSTOCK",
          rating: 4,
        },
        {
          id: "1009",
          code: "cm230f032",
          name: "Gaming Set",
          description: "Product Description",
          image: "gaming-set.jpg",
          price: 299,
          category: "Electronics",
          quantity: 63,
          inventoryStatus: "INSTOCK",
          rating: 3,
        },
      ],
    };
  }
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
                  id="firstname5"
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

        <DataTable value={this.state.products}>
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="category" header="Category"></Column>
          <Column field="quantity" header="Quantity"></Column>
        </DataTable>
      </>
    );
  }
}

export default Maintain;
