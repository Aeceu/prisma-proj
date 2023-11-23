import axios from "axios";

// const localBaseUrl = "http://localhost:4200/api/v1";
const productionBaseUrl = "https://prisma-proj-server.vercel.app/api/v1";

export default axios.create({
  baseURL: productionBaseUrl,
  withCredentials: true,
});
