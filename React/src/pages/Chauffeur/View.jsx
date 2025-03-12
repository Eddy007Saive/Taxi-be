import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { getChauffeurs } from "../../services/Chauffeur";

function View() {
    const [chauffeurs, setChauffeurs] = useState([]);

    useEffect(() => {
        const fetchChauffeurs = async () => {
            try {
                const response = await getChauffeurs()
                setChauffeurs(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des chauffeurs :", error);
            }
        };
        fetchChauffeurs();
    }, []);

    return (
        <section className="bg-white dark:bg-gray-900 p-6">
            <div className="text-start mb-4">
                <h1 className="text-2xl font-semibold text-blue-800">Liste des chauffeurs</h1>
            </div>
            <div className="flex justify-between items-center mb-4">
                <Link to={"new"} className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600">
                    Créer Nouveau
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full border-collapse rounded-lg shadow-lg bg-white">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="px-4 py-3">Nom</th>
                            <th className="px-4 py-3">Prénom</th>
                            <th className="px-4 py-3">Téléphone</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chauffeurs.length > 0 ? (
                            chauffeurs.map((chauffeur, index) => (
                                <tr key={chauffeur.id} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b`}>
                                    <td className="px-4 py-3">{chauffeur.nom}</td>
                                    <td className="px-4 py-3">{chauffeur.prenom}</td>
                                    <td className="px-4 py-3">{chauffeur.telephone}</td>
                                    <td className="px-4 py-3">{chauffeur.email}</td>
                                    <td className="px-4 py-3">
                                        <button className="bg-blue-300 text-dark px-3 py-1 rounded-lg text-sm mr-2 hover:bg-green-600">
                                            Modifier
                                        </button>
                                        <button className="bg-pink-300 text-dark px-3 py-1 rounded-lg text-sm hover:bg-red-600">
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-3 text-center text-gray-500">
                                    Aucun chauffeur disponible.
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
