import axios from "axios";

const localBaseUrl = "http://localhost:4200/api/v1";
// const productionBaseUrl = "https://websitename.com";

export default axios.create({
  baseURL: localBaseUrl,
  withCredentials: true,
});
