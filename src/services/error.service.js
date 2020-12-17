import http from "../http-common";

class ErroresDataService {
  getAll() {
    return http.get("/errors");
  }

  get(id) {
    return http.get(`/errors/${id}`);
  }

  create(data) {
    return http.post("/errors", data);
  }

  update(id, data) {
    return http.put(`/errors/${id}`, data);
  }

  delete(id) {
    return http.delete(`/errors/${id}`);
  }
}

export default new ErroresDataService();