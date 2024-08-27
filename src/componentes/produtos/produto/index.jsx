'use client'
import { useState } from 'react';
import Image from 'next/image';

import carr from '../../../../public/icones/carrinho.svg';

import styles from './index.module.css';

function Produto({ produto }) {

    const [qtd, setQtd] = useState(1);
    const [total, setTotal] = useState(produto.prd_valor);

    function handleAtlQtdVlr(nvVlr) {
        let totalTemp = 0;
        totalTemp = Number(nvVlr) * produto.prd_valor;
        setQtd(Number(nvVlr));
        setTotal(totalTemp.toFixed(2));
    }

    return (
        <div className={styles.container}>
            <div className={styles.containerItem}>
                <Image
                    className={styles.imagemProd}
                    src={produto.prd_img}
                    alt={"Imagem " + produto.prd_nome}
                />
            </div>
            <div className={styles.containerItem}>
                <div className={styles.titulo}>
                    <h1>{produto.prd_nome}</h1>
                    <Image src={produto.img_tp_prod} className={styles.icon} alt={produto.img_tp_prod} />
                </div>
                <span className={styles.descricao}>{produto.prd_descricao}</span>
                <span className={styles.valor}>{'R$ ' + produto.prd_valor}</span>
                <div className={styles.comprar}>
                    <span className={styles.spanQtd}>Quantidade</span>
                    <input
                        type="number" 
                        className={styles.input}
                        min={1}
                        onChange={nvVlr => handleAtlQtdVlr(nvVlr.target.value)}
                        value={qtd}
                    />
                    <span className={styles.spanTt}>Total R$ {total}</span>
                    <button className={styles.button} /*onClick={() => handleAddItem()}*/>                    
                        <p className={styles.lblComp}>Inserir no carrinho</p>
                        <Image className={styles.imgBtn} src={carr} alt="adicionar" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Produto;