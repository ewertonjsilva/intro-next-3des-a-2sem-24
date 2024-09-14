'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';

import Image from 'next/image';

import { MdCheckCircle, MdError } from "react-icons/md";

import MudaSenha from '../../../../public/icones/mudaSenha.svg';
import NovaSenha from '../../../../public/icones/novaSenha.svg';
import Cancelar from '../../../../public/icones/cancel.svg';

import styles from './index.module.css';

import api from '@/services/api';

export default function EdtUsuario() {

    const router = useRouter();

    const [exibeMudaSenha, setExibeMudaSenha] = useState(false);
    const [idLogado, setIdLogado] = useState(0);


    function mostraOcultaSenha() {
        exibeMudaSenha ? setExibeMudaSenha(false) : setExibeMudaSenha(true);
    }

    // info
    const [usuario, setUsuario] = useState({
        usu_id: '',
        usu_nome: '',
        usu_email: '',
        usu_senha: '',
        usu_dt_nasc: '',
        usu_cpf: '',
        usu_tipo: '',
        usu_ativo: '',
        novaSenha: '',
        confSenha: '',
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setIdLogado(user.id);
            handleCarregaUsuario();
        }

        async function handleCarregaUsuario() {
            const dadosApi = {
                usu_id: user.id
            }
            try {
                const response = await api.get('/usuarios', dadosApi);
                const confirmaAcesso = response.data.sucesso;
                if (confirmaAcesso) {
                    let us = response.data.dados[0];
                    setUsuario(prev => ({
                        ...prev,
                        usu_id: us.usu_id,
                        usu_nome: us.usu_nome,
                        usu_email: us.usu_email,
                        usu_dt_nasc: us.usu_dt_nasc,
                        usu_tipo: us.usu_tipo,
                        usu_cpf: us.usu_cpf,
                        usu_ativo: us.usu_ativo
                    }))
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.mensagem + '\n' + error.response.data.dados);
                } else {
                    alert('Erro no front-end' + '\n' + error);
                }
            }
        }
    }, []);

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    // validação
    const [valida, setValida] = useState({
        nome: {
            validado: valDefault,
            mensagem: []
        },
        nascimento: {
            validado: valDefault,
            mensagem: []
        },
        email: {
            validado: valDefault,
            mensagem: []
        },
        cpf: {
            validado: valDefault,
            mensagem: []
        },
        senha: {
            validado: valDefault,
            mensagem: []
        },
        novaSenha: {
            validado: valDefault,
            mensagem: []
        },
        confSenha: {
            validado: valDefault,
            mensagem: []
        }
    });

    const handleChange = (e) => {
        setUsuario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function validaSenha() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };
        
        if (usuario.usu_senha === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O preenchimento da senha é obrigatório');
        }
        
        const verSenha = await verificaSenhaAntiga();

        if (verSenha == false) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A senha não corresponde.');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            senha: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    async function verificaSenhaAntiga() {
        try {
            const dados = {
                usu_email: usuario.usu_email,
                usu_senha: usuario.usu_senha
            }

            const response = await api.post('/usuarios/login', dados);

            if (response.data.sucesso == true) {
                return true;
            } 

        } catch (error) {
            return false;            
        }
    }

    function validaNovaSenha() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.novaSenha === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O preenchimento da senha é obrigatório');
        } else if (usuario.novaSenha < 3) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A senha deve ter pelo menos 3 caracteres');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            novaSenha: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaConfSenha() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.confSenha === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A confirmação da senha é obrigatória');
        } else if (usuario.confSenha !== usuario.novaSenha) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A senha e a confirmação devem ser iguais');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            confSenha: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }


    async function handleSubmit(event) {
        event.preventDefault();
        let itensValidados = 0;
        itensValidados += await validaSenha();
        itensValidados += validaNovaSenha();
        itensValidados += validaConfSenha();

        // salvar quando atingir o número de itens a serem validados
        // alert(itensValidados);
        if (itensValidados === 3) {
            try {
                let confirmaCad;
                console.log(usuario);
                const response = await api.patch(`/usuario/senha/${idLogado}`, usuario);
                confirmaCad = response.data.sucesso;                
                if (confirmaCad) {
                    alert('Senha atualizada com sucesso!');
                    mostraOcultaSenha();
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.mensagem + '\n' + error.response.data.dados);
                } else {
                    alert('Erro no front-end' + '\n' + error);
                }
            }
        }
    }

    return (

        <div className={styles.containerCadUsu}>
            <form id="form" className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.doisItens}>
                    <div className={valida.nome.validado + ' ' + styles.valNome} id="valNome">
                        <label className={styles.label}>Nome completo</label>
                        <div className={styles.divInput}>
                            <input
                                type="text"
                                name="usu_nome"
                                placeholder="Digite seu nome completo..."
                                className={styles.input}
                                onChange={handleChange}
                                value={usuario.usu_nome}
                                disabled={true}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.nome.mensagem.map(mens => <small key={mens} id="nome" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <div className={valida.nascimento.validado} id="valDtNasc">
                        <label className={styles.label}>Data de nascimento</label>
                        <div className={styles.divInput}>
                            <input
                                type="date"
                                name="usu_dt_nasc"
                                className={styles.input}
                                onChange={handleChange}
                                value={usuario.usu_dt_nasc}
                                disabled={true}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.nascimento.mensagem.map(mens => <small key={mens} id="nome" className={styles.small}>{mens}</small>)
                        }
                    </div>
                </div>

                <div className={styles.doisItens}>
                    <div className={valida.email.validado + ' ' + styles.valNome} id="valEmail">
                        <label className={styles.label}>Email</label>
                        <div className={styles.divInput}>
                            <input
                                type="text"
                                name="usu_email"
                                placeholder="Digite seu email.."
                                className={styles.input}
                                onChange={handleChange}
                                value={usuario.usu_email}
                                disabled={true}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.email.mensagem.map(mens => <small key={mens} id="email" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <div className={valida.cpf.validado} id="valCpf">
                        <label className={styles.label}>CPF</label>
                        <div className={styles.divInput}>
                            <InputMask
                                mask="999.999.999-99"
                                name="usu_cpf"
                                placeholder="Digite seu CPF.."
                                className={styles.input}
                                onChange={handleChange}
                                value={usuario.usu_cpf}
                                disabled={true}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.cpf.mensagem.map(mens => <small key={mens} id="cpf" className={styles.small}>{mens}</small>)
                        }
                    </div>
                </div>

                <div className={exibeMudaSenha ? styles.mudaSenha : styles.escondeMudaSenha}>
                    <div className={valida.senha.validado} id="validaSn1">
                        <label className={styles.label}>Senha atual</label>
                        <div className={styles.divInput}>
                            <input
                                type="password"
                                name="usu_senha"
                                placeholder="Digite sua senha atual..."
                                className={styles.input}
                                onChange={handleChange}
                                value={usuario.usu_senha}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.senha.mensagem.map(mens => <small key={mens} id="senha" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <div className={valida.novaSenha.validado} id="validaSn2">
                        <label className={styles.label}>Nova Senha</label>
                        <div className={styles.divInput}>
                            <input
                                type="password"
                                name="novaSenha"
                                placeholder="Digite sua nova senha..."
                                className={styles.input}
                                onChange={handleChange}
                                value={usuario.novaSenha}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.novaSenha.mensagem.map(mens => <small key={mens} id="senha" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <div className={valida.confSenha.validado} id="validaSn3">
                        <label className={styles.label}>Confirmação de senha</label>
                        <div className={styles.divInput}>
                            <input
                                type="password"
                                name="confSenha"
                                placeholder="Digite sua senha novamente..."
                                className={styles.input}
                                onChange={handleChange}
                                value={usuario.confSenha}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.confSenha.mensagem.map(mens => <small key={mens} id="confSenha" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <button className={styles.button} type="submit">
                        <Image className={styles.img} src={NovaSenha} alt="cadastrar" />
                        {/* <MdPersonAddAlt /> */}
                        Gravar nova senha
                    </button>
                </div>

                <button className={styles.button} type="button" onClick={() => mostraOcultaSenha()}>
                    <Image className={styles.img} src={exibeMudaSenha ? Cancelar : MudaSenha} alt="cadastrar" />
                    {/* <MdPersonAddAlt /> */}
                    {exibeMudaSenha ? 'Cancelar' : 'Mudar senha'}
                </button>
            </form>
        </div>
    );
}
