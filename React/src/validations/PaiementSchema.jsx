import * as yup from 'yup';

const paiementSchema = yup.object({
  id: yup.number().integer().positive().required(),
  reservation_id: yup.number().integer().positive().required(),
  montant: yup.number().positive().required(),
  mode_paiement: yup.string().oneOf(['carte', 'espèces', 'virement']).required(),
  date_paiement: yup.date().required(),
});

export default paiementSchema;
