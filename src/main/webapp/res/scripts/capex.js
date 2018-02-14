'use strict';



angular.module('sbAdminApp')


.controller('MainCtrl', function($scope,$position) {
	
})
.controller('confirmCtrl',['$scope','modals',function($scope,modals) {
	var params = modals.params();
	$scope.message = ( params.message || "Are you sure?" );
	$scope.confirmButton = ( params.confirmButton || "Yes" );
    $scope.denyButton = ( params.denyButton || "No" );
    $scope.confirm = modals.resolve;
    $scope.deny = modals.reject;
}])	
.controller('unitMasterCtrl',['$scope',"$rootScope",'modals','units','$http','$state', function($scope,$rootScope,modals,units,$http,$state) {
	$scope.form={};
	$scope.units=units;
	$scope.pagi=$rootScope.pagination.init($scope.units);

	
 	
}])
.controller('capexRegCtrl',['$scope',"$rootScope",'modals','$http','$state', function($scope,$rootScope,modals,$http,$state) {
  
	
 	
}])
.controller('addUnitCtrl',['$scope',"$rootScope",'companies','modals','divisions','subdivisions','$http','$state', function($scope,$rootScope,companies,modals,divisions,subdivisions,$http,$state) {
	$scope.form={};
	$scope.companies=companies;
	$scope.divisons=divisions;	
	$scope.subdivisons=subdivisions;	
	console.log('sub divi',$scope.subdivisons);
	$scope.changeSubDivision=function(){
 		$scope.form.subDivisionMaster=$rootScope.getById(subdivisions,$scope.subdivi);
		console.log('form-sub',$scope.form.subDivisionMaster);
	}
 	
	$scope.addUnit=function(){
   
  			$http.post('units/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Unit Added Successfully");
				$state.go('dashboard.unitMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		
	}
	$scope.cancelAdd=function(){
		if($scope.userform.$dirty){
			var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
			promise.then(function handleResolve( response ) {$state.go('dashboard.unitMaster',{},{reload:true});},
					function handleReject( error ) {});
		}else{
			$state.go('dashboard.unitMaster',{},{reload:true});
		}
		
	}
	
}])
.controller('subDivisionMasterCtrl',['$scope',"$rootScope",'modals','subdivisions','$http','$state', function($scope,$rootScope,modals,subdivisions,$http,$state) {
	$scope.form={};
	$scope.subdivisions=subdivisions;
	$scope.pagi=$rootScope.pagination.init($scope.subdivisions);

	
 	
}])
.controller('addSubDivisionCtrl',['$scope',"$rootScope",'companies','modals','divisions','$http','$state', function($scope,$rootScope,companies,modals,divisions,$http,$state) {
	$scope.form={};
	$scope.companies=companies;
	$scope.divisons=divisions;
	console.log('divi',$scope.divisons);
	
	
	$scope.changeDivision=function(){
		$scope.form.divisionMaster=$rootScope.getById(divisions,$scope.divi);
	}
 	
	$scope.addSubDivision=function(){
   
  			$http.post('subdivisions/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Sub Division Added Successfully");
				$state.go('dashboard.subDivisionMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		
	}
	$scope.cancelAdd=function(){
		if($scope.userform.$dirty){
			var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
			promise.then(function handleResolve( response ) {$state.go('dashboard.subDivisionMaster',{},{reload:true});},
					function handleReject( error ) {});
		}else{
			$state.go('dashboard.subDivisionMaster',{},{reload:true});
		}
		
	}
	
}])
.controller('DivisionMasterCtrl',['$scope',"$rootScope",'modals','divisions','$http','$state', function($scope,$rootScope,modals,divisions,$http,$state) {
	$scope.form={};
	$scope.divisions=divisions;
	$scope.pagi=$rootScope.pagination.init($scope.divisions);

	
 	
}])
.controller('addDivisionCtrl',['$scope',"$rootScope",'companies','modals','$http','$state', function($scope,$rootScope,companies,modals,$http,$state) {
	$scope.form={};
	$scope.companies=companies;
	
	$scope.changeCompany=function(){
		$scope.form.companyMaster=$rootScope.getById(companies,$scope.comp);
	}
 	
	$scope.addDivision=function(){
   
  			$http.post('divisions/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Division Added Successfully");
				$state.go('dashboard.divisionMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
			
 		
	}
	$scope.cancelAdd=function(){
		if($scope.userform.$dirty){
			var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
			promise.then(function handleResolve( response ) {$state.go('dashboard.divisionMaster',{},{reload:true});},
					function handleReject( error ) {});
		}else{
			$state.go('dashboard.divisionMaster',{},{reload:true});
		}
		
	}
	
}])
.controller('CompanyMasterCtrl',['$scope',"$rootScope",'modals','companies','$http','$state', function($scope,$rootScope,modals,companies,$http,$state) {
	$scope.form={};
	$scope.companies=companies;
	$scope.pagi=$rootScope.pagination.init($scope.companies);

	
 	
}])
.controller('addCompanyCtrl',['$scope',"$rootScope",'modals','$http','$state', function($scope,$rootScope,modals,$http,$state) {
	$scope.form={};
 	
	$scope.addCompany=function(){
   
  			$http.post('companies/addCompany/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Company Added Successfully");
				$state.go('dashboard.companyMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
			
 		
	}
	$scope.cancelAdd=function(){
		if($scope.userform.$dirty){
			var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
			promise.then(function handleResolve( response ) {$state.go('dashboard.companyMaster',{},{reload:true});},
					function handleReject( error ) {});
		}else{
			$state.go('dashboard.companyMaster',{},{reload:true});
		}
		
	}
	
}])
.controller('CompanyEditCtrl',['$scope',"$rootScope",'company','$http','$state','modals',function($scope,$rootScope,company,$http,$state,modals) {
  		$scope.form=company;
   		
 	 
}])
.controller('AddUserCtrl',['$scope',"$rootScope",'modals','$http','$state', function($scope,$rootScope,modals,$http,$state) {
	$scope.form={};
	
	$scope.addUser=function(){
		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Users Name is Mandatory");
		}else if($scope.form.email==null||$scope.form.email==""){
			$rootScope.notify.showError("Email Address is Mandatory");
		}else if($scope.form.phone==null||$scope.form.phone==""){
			$rootScope.notify.showError("Phone Number is Mandatory");
		}else if($scope.form.phone.length!=10){
			$rootScope.notify.showError("Phone Number should have 10 digits");
		}else if($scope.form.password==null||$scope.form.password==""){
			$rootScope.notify.showError("Enter Valid Password");
		}else if($scope.form.password!=$scope.conpass){
			$rootScope.notify.showError("Password and Confirm Password Should be Same");
		}else{
			 
			$http.post('user/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("User Added Successfully");
				$state.go('dashboard.user',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
			
		}
		
	}
	$scope.cancelAdd=function(){
		if($scope.userform.$dirty){
			var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
			promise.then(function handleResolve( response ) {$state.go('dashboard.user',{},{reload:true});},
					function handleReject( error ) {});
		}else{
			$state.go('dashboard.user',{},{reload:true});
		}
		
	}
	
}])

 .controller('UserCtrl',['$scope',"$rootScope",'users','modals','$http','$state', function($scope,$rootScope,users,modals,$http,$state) {
	
	$scope.users=users;
	$scope.pagi=$rootScope.pagination.init($scope.users);
	
	$scope.deleteUser=function(user){
		var promise = modals.open("confirm",{ message: "Are you sure to delete "+user.name+" ?"});
        promise.then(
        		function handleResolve( response ) {
        			$http.post('user/delete/'+$rootScope.userInfo.id+"/"+user.id).success(function(data){
        				$rootScope.notify.showSuccess("User Deleted Successfully");
        				$state.go('dashboard.user',{},{reload:true});
            		}).error(function(data){
            				$rootScope.notify.handleError(data);
            		})
            },
            function handleReject( error ) {}
            );
	}
 
}])
.controller('UserEditCtrl',['$scope',"$rootScope",'user','$http','$state','modals',function($scope,$rootScope,user,$http,$state,modals) {
  		$scope.form=user;
 		$scope.form.password=null;
  		$scope.conpass=null;
  		
  		
 		$scope.updateUser=function(){	
 						 
			if($scope.form.name==null || $scope.form.name==""){
				$rootScope.notify.showError("Users Name is Mandatory");
			}else if($scope.form.email==null||$scope.form.email==""){
				$rootScope.notify.showError("Email Address is Mandatory");
			}else if($scope.form.phone==null||$scope.form.phone==""){
				$rootScope.notify.showError("Phone Number is Mandatory");
			}else if($scope.form.phone.length!=10){
				$rootScope.notify.showError("Phone Number should have 10 digits");
			}else if($scope.form.password!=$scope.conpass){
				$rootScope.notify.showError("Password and Confirm Password Should be Same");
			}else{
 			 
				$http.post('user/update/'+$rootScope.userInfo.id,$scope.form).success(function(data){
					$rootScope.notify.showSuccess("User Updated Successfully");
					$state.go('dashboard.user',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})
				
			}
			
		}
		
		$scope.cancelUpdate=function(){
			if($scope.userform.$dirty){
				var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
				promise.then(function handleResolve( response ) {$state.go('dashboard.user',{},{reload:true});},
						function handleReject( error ) {});
			}else{
				$state.go('dashboard.user',{},{reload:true});
			}
			
		}
	
	 
}]);
