import apiClient from "../utils/ApiClient";
const url="/User"

// Fonction pour récupérer tous les utilisateurs
export const getUsers = () => apiClient.get(`${url}s`);

export const findUser =async  (id) =>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        console.log(error);
    }
}
// Fonction pour créer un utilisateur
export const createUser= async (data,config) => {
    try {
        const response=await apiClient.post(`${url}/create`, data,config);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getUserById=async (id)=>{
    try {
        const response=await apiClient.get(`${url}/${id}`)
        return response.data
    } catch (error) {
        
        console.log(error);
        
    }
}

// Fonction pour mettre à jour un utilisateur
export const updateUser  = (id, data,config) => apiClient.put(`${url}/${id}`,data,config);

// Fonction pour supprimer un utilisateur
export const deleteUser  = (id) => apiClient.delete(`${url}/${id}`);



