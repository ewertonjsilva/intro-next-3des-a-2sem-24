'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line, RiAddLine, RiSubtractLine } from "react-icons/ri";

import styles from './index.module.css';

function CompCarrinho() {

  const [produtosCarrinho, setProdutosCarrinho] = useState([]);

  //   useEffect(() => {
  //     setProdutosCarrinho(location.state);
  //   }, []);

  //   // Use a função reduce para somar o valor total
  //   const valorTotal = produtos.reduce((total, produto) => {
  //     // Converta o campo prd_valor para um número (removendo o símbolo de moeda, se houver)
  //     const valor = parseFloat(produto.prd_valor.replace('$', '').replace(',', '.'));

  //     // Multiplique a quantidade pelo valor e adicione ao total
  //     return total + produto.quantidade * valor;
  //   }, 0);

  return (
    <div className={styles.centraliza}>
      <div className={styles.grid}>
        <div className={styles.carrTitulo}>Produto</div>
        <div className={styles.carrTitulo}>Quantidade</div>
        <div className={styles.carrTitulo}>Valor</div>
        <div className={styles.carrTitulo}>Total</div>
      </div>

      <div className={styles.grid}>
        <div className={styles.carrProduto}>
          <div className={styles.contImgCarrProd}>
            <Image
              src={'/temp/fritas.jpg'}
              alt={'fritas'}
              width={100}
              height={100}
              className={styles.imagemProduto}
            />
          </div>
          <span>Nome Produto</span>
          <RiDeleteBin6Line />
        </div>
        <div className={`${styles.carrProduto} ${styles.carrQtd}`}><RiSubtractLine />5<RiAddLine /></div>
        <div className={`${styles.carrProduto} ${styles.valores}`}>5,00</div>
        <div className={`${styles.carrProduto} ${styles.valores}`}>R$ 25,00</div>
      </div>

      <div className={styles.grid}>
        <div className={styles.carrProduto}>
          <div className={styles.contImgCarrProd}>
            <Image
              src={'/temp/sorvete.jpg'}
              alt={'fritas'}
              width={100}
              height={100}
              className={styles.imagemProduto}
            />
          </div>
          <span>Nome Produto</span>
          <RiDeleteBin6Line />
        </div>
        <div className={`${styles.carrProduto} ${styles.carrQtd}`}><RiSubtractLine />5<RiAddLine /></div>
        <div className={`${styles.carrProduto} ${styles.valores}`}>5,00</div>
        <div className={`${styles.carrProduto} ${styles.valores}`}>R$ 25,00</div>
      </div>

      <div className={styles.gridTotal}>
        <div></div>
        <div className={styles.total}>R$ 50,00</div>
      </div>
    </div>
  );
}

export default CompCarrinho;