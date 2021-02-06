import axios from "axios";

const DEFAULT_API_PATH = "/maintain";

class MaintainService {
  getAllForecasts() {
    return axios.get(`${DEFAULT_API_PATH}/view`);
  }
}

export default new MaintainService();
