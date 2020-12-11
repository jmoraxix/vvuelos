import http from "../http-common";

class BitacoraDataService {
  getAll() {
    return http.get("/bitacora");
  }

  get(id) {
    return http.get(`/bitacora/${id}`);
  }

  create(data) {
    return http.post("/bitacora", data);
  }

  update(id, data) {
    return http.put(`/bitacora/${id}`, data);
  }

  delete(id) {
    return http.delete(`/bitacora/${id}`);
  }
}

export default new BitacoraDataService();