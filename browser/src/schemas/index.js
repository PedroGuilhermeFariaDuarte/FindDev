import * as Yup from "yup";

// Schema from Validation form, Login
export const schemaLogin = Yup.object().shape({
  email: Yup.string()
    .email()
    .required("Seu e-mail é obrigatorio"),
  password: Yup.string().required("Sua senha é obrigatoria")
});

export const schemaUser = Yup.object().shape({
  name: Yup.string().required("Seu nome de usuario é obrigatorio"),
  password: Yup.string().required("Sua senha é obrigatoria"),
  email: Yup.string()
    .email("Seu e-mail está incorreto")
    .required("Seu e-mail é obrigatorio")
});
