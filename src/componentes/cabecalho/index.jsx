"use client"
import React, { useState } from 'react';
import Link from 'next/link';

import { MdFastfood, MdMenu } from 'react-icons/md';

import styles from './index.module.css';

function Header({ pag }) {

  const [mobile, setMobile] = useState(false);

  function ativaMenu() {
    if (mobile === false) {
      setMobile(true);
    } else {
      setMobile(false);
    }
  }

  return (
    <header>
      <nav className={styles.containerNav}>
        <div className={styles.menu}>
          <div>
            <MdFastfood className={styles.icon} id="logo" />
            <label for="" id="titulo">BomBurguer</label>
          </div>
          <div className={styles.menuGrande}>
            <Link href='/' className={pag === 'home' ? styles.active : ''}>Home</Link>
            <Link href='/listprod' className={pag === 'produtos' ? styles.active : ''}>Produtos</Link>
            <Link href='/usuarios/cadastro' className={pag === 'cadUsu' ? styles.active : ''}>Cadastrar</Link>
            <Link href='/sobre' className={pag === 'contato' ? styles.active : ''}>Sobre</Link>
            <Link href='/usuarios/login' className={pag === 'login' ? styles.active : ''}>Login</Link>
          </div>
          <div className="menuMobile">
            <a href="#" onClick={ativaMenu} className={styles.icon} id="mIco">
              <MdMenu className={styles.icon} id="logo" />
            </a>
          </div>
        </div>
        <div className={mobile === false ? styles.menuMobileExpandidon : styles.menuMobileExpandidos} id="mostraOpMobile">
          <Link href='/' className={pag === 'home' ? styles.active : ''}>Home</Link>
          <Link href='/listprod' className={pag === 'produtos' ? styles.active : ''}>Produtos</Link>
          <Link href='/usuarios/cadastro' className={pag === 'cadUsu' ? styles.active : ''}>Cadastrar</Link>
          <Link href='/sobre' className={pag === 'contato' ? styles.active : ''}>Sobre</Link>
          <Link href='/usuarios/login' className={pag === 'login' ? styles.active : ''}>Login</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;