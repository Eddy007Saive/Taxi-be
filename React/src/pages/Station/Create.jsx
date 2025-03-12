import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {createStation} from "../../services/Station"

function Create() {
  // États pour tous les champs du modèle Station
  const [formData, setFormData] = useState({
      nom: "Station Centrale de Tuléar",
      ville: "Tuléar (Toliara)",
      adresse: "Boulevard Lyautey, Centre-ville",
      latitude: -23.3516,
      longitude: 43.6854,
      est_active: true,
      code: "TLE-CENT-01",
      description: "Station principale de Tuléar située dans le centre-ville, à proximité du port et du marché. Point central pour les déplacements urbains et les connexions vers les sites touristiques comme la plage de Ifaty et le Parc National de Zombitse-Vohibasia.",
      horaires_ouverture: "6h00-21h00",
      contact: "+261 20 94 512 365"
  });
  
  // État pour gérer le chargement
  const [loading, setLoading] = useState(false);
  
  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation des champs obligatoires
    if (!formData.nom || !formData.latitude || !formData.longitude) {
      toast.error("Les champs Nom, Latitude et Longitude sont obligatoires!");
      return;
    }
    
    // Conversion des coordonnées en nombres
    const dataToSend = {
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    };
    
    setLoading(true);
    
    try {
      // Appel API pour créer la station
      const response = await createStation(dataToSend);
      
      if (response.status === 201) {
        toast.success("Station créée avec succès!");
        // Réinitialisation du formulaire
        setFormData({
          nom: '',
          ville: '',
          adresse: '',
          latitude: '',
          longitude: '',
          est_active: true,
          code: '',
          description: '',
          horaires_ouverture: '',
          contact: ''
        });
      }
    } catch (error) {
      console.error("Erreur lors de la création de la station:", error);
      toast.error("Une erreur est survenue lors de la création de la station.");
    } finally {
      setLoading(false);
    }
  };
  
  // Fonction pour obtenir la géolocalisation actuelle
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData({
            ...formData,
            latitude: position.coords.latitude.toString(),
            longitude: position.coords.longitude.toString()
          });
          toast.info("Coordonnées récupérées avec succès!");
        },
        (error) => {
          toast.error("Impossible de récupérer votre position.");
          console.error("Erreur de géolocalisation:", error);
        }
      );
    } else {
      toast.error("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Créer une nouvelle station</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Informations principales */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Code
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  name="ville"
                  value={formData.ville}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={formData.adresse}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact
                </label>
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Horaires d'ouverture
                </label>
                <input
                  type="text"
                  name="horaires_ouverture"
                  value={formData.horaires_ouverture}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="ex: 8h-20h"
                />
              </div>
            </div>
            
            {/* Coordonnées et description */}
            <div className="space-y-4">
              <div className="flex items-end space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Latitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="latitude"
                    value={formData.latitude}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Longitude <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    name="longitude"
                    value={formData.longitude}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <i className="fas fa-map-marker-alt mr-2"></i> Localiser
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              
              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  name="est_active"
                  checked={formData.est_active}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Station active
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={() => window.history.back()}
            >
              Annuler
            </button>
            
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? (
                <span>Création en cours...</span>
              ) : (
                <span>Créer la station</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;