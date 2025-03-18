import apiClient from "../utils/ApiClient";
const url="/Paiement"

// Fonction pour récupérer tous les utilisateurs
export const getPaiements = () => apiClient.get(`${url}s`);

export const findPaiement =async  (id) =>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
// Fonction pour créer un utilisateur
export const createPaiement= async (data,config) => {
    try {
        const response=await apiClient.post(`${url}/create`, data,config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getPaiementById=async (id)=>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        
        console.log(error);
        
    }
}

// Fonction pour mettre à jour un utilisateur
export const updatePaiement  = (id, data,config) => apiClient.put(`${url}/${id}`,data,config);

// Fonction pour supprimer un utilisateur
export const deletePaiement  = (id) => apiClient.delete(`${url}/${id}`);



