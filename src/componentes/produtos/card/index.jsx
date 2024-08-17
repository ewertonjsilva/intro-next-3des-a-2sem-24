import Image from 'next/image';
import Link from "next/link";

import styles from './index.module.css';

export default function CardProduto({ produto }) {
    return (
        <Link href={`/produtos/${produto.prd_id}`} key={produto.prd_id} className={styles.card}>
            {/* <div className={styles.card}> */}
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
            {/* </div> */}
        </Link>
    );
}
