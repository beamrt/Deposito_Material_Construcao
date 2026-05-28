import * as yup from 'yup';

export const userSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório'),

  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('O e-mail é obrigatório'),

  senha: yup.string().required('A senha é obrigatória'),
});
