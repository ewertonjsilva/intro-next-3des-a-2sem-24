'use client'
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

import { MdDelete } from "react-icons/md";

import api from '@/services/api';
import ModalMesas from './modalMesas';

// import { useNavigate } from 'react-router-dom'; // Se estiver usando React Router

function Mesas() {

  const [showModal, setShowModal] = useState(false);

  const [mesas, setMesas] = useState([]);
  // const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 0:
        return 'green';    // Livre
      case 1:
        return 'yellow';   // Reservada
      case 2:
        return 'red';      // Ocupada
      case 3:
        return 'gray';     // Inativa
      default:
        return 'white';
    }
  };

  useEffect(() => {
    handleListaMesas();
  }, [showModal]);

  async function handleListaMesas() {
    try {
      const response = await api.get('/mesas');
      const confirmaListagem = response.data.sucesso;
      if (confirmaListagem) {
        setMesas(response.data.dados);
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.mensagem + '\n' + error.response.data.dados);
      } else {
        alert('Erro no front-end' + '\n' + error);
      }
    }
  }

  const handleModalClose = () => {
    setShowModal(false);
  };

  async function alterarLugares(id, quantidade) {
    // Calcule a nova lista de mesas fora do callback de setMesas
    let mesaAtualizada;
    const novasMesas = mesas.map((mesa) => {
      if (mesa.mes_id === id) {
        mesaAtualizada = { ...mesa, mes_lugares: Math.max(1, mesa.mes_lugares + quantidade) };
        return mesaAtualizada;
      }
      return mesa;
    });

    // Atualize o estado
    setMesas(novasMesas);

    // Certifique-se de que `mesaAtualizada` foi definido
    if (mesaAtualizada) {
      try {
        // Faça a chamada assíncrona com os dados atualizados
        const response = await api.patch(`/mesas/${id}`, mesaAtualizada);
        console.log("Atualização bem-sucedida:", response.data);
      } catch (error) {
        if (error.response) {
          alert(error.response.data.mensagem + '\n' + error.response.data.dados);
        } else {
          alert('Erro no front-end' + '\n' + error);
        }
      }
    }
  };

  // const handleCardClick = (mesa) => {
  //   if (mesa.mes_status === 2) {
  //     // Redirecionar para a tela de pedido da mesa ocupada
  //     navigate(`/pedido/${mesa.mes_id}`);
  //   } else {
  //     // Redirecionar para a tela de reserva ou pedido
  //     navigate(`/mesa/${mesa.mes_id}`);
  //   }
  // };

  return (
    <div className={styles.mesasContainer}>
      {mesas.map((mesa) => (
        <div
          key={mesa.mes_id}
          className={styles.mesaCard}
          style={{ borderColor: getStatusColor(mesa.mes_status) }}
        // onClick={() => handleCardClick(mesa)}
        >
          <div className={styles.constainerDelete}>
            <MdDelete className={styles.iconDelete} />
          </div>
          <h2>Mesa {mesa.mes_nome}</h2>
          <p>Status: {mesa.mes_status === 0 ? 'Livre' : mesa.mes_status === 1 ? 'Reservada' : mesa.mes_status === 2 ? 'Ocupada' : 'Inativa'}</p>
          <p>Lugares: {mesa.mes_lugares}</p>
          <div className={styles.mesaLugaresControl}>
            <button onClick={(e) => { e.stopPropagation(); alterarLugares(mesa.mes_id, -1, mesa); }}>-</button>
            <button onClick={(e) => { e.stopPropagation(); alterarLugares(mesa.mes_id, 1, mesa); }}>+</button>
          </div>
        </div>
      ))}
      <button className={styles.addButton} onClick={() => setShowModal(true)}>
        +
      </button>

      {showModal && (
        <ModalMesas onClose={handleModalClose} />
      )}

    </div>
  );
}

export default Mesas;
