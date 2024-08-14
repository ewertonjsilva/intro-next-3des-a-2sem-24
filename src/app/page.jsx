import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="containerGlobal">
      <div className={styles.containerTitulo}>
        <h1 className={styles.txtTitulo}>Aula next js</h1>
        <h2>Exemplo h2</h2>
        <h3>Exemplo h3</h3>
        <p>Exemplo parágrafo</p>
        <Link href="/temp">Temp</Link>

        {/* <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}> */}
        <div className={styles.containerImagem}>
          <Image
            src="/arvore.jpg"
            width={100}
            height={100}
            alt="Imagem de uma árvore"
            className={styles.imagemHome}
          />
          <Image
            src="/arvore.jpg"
            width={1000}
            height={1000}
            alt="Imagem de uma árvore"
            className={styles.imagemHome}
          />
        </div>

      </div>
    </div>
  );
}
