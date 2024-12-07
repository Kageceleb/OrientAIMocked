import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PieChart from "../components/PieChart";
import "./styles.css";
import mockedAnswers from "../respostasAreasIA.json";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mockedAnswersPerArea = mockedAnswers.areas;

  const { areaData } = location.state || { areaData: [] };

  const handleRetakeTest = () => {
    navigate("/test");
  };

  return (
    <div className="container-gradient">
      <div className="result-container">
        <header className="result-header">
          <h1>Resultado do seu Teste</h1>
        </header>

        <PieChart data={areaData} />

        <div className="separator" />

        <div className="result-comments">
          <p className="result-first">
            Com base nas suas respostas, a área da Saúde parece ser a mais
            compatível com seu perfil. Esse campo oferece a oportunidade de
            impactar diretamente a vida das pessoas, exigindo dedicação, empatia
            e habilidades para lidar com situações desafiadoras. Profissões na
            Saúde são recompensadoras e podem satisfazer seu desejo de
            contribuir com o bem-estar dos outros.
          </p>

          <p className="result-second">
            As Ciências Jurídicas podem ser uma alternativa interessante,
            oferecendo um ambiente dinâmico e com potencial para aplicar suas
            habilidades analíticas e de comunicação. Este campo pode ser um
            caminho alternativo valioso, caso você deseje um setor estruturado e
            desafiador.
          </p>
        </div>

        <div className="separator" />
        <div className="result-buttons">
          <button className="btn btnBase" onClick={handleRetakeTest}>
            Fazer o teste novamente
          </button>
          <button className="btn btnSec">Compartilhar resultado</button>
          <button className="btn btnSec">Sair</button>
        </div>

        <footer className="test-footer">
          <p>AnimaHub © 2024 - OrientAI - Professor Flávio Treib</p>
        </footer>
      </div>
    </div>
  );
};

export default ResultsPage;
