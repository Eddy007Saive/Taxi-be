import * as yup from 'yup';

const vehiculeSchema = yup.object({
  marque: yup.string().min(3).max(100).required(),
  modele: yup.string().min(3).max(100).required(),
});

export default vehiculeSchema;
