import Image from "next/image";
import styles from "./page.module.css";

export default function SemPermissao() {
    return (
        <div className="containerGlobal">
            <div className={styles.containerTitulo}>
                <Image                    
                    src={produto.prd_img}
                    alt={produto.prd_nome}
                    width={200}
                    height={200}
                    className={styles.imagemProduto}
                />
                <h2 className={styles.txtTitulo}>Seu usuário não tem privilégios para acessar esta página!</h2>
            </div>
        </div>
    );
}
