import apiClient from "../utils/ApiClient";
const url="/Chauffeur"

// Fonction pour récupérer tous les utilisateurs
export const getChauffeurs = () => apiClient.get(`${url}s`);

export const findChauffeur =async  (id) =>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
// Fonction pour créer un utilisateur
export const createChauffeur= async (data,config) => {
    try {
        const response=await apiClient.post(`${url}/create`, data,config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getChauffeurById=async (id)=>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        
        console.log(error);
        
    }
}

// Fonction pour mettre à jour un utilisateur
export const updateChauffeur  = (id, data,config) => apiClient.put(`${url}/${id}`,data,config);

// Fonction pour supprimer un utilisateur
export const deleteChauffeur  = (id) => apiClient.delete(`${url}/${id}`);



