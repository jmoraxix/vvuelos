import http from "../http-common";

class ReservacionDataService {
  getAll() {
    return http.get("/reservaciones");
  }

  get(id) {
    return http.get(`/reservaciones/${id}`);
  }

  create(data) {
    return http.post("/reservaciones", data);
  }

  update(id, data) {
    return http.put(`/reservaciones/${id}`, data);
  }

  delete(id) {
    return http.delete(`/reservaciones/${id}`);
  }
}

export default new ReservacionDataService();