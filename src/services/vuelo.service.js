import http from "../http-common";

class VueloDataService {
    getAll() {
      return http.get("/vuelos");
    }
  
    get(id) {
      return http.get(`/vuelos/${id}`);
    }
  
    create(data) {
      return http.post("/vuelos", data);
    }
  
    update(id, data) {
      return http.put(`/vuelos/${id}`, data);
    }
  
    delete(id) {
      return http.delete(`/vuelos/${id}`);
    }
  
    
    }
  
  
  export default new VueloDataService();