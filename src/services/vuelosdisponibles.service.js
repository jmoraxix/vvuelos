import http from "../http-common";

class VuelosDisponibleDataService {
    
      getAll() {
        return http.get("/aerolineas");
      }
    
      get(id) {
        return http.get(`/aerolineas/${id}`);
      }
    
      create(data) {
        return http.post("/aerolineas", data);
      }
    
      update(id, data) {
        return http.put(`/aerolineas/${id}`, data);
      }
    
      delete(id) {
        return http.delete(`/aerolineas/${id}`);
      }
    }
  
  
  export default new VuelosDisponibleDataService();