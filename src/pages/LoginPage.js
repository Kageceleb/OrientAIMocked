import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import './styles.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
  
    try {
      const response = await fetch('http://localhost:3000/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Falha ao realizar login');
      }
  
      const result = await response.json();
  
      const userId = result.user?.id;
      if (response.ok && userId) {
        navigate('/test', { state: { userId } });
      } else {
        setError('Email ou senha inválidos');
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setError('O login falhou. Por favor, verifique suas informações.');
    }
  };
  

  return (
    <div className="container-gradient">
      <Logo />

      <form onSubmit={handleSubmit} className="white-card">
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="senha"
          placeholder="Senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        <button className="btnBase btn" type="submit">Entrar</button>
        <button className="btnSec btn" type="button" onClick={() => navigate('/')}>
          Voltar
        </button>

        {error && <p className="error-message">{error}</p>}

        <div className="separator" />

        <p className="forgot-password">
          <span onClick={() => navigate('/forgot-password')}>
            Esqueci minha senha
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
