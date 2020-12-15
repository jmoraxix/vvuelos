import http from "../http-common";

class ConsecutivoDataService {
  getAll() {
    return http.get("/consecutivos");
  }

  get(id) {
    return http.get(`/consecutivos/${id}`);
  }

  create(data) {
    return http.post("/consecutivos", data);
  }

  update(id, data) {
    return http.put(`/consecutivos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/consecutivos/${id}`);
  }
}

export default new ConsecutivoDataService();