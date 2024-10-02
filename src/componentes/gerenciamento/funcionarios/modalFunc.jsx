'use client'
import { useState } from 'react';
import styles from './modalFunc.module.css';

const ModalFuncionarios = ({ user, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        usu_nome: user?.usu_nome || '',
        usu_email: user?.usu_email || '',
        usu_cpf: user?.usu_cpf || '',
        usu_senha: '',
        usu_tipo: user?.usu_tipo || 0,
        usu_ativo: user?.usu_ativo || 1,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{user ? 'Editar Usuário' : 'Adicionar Usuário'}</h2>
                <form>
                    <label>
                        Nome:
                        <input
                            type="text"
                            name="usu_nome"
                            value={formData.usu_nome}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="usu_email"
                            value={formData.usu_email}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        CPF:
                        <input
                            type="text"
                            name="usu_cpf"
                            value={formData.usu_cpf}
                            onChange={handleChange}
                            disabled={!!user}
                        />
                    </label>
                    <label>
                        Senha:
                        <input
                            type="password"
                            name="usu_senha"
                            value={formData.usu_senha}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Tipo:
                        <input
                            type="number"
                            name="usu_tipo"
                            value={formData.usu_tipo}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Ativo:
                        <input
                            type="checkbox"
                            name="usu_ativo"
                            checked={formData.usu_ativo}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, usu_ativo: e.target.checked }))
                            }
                        />
                    </label>
                </form>
                <div className={styles.modalActions}>
                    <button className={styles.saveButton} onClick={handleSubmit}>
                        Salvar
                    </button>
                    <button className={styles.closeButton} onClick={onClose}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalFuncionarios;
