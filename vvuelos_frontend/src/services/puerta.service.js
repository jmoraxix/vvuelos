import http from "../http-common";

class PuertaDataService {
  getAll() {
    return http.get("/puertas");
  }

  get(id) {
    return http.get(`/puertas/${id}`);
  }

  create(data) {
    return http.post("/puertas", data);
  }

  update(id, data) {
    return http.put(`/puertas/${id}`, data);
  }

  delete(id) {
    return http.delete(`/puertas/${id}`);
  }
}

export default new PuertaDataService();