import http from "../http-common";

class EstadoVueloDataService {
  getAll() {
    return http.get("/estadovuelos");
  }

  get(id) {
    return http.get(`/estadovuelos/${id}`);
  }

  create(data) {
    return http.post("/estadovuelos", data);
  }

  update(id, data) {
    return http.put(`/estadovuelos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/estadovuelos/${id}`);
  }
}

export default new EstadoVueloDataService();