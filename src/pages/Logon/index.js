import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [cpf, setCpf] = useState('');
  const [oab, setOab] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      cpf,
      oab
    };

    try {
      const response = await api.post('sessions', data);

      localStorage.setItem('eAlvaraAdvogadoToken', response.data.id);
      localStorage.setItem('eAlvaraAdvogadoNome', response.data.nome);

      history.push('/profile');

    } catch (error) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="eAlvara" />
        <form onSubmit={handleLogin}>
          <h1>Preencha abaixo, os seus dados</h1>
          <input type="text"
            placeholder="CPF"
            value={cpf} onChange={e => setCpf(e.target.value)} />
          <input type="text"
            placeholder="Número da OAB"
            value={oab} onChange={e => setOab(e.target.value)} />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div >
  );
}
