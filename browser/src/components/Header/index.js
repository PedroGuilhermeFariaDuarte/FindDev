import React from "react";

// Styles
import { Container, GroupButton } from "./styles";

function Header({ history }) {
  function handlerToPage() {
    const meuID = sessionStorage.getItem("@findev/session");
    history.push("/profile", { id: meuID });
  }

  function handlerSignOut() {
    sessionStorage.removeItem("@findev/session");
    history.push("/");
  }

  return (
    <Container>
      <GroupButton id="groupButton_header">
        <button type="button" onClick={handlerSignOut}>
          Sair
        </button>
        <button type="button" onClick={handlerToPage}>
          Meu perfil
        </button>
      </GroupButton>
    </Container>
  );
}

export default Header;
