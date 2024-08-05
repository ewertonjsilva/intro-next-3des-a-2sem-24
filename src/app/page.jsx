import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className="container">
      <div className={styles.containerTitulo}>
        <h1 className={styles.txtTitulo}>Aula next js</h1>
      </div>      
    </div>
  );
}
