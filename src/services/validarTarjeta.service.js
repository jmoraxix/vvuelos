import http from "../http-common-tarjeta";

class ValidarTarjetaDataService {
    create(data) {
      return http.post("/ttarjetas", data);
    }
}

export default new ValidarTarjetaDataService();