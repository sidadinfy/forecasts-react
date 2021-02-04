import React from "react";

import { Helmet } from "react-helmet";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { linkNameMasterSKU } from "../../../routes";
import { Button } from "primereact/button";
import StaticDataService from "../../../services/DataService";

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
  render() {
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{linkNameMasterSKU}</title>
        </Helmet>
        <div className="mx-auto max-w-3xl">
          <div className="text-3xl font-bold text-center">
            Review And Release Order
          </div>
        </div>
      </>
    );
  }
}

export default ReviewReleaseOrder;
