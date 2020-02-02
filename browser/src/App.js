import React from "react";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

// Style
import GlobalStyle from "./styles/global";

// Services
import history from "./services/history";

// Rotes
import Routes from "./route";

function App() {
  return (
    <>
      <Router history={history}>
        <Routes />
        <ToastContainer autoClose={3000} />
        <GlobalStyle />
      </Router>
    </>
  );
}

export default App;
