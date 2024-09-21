'use client';

import { useState } from 'react';

import { MdAttachMoney, MdBlock, MdCheck } from 'react-icons/md';

import styles from './index.module.css';

const produtosMock = [
    {
        prd_id: 1,
        prd_nome: 'Produto 1',
        prd_valor: 19.99,
        prd_disponivel: true,
        prd_destaque: true,
        prd_img: '/temp/hamburger-bacon.jpg',
        prd_img_destaque: '/temp/destaque.png',
        prd_descricao: 'Descrição do Produto 1',
        ptp_id: 1,
    },
    {
        prd_id: 2,
        prd_nome: 'Produto 2',
        prd_valor: 9.99,
        prd_disponivel: true,
        prd_destaque: false,
        prd_img: '/temp/macarrao.jpg',
        prd_img_destaque: '/temp/destaque.png',
        prd_descricao: 'Descrição do Produto 2',
        ptp_id: 2,
    },
    {
        prd_id: 3,
        prd_nome: 'Produto 3',
        prd_valor: 9.99,
        prd_disponivel: false,
        prd_destaque: false,
        prd_img: '/temp/sorvete.jpg',
        prd_img_destaque: '/temp/destaque.png',
        prd_descricao: 'Descrição do Produto 3',
        ptp_id: 2,
    },
    // Adicione mais produtos para teste
];

export default function GerProdutos() {
    const [produtos, setProdutos] = useState(produtosMock);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [filterType, setFilterType] = useState('nome');
    const [searchTerm, setSearchTerm] = useState('');

    const handleEditClick = (produto) => {
        setProdutoSelecionado(produto);
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
            <h1>Lista de Produtos</h1>
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
                        <th>Imagem</th>
                        <th>Valor</th>
                        <th>Destaque</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.prd_id}>
                            <td>{produto.prd_nome}</td>
                            <td>
                                <img src={produto.prd_img} alt={produto.prd_nome} className={styles.produtoImg} />
                            </td>
                            <td>{produto.prd_valor.toFixed(2)}</td>
                            <td>
                                {produto.prd_destaque ? (
                                    <MdAttachMoney className={styles.destaqueImg} color='green' />
                                ) : (
                                    <MdAttachMoney className={styles.destaqueImg} />
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEditClick(produto)}>Editar</button>
                                <button onClick={() => handleToggleDisponibilidade(produto.prd_id)}>
                                    {produto.prd_disponivel ? <MdCheck /> : <MdBlock />}
                                </button>
                                <button onClick={() => handleDeleteClick(produto.prd_id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <EditModal produto={produtoSelecionado} onClose={handleModalClose} />
            )}
        </div>
    );
}

function EditModal({ produto, onClose }) {
    const [prd_nome, setPrdNome] = useState(produto.prd_nome);
    const [prd_valor, setPrdValor] = useState(produto.prd_valor);
    const [prd_unidade, setPrdUnidade] = useState(''); // Exemplo para o campo prd_unidade
    const [prd_disponivel, setPrdDisponivel] = useState(produto.prd_disponivel);
    const [prd_img, setPrdImg] = useState(produto.prd_img);
    const [prd_destaque, setPrdDestaque] = useState(produto.prd_destaque);
    const [prd_descricao, setPrdDescricao] = useState(produto.prd_descricao);

    const handleSave = () => {
        // Lógica de salvar o produto
        console.log('Produto atualizado', {
            prd_nome,
            prd_valor,
            prd_unidade,
            prd_disponivel,
            prd_img,
            prd_destaque,
            prd_descricao,
        });
        onClose();
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Editar Produto</h2>
                <label>
                    Nome:
                    <input type="text" value={prd_nome} onChange={(e) => setPrdNome(e.target.value)} />
                </label>
                <label>
                    Valor:
                    <input type="number" value={prd_valor} onChange={(e) => setPrdValor(e.target.value)} />
                </label>
                <label>
                    Unidade:
                    <input type="text" value={prd_unidade} onChange={(e) => setPrdUnidade(e.target.value)} />
                </label>
                <label>
                    Descrição:
                    <textarea value={prd_descricao} onChange={(e) => setPrdDescricao(e.target.value)} />
                </label>
                <label>
                    Disponível:
                    <input type="checkbox" checked={prd_disponivel} onChange={() => setPrdDisponivel(!prd_disponivel)} />
                </label>
                <label>
                    Destaque:
                    <input type="checkbox" checked={prd_destaque} onChange={() => setPrdDestaque(!prd_destaque)} />
                </label>
                <button onClick={handleSave}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}
