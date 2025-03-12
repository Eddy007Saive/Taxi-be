import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStations } from "../../services/Station";
import { createTrajet } from "../../services/Trajet";
import MyMap from "../../components/ItineraireMap";
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
    itineraire_google_maps: "",
  });

  const [showMap, setShowMap] = useState(false);
  const [selectedDepartStation, setSelectedDepartStation] = useState(null);
  const [selectedArriveeStation, setSelectedArriveeStation] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await getStations();
        setStations(response.data);
      } catch (error) {
        toast.error("Erreur lors du chargement des stations");
        console.error("Erreur:", error);
      }
    };
    fetchStations();
  }, []);

  // Met à jour les coordonnées de départ quand une station de départ est sélectionnée
  useEffect(() => {
    if (formData.station_depart_id) {
      const station = stations.find(s => s.id === parseInt(formData.station_depart_id));
      if (station) {
        setSelectedDepartStation(station);
        setFormData(prev => ({
          ...prev,
          latitude_depart: station.latitude,
          longitude_depart: station.longitude
        }));
      }
    }
  }, [formData.station_depart_id, stations]);

  // Met à jour les coordonnées d'arrivée quand une station d'arrivée est sélectionnée
  useEffect(() => {
    if (formData.station_arrivee_id) {
      const station = stations.find(s => s.id === parseInt(formData.station_arrivee_id));
      if (station) {
        setSelectedArriveeStation(station);
        setFormData(prev => ({
          ...prev,
          latitude_arrivee: station.latitude,
          longitude_arrivee: station.longitude
        }));
      }
    }
  }, [formData.station_arrivee_id, stations]);

  // Calcule la distance estimée lorsque les deux stations sont sélectionnées
  useEffect(() => {
    if (formData.latitude_depart && formData.longitude_depart && 
        formData.latitude_arrivee && formData.longitude_arrivee) {
      const distance = calculateDistance(
        formData.latitude_depart, 
        formData.longitude_depart,
        formData.latitude_arrivee,
        formData.longitude_arrivee
      );
      setFormData(prev => ({
        ...prev,
        distance_km: distance.toFixed(2),
        duree_estimee: Math.round(distance / 50 * 60) // Estimation: 50 km/h en moyenne
      }));
    }
  }, [formData.latitude_depart, formData.longitude_depart, formData.latitude_arrivee, formData.longitude_arrivee]);

  // Calcul de la distance en km entre deux points de coordonnées
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await createTrajet(formData);
      toast.success("Trajet créé avec succès !");
      // Redirection vers la liste des trajets
      setTimeout(() => {
        window.location.href = "/trajets";
      }, 2000);
    } catch (error) {
      toast.error("Erreur lors de la création du trajet");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateGoogleMapsUrl = () => {
    if (!formData.latitude_depart || !formData.longitude_depart || 
        !formData.latitude_arrivee || !formData.longitude_arrivee) {
      toast.warning("Veuillez sélectionner les stations de départ et d'arrivée");
      return;
    }
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${formData.latitude_depart},${formData.longitude_depart}&destination=${formData.latitude_arrivee},${formData.longitude_arrivee}`;
    setFormData((prev) => ({ ...prev, itineraire_google_maps: url }));
    setRoutePoints([
      [formData.latitude_depart, formData.longitude_depart],
      [formData.latitude_arrivee, formData.longitude_arrivee],
    ]); // Mettez à jour les points de route
    setShowMap(true);
    setShowMap(true);
  };

  // Calcul du tarif suggéré basé sur la distance
  const calculateSuggestedTarif = () => {
    if (!formData.distance_km) return "";
    const distance = parseFloat(formData.distance_km);
    // Formule simple: tarif de base + prix par km
    const tarifBase = 500; // 500 FCFA de base
    const prixParKm = 100; // 100 FCFA par km
    return (tarifBase + distance * prixParKm).toFixed(0);
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Création d'un nouveau trajet
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Stations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="station_depart_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Station de départ *
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
                    {station.nom} - {station.ville}
                  </option>
                ))}
              </select>
              {selectedDepartStation && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {selectedDepartStation.adresse}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="station_arrivee_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Station d'arrivée *
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
                    {station.nom} - {station.ville}
                  </option>
                ))}
              </select>
              {selectedArriveeStation && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {selectedArriveeStation.adresse}
                </p>
              )}
            </div>
          </div>

          {/* Coordonnées */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          {/* Informations sur le trajet */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="distance_km" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Distance (km) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
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
                Durée estimée (min) *
              </label>
              <input
                type="number"
                min="1"
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
                Tarif (FCFA) *
              </label>
              <div className="flex">
                <input
                  type="number"
                  min="0"
                  id="tarif"
                  name="tarif"
                  value={formData.tarif || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
                  required
                />
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, tarif: calculateSuggestedTarif() }))}
                  className="ml-2 inline-flex items-center px-2 py-1 border border-          ...
              dark:border-gray-600 dark:text-white p-2"
                readOnly
              />
            </div>
          </div>

          {/* Distance et durée estimée */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="distance_km" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Distance estimée (km)
              </label>
              <input
                type="text"
                id="distance_km"
                name="distance_km"
                value={formData.distance_km}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
              />
            </div>
            <div>
              <label htmlFor="duree_estimee" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Durée estimée (minutes)
              </label>
              <input
                type="text"
                id="duree_estimee"
                name="duree_estimee"
                value={formData.duree_estimee}
                readOnly
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
              />
            </div>
          </div>

          {/* Tarif */}
          <div>
            <label htmlFor="tarif" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tarif (FCFA)
            </label>
            <input
              type="number"
              id="tarif"
              name="tarif"
              value={formData.tarif}
              onChange={handleChange}
              placeholder={`Tarif suggéré : ${calculateSuggestedTarif()} FCFA`}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white p-2"
            />
          </div>

          {/* Bouton de génération d'itinéraire */}
          <div>
            <button
              type="button"
              onClick={generateGoogleMapsUrl}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
            >
              Générer l'itinéraire Google Maps
            </button>
          </div>
          
          {/* Affichage de la carte */}
          {showMap && formData.itineraire_google_maps && (
            <div className="mt-4">
            <MyMap points={routePoints}/>
            </div>
          )}

          {/* Bouton de soumission */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
              disabled={loading}
            >
              {loading ? "Création en cours..." : "Créer le trajet"}
            </button>
          </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Create;