import axios from "axios";

export default axios.create({
  baseURL: "http://vvuelosbackend.azurewebsites.net/api",
  headers: {
    "Content-type": "application/json"
  }
});