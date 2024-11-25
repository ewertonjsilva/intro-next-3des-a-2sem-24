'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

import { MdAttachMoney, MdBlock, MdCheck, MdEdit, MdDelete } from 'react-icons/md';

import styles from './index.module.css';

import ModalIngredientes from './modalIngredientes';

import { ingredientesMock } from '../../../mocks/dados';

export default function GerIngredientes() {
    const [ingredientes, setIngredientes] = useState(ingredientesMock);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filterType, setFilterType] = useState('nome');
    const [searchTerm, setSearchTerm] = useState('');
    const [titulo, setTitulo] = useState('');

    useEffect(() => {
        // listar ingredientes api
    }, []);

    const handleEditClick = (ingrediente = null) => {
        // console.log(produto);
        ingrediente ? setTitulo('Editar ingrediente') : setTitulo('Adicionar ingrediente');
        setProdutoSelecionado(ingrediente);
        setShowModal(true);
    };

    const handleDeleteClick = (prd_id) => {
        const novosProdutos = produtos.filter((produto) => produto.prd_id !== prd_id);
        setProdutos(novosProdutos);
    };

    const handleToggleDisponibilidade = (prd_id) => {
        const novosProdutos = produtos.map((produto) =>
            produto.prd_id === prd_id ? { ...produto, prd_disponivel: !produto.prd_disponivel } : produto
        );
        setProdutos(novosProdutos);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setProdutoSelecionado(null);
    };

    return (
        <div className={styles.container}>
            <h1>Lista de Ingredientes</h1>
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
                        <option value="usu_email">Em destaque</option>
                        <option value="usu_email">Disponíveis</option>
                        <option value="usu_email">Indisponíveis</option>
                    </select>
                </div>
                <button className={styles.addButton} onClick={() => handleEditClick()}>
                    Adicionar Novo Ingrediente
                </button>
            </div>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor adicional</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredientes.map((ingrediente) => (
                        <tr key={ingrediente.ing_id}>
                            <td>
                                <Image src={ingrediente.ing_img} alt={ingrediente.ing_nome} className={styles.ingredienteImg} />
                                {ingrediente.ing_nome}
                            </td>

                            <td>R$ {ingrediente.ing_custo_adicional.toFixed(2)}</td>
                            <td className={styles.acoes}>
                                <MdEdit
                                    onClick={() => handleEditClick(ingrediente)}
                                    className={styles.destaqueImg}
                                />
                                <MdDelete
                                    onClick={() => handleDeleteClick(ingrediente.ing_id)}
                                    className={styles.destaqueImg}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <ModalIngredientes produto={produtoSelecionado} onClose={handleModalClose} titulo={titulo} />
            )}
        </div>
    );
}
