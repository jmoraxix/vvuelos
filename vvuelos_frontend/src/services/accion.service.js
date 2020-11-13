import http from "../http-common";

class AccionDataService {
  getAll() {
    return http.get("/acciones");
  }

  get(id) {
    return http.get(`/acciones/${id}`);
  }

  create(data) {
    return http.post("/acciones", data);
  }

  update(id, data) {
    return http.put(`/acciones/${id}`, data);
  }

  delete(id) {
    return http.delete(`/acciones/${id}`);
  }
}

export default new AccionDataService();