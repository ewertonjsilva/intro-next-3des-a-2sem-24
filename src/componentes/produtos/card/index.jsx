import Image from 'next/image';
import Link from "next/link";

import styles from './index.module.css';


export default function CardProduto({ produto }) {

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    return (
        <Link href={`/produtos/${produto.prd_id}`} key={produto.prd_id} className={styles.card}>
            {/* <div className={styles.card}> */}
            <div className={styles.imagemContainer}>
                <Image
                    loader={imageLoader} /* Quando imagem vem por url */
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
