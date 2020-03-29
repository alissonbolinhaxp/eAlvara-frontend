import React, { useState, useEffect } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile() {
  const [alvaras, setAlvaras] = useState([]);
  const [reclamacoes, setReclamacoes] = useState([]);

  const history = useHistory();

  const eAlvaraAdvogadoToken = localStorage.getItem('eAlvaraAdvogadoToken');
  const eAlvaraAdvogadoNome = localStorage.getItem('eAlvaraAdvogadoNome');

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: eAlvaraAdvogadoToken
      }
    }).then(response => {
      setAlvaras(response.data.listAlvara);
      setReclamacoes(response.data.listaReclamacao);

    });
  }, [eAlvaraAdvogadoToken]);

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="eAlvara" />
        <span>Bem vinda, {eAlvaraAdvogadoNome}</span>

        <button type="button" onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <br></br>
      <br></br>
      <div>
        <p>A OAB/PE não confere documentos e não tem ingerência no processo de pagamento, o que será feito pelo banco no menor tempo possível – o que pode não ser tão rápido em virtude das limitações impostas pelas leis vigentes e pela situação extraordinária atual. </p>
        <p>Caso já tenha enviado o seu documento há mais de 5 (cinco) dias úteis e o valor não tiver sido creditado, nem recebido um e-mail com resposta, clique no botão RECLAMAR abaixo.</p>
        <div>
          <Link className="button" to="/reclamacao">Reclamar</Link>
          <Link className="button" to="/alvara">Cadastrar novo Alvará</Link>
        </div>
      </div>

      <h1>Alvarás Cadastrados</h1>
      <ul>
        {alvaras.map(alvara => (
          <li key={alvara.id}>
            <strong>Banco</strong>
            <p>{alvara.banco}</p>
            <strong>NPU</strong>
            <p>{alvara.npu}</p>
            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(alvara.valor)}</p>
          </li>
        ))}
      </ul>

      <h1>Reclamações Cadastradas</h1>
      <ul>
        {reclamacoes.map(reclamacao => (
          <li key={reclamacao.id}>
            <strong>Data do envio</strong>
            <p>{reclamacao.dataenvio}</p>
            <strong>Número do alvará/RPV/Precatório</strong>
            <p>{reclamacao.numero}</p>
            <strong>CPF/CNPJ do beneficiário</strong>
            <p>{reclamacao.cpfcnpj}</p>
            <strong>E-mail do remetente</strong>
            <p>{reclamacao.email}</p>
            <p>Cadastrado em {reclamacao.created_at}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}
