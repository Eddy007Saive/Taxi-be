import * as yup from 'yup';

const chauffeurSchema = yup.object({
  id: yup.number().integer().positive().required(),
  nom: yup.string().min(3).max(100).required(),
  contact: yup.string().min(10).max(15).required(),
  vehicule_id: yup.number().integer().positive().required(),
});

export default chauffeurSchema;
