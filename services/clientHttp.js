import Axios from "axios";

const clientHttp = Axios.create({
  baseURL: "http://api.psicol.test/api",
  withCredentials: true,
});

export { clientHttp };
