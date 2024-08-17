'use client'

import React, { useState } from 'react';

// import { Link, useNavigate } from 'react-router-dom';
import Link from 'next/link';

import { MdLogin } from "react-icons/md";

// import api from '../../services/api';

import styles from './index.module.css';

function LoginUsu() {

    // let navigate = useNavigate();
    
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');


    function handleSubmit(event) {
        event.preventDefault();
        // logar();
    }

    // AJUSTANDO FUNÇÃO

    // async function logar(event) {

    //     try {
    //         const dados = {
    //             login,
    //             senha
    //         }
    //         const response = await api.post('/usuarios/login', dados);

    //         if (response.data.confirma == true) {
    //             const objLogado = {
    //                 "id": response.data.id,
    //                 "nome": response.data.nome,
    //                 "acesso": response.data.tipo
    //             };
    //             // signin(JSON.stringify(objLogado));                
    //             localStorage.clear();
    //             localStorage.setItem('user', JSON.stringify(objLogado));
    //             // window.location.reload(true); 
    //             navigate('/'); // direcionar de acordo com a situação

    //             /*
    //                 https://www.freecodecamp.org/portuguese/news/como-persistir-um-usuario-conectado-com-react/
    //                 RECUPERAR INFO USUÁRIO LOGADO
    //                 const user = JSON.parse(localStorage.getItem('user'));
    //                 alert(user.id);
    //             */
    //         } else {
    //             alert('Erro: ' + response.data.message)
    //         }

    //     } catch (error) {
    //         if (error.response) {
    //             alert(error.response.data.message);
    //         } else {
    //             alert(error);
    //         }
    //     }
    // }

    return (

        <div className={styles.containerLog}>
            <div>
                <h2>Acessar o site</h2>
            </div>
            <form id="form" className={styles.form} onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="email"
                    placeholder="E-mail"
                    onChange={v => setLogin(v.target.value)}
                    value={login}
                />
                <input
                    type="password"
                    id="password"
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