'use client';

import { useState } from 'react';

import styles from './modalMesas.module.css';

export default function ModalMesas({ onClose }) {
    const [dados, setDados] = useState({
        mes_nome: '',
        mes_lugares: 1
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        // valida
        // onSave(formData);
        onClose();
    }; 

    function handleValida() {
        let validado = true; 
        if (dados.mes_nome == '') {
            alert('O nome da mesa deve ser preenchido!'); 
            validado = false;
        }
        if (dados.mes_lugares < 1) {
            alert('A mesa deve ter no minimo um lugar!')
            validado = false;
        }
        return validado;
    }

    async function handleCadMesa() {
        const validacao = handleValida();
        if (validacao === true) {
            try {
                let confirmaCad;
                const response = await api.post('/mesas', dados);
                confirmaCad = response.data.sucesso;
                if (confirmaCad) {
                    onClose();
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
        <div className={styles.modal}>
            <div className={styles.modalContent}>                
                <label>
                    Nome da mesa:
                    <input
                        type="text"
                        name="mes_nome"
                        value={dados.mes_nome}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Nº de lugares:
                    <input
                        type="number"
                        name="mes_lugares"
                        value={dados.mes_lugares}
                        onChange={handleChange}
                    />
                </label>
                <div className={styles.modalActions}>
                    <button className={styles.saveButton} onClick={() => handleCadMesa()}>Salvar</button>
                    <button className={styles.closeButton} onClick={onClose}>Cancelar</button>
                </div>                
            </div>
        </div>
    );
}