import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Reclamacao() {
  const [dataenvio, setDataenvio] = useState('');
  const [numero, setNumero] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  const eAlvaraAdvogadoToken = localStorage.getItem('eAlvaraAdvogadoToken');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      dataenvio,
      numero,
      cpfcnpj: cpf,
      email
    };

    try {
      await api.post('reclamacao', data, {
        headers: {
          Authorization: eAlvaraAdvogadoToken
        }
      });
      alert('Reclamação cadastrada com sucesso!');
      history.push('/profile');
    } catch (error) {
      console.log(error);
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="container">
        <section>
          <img src={logoImg} alt="eAlvara" />
          <h1>Cadastrar Reclamação</h1>
          <p>Usar essa opção caso já tenha enviado o seu documento há mais de 5 (cinco) dias úteis e o valor não tiver sido creditado e nem recebido um e-mail com resposta.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input type="text"
            placeholder="Data do Envio"
            value={dataenvio} onChange={e => setDataenvio(e.target.value)} />

          <input type="text"
            placeholder="Número do alvará/RPV/Precatório"
            value={numero} onChange={e => setNumero(e.target.value)} />
          <input type="text"
            placeholder="CPF/CNPJ do beneficiário"
            value={cpf} onChange={e => setCpf(e.target.value)} />
          <input type="email"
            placeholder="E-mail do remetente"
            value={email} onChange={e => setEmail(e.target.value)} />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
