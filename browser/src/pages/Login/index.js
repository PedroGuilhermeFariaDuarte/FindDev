import React, { useState, useEffect } from "react";
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
import { schemaLogin } from "../../schemas";
function Login({ history }) {
  const [loading, setLoading] = useState(false);

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

      const response = await api.post("user", data);

      if (await handlerSubmitError(response)) {
        sessionStorage.setItem(
          "@findev/session",
          response.data.response.user.data._id
        );
        history.push("/profile", { id: response.data.response.user.data._id });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Ops! Não foi possivel realizar o login, tente novamente!`);
      setLoading(false);
    }
  }

  useEffect(() => {
    sessionStorage.removeItem("@findev/session");
  }, []);

  return (
    <Container>
      <FormContainer>
        <GoMarkGithub coloe="#000" size={50} />
        <Form schema={schemaLogin} onSubmit={handlerSubmit}>
          <label htmlFor="email" title="Seu e-mail de usuario">
            E-mail
          </label>
          <Input type="email" name="email" />

          <label htmlFor="password" title="Sua senha">
            Password
          </label>
          <Input type="password" name="password" />

          <Button loading={loading}>
            {loading ? <AiOutlineLoading color="#fff" size={16} /> : "Login"}
          </Button>
          <p>
            Não possui uma conta? <Link to="/">criar conta</Link>
          </p>
        </Form>
        <p>Desenvolvido e Refatorado durante a semana Omnistack 10!</p>
      </FormContainer>
    </Container>
  );
}

Login.propTypes = {
  loading: PropTypes.bool
};

Login.propsDefault = {
  loading: false
};

export default Login;
