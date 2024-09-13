'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import InputMask from 'react-input-mask';

import Image from 'next/image';

import { MdCheckCircle, MdError } from "react-icons/md";

import IconCad from '../../../../public/icones/cadastrar.svg';

import styles from './index.module.css';

import api from '@/services/api';

export default function EdtUsuario() {

    const router = useRouter();

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
        confSenha: '',
    });

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
        confSenha: {
            validado: valDefault,
            mensagem: []
        }
    });

    const handleChange = (e) => {
        setUsuario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function validaNome() {

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (usuario.usu_nome === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O nome do usuário é obrigatório');
        } else if (usuario.usu_nome.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o nome completo do usuário');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            nome: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaNascimento() {

        // Obtém a data atual
        const hoje = new Date();
        const anoAtual = hoje.getFullYear();

        // Converte a data de nascimento para um objeto Date
        const dataNascimentoObj = new Date(usuario.usu_dt_nasc);

        let objTemp = {
            validado: valSucesso, // css referente ao estado de validação
            mensagem: [] // array de mensagens de validação
        };

        if (usuario.usu_dt_nasc === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O preenchimento da data é obrigatório');
        } else if (dataNascimentoObj > hoje) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A data de nascimento não pode ser futura');
        } else {
            // Calcula a idade
            const anoNascimento = dataNascimentoObj.getFullYear();
            const idade = anoAtual - anoNascimento;
            if (idade > 100) {
                objTemp.validado = valErro;
                objTemp.mensagem.push('A idade não pode ser superior a 100 anos');
            }
            if (idade < 14) {
                objTemp.validado = valErro;
                objTemp.mensagem.push('A idade não pode ser inferior a 14 anos');
            }
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            nascimento: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function checkEmail(email) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }

    function validaEmail() {
        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.usu_email === "") {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O e-mail do usuário é obrigatório');
        } else if (!checkEmail(usuario.usu_email)) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira um e-mail válido');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            email: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;

    }

    function validaCpf() {
        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        // Remove todos os caracteres não numéricos
        const cpf = usuario.usu_cpf.replace(/\D/g, '');

        if (cpf.length < 11) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O CPF precisa ter 11 dígitos');
        } else if (/^(\d)\1{10}$/.test(cpf)) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O CPF digitado é inválido');
        } else if (validaDigitosCPF(cpf) === false) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O CPF digitado é inválido');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            cpf: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;

    }

    function validaDigitosCPF(cpf) {
        // Valida os dígitos verificadores
        let soma = 0;
        let resto;
        for (let i = 1; i <= 9; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(9,
            10))) {
            return false;
        }

        soma = 0;
        for (let i = 1; i <= 10; i++) {
            soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.substring(10,
            11))) {
            return false;
        }

        return true;
    }

    function validaSenha() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.usu_senha === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O preenchimento da senha é obrigatório');
        } else if (usuario.usu_senha < 3) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('A senha deve ter pelo menos 3 caracteres');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            senha: objTemp // atualiza apenas o campo 'nome'
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
        } else if (usuario.confSenha !== usuario.usu_senha) {
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
        itensValidados += validaNome();
        itensValidados += validaNascimento();
        itensValidados += validaEmail();
        itensValidados += validaSenha();
        itensValidados += validaConfSenha();
        itensValidados += validaCpf();

        // salvar quando atingir o número de itens a serem validados
        // alert(itensValidados);
        if (itensValidados === 6) {
            // alert('chama api');            

            try {
                let confirmaCad;
                const response = await api.post('/clientes', usuario);
                confirmaCad = response.data.sucesso;
                // const idUsu = confirmaCad;
                // alert(idUsu);
                if (confirmaCad) {
                    router.push('/')
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

                <div className={valida.senha.validado} id="validaSn1">
                    <label className={styles.label}>Senha</label>
                    <div className={styles.divInput}>
                        <input
                            type="password"
                            name="usu_senha"
                            placeholder="Digite sua senha..."
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

                <div className={valida.confSenha.validado} id="validaSn2">
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
                    <Image className={styles.img} src={IconCad} alt="cadastrar" />
                    {/* <MdPersonAddAlt /> */}
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
