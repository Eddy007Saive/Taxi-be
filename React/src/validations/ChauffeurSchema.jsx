import * as yup from 'yup';

const chauffeurSchema = yup.object({
  nom: yup.string().required("Le nom est obligatoire"),
  prenom: yup.string().required("Le prénom est obligatoire"),
  telephone: yup.string().matches(/^\d+$/, "Numéro invalide").required("Le téléphone est obligatoire"),
  email: yup.string().email("Email invalide").required("L'email est obligatoire"),
  permis_numero: yup.string().required("Le numéro de permis est obligatoire"),
  date_embauche: yup.date().required("La date d'embauche est obligatoire"),
});

export default chauffeurSchema;
