import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createChauffeur } from "../../services/Chauffeur";
import chauffeurSchema from "../../validations/ChauffeurSchema";

function Create() {

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(chauffeurSchema),
  });
  const navigate = useNavigate()
  const addChauffeur = async (data) => {
    try {
      await createChauffeur(data);
      reset();
      navigate('/dashboard/chauffeur')
      toast.success("Le chauffeur a été enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du chauffeur :", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  return (
    <section className="flex justify-center items-center w-full h-screen">
      <div className="bg-white dark:bg-gray-900 shadow-2xl p-6 w-2/3">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Ajout de chauffeur</h1>

        <form onSubmit={handleSubmit(addChauffeur)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Nom */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nom</label>
            <input
              {...register("nom")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Nom du chauffeur"
            />
            {errors.nom && <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>}
          </div>

          {/* Prénom */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Prénom</label>
            <input
              {...register("prenom")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Prénom du chauffeur"
            />
            {errors.prenom && <p className="text-red-500 text-sm mt-1">{errors.prenom.message}</p>}
          </div>

          {/* Téléphone */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Téléphone</label>
            <input
              {...register("telephone")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Téléphone du chauffeur"
            />
            {errors.telephone && <p className="text-red-500 text-sm mt-1">{errors.telephone.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              {...register("email")}
              type="email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Email du chauffeur"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* Permis numéro */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Permis numéro</label>
            <input
              {...register("permis_numero")}
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Permis numéro du chauffeur"
            />
            {errors.permis_numero && <p className="text-red-500 text-sm mt-1">{errors.permis_numero.message}</p>}
          </div>

          {/* Date d'embauche */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Date d'embauche</label>
            <input
              {...register("date_embauche")}
              type="date"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {errors.date_embauche && <p className="text-red-500 text-sm mt-1">{errors.date_embauche.message}</p>}
          </div>

          {/* Bouton d'envoi (pleine largeur) */}
          <div className="col-span-1 md:col-span-2 text-center flex justify-center gap-2">
            <Link to={"/dashboard/chauffeur"}>
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
