
import { produtos } from '../../../mocks/dados';
import Produto from '@/componentes/produtos/produto';

export default function ProdutoID({ params }) {

    const produto = produtos.filter((prd, index, array) => prd.prd_id === parseInt(params.id));

    return (

        <Produto produto={produto[0]} />

    );
}