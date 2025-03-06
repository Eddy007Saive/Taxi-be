import * as yup from 'yup';

const stationSchema = yup.object({
  id: yup.number().integer().positive().required(),
  nom: yup.string().min(3).max(100).required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
});

export default stationSchema;
