import apiClient from "../utils/ApiClient";
const url="/Station"

// Fonction pour récupérer tous les utilisateurs
export const getStations = () => apiClient.get(`${url}s`);

export const findStation =async  (id) =>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
// Fonction pour créer un utilisateur
export const createStation= async (data,config) => {
    try {
        const response=await apiClient.post(`${url}/create`, data,config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getStationById=async (id)=>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        
        console.log(error);
        
    }
}

// Fonction pour mettre à jour un utilisateur
export const updateStation  = (id, data,config) => apiClient.put(`${url}/${id}`,data,config);

// Fonction pour supprimer un utilisateur
export const deleteStation  = (id) => apiClient.delete(`${url}/${id}`);



