import Axios from "axios";

const clientHttp = Axios.create({
  baseURL: "https://events-tickets.herokuapp.com/api",
  withCredentials: true,
});

export { clientHttp };
