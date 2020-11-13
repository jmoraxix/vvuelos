import http from "../http-common";

class TipoPagoDataService {
  getAll() {
    return http.get("/tipopagos");
  }

  get(id) {
    return http.get(`/tipopagos/${id}`);
  }

  create(data) {
    return http.post("/tipopagos", data);
  }

  update(id, data) {
    return http.put(`/tipopagos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/tipopagos/${id}`);
  }
}

export default new TipoPagoDataService();