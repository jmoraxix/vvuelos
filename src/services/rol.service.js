import http from "../http-common";

class RolDataService {
  getAll() {
    return http.get("/rols");
  }

  get(id) {
    return http.get(`/rols/${id}`);
  }

  create(data) {
    return http.post("/rols", data);
  }

  update(id, data) {
    return http.put(`/rols/${id}`, data);
  }

  delete(id) {
    return http.delete(`/rols/${id}`);
  }
}

export default new RolDataService();