import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Icons
import { AiOutlineLoading } from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

// Styles
import { Container, List, Header, UserInfo, Spinner } from "./styles";

// Services
import api from "../../services/Api";

// Components
import HeaderButtons from "../../components/Header";

function Devs({ history }) {
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(false);

  const meuID = sessionStorage.getItem("@findev/session");

  useEffect(() => {
    function handlerVerifySession() {
      const sessionID = sessionStorage.getItem("@findev/session");
      if (!sessionID) {
        history.push("/");
      }
    }

    async function loadDevs() {
      try {
        setLoading(true);
        const response = await api.get("devs");

        setDevs(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Não foi possivel recuperar os devs cadastrados");
        setLoading(false);
      }
    }

    handlerVerifySession();
    loadDevs();
  }, [history]);

  function handlerToPage(id) {
    history.push("/profile", { id });
  }

  return (
    <Container>
      <GoMarkGithub size={32} color="#000" />
      <HeaderButtons history={history} />
      {loading ? (
        <Spinner>
          <AiOutlineLoading size={32} color="#7159c1" />
        </Spinner>
      ) : (
        <List className="list_devs">
          {devs.map(dev => (
            <li key={dev._id}>
              <Header>
                <img src={dev.avatar_url} alt={dev.name} />
                <UserInfo>
                  <strong>{meuID === dev._id ? "Você" : dev.name}</strong>
                  <span>{dev.techs.join(", ")}</span>
                </UserInfo>
              </Header>
              <p>{dev.bio}</p>
              <a
                href={`http://github.com/${dev.github_username}`}
                target="_newblank"
              >
                Acessar perfil no Github
              </a>
              <a onClick={() => handlerToPage(dev._id)}>Perfil</a>
            </li>
          ))}
        </List>
      )}
    </Container>
  );
}

export default Devs;
