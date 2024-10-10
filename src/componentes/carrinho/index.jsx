'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { RiDeleteBin6Line, RiAddLine, RiSubtractLine, RiChat1Line } from "react-icons/ri";

import styles from './index.module.css';

import { carrinho } from '../../mocks/dados';

function CompCarrinho() {
  // Adicionar um campo temporário de id único aos produtos
  const inicializaCarrinhoComIds = carrinho.map((produto, index) => ({
    ...produto,
    temp_id: `${produto.prd_id}-${index}-${new Date().getTime()}`
  }));

  const [produtosCarrinho, setProdutosCarrinho] = useState(inicializaCarrinhoComIds);
  const [modalAberto, setModalAberto] = useState(false);
  const [observacao, setObservacao] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  useEffect(() => {
    // console.log('Renderiza');
  }, [produtosCarrinho]);

  const abrirModal = (produto) => {
    setObservacao(produto.ppd_obs || "");
    setProdutoSelecionado(produto);
    setModalAberto(true);
  };

  const fecharModal = () => setModalAberto(false);

  const salvarObservacao = () => {
    setProdutosCarrinho(produtosCarrinho.map((produto) =>
      produto.temp_id === produtoSelecionado.temp_id
        ? { ...produto, ppd_obs: observacao }
        : produto
    ));
    fecharModal();
  };

  const aumentarQuantidade = (produto) => {
    setProdutosCarrinho(produtosCarrinho.map((p) =>
      p.temp_id === produto.temp_id
        ? { ...p, ppd_qtd: p.ppd_qtd + 1 }
        : p
    ));
  };

  const diminuirQuantidade = (produto) => {
    setProdutosCarrinho(produtosCarrinho.map((p) =>
      p.temp_id === produto.temp_id && p.ppd_qtd > 1
        ? { ...p, ppd_qtd: p.ppd_qtd - 1 }
        : p
    ));
  };

  const excluirProduto = (produto) => {
    setProdutosCarrinho(produtosCarrinho.filter((p) =>
      p.temp_id !== produto.temp_id
    ));
  };

  const valorTotal = produtosCarrinho.reduce((total, produto) => {
    const valor = parseFloat(produto.prd_valor.replace('$', '').replace(',', '.'));
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

      {produtosCarrinho.map((itemCarrinho) => (
        <Grid
          key={itemCarrinho.temp_id}
          item={itemCarrinho}
          abrirModal={abrirModal}
          aumentarQuantidade={aumentarQuantidade}
          diminuirQuantidade={diminuirQuantidade}
          excluirProduto={excluirProduto}
        />
      ))}

      <div className={styles.gridTotal}>
        <div></div>
        <div className={styles.total}>R$ {valorTotal.toFixed(2)}</div>
      </div>

      {modalAberto && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Digite a observação..."
            />
            <div className={styles.conteinerBotaoModal}>
              <button onClick={salvarObservacao}>Salvar</button>
              <button onClick={fecharModal}>Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompCarrinho;

function Grid({ item, abrirModal, aumentarQuantidade, diminuirQuantidade, excluirProduto }) {
  const total = parseFloat(item.prd_valor.replace('$', '').replace(',', '.')) * item.ppd_qtd;

  return (
    <div className={styles.grid}>
      <div>
        <div className={styles.ladoExcluir}>
          <div className={styles.containerNomeObservaoes}>
            <div className={styles.carrProduto}>
              <div className={styles.contImgCarrProd}>
                <Image
                  src={item.prd_img}
                  alt={item.prd_nome}
                  width={100}
                  height={100}
                  className={styles.imagemProduto}
                />
              </div>
              <span>{item.prd_nome}</span>
            </div>

            <div className={styles.observacao}>
              <RiChat1Line className={styles.iconChat} onClick={() => abrirModal(item)} />
              {item.ppd_obs.length > 0 ? (
                <textarea
                  className={styles.textareaCarrinho}
                  value={item.ppd_obs} // O valor agora é gerenciado via "value"
                  readOnly
                  onClick={() => abrirModal(item)}
                />
              ) : (
                <span className={styles.spanBtn} onClick={() => abrirModal(item)}>Adicionar observação</span>
              )}
            </div>
          </div>
          <RiDeleteBin6Line className={styles.iconActions} onClick={() => excluirProduto(item)} />
        </div>
      </div>

      <div className={`${styles.carrProduto} ${styles.carrQtd}`}>
        <RiSubtractLine className={styles.iconActions} onClick={() => diminuirQuantidade(item)} />
        {item.ppd_qtd}
        <RiAddLine className={styles.iconActions} onClick={() => aumentarQuantidade(item)} />
      </div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>{item.prd_valor}</div>
      <div className={`${styles.carrProduto} ${styles.valores}`}>{total.toFixed(2)}</div>
    </div>
  );
}
