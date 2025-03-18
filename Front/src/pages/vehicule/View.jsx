import React, { useEffect, useState } from "react";
import { ToastContainer} from "react-toastify";
import { Link } from "react-router-dom";
import { getVehicules } from "../../services/Vehicule";

function View() {
    const [vehicules, setVehicule] = useState([]);

    useEffect(() => {
        fetchVehicule()
    }, []);
    const fetchVehicule = async () => {
        try {
            const response = await getVehicules()
            setVehicule(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des chauffeurs :", error);
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 p-6">
            <div className="text-start mb-4">
                <h1 className="text-2xl font-semibold text-blue-800">Liste des chauffeurs</h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <Link to={"new"} className="bg-blue-400 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                    Créer Nouveau
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg shadow-lg bg-white">
                    <thead className="bg-blue-200 text-blue-600">
                        <tr>
                            <th className="px-4 py-3">immatriculation</th>
                            <th className="px-4 py-3">marque</th>
                            <th className="px-4 py-3">modele</th>
                            <th className="px-4 py-3">capacite</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicules.length > 0 ? (
                            vehicules.map((vehicule, index) => (
                                <tr key={vehicule.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}>
                                    <td className="px-4 py-3 text-sm">{vehicule.immatriculation}</td>
                                    <td className="px-4 py-3 text-sm">{vehicule.marque}</td>
                                    <td className="px-4 py-3 text-sm">{vehicule.modele}</td>
                                    <td className="px-4 py-3 text-sm">{vehicule.capacite}</td>
                                    <td className="px-4 py-3 text-sm">
                                        <button className="bg-blue-300 text-sm text-dark px-3 py-1 rounded-lg text-sm mr-2 hover:bg-green-600">
                                            Modifier
                                        </button>
                                        <button className="bg-pink-300 text-sm text-dark px-3 py-1 rounded-lg text-sm hover:bg-red-600">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                                    Aucun vehicule disponible.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </section>
    );
}

export default View;
