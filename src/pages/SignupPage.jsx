import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "../components/Dropdown.tsx";
import LoadingCompass from "../components/LoadingCompass";
import "./styles.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <div className="container-gradient">
        <div className="signup-container">
          <LoadingCompass />
        </div>
      </div>
    );
  }

  return (
    <div className="container-gradient">
      <h1>Cadastro</h1>
      <form className="white-card">
        <div className="signup-container">
          <div className="inputGroup signup-contact">
            <h2>Informações de Contato</h2>
            <input
              type="text"
              name="nome"
              placeholder="Thalia Berguemayer da Silva"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="thalia@gmail.com"
              required
            />
            <input type="tel" placeholder="(51) 912.345.678" required />
          </div>

          <div className="inputGroup signup-password">
            <h2>Informações de Segurança</h2>
            <input type="password" name="senha" placeholder="Senha" required />
            <input
              type="password"
              name="confirmaSenha"
              placeholder="Confirme a Senha"
              required
            />
          </div>

          <div className="separator" />

          <div className="inputGroup signup-buttons">
            <button
              type="submit"
              className="btn btnBase"
              onClick={() => navigate("/test")}
            >
              Finalizar Cadastro
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
