import http from "../http-common";

class RolesyUsuarioDataService {
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

  getAll() {
    return http.get("/usuarios");
  }

  get(id) {
    return http.get(`/usuarios/${id}`);
  }

  create(data) {
    return http.post("/usuarios", data);
  }

  update(id, data) {
    return http.put(`/usuarios/${id}`, data);
  }

  delete(id) {
    return http.delete(`/usuarios/${id}`);
  }


}

export default new RolesyUsuarioDataService();