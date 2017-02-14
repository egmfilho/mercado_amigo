'use strict';

angular.module('mercado_amigo.controllers')
	.controller('KitsCtrl', KitsCtrl);

function KitsCtrl() {

	this.array = [];

	this.array.push({
		nome: 'Kit 1',
		id: 'kit-1',
		itens: [
			'2 Açúcar refinado 1kg',
			'1 Feijão preto 1kg',
			'1 Água sanitária 1L',
			'1 Lã de aço',
			'1 Amaciante de roupa',
			'1 Macarrão espaguete',
			'1 Arroz 5kg',
			'1 Milho de pipoca',
			'1 Biscoito Cream Cracker',
			'1 Molho de Tomate',
			'1 Biscoito maisena',
			'1 Multi-uso',
			'1 Biscoito recheado',
			'1 Óleo de soja 1L',
			'1 Caldo de carne',
			'1 Papel higiênico',
			'1 Creme dental',
			'1 Pó de café 500g',
			'1 Desinfetante 500g',
			'1 Sabão em pó Omo 1kg',
			'1 Detergente',
			'2 Sabonete',
			'1 Esponja multi-uso',
			'1 Sal',
			'1 Farinha de trigo 1kg',
			'1 Tempeiro alho e sal'
		]
	});

	this.array.push({
		nome: 'Kit 2',
		id: 'kit-2',
		itens: [
			'4 Açucar refinado 1kg',
			'2 Arroz 5kg',
			'1 Farofa pronta',
			'2 Feijão preto 1kg',
			'1 Linguiça fina defumada',
			'2 Macarrão espaguete 500g',
			'1 Macarrão parafuso 500g',
			'2 Molho de tomate',
			'3 Óleo de soja 1L',
			'1 Pó de café 500g',
			'1 Sal',
			'1 Salsicha LT',
			'1 Tempeiro alho e sal'
		]
	});

	this.array.push({
		nome: 'Kit 3',
		id: 'kit-3',
		itens: [
			'2 Açucar refinado 1kg',
			'1 Arroz 5kg',
			'1 Biscoito Cream Cracker',
			'1 Biscoito maisena',
			'2 Biscoito recheado',
			'1 Biscoito wafer',
			'1 Caixa de leite 1L',
			'1 Caldo de carne',
			'1 Caldo de galinha',
			'1 Ervilha LT',
			'1 Farinha de trigo 1kg',
			'1 Feijão preto 1kg',
			'1 Filtro de café',
			'2 Gelatina',
			'1 Linguiça fina defumada',
			'1 Macarrão espaguete 500g',
			'1 Macarrão parafuso 500g',
			'1 Maionese',
			'1 Milho de pipoca',
			'1 Milho LT',
			'1 Molho de tomate',
			'2 Óleo de soja 1L',
			'1 Pó de café 500g',
			'1 Sal',
			'1 Salsicha LT',
			'1 Suco de caju',
			'1 Tempeiro alho e sal'
		]
	});

	this.array.push({
		nome: 'Kit 4',
		id: 'kit-4',
		itens: [
			'1 Achocolatado em pó 400g',
			'2 Achocolatado pronto',
			'1 Bala 150g',
			'1 Bala Finni',
			'1 Barra de chocolate',
			'2 Biscoito Elma Chips',
			'1 Biscoito Goiabinha',
			'3 Biscoito recheado',
			'1 Biscoito Wafer',
			'1 Biz caixa',
			'1 Bombom sortido',
			'1 Cereal matinal',
			'1 Club Social',
			'1 Leite em pó Ninho',
			'4 Macarrão instantâneo',
			'2 Mini bolo',
			'1 Ovomaltine',
			'3 Paçoca',
			'1 Pipoca de microondas'
		]
	});

	this.array.push({
		nome: 'Kit 5',
		id: 'kit-5',
		itens: [
			'1 Água sanitária 1L',
			'1 Álcool',
			'1 Alvejante 400g',
			'1 Amaciante de roupa 2L',
			'1 Cloro em gel',
			'1 Desinfetante 500ml',
			'2 Detergente',
			'1 Esponja multi-uso',
			'2 Flanela',
			'1 Lã de aço',
			'1 Limpador perfumado',
			'1 Lustra móveis',
			'1 Multi-uso',
			'1 Pano de chão',
			'1 Sabão de coco',
			'1 Sabão em pó Omo 1kg',
			'1 Sabão pastoso',
			'1 Saco de lixo 100L',
			'1 Saco de lixo 30L',
			'1 Saponáceo'
		]
	});

	this.array.push({
		nome: 'Kit 6',
		id: 'kit-6',
		itens: [
			'1 Algodão 25g',
			'1 Algodão em disco',
			'1 Bucha de banho',
			'1 Condicionador + shampoo',
			'2 Creme dental',
			'1 Desodorante aerosol',
			'1 Enxaguante bucal',
			'2 Escova dental',
			'1 Hastes flexíveis 75uni',
			'1 Lenço de papel 10 folhas',
			'1 Papel higiênico',
			'1 Aparelho de barbear',
			'4 Sabonete',
			'1 Sabonete líquido',
			'1 Talco para pés'
		]
	});
}