const yup = require('yup');

const userSchema = yup.object({
  id: yup.number().integer().positive().required(),
  nom: yup.string().min(3).max(100).required(),
  email: yup.string().email().required(),
  mot_de_passe: yup.string().min(6).required(),
  role: yup.string().oneOf(['utilisateur', 'admin', 'chauffeur']).required(),
});
