(this["webpackJsonpforecasts-react"]=this["webpackJsonpforecasts-react"]||[]).push([[11],{42:function(e,t,s){"use strict";s.r(t);var a=s(66),o=s(14),n=s(15),i=s(17),_=s(16),c=s(0),r=s.n(c),d=s(67),l=s(72),u=s(71),m=s(19),y=s(68),g=s(50),p=s(65),f=s(70),h=s(5),C=function(e){Object(i.a)(s,e);var t=Object(_.a)(s);function s(e){var n;return Object(o.a)(this,s),(n=t.call(this,e)).getMasterSKUData=function(){g.a.getAllMasterSKUData().then((function(e){e&&n.setState({data:e.data,original:e.data})}))},n.getProductCategories=function(){g.a.getProductCategories().then((function(e){e&&n.setState({categoryList:e.data})}))},n.getSKUBasedOnCategory=function(e){g.a.getSKUBasedOnCategory(e).then((function(e){e&&n.setState({sku:e.data.sku})})).catch((function(e){console.log(e)}))},n.handleReset=function(){n.setState({selectedCategory:"",sku:""},(function(){n.getMasterSKUData()}))},n.handleSearch=function(){var e=Object(a.a)(n.state.original),t=n.state.selectedCategory;console.log("all",e);var s=e.filter((function(e){return e.category.toLowerCase()===t}));console.log("Filtered",s),n.setState({data:s})},n.dt=r.a.createRef(),n.state={filter:{},data:[],original:[],categoryList:[],sku:"",selectedCategory:""},n}return Object(n.a)(s,[{key:"componentDidMount",value:function(){this.getMasterSKUData(),this.getProductCategories()}},{key:"render",value:function(){var e=this;return Object(h.jsxs)(h.Fragment,{children:[Object(h.jsxs)(d.a,{children:[Object(h.jsx)("meta",{charSet:"utf-8"}),Object(h.jsx)("title",{children:m.e})]}),Object(h.jsxs)("div",{className:"mx-auto max-w-3xl",children:[Object(h.jsx)("div",{className:"text-3xl font-bold text-center",children:"View SKU Master"}),Object(h.jsxs)("div",{className:"flex items-center w-full mt-6",children:[Object(h.jsxs)("div",{className:"grid grid-cols-3 col-gap-0",children:[Object(h.jsx)("div",{className:"flex items-center",children:"Product Category"}),Object(h.jsx)("div",{className:"",children:Object(h.jsx)(p.a,{options:this.state.categoryList,value:this.state.selectedCategory,handleChange:function(t){e.setState({selectedCategory:t},(function(){e.getSKUBasedOnCategory(t)}))},className:"w-11/12"})}),Object(h.jsxs)("div",{className:"flex items-center",children:[Object(h.jsx)("div",{className:"pr-4",children:"SKU"}),Object(h.jsx)("div",{className:"w-10/12",children:Object(h.jsx)(f.InputText,{disabled:!0,id:"sku",type:"text",value:this.state.sku,placeholder:"SKU",className:"w-10/12 "})})]})]}),Object(h.jsxs)("div",{className:"flex items-center",children:[Object(h.jsx)("div",{children:Object(h.jsx)(y.Button,{icon:"pi pi-search",className:"p-button-raised p-button-rounded",tooltip:"Search",tooltipOptions:{position:"top"},onClick:this.handleSearch})}),Object(h.jsx)("div",{className:"ml-2",children:Object(h.jsx)(y.Button,{icon:"pi pi-times",disabled:!this.state.selectedCategory,className:"p-button-rounded p-button-danger p-button-raised p-button-outlined",onClick:this.handleReset})}),Object(h.jsx)("div",{className:"ml-2",children:Object(h.jsx)(y.Button,{label:"Export",className:"p-button-info",onClick:function(){e.dt.current.exportCSV()}})})]})]})]}),Object(h.jsx)("div",{className:"my-5 datatable-responsive-demo",children:Object(h.jsxs)(l.DataTable,{ref:this.dt,value:this.state.data,className:"p-datatable-striped datatable-responsive-demo w-full",scrollable:!0,paginator:!0,rows:10,children:[Object(h.jsx)(u.Column,{field:"category",header:"Product Category",style:{width:"100px"}}),Object(h.jsx)(u.Column,{field:"sku",header:"SKU Code",style:{width:"100px"}}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"sku_description",header:"Description"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"sourcing_location",header:"Location"}),Object(h.jsx)(u.Column,{style:{width:"90px"},field:"uom",header:"UOM"}),Object(h.jsx)(u.Column,{style:{width:"50px"},field:"abc_class",header:"ABC Class"}),Object(h.jsx)(u.Column,{style:{width:"70px"},field:"xyz_class",header:"XYZ Class"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"movement_class",header:"Movement Class"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"purchase_price",header:"Purchase Price"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"sell_price",header:"Sell Price"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"margin",header:"Margin"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"moq",header:"MOQ"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"soh",header:"SOH"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"soh_days",header:"SOH Days"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"avg_demand_per_day",header:"Avg Demand / Day"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"stock_value",header:"Stock Value"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"stock_transit",header:"Stock Transit"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"open_po_qty",header:"Open PO Qty"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"open_so_qty",header:"Open SO Qty"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"lead_time_in_days",header:"Lead Time In Days"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"roq_units",header:"ROQ Units"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"safety_stock_units",header:"Safety Stock Units"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"min_units",header:"Min Units"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"max_units",header:"Max Units"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"tm_forecast_accuracy",header:"Twelve Month Forecast Accuracy"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"shortage_units",header:"Shortage Units"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"excess_units",header:"Excess Units"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"target_fill",header:"Target Fill"}),Object(h.jsx)(u.Column,{style:{width:"100px"},field:"actual_fill",header:"Actual Fill"})]})})]})}}]),s}(r.a.Component);t.default=C},50:function(e,t,s){"use strict";var a=s(14),o=s(15),n=function(){function e(){Object(a.a)(this,e)}return Object(o.a)(e,[{key:"getProductCategories",value:function(){return new Promise((function(e,t){e({status:200,data:[{label:"Dental",value:"dental"},{label:"Detergents",value:"detergents"}]})}))}},{key:"getSKUBasedOnCategory",value:function(e){var t={};return"dental"===e?(t.sku="ABC123",t.id="12"):"detergents"===e&&(t.sku="ABC100",t.id="13"),new Promise((function(e,s){e({status:200,data:t})}))}},{key:"getAllProducts",value:function(){return new Promise((function(e,t){e({status:200,data:[{id:"70a34114-1c75-4592-9866-26fb94b5a402",product_category:"Dental",sku_code:"ABC123",uom:"Case",period:"23-Apr-2020",stats_forecast:27},{id:"b4fa6945-15b8-4ded-8ffb-82c9015f5460",product_category:"Detergents",sku_code:"Tide",uom:"Case",period:"12-Nov-2020",stats_forecast:93},{id:"4513cec3-bc5f-4ce3-aee5-7acec96d5e65",product_category:"Dental",sku_code:"ABC123",uom:"Case",period:"05-Jul-2020",stats_forecast:59},{id:"243832d7-7a0e-4531-995c-9a2998dcec2a",product_category:"Detergents",sku_code:"Tide",uom:"Case",period:"21-Mar-2020",stats_forecast:39},{id:"ccfc31a1-d6b2-4b0b-8fa2-92d7b25456b0",product_category:"Dental",sku_code:"ABC123",uom:"Case",period:"03-Sep-2020",stats_forecast:20},{id:"7b59a582-31cf-4b87-8b58-fb006087b17c",product_category:"Detergents",sku_code:"Tide",uom:"Case",period:"24-May-2020",stats_forecast:29},{id:"4b648056-cd3a-474f-b28c-455610238ea7",product_category:"Dental",sku_code:"ABC123",uom:"Case",period:"08-Mar-2020",stats_forecast:70},{id:"d757a278-0ecd-4c9b-901f-d6e4c716ee32",product_category:"Detergents",sku_code:"Tide",uom:"Case",period:"22-Jun-2020",stats_forecast:53},{id:"03f5ad06-fa90-41d9-b5e4-c615d4dd1c92",product_category:"Dental",sku_code:"ABC123",uom:"Case",period:"11-Oct-2020",stats_forecast:28},{id:"3f4c09fc-a381-4a78-b489-f0ec78c8b6bb",product_category:"Detergents",sku_code:"Tide",uom:"Case",period:"15-Jan-2021",stats_forecast:98}]})}))}},{key:"getAllMasterSKUData",value:function(){return new Promise((function(e,t){e({status:200,data:[{id:1,category:"Dental",sku:"ABC123",sku_description:"ABC123",sourcing_location:"Bangalore KA",uom:"Case",abc_class:"A",xyz_class:"X",movement_class:"Moderately Moving",purchase_price:"$128.81",sell_price:"$375.69",margin:22.51,moq:52,soh:1138,soh_days:8,avg_demand_per_day:112.2,stock_value:1450,stock_transit:91,open_po_qty:129,open_so_qty:378,lead_time_in_days:6,roq_units:56,safety_stock_units:334,min_units:479,max_units:505,tm_forecast_accuracy:55.8,shortage_units:120.8,excess_units:10,target_fill:22,actual_fill:69},{id:2,category:"Detergents",sku:"ABC293",sku_description:"ABC293",sourcing_location:"Mumbai MH",uom:"Case",abc_class:"B",xyz_class:"Y",movement_class:"Slow Moving",purchase_price:"$112.81",sell_price:"$342.05",margin:77.85,moq:100,soh:1537,soh_days:8,avg_demand_per_day:229.5,stock_value:1156,stock_transit:95,open_po_qty:145,open_so_qty:296,lead_time_in_days:8,roq_units:197,safety_stock_units:554,min_units:364,max_units:1028,tm_forecast_accuracy:53.4,shortage_units:56.7,excess_units:1,target_fill:62,actual_fill:11},{id:3,category:"Dental",sku:"ABC453",sku_description:"ABC453",sourcing_location:"Chennai TN",uom:"Case",abc_class:"C",xyz_class:"Z",movement_class:"Slow Moving",purchase_price:"$126.14",sell_price:"$390.04",margin:86.31,moq:42,soh:1192,soh_days:8,avg_demand_per_day:283.4,stock_value:1870,stock_transit:54,open_po_qty:139,open_so_qty:352,lead_time_in_days:4,roq_units:118,safety_stock_units:211,min_units:409,max_units:1041,tm_forecast_accuracy:52,shortage_units:127.4,excess_units:1,target_fill:57,actual_fill:35},{id:4,category:"Detergents",sku:"ABC983",sku_description:"ABC983",sourcing_location:"Bangalore KA",uom:"Case",abc_class:"A",xyz_class:"X",movement_class:"Fast Moving",purchase_price:"$110.49",sell_price:"$307.44",margin:64.73,moq:24,soh:1636,soh_days:4,avg_demand_per_day:205.3,stock_value:1431,stock_transit:26,open_po_qty:140,open_so_qty:386,lead_time_in_days:2,roq_units:108,safety_stock_units:384,min_units:420,max_units:1490,tm_forecast_accuracy:52.2,shortage_units:95.8,excess_units:13,target_fill:19,actual_fill:31},{id:5,category:"Dental",sku:"ABC948",sku_description:"ABC948",sourcing_location:"Mumbai MH",uom:"Case",abc_class:"B",xyz_class:"Y",movement_class:"Fast Moving",purchase_price:"$115.13",sell_price:"$395.64",margin:86.1,moq:66,soh:925,soh_days:1,avg_demand_per_day:245.8,stock_value:1325,stock_transit:80,open_po_qty:136,open_so_qty:347,lead_time_in_days:8,roq_units:166,safety_stock_units:401,min_units:230,max_units:657,tm_forecast_accuracy:55.2,shortage_units:76.4,excess_units:33,target_fill:32,actual_fill:53},{id:6,category:"Detergents",sku:"ABC332",sku_description:"ABC332",sourcing_location:"Chennai TN",uom:"Case",abc_class:"C",xyz_class:"Z",movement_class:"Moderately Moving",purchase_price:"$127.62",sell_price:"$368.99",margin:85.09,moq:54,soh:852,soh_days:9,avg_demand_per_day:181.8,stock_value:1352,stock_transit:26,open_po_qty:150,open_so_qty:342,lead_time_in_days:8,roq_units:167,safety_stock_units:466,min_units:233,max_units:551,tm_forecast_accuracy:52.7,shortage_units:18.7,excess_units:18,target_fill:37,actual_fill:52},{id:7,category:"Dental",sku:"ABC123",sku_description:"ABC123",sourcing_location:"Bangalore KA",uom:"Case",abc_class:"A",xyz_class:"X",movement_class:"Fast Moving",purchase_price:"$176.88",sell_price:"$391.75",margin:40.42,moq:13,soh:1499,soh_days:4,avg_demand_per_day:269.8,stock_value:1226,stock_transit:36,open_po_qty:129,open_so_qty:334,lead_time_in_days:10,roq_units:167,safety_stock_units:236,min_units:262,max_units:821,tm_forecast_accuracy:50.8,shortage_units:92.6,excess_units:29,target_fill:27,actual_fill:19},{id:8,category:"Detergents",sku:"ABC293",sku_description:"ABC293",sourcing_location:"Mumbai MH",uom:"Case",abc_class:"B",xyz_class:"Y",movement_class:"Moderately Moving",purchase_price:"$176.90",sell_price:"$351.00",margin:27.44,moq:14,soh:1618,soh_days:5,avg_demand_per_day:249.3,stock_value:1695,stock_transit:36,open_po_qty:145,open_so_qty:359,lead_time_in_days:1,roq_units:199,safety_stock_units:498,min_units:250,max_units:1447,tm_forecast_accuracy:53,shortage_units:71.9,excess_units:34,target_fill:12,actual_fill:52},{id:9,category:"Dental",sku:"ABC453",sku_description:"ABC453",sourcing_location:"Chennai TN",uom:"Case",abc_class:"C",xyz_class:"Z",movement_class:"Fast Moving",purchase_price:"$160.58",sell_price:"$319.03",margin:11.23,moq:98,soh:628,soh_days:10,avg_demand_per_day:258.1,stock_value:1524,stock_transit:33,open_po_qty:196,open_so_qty:336,lead_time_in_days:3,roq_units:17,safety_stock_units:355,min_units:233,max_units:681,tm_forecast_accuracy:50.4,shortage_units:110.8,excess_units:24,target_fill:26,actual_fill:62},{id:10,category:"Detergents",sku:"ABC983",sku_description:"ABC983",sourcing_location:"Bangalore KA",uom:"Case",abc_class:"A",xyz_class:"X",movement_class:"Slow Moving",purchase_price:"$160.26",sell_price:"$367.89",margin:96.46,moq:79,soh:1681,soh_days:8,avg_demand_per_day:85,stock_value:1064,stock_transit:43,open_po_qty:154,open_so_qty:339,lead_time_in_days:3,roq_units:198,safety_stock_units:352,min_units:250,max_units:1086,tm_forecast_accuracy:52.3,shortage_units:67.7,excess_units:38,target_fill:10,actual_fill:13},{id:11,category:"Dental",sku:"ABC948",sku_description:"ABC948",sourcing_location:"Mumbai MH",uom:"Case",abc_class:"B",xyz_class:"Y",movement_class:"Moderately Moving",purchase_price:"$106.39",sell_price:"$346.25",margin:41.24,moq:26,soh:876,soh_days:1,avg_demand_per_day:272.9,stock_value:1096,stock_transit:42,open_po_qty:195,open_so_qty:296,lead_time_in_days:7,roq_units:65,safety_stock_units:177,min_units:115,max_units:872,tm_forecast_accuracy:52,shortage_units:51.7,excess_units:40,target_fill:24,actual_fill:26},{id:12,category:"Detergents",sku:"ABC332",sku_description:"ABC332",sourcing_location:"Chennai TN",uom:"Case",abc_class:"C",xyz_class:"Z",movement_class:"Fast Moving",purchase_price:"$161.40",sell_price:"$373.57",margin:11.48,moq:77,soh:1332,soh_days:10,avg_demand_per_day:100.7,stock_value:1064,stock_transit:69,open_po_qty:158,open_so_qty:383,lead_time_in_days:5,roq_units:78,safety_stock_units:498,min_units:492,max_units:1180,tm_forecast_accuracy:51.7,shortage_units:51.8,excess_units:17,target_fill:50,actual_fill:43},{id:13,category:"Dental",sku:"ABC123",sku_description:"ABC123",sourcing_location:"Bangalore KA",uom:"Case",abc_class:"A",xyz_class:"X",movement_class:"Slow Moving",purchase_price:"$158.66",sell_price:"$325.18",margin:75.94,moq:94,soh:125,soh_days:3,avg_demand_per_day:280.9,stock_value:1126,stock_transit:70,open_po_qty:164,open_so_qty:332,lead_time_in_days:3,roq_units:161,safety_stock_units:517,min_units:227,max_units:692,tm_forecast_accuracy:59.1,shortage_units:81.9,excess_units:9,target_fill:49,actual_fill:17},{id:14,category:"Detergents",sku:"ABC293",sku_description:"ABC293",sourcing_location:"Mumbai MH",uom:"Case",abc_class:"B",xyz_class:"Y",movement_class:"Slow Moving",purchase_price:"$190.44",sell_price:"$394.82",margin:27.91,moq:53,soh:289,soh_days:10,avg_demand_per_day:262.4,stock_value:1142,stock_transit:48,open_po_qty:136,open_so_qty:344,lead_time_in_days:9,roq_units:161,safety_stock_units:258,min_units:250,max_units:1354,tm_forecast_accuracy:53.2,shortage_units:73.1,excess_units:26,target_fill:61,actual_fill:30},{id:15,category:"Dental",sku:"ABC453",sku_description:"ABC453",sourcing_location:"Chennai TN",uom:"Case",abc_class:"C",xyz_class:"Z",movement_class:"Moderately Moving",purchase_price:"$118.29",sell_price:"$374.22",margin:53.64,moq:26,soh:1613,soh_days:14,avg_demand_per_day:220.2,stock_value:1558,stock_transit:35,open_po_qty:190,open_so_qty:329,lead_time_in_days:8,roq_units:57,safety_stock_units:476,min_units:338,max_units:1324,tm_forecast_accuracy:56.3,shortage_units:69.1,excess_units:29,target_fill:69,actual_fill:31},{id:16,category:"Detergents",sku:"ABC983",sku_description:"ABC983",sourcing_location:"Bangalore KA",uom:"Case",abc_class:"A",xyz_class:"X",movement_class:"Slow Moving",purchase_price:"$186.84",sell_price:"$360.00",margin:53.78,moq:33,soh:1593,soh_days:13,avg_demand_per_day:285.7,stock_value:1108,stock_transit:94,open_po_qty:183,open_so_qty:281,lead_time_in_days:5,roq_units:63,safety_stock_units:478,min_units:119,max_units:885,tm_forecast_accuracy:57.2,shortage_units:114,excess_units:31,target_fill:23,actual_fill:76},{id:17,category:"Dental",sku:"ABC948",sku_description:"ABC948",sourcing_location:"Mumbai MH",uom:"Case",abc_class:"B",xyz_class:"Y",movement_class:"Slow Moving",purchase_price:"$124.31",sell_price:"$358.31",margin:12.05,moq:28,soh:1060,soh_days:8,avg_demand_per_day:59.6,stock_value:1614,stock_transit:30,open_po_qty:174,open_so_qty:376,lead_time_in_days:7,roq_units:129,safety_stock_units:512,min_units:424,max_units:1054,tm_forecast_accuracy:56.5,shortage_units:90.6,excess_units:26,target_fill:58,actual_fill:69},{id:18,category:"Detergents",sku:"ABC332",sku_description:"ABC332",sourcing_location:"Chennai TN",uom:"Case",abc_class:"C",xyz_class:"Z",movement_class:"Moderately Moving",purchase_price:"$172.74",sell_price:"$328.24",margin:70.8,moq:77,soh:120,soh_days:8,avg_demand_per_day:126.3,stock_value:1250,stock_transit:72,open_po_qty:136,open_so_qty:355,lead_time_in_days:5,roq_units:4,safety_stock_units:515,min_units:243,max_units:949,tm_forecast_accuracy:53.1,shortage_units:30.1,excess_units:25,target_fill:33,actual_fill:44},{id:19,category:"Dental",sku:"ABC123",sku_description:"ABC123",sourcing_location:"Bangalore KA",uom:"Case",abc_class:"A",xyz_class:"X",movement_class:"Moderately Moving",purchase_price:"$154.26",sell_price:"$365.10",margin:58.64,moq:66,soh:850,soh_days:10,avg_demand_per_day:135.6,stock_value:1774,stock_transit:81,open_po_qty:200,open_so_qty:329,lead_time_in_days:3,roq_units:162,safety_stock_units:391,min_units:450,max_units:1020,tm_forecast_accuracy:56.4,shortage_units:118.7,excess_units:40,target_fill:77,actual_fill:42},{id:20,category:"Detergents",sku:"ABC293",sku_description:"ABC293",sourcing_location:"Mumbai MH",uom:"Case",abc_class:"B",xyz_class:"Y",movement_class:"Moderately Moving",purchase_price:"$193.22",sell_price:"$323.30",margin:75.47,moq:14,soh:876,soh_days:2,avg_demand_per_day:115.2,stock_value:1159,stock_transit:70,open_po_qty:186,open_so_qty:368,lead_time_in_days:6,roq_units:87,safety_stock_units:466,min_units:354,max_units:1298,tm_forecast_accuracy:54.4,shortage_units:115.9,excess_units:16,target_fill:76,actual_fill:56}]})}))}},{key:"getAllRevisedReleasedOrders",value:function(){return new Promise((function(e,t){e({status:200,data:[{id:1,product_category:"Dental",sku:"ABC112",uom:"ABC114",lead_time:14,sourcing_location:"Chennai TN",days_of_stock:15,intransit_inventory_days:5.52,forecast_demand:85,recommended_order:1},{id:2,product_category:"Dental",sku:"ABC113",uom:"ABC111",lead_time:11,sourcing_location:"Chennai TN",days_of_stock:16,intransit_inventory_days:3.263,forecast_demand:12,recommended_order:43},{id:3,product_category:"Detergent",sku:"ABC112",uom:"ABC116",lead_time:14,sourcing_location:"Banglore KA",days_of_stock:20,intransit_inventory_days:3.446,forecast_demand:81,recommended_order:49},{id:4,product_category:"Dental",sku:"ABC114",uom:"ABC113",lead_time:14,sourcing_location:"Chennai TN",days_of_stock:12,intransit_inventory_days:3.23,forecast_demand:29,recommended_order:68},{id:5,product_category:"Dental",sku:"ABC115",uom:"ABC114",lead_time:12,sourcing_location:"Mumbai MH",days_of_stock:21,intransit_inventory_days:1.401,forecast_demand:16,recommended_order:50},{id:6,product_category:"Detergent",sku:"ABC112",uom:"ABC112",lead_time:12,sourcing_location:"Chennai TN",days_of_stock:22,intransit_inventory_days:1.749,forecast_demand:58,recommended_order:91},{id:7,product_category:"Detergent",sku:"ABC116",uom:"ABC115",lead_time:13,sourcing_location:"Chennai TN",days_of_stock:18,intransit_inventory_days:5.419,forecast_demand:30,recommended_order:6},{id:8,product_category:"Detergent",sku:"ABC115",uom:"ABC113",lead_time:10,sourcing_location:"Banglore KA",days_of_stock:16,intransit_inventory_days:4.678,forecast_demand:64,recommended_order:54},{id:9,product_category:"Dental",sku:"ABC113",uom:"ABC113",lead_time:12,sourcing_location:"Mumbai MH",days_of_stock:11,intransit_inventory_days:4.281,forecast_demand:74,recommended_order:14},{id:10,product_category:"Detergent",sku:"ABC112",uom:"ABC114",lead_time:10,sourcing_location:"Mumbai MH",days_of_stock:25,intransit_inventory_days:4.951,forecast_demand:81,recommended_order:58},{id:11,product_category:"Detergent",sku:"ABC114",uom:"ABC112",lead_time:10,sourcing_location:"Chennai TN",days_of_stock:13,intransit_inventory_days:2.697,forecast_demand:41,recommended_order:72},{id:12,product_category:"Dental",sku:"ABC114",uom:"ABC113",lead_time:13,sourcing_location:"Mumbai MH",days_of_stock:10,intransit_inventory_days:2.245,forecast_demand:75,recommended_order:3},{id:13,product_category:"Detergent",sku:"ABC115",uom:"ABC112",lead_time:15,sourcing_location:"Banglore KA",days_of_stock:15,intransit_inventory_days:3.952,forecast_demand:82,recommended_order:64},{id:14,product_category:"Detergent",sku:"ABC112",uom:"ABC115",lead_time:14,sourcing_location:"Banglore KA",days_of_stock:21,intransit_inventory_days:2.037,forecast_demand:54,recommended_order:73},{id:15,product_category:"Detergent",sku:"ABC113",uom:"ABC116",lead_time:13,sourcing_location:"Chennai TN",days_of_stock:21,intransit_inventory_days:1.231,forecast_demand:18,recommended_order:42},{id:16,product_category:"Detergent",sku:"ABC114",uom:"ABC116",lead_time:11,sourcing_location:"Banglore KA",days_of_stock:22,intransit_inventory_days:1.833,forecast_demand:68,recommended_order:97},{id:17,product_category:"Dental",sku:"ABC113",uom:"ABC115",lead_time:14,sourcing_location:"Mumbai MH",days_of_stock:15,intransit_inventory_days:3.698,forecast_demand:88,recommended_order:74},{id:18,product_category:"Dental",sku:"ABC114",uom:"ABC114",lead_time:14,sourcing_location:"Chennai TN",days_of_stock:20,intransit_inventory_days:5.211,forecast_demand:95,recommended_order:74},{id:19,product_category:"Detergent",sku:"ABC116",uom:"ABC114",lead_time:10,sourcing_location:"Chennai TN",days_of_stock:22,intransit_inventory_days:1.711,forecast_demand:95,recommended_order:93},{id:20,product_category:"Detergent",sku:"ABC114",uom:"ABC111",lead_time:12,sourcing_location:"Banglore KA",days_of_stock:11,intransit_inventory_days:4.952,forecast_demand:45,recommended_order:1}]})}))}},{key:"getAllSKUCodes",value:function(){return new Promise((function(e,t){e({status:200,data:["ABC111","ABC112","ABC113","ABC114","ABC115","ABC116","ABC117","ABC118","ABC119","ABC120","ABC121","ABC122","ABC123","ABC124","ABC125","ABC126","ABC127","ABC128","ABC129","ABC130","Tide"]})}))}}]),e}();t.a=new n},65:function(e,t,s){"use strict";var a=s(9),o=s(14),n=s(15),i=s(17),_=s(16),c=s(0),r=s.n(c),d=s(105),l=s(5),u=function(e){Object(i.a)(s,e);var t=Object(_.a)(s);function s(){return Object(o.a)(this,s),t.apply(this,arguments)}return Object(n.a)(s,[{key:"render",value:function(){var e=this;return Object(l.jsx)(d.Dropdown,Object(a.a)({value:this.props.value,onChange:function(t){return e.props.handleChange(t.value)},placeholder:"Select a Category"},this.props))}}]),s}(r.a.Component);t.a=u}}]);
//# sourceMappingURL=11.7b4d26bb.chunk.js.map