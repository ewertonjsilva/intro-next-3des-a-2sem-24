'use client'

import { useState, useEffect } from 'react';

import api from '../../../services/api';

import styles from './index.module.css';

import CardProduto from '../card';

// import { produtos } from '../../../mocks/dados';

export default function ProdutosHome() {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        listarProdutos();
    }, []);

    async function listarProdutos() {
        try {

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
        }
    }

    return (
        <div className={styles.produtos}>
            {
                produtos.map(
                    prd => {
                        return <CardProduto produto={prd} key={prd.prd_id} />
                    }
                )
            }
        </div>
    );
}