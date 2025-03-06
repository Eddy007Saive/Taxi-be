import * as yup from 'yup';

const trajetSchema = yup.object({
  id: yup.number().integer().positive().required(),
  station_depart_id: yup.number().integer().positive().required(),
  station_arrivee_id: yup.number().integer().positive().required(),
  distance_km: yup.number().positive().required(),
  duree_min: yup.number().positive().required(),
});

export default trajetSchema;
