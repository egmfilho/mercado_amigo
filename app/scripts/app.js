'use strict';

angular.module('mercado_amigo.controllers', [ ]);

angular.module('mercado_amigo', [
		'ngAnimate',
		'ngRoute',
		'ngSanitize',
		'ngTouch',
		'mercado_amigo.controllers'
	])
	.config(['$locationProvider', function($locationProvider) {
		$locationProvider.hashPrefix('');
		// $locationProvider.html5Mode({
		// 	enabled: true,
		// 	requireBase: false
		// });
	}])
	.config(['$routeProvider', function($routeProvider) {

		$routeProvider
			.when('/', {
				name: 'home',
				templateUrl: 'views/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'home'
			})
			.when('/quem-somos', {
				name: 'quem-somos',
				templateUrl: 'views/quem-somos.html'
			})
			.when('/sistema', {
				name: 'sistema',
				templateUrl: 'views/sistema.html'
			})
			.otherwise({
				redirectTo: '/'
			});

	}])
	.run(['$rootScope', function($rootScope) {
		$rootScope.$on('$routeChangeSuccess', function(event, current, previous) {			
			var nav = jQuery('#navbar-collapse ul:first-child');
			if (!previous || !previous.name) {
				jQuery(nav).find('li').removeClass('active');				
			} else {
				jQuery(nav).find('li[name="' + previous.name + '"]').removeClass('active');
			}			

			jQuery('#navbar-collapse ul li[name="' + current.name + '"]').addClass('active');
		});
	}]);