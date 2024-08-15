
import prod1 from '../../public/temp/hamburger-bacon.jpg';
import prod2 from '../../public/temp/hamburger-batata.jpg';
import prod3 from '../../public/temp/lanche1.jpg';
import prod4 from '../../public/temp/suco-laranja.jpg';
import prod5 from '../../public/temp/suco2.jpg';
import prod6 from '../../public/temp/sorvete.jpg'; 

import ic_lanche from '../../public/icones/lanche.svg';
import ic_combo from '../../public/icones/todos.svg';
import ic_bebida from '../../public/icones/suco.svg';
import ic_sobremesa from '../../public/icones/icecream.svg';

export let produtos = [
    {
        prd_id: 1,
        prd_nome: 'Hamburguer de Bacon',
        prd_img: prod1,
        prd_valor: '21.00',
        prd_descricao: 'Lanche maravilhoso',
        prd_unidade: 'un.',
        img_tp_prod: ic_lanche
    },
    {
        prd_id: 2,
        prd_nome: 'Combo hamburguer e batata',
        prd_img: prod2,
        prd_valor: '33.00',
        prd_descricao: 'Muito delicioso',
        prd_unidade: 'un.',
        img_tp_prod: ic_combo
    },
    {
        prd_id: 3,
        prd_nome: 'Lanche básico',
        prd_img: prod3,
        prd_valor: '16.00',
        prd_descricao: 'Para quem come pouco',
        prd_unidade: 'un.',
        img_tp_prod: ic_lanche
    },
    {
        prd_id: 4,
        prd_nome: 'Suco de laranja',
        prd_img: prod4,
        prd_valor: '8.25',
        prd_descricao: 'Refrescante',
        prd_unidade: 'copo',
        img_tp_prod: ic_bebida
    },
    {
        prd_id: 5,
        prd_nome: 'Suco verde',
        prd_img: prod5,
        prd_valor: '12.00',
        prd_descricao: 'Verdrescante',
        prd_unidade: 'copo',
        img_tp_prod: ic_bebida
    },
    {
        prd_id: 6,
        prd_nome: 'Sorvete',
        prd_img: prod6,
        prd_valor: '13.00',
        prd_descricao: 'Um sorvete aleatório',
        prd_unidade: 'taça',
        img_tp_prod: ic_sobremesa
    },
]