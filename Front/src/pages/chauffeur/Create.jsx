import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createChauffeur } from "../../services/Chauffeur";
import chauffeurSchema from "../../validations/ChauffeurSchema";

export function Create() {
  const [image,setImage]=useState(null);


  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(chauffeurSchema),
  });

  const navigate = useNavigate()

  const addChauffeur = async (data) => {
    try {
      let formaData=new FormData();
      for (const key in data) {
       formaData.append(key,data[key])
      }
      formaData.append("image",image)

      await createChauffeur(formaData);

      reset();
      navigate('/dashboard/chauffeur')
      toast.success("Le chauffeur a été enregistré avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout du chauffeur :", error);
      toast.error("Une erreur est survenue lors de l'enregistrement.");
    }
  };

  const handleImageChange=(e)=>{
    const file=e.target.files[0]
    setImage(file)
  }

  return (
    <section className="flex justify-center items-center w-full min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-full max-w-4xl m-4">
        <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Ajout de chauffeur</h1>

        <form onSubmit={handleSubmit(addChauffeur)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Section photo */}
          <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-6">
            <div className="w-full md:w-1/3 flex justify-center">
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
              {image && (
                      <img
                        src={URL.createObjectURL(image)}
                        alt="Photo du chauffeur" className="text-gray-400 text-center p-4"
                      />
                    )}
              </div>
            </div>
            
            <div className="w-full md:w-2/3">
              <label className="block text-gray-700 font-medium mb-1">Photo</label>
              <input
                onChange={handleImageChange}
                type="file"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

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

          {/* Boutons */}
          <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <Link to={"/dashboard/chauffeur"}>
              <button className="w-full sm:w-auto px-6 py-3 text-xs py-3 rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize">
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