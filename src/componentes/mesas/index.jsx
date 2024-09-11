import React, { useState, useEffect } from 'react';
import './Mesas.css';
import { useNavigate } from 'react-router-dom'; // Se estiver usando React Router

function Mesas() {
  const [mesas, setMesas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Função para buscar mesas da API
    async function fetchMesas() {
      const response = await fetch('http://suaapi.com/mesas'); // URL da API
      const data = await response.json();
      setMesas(data);
    }
    fetchMesas();
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

  const alterarLugares = (id, quantidade) => {
    setMesas((mesas) =>
      mesas.map((mesa) =>
        mesa.mes_id === id
          ? { ...mesa, mes_lugares: Math.max(1, mesa.mes_lugares + quantidade) }
          : mesa
      )
    );
  };

  const handleCardClick = (mesa) => {
    if (mesa.mes_status === 2) {
      // Redirecionar para a tela de pedido da mesa ocupada
      navigate(`/pedido/${mesa.mes_id}`);
    } else {
      // Redirecionar para a tela de reserva ou pedido
      navigate(`/mesa/${mesa.mes_id}`);
    }
  };

  return (
    <div className="mesas-container">
      {mesas.map((mesa) => (
        <div
          key={mesa.mes_id}
          className="mesa-card"
          style={{ borderColor: getStatusColor(mesa.mes_status) }}
          onClick={() => handleCardClick(mesa)}
        >
          <h2>Mesa {mesa.mes_nome}</h2>
          <p>Status: {mesa.mes_status === 0 ? 'Livre' : mesa.mes_status === 1 ? 'Reservada' : mesa.mes_status === 2 ? 'Ocupada' : 'Inativa'}</p>
          <p>Lugares: {mesa.mes_lugares}</p>
          <div className="mesa-lugares-control">
            <button onClick={(e) => { e.stopPropagation(); alterarLugares(mesa.mes_id, -1); }}>-</button>
            <button onClick={(e) => { e.stopPropagation(); alterarLugares(mesa.mes_id, 1); }}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Mesas;
