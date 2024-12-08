import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingCompass from "../components/LoadingCompass";
import Logo from "../components/Logo";
import ProgressBar from "../components/ProgressBar";
import SliderWithEmoticons from "../components/SliderWithEmoticons";
import "./styles.css";
import mockedQuestions from "../perguntasMock.json";

const TestPage = () => {
  const navigate = useNavigate();
  const location = useLocation(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const { userId } = 1;
  const questions = mockedQuestions.perguntas;

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
        { area: "Saúde", percentage: Math.round(saudePerCent), id: 0},
        { area: "Ciências Jurídicas", percentage: Math.round(juridicaPerCent) , id: 1},
        { area: "TI e Computação", percentage: Math.round(tIPerCent) , id: 2},
        { area: "Gestão e Negócios", percentage: Math.round(gestNegPerCent) , id: 3},
        { area: "Humanas", percentage: Math.round(humanasPerCent) , id: 4},
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
          <div>
            <Logo />
            <h2>FADERGS</h2>
          </div>
      <div className="test-container">
        <header className="test-header">
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
          <p>AnimaHub © 2024 - Squad OrientAI</p>
        </footer>
      </div>
    </div>
  );
};

export default TestPage;
