import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import './styles.css';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container-gradient">
      <header className="welcome-header">
        <Logo/>
        <h1>Bem-vindo</h1>
        <p>Descubra suas áreas de interesse e planeje seu futuro.</p>
      </header>

      <div className="welcome-buttons">
        <button className="btnBase btn" onClick={() => navigate('/signup')}>
          Sou novo aqui
        </button>
        <button className="btnSec btn" onClick={() => navigate('/login')}>
          Já tenho cadastro
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
