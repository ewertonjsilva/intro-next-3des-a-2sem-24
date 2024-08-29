'use client'
import { useState } from 'react';

import Image from 'next/image';

import { MdCheckCircle, MdError } from "react-icons/md";

import IconCad from '../../../../public/icones/cadastrar.svg';

import styles from './index.module.css';

import { estados, cidades } from '../../../mocks/dados';

export default function CadUsuario() {

    // info
    const [usuario, setUsuario] = useState({
        usu_nome: '',
        usu_email: '',
        cid_id: '0',
        end_logradouro: '',
        end_num: '',
        end_bairro: '',
        end_complemento: '',
        cli_cel: '',
        usu_senha: '',
        uf: '0',
        confSenha: '',
        usu_tipo: 2
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
        email: {
            validado: valDefault,
            mensagem: []
        },
        uf: {
            validado: valDefault,
            mensagem: []
        },
        cidade: {
            validado: valDefault,
            mensagem: []
        },
        logradouro: {
            validado: valDefault,
            mensagem: []
        },
        numero: {
            validado: valDefault,
            mensagem: []
        },
        bairro: {
            validado: valDefault,
            mensagem: []
        },
        complemento: {
            validado: valDefault,
            mensagem: []
        },
        celular: {
            validado: valDefault,
            mensagem: []
        },
        senha: {
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

    function validaUf() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.uf == 0) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Selecione o estado');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            uf: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaCidade() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.cid_id == 0) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Selecione a cidade');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            cidade: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaLogradouro() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.end_logradouro === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O endereço é um campo obrigatório');
        } else if (usuario.end_logradouro.length < 5) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o endereço completo');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            logradouro: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaNumero() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.end_num === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O número do imóvel é um campo obrigatório');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            numero: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaBairro() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.end_bairro === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('É necessário inserir o nome do bairro');
        } else if (usuario.end_bairro.length < 4) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('Insira o nome completo do bairro');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            bairro: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaComplemento() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            complemento: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }

    function validaCelular() {

        let objTemp = {
            validado: valSucesso,
            mensagem: []
        };

        if (usuario.cli_cel === '') {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O nº do celular é obrigatório');
        } else if (cli_cel.length < 11) {
            objTemp.validado = valErro;
            objTemp.mensagem.push('O número do celular deve ter pelo menos 11 dígitos');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            celular: objTemp // atualiza apenas o campo 'nome'
        }));

        const testeResult = objTemp.mensagem.length === 0 ? 1 : 0;
        return testeResult;
    }


    function handleSubmit(event) {
        let itensValidados = 0;
        itensValidados += validaNome();
        itensValidados += validaEmail();
        itensValidados += validaUf();
        itensValidados += validaCidade();
        itensValidados += validaLogradouro();
        itensValidados += validaNumero();
        itensValidados += validaBairro();
        itensValidados += validaComplemento();
        itensValidados += validaCelular();
        // salvar quando atingir o número de itens a serem validados
        alert(itensValidados)
        event.preventDefault();
    }

    // function valida() {



    //     if (usu_senha === '') {
    //         setValSenha('form-control error');
    //         setErrSenha('O preenchimento da senha é obrigatório');
    //         validado = false;
    //     } else if (usu_senha.length < 3) {
    //         setValSenha('form-control error');
    //         setErrSenha('A senha deve ter pelo menos 3 caracteres');
    //         validado = false;
    //     } else {
    //         setValSenha('form-control success')
    //     }

    //     if (confSenha === '') {
    //         setValConfSenha('form-control error');
    //         setErrConfSenha('A confirmação da senha é obrigatória');
    //         validado = false;
    //     } else if (confSenha !== usu_senha) {
    //         setValConfSenha('form-control error');
    //         setErrConfSenha('A senha e a confirmação devem ser iguais');
    //         validado = false;
    //     } else {
    //         setValConfSenha('form-control success')
    //     }

    // if (validado === 10) {
    //     console.log("O formulário está 100% válido!");
    // }
    // }



    return (

        <div className={styles.containerCadUsu}>
            <div>
                <h2>Criar uma conta</h2>
            </div>
            <form id="form" className={styles.form} onSubmit={handleSubmit}>
                <div className={valida.nome.validado} id="valNome">
                    <label className={styles.label}>Nome de usuário</label>
                    <div className={styles.divInput}>
                        <input
                            type="text"
                            name="usu_nome"
                            placeholder="Digite seu nome de usuário..."
                            className={styles.input}
                            // onChange={v => setUsu_nome(v.target.value)}
                            onChange={handleChange}
                        // value={usu_nome}
                        />
                        <MdCheckCircle className={styles.sucesso} />
                        <MdError className={styles.erro} />
                    </div>
                    {
                        valida.nome.mensagem.map(mens => <small key={mens} id="nome" className={styles.small}>{mens}</small>)
                    }
                    {/* <small id="nome" className={styles.small}>{errNome}</small> */}
                </div>

                <div className={valida.email.validado} id="valEmail">
                    <label className={styles.label}>Email</label>
                    <div className={styles.divInput}>
                        <input
                            type="text"
                            name="usu_email"
                            placeholder="Digite seu email.."
                            className={styles.input}
                            onChange={handleChange}
                        // value={usu_email}
                        />
                        <MdCheckCircle className={styles.sucesso} />
                        <MdError className={styles.erro} />
                    </div>
                    {
                        valida.email.mensagem.map(mens => <small key={mens} id="email" className={styles.small}>{mens}</small>)
                    }
                </div>

                <div className={styles.doisItens}>
                    <div className={valida.uf.validado + ' ' + styles.valEstado} id="valEstado">
                        <label className={styles.label}>Estado</label>
                        <div className={styles.divInput}>
                            <select className={styles.select} name="uf" id="estado" onChange={handleChange} defaultValue={usuario.uf}>
                                <option disabled value="0">Sel. estado</option>
                                {
                                    estados.map(uf => (
                                        <option key={uf.uf} value={uf.uf}>{uf.uf}</option>
                                    ))
                                }
                            </select>
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.uf.mensagem.map(mens => <small key={mens} id="uf" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <div className={valida.cidade.validado}>
                        <label className={styles.label}>Cidade</label>
                        <div className={styles.divInput}>
                            <select className={styles.select} name="cid_id" id="cidade" onChange={handleChange} defaultValue={usuario.cid_id}>
                                <option disabled value="0">Selecione a cidade</option>
                                {
                                    cidades.map(cid => (
                                        <option key={cid.cid_id} value={cid.cid_id}>{cid.cid_nome}</option>
                                    ))
                                }
                            </select>
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.cidade.mensagem.map(mens => <small key={mens} id="cidade" className={styles.small}>{mens}</small>)
                        }
                    </div>
                </div>

                <div className={valida.logradouro.validado} id="valLog">
                    <label className={styles.label}>Logradouro</label>
                    <div className={styles.divInput}>
                        <input
                            type="text"
                            name="end_logradouro"
                            placeholder="Digite o endereço..."
                            className={styles.input}
                            onChange={handleChange}
                        // value={end_logradouro}
                        />
                        <MdCheckCircle className={styles.sucesso} />
                        <MdError className={styles.erro} />
                    </div>
                    {
                        valida.logradouro.mensagem.map(mens => <small key={mens} id="logradouro" className={styles.small}>{mens}</small>)
                    }
                </div>

                <div className={styles.doisItens}>
                    <div className={valida.numero.validado + ' ' + styles.valNum} id="valNum">
                        <label className={styles.label}>Número</label>
                        <div className={styles.divInput}>
                            <input
                                type="text"
                                name="end_num"
                                placeholder="nº do endereço"
                                className={styles.input}
                                onChange={handleChange}
                            // value={end_num}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.numero.mensagem.map(mens => <small key={mens} id="logradouro" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <div className={valida.bairro.validado} id="valBairro">
                        <label className={styles.label}>Bairro</label>
                        <div className={styles.divInput}>
                            <input
                                type="text"
                                name="end_bairro"
                                placeholder="Insira o nome do bairro"
                                className={styles.input}
                                onChange={handleChange}
                            // value={end_bairro}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.bairro.mensagem.map(mens => <small key={mens} id="logradouro" className={styles.small}>{mens}</small>)
                        }
                    </div>
                </div>

                <div className={styles.doisItens}>
                    <div className={valida.complemento.validado + ' ' + styles.valComp} id="valComp">
                        <label className={styles.label}>Complemento</label>
                        <div className={styles.divInput}>
                            <input
                                type="text"
                                name="end_complemento"
                                placeholder="Complemento do endereço"
                                className={styles.input}
                                onChange={handleChange}
                            // value={end_complemento}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.complemento.mensagem.map(mens => <small key={mens} id="complemento" className={styles.small}>{mens}</small>)
                        }
                    </div>

                    <div className={valida.celular.validado} id="valCelular">
                        <label className={styles.label}>nº celular</label>
                        <div className={styles.divInput}>
                            <input
                                type="text"
                                name="cli_cel"
                                placeholder="Insira o nº do celular"
                                className={styles.input}
                                onChange={handleChange}
                            // value={cli_cel}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.celular.mensagem.map(mens => <small key={mens} id="celular" className={styles.small}>{mens}</small>)
                        }
                    </div>
                </div>

                <div className={styles.formControl} id="validaSn1">
                    <label className={styles.label}>Senha</label>
                    <div className={styles.divInput}>
                        <input
                            type="password"
                            name="usu_senha"
                            placeholder="Digite sua senha..."
                            className={styles.input}
                            onChange={handleChange}
                        // value={usu_senha}
                        />
                        <MdCheckCircle className={styles.sucesso} />
                        <MdError className={styles.erro} />
                    </div>
                    {/* <small className={styles.small}>{errSenha}</small> */}
                </div>

                <div className={styles.formControl} id="validaSn2">
                    <label className={styles.label}>Confirmação de senha</label>
                    <div className={styles.divInput}>
                        <input
                            type="password"
                            name="confSenha"
                            placeholder="Digite sua senha novamente..."
                            className={styles.input}
                            onChange={handleChange}
                        // value={confSenha}
                        />
                        <MdCheckCircle className={styles.sucesso} />
                        <MdError className={styles.erro} />
                    </div>
                    {/* <small className={styles.small}>{errConfSenha}</small> */}
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
