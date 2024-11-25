'use client';

import { useState } from 'react';

import api from '@/services/api';

import styles from './modalIngredientes.module.css';

export default function ModalProdutos({ ingrediente, onSave, onClose, titulo }) {
    const [formData, setFormData] = useState({
        ing_nome: '',
        ing_img: '',
        ing_custo_adicional: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEnviaImg = (e) => {
        setFormData((prev) => ({ ...prev, ing_img: e.target.files[0] }));
    };

    const handleSubmit = async () => {
        // onSave(formData);
        const formDataImg = new FormData();
        formDataImg.append('img', formData.ing_img); 

        try {
            let confirmaEnvioImg;
            const response = await api.post('/ingredientes-img', formDataImg);
            confirmaEnvioImg = response.data.sucesso;
            if (confirmaEnvioImg) {
                alert('upload realizado com sucesso') 
                console.log(response.data.dados);
                
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.mensagem + '\n' + error.response.data.dados);
            } else {
                alert('Erro no front-end' + '\n' + error);
            }
        }        
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>{titulo}</h2>
                <label>
                    Nome:
                    <input
                        type="text"
                        name="ing_nome"
                        value={formData.ing_nome}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Custo do adicional:
                    <input
                        type="number"
                        name="ing_custo_adicional"
                        value={formData.ing_custo_adicional}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Imagem:
                    <input
                        type="file"
                        accept="image/*"
                        // onChange={handleImageUpload}
                        name="prd_unidade"
                        value={formData.prd_unidade}
                        onChange={handleEnviaImg}
                    />
                </label>

                <div className={styles.modalActions}>
                    <button className={styles.saveButton} onClick={handleSubmit}>Salvar</button>
                    <button className={styles.closeButton} onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

