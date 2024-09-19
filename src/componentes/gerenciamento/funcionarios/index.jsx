'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './index.module.css';
import UserModal from './modalFunc';

const GerFuncionarios = () => {
  const [users, setUsers] = useState([
    {
        "usu_id": 2,
        "usu_nome": "Mateus Vitor Lima",
        "usu_email": "mateusvitorlima@abcturismo.com.br",
        "usu_dt_nasc": "1998-11-06",
        "usu_senha": "123456",
        "usu_tipo": 1,
        "usu_cpf": "276.046.238-24",
        "usu_ativo": 1
    },
    {
        "usu_id": 3,
        "usu_nome": "Rosângela Marina Nicole Aragão",
        "usu_email": "rosangela_marina_aragao@vivo.com.br",
        "usu_dt_nasc": "1993-05-10",
        "usu_senha": "123456",
        "usu_tipo": 1,
        "usu_cpf": "536.272.158-50",
        "usu_ativo": 1
    },
    {
        "usu_id": 9,
        "usu_nome": "Percivaldo Pereira",
        "usu_email": "pp@email.com",
        "usu_dt_nasc": "1972-10-02",
        "usu_senha": "123",
        "usu_tipo": 1,
        "usu_cpf": "388.855.190-08",
        "usu_ativo": 1
    },
    {
        "usu_id": 11,
        "usu_nome": "Reginaldo Arnaldo",
        "usu_email": "rega@email.com",
        "usu_dt_nasc": "1975-01-11",
        "usu_senha": "123",
        "usu_tipo": 1,
        "usu_cpf": "470.598.510-97",
        "usu_ativo": 1
    },
    {
        "usu_id": 12,
        "usu_nome": "João Silva",
        "usu_email": "joao@example.com",
        "usu_dt_nasc": "1990-01-01",
        "usu_senha": "123456",
        "usu_tipo": 1,
        "usu_cpf": "001.234.567-89",
        "usu_ativo": 1
    }
  ]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filterType, setFilterType] = useState('nome');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get('/api/usuarios');
//         setUsers(response.data);
//         setFilteredUsers(response.data);
//       } catch (error) {
//         console.error('Erro ao buscar usuários:', error);
//       }
//     };
//     fetchUsers();
//   }, []);

//   useEffect(() => {
//     setFilteredUsers(
//       users.filter((user) =>
//         user[filterType].toString().toLowerCase().includes(searchTerm.toLowerCase())
//       )
//     );
//   }, [searchTerm, filterType, users]);

  const toggleUserStatus = (id) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.usu_id === id ? { ...user, usu_ativo: !user.usu_ativo } : user
      )
    );
  };

  const handleEditUser = (user = null) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.usu_id === selectedUser.usu_id ? { ...user, ...userData } : user
        )
      );
    } else {
      setUsers([...users, { ...userData, usu_id: users.length + 1 }]);
    }
    closeModal();
  };

  return (
    <div className={styles.container}>
      <h1>Lista de Usuários do Sistema</h1>
      <div className={styles.header}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder={`Pesquisar por ${filterType}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="usu_nome">Nome</option>
            <option value="usu_email">Email</option>
            <option value="usu_cpf">CPF</option>
          </select>
        </div>
        <button className={styles.addButton} onClick={() => handleEditUser()}>
          Adicionar Novo Funcionário
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.usu_id}>
              <td>{user.usu_nome}</td>
              <td>{user.usu_email}</td>
              <td>{user.usu_ativo ? 'Ativo' : 'Inativo'}</td>
              <td className={styles.actions}>
                <button onClick={() => toggleUserStatus(user.usu_id)}>
                  {user.usu_ativo ? 'Inativar' : 'Ativar'}
                </button>
                <button onClick={() => handleEditUser(user)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserModal
          user={selectedUser}
          onSave={handleSaveUser}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GerFuncionarios;
