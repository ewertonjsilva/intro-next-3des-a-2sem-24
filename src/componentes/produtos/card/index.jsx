// import { useNavigate } from 'react-router-dom';
import Image from 'next/image';

import styles from './index.module.css';

export default function CardProduto({ produto }) {

    //   let navigate = useNavigate();

    //   function visualizaProd() {
    //     navigate('/produto', { state: {produto, carrinho} });
    //   }

    return (
        // <div className={styles.cardProd} onClick={() => visualizaProd()}>
        <div className={styles.card}>
            <div className={styles.imagemContainer}>
                <Image
                    src={produto.prd_img}
                    alt={produto.prd_nome}
                    width={200}
                    height={200}
                    className={styles.imagemProduto}
                />
            </div>
            <span className={styles.produtoNome}>{produto.prd_nome}</span>
            <span className={styles.produtoValor}>{produto.prd_valor}</span>
        </div>
    );
}
