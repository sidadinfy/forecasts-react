import axios from "axios";

const DEFAULT_API_PATH = "/maintain";

class MaintainService {
  getAllForecasts() {
    return axios.get(`${DEFAULT_API_PATH}/view`);
  }

  updateSingleMaintain(id, data) {
    return axios.put(`${DEFAULT_API_PATH}/save/${id}`, data);
  }

  addNewMaintainItem(data) {
    return axios.post(`${DEFAULT_API_PATH}/add`, data);
  }
}

export default new MaintainService();
