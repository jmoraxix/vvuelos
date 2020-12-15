import http from "../http-common";

class ErroresDataService {
  getAll() {
    return http.get("/erros");
  }

  get(id) {
    return http.get(`/erros/${id}`);
  }

  create(data) {
    return http.post("/erros", data);
  }

  update(id, data) {
    return http.put(`/erros/${id}`, data);
  }

  delete(id) {
    return http.delete(`/erros/${id}`);
  }
}

export default new ErroresDataService();