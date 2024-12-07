import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Função para atualizar o campo de e-mail
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Função para enviar a solicitação de recuperação de senha
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recuperação de senha solicitada para o e-mail:', email);
    // Fazer integração com a API (uma nova call) para recuperação
    alert('Se o e-mail estiver cadastrado, enviaremos um link de recuperação.');
    navigate('/login');
  };

  return (
    <div className="container-gradient">
      <h1>Recuperar Senha</h1>
      <form onSubmit={handleSubmit} className="white-card">
        <input
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={handleChange}
          required
        />
        <button className='btn btnBase' type="submit">Enviar</button>
        <button className='btn btnSec' type="button" onClick={() => navigate('/login')}>
          Voltar
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
