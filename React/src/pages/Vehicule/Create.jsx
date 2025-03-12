import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createvehicule } from "../../services/vehicule";
import vehiculeSchema from "../../validations/vehiculeSchema";

function Create() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(vehiculeSchema),
  });

  const addvehicule = async (data) => {
    try {
      await createvehicule(data);
      reset();
      toast.success("Le vehicule a été enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du vehicule :", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Ajout de vehicule</h1>

      <form onSubmit={handleSubmit(addvehicule)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">immatriculation</label>
          <input
            {...register("immatriculation")}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="immatriculation du vehicule"
          />
          {errors.immatriculation && <p className="text-red-500 text-sm mt-1">{errors.immatriculation.message}</p>}
        </div>

        {/* Prénom */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">marque</label>
          <input
            {...register("marque")}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="marque du vehicule"
          />
          {errors.marque && <p className="text-red-500 text-sm mt-1">{errors.marque.message}</p>}
        </div>

        {/* Téléphone */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">modele</label>
          <input
            {...register("modele")}
            type="text"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="modele du vehicule"
          />
          {errors.modele && <p className="text-red-500 text-sm mt-1">{errors.modele.message}</p>}
        </div>

        {/* capacite */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">capacite</label>
          <input
            {...register("capacite")}
            type="number"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="capacite du vehicule"
          />
          {errors.capacite && <p className="text-red-500 text-sm mt-1">{errors.capacite.message}</p>}
        </div>

        {/* Bouton d'envoi (pleine largeur) */}
        <div className="col-span-1 md:col-span-2 text-center flex justify-center gap-2">
          <Link to={"/dashboard/vehicule"}>
            <button className="w-full md:w-auto px-6 py-3 bg-blue-300 hover:bg-blue-600 text-dark font-semibold rounded-lg shadow-md transition duration-300">
              Retour à la liste
            </button>
          </Link>
          <button className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
            Ajouter
          </button>

        </div>
      </form>

      <ToastContainer />
    </section>
  );
}

export default Create;
