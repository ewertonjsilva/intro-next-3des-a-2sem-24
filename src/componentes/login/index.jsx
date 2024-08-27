'use client'

import React, { useState } from 'react';

// import { Link, useNavigate } from 'react-router-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import { MdLogin } from "react-icons/md";

import api from '../../services/api';

import styles from './index.module.css';

function LoginUsu() {

    const router = useRouter();

    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');


    function handleSubmit(event) {
        event.preventDefault();
        logar();
    }



    async function logar(event) {

        try {
            const dados = {
                usu_email: login,
                usu_senha: senha
            }

            const response = await api.post('/usuarios/login', dados);

            if (response.data.sucesso == true) {
                const usuario = response.data.dados;
                const objLogado = {
                    "id": usuario.usu_id,
                    "nome": usuario.usu_nome,
                    "acesso": usuario.usu_tipo
                };
                // signin(JSON.stringify(objLogado));                
                localStorage.clear();
                localStorage.setItem('user', JSON.stringify(objLogado));                
                router.push('/'); // é possível direcionar de acordo com a situação

            } else {
                alert('Erro: ' + error.response.data.mensagem + '\n' + error.response.data.dados)
            }

        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert(error);
            }
        }
    }

    return (

        <div className={styles.containerLog}>
            <div>
                <h2>Acessar o site</h2>
            </div>
            <form id="form" className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="email"
                    className={styles.input}
                    placeholder="E-mail"
                    onChange={v => setLogin(v.target.value)}
                    value={login}
                />
                <input
                    type="password"
                    id="password"
                    className={styles.input}
                    placeholder="Senha"
                    onChange={v => setSenha(v.target.value)}
                    value={senha}
                />
                <div className={styles.info}>
                    <Link href='/usuarios/cadastro'>Não tenho cadastro!</Link>
                    <a href="#">Esqueci o e-mail</a>
                </div>
                <button type="submit" className={styles.botao}><MdLogin className={styles.ico} /> Entrar</button>
            </form>
        </div>

    );
}

export default LoginUsu; 