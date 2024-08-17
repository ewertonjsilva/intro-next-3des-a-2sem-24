import Image from "next/image";
import styles from "./page.module.css";

export default function Sobre() {
  return (
    <div className="containerGlobal">
      <div className={styles.containerTitulo}>
        <h1 className={styles.txtTitulo}>Sobre</h1>
      </div>      
    </div>
  );
}
