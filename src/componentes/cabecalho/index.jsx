
import styles from './index.module.css';

export default function Cabecalho() {
    return (
        <header>            
            <nav class="containerNav">
                <div class="menu">
                    <div>
                        <span class="material-icons icon" id="logo">
                            fastfood
                        </span>
                        <label for="" id="titulo">BomBurguer</label>
                    </div>
                    <div class="menuGrande">
                        <a href="#" class="active">Home</a>
                        <a href="./paginas/produtos.html">Produtos</a>
                        <a href="./paginas/cadUsuario.html">Cadastrar</a>
                        <a href="./paginas/contato.html">Contato</a>
                        <a href="./paginas/login.html">Login</a>
                    </div>
                    <div class="menuMobile">
                        <a href="javascript:void(0);" class="icon" id="mIco">
                            <span class="material-icons icon" id="menu">
                                menu
                            </span>
                        </a>
                    </div>
                </div>
                <div class="menuMobileExpandidon" id="mostraOpMobile">
                    <a href="#" class="active">Home</a>
                    <a href="./paginas/produtos.html">Produtos</a>
                    <a href="./paginas/cadUsuario.html">Cadastrar</a>
                    <a href="./paginas/contato.html">Contato</a>
                    <a href="./paginas/login.html">Login</a>
                </div>
            </nav>
        </header>
    )
}