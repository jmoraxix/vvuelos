import http from "../http-common";

class UsuariosDataService {
  getAll() {
    return http.get("/usuario");
  }

  get(id) {
    return http.get(`/usuario/${id}`);
  }

  create(data) {
    return http.post("/usuario", data);
  }

  update(id, data) {
    return http.put(`/usuario/${id}`, data);
  }

  delete(id) {
    return http.delete(`/usuario/${id}`);
  }

  findByUsername(username) {
    return http.get(`/usuario?username=${username}`);
  }
}

export default new UsuariosDataService();