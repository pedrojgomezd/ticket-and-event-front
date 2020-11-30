import Axios from "axios";

const clientHttp = Axios.create({
  baseURL: "https://api.psicol.test/api",
  withCredentials: true,
});

export { clientHttp };
