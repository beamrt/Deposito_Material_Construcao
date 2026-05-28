import * as yup from 'yup';

export const userSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório.'),

  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('O e-mail é obrigatório.'),

  senha: yup
    .string()
    .required('A senha é obrigatória.')
    .min(6, 'A senha precisa ter no mínimo 6 caracteres.'),

  confirmar_senha: yup
    .string()
    .required('A confirmação da senha é obrigatória.')
    .oneOf([yup.ref('senha')], 'As senhas não conferem. Digite novamente.'),
});
