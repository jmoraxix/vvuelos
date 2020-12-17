import http from "../http-common";

class ReservacionUsuarioDataService {
  get(id) {
    return http.get(`/reservacionesusuarios/${id}`);
  }

  delete(id) {
    return http.delete(`/reservacionesusuarios/${id}`);
  }
}

export default new ReservacionUsuarioDataService();