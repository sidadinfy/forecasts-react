import React from "react";
//Links
export const linkMaintain = "/";
export const linkMasterSKU = "/mastersku";
//Links

//Link Names
export const linkNameMaintain = "Maintain Forecasts";
export const linkNameMasterSKU = "Master SKU";
//Link Names

const Maintain = React.lazy(() =>
  import("./components/views/Maintain/Maintain")
);
const MasterSKU = React.lazy(() =>
  import("./components/views/MasterSKU/MasterSKU")
);
const routes = [
  {
    path: linkMaintain,
    exact: true,
    name: linkNameMaintain,
    component: Maintain,
  },
  {
    path: linkMasterSKU,
    exact: true,
    name: linkNameMasterSKU,
    component: MasterSKU,
  },
];

export default routes;
