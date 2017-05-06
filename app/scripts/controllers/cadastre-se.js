'use strict';

angular.module('mercado_amigo.controllers')
.controller('CadastroCtrl', CadastroCtrl);

CadastroCtrl.$inject = ['$rootScope', '$scope', '$http', '$httpParamSerializerJQLike'];

function CadastroCtrl($rootScope, $scope, $http, $httpParamSerializerJQLike) {

	var self = this,		
	repetirEnderecoEntrega = true;

	this.api = '';
	this.uf_array = [];
	this.bank_array = [];

	(function obterEstados() {
		$rootScope.loading.load();
		$http({
			method: 'GET',
			url: self.api + 'api.php?action=get_ufs'
		}).then(function(success) {
			self.uf_array = [];
			angular.forEach(success.data.data, function(item) {				
				self.uf_array.push(item);
			});
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}());

	(function obterBancos() {
		$rootScope.loading.load();
		$http({
			method: 'GET',
			url: self.api + 'api.php?action=get_banks'
		}).then(function(success) {
			self.bank_array = [];
			angular.forEach(success.data.data, function(item) {				
				self.bank_array.push(item);
			});
			self.bank_array.sort(function compare(a, b) {
				if (parseInt(a.bank_code) < parseInt(b.bank_code))
					return -1;
				if (parseInt(a.bank_code) > parseInt(b.bank_code))
					return 1;
				return 0;
			});
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	}());

	self.dados = { };
	self.endereco = { };
	self.entrega = { };
	self.contato = { };
	self.bancario = { };
	// self.rede = { };

	function initDados() {
		self.dados = { 
			nome: '',
			cpf: '',
			rg: '',
			nascimento: '',
			sexo: ''
		};
	}

	function initEndereco() {
		self.endereco = {
			cep: '',
			cepBkp: '',
			estado: {
				id:'',
				uf:'',
				nome:''
			},
			cidade: {
				id:'',
				nome:''
			},
			bairro: {
				id:'',
				nome:''
			},
			logradouro: '',
			numero: '',
			complemento: '',
			city_array: [],
			district_array: []
		};
	}

	function initEntrega() {
		self.entrega = {
			cep: '',
			cepBkp: '',
			estado: {
				id:'',
				uf:'',
				nome:''
			},
			cidade: {
				id:'',
				nome:''
			},
			bairro: {
				id:'',
				nome:''
			},
			logradouro: '',
			numero: '',
			complemento: '',
			city_array: [],
			district_array: []
		};
	}

	function initContato() {
		self.contato = {
			email: '',
			telefone: '',
			cel1: {
				numero: '',
				operadora: '',
				whatsapp: ''
			},
			cel2: {
				numero: '',
				operadora: '',
				whatsapp: ''
			}
		};
	}

	function initBancario() {
		self.bancario = {
			banco: '',
			agencia: '',
			conta: '',
			tipo: ''
		};
	}

	function initRede() {
		self.rede = {
			nomeIndicador: '',
			cpfIndicador: '',
			nivel1: '',
			derramamento: ''
		};
	}

	(function init() {
		initDados();
		initEndereco();
		initEntrega();
		initContato();
		initBancario();
		// initRede();

		$scope.$watch(function(scope) {
			return self.endereco;
		}, function(newVal, oldVal) {
			if (repetirEnderecoEntrega) {
				angular.copy(newVal, self.entrega);
			}
		}, true);
	}());

	self.selecionaEstado = function(target,estado,address){
		// console.log(estado);
		target.estado.id = estado.uf_id;
		target.estado.uf = estado.uf_code;
		target.estado.nome = estado.uf_name;
		target.cidade = { id:'', nome:'' };
		target.bairro = { id:'', nome:'' };
		target.city_array = [];
		$rootScope.loading.load();
		$http({
			method: 'POST',
			url: self.api + 'api.php?action=get_citys',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike({
				'uf_id': estado.uf_id
			})
		}).then(function(success){			
			angular.forEach(success.data.data, function(item) {
				target.city_array.push(item);
				if( address != null && address.ibge == item.city_ibge){
					self.selecionaCidade(target,item,address);
				}
			});
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	};

	self.selecionaCidade = function(target,cidade,address){
		target.cidade.id = cidade.city_id;
		target.cidade.nome = cidade.city_name;
		target.bairro = { id:'', nome:'' };
		target.district_array = [];
		$rootScope.loading.load();
		$http({
			method: 'POST',
			url: self.api + 'api.php?action=get_districts',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike({
				'city_id': cidade.city_id
			})
		}).then(function(success){
			angular.forEach(success.data.data, function(item) {
				target.district_array.push(item);
				if( address != null && address.bairro == item.district_name){
					self.selecionaBairro(target,item);
					target.logradouro = address.logradouro;
					target.complemento = address.complemento;
				}
			});
			$rootScope.loading.unload();
		}, function(error) {
			console.log(error);
			$rootScope.loading.unload();
		});
	};

	self.selecionaBairro = function(target,bairro){
		target.bairro.id = bairro.district_id;
		target.bairro.nome = bairro.district_name;		
	};

	self.bindEnderecos = function(val) {
		repetirEnderecoEntrega = val;

		if (val) {
			angular.copy(self.endereco, self.entrega);
		} else {
			initEntrega();
		}
	};

	self.getCEP = function(target){
		if( target.cep && target.cep.length == 10){
			$rootScope.loading.load();
			$http({
				url: 'http://viacep.com.br/ws/'+target.cep.replace('.','')+'/json/',
				method: 'GET'
			}).then(function(success) {
				//console.log(success.data);
				target.cepBkp = target.cep;
				self.getUF(target,success.data);
				$rootScope.loading.unload();
				// jQuery('#modal-confirm').modal('show');
			}, function(error) {
				$rootScope.loading.unload();
				// jQuery('#modal-error').modal('show');
			});
		}
	}

	self.getUF = function(target,address){
		$rootScope.loading.load();
		$http({
			url: self.api + 'api.php?action=get_uf',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike({
				'uf_code': address.uf
			})
		}).then(function(success) {
			//console.log(success.data);
			self.selecionaEstado(target,success.data.data,address);
			// self.limpar();
			$rootScope.loading.unload();
			// jQuery('#modal-confirm').modal('show');
		}, function(error) {
			$rootScope.loading.unload();
			// jQuery('#modal-error').modal('show');
		});
	}

	function validarDados() {
		var flag = true;

		if (!self.dados.nome) {
			jQuery('input[ng-model="cadastro.dados.nome"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.cpf) {
			jQuery('input[ng-model="cadastro.dados.cpf"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.rg) {
			jQuery('input[ng-model="cadastro.dados.rg"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.nascimento) {
			jQuery('input[ng-model="cadastro.dados.nascimento"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.dados.sexo) {
			jQuery('.custom-select[name="selectSexo"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	};

	function validarEndereco() {
		var flag = true;

		if (!self.endereco.cep) {
			jQuery('input[ng-model="cadastro.endereco.cep"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.estado.nome) {
			jQuery('div[name="selectEstado"]').eq(0).css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.cidade.nome) {
			jQuery('div[name="selectCidade"]').eq(0).css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.bairro.nome) {
			jQuery('div[name="selectBairro"]').eq(0).css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.logradouro) {
			jQuery('input[ng-model="cadastro.endereco.logradouro"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.endereco.numero) {
			jQuery('input[ng-model="cadastro.endereco.numero"]').css('border', '1px solid red');
			flag = false;
		}
		console.log('Endereco: '+flag);
		return flag;
	}

	function validarEntrega() {
		var flag = true;

		if (!self.entrega.cep) {
			jQuery('input[ng-model="cadastro.entrega.cep"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.estado.nome) {
			jQuery('div[name="selectEstado"]').eq(1).css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.cidade.nome) {
			jQuery('div[name="selectCidade"]').eq(1).css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.bairro.nome) {
			jQuery('div[name="selectBairro"]').eq(1).css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.logradouro) {
			jQuery('input[ng-model="cadastro.entrega.logradouro"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.entrega.numero) {
			jQuery('input[ng-model="cadastro.entrega.numero"]').css('border', '1px solid red');
			flag = false;
		}
		console.log('\nEntrega: '+flag);
		return flag;
	}

	function validarContato() {
		var flag = true;

		if (!self.contato.email) {
			jQuery('input[ng-model="cadastro.contato.email"]').css('border', '1px solid red');
			flag = false;
		}

		// if (!self.contato.telefone) {
		// 	jQuery('input[ng-model="cadastro.contato.telefone"]').css('border', '1px solid red');
		// 	flag = false;
		// }

		if (!self.contato.cel1.numero) {
			jQuery('input[ng-model="cadastro.contato.cel1.numero"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.contato.cel1.operadora) {
			jQuery('input[ng-model="cadastro.contato.cel1.operadora"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.contato.cel1.whatsapp) {
			jQuery('.custom-select[name="cel1.whatsapp"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validarBancario() {
		var flag = true;

		if (!self.bancario.banco) {
			jQuery('.custom-select[name="selectBanco"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.bancario.agencia) {
			jQuery('input[ng-model="cadastro.bancario.agencia"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.bancario.conta) {
			jQuery('input[ng-model="cadastro.bancario.conta"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.bancario.tipo) {
			jQuery('.custom-select[name="tipo"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validarRede() {
		var flag = true;

		if (!self.rede.nivel1) {
			jQuery('.custom-select[name="nivel1"]').css('border', '1px solid red');
			flag = false;
		}

		if (!self.rede.derramamento) {
			jQuery('.custom-select[name="derramamento"]').css('border', '1px solid red');
			flag = false;
		}

		return flag;
	}

	function validar() {

		jQuery('input, .custom-select').css('border', 'none');

		var dados = validarDados(),
		endereco = validarEndereco(),
		entrega = validarEntrega(),
		contato = validarContato(),
		bancario = validarBancario(),
		rede = true;//validarRede();

		return (dados && endereco && entrega && contato && bancario && rede);
	}

	self.submit = function() {

		if (!validar()) {
			jQuery('#modal-warning').modal('show');
			return;
		};

		var data = {};
		delete self.endereco.city_array;
		delete self.endereco.district_array;
		delete self.entrega.city_array;
		delete self.entrega.district_array;
		
		data['dados'] = self.dados;
		data['enderecos_iguais'] = $scope.bind;
		data['endereco'] = self.endereco;
		data['entrega'] = self.entrega;
		data['contato'] = self.contato;
		data['bancario'] = self.bancario;
		data['rede'] = self.rede;
		
		$rootScope.loading.load();		
		$http({
			url: self.api + 'mail.php?action=register',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $httpParamSerializerJQLike(data)
		}).then(function(success) {
			self.limpar();
			$rootScope.loading.unload();
			jQuery('#modal-confirm').modal('show');
		}, function(error) {
			$rootScope.loading.unload();
			jQuery('#modal-error').modal('show');
		});
	};

	this.limpar = function() {
		initDados();
		initEndereco();
		initEntrega();
		initContato();
		initBancario();
		// initRede();
	}

	self.perguntar = function() {
		jQuery('#modal-perguntar').modal('show');
	};

}