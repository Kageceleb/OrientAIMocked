import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingCompass from "../components/LoadingCompass";
import Logo from "../components/Logo";
import ProgressBar from "../components/ProgressBar";
import SliderWithEmoticons from "../components/SliderWithEmoticons";
import "./styles.css";

const TestPage = () => {
  // const [areaData, setAreaData] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(1);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { userId } = 1;

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Erro ao buscar perguntas:", error));
  }, []);

  useEffect(() => {
    const updatedAnswers = [...answers];
    if (updatedAnswers[currentQuestionIndex] == null) {
      updatedAnswers[currentQuestionIndex] = 3;
      setAnswers(updatedAnswers);
    }
  }, [currentQuestionIndex]);

  // Função para avançar para a próxima pergunta
  const handleNext = () => {
    const updatedAnswers = [...answers];

    if (updatedAnswers[currentQuestionIndex] == null) {
      updatedAnswers[currentQuestionIndex] = 3;
      setAnswers(updatedAnswers);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmit();
    }
  };

  // Função para voltar para a pergunta anterior
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Função para salvar a resposta
  const handleSaveAnswer = (answer) => {
    const updatedAnswers = [...answers];
    const scaleValue = Math.max(Math.round(answer / 20), 1);
    updatedAnswers[currentQuestionIndex] = scaleValue;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = async () => {
    setLoading(true);
    var areaSaude = 0;
    var areaJuridica = 0;
    var areaTI = 0;
    var areaGestaNeg = 0;
    var areaHumanas = 0;

    try {
      for (let i = 0; i < answers.length; i++) {
        const payload = {
          idCandidato: userId,
          idPergunta: i + 1, //questions[i]?.id,
          idEscala: answers[i],
        };

        const response = await fetch("http://localhost:3000/answer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Erro ao enviar resposta da pergunta ${i + 1}`);
        }

        switch (questions[i]?.idArea) {
          case 1:
            areaSaude = areaSaude + answers[i] * questions[i]?.peso;
            break;

          case 2:
            areaJuridica = areaJuridica + answers[i] * questions[i]?.peso;
            break;

          case 3:
            areaTI = areaTI + answers[i] * questions[i]?.peso;
            break;

          case 4:
            areaGestaNeg = areaGestaNeg + answers[i] * questions[i]?.peso;
            break;

          case 5:
            areaHumanas = areaHumanas + answers[i] * questions[i]?.peso;
            break;

          default:
            break;
        }
      }

      var hundred =
        areaSaude + areaJuridica + areaTI + areaGestaNeg + areaHumanas;
      var saudePerCent = (areaSaude / hundred) * 100;
      var juridicaPerCent = (areaJuridica / hundred) * 100;
      var tIPerCent = (areaTI / hundred) * 100;
      var gestNegPerCent = (areaGestaNeg / hundred) * 100;
      var humanasPerCent = (areaHumanas / hundred) * 100;

      const areaData = [
        { area: "Saúde", percentage: Math.round(saudePerCent) },
        { area: "Ciências Jurídicas", percentage: Math.round(juridicaPerCent) },
        { area: "TI e Computação", percentage: Math.round(tIPerCent) },
        { area: "Gestão e Negócios", percentage: Math.round(gestNegPerCent) },
        { area: "Humanas", percentage: Math.round(humanasPerCent) },
      ];

      navigate("/results", { state: { areaData } });
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Houve um problema ao enviar as respostas.");
    }
  };
  if (loading) {
    return (
      <div className="container-gradient">
        <div className="test-container">
          <LoadingCompass />
        </div>
      </div>
    );
  }

  return (
    <div className="container-gradient">
      <div className="test-container">
        <header className="test-header">
          <div className="test-logo">
            <Logo />
            <h2>FADERGS</h2>
          </div>
          <p>
            Avalie as situações abaixo para descobrir sua área de interesse!
          </p>
        </header>

        <div className="progress-bar-container">
          <ProgressBar
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
        </div>

        <div className="separator" />

        <div className="question-container">
          <p>{questions[currentQuestionIndex]?.descricao}</p>

          <div className="separator" />

          <SliderWithEmoticons
            onSave={handleSaveAnswer}
            initialValue={
              answers[currentQuestionIndex] != null
                ? answers[currentQuestionIndex] * 20
                : 50
            }
          />
        </div>

        <div className="separator" />

        <div className="test-buttons">
          <button
            className="btnTest btnSec"
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Voltar
          </button>
          <button
            className="btnTest btnBase"
            onClick={handleNext}
            disabled={
              currentQuestionIndex === questions.length &&
              answers.length < questions.length
            }
          >
            {currentQuestionIndex === questions.length - 1
              ? "Finalizar"
              : "Próxima"}
          </button>
        </div>

        {/* Rodapé */}
        <footer className="test-footer">
          <p>AnimaHub © 2024 - OrientAI - Professor Flávio Treib</p>
        </footer>
      </div>
    </div>
  );
};

export default TestPage;