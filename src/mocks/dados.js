
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

import img_ingredientes from '../../public/temp/ingredientes.png'; 

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

export let estados = [
    {
        cid_uf: 'SP',
    },
    {
        cid_uf: 'RJ'
    }
]

export let cidades = [
    {
        cid_id: 1,
        cid_nome: 'Tupã'
    },
    {
        cid_id: 2,
        cid_nome: 'Parapuã'
    },
    {
        cid_id: 3,
        cid_nome: 'Marília'
    },
];

export let carrinho = [
    {
        prd_id: 1,
        prd_nome: 'Hamburguer de Bacon',
        prd_img: prod1,
        ppd_qtd: 2,
        prd_valor: '21.00',
        ppd_obs: 'Hamburguer bem passado'
    },
    {
        prd_id: 1,
        prd_nome: 'Hamburguer de Bacon',
        prd_img: prod1,
        ppd_qtd: 1,
        prd_valor: '21.00',
        ppd_obs: ''
    },
    {
        prd_id: 4,
        prd_nome: 'Suco de laranja',
        prd_img: prod4,
        ppd_qtd: 1,
        prd_valor: '8.25',
        ppd_obs: 'Sem açucar'
    },
    {
        prd_id: 4,
        prd_nome: 'Suco de laranja',
        prd_img: prod4,
        ppd_qtd: 2,
        prd_valor: '8.25',
        ppd_obs: 'Com açucar e gelo'
    },
]

export let mesas = [
    {
        "mes_id": 1,
        "mes_nome": "1",
        "mes_status": 1,
        "mes_lugares": 4,
        "ped_id": null
    },
    {
        "mes_id": 2,
        "mes_nome": "2",
        "mes_status": 0,
        "mes_lugares": 2,
        "ped_id": null
    },
    {
        "mes_id": 3,
        "mes_nome": "3",
        "mes_status": 0,
        "mes_lugares": 2,
        "ped_id": null
    },
    {
        "mes_id": 4,
        "mes_nome": "4",
        "mes_status": 2,
        "mes_lugares": 4,
        "ped_id": null
    },
    {
        "mes_id": 5,
        "mes_nome": "5",
        "mes_status": 2,
        "mes_lugares": 4,
        "ped_id": 5
    }
];

export let ingredientesMock = [
    {
        "ing_id": 1,
        "ing_nome": "Pão",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 0.00
    },
    {
        "ing_id": 2,
        "ing_nome": "Frango",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 7.00
    },
    {
        "ing_id": 3,
        "ing_nome": "Salmão",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 10.00
    },
    {
        "ing_id": 4,
        "ing_nome": "Alface",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 4.50
    },
    {
        "ing_id": 5,
        "ing_nome": "Rúcula",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 4.00
    },
    {
        "ing_id": 6,
        "ing_nome": "Tomate",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 5.25
    },
    {
        "ing_id": 7,
        "ing_nome": "Ervilha",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 6.00
    },
    {
        "ing_id": 8,
        "ing_nome": "Milho",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 5.00
    },
    {
        "ing_id": 9,
        "ing_nome": "Pepino",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 4.50
    },
    {
        "ing_id": 10,
        "ing_nome": "Cebola",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 4.00
    },
    {
        "ing_id": 11,
        "ing_nome": "Cebola Roxa",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 4.80
    },
    {
        "ing_id": 12,
        "ing_nome": "Aspargo",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 5.90
    },
    {
        "ing_id": 13,
        "ing_nome": "Batata",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 25.40
    },
    {
        "ing_id": 14,
        "ing_nome": "Uva",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 0.00
    },
    {
        "ing_id": 15,
        "ing_nome": "Abacaxi",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 0.00
    },
    {
        "ing_id": 16,
        "ing_nome": "Limão",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 0.00
    },
    {
        "ing_id": 17,
        "ing_nome": "Laranja",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 0.00
    },
    {
        "ing_id": 18,
        "ing_nome": "Bacon",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 6.00
    },
    {
        "ing_id": 19,
        "ing_nome": "Couve",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 5.00
    },
    {
        "ing_id": 20,
        "ing_nome": "Carne bovina",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 8.00
    },
    {
        "ing_id": 21,
        "ing_nome": "Carne suína",
        "ing_img": img_ingredientes,
        "ing_custo_adicional": 7.00
    }
    // Adicione mais ingredientes para teste
];