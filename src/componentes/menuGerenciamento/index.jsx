'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './index.module.css';

export default function MenuGerenciamento() {

    const rota = usePathname();

    return (
        <div className={styles.containerMenuGerenciamento}>
            <Link
                href='/gerenciamento/produtos'
                className={rota === '/gerenciamento/produtos' ? styles.active : ''}
            >Produtos Venda</Link>
            <Link
                href='/gerenciamento/mesas'
                className={rota === '/gerenciamento/mesas' ? styles.active : ''}
            >Mesas</Link>
            <Link
                href='/gerenciamento/funcionarios'
                className={rota === '/gerenciamento/funcionarios' ? styles.active : ''}
            >Funcionários</Link>            
            <Link
                href='/gerenciamento/ingredientes'
                className={rota === '/gerenciamento/ingredientes' ? styles.active : ''}
            >Ingredientes</Link>
        </div>
    );
}
