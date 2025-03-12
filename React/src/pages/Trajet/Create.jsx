import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getStations} from "../../services/Station"

function Create() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    station_depart_id: "",
    station_arrivee_id: "",
    distance_km: "",
    duree_estimee: "",
    tarif: "",
    latitude_depart: "",
    longitude_depart: "",
    latitude_arrivee: "",
    longitude_arrivee: "",
    itineraire_google_maps: ""
  });
  
  // État pour contrôler l'affichage de la carte
  const [showMap, setShowMap] = useState(false);

  // Récupérer la liste des stations au chargement
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        const response = await getStations();
        let data=response.data
        setStations(data);
      } catch (error) {
        toast.error("Erreur lors du chargement des stations");
        console.error("Erreur:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  // Mise à jour automatique des coordonnées lorsqu'une station est sélectionnée
  useEffect(() => {
    if (formData.station_depart_id) {
      const selectedStation = stations.find(s => s.id === parseInt(formData.station_depart_id));
      if (selectedStation) {
        setFormData(prev => ({
          ...prev,
          latitude_depart: selectedStation.latitude,
          longitude_depart: selectedStation.longitude
        }));
      }
    }
  }, [formData.station_depart_id, stations]);

  useEffect(() => {
    if (formData.station_arrivee_id) {
      const selectedStation = stations.find(s => s.id === parseInt(formData.station_arrivee_id));
      if (selectedStation) {
        setFormData(prev => ({
          ...prev,
          latitude_arrivee: selectedStation.latitude,
          longitude_arrivee: selectedStation.longitude
        }));
      }
    }
  }, [formData.station_arrivee_id, stations]);

  // Vérifier si les coordonnées sont prêtes pour générer un itinéraire
  useEffect(() => {
    if (formData.latitude_depart && formData.longitude_depart && 
        formData.latitude_arrivee && formData.longitude_arrivee) {
      generateGoogleMapsUrl();
    }
  }, [formData.latitude_depart, formData.longitude_depart, 
      formData.latitude_arrivee, formData.longitude_arrivee]);

  // Gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Calculer l'URL Google Maps basée sur les coordonnées
  const generateGoogleMapsUrl = () => {
    if (formData.latitude_depart && formData.longitude_depart && 
        formData.latitude_arrivee && formData.longitude_arrivee) {
      const url = `https://www.google.com/maps/dir/${formData.latitude_depart},${formData.longitude_depart}/${formData.latitude_arrivee},${formData.longitude_arrivee}`;
      setFormData(prev => ({
        ...prev,
        itineraire_google_maps: url
      }));
      
      // Activer l'affichage de la carte
      setShowMap(true);
    }
  };

  // Soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérifications basiques
    if (!formData.station_depart_id || !formData.station_arrivee_id) {
      toast.error("Veuillez sélectionner les stations de départ et d'arrivée");
      return;
    }

    if (formData.station_depart_id === formData.station_arrivee_id) {
      toast.error("Les stations de départ et d'arrivée doivent être différentes");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/trajets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Trajet créé avec succès!");
        // Réinitialiser le formulaire
        setFormData({
          station_depart_id: "",
          station_arrivee_id: "",
          distance_km: "",
          duree_estimee: "",
          tarif: "",
          latitude_depart: "",
          longitude_depart: "",
          latitude_arrivee: "",
          longitude_arrivee: "",
          itineraire_google_maps: ""
        });
        setShowMap(false);
      } else {
        const error = await response.json();
        toast.error(error.message || "Erreur lors de la création du trajet");
      }
    } catch (error) {
      toast.error("Une erreur est survenue");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  // Composant d'affichage de la carte Google Maps
  const GoogleMapsEmbed = ({ url }) => {
    if (!url) return null;
    
    // Extraire les coordonnées pour créer une URL d'embed compatible
    const matches = url.match(/dir\/([\d.-]+),([\d.-]+)\/([\d.-]+),([\d.-]+)/);
    if (!matches) return null;
    
    const [, startLat, startLng, endLat, endLng] = matches;
    const embedUrl = `https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${startLat},${startLng}&destination=${endLat},${endLng}&mode=driving`;
    
    return (
      <div className="mt-4 border rounded-lg overflow-hidden h-64 w-full">
        {/* Pour une démo sans clé API, utilisez l'URL directe comme alternative */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-center h-full w-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <div className="text-center p-4">
            <p className="text-lg font-semibold text-indigo-600">Prévisualiser l'itinéraire</p>
            <p className="text-sm text-gray-600">Cliquez pour ouvrir dans Google Maps</p>
            <div className="mt-4 flex justify-center">
              <div className="flex items-center space-x-4">
                <div className="text-left">
                  <p className="text-xs font-semibold">Départ</p>
                  <p className="text-xs">{formData.latitude_depart}, {formData.longitude_depart}</p>
                </div>
                <div className="text-gray-400">→</div>
                <div className="text-left">
                  <p className="text-xs font-semibold">Arrivée</p>
                  <p className="text-xs">{formData.latitude_arrivee}, {formData.longitude_arrivee}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
        
        {/* Décommentez ce bloc et ajoutez votre clé API Google Maps pour activer l'iframe */}
        {/* 
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={embedUrl}
          allowFullScreen
        ></iframe>
        */}
      </div>
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Création d'un nouveau trajet</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sélection des stations */}
            <div>
              <label htmlFor="station_depart_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Station de départ
              </label>
              <select
                id="station_depart_id"
                name="station_depart_id"
                value={formData.station_depart_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                required
              >
                <option value="">Sélectionnez une station</option>
                {stations.map((station) => (
                  <option key={`depart-${station.id}`} value={station.id}>
                    {station.nom}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="station_arrivee_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Station d'arrivée
              </label>
              <select
                id="station_arrivee_id"
                name="station_arrivee_id"
                value={formData.station_arrivee_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                required
              >
                <option value="">Sélectionnez une station</option>
                {stations.map((station) => (
                  <option key={`arrivee-${station.id}`} value={station.id}>
                    {station.nom}
                  </option>
                ))}
              </select>
            </div>

            {/* Coordonnées */}
            <div>
              <label htmlFor="latitude_depart" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Latitude départ
              </label>
              <input
                type="number"
                step="0.000001"
                id="latitude_depart"
                name="latitude_depart"
                value={formData.latitude_depart}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="longitude_depart" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Longitude départ
              </label>
              <input
                type="number"
                step="0.000001"
                id="longitude_depart"
                name="longitude_depart"
                value={formData.longitude_depart}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="latitude_arrivee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Latitude arrivée
              </label>
              <input
                type="number"
                step="0.000001"
                id="latitude_arrivee"
                name="latitude_arrivee"
                value={formData.latitude_arrivee}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                readOnly
              />
            </div>

            <div>
              <label htmlFor="longitude_arrivee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Longitude arrivée
              </label>
              <input
                type="number"
                step="0.000001"
                id="longitude_arrivee"
                name="longitude_arrivee"
                value={formData.longitude_arrivee}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                readOnly
              />
            </div>

            {/* Informations du trajet */}
            <div>
              <label htmlFor="distance_km" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Distance (km)
              </label>
              <input
                type="number"
                step="0.1"
                id="distance_km"
                name="distance_km"
                value={formData.distance_km}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="duree_estimee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Durée estimée (minutes)
              </label>
              <input
                type="number"
                id="duree_estimee"
                name="duree_estimee"
                value={formData.duree_estimee}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                required
              />
            </div>

            <div>
              <label htmlFor="tarif" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tarif
              </label>
              <input
                type="number"
                step="0.01"
                id="tarif"
                name="tarif"
                value={formData.tarif}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                required
              />
            </div>
          </div>

          {/* Itinéraire Google Maps */}
          <div>
            <label htmlFor="itineraire_google_maps" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Itinéraire Google Maps
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="itineraire_google_maps"
                name="itineraire_google_maps"
                value={formData.itineraire_google_maps}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
              />
              <button
                type="button"
                onClick={generateGoogleMapsUrl}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Générer
              </button>
            </div>
            
            {/* Affichage de la carte Google Maps */}
            {showMap && formData.itineraire_google_maps && (
              <GoogleMapsEmbed url={formData.itineraire_google_maps} />
            )}
          </div>

          {/* Boutons d'action */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? "Création en cours..." : "Créer le trajet"}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Create;