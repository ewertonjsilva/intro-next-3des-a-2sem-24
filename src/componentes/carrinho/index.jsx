'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line, RiAddLine, RiSubtractLine } from "react-icons/ri";

import styles from './index.module.css';

import { carrinho } from '../../mocks/dados';

function CompCarrinho() {

  const [produtosCarrinho, setProdutosCarrinho] = useState(carrinho);
  console.log(produtosCarrinho);


  // Use a função reduce para somar o valor total
  const valorTotal = produtosCarrinho.reduce((total, produto) => {
    // Converta o campo prd_valor para um número (removendo o símbolo de moeda, se houver)
    const valor = parseFloat(produto.prd_valor.replace('$', '').replace(',', '.'));

    // Multiplique a quantidade pelo valor e adicione ao total
    return total + produto.ppd_qtd * valor;
  }, 0);

  return (

    <div className={styles.centraliza}>
      <div className={styles.grid}>
        <div className={styles.carrTitulo}>Produto</div>
        <div className={styles.carrTitulo}>Quantidade</div>
        <div className={styles.carrTitulo}>Valor</div>
        <div className={styles.carrTitulo}>Total</div>
      </div>

      {
        produtosCarrinho.map((item) => (
          <Grid item={item} />
        ))
      }

      <div className={styles.gridTotal}>
        <div></div>
        <div className={styles.total}>R$ {valorTotal}</div>
      </div>
    </div>

  );
}

export default CompCarrinho;

function Grid(item) {
  console.log(item);
  return (
    <div className={styles.grid}>
      <div className={styles.carrProduto}>
        <div className={styles.contImgCarrProd}>
          <Image
            src={item.prd_img}
            alt={item.prd_img}
            width={100}
            height={100}
            className={styles.imagemProduto}
          />
        </div>
        <span>{item.prd_nome}</span>
        <RiDeleteBin6Line />
      </div>
      <div className={`${styles.carrProduto} ${styles.carrQtd}`}><RiSubtractLine />5<RiAddLine /></div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>{item.prd_valor}</div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>R$ 25,00</div>
    </div>
  );
}