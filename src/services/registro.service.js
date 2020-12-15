import http from "../http-common";

class RegistroDataService {
  getAll() {
    return http.get("/registro");
  }

  get(id) {
    return http.get(`/registro/${id}`);
  }

  create(data) {
    return http.post("/registro", data);
  }

  update(id, data) {
    return http.put(`/registro/${id}`, data);
  }

  delete(id) {
    return http.delete(`/registro/${id}`);
  }
}

export default new RegistroDataService();