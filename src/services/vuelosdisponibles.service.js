import http from "../http-common";

class VuelosDisponibleDataService {
    getAll() {
      return http.get("/reservar");
    }
  
    get(id) {
      return http.get(`/reservar/${id}`);
    }
  
    create(data) {
      return http.post("/reservar", data);
    }
  
    update(id, data) {
      return http.put(`/reservar/${id}`, data);
    }
  
   
    delete(id) {
        return http.delete(`/reservar/${id}`);
      }
    
    }
  
  
  export default new VuelosDisponibleDataService();