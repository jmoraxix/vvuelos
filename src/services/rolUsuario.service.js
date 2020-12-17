import http from "../http-common";

class RolUsuarioDataService {
  update(usuarioId, rolId) {
    return http.post(`/rolusuarios?usuarioid=${usuarioId}&rolid=${rolId}`);
  }

  delete(usuarioId, rolId) {
    return http.delete(`/rolusuarios?usuarioid=${usuarioId}&rolid=${rolId}`);
  }
}

export default new RolUsuarioDataService();