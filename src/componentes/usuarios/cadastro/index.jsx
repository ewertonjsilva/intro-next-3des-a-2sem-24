'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

import { MdCheckCircle, MdError } from "react-icons/md";

import IconCad from '../../../../public/icones/cadastrar.svg';

import styles from './index.module.css';

// import { ufs, cidades } from '../../../mocks/dados';

import api from '@/services/api';

export default function CadUsuario() {

    const router = useRouter();
    const [ufs, setUfs] = useState([]);
    const [cidades, setCidades] = useState([]);

    // info
    const [usuario, setUsuario] = useState({
        usu_nome: '',
        usu_email: '',
        usu_senha: '',
        usu_dt_nasc: '',
        end_logradouro: '',
        end_num: '',
        end_bairro: '',
        end_complemento: '',
        cid_id: '0',
        cli_cel: '',
        uf: '0',
        confSenha: '',
    });

    const valDefault = styles.formControl;
    const valSucesso = styles.formControl + ' ' + styles.success;
    const valErro = styles.formControl + ' ' + styles.error;

    useEffect(() => {
        listaUfs();
    }, []);

    useEffect(() => {
        listaCidades();        
    }, [usuario.uf]);

    async function listaUfs() {
        try {
            const response = await api.get('/ufs');
            setUfs(response.data.dados);
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }
    }

    async function listaCidades() {
        if (usuario.uf) {
            const dados = {
                cid_uf: usuario.uf
            }
            try {
                const response = await api.post('/cidades', dados);
                setCidades(response.data.dados);
            } catch (error) {
                if (error.response) {
                    alert(error.response.data.mensagem + '\n' + error.response.data.dados);
                } else {
                    alert('Erro no front-end' + '\n' + error);
                }
            }
        }
    }

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
        } else if (usuario.cli_cel.length < 11) {
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
        itensValidados += validaUf();
        itensValidados += validaCidade();
        itensValidados += validaLogradouro();
        itensValidados += validaNumero();
        itensValidados += validaBairro();
        itensValidados += validaComplemento();
        itensValidados += validaCelular();
        itensValidados += validaSenha();
        itensValidados += validaConfSenha();

        // salvar quando atingir o número de itens a serem validados
        // alert(itensValidados);
        if (itensValidados === 12) {
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
            <div>
                <h2>Criar uma conta</h2>
            </div>
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

                    <div className={valida.nascimento.validado} id="valDtNasc">
                        <label className={styles.label}>Data de nascimento</label>
                        <div className={styles.divInput}>
                            <input
                                type="date"
                                name="usu_dt_nasc"
                                className={styles.input}
                                // onChange={v => setUsu_nome(v.target.value)}
                                onChange={handleChange}
                            // value={usu_nome}
                            />
                            <MdCheckCircle className={styles.sucesso} />
                            <MdError className={styles.erro} />
                        </div>
                        {
                            valida.nascimento.mensagem.map(mens => <small key={mens} id="nome" className={styles.small}>{mens}</small>)
                        }
                        {/* <small id="nome" className={styles.small}>{errNome}</small> */}
                    </div>
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
                                    ufs.map(uf => (
                                        <option key={uf.cid_uf} value={uf.cid_uf}>{uf.cid_uf}</option>
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

                <div className={valida.senha.validado} id="validaSn1">
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
                        // value={confSenha}
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
