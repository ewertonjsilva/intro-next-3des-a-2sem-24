'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MdFastfood, MdMenu } from 'react-icons/md';

import styles from './index.module.css';

function Header() {

  const [mobile, setMobile] = useState(false);

  const rota = usePathname();

  function ativaMenu() {
    if (mobile === false) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  return (
    <header className={styles.containerNav}>
      <div className={styles.menu}>
        <div>
          <MdFastfood className={styles.icon} id="logo" />
          <label id="titulo">BomBurguer</label>
        </div>
        <nav className={styles.menuGrande}>
          <Link
            href='/'
            className={rota === '/' ? styles.active : ''}
          >Home</Link>
          <Link
            href='/listprod'
            className={rota === '/listprod' ? styles.active : ''}
          >Produtos</Link>
          <Link
            href='/usuarios/cadastro'
            className={rota === '/usuarios/cadastro' ? styles.active : ''}
          >Cadastrar</Link>
          <Link
            href='/sobre'
            className={rota === '/sobre' ? styles.active : ''}
          >Sobre</Link>
          <Link
            href='/usuarios/login'
            className={rota === '/usuarios/login' ? styles.active : ''}
          >Login</Link>
        </nav>
        <div className={styles.menuMobile}>
          <MdMenu onClick={ativaMenu} className={styles.icon} id="logo" />
        </div>
      </div>
      <div
        className={mobile === false ? styles.menuMobileExpandidon : styles.menuMobileExpandidos}
        id="mostraOpMobile"
      >
        <Link
          href='/'
          onClick={ativaMenu}
          className={rota === '/' ? styles.active : ''}
        >Home</Link>
        <Link
          href='/listprod'
          onClick={ativaMenu}
          className={rota === '/listprod' ? styles.active : ''}
        >Produtos</Link>
        <Link
          href='/usuarios/cadastro'
          onClick={ativaMenu}
          className={rota === '/usuarios/cadastro' ? styles.active : ''}
        >Cadastrar</Link>
        <Link
          href='/sobre'
          onClick={ativaMenu}
          className={rota === '/sobre' ? styles.active : ''}
        >Sobre</Link>
        <Link
          href='/usuarios/login'
          onClick={ativaMenu}
          className={rota === '/usuarios/login' ? styles.active : ''}
        >Login</Link>
      </div>
    </header>
  );
}

export default Header;