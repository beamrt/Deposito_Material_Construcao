import * as yup from 'yup';
import { cpf } from 'cpf-cnpj-validator';

export const userSchema = yup.object().shape({
  nome: yup.string().required('O nome é obrigatório.'),

  email: yup
    .string()
    .email('Digite um e-mail válido.')
    .required('O e-mail é obrigatório.'),

  senha: yup
    .string()
    .required('A senha é obrigatória.')
    .min(8, 'A senha precisa ter no mínimo 8 caracteres.')
    .matches(/(?=.*[a-z])/, 'A senha deve ter pelo menos 1 letra minuscula.')
    .matches(/(?=.*[A-Z])/, 'A senha deve ter pelo menos 1 letra maiuscula.')
    .matches(/(?=.*[0-9])/, 'A senha deve ter pelo menos 1 número.'),

  confirmacao_senha: yup
    .string()
    .required('A confirmação da senha é obrigatória.')
    .oneOf([yup.ref('senha')], 'As senhas não conferem. Digite novamente.'),

  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .transform((value, originalValue) =>
      originalValue ? originalValue.replace(/[^\d]/g, '') : originalValue,
    )
    .min(11, 'O CPF deve ter 11 caracteres.')
    .max(11, 'O CPF deve ter 11 caracteres.')
    .test('is-cpf', 'CPF inválido', (value) => {
      if (!value) return;
      return cpf.isValid(value);
    }),
});
