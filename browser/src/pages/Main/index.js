import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import PropTypes from "prop-types";

// Icons
import { AiOutlineLoading } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

// Styles
import { Container } from "../../components/Container";
import {
  FormContainer,
  Button,
  TagsContainer,
  LocationContainer
} from "./styles";

// Services
import api from "../../services/Api";

// Schema from Validation form
const schema = Yup.object().shape({
  github_username: Yup.string().required("Seu usuario do Github é obrigatrio"),
  latitude: Yup.number().required("Campo obrigatrio"),
  longitude: Yup.number().required("Campo obrigatrio")
});

function Main({ history }) {
  const [tags, setTags] = useState([]);

  const [location, setLocation] = useState({ longitude: 0, latitude: 0 });
  const [loading, setLoading] = useState(false);

  // Handler Apply rules to Tags
  function handlerAddTagsRules(event) {
    if (event.keyCode === 32) {
      if (tags.length >= 4) {
        toast.warn("Não é possivel adicionar mais tags!");
        event.target.value = "";
        return false;
      }

      if (event.target.value.trim() === "") {
        toast.error("Informe uma tecnologia!");
        event.target.value = "";
        return false;
      }

      event.target.value = "";
      return true;
    } else {
      return false;
    }
  }

  // Handler Add tags
  function handlerAddTags(event) {
    const { value } = event.target;

    if (!handlerAddTagsRules(event)) {
      return;
    }

    setTags([...tags, value]);
  }

  // Handler Remove one tags
  function handlerRemoveTags(index) {
    setTags([...tags.filter((y, q) => q !== index)]);
  }

  // Handler Storaged token of authentication
  async function handlerStoragedToken(token) {
    localStorage.setItem("token", token);
  }

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
      await handlerStoragedToken(response.data.response.token);
      return true;
    }
  }

  // Handler Submit a Form for API REST
  async function handlerSubmit(data) {
    try {
      setLoading(true);
      const newData = { ...data, techs: tags.join(",") };
      const response = await api.post("devs", newData);

      const iduser = response.data.response.user._id;
      const nameuser = response.data.response.user.user.name;

      if (await handlerSubmitError(response)) {
        history.push("/user", { user: { id: iduser, name: nameuser } });
      }
    } catch (error) {
      console.log(error);
      toast.error(`Ops! Não foi possivel salvar seu usuário, tente novamente!`);
      setLoading(false);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLocation({ latitude, longitude });
      },
      error => {
        toast.warn("Preencha manualmente sua localização!");
      },
      { timeout: 30000 }
    );
  }, []);

  return (
    <Container>
      <FormContainer>
        <GoMarkGithub coloe="#000" size={50} />

        <Form schema={schema} onSubmit={handlerSubmit}>
          <label
            htmlFor="github_username"
            title="Adicione o seu nome de usuario do GitHub"
          >
            Username
          </label>
          <Input type="text" name="github_username" />

          <TagsContainer>
            <label htmlFor="techs" title="Adicione tags de tecnologia">
              Your techs
            </label>
            <Input
              type="text"
              name="techs"
              onKeyUp={event => handlerAddTags(event)}
            />
            <ul title="Suas tegs de tecnologias">
              {tags.map((tag, index) => (
                <li
                  key={index}
                  title={tag}
                  onClick={() => handlerRemoveTags(index)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </TagsContainer>

          <LocationContainer>
            <div>
              <label
                htmlFor="latitude"
                title="Informe manualmente a sua localização"
              >
                Latitude
              </label>
              <Input
                type="number"
                name="latitude"
                onChange={event =>
                  setLocation({ ...location, latitude: event.target.value })
                }
                value={location.latitude}
              />
            </div>
            <div>
              <label
                htmlFor="longitude"
                title="Informe manualmente a sua localização"
              >
                Longitude
              </label>
              <Input
                type="number"
                name="longitude"
                onChange={event =>
                  setLocation({ ...location, longitude: event.target.value })
                }
                value={location.longitude}
              />
            </div>
          </LocationContainer>

          <Button loading={loading}>
            {loading ? (
              <AiOutlineLoading color="#fff" size={16} />
            ) : (
              "Continuar"
            )}
          </Button>
          <p>
            já tem uma conta? <Link to="login">entrar</Link>
          </p>
        </Form>
        <p>Desenvolvido e Refatorado durante a semana Omnistack 10!</p>
      </FormContainer>
    </Container>
  );
}

Main.propTypes = PropTypes.shape({
  loading: PropTypes.bool
}).isRequired;

Main.propsDefault = PropTypes.shape({
  loading: false
});

export default Main;
