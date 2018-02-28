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
    .state('dashboard.mainHome',{
        url:'/testttt',
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
  .state('dashboard.home',{
    	   controller: 'HomeCtrl',
    	   resolve: {
    		   capexs : ['$http','$rootScope',function($http,$rootScope){return $http.get('capex/all/'+$rootScope.userInfo.id).then(function(resp){console.log(resp.data); return resp.data})}],
     		   
    	   },
    	   templateUrl:'views/mainHome.html',
    	   url:'/home'
   })
   .state('dashboard.addUser',{
    	   controller: 'AddUserCtrl',
    	   resolve: {
    		   users : ['$http','$rootScope',function($http,$rootScope){return $http.get('user/all/'+$rootScope.userInfo.id).then(function(resp){ return resp.data})}]
    	   },
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
     		   users : ['$http','$rootScope',function($http,$rootScope){return $http.get('user/all/'+$rootScope.userInfo.id).then(function(resp){ return resp.data})}]

  	   },
       controller:'UserEditCtrl'
    })
    .state('dashboard.companyMaster',{
       templateUrl:'views/companyMaster.html',
       url:'/CompanyMaster',
        resolve: {
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){  return resp.data})}]
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
   		   divisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('divisions/all').then(function(resp){  return resp.data})}]
     	   },
         controller:'DivisionMasterCtrl'
      })
      .state('dashboard.addDivision',{
  	   controller: 'addDivisionCtrl',
  	   resolve: {
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){  return resp.data})}]
  	   },
  	   templateUrl:'views/addDivision.html',
  	   url:'/addDivision'
     })
     .state('dashboard.editDivision',{
        templateUrl:'views/editDivision.html',
        url:'/division/edit/:id',
        params: { 
 			id:null
 		},
        resolve: {
			division:['$http','$rootScope','$stateParams',function($http,$rootScope,$stateParams){return $http.get('divisions/getDivision/'+$rootScope.userInfo.id+'/'+ $stateParams.id).then(function(resp) {console.log(resp.data); return resp.data; });}],
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){  return resp.data})}],     				
   	   },
        controller:'DivisionEditCtrl'
     })
      .state('dashboard.subDivisionMaster',{
         templateUrl:'views/subDivisionMaster.html',
         url:'/subDivisionMaster',
          resolve: {
    		   subdivisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('subdivisions/all').then(function(resp){ return resp.data})}]

     	   },
         controller:'subDivisionMasterCtrl'
      })
      .state('dashboard.addSubDivision',{
  	   controller: 'addSubDivisionCtrl',
  	   resolve: {
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){  return resp.data})}],
 		   divisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('divisions/all').then(function(resp){  return resp.data})}]
  	   },
  	   templateUrl:'views/addSubDivision.html',
  	   url:'/addSubDivision'
     })
      .state('dashboard.editSubDivision',{
        templateUrl:'views/editSubDivision.html',
        url:'/subdivision/edit/:id',
        params: { 
 			id:null
 		},
        resolve: {
			subdivision:['$http','$rootScope','$stateParams',function($http,$rootScope,$stateParams){return $http.get('subdivisions/getSubDivision/'+$rootScope.userInfo.id+'/'+ $stateParams.id).then(function(resp) {console.log(resp.data); return resp.data; });}],
 		   divisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('divisions/all').then(function(resp){  return resp.data})}]
   	   },
        controller:'SubDivisionEditCtrl'
     })

      .state('dashboard.unitMaster',{
         templateUrl:'views/unitMaster.html',
         url:'/unitMaster',
          resolve: {
    		   units : ['$http','$rootScope',function($http,$rootScope){return $http.get('units/all').then(function(resp){ return resp.data})}]

     	   },
         controller:'unitMasterCtrl'
      })
      .state('dashboard.addUnit',{
  	   controller: 'addUnitCtrl',
  	   resolve: {
 		   companies : ['$http','$rootScope',function($http,$rootScope){return $http.get('companies/all').then(function(resp){  return resp.data})}],
 		   divisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('divisions/all').then(function(resp){  return resp.data})}],
 		   subdivisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('subdivisions/all').then(function(resp){  return resp.data})}],
  		   facilities : ['$http','$rootScope',function($http,$rootScope){return $http.get('facilities/all').then(function(resp){return resp.data})}],
  		   buildings : ['$http','$rootScope',function($http,$rootScope){return $http.get('buildings/all').then(function(resp){return resp.data})}],
  		 coldRooms : ['$http','$rootScope',function($http,$rootScope){return $http.get('coldRoom/all').then(function(resp){return resp.data})}],
  		 staffQuarters : ['$http','$rootScope',function($http,$rootScope){return $http.get('staffQuarters/all').then(function(resp){return resp.data})}],
   		   sheds : ['$http','$rootScope',function($http,$rootScope){return $http.get('sheds/all').then(function(resp){return resp.data})}],
  		   locations : ['$http','$rootScope',function($http,$rootScope){return $http.get('locations/all').then(function(resp){return resp.data})}],
  		   locationNames : ['$http','$rootScope',function($http,$rootScope){return $http.get('locationName/all').then(function(resp){return resp.data})}],


  	   },
  	   templateUrl:'views/addUnit.html',
  	   url:'/addUnit'
     })
     .state('dashboard.assetClass',{
  	   controller: 'assetClassCtrl',
  	   resolve: {
   		   assetClasses : ['$http','$rootScope',function($http,$rootScope){return $http.get('assetClass/all').then(function(resp){return resp.data})}]
  	   },
  	   templateUrl:'views/assetClass.html',
  	   url:'/assetClass'
     })
     .state('dashboard.assetCategories',{
  	   controller: 'assetCategoriesCtrl',
  	   resolve: {
   		   assetClasses : ['$http','$rootScope',function($http,$rootScope){return $http.get('assetClass/all').then(function(resp){console.log('classes',resp.data); return resp.data})}],
   		   assetCategories: ['$http','$rootScope',function($http,$rootScope){return $http.get('assetCategories/all').then(function(resp){console.log('categories',resp.data); return resp.data})}]
   	   },
  	   templateUrl:'views/assetCategories.html',
  	   url:'/assetCategories'
     })
     .state('dashboard.capexReg',{
  	   controller: 'capexRegCtrl',
  	   resolve: { 
 		   subdivisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('subdivisions/all').then(function(resp){  return resp.data})}],
		   units : ['$http','$rootScope',function($http,$rootScope){return $http.get('units/all').then(function(resp){return resp.data})}],
   		   assetCategories: ['$http','$rootScope',function($http,$rootScope){return $http.get('assetCategories/all').then(function(resp){return resp.data})}],
  		   uoms : ['$http','$rootScope',function($http,$rootScope){return $http.get('uom/all').then(function(resp){return resp.data})}],
   		   assetClasses : ['$http','$rootScope',function($http,$rootScope){return $http.get('assetClass/all').then(function(resp){return resp.data})}],
  		   departments : ['$http','$rootScope',function($http,$rootScope){return $http.get('departments/all').then(function(resp){return resp.data})}],


  	   },
  	   templateUrl:'views/capexRegistration.html',
  	   url:'/capexBudgetForm'
     })
     .state('dashboard.sheds',{
  	   controller: 'shedsCtrl',
  	   resolve: { 
   		   sheds : ['$http','$rootScope',function($http,$rootScope){return $http.get('sheds/all').then(function(resp){return resp.data})}],
  	   },
  	   templateUrl:'views/sheds.html',
  	   url:'/sheds'
     })
     .state('dashboard.staffQuarters',{
  	   controller: 'staffQuartersCtrl',
  	   resolve: {
  		 staffQuarters : ['$http','$rootScope',function($http,$rootScope){return $http.get('staffQuarters/all').then(function(resp){return resp.data})}],
  	   },
  	   templateUrl:'views/staffQuarters.html',
  	   url:'/staffQuarters'
     })
     .state('dashboard.coldRoom',{
  	   controller: 'coldRoomCtrl',
  	   resolve: {
  		 coldRooms : ['$http','$rootScope',function($http,$rootScope){return $http.get('coldRoom/all').then(function(resp){return resp.data})}],
  	   },
  	   templateUrl:'views/coldRoom.html',
  	   url:'/coldRoom'
     })
     .state('dashboard.buildings',{
  	   controller: 'buildingsCtrl',
  	   resolve: {  
  		   buildings : ['$http','$rootScope',function($http,$rootScope){return $http.get('buildings/all').then(function(resp){return resp.data})}],
  	   },
  	   templateUrl:'views/buildings.html',
  	   url:'/buildings'
     })
     .state('dashboard.facilities',{
    	   controller: 'facilitiesCtrl',
      	   resolve: {
      		   facilities : ['$http','$rootScope',function($http,$rootScope){return $http.get('facilities/all').then(function(resp){return resp.data})}],
      	   },
      	   templateUrl:'views/facilities.html',
      	   url:'/facilities'
     })
     .state('dashboard.locations',{
    	   controller: 'locationsCtrl',
      	   resolve: {
      		   locations : ['$http','$rootScope',function($http,$rootScope){return $http.get('locations/all').then(function(resp){return resp.data})}],
      	   },
      	   templateUrl:'views/locations.html',
      	   url:'/locations'
     })
     .state('dashboard.locationNames',{
    	   controller: 'locationNameCtrl',
      	   resolve: {
      		   locationNames : ['$http','$rootScope',function($http,$rootScope){return $http.get('locationName/all').then(function(resp){return resp.data})}],
      	   },
      	   templateUrl:'views/locationNames.html',
      	   url:'/locationNames'
     })
     .state('dashboard.uom',{
    	   controller: 'uomCtrl',
      	   resolve: {
      		   uoms : ['$http','$rootScope',function($http,$rootScope){return $http.get('uom/all').then(function(resp){return resp.data})}],
      	   },
      	   templateUrl:'views/uom.html',
      	   url:'/unitsOfMeasurement'
     })
      .state('dashboard.viewUnit',{
       templateUrl:'views/viewUnit.html',
       url:'/unit/view/:id',
       params: { 
			id:null
		},
       resolve: {
  				unit:['$http','$rootScope','$stateParams',function($http,$rootScope,$stateParams){return $http.get('units/getUnit/'+$rootScope.userInfo.id+'/'+ $stateParams.id).then(function(resp) {  return resp.data; });}],
  	   },
       controller:'unitViewCtrl'
    })
    .state('dashboard.hods',{
    	   controller: 'hodCtrl',
      	   resolve: {
      		   hods : ['$http','$rootScope',function($http,$rootScope){return $http.get('hods/all').then(function(resp){return resp.data})}],
      	   },
      	   templateUrl:'views/hodMaster.html',
      	   url:'/HODMaster'
     })
     .state('dashboard.managers',{
    	   controller: 'managerCtrl',
      	   resolve: {
      		   managers : ['$http','$rootScope',function($http,$rootScope){return $http.get('managers/all').then(function(resp){return resp.data})}],
      	   },
      	   templateUrl:'views/managerMaster.html',
      	   url:'/managerMaster'
     })
     
     .state('dashboard.departments',{
  	   controller: 'departmentCtrl',
    	   resolve: {
    		   departments : ['$http','$rootScope',function($http,$rootScope){return $http.get('departments/all').then(function(resp){return resp.data})}],
    	   },
    	   templateUrl:'views/departments.html',
    	   url:'/Departments'
   })
      .state('dashboard.viewBudgetForm',{
       templateUrl:'views/viewBudgetForm.html',
       url:'/budget/view/:id',
       params: { 
			id:null
		},
       resolve: {
  				budget : ['$http','$rootScope','$stateParams',function($http,$rootScope,$stateParams){return $http.get('capex/getCapex/'+$rootScope.userInfo.id+'/'+ $stateParams.id).then(function(resp) { console.log(resp.data); return resp.data; });}],
  	   },
       controller:'budgetViewCtrl'
    })
    .state('dashboard.editBudget',{
        templateUrl:'views/editBudget.html',
        url:'/budget/edit/:id',
        params: { 
 			id:null
 		},
        resolve: {
   				budget : ['$http','$rootScope','$stateParams',function($http,$rootScope,$stateParams){return $http.get('capex/getCapex/'+$rootScope.userInfo.id+'/'+ $stateParams.id).then(function(resp) { console.log(resp.data); return resp.data; });}],
   	 		   subdivisions : ['$http','$rootScope',function($http,$rootScope){return $http.get('subdivisions/all').then(function(resp){  return resp.data})}],
   			   units : ['$http','$rootScope',function($http,$rootScope){return $http.get('units/all').then(function(resp){return resp.data})}],
   	   		   assetCategories: ['$http','$rootScope',function($http,$rootScope){return $http.get('assetCategories/all').then(function(resp){return resp.data})}],
   	  		   uoms : ['$http','$rootScope',function($http,$rootScope){return $http.get('uom/all').then(function(resp){return resp.data})}],
   	   		   assetClasses : ['$http','$rootScope',function($http,$rootScope){return $http.get('assetClass/all').then(function(resp){return resp.data})}],
   	  		   departments : ['$http','$rootScope',function($http,$rootScope){return $http.get('departments/all').then(function(resp){return resp.data})}],

   	   },
        controller:'budgetEditCtrl'
     })

}]);