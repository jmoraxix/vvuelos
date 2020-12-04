import http from "../http-common";

class ClaseDataService {
  getAll() {
    return http.get("/clases");
  }

  get(id) {
    return http.get(`/clases/${id}`);
  }

  create(data) {
    return http.post("/clases", data);
  }

  update(id, data) {
    return http.put(`/clases/${id}`, data);
  }

  delete(id) {
    return http.delete(`/clases/${id}`);
  }
}

export default new ClaseDataService();