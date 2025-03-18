import * as yup from 'yup';

const voyageSchema = yup.object({
  id: yup.number().integer().positive().required(),
  trajet_id: yup.number().integer().positive().required(),
  chauffeur_id: yup.number().integer().positive().required(),
  vehicule_id: yup.number().integer().positive().required(),
  date_depart: yup.date().required(),
  places_disponibles: yup.number().integer().positive().required(),
});

export default voyageSchema;
