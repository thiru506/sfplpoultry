var app=angular.module('sbAdminApp');

app.config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {
    
	$ocLazyLoadProvider.config({debug:false,events:true});

    $urlRouterProvider.otherwise('/dashboard/home');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'sbAdminApp',
                    files:[
                    'res/scripts/directives/header/header.js',
                    'res/scripts/directives/header/header-notification/header-notification.js',
                    'res/scripts/directives/sidebar/sidebar.js',
                    'res/scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["res/libs/angular-toggle-switch.min.js",
                          "res/css/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['res/libs/angular-animate.js']
                })
                																
                
            }
        }
    })
    .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'sbAdminApp',
              files:[
              'res/scripts/directives/timeline/timeline.js',
              'res/scripts/directives/notifications/notifications.js',
              'res/scripts/directives/chat/chat.js',
              'res/scripts/directives/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
   .state('dashboard.addUser',{
    	   controller: 'AddUserCtrl',
    	   resolve: {},
    	   templateUrl:'views/adduser.html',
    	   url:'/addUser'
   })
   .state('dashboard.user',{
    	   controller: 'UserCtrl',
    	   resolve: {
    		   users : ['$http','$rootScope',function($http,$rootScope){return $http.get('user/all/'+$rootScope.userInfo.id).then(function(resp){ return resp.data})}]
     	   },
    	   templateUrl:'views/users.html',
    	   url:'/users'
   })
    .state('dashboard.edituser',{
       templateUrl:'views/edituser.html',
       url:'/user/edit/:id',
       params: { 
			id:null
		},
       resolve: {
  				user:['$http','$rootScope','$stateParams',function($http,$rootScope,$stateParams){return $http.get('user/getuser/'+$rootScope.userInfo.id+'/'+ $stateParams.id).then(function(resp) { return resp.data; });}],
  	   },
       controller:'UserEditCtrl'
    })
    .state('dashboard.companyMaster',{
       templateUrl:'views/companyMaster.html',
       url:'/CompanyMaster',
        resolve: {
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){console.log(resp.data); return resp.data})}]
   	   },
       controller:'CompanyMasterCtrl'
    })
    .state('dashboard.editCompany',{
        templateUrl:'views/editCompany.html',
        url:'/company/edit/:id',
        params: { 
 			id:null
 		},
        resolve: {
     				company:['$http','$rootScope','$stateParams',function($http,$rootScope,$stateParams){return $http.get('companies/getCompany/'+$rootScope.userInfo.id+'/'+ $stateParams.id).then(function(resp) { return resp.data; });}],
   	   },
        controller:'CompanyEditCtrl'
     })
     .state('dashboard.addCompany',{
  	   controller: 'addCompanyCtrl',
  	   resolve: {},
  	   templateUrl:'views/addCompany.html',
  	   url:'/addCompany'
     })
     .state('dashboard.divisionMaster',{
         templateUrl:'views/divisionMaster.html',
         url:'/divisionMaster',
          resolve: {
   		   divisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('divisions/all').then(function(resp){console.log(resp.data); return resp.data})}]
     	   },
         controller:'DivisionMasterCtrl'
      })
      .state('dashboard.addDivision',{
  	   controller: 'addDivisionCtrl',
  	   resolve: {
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){console.log(resp.data); return resp.data})}]
  	   },
  	   templateUrl:'views/addDivision.html',
  	   url:'/addDivision'
     })
     .state('dashboard.subDivisionMaster',{
         templateUrl:'views/subDivisionMaster.html',
         url:'/subDivisionMaster',
          resolve: {
    		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){console.log(resp.data); return resp.data})}],
    		   divisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('divisions/all').then(function(resp){console.log(resp.data); return resp.data})}],
    		   subdivisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('subdivisions/all').then(function(resp){console.log('sub',resp.data); return resp.data})}]

     	   },
         controller:'subDivisionMasterCtrl'
      })
      .state('dashboard.addSubDivision',{
  	   controller: 'addSubDivisionCtrl',
  	   resolve: {
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){console.log(resp.data); return resp.data})}],
 		   divisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('divisions/all').then(function(resp){console.log(resp.data); return resp.data})}]

  	   },
  	   templateUrl:'views/addSubDivision.html',
  	   url:'/addSubDivision'
     })
     
}]);