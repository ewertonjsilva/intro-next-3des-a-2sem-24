'use client';

import { useState } from 'react';

import styles from './modalProdutos.module.css';

export default function ModalProdutos({ produto, onSave, onClose, titulo }) {
    const [formData, setFormData] = useState({
        prd_nome: produto?.prd_nome || '',
        prd_valor: produto?.prd_valor || '',
        prd_unidade: produto?.prd_unidade || '',
        prd_disponivel: produto?.prd_disponivel || '',
        prd_img: produto?.prd_img || '',
        prd_destaque: produto?.prd_destaque || '',
        prd_descricao: produto?.prd_descricao || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>{titulo}</h2>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="prd_nome"
                        value={formData.prd_nome}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Valor:
                    <input
                        type="number"
                        name="prd_valor"
                        value={formData.prd_valor}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Unidade:
                    <input
                        type="text"
                        name="prd_unidade"
                        value={formData.prd_unidade}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Descrição:
                    <textarea
                        name="prd_descricao"
                        value={formData.prd_descricao}
                        onChange={handleChange}
                    />
                </label>
                <div className={styles.ladolado}>
                    <label>
                        Disponível:
                        <input
                            type="checkbox"
                            name='prd_disponivel'
                            checked={formData.prd_disponivel}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Destaque:
                        <input
                            type="checkbox"
                            name='prd_destaque'
                            checked={formData.prd_destaque}
                            onChange={handleChange}
                        />
                    </label>
                </div>
                <button onClick={handleSubmit}>Salvar</button>
                <button onClick={onClose}>Cancelar</button>
            </div>
        </div>
    );
}