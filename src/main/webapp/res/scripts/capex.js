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
.controller('shedsCtrl',['$scope',"$rootScope",'modals','sheds','$http','$state', function($scope,$rootScope,modals,sheds,$http,$state) {
	$scope.form={};
	$scope.sheds=sheds;
	$scope.pagi=$rootScope.pagination.init($scope.sheds);
 	
	$scope.addShed=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Shed Name is Mandatory");
		}else{
 			$http.post('sheds/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Shed Added Successfully");
				$scope.form=null;
				$state.go('dashboard.sheds',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editShedClass = function (shed) {
 	    		$scope.editShed={};
	    		$scope.editShed=shed;
   	 }
	 
	 $scope.updateShed=function(){	
		 
  			if($scope.editShed.name==null || $scope.editShed.name==""){
				$rootScope.notify.showError("Shed Name is Mandatory");
			}else{
 				$http.post('sheds/update/'+$rootScope.userInfo.id,$scope.editShed).success(function(data){
					$rootScope.notify.showSuccess("Shed details Updated Successfully");
					$state.go('dashboard.sheds',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteShed=function(shed){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+shed.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('sheds/delete/'+$rootScope.userInfo.id+"/"+shed.id).success(function(data){
	        				$rootScope.notify.showSuccess("Shed Deleted Successfully");
	        				$state.go('dashboard.sheds',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('staffQuartersCtrl',['$scope',"$rootScope",'modals','staffQuarters','$http','$state', function($scope,$rootScope,modals,staffQuarters,$http,$state) {
	$scope.form={};
	$scope.staffQuarters=staffQuarters;
	$scope.pagi=$rootScope.pagination.init($scope.staffQuarters);
 	
	$scope.addStaffQuarter=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Staff Quarter Name is Mandatory");
		}else{
 			$http.post('staffQuarters/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Added Successfully");
				$scope.form=null;
				$state.go('dashboard.staffQuarters',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editStaffQuarterClass = function (quarters) {
 	    		$scope.editStaffQuarter={};
	    		$scope.editStaffQuarter=quarters;
   	 }
	 
	 $scope.updateStaffQuarter=function(){	
		 
  			if($scope.editStaffQuarter.name==null || $scope.editStaffQuarter.name==""){
				$rootScope.notify.showError("Name is Mandatory");
			}else{
 				$http.post('staffQuarters/update/'+$rootScope.userInfo.id,$scope.editStaffQuarter).success(function(data){
					$rootScope.notify.showSuccess("Updated Successfully");
					$state.go('dashboard.staffQuarters',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteStaffQuarter=function(quarters){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+quarters.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('staffQuarters/delete/'+$rootScope.userInfo.id+"/"+quarters.id).success(function(data){
	        				$rootScope.notify.showSuccess("Shed Deleted Successfully");
	        				$state.go('dashboard.staffQuarters',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('coldRoomCtrl',['$scope',"$rootScope",'modals','coldRooms','$http','$state', function($scope,$rootScope,modals,coldRooms,$http,$state) {
	$scope.form={};
	$scope.coldRooms=coldRooms;
	$scope.pagi=$rootScope.pagination.init($scope.coldRooms);
 	
	$scope.addColdRoom=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Cold Room Name is Mandatory");
		}else{
 			$http.post('coldRoom/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Added Successfully");
				$scope.form=null;
				$state.go('dashboard.coldRoom',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editColdRoomClass = function (cold) {
 	    		$scope.editColdRoom={};
	    		$scope.editColdRoom=cold;
   	 }
	 
	 $scope.updateColdRoom=function(){	
		 
  			if($scope.editColdRoom.name==null || $scope.editColdRoom.name==""){
				$rootScope.notify.showError("Name is Mandatory");
			}else{
 				$http.post('coldRoom/update/'+$rootScope.userInfo.id,$scope.editColdRoom).success(function(data){
					$rootScope.notify.showSuccess("Updated Successfully");
					$state.go('dashboard.coldRoom',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteColdRoom=function(cold){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+cold.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('coldRoom/delete/'+$rootScope.userInfo.id+"/"+cold.id).success(function(data){
	        				$rootScope.notify.showSuccess("Cold ROom Deleted Successfully");
	        				$state.go('dashboard.coldRoom',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('buildingsCtrl',['$scope',"$rootScope",'modals','buildings','$http','$state', function($scope,$rootScope,modals,buildings,$http,$state) {
	$scope.form={};
	$scope.buildings=buildings;
	$scope.pagi=$rootScope.pagination.init($scope.buildings);
 	
	$scope.addBuilding=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Building Name is Mandatory");
		}else{
 			$http.post('buildings/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Added Successfully");
				$scope.form=null;
				$state.go('dashboard.buildings',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editBuildingClass = function (build) {
 	    		$scope.editBuilding={};
	    		$scope.editBuilding=build;
   	 }
	 
	 $scope.updateBuilding=function(){	
		 
  			if($scope.editBuilding.name==null || $scope.editBuilding.name==""){
				$rootScope.notify.showError("Name is Mandatory");
			}else{
 				$http.post('buildings/update/'+$rootScope.userInfo.id,$scope.editBuilding).success(function(data){
					$rootScope.notify.showSuccess("Updated Successfully");
					$state.go('dashboard.buildings',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteBuilding=function(build){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+build.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('buildings/delete/'+$rootScope.userInfo.id+"/"+build.id).success(function(data){
	        				$rootScope.notify.showSuccess("Deleted Successfully");
	        				$state.go('dashboard.buildings',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('facilitiesCtrl',['$scope',"$rootScope",'modals','facilities','$http','$state', function($scope,$rootScope,modals,facilities,$http,$state) {
	$scope.form={};
	$scope.facilities=facilities;
	$scope.pagi=$rootScope.pagination.init($scope.facilities);
 	
	$scope.addFacility=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Name is Mandatory");
		}else{
 			$http.post('facilities/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Added Successfully");
				$scope.form=null;
				$state.go('dashboard.facilities',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editFacilityClass = function (facility) {
 	    		$scope.editFacility={};
	    		$scope.editFacility=facility;
   	 }
	 
	 $scope.updateFacility=function(){	
		 
  			if($scope.editFacility.name==null || $scope.editFacility.name==""){
				$rootScope.notify.showError("Name is Mandatory");
			}else{
 				$http.post('facilities/update/'+$rootScope.userInfo.id,$scope.editFacility).success(function(data){
					$rootScope.notify.showSuccess("Updated Successfully");
					$state.go('dashboard.facilities',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteFacility=function(facility){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+facility.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('facilities/delete/'+$rootScope.userInfo.id+"/"+facility.id).success(function(data){
	        				$rootScope.notify.showSuccess("Deleted Successfully");
	        				$state.go('dashboard.facilities',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('assetClassCtrl',['$scope',"$rootScope",'modals','assetClasses','$http','$state', function($scope,$rootScope,modals,assetClasses,$http,$state) {
	$scope.form={};
	$scope.assetClasses=assetClasses;
	$scope.pagi=$rootScope.pagination.init($scope.assetClasses);
 	
	$scope.addAsset=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Asset Name is Mandatory");
		}else{
 			$http.post('assetClass/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Asset Added Successfully");
				$scope.form=null;
				$state.go('dashboard.assetClass',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editAssetClass = function (asset) {
 	    		$scope.editAsset={};
	    		$scope.editAsset=asset;
   	 }
	 
	 $scope.updateAsset=function(){	
		 
  			if($scope.editAsset.name==null || $scope.editAsset.name==""){
				$rootScope.notify.showError("Asset Name is Mandatory");
			}else{
 				$http.post('assetClass/update/'+$rootScope.userInfo.id,$scope.editAsset).success(function(data){
					$rootScope.notify.showSuccess("Asset details Updated Successfully");
					$state.go('dashboard.assetClass',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteAsset=function(asset){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+asset.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('assetClass/delete/'+$rootScope.userInfo.id+"/"+asset.id).success(function(data){
	        				$rootScope.notify.showSuccess("Asset Deleted Successfully");
	        				$state.go('dashboard.assetClass',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('assetCategoriesCtrl',['$scope',"$rootScope",'modals','assetClasses','assetCategories','$http','$state', function($scope,$rootScope,modals,assetClasses,assetCategories,$http,$state) {
	$scope.form={};
	$scope.assetCategories=assetCategories;
	$scope.assetClasses=assetClasses;
	$scope.pagi=$rootScope.pagination.init($scope.assetCategories);
	
	$scope.changeAsset=function(){
		console.log('ssss',$scope.asset);
 		$scope.form.assetClassMaster=$rootScope.getById(assetClasses,$scope.asset);
 	}
 	
	$scope.addAssetCategory=function(){

		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Asset Category Name is Mandatory");
		}else{
 			$http.post('assetCategories/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Added Successfully");
				$scope.form=null;
				$state.go('dashboard.assetCategories',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 
	$scope.deleteAsset=function(assetCategories){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+assetCategories.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('assetCategories/delete/'+$rootScope.userInfo.id+"/"+assetCategories.id).success(function(data){
	        				$rootScope.notify.showSuccess(" Deleted Successfully");
	        				$state.go('dashboard.assetCategories',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('capexRegCtrl',['$scope',"$rootScope",'modals','$http','$state', function($scope,$rootScope,modals,$http,$state) {
  
	
 	
}])
.controller('addUnitCtrl',['$scope',"$rootScope",'companies','modals','divisions','subdivisions','facilities','buildings','coldRooms','staffQuarters','sheds','$http','$state', 
				function($scope,$rootScope,companies,modals,divisions,subdivisions,facilities,buildings,coldRooms,staffQuarters,sheds,$http,$state) {
	$scope.form={};
	$scope.companies=companies;
	$scope.divisons=divisions;	
	$scope.subdivisons=subdivisions;
	$scope.facilities=facilities;
	$scope.buildings=buildings;
	$scope.coldRooms=coldRooms;
	$scope.staffQuarters=staffQuarters;
	$scope.sheds=sheds;
	$scope.emptyDown=true;
	console.log('sub divi',$scope.subdivisons);
	$scope.changeSubDivision=function(){
 		$scope.form.subDivisionMaster=$rootScope.getById(subdivisions,$scope.subdivi);
		console.log('form-sub',$scope.form.subDivisionMaster);
	}
 	
	$scope.changeLocation=function(){
 		$scope.emptyDown=false;
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
	$scope.unitMaster={};
	$scope.form.unitMaster=[];
	$scope.form.unitMaster.unitLocations=[];
	$scope.addRow=function(){
  		if($scope.location==1){
  			console.log('sssss',$scope.shedd);
  			$scope.unitMaster.sheds=$rootScope.getById(sheds,$scope.shedd);
  			console.log($scope.unitMaster.sheds);

   			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.sheds);
  			$scope.location=null;
  			console.log($scope.form.unitMaster);
  		}else if($scope.location==2){
  			$scope.unitMaster.staffQuarters=$rootScope.getById(staffQuarters,$scope.staff);
  			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.staffQuarters);
  			$scope.location=null;
  		}else if($scope.location==3){
  			$scope.unitMaster.coldRoom=$rootScope.getById(coldRooms,$scope.coldy);
  			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.coldRoom);
  			$scope.location=null;
  		}else if($scope.location==4){
  			$scope.unitMaster.buildings=$rootScope.getById(buildings,$scope.buildy);
  			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.location);
  			$scope.location=null;
  		}else if($scope.location==5){
  			$scope.unitMaster.facilities=$rootScope.getById(facilities,$scope.faci);
  			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.facilities);
  			$scope.location=null;
  		}
  		console.log($scope.form.unitMaster.unitLocations);
  	}
 	
 	$scope.deleteRow=function(index){
 		$scope.form.unitMaster.splice(index,1);	
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
