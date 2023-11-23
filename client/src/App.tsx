import axios from "./api/axios";
import { AxiosError, isAxiosError } from "axios";

export default function App() {
  const email = "joseacebuche2@gmail.com";
  const password = "123";
  const login = async () => {
    try {
      const res = await axios.post("/login", { email, password });
      console.log(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.error(axiosError.message);
      }
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/allposts");
      console.log(res.data);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        console.log(axiosError.response?.data);
      }
    }
  };
  return (
    <div className="p-16">
      <button
        className=" bg-emerald-500 px-2 py-1 rounded-md  text-white cursor-pointer"
        type="button"
        onClick={login}
      >
        LOGIN
      </button>
      <button
        className="px-2 py-1 rounded-md bg-slate-950 text-white cursor-pointer"
        type="button"
        onClick={fetchUsers}
      >
        FETCH
      </button>
    </div>
  );
}
