'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
// import { useRouter } from 'next/navigation';

import { MdFastfood, MdMenu } from 'react-icons/md';

import styles from './index.module.css';

function Header() {

  const [mobile, setMobile] = useState(false);
  const [logado, setLogado] = useState(false);
  const [usuarioLog, setUsuarioLog] = useState({});

  const rota = usePathname();
  const router = useRouter();
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLogado(true);
      const primeiroNome = user.nome.split(' ');
      const infoUsu = {
        nome: primeiroNome[0],
        tipo: user.acesso
      }
      // E nas requisições subsequentes, envie o token nos cookies:      
      const token = user.acesso; 
      
      if (typeof(token) == 'number') {
        // console.log(token);
        document.cookie = `token=${token}; path=/;`;
      }
      setUsuarioLog(infoUsu);
    }
  }, [rota]);

  function sair() {
    const data = new Date();
    localStorage.clear();
    document.cookie = `token=; expires=${data}; path=/;`;
    setLogado(false);
    setUsuarioLog({});
    router.push('/');
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
            href='/produtos'
            className={rota === '/produtos' ? styles.active : ''}
          >Produtos</Link>

          {/* CARRINHO / RESTAURANTE */}
          {
            !logado ?
              <Link
                href='/usuarios/cadastro'
                className={rota === '/usuarios/cadastro' ? styles.active : ''}
              >Cadastrar</Link>
              : usuarioLog.tipo == 2 ?
                <Link
                  href='/carrinho'
                  className={rota === '/carrinho' ? styles.active : ''}
                >Carrinho</Link>
                :
                <Link
                  href='/gerenciamento'
                  className={rota === '/gerenciamento' ? styles.active : ''}
                >Gerenciamento</Link>
          }


          {/* SOBRE / USUÁRIO */}
          {
            !logado ?
              <Link
                href='/sobre'
                className={rota === '/sobre' ? styles.active : ''}
              >Sobre</Link>
              :
              <Link
                href='/usuarios/perfil'
                className={rota === '/usuarios/perfil' ? styles.active : ''}
              >{usuarioLog.nome}</Link>
          }

          {/* LOGIN / SAIR */}
          {
            logado ?
              <span className={styles.menuSair} onClick={() => sair()}>Sair</span>
              :
              <Link
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
          href='/produtos'
          onClick={ativaMenu}
          className={rota === '/produtos' ? styles.active : ''}
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