'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import carr from '../../../../public/icones/carrinho.svg';
import api from '@/services/api';

import styles from './index.module.css';

// import { produtos} from '../../../mocks/dados';

function Produto({ idProduto }) {

    const [produto, setProduto] = useState({
        "prd_id": "",
        "prd_nome": "",
        "prd_valor": "",
        "prd_unidade": "",
        "ptp_icone": "",
        "prd_img": "",
        "prd_descricao": ""
    });
    const [qtd, setQtd] = useState(1);
    const [total, setTotal] = useState(0);

    const router = useRouter();
    const user = JSON.parse(localStorage.getItem('user'));  
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiPorta = process.env.NEXT_PUBLIC_API_PORTA;

    const imageLoader = ({ src, width, quality }) => {
        console.log(`${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`);
        return `${apiUrl}:${apiPorta}${src}?w=${width}&q=${quality || 75}`
    }

    useEffect(() => {
              
        handleCarregaProduto();
        setTotal(produto.prd_valor);

        async function handleCarregaProduto() {
            const dadosApi = {
                prd_id: idProduto
            }
            try {
                const response = await api.post('/listaprodutos', dadosApi);
                const confirmaAcesso = response.data.sucesso;
                if (confirmaAcesso) {
                    const produtoApi = response.data.dados[0];
                    if (response.data.dados.length > 0) {
                        setProduto(produtoApi);
                    }
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

    function handleAtlQtdVlr(nvVlr) {
        let totalTemp = 0;
        totalTemp = Number(nvVlr) * produto.prd_valor;
        setQtd(Number(nvVlr));
        setTotal(totalTemp.toFixed(2));
    }

    function handleAddItemCarrinho() {
        if (user) {
            router.push('/carrinho');
        } else {
            router.push('/usuarios/login');
        }
    }

    return (
        <div className={styles.container}>
            {
                produto.prd_id !== '' ?
                    <>
                        <div className={styles.containerItem}>
                            <Image
                                loader={imageLoader}
                                className={styles.imagemProd}
                                src={produto.prd_img}
                                alt={"Imagem " + produto.prd_nome} 
                                width={200}
                                height={200}                              
                            />
                        </div>
                        <div className={styles.containerItem}>
                            <div className={styles.titulo}>
                                <h1>{produto.prd_nome}</h1>
                                <Image 
                                    loader={imageLoader}                                     
                                    className={styles.icon} 
                                    src={produto.ptp_icone} 
                                    alt={produto.ptp_icone} 
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <span className={styles.descricao}>{produto.prd_descricao}</span>
                            <span className={styles.valor}>{'R$ ' + produto.prd_valor}</span>
                            <div className={styles.comprar}>
                                <span className={styles.spanQtd}>Quantidade</span>
                                <input
                                    type="number"
                                    className={styles.input}
                                    min={1}
                                    onChange={nvVlr => handleAtlQtdVlr(nvVlr.target.value)}
                                    value={qtd}
                                />
                                <span className={styles.spanTt}>Total R$ {total}</span>
                                <button className={styles.button} onClick={() => handleAddItemCarrinho()}>
                                    <p className={styles.lblComp}>Inserir no carrinho</p>
                                    <Image className={styles.imgBtn} src={carr} alt="adicionar" />
                                </button>
                            </div>
                        </div>
                    </>
                    :
                    <h1>Não há resultados para a requisição</h1>
            }
        </div>
    );
}

export default Produto;