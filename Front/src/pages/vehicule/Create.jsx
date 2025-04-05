import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import vehiculeSchema from "../../validations/VehiculeSchema";
import { createVehicule } from "../../services/Vehicule";
import { Link, useNavigate } from "react-router-dom";

export function Create() {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(vehiculeSchema)
  });

  const navigate = useNavigate()


  const addVehicule = async (data) => {
    try {
      await createVehicule(data);
      reset();
      toast.success("Le véhicule a été enregistré avec succès !");
      navigate("/dashboard/vehicule")
    } catch (error) {
      console.error("Erreur lors de l'ajout du véhicule", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="bg-white dark:bg-gray-900 shadow-2xl p-6 w-2/3">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Ajout de véhicule</h1>

        <form onSubmit={handleSubmit(addVehicule)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Immatriculation */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Immatriculation</label>
            <input
              {...register("immatriculation")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Immatriculation du véhicule"
            />
            {errors.immatriculation && <p className="text-red-500 text-sm mt-1">{errors.immatriculation.message}</p>}
          </div>

          {/* Marque */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Marque</label>
            <input
              {...register("marque")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Marque du véhicule"
            />
            {errors.marque && <p className="text-red-500 text-sm mt-1">{errors.marque.message}</p>}
          </div>

          {/* Modèle */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Modèle</label>
            <input
              {...register("modele")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Modèle du véhicule"
            />
            {errors.modele && <p className="text-red-500 text-sm mt-1">{errors.modele.message}</p>}
          </div>

          {/* Capacité */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Capacité</label>
            <input
              {...register("capacite")}
              type="number"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Capacité du véhicule"
              min="1"
            />
            {errors.capacite && <p className="text-red-500 text-sm mt-1">{errors.capacite.message}</p>}
          </div>

    

          <input
            {...register("statut")}
            type="hidden"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Capacité du véhicule"
            value={1}
          />

          {/* Boutons */}
          <div className="col-span-1 md:col-span-2 text-center flex justify-center gap-2">
            <Link to={"/dashboard/vehicule"}>
              <button className="w-full sm:w-auto px-6 py-3 text-xs  rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize">
                Retour à la liste
              </button>
            </Link>
            <button type="submit" className="w-full sm:w-auto px-6 py-3 text-xs  rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize">
              Ajouter
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </section>
  );
}

export default Create;
