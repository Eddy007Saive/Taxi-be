import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import vehiculeSchema from "../../validations/VehiculeSchema";
import { createVehicule } from "../../services/Vehicule";
import { Link, useNavigate } from "react-router-dom";
import { getChauffeurs } from "../../services/Chauffeur";

function Create() {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(vehiculeSchema)
  });

  const [chauffeurs, setChauffeurs] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchChauffeur();
  }, []);

  const fetchChauffeur = async () => {
    try {
      const response = await getChauffeurs();
      const chauffeurOptions = response.data.map(chauffeur => ({
        value: chauffeur.id,
        label: chauffeur.nom
      }));
      setChauffeurs(chauffeurOptions);
    } catch (error) {
      console.error("Erreur lors de la récupération des chauffeurs", error);
    }
  };

  const addVehicule = async (data) => {
    try {
      await createVehicule({
        ...data,
        chauffeur_id: data.chauffeur_id.value // Récupérer l'ID du chauffeur sélectionné
      });
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

          {/* Chauffeur (React Select) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Chauffeur</label>
            <Controller
              name="chauffeur_id"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={chauffeurs}
                  placeholder="Sélectionner un chauffeur"
                  className="p-2"
                />
              )}
            />
            {errors.chauffeur_id && <p className="text-red-500 text-sm mt-1">{errors.chauffeur_id.message}</p>}
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
              <button className="w-full md:w-auto px-6 py-3 bg-blue-300 hover:bg-blue-600 text-dark font-semibold rounded-lg shadow-md transition duration-300">
                Retour à la liste
              </button>
            </Link>
            <button type="submit" className="w-full md:w-auto px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
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
