import Image from "next/image";
import styles from "./page.module.css";

export default function SemPermissao() {
    return (
        <div className="containerGlobal">
            <div className={styles.imagemContainer}>
                <Image
                    src={'acesso.svg'}
                    alt={'acesso-proibido.svg'}
                    width={500}
                    height={500}
                    className={styles.imagem}
                />
            </div>
            <h2 className={styles.txtTitulo}>Seu usuário não tem privilégios para acessar esta página!</h2>
        </div>
    );
}
