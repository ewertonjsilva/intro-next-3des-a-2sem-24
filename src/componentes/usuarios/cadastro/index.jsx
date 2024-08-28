'use client'
import { useState } from 'react';

import Image from 'next/image';

import { MdCheckCircle, MdError } from "react-icons/md";

import IconCad from '../../../../public/icones/cadastrar.svg';

import styles from './index.module.css';

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
        uf: '',
        confSenha: '',
        usu_tipo: 2
    });


    // validação
    const [valida, setValida] = useState({
        nome: {
            validado: false,
            mensagem: []
        },
        email: {
            validado: false,
            mensagem: []
        },
        cidade: {
            validado: false,
            mensagem: []
        },
        logradouro: {
            validado: false,
            mensagem: []
        },
        numero: {
            validado: false,
            mensagem: []
        },
        bairro: {
            validado: false,
            mensagem: []
        },
        celular: {
            validado: false,
            mensagem: []
        },
        senha: {
            validado: false,
            mensagem: []
        }
    });

    const handleChange = (e) => {
        setUsuario(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function validaNome() {
        let novoNomeValido = {
            validado: true, // ou false, conforme necessário
            mensagem: [] // ou outra mensagem que você quiser
        };

        if (usu_nome === '') {
            novoNomeValido.validado = false;
            novoNomeValido.mensagem.push('O nome do usuário é obrigatório');
        } else if (usu_nome.length < 5) {
            novoNomeValido.validado = false;
            novoNomeValido.mensagem.push('Insira o nome completo do usuário');
        }

        setValida(prevState => ({
            ...prevState, // mantém os valores anteriores
            nome: novoNomeValido // atualiza apenas o campo 'nome'
        }));
    }

    // validações
    // const [valNome, setValNome] = useState('form-control');
    // const [errNome, setErrNome] = useState('');
    // const [valEmail, setValEmail] = useState('form-control');
    // const [errEmail, setErrEmail] = useState('');
    // const [valUf, setValUf] = useState('form-control');
    // const [valCidade, setValCidade] = useState('form-control');
    // const [valLogradouro, setValLogradouro] = useState('form-control');
    // const [errLogradouro, setErrLogradouro] = useState('');
    // const [valNum, setValNum] = useState('form-control');
    // const [valBairro, setValBairro] = useState('form-control');
    // const [errBairro, setErrBairro] = useState('');
    // const [valCel, setValCel] = useState('form-control');
    // const [errCel, setErrCel] = useState('');
    // const [valSenha, setValSenha] = useState('form-control');
    // const [errSenha, setErrSenha] = useState('');
    // const [valConfSenha, setValConfSenha] = useState('form-control');
    // const [errConfSenha, setErrConfSenha] = useState('');

    function handleSubmit(event) {
        // valida();
        event.preventDefault();
    }

    // function valida() {
    //     let validado = true;

    // if (usu_nome === '') {
    //     setValNome('form-control error');
    //     setErrNome('O nome do usuário é obrigatório');
    //     validado = false;
    // } else if (usu_nome.length < 5) {
    //     setValNome('form-control error');
    //     setErrNome('Insira o nome completo do usuário');
    //     validado = false;
    // } else {
    //     setValNome('form-control success')
    // }

    //     if (usu_email === "") {
    //         setValEmail('form-control error');
    //         setErrEmail('O e-mail do usuário é obrigatório');
    //         validado = false;
    //     } else if (!checkEmail(usu_email)) {
    //         setValEmail('form-control error');
    //         setErrEmail('Insira um e-mail válido');
    //         validado = false;
    //     } else {
    //         setValEmail('form-control success');
    //     }

    //     if (uf === '') {
    //         setValUf('form-control error');
    //         validado = false;
    //     } else {
    //         setValUf('form-control success');
    //     }

    //     if (cid_id === '0') {
    //         setValCidade('form-control error');
    //         validado = false;
    //     } else {
    //         setValCidade('form-control success');
    //     }


    //     if (end_logradouro === '') {
    //         setValLogradouro('form-control error');
    //         setErrLogradouro('A identifivação do endereço é obrigatória');
    //         validado = false;
    //     } else if (end_logradouro.length < 5) {
    //         setValLogradouro('form-control error');
    //         setErrLogradouro('Insira o endereço completo');
    //         validado = false;
    //     } else {
    //         setValLogradouro('form-control success')
    //     }

    //     if (end_num === "") {
    //         setValNum('form-control error');
    //         validado = false;
    //     } else {
    //         setValNum('form-control success');
    //     }

    //     if (end_bairro === '') {
    //         setValBairro('form-control error');
    //         setErrBairro('É necessário inserir o nome do bairro');
    //         validado = false;
    //     } else if (end_bairro.length < 4) {
    //         setValBairro('form-control error');
    //         setErrBairro('Insira o nome completo do bairro');
    //         validado = false;
    //     } else {
    //         setValBairro('form-control success')
    //     }

    //     if (cli_cel === '') {
    //         setValCel('form-control error');
    //         setErrCel('O nº do celular é obrigatório');
    //         validado = false;
    //     } else if (cli_cel.length < 11) {
    //         setValCel('form-control error');
    //         setErrCel('O número do celular deve ter pelo menos 11 dígitos');
    //         validado = false;
    //     } else {
    //         setValCel('form-control success')
    //     }

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

    // function checkEmail(email) {
    //     return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    //         email
    //     );
    // }

    // console.log(usuario);

    return (

        <div className={styles.containerCadUsu}>
            <div>
                <h2>Criar uma conta</h2>
            </div>
            <form id="form" className={styles.form} /*onSubmit={handleSubmit}*/>
                <div className={styles.formControl} id="valNome">
                    <label className={styles.label} for="username">Nome de usuário</label>
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
                    {/* <small id="nome" className={styles.small}>{errNome}</small> */}
                </div>

                <div className={styles.formControl} id="valEmail">
                    <label className={styles.label} for="email">Email</label>
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
                    {/* <small className={styles.small}>{errEmail}</small> */}
                </div>

                <div className={styles.doisItens}>
                    <div className={styles.formControl + ' ' + styles.valEstado} id="valEstado">
                        <label className={styles.label} for="estado">Estado</label>
                        <div className={styles.divInput}>
                            <select className={styles.select} name="uf" id="estado" onChange={handleChange} /*value={uf}*/>
                                <option selected disabled value="">Sel. estado</option>
                                <option value="SP">SP</option>
                                <option value="RJ">RJ</option>
                                <option value="PR">PR</option>
                            </select>
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {/* <small className={styles.small}>Campo obrigatório!</small> */}
                    </div>

                    <div className={styles.formControl}>
                        <label className={styles.label} for="cidade">Cidade</label>
                        <div className={styles.divInput}>
                            <select className={styles.select} name="cid_id" id="cidade" onChange={handleChange} /*value={cid_id}*/>
                                <option selected disabled value="0" >Selecione a cidade</option>
                                <option value="1">Tupã</option>
                                <option value="2">Parapuã</option>
                                <option value="3">Marília</option>
                            </select>
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {/* <small className={styles.small}>Selecione a cidade!</small> */}
                    </div>
                </div>

                <div className={styles.formControl} id="valLog">
                    <label className={styles.label} for="logradouro">Logradouro</label>
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
                    {/* <small className={styles.small}>{errLogradouro}</small> */}
                </div>

                <div className={styles.doisItens}>
                    <div className={styles.formControl + ' ' + styles.valEstado} id="valNum">
                        <label className={styles.label} for="num">Número</label>
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
                        {/* <small className={styles.small}>Campo obrigatório!</small> */}
                    </div>

                    <div className={styles.formControl} id="valBairro">
                        <label className={styles.label} for="bairro">Bairro</label>
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
                        {/* <small className={styles.small}>{errBairro}</small> */}
                    </div>
                </div>

                <div className={styles.doisItens}>
                    <div className={styles.formControl + ' ' + styles.valEstado} id="valComp">
                        <label className={styles.label} for="comp">Complemento</label>
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
                        {/* <small className={styles.small}>-</small> */}
                    </div>

                    <div className={styles.formControl} id="valCelular">
                        <label className={styles.label} for="celular">nº celular</label>
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
                        {/* <small className={styles.small}>{errCel}</small> */}
                    </div>
                </div>

                <div className={styles.formControl} id="validaSn1">
                    <label className={styles.label} for="password">Senha</label>
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
                    <label className={styles.label} for="password-confirmation">Confirmação de senha</label>
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
