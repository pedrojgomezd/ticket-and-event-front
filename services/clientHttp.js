import Axios from "axios";

const clientHttp = Axios.create({
  baseURL: "https://events-tickets.herokuapp.com",
  withCredentials: true,
});

export { clientHttp };
