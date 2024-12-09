import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PieChart from "../components/PieChart";
import "./styles.css";
import Logo from "../components/Logo";
import mockedAnswers from "../respostasAreasIA.json";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const mockedAnswersPerArea = mockedAnswers.areas;
  const { areaData } = location.state || { areaData: [] };

  var primaryArea = setPArea();
  var secondaryArea = setSArea();

  var cursos = setCursos();

  const handleRetakeTest = () => {
    navigate("/test");
  };

  //  function setAreas(){

  //     areaData.sort((a, b) => b.percentage -= a.percentage);

  //     primaryArea = areaData[0];
  //     secondaryArea = areaData[1];

  //     console.log(primaryArea);
  //     console.log(secondaryArea);
  //   }
  //   setAreas();

  function setPArea() {
    areaData.sort((a, b) => b.percentage - a.percentage);

    var parea = areaData[0].id;

    var pareaDescricao = mockedAnswersPerArea[parea].comentarios.primaria;

    return pareaDescricao;
  }

  function setSArea() {
    areaData.sort((a, b) => b.percentage - a.percentage);

    var sarea = areaData[1].id;

    var sareaDescricao = mockedAnswersPerArea[sarea].comentarios.secundaria;

    return sareaDescricao;
  }

  function setCursos() {
    areaData.sort((a, b) => b.percentage - a.percentage);

    var parea = areaData[0].id;

    var pcursos = mockedAnswersPerArea[parea].comentarios.cursos;

    return pcursos;
  }

  return (
    <div className="container-gradient-result">
      <Logo />
      <div className="result-container">
        <header className="result-header">
          <h1>Resultado do seu Teste</h1>
        </header>

        <PieChart data={areaData} />

        <div className="separator" />

        <div className="result-comments">
          <div className="white-card-result">
            <p className="result-first">{primaryArea}</p>
          </div>

          {/* <div className="white-card-result">
            <p className="result-second">
              {secondaryArea}
            </p>
          </div> */}
        </div>

        <div className="separator" />

        <h3>Cursos sugeridos</h3>

        <div className="result-comments">
          {cursos.map((c) => {
            return (
              <div className="white-card-result">
                <h3>{c.titulo}</h3>
                <p className="result-first">{c.descricao}</p>
                <a href="https://landing.fadergs.edu.br/curso/biomedicina-bacharelado">
                  Conheça o curso
                </a>
              </div>
            );
          })}
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
