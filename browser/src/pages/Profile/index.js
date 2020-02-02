import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

// Icon
import { MdKeyboardBackspace } from "react-icons/md";

// Global styles
import { Container } from "../../components/Container";
import { ArrorBack } from "../../components/ArrorBack";

// Style
import {
  ProfileContainer,
  UserInfo,
  Info,
  TagsContainer,
  StatesContainer
} from "./styles";

// Services
import api from "../../services/Api";

function Profile({ history }) {
  const [profile, setProfile] = useState({
    techs: [],
    bio: null,
    avatar_url: null,
    followers: [],
    following: [],
    idusuario: null,
    name: null,
    email: null
  });

  const meuID = sessionStorage.getItem("@findev/session");

  async function handlerFollower() {
    try {
      const { data: followingResponse } = await api.post("follower", {
        seguidorID: meuID,
        idusuario: profile.idusuario
      });

      if (followingResponse.code === 6) {
        toast.error(followingResponse.message);
        return;
      }

      toast.success(`Seguindo ${profile.name}`);
      setProfile({ ...profile, followers: followingResponse.response });
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function handlerUnFollower() {
    try {
      const { data: seguindoResponse } = await api.delete(
        "follower/unfollowing",
        {
          params: { seguidorID: meuID, idusuario: profile.idusuario }
        }
      );

      if (seguindoResponse.code === 6) {
        toast.error(seguindoResponse.message);
        return;
      }
      toast.success(`Você deixou de seguir ${profile.name}`);
      setProfile({ ...profile, followers: seguindoResponse.response });
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handlerBackPage() {
    history.push("/devs");
  }

  useEffect(() => {
    async function loadDev() {
      try {
        const response = await api.get("user", {
          params: { id: history.location.state.id }
        });

        if (response.data.code === 6) {
          toast.error(response.data.message);
          return;
        }

        if (response.data.length === 0) {
          history.push("/login");
          return;
        }

        const {
          techs,
          bio,
          avatar_url,
          followers,
          following,
          _id: idusuario
        } = response.data;

        const { name, email } = response.data;

        setProfile({
          techs,
          bio,
          avatar_url,
          followers,
          following,
          idusuario,
          name,
          email
        });
      } catch (error) {
        toast.error("TESTE" + error.message);
      }
    }

    function handlerVerifySession() {
      const sessionID = sessionStorage.getItem("@findev/session");
      if (!sessionID) {
        history.push("/");
      } else {
        loadDev();
      }
    }

    handlerVerifySession();
  }, [history]);

  return (
    <Container>
      <ProfileContainer>
        <UserInfo>
          <ArrorBack onClick={handlerBackPage}>
            <MdKeyboardBackspace size={12} />
            <strong>inicio</strong>
          </ArrorBack>
          <img
            src={
              profile.avatar_url
                ? profile.avatar_url
                : `https://api.adorable.io/avatar/50/${profile.name}`
            }
            alt={`Foto de Perfil do ${profile.name}`}
          />
          <Info>
            <strong>{profile.name}</strong>
            <strong>{profile.email}</strong>
          </Info>
          {meuID !== profile.idusuario ? (
            profile.followers.length === 0 ||
            profile.followers.find(element => element.idseguidor !== meuID) ? (
              <button type="button" onClick={handlerFollower}>
                Following
              </button>
            ) : (
              <button type="button" onClick={handlerUnFollower}>
                Deixar de Seguir
              </button>
            )
          ) : (
            ""
          )}
          <TagsContainer>
            <ul>
              {profile.techs.map((tech, key) => (
                <li key={key} title={tech}>
                  {tech}
                </li>
              ))}
            </ul>
          </TagsContainer>
        </UserInfo>
        <StatesContainer>
          <strong>
            <span>
              {profile.followers.length >= 1000
                ? `${profile.followers.length}K`
                : profile.followers.length}
            </span>
            <br />
            Seguidores
          </strong>

          <strong>
            <span>
              {profile.following.length >= 1000
                ? `${profile.following.length}K`
                : profile.following.length}
            </span>
            <br />
            Seguindo
          </strong>

          <strong>
            <span>100k</span>
            <br />
            Issues
          </strong>
        </StatesContainer>
      </ProfileContainer>
    </Container>
  );
}

export default Profile;
