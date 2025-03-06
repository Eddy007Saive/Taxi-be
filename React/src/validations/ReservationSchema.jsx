import * as yup from 'yup';

const reservationSchema = yup.object({
  id: yup.number().integer().positive().required(),
  user_id: yup.number().integer().positive().required(),
  voyage_id: yup.number().integer().positive().required(),
  nombre_places: yup.number().integer().positive().min(1).required(),
  statut: yup.string().oneOf(['en attente', 'confirmée', 'annulée']).required(),
});

export default reservationSchema;
