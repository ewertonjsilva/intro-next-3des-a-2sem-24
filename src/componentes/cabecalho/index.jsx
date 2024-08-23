'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MdFastfood, MdMenu } from 'react-icons/md';

import styles from './index.module.css';

function Header() {

  const [mobile, setMobile] = useState(false);
  const [logado, setLogado] = useState(false);

  const rota = usePathname();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLogado(true);      
    }    
  }, [rota]);

  function sair() {
    localStorage.clear();
    window.location.reload(true);
    // navigate('/');
  }

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
          {
            logado ? <span className={styles.menuSair} onClick={() => sair()}>Sair</span> : <Link
              href='/usuarios/login'
              className={rota === '/usuarios/login' ? styles.active : ''}
            >Login</Link>
          }

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