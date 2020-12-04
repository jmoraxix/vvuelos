import http from "../http-common";

class PaisDataService {
  getAll() {
    return http.get("/pais");
  }

  get(id) {
    return http.get(`/pais/${id}`);
  }

  create(data) {
    return http.post("/pais", data);
  }

  update(id, data) {
    return http.put(`/pais/${id}`, data);
  }

  delete(id) {
    return http.delete(`/pais/${id}`);
  }
}

export default new AccionDataService();