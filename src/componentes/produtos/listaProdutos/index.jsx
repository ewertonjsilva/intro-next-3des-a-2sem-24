'use client'

import { useState, useEffect } from 'react';

import api from '../../../services/api';

import styles from './index.module.css';

import CardProduto from '../card';

// import { produtos } from '../../../mocks/dados';

export default function Produtos() {

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        listarProdutos();
    }, []);

    async function listarProdutos() {
        try {
            setLoading(true); // Início do carregamento
            const response = await api.get('/produtos/home');

            if (response.data.sucesso == true) {
                const prodApi = response.data.dados;
                setProdutos(prodApi);
            } else {
                alert('Erro: ' + error.response.data.mensagem + '\n' + error.response.data.dados)
            }

        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        } finally {
            setLoading(false); // Fim do carregamento
        }
    }

    return (
        <div className={styles.produtos}>

            {loading ? ( // Se estiver carregando, mostrar o loading
                <div className={styles.loading}>Carregando...</div>
            ) : produtos.length > 0 ? (
                produtos.map((prd) => (
                    <CardProduto produto={prd} key={prd.prd_id} />
                ))
            ) : (
                <h1>Não foi possível carregar os itens</h1>
            )}

        </div>
    );
}