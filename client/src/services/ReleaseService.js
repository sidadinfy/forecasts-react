import axios from "axios";

const DEFAULT_API_PATH = "/release";

class ReleaseService {
  getAllReleaseOrders() {
    return axios.get(`${DEFAULT_API_PATH}/view`);
  }

  updateSingleReleaseOrder(sku, uom, data) {
    return axios.put(`${DEFAULT_API_PATH}/save/${uom}/${sku}`, data);
  }

  addNewReleaseItem(data) {
    return axios.post(`${DEFAULT_API_PATH}/add`, data);
  }
}

export default new ReleaseService();
