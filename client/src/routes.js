import React from "react";
//Links
export const linkMaintain = "/";
export const linkMasterSKU = "/mastersku";
export const linkReviewReleaseOrder = "/revieworder";
//Links

//Link Names
export const linkNameMaintain = "Maintain Forecasts";
export const linkNameMasterSKU = "Master SKU";
export const linkNameReviewReleaseOrder = "Review And Release Order";
//Link Names

const Maintain = React.lazy(() =>
  import("./components/views/Maintain/Maintain")
);
const MasterSKU = React.lazy(() =>
  import("./components/views/MasterSKU/MasterSKU")
);
const ReviewReleaseOrder = React.lazy(() =>
  import("./components/views/ReviewReleaseOrder/ReviewReleaseOrder")
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
  {
    path: linkReviewReleaseOrder,
    exact: true,
    name: linkNameReviewReleaseOrder,
    component: ReviewReleaseOrder,
  },
];

export default routes;
