'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line, RiAddLine, RiSubtractLine, RiChat1Line } from "react-icons/ri";

import styles from './index.module.css';

import { carrinho } from '../../mocks/dados';

function CompCarrinho() {

  const [produtosCarrinho, setProdutosCarrinho] = useState(carrinho);
  const [modalAberto, setModalAberto] = useState(false); // Estado do modal
  const [observacao, setObservacao] = useState(""); // Estado para a observação

  const abrirModal = (obs) => {
    setObservacao(obs); // Define a observação existente ou vazio
    setModalAberto(true); // Abre o modal
  };

  const fecharModal = () => setModalAberto(false);

  const salvarObservacao = () => {
    // Lógica para salvar a observação
    fecharModal();
  };

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
          <Grid key={`${itemCarrinho.prd_id}${itemCarrinho.ppd_qtd}${itemCarrinho.ppd_obs}`} item={itemCarrinho} abrirModal={abrirModal} />
        ))
      }

      <div className={styles.gridTotal}>
        <div></div>
        <div className={styles.total}>R$ {valorTotal}</div>
      </div>

      {modalAberto && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Digite a observação..."
            />
            <button onClick={salvarObservacao}>Salvar</button>
            <button onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default CompCarrinho;

function Grid({ item, abrirModal }) {

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
          <RiDeleteBin6Line className={styles.iconDelete} />
        </div>

        <div className={styles.observacao}>
        <RiChat1Line className={styles.iconChat} onClick={() => abrirModal(item.ppd_obs)} />
          {item.ppd_obs.length > 0 ? (
            <textarea className={styles.textareaCarrinho} onClick={() => abrirModal(item.ppd_obs)}>{item.ppd_obs}</textarea>
          ) : (
            <span className={styles.spanBtn} onClick={() => abrirModal("")}>Adicionar observação</span>
          )}
        </div>

      </div>

      <div className={`${styles.carrProduto} ${styles.carrQtd}`}>
        <RiSubtractLine />
        {item.ppd_qtd}
        <RiAddLine />
      </div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>{item.prd_valor}</div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>{total.toFixed(2)}</div>
    </div>
  );
}