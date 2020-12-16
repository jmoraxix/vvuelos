import axios from "axios";

export default axios.create({
  //baseURL: "http://vvuelosbackend.azurewebsites.net/api",
  baseURL: "http://localhost:44332/api",
  headers: {
    "Content-type": "application/json"
  }
});