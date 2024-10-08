'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line, RiAddLine, RiSubtractLine, RiChat1Line } from "react-icons/ri";

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
        produtosCarrinho.map((itemCarrinho) => (
          <Grid item={itemCarrinho} />
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

function Grid(itemCarrinho) {
  const item = itemCarrinho.item;
  const total = item.prd_valor * item.ppd_qtd;
  return (
    <div className={styles.grid}>
      <div>
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
        <div>
          <RiChat1Line />
          {
            item.ppd_obs.length > 0 ? <textarea>{item.ppd_obs}</textarea> : <span>Adicionar observação</span>
          }
        </div>
      </div>
      <div className={`${styles.carrProduto} ${styles.carrQtd}`}><RiSubtractLine />{item.ppd_qtd}<RiAddLine /></div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>{item.prd_valor}</div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>{total.toFixed(2)}</div>
    </div>
  );
}