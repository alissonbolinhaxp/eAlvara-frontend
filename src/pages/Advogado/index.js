import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Advogado() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [oab, setOab] = useState('');
  const [uf, setUf] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      nome,
      cpf,
      oab,
      uf,
      email,
      telefone
    };

    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/');
    } catch (error) {
      console.log(error);
      alert('Erro no cadastro, tente novamente.');
    }
  }

  

  return (
    <div className="register-container">
      <div className="container">
        <section>
          <img src={logoImg} alt="eAlvara" />
          <h1>Cadastro de Advogado</h1>
          <p>A Central Eletrônica de Alvarás é uma ferramenta da OAB/PE voltada exclusivamente para advogados com o intuito de evitar deslocamentos e o comparecimento presencial a uma agência para levantamento de alvarás, RPV’s e/ou precatórios. </p>
          <p>A tecnologia visa evitar o contato físico e exposição de advogados, partes e bancários, a riscos associados ao coronavírus (COVID-19).  </p>
          <p>A participação da OAB/PE consiste tão somente na orientação, recebimento e encaminhamento dos documentos às instituições financeiras responsáveis pelo pagamento. </p>
          <p>A <b>OAB/PE</b> não confere documentos e não tem ingerência no processo de pagamento, o que será feito pelo banco no menor tempo possível – o que pode não ser tão rápido em virtude das limitações impostas pelas leis vigentes e pela situação extraordinária atual. </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para o login
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input type="text"
            placeholder="Nome"
            value={nome} onChange={e => setNome(e.target.value)} />
          <input type="text"
            placeholder="CPF"
            value={cpf} onChange={e => setCpf(e.target.value)} />
          <div className="input-group">
            <input type="text"
              placeholder="Número da OAB"
              value={oab} onChange={e => setOab(e.target.value)} />
            <input type="text"
              placeholder="UF" style={{ width: 80 }}
              value={uf} onChange={e => setUf(e.target.value)} />
          </div>
          <input type="email"
            placeholder="E-mail"
            value={email} onChange={e => setEmail(e.target.value)} />
          <input type="text"
            placeholder="Telefone/Celular"
            value={telefone} onChange={e => setTelefone(e.target.value)} />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
