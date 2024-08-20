import { MdLunchDining, MdLocalBar, MdDining, MdIcecream, MdFastfood } from 'react-icons/md';

import styles from "./page.module.css";

import Slider from "@/componentes/slider";
import ProdutosHome from "@/componentes/produtos/produtosHome";

export default function Home() {
  return (
    <div className="containerGlobal">
      <Slider />

      <div className={styles.tipos}>
        <MdLunchDining className={styles.tpicon} />
        <MdLocalBar className={styles.tpicon} />
        <MdDining className={styles.tpicon} />
        <MdIcecream className={styles.tpicon} />
        <MdFastfood className={styles.tpicon} />
      </div>

      <ProdutosHome />

    </div>
  );
}
