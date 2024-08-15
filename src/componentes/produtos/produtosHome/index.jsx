// import { useState } from 'react';

import styles from './index.module.css';

import CardProduto from '../card';

import { produtos } from '../../../mocks/dados';

export default function ProdutosHome() {
    return (
        <>
            <div className={styles.produtos}>
                {
                    produtos.map(
                        prd => {
                            return <CardProduto produto={prd} key={prd.prd_id} />
                        }
                    )
                }
            </div>
        </>
    );
}