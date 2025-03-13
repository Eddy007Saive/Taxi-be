import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStations } from "../../services/Station";
import { createTrajet } from "../../services/Trajet";
import RouteMap from "../../components/RouteMap";

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

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDepartStation, setSelectedDepartStation] = useState(null);
  const [selectedArriveeStation, setSelectedArriveeStation] = useState(null);

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
      
      // Auto-generate Google Maps URL when both stations are selected
      const url = `https://www.google.com/maps/dir/?api=1&origin=${formData.latitude_depart},${formData.longitude_depart}&destination=${formData.latitude_arrivee},${formData.longitude_arrivee}`;
      setFormData(prev => ({ ...prev, itineraire_google_maps: url }));
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

  // Calcul du tarif suggéré basé sur la distance
  const calculateSuggestedTarif = () => {
    if (!formData.distance_km) return "";
    const distance = parseFloat(formData.distance_km);
    // Formule simple: tarif de base + prix par km
    const tarifBase = 500; // 500 FCFA de base
    const prixParKm = 100; // 100 FCFA par km
    return (tarifBase + distance * prixParKm).toFixed(0);
  };

  // Passer à l'étape suivante si les champs requis sont remplis
  const goToNextStep = () => {
    if (currentStep === 1 && formData.station_depart_id && formData.station_arrivee_id) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Suggérer automatiquement un tarif si non renseigné
      if (!formData.tarif) {
        setFormData(prev => ({
          ...prev,
          tarif: calculateSuggestedTarif()
        }));
      }
      setCurrentStep(3);
    }
  };

  // Revenir à l'étape précédente
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-800 dark:text-indigo-300">Création d'un Nouveau Trajet</h1>
          <p className="text-gray-600 dark:text-gray-400">Définissez votre itinéraire entre deux stations</p>
        </div>

        {/* Indicateur d'étapes */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-3xl">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex-1">
                  <div className="flex items-center">
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg 
                      ${currentStep === step ? 'bg-indigo-600 text-white' : 
                        currentStep > step ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600 dark:bg-gray-700'}`}
                    >
                      {currentStep > step ? '✓' : step}
                    </div>
                    <div 
                      className={`h-1 flex-1 ${step === 3 ? 'hidden' : ''} 
                      ${currentStep > step ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}`}
                    ></div>
                  </div>
                  <div className="text-center mt-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    {step === 1 ? 'Stations' : step === 2 ? 'Détails' : 'Confirmation'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          {/* Étape 1: Sélection des stations */}
          {currentStep === 1 && (
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Choisissez les stations</h2>
                  
                  <div>
                    <label htmlFor="station_depart_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Station de départ *
                    </label>
                    <select
                      id="station_depart_id"
                      name="station_depart_id"
                      value={formData.station_depart_id}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                      <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <p className="text-sm font-medium text-blue-800 dark:text-blue-300">{selectedDepartStation.nom}</p>
                        <p className="text-xs text-blue-700 dark:text-blue-400">{selectedDepartStation.adresse}</p>
                      </div>
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
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                      <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <p className="text-sm font-medium text-green-800 dark:text-green-300">{selectedArriveeStation.nom}</p>
                        <p className="text-xs text-green-700 dark:text-green-400">{selectedArriveeStation.adresse}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-1/2 h-64 md:h-auto">
                  {formData.latitude_depart && formData.latitude_arrivee ? (
                    <div className="h-full rounded-lg overflow-hidden">
                      <RouteMap 
                        startPoint={[formData.latitude_depart, formData.longitude_depart]} 
                        endPoint={[formData.latitude_arrivee, formData.longitude_arrivee]} 
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 dark:bg-gray-700 rounded-lg">
                      <div className="text-center p-8">
                        <div className="w-16 h-16 mx-auto bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mb-4">
                          <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          Aperçu du trajet
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          Sélectionnez une station de départ et d'arrivée pour visualiser l'itinéraire.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={goToNextStep}
                  className={`px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all ${
                    !formData.station_depart_id || !formData.station_arrivee_id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!formData.station_depart_id || !formData.station_arrivee_id}
                >
                  Continuer <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          )}

          {/* Étape 2: Détails du trajet */}
          {currentStep === 2 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Détails du trajet</h2>
              
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <span className="text-blue-600 dark:text-blue-300 font-bold">A</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedDepartStation?.nom}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedDepartStation?.ville}</p>
                    </div>
                  </div>
                </div>
                
                <div className="my-3 ml-5 border-l-2 border-dashed border-gray-300 dark:border-gray-600 pl-4 py-2">
                  <div className="flex items-center">
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1 mr-2">
                      <span className="text-sm font-medium">{formData.distance_km} km</span>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-1">
                      <span className="text-sm font-medium">{formData.duree_estimee} min</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-300 font-bold">B</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{selectedArriveeStation?.nom}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{selectedArriveeStation?.ville}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Distance calculée à vol d'oiseau. Vous pouvez ajuster si nécessaire.
                  </p>
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
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Estimation basée sur une vitesse moyenne de 50 km/h.
                  </p>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="tarif" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tarif (FCFA) *
                  </label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="0"
                      id="tarif"
                      name="tarif"
                      value={formData.tarif || ""}
                      onChange={handleChange}
                      className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder={`Tarif suggéré : ${calculateSuggestedTarif()} FCFA`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tarif: calculateSuggestedTarif() }))}
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                      Suggestion
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Tarif suggéré : tarif de base (500 FCFA) + 100 FCFA/km
                  </p>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                >
                  <span className="mr-1">←</span> Retour
                </button>
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                >
                  Continuer <span className="ml-1">→</span>
                </button>
              </div>
            </div>
          )}

          {/* Étape 3: Confirmation */}
          {currentStep === 3 && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Confirmer le trajet</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Récapitulatif</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Station de départ:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedDepartStation?.nom}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Station d'arrivée:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{selectedArriveeStation?.nom}</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Distance:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formData.distance_km} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">Durée estimée:</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formData.duree_estimee} minutes</span>
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Tarif:</span>
                        <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{formData.tarif} FCFA</span>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <a 
                        href={formData.itineraire_google_maps} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        Voir sur Google Maps
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="h-64 md:h-auto rounded-xl overflow-hidden shadow-lg">
                  <RouteMap 
                    startPoint={[formData.latitude_depart, formData.longitude_depart]} 
                    endPoint={[formData.latitude_arrivee, formData.longitude_arrivee]} 
                  />
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="mt-8 flex justify-between">
                  <button
                    type="button"
                    onClick={goToPreviousStep}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                  >
                    <span className="mr-1">←</span> Retour
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all flex items-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Création en cours...
                      </>
                    ) : (
                      <>
                        Créer le trajet <span className="ml-1">✓</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
    </section>
  );
}

export default Create;