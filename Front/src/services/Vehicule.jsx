import apiClient from "../utils/ApiClient";
const url="/Vehicule"

// Fonction pour récupérer tous les utilisateurs
export const getVehicules = () => apiClient.get(`${url}s`);

export const findVehicule =async  (id) =>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
// Fonction pour créer un utilisateur
export const createVehicule= async (data,config) => {
    try {
        const response=await apiClient.post(`${url}/create`, data,config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getVehiculeById=async (id)=>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        
        console.log(error);
        
    }
}

// Fonction pour mettre à jour un utilisateur
export const updateVehicule  = (id, data,config) => apiClient.put(`${url}/${id}`,data,config);

// Fonction pour supprimer un utilisateur
export const deleteVehicule  = (id) => apiClient.delete(`${url}/${id}`);



