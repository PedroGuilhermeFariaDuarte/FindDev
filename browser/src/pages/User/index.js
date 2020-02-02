import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input } from "@rocketseat/unform";
import PropTypes from "prop-types";

// Icons
import { AiOutlineLoading } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

// Global Styles
import { Container } from "../../components/Container";

// Styles
import { FormContainer, Button } from "./styles";

// Services
import api from "../../services/Api";

// Schemas
import { schemaUser } from "../../schemas";
function User({ history }) {
  const [loading, setLoading] = useState(false);

  const defaultUser = history.location.state.user;

  // Handler Form Submit, for read and send' error's for user
  async function handlerSubmitError(response) {
    if (response.data.error) {
      toast.error(
        `Ops! Não foi possivel salvar seu usuário, tente novamente! CODE_ERROR: ${response.data.code}`
      );
      setLoading(false);
      return;
    } else if (response.data.code && response.data.code === 2) {
      toast.warn(response.data.message);
      setLoading(false);
      return;
    } else {
      setLoading(false);
      return true;
    }
  }

  // Handler Submit a Form for API REST
  async function handlerSubmit(data) {
    try {
      setLoading(true);

      const response = await api.put("user", {
        ...data,
        iduser: defaultUser.id
      });

      if (await handlerSubmitError(response)) {
        sessionStorage.setItem(
          "@findev/session",
          response.data.response.user._id
        );
        history.push("/profile", { id: response.data.response.user._id });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Ops! Não foi possivel salvar seu usuário, tente novamente!`);
      setLoading(false);
    }
  }

  return (
    <Container>
      <FormContainer>
        <GoMarkGithub coloe="#000" size={50} />
        <Form
          schema={schemaUser}
          onSubmit={handlerSubmit}
          defaultValue={{ name: defaultUser.name }}
        >
          <label htmlFor="name" title="Seu nome de usuario">
            Username
          </label>
          <Input type="text" name="name" />

          <label htmlFor="password" title="Sua senha">
            Password
          </label>
          <Input type="password" name="password" />

          <label htmlFor="email" title="Sua senha">
            E-mail
          </label>
          <Input type="email" name="email" />

          <Button loading={loading}>
            {loading ? (
              <AiOutlineLoading color="#fff" size={16} />
            ) : (
              "Criar Conta"
            )}
          </Button>
          <p>
            já tem uma conta? <Link to="/login">entrar</Link>
          </p>
        </Form>
        <p>Desenvolvido e Refatorado durante a semana Omnistack 10!</p>
      </FormContainer>
    </Container>
  );
}

User.propTypes = {
  loading: PropTypes.bool
};

User.propsDefault = {
  loading: false
};

export default User;
