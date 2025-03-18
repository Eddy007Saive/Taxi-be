import apiClient from "../utils/ApiClient";
const url="/Voyage"

// Fonction pour récupérer tous les utilisateurs
export const getVoyages = () => apiClient.get(`${url}s`);

export const findVoyage =async  (id) =>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
// Fonction pour créer un utilisateur
export const createVoyage= async (data,config) => {
    try {
        const response=await apiClient.post(`${url}/create`, data,config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getVoyageById=async (id)=>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        
        console.log(error);
        
    }
}

// Fonction pour mettre à jour un utilisateur
export const updateVoyage  = (id, data,config) => apiClient.put(`${url}/${id}`,data,config);

// Fonction pour supprimer un utilisateur
export const deleteVoyage  = (id) => apiClient.delete(`${url}/${id}`);



