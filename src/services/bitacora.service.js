import http from "../http-common";

class BitacoraDataService {
  getAll() {
    return http.get("/bitacoras");
  }

  get(id) {
    return http.get(`/bitacoras/${id}`);
  }

  create(data) {
    return http.post("/bitacoras", data);
  }

  update(id, data) {
    return http.put(`/bitacoras/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bitacoras/${id}`);
  }
}

export default new BitacoraDataService();