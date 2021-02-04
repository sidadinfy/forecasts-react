class StaticDataService {
  getProductCategories() {
    return new Promise(function (resolve, reject) {
      resolve({
        status: 200,
        data: [
          { label: "Dental", value: "dental" },
          { label: "Detergents", value: "detergents" },
        ],
      });
    });
  }

  getSKUBasedOnCategory(category) {
    let obj = {};
    if (category === "dental") {
      obj.sku = "ABC123";
      obj.id = "12";
    } else if (category === "detergents") {
      obj.sku = "Tide";
      obj.id = "13";
    }
    return new Promise(function (resolve, reject) {
      resolve({
        status: 200,
        data: obj,
      });
    });
  }

  getAllProducts() {
    return new Promise(function (resolve, reject) {
      resolve({
        status: 200,
        data: [
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
      });
    });
  }
}

export default new StaticDataService();
