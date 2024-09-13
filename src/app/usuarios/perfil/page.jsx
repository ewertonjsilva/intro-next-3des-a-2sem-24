import Image from "next/image";
import styles from "./page.module.css";

import EdtUsuario from "@/componentes/usuarios/edicao";

export default function Perfil() {
  return (
    <div className="containerGlobal">
      <h1>Perfil usuário</h1>  
      <EdtUsuario />  
    </div>
  );
}
