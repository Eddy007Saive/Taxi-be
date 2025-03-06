import * as yup from 'yup';

const vehiculeSchema = yup.object({
  id: yup.number().integer().positive().required(),
  marque: yup.string().min(3).max(100).required(),
  modele: yup.string().min(3).max(100).required(),
  annee: yup.number().min(1900).max(new Date().getFullYear()).required(),
  chauffeur_id: yup.number().integer().positive().required(),
});

export default vehiculeSchema;
