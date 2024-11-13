'use client'
import React, { useState, useEffect } from 'react';
import styles from './index.module.css';

import { MdDelete } from "react-icons/md";

// import { useNavigate } from 'react-router-dom'; // Se estiver usando React Router

function Mesas() {
  const [mesas, setMesas] = useState([
    {
      "mes_id": 1,
      "mes_nome": "1",
      "mes_status": 1,
      "mes_lugares": 4,
      "ped_id": null
    },
    {
      "mes_id": 2,
      "mes_nome": "2",
      "mes_status": 0,
      "mes_lugares": 2,
      "ped_id": null
    },
    {
      "mes_id": 3,
      "mes_nome": "3",
      "mes_status": 0,
      "mes_lugares": 2,
      "ped_id": null
    },
    {
      "mes_id": 4,
      "mes_nome": "4",
      "mes_status": 2,
      "mes_lugares": 4,
      "ped_id": null
    },
    {
      "mes_id": 5,
      "mes_nome": "5",
      "mes_status": 2,
      "mes_lugares": 4,
      "ped_id": 5
    }
  ]);
  // const navigate = useNavigate();

  useEffect(() => {
    // // Função para buscar mesas da API
    // async function fetchMesas() {
    //   const response = await fetch('http://suaapi.com/mesas'); // URL da API
    //   const data = await response.json();
    //   setMesas(data);
    // }
    // fetchMesas();
  }, []);

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

  // const alterarLugares = (id, quantidade) => {
  //   setMesas((mesas) =>
  //     mesas.map((mesa) =>
  //       mesa.mes_id === id
  //         ? { ...mesa, mes_lugares: Math.max(1, mesa.mes_lugares + quantidade) }
  //         : mesa
  //     )
  //   );
  // };

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
            <button /*onClick={(e) => { e.stopPropagation(); alterarLugares(mesa.mes_id, -1); }}*/>-</button>
            <button /*onClick={(e) => { e.stopPropagation(); alterarLugares(mesa.mes_id, 1); }}*/>+</button>
          </div>
        </div>
      ))}
      <button className={styles.addButton}>
        +
      </button>
    </div>
  );
}

export default Mesas;
