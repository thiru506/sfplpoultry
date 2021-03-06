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
.controller('HomeCtrl',['$scope',"$rootScope",'modals','capexs','$http','$state', function($scope,$rootScope,modals,capexs,units,$http,$state) {
	$scope.form={};
	$scope.capexs=capexs;
	$scope.pagi=$rootScope.pagination.init($scope.capexs);
	$scope.budgets=[];
	$scope.inReviewBudgets=[];
	$scope.rejectedBudgets=[];
	$scope.approvedBudgets=[];
	
	angular.forEach(capexs, function(obj){
		for(var i=0;i<obj.quarters.length;i++){
			if(obj.quarters[i].quarter==0){
				obj.total=obj.quarters[i].total;
			}
		}
	});

	if($rootScope.userInfo.userType==0){
		$scope.budgets=$scope.capexs;
		angular.forEach($scope.budgets, function(obj){
 				if(obj.status==0 || obj.status==1 || obj.status==3){
					$scope.inReviewBudgets.push(obj);
					console.log("$scope.inReviewBudgets",$scope.inReviewBudgets);
				}else if(obj.status==2 || obj.status==4 || obj.status==6){
					$scope.rejectedBudgets.push(obj);
					console.log("$scope.rejectedBudgets",$scope.rejectedBudgets);
				}else if(obj.status==5){
					$scope.approvedBudgets.push(obj);
					console.log("$scope.approvedBudgets",$scope.approvedBudgets);
				}
 		});
 	}
	if($rootScope.userInfo.userType==1){
 		angular.forEach(capexs, function(obj){
	        		if(obj.user.id==$rootScope.userInfo.id){
	        			$scope.budgets.push(obj);
	        		}
			});
		angular.forEach($scope.budgets, function(obj){
 				if(obj.status==0 || obj.status==1 || obj.status==3){
					$scope.inReviewBudgets.push(obj);
				}else if(obj.status==2 || obj.status==4 || obj.status==6){
					$scope.rejectedBudgets.push(obj);
				}else if(obj.status==5){
					$scope.approvedBudgets.push(obj);
				}
 		});
 	}
	
	if($rootScope.userInfo.userType==2){
 		angular.forEach(capexs, function(obj){
	        		if(obj.user.hodId.id==$rootScope.userInfo.id){
	        			$scope.budgets.push(obj);
	        		}
			});
		angular.forEach($scope.budgets, function(obj){
 				if(obj.status==0 || obj.status==1 || obj.status==3){
					$scope.inReviewBudgets.push(obj);
				}else if(obj.status==2 || obj.status==4 || obj.status==6){
					$scope.rejectedBudgets.push(obj);
				}else if(obj.status==5){
					$scope.approvedBudgets.push(obj);
				}
 		});
 	}
	
	if($rootScope.userInfo.userType==3){
 		angular.forEach(capexs, function(obj){
 			if(obj.user.hodId.managerId.id==$rootScope.userInfo.id && obj.status==1 || obj.status==6 || obj.status==5 || obj.status==3){
				$scope.budgets.push(obj);
 			}
		});
		angular.forEach($scope.budgets, function(obj){
 				if(obj.status==1 || obj.status==3){
					$scope.inReviewBudgets.push(obj);
				}else if(obj.status==4 || obj.status==6){
					$scope.rejectedBudgets.push(obj);
				}else if(obj.status==5){
					$scope.approvedBudgets.push(obj);
				}
 		});
	} 	
	if($rootScope.userInfo.userType==5){
 		angular.forEach(capexs, function(obj){
 			if(obj.status==3 || obj.status==6 || obj.status==5){
				$scope.budgets.push(obj);
 			}
		});
		angular.forEach($scope.budgets, function(obj){
 				if(obj.status==3){
					$scope.inReviewBudgets.push(obj);
				}else if(obj.status==6){
					$scope.rejectedBudgets.push(obj);
				}else if(obj.status==5){
					$scope.approvedBudgets.push(obj);
				}
 		});
	} 	

}])
.controller('unitMasterCtrl',['$scope',"$rootScope",'modals','units','$http','$state', function($scope,$rootScope,modals,units,$http,$state) {
	$scope.form={};
	$scope.units=units;
	$scope.pagi=$rootScope.pagination.init($scope.units);

	
 	
}])
.controller('unitViewCtrl',['$scope',"$rootScope",'modals','unit','$http','$state', function($scope,$rootScope,modals,unit,$http,$state) {
 	$scope.unit=unit;
  
 	
}])
.controller('budgetEditCtrl',['$scope',"$rootScope",'$window','modals','budget','subdivisions','units','assetCategories','assetClasses','uoms','departments','$http','$state',
						function($scope,$rootScope,$window,modals,budget,subdivisions,units,assetCategories,assetClasses,uoms,departments,$http,$state) {
 	$scope.budget=budget;
	$scope.subdivisons=subdivisions;
	$scope.units=units;
 	$scope.uoms=uoms;
	$scope.assetClasses=assetClasses;
	$scope.assetCategories=assetCategories;
	$scope.departments=departments;
	$scope.unit=$rootScope.getById(units,$scope.budget.unitMaster.id);
	$scope.locations=$scope.unit.unitLocations;
	$scope.isEdit=false;
	$scope.form1={};
	$scope.form={};
	$scope.year=[];
	$scope.quarters=[];
	
	angular.forEach(budget.quarters, function(obj){
 		if(obj.quarter==0){
			$scope.year.push(obj);
 		}
	});
 	
	angular.forEach(budget.quarters, function(obj){
 			$scope.quarters.push(obj);
 	});

	
 	$scope.editQuarter=function(quarter){
      	if($scope.isEdit){
       		$rootScope.notify.showError("A row is already open for edit");
     	}else{
      		$scope.isEdit=true;
      		$scope.form1.quarter=$scope.year[0];
     		$scope.form.quarter=quarter;
     		$scope.form.qty=quarter.qty;
     		$scope.form.rate=quarter.rate;
     		$scope.form.description=quarter.description;
     		$scope.form.justification=quarter.justification;
     		$scope.form.tax=quarter.tax;
     		$scope.form.cost=quarter.cost;
     		$scope.form.total=quarter.total;
       	}
 	}
 	
	$scope.deleteQuarter=function(quarter){
		
	}
	$scope.quarterEditRateChange=function(){
		var a=parseFloat($scope.form.qty);
		var b=parseFloat($scope.form.rate);
		var c=parseFloat($scope.form.tax)
		$scope.form.cost=a*b;
		$scope.form.total=(a*b)+((a*b*c)/100);
	}

	$scope.cancelEditQuarter=function(){
	     	if($scope.checkUnsave($scope.unsave)){
	     		$scope.form={};
	      		$scope.isEdit=false;
	     	}
	}
 
	$scope.assetClassChange=function(){
  		$scope.form.assetClassMaster=$rootScope.getById(assetClasses,$scope.assetClass);
  		$scope.getAssetCategoriesByAssetClassId(assetCategories,$scope.form.assetClassMaster.assetClassId);
 	}
	
	$scope.getAssetCategoriesByAssetClassId=function(list,id){
		  $scope.selectedAssets=[];
			angular.forEach(list, function(obj){
	        		if(obj.assetClassMaster.assetClassId==id){
	        			$scope.selectedAssets.push(obj);
	        		}
			});
	}


	 $scope.updateQuarter=function(quarter){
	     	var updateQuarter={
     			"id":$scope.form.quarter.id,
	     		"uom":$scope.form.quarter.uom,
	     		"assetCategoriesMaster":$scope.form.quarter.assetCategoriesMaster,
	     		"assetClassMaster":$scope.form.quarter.assetClassMaster,
	     		"cost":$scope.form.cost,
	     		"description":$scope.form.description,
	     		"justification":$scope.form.justification,
	     		"qty":$scope.form.qty,
	     		"rate":$scope.form.rate,
	     		"tax":$scope.form.tax,
	     		"total":$scope.form.total,
	     	};
 			$http.post('quarter/update/'+$rootScope.userInfo.id,updateQuarter).success(function(data,status){
	     		$rootScope.notify.showSuccess('Quarter Updated Successfully');
	     		$scope.form={};
	      		$scope.isEdit=false;
	      		$scope.resetUnsave();
	      		quarter.cost=updateQuarter.cost;
	      		quarter.description=updateQuarter.description;
	      		quarter.justification=updateQuarter.justification;
	      		quarter.qty=updateQuarter.qty;
	      		quarter.rate=updateQuarter.rate;
	      		quarter.tax=updateQuarter.tax;
	      		quarter.total=updateQuarter.total;
	      		
	      		$scope.updateYearlyQuarter($scope.year);	/**update year quarter*/
    		}).error(function(data){
    				$rootScope.notify.handleError(data);
    		})
	 }
	 
	 $scope.updateBudgetForm=function(){
		 
			$http.post('capex/setStatus/'+$rootScope.userInfo.id+"/"+$scope.budget.id).success(function(data){
				$rootScope.notify.showSuccess("Budget forwarded to HoD");
				$state.go('dashboard.home',{},{reload:true});
    		}).error(function(data){
    				$rootScope.notify.handleError(data);
    		})

	 }
	 
	 $scope.updateYearlyQuarter=function(quarter){
		 var updateYearly={
	     			"id":$scope.form1.quarter.id,
  		     		"quarter":$scope.form1.quarter.quarter,
		     		"cost":$scope.totalCost($scope.quarters),
 		     		"qty":$scope.totalQty($scope.quarters),
		     		"rate":$scope.totalRate($scope.quarters),
 		     		"total":$scope.totalTotal($scope.quarters),
 		     		"year":$scope.form1.quarter.year,
				 
		 };
		 
 			$http.post('quarter/update/'+$rootScope.userInfo.id,updateYearly).success(function(data,status){
	     		$rootScope.notify.showSuccess('Quarter Updated Successfully');
	     		$window.location.reload();
     		}).error(function(data){
    				$rootScope.notify.handleError(data);
    		})

	 }

		$scope.totalQty=function(list){
			var total=0;
			angular.forEach(list, function(obj){
				if(obj.quarter>0){total+=parseFloat(obj.qty);}
 	 		})
	 		return total;
		}

		$scope.totalRate=function(list){
			var total=0;
			angular.forEach(list, function(obj){
				if(obj.quarter>0){total+=parseFloat(obj.rate);}
	 		})
	 		return total;
		}
		$scope.totalCost=function(list){
			var total=0;
			angular.forEach(list, function(obj){
				if(obj.quarter>0){total+=parseFloat(obj.cost);}
	 		})
	 		return total;
		}
		$scope.totalTotal=function(list){
			var total=0;
			angular.forEach(list, function(obj){
				if(obj.quarter>0){total+=parseFloat(obj.total);}
	 		})
	 		return total;
		}

   	 	
}])
.controller('budgetViewCtrl',['$scope',"$rootScope",'modals','budget','$http','$state', function($scope,$rootScope,modals,budget,$http,$state) {
 	$scope.budget=budget;
 	console.log("budget",$scope.budget);
 	$scope.showApprove=false;
 	$scope.showReject=false;
 	
 	$scope.approveButton=function(){
 		$scope.showApprove=true;
 		$scope.showReject=false;
 	}
 	
 	$scope.rejectButton=function(){
 		$scope.showReject=true;
 		$scope.showApprove=false;	
 	}
 	
 	$scope.approved=function(){
 		if($rootScope.userInfo.userType==2){
 			$scope.status=1;
 			$scope.remarks=$scope.form.remarks;
 		}else if($rootScope.userInfo.userType==3){
 			$scope.status=3;
 			$scope.remarks=$scope.form.remarks;
 		}else if($rootScope.userInfo.userType==5){
 			$scope.status=5;
 			$scope.remarks=$scope.form.remarks;
 		}
 		
 		
 		if($rootScope.userInfo.userType==1 || $rootScope.userInfo.userType==0){
 			$rootScope.notify.showError("No Access to perform this operation");
 		}else{
			$http.post('capex/setApprovalStatus/'+$rootScope.userInfo.id+"/"+$scope.budget.id+"/"+$scope.status+"/"+$scope.remarks).success(function(data){
				$rootScope.notify.showSuccess("Budget approved & forwarded");
				$state.go('dashboard.home',{},{reload:true});
    		}).error(function(data){
    				$rootScope.notify.handleError(data);
    		})
 		}

 			
 			
 	}
 	
 	$scope.rejected=function(){
 		if($rootScope.userInfo.userType==2){
 			$scope.status=2;
 			$scope.remarks=$scope.form.remarks;
 		}
 		else if($rootScope.userInfo.userType==3){
 			$scope.status=4
 			$scope.remarks=$scope.form.remarks;
 		}else if($rootScope.userInfo.userType==5){
 			$scope.status=6;
 			$scope.remarks=$scope.form.remarks;
 		}	
 		
 		if($rootScope.userInfo.userType==0){
			$rootScope.notify.showError("No Access to perform this operation");
		}else{
			$http.post('capex/setRejectionStatus/'+$rootScope.userInfo.id+"/"+$scope.budget.id+"/"+$scope.status+"/"+$scope.remarks).success(function(data){
				$rootScope.notify.showSuccess("Budget Rejected");
				$state.go('dashboard.home',{},{reload:true});
    		}).error(function(data){
    				$rootScope.notify.handleError(data);
    		})
 		}
 		
 	}
 	 	
}])
.controller('uomCtrl',['$scope',"$rootScope",'modals','uoms','$http','$state', function($scope,$rootScope,modals,uoms,$http,$state) {
	$scope.form={};
	$scope.uoms=uoms;
	$scope.pagi=$rootScope.pagination.init($scope.uoms);
 	
	$scope.addUOM=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Unit Name is Mandatory");
		}else{
 			$http.post('uom/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess(" Added Successfully");
				$scope.form=null;
				$state.go('dashboard.uom',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editUOMClass = function (uom) {
 	    		$scope.editUOM={};
	    		$scope.editUOM=uom;
   	 }
	 
	 $scope.updateUOM=function(){	
		 
  			if($scope.editUOM.name==null || $scope.editUOM.name==""){
				$rootScope.notify.showError("Name is Mandatory");
			}else{
 				$http.post('uom/update/'+$rootScope.userInfo.id,$scope.editUOM).success(function(data){
					$rootScope.notify.showSuccess("details Updated Successfully");
					$state.go('dashboard.uom',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteUOM=function(uom){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+uom.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('uom/delete/'+$rootScope.userInfo.id+"/"+uom.id).success(function(data){
	        				$rootScope.notify.showSuccess("Deleted Successfully");
	        				$state.go('dashboard.uom',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('departmentCtrl',['$scope',"$rootScope",'modals','departments','$http','$state', function($scope,$rootScope,modals,departments,$http,$state) {
	$scope.form={};
	$scope.departments=departments;
	$scope.pagi=$rootScope.pagination.init($scope.departments);
 	
	$scope.addDepartment=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Department Name is Mandatory");
		}else{
 			$http.post('departments/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess(" Added Successfully");
				$scope.form=null;
				$state.go('dashboard.departments',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editDepartmentClass = function (dept) {
 	    		$scope.editDepartment={};
	    		$scope.editDepartment=dept;
   	 }
	 
	 $scope.updateDepartment=function(){	
		 
  			if($scope.editDepartment.name==null || $scope.editDepartment.name==""){
				$rootScope.notify.showError("Name is Mandatory");
			}else{
 				$http.post('departments/update/'+$rootScope.userInfo.id,$scope.editUOM).success(function(data){
					$rootScope.notify.showSuccess("details Updated Successfully");
					$state.go('dashboard.departments',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteDepartment=function(dept){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+dept.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('departments/delete/'+$rootScope.userInfo.id+"/"+dept.id).success(function(data){
	        				$rootScope.notify.showSuccess("Deleted Successfully");
	        				$state.go('dashboard.departments',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('locationsCtrl',['$scope',"$rootScope",'modals','locations','$http','$state', function($scope,$rootScope,modals,locations,$http,$state) {
	$scope.form={};
	$scope.locations=locations;
	$scope.pagi=$rootScope.pagination.init($scope.locations);
 	
	$scope.addLocation=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Location Name is Mandatory");
		}else{
 			$http.post('locations/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Location Added Successfully");
				$scope.form=null;
				$state.go('dashboard.locations',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editLocationClass = function (location) {
 	    		$scope.editLocation={};
	    		$scope.editLocation=location;
   	 }
	 
	 $scope.updateLocation=function(){	
		 
  			if($scope.editLocation.name==null || $scope.editLocation.name==""){
				$rootScope.notify.showError("Location Name is Mandatory");
			}else{
 				$http.post('locations/update/'+$rootScope.userInfo.id,$scope.editLocation).success(function(data){
					$rootScope.notify.showSuccess("Location details Updated Successfully");
					$state.go('dashboard.locations',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteLocation=function(location){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+location.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('locations/delete/'+$rootScope.userInfo.id+"/"+location.id).success(function(data){
	        				$rootScope.notify.showSuccess("Shed Deleted Successfully");
	        				$state.go('dashboard.locations',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
}])
.controller('locationNameCtrl',['$scope',"$rootScope",'modals','locationNames','$http','$state', function($scope,$rootScope,modals,locationNames,$http,$state) {
	$scope.form={};
	$scope.locationNames=locationNames;
	$scope.pagi=$rootScope.pagination.init($scope.locationNames);
 	
	$scope.addLocationName=function(){
		
   		if($scope.form.name==null || $scope.form.name==""){
			$rootScope.notify.showError("Location Name is Mandatory");
		}else{
 			$http.post('locationName/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Location Added Successfully");
				$scope.form=null;
				$state.go('dashboard.locationNames',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 		}
		
	}
 	
	 $scope.editlocationNameClass = function (location) {
 	    		$scope.editLocationName={};
	    		$scope.editLocationName=location;
    	 }
	 
	 $scope.updateLocationName=function(){	
		 
  			if($scope.editLocationName.name==null || $scope.editLocationName.name==""){
				$rootScope.notify.showError("Location Name is Mandatory");
			}else{
 				$http.post('locationName/update/'+$rootScope.userInfo.id,$scope.editLocationName).success(function(data){
					$rootScope.notify.showSuccess("Location Name details Updated Successfully");
					$state.go('dashboard.locationNames',{},{reload:true});
	    			}).error(function(data){
	    				$rootScope.notify.handleError(data);
	    			})	
			}		
	}
	 
	 $scope.deleteLocationName=function(location){
 			var promise = modals.open("confirm",{ message: "Are you sure to delete "+location.name+" ?"});
	        promise.then(
	        		function handleResolve( response ) {
	        			$http.post('locationNames/delete/'+$rootScope.userInfo.id+"/"+location.id).success(function(data){
	        				$rootScope.notify.showSuccess("Deleted Successfully");
	        				$state.go('dashboard.locationNames',{},{reload:true});
	            		}).error(function(data){
	            				$rootScope.notify.handleError(data);
	            		})
	            });
		}
	
 	
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
	
	$scope.changeAsset=function(asClass){
  		$scope.form.assetClassMaster=$rootScope.getById(assetClasses,asClass);
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
.controller('capexRegCtrl',['$scope',"$rootScope",'modals','subdivisions','units','assetCategories','assetClasses','uoms','departments','$http','$state',
				function($scope,$rootScope,modals,subdivisions,units,assetCategories,assetClasses,uoms,departments,$http,$state) {
	$scope.subdivisons=subdivisions;
	$scope.units=units;
	$scope.form={};
	$scope.uoms=uoms;
	$scope.assetClasses=assetClasses;
	$scope.assetCategories=assetCategories;
	$scope.departments=departments;
	
	$scope.locations=[];
	
 	var date = new Date();
	$scope.form.date = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + date.getFullYear();
 
	$scope.unitChange=function(){
  		$scope.form.unit=$rootScope.getById(units,$scope.unitt);
		$scope.selectedLocations=$scope.form.unit.unitLocations;
		
 		$scope.locations=$scope.newArrayy($scope.selectedLocations);
 	}
	$scope.newArrayy=function(list){
		var newArray=[];
		angular.forEach(list, function(obj1,key){
			var exists=false;
			angular.forEach(newArray, function(obj2,key){
				if(angular.equals(obj1.locations.id,obj2.locations.id)){exists= true};
			});
			if(exists== false && obj1.locations.id !=""){
				newArray.push(obj1);
			}
		});
		return newArray;
   	}

 	
	$scope.assetClassChange=function(){
  		$scope.form.assetClassMaster=$rootScope.getById(assetClasses,$scope.assetClass);
  		$scope.getAssetCategoriesByAssetClassId(assetCategories,$scope.form.assetClassMaster.assetClassId);
 	}
 	
	$scope.getAssetCategoriesByAssetClassId=function(list,id){
		  $scope.selectedAssets=[];
  			angular.forEach(list, function(obj){
 	        		if(obj.assetClassMaster.assetClassId==id){
 	        			$scope.selectedAssets.push(obj);
	        		}
 			});
	}
 	$scope.changeLoc=function(){
		$scope.locationNames=[];
  		$scope.sampleLocations=$rootScope.getById($scope.locations,$scope.loc);
  			angular.forEach($scope.selectedLocations, function(obj){
  	        		if(obj.locations.id==$scope.sampleLocations.locations.id){
	        			$scope.locationNames.push(obj);
        		}
			});
   	}
	
	$scope.changeLocName=function(){
		$scope.form.unitLocations={};
   		$scope.form.unitLocations=$rootScope.getById($scope.selectedLocations,$scope.locName);
  	}
	
	$scope.changeCost=function(){
		var a=parseInt($scope.form1.qty);
		var b=parseFloat($scope.form1.rate);
		var c=parseFloat($scope.form1.tax);
		
		$scope.form1.cost=a*b;
		if($scope.form1.tax==null)
			$scope.form1.total=(a*b);
		else
			$scope.form1.total=(a*b)+((a*b*c)/100);
	}

	
	
	$scope.quarters=[];
	$scope.form1={};
	$scope.addQuarter=function(){
		 
				$scope.addedQuarter={};
 				$scope.addedQuarter.assetClassMaster=$rootScope.getById(assetClasses,$scope.assetClass);
				$scope.addedQuarter.assetCategoriesMaster=$rootScope.getById(assetCategories,$scope.assetCategory);
				$scope.addedQuarter.description=$scope.form1.description;
				$scope.addedQuarter.justification=$scope.form1.justification;

				$scope.addedQuarter.year=$scope.form1.year;
				$scope.addedQuarter.quarter=$scope.form1.quarter;
				$scope.addedQuarter.qty=$scope.form1.qty;
				$scope.addedQuarter.rate=$scope.form1.rate;
				$scope.addedQuarter.uom=$rootScope.getById(uoms,$scope.form1.uom);
				$scope.addedQuarter.cost=$scope.form1.cost;
				$scope.addedQuarter.tax=$scope.form1.tax;
				$scope.addedQuarter.total=$scope.form1.total;
				
				$scope.quarters.push($scope.addedQuarter);
 				$scope.form1=null;
		}
		$scope.yearly=function(){
 					$scope.addedQuarter={};
  					var a=$scope.totalQty($scope.quarters);
					var b=$scope.totalRate($scope.quarters);
					var c=$scope.totalCost($scope.quarters);
					var d=$scope.totalTotal($scope.quarters);
 					
					$scope.addedQuarter.description=null;
					$scope.addedQuarter.justification=null;
 					$scope.addedQuarter.year=$scope.quarters[1].year;
					$scope.addedQuarter.quarter=0;
					$scope.addedQuarter.qty=a;
					$scope.addedQuarter.rate=b;
 					$scope.addedQuarter.cost=c;
 					$scope.addedQuarter.total=d;
					
					$scope.quarters.push($scope.addedQuarter);

					$scope.form1=null;
		}
	
	$scope.totalQty=function(list){
		var total=0;
		angular.forEach(list, function(obj){
     			total+=parseFloat(obj.qty);
 		})
 		return total;
	}

	$scope.totalRate=function(list){
		var total=0;
		angular.forEach(list, function(obj){
     			total+=parseFloat(obj.rate);
 		})
 		return total;
	}
	$scope.totalCost=function(list){
		var total=0;
		angular.forEach(list, function(obj){
     			total+=parseFloat(obj.cost);
 		})
 		return total;
	}
	$scope.totalTotal=function(list){
		var total=0;
		angular.forEach(list, function(obj){
     			total+=parseFloat(obj.total);
 		})
 		return total;
	}
	
 	$scope.deleteRow=function(index){
 		$scope.quarters.splice(index,1);
  	}

	
	$scope.addBudgetForm=function(){
		$scope.form.user=$rootScope.userInfo;
		$scope.form.quarters=$scope.quarters;	
		$scope.form.department=$rootScope.getById(departments,$scope.department);
		$scope.form.unitMaster=$rootScope.getById(units,$scope.unitt);
		
		console.log("form",$scope.form);
  		
			$http.post('capex/add/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Budget Requested Successfully");
				$scope.form=null;
				$state.go('dashboard.home',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
 	}
	$scope.cancelAdd=function(){
		if($scope.userform.$dirty){
			var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
			promise.then(function handleResolve( response ) {$state.go('dashboard.home',{},{reload:true});},
					function handleReject( error ) {});
		}else{
			$state.go('dashboard.home',{},{reload:true});
		}
		
	}

 	
}])
.controller('editAssetCategoryCtrl',['$scope',"$rootScope",'modals','assetClasses','asset','$http','$state',
						function($scope,$rootScope,modals,assetClasses,asset,$http,$state) {
	$scope.assetClasses=assetClasses;
	$scope.form=asset;
 
	$scope.changeAsset=function(){
   		$scope.form.assetClassMaster=$rootScope.getById(assetClasses,$scope.form.assetClassMaster.id);
 	}

	$scope.update=function(){
		
		$http.post('assetCategories/update/'+$rootScope.userInfo.id,$scope.form).success(function(data){
			$rootScope.notify.showSuccess("details Updated Successfully");
			$state.go('dashboard.assetCategories',{},{reload:true});
			}).error(function(data){
				$rootScope.notify.handleError(data);
			})

	}

   	 	
}])
.controller('addUnitCtrl',['$scope',"$rootScope",'companies','modals','divisions','subdivisions','facilities','buildings','coldRooms','staffQuarters','sheds','locations','locationNames','$http','$state', 
				function($scope,$rootScope,companies,modals,divisions,subdivisions,facilities,buildings,coldRooms,staffQuarters,sheds,locations,locationNames,$http,$state) {
	$scope.form={};
	$scope.companies=companies;
	$scope.divisons=divisions;	
	$scope.subdivisons=subdivisions;
	$scope.facilities=facilities;
	$scope.buildings=buildings;
	$scope.coldRooms=coldRooms;
	$scope.staffQuarters=staffQuarters;
	$scope.sheds=sheds;
	$scope.locations=locations;
	$scope.locationNames=locationNames;
	$scope.emptyDown=true;

	$scope.changeSubDivision=function(){
 		$scope.form.subDivisionMaster=$rootScope.getById(subdivisions,$scope.subdivi);
 	}
 	
	$scope.locationsShow=function(){
		
	}
			
	/*	
	$scope.location1=false;
	$scope.location2=false;
	$scope.location3=false;
	$scope.location4=false;
	$scope.location5=false;


	$scope.changeLocation=function(){
  		
  		if($scope.location==1){
  			$scope.location1=true;
  			$scope.location2=false;
  			$scope.location3=false;
  			$scope.location4=false;
  			$scope.location5=false;
   		}else if($scope.location==2){
  			$scope.location1=false;
  			$scope.location2=true;
  			$scope.location3=false;
  			$scope.location4=false;
  			$scope.location5=false;
  		}else if($scope.location==3){
  			$scope.location1=false;
  			$scope.location2=false;
  			$scope.location3=true;
  			$scope.location4=false;
  			$scope.location5=false;
  		}else if($scope.location==4){
  			$scope.location1=false;
  			$scope.location2=false;
  			$scope.location3=false;
  			$scope.location4=true;
  			$scope.location5=false;
  		}else if($scope.location==5){
  			$scope.location1=false;
  			$scope.location2=false;
  			$scope.location3=false;
  			$scope.location4=false;
  			$scope.location5=true;
  		}

	}  **/
	
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
	
/*	
	$scope.unitLocations={};
	$scope.form.unitMaster=[];
	$scope.form.unitMaster.unitLocations=[];
	$scope.table=[];
	$scope.tabb={};
	$scope.addRow=function(){
		
		console.log('loc',$scope.location);
  		if($scope.location==1){
   			$scope.unitLocations.sheds=$rootScope.getById(sheds,$scope.shedd);
  			$scope.unitLocations.locations=$rootScope.getById(locations,$scope.location);
 			$scope.form.unitMaster.unitLocations.push($scope.unitLocations);
  			
 			$scope.tabb.locations=$rootScope.getById(locations,$scope.location);
 			$scope.tabb.name=$rootScope.getById(sheds,$scope.shedd);
 			$scope.table.push($scope.tabb);
  			$scope.location=null;
  			$scope.shedd=null;
  			console.log('tab',$scope.table);
   		}else if($scope.location==2){
   			$scope.unitLocations.staffQuarters=$rootScope.getById(staffQuarters,$scope.staff);
  			$scope.unitLocations.locations=$rootScope.getById(locations,$scope.location);
 			$scope.form.unitMaster.unitLocations.push($scope.unitLocations);
  			
 			$scope.tabb.locations=$rootScope.getById(locations,$scope.location);
 			$scope.tabb.name=$rootScope.getById(sheds,$scope.staff);
 			$scope.table.push($scope.tabb);
  			$scope.location=null;
  			$scope.staff=null;
  			console.log('tab',$scope.table);
   			
   			
   		}else if($scope.location==3){
  			$scope.unitMaster.coldRoom=$rootScope.getById(coldRooms,$scope.coldy);
  			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.coldRoom);
  			$scope.location=null;
  			$scope.coldy=null;
  		}else if($scope.location==4){
  			$scope.unitMaster.buildings=$rootScope.getById(buildings,$scope.buildy);
  			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.location);
  			$scope.location=null;
  			$scope.buildy=null;
  		}else if($scope.location==5){
  			alert($scope.selected);
  			alert($scope.customSelected);
  			$scope.unitMaster.facilities=$rootScope.getById(facilities,$scope.faci);
  			$scope.form.unitMaster.unitLocations.push($scope.unitMaster.facilities);
  			$scope.location=null;
  			$scope.faci=null;
  		}
   	}
 */	
	$scope.unitLocations={};
	$scope.form.unitMaster={};
	$scope.form.unitLocations=[];
	$scope.addRow=function(){
		$scope.unitLocations={};
 		
		$scope.unitLocations.locationName=$rootScope.getById(locationNames,$scope.selected.id);
		$scope.unitLocations.locations=$rootScope.getById(locations,$scope.location);
		$scope.form.unitLocations.push($scope.unitLocations);
 		$scope.location=null;
		$scope.selected=null;
		$scope.unitLocations=null;
 	}
	
 	$scope.deleteRow=function(index){
 		$scope.form.unitLocations.splice(index,1);	
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
   		
  		
  		$scope.update=function(){
  			
			$http.post('companies/update/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Company details Updated Successfully");
				$state.go('dashboard.companyMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})

  		}
 	 
}])
.controller('DivisionEditCtrl',['$scope',"$rootScope",'division','companies','$http','$state','modals',function($scope,$rootScope,division,companies,$http,$state,modals) {
  		$scope.form=division;
   		$scope.companies=companies;
  		
   		$scope.changeCompany=function(){
   			$scope.form.companyMaster=$rootScope.getById(companies,$scope.form.companyMaster.id);
   		}

  		$scope.update=function(){
  			
			$http.post('divisions/update/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Division details Updated Successfully");
				$state.go('dashboard.divisionMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})

  		}
 	 
}])
.controller('SubDivisionEditCtrl',['$scope',"$rootScope",'subdivision','divisions','$http','$state','modals',function($scope,$rootScope,subdivision,divisions,$http,$state,modals) {
  		$scope.form=subdivision;
   		$scope.divisions=divisions;
  		
   		$scope.changeDivision=function(){
   			$scope.form.divisionMaster=$rootScope.getById(divisions,$scope.form.divisionMaster.id);
   		}
   		
  		$scope.update=function(){
  			
			$http.post('subdivisions/update/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Sub-Division details Updated Successfully");
				$state.go('dashboard.subDivisionMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})

  		}
 	 
}])
.controller('changePasswordCtrl',['$scope','modals','$rootScope','$http','$state',function($scope,modals,$rootScope,$http,$state) {
	
 	$scope.form={};
	$scope.user=$scope.userInfo;
	$scope.change=function(){
		 
 		if($scope.form.oldpassword==null){
			$rootScope.notify.showError("Enter Old Password");
		}else if($scope.form.newpassword==null){
			$rootScope.notify.showError("Enter new password");
		}else if($scope.form.renewpassword==null || $scope.form.renewpassword!=$scope.form.newpassword){
			$rootScope.notify.showError("Re-enter new password properly");
		}else{
 			$http.post('user/changePassword/'+$rootScope.userInfo.id+'/'+$scope.form.oldpassword+'/'+$scope.form.newpassword).success(function(data){
				$rootScope.notify.showSuccess("password changed successfully");
				$state.go('dashboard.home',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
			
		}
	}
	
	
}])
.controller('AddUserCtrl',['$scope',"$rootScope",'modals','users','departments','$http','$state', function($scope,$rootScope,modals,users,departments,$http,$state) {
	$scope.form={};
	$scope.users=users;
	$scope.departments=departments;
 
	$scope.getHODList=function(list){
		$scope.hods=[];
			angular.forEach(list, function(obj){
	        		if(obj.userType==2){
	        			$scope.hods.push(obj);
	        		}
			});
	}

	$scope.getManagerList=function(list){
 		$scope.managers=[];
			angular.forEach(list, function(obj){
 	        		if(obj.userType==3){
	        			$scope.managers.push(obj);
 	        		}
			});
	}

	$scope.hod=function(){
 		$scope.managerId=null;
	}
	
	$scope.manager=function(){
 		$scope.hodId=null;
	}
	
	$scope.addUser=function(){
		
		$scope.form.hodId=$rootScope.getById(users,$scope.hodId);
		$scope.form.managerId=$rootScope.getById(users,$scope.managerId);
		$scope.form.department=$rootScope.getById(departments,$scope.deptId);
		
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
.controller('UserEditCtrl',['$scope',"$rootScope",'user','users','departments','$http','$state','modals',function($scope,$rootScope,user,users,departments,$http,$state,modals) {
  		$scope.form=user;
  		$scope.departments=departments;
 		$scope.form.password=null;
  		$scope.conpass=null;
  		$scope.users=users;
  		
  		
  		 
  		$scope.hods=[];
		angular.forEach(users, function(obj){
 				if(obj.id==$scope.form.hodId){
					$scope.hodd=obj;
 				}
				else if(obj.userType==2){
        			$scope.hods.push(obj);
        		}
		});
 
 		$scope.managers=[];
		angular.forEach(users, function(obj){
        		if(obj.userType==3){
        			$scope.managers.push(obj);
        		}
		});
    		
 		$scope.updateUser=function(){	
  			if($scope.form.hodId.id!=null){
 	 			$scope.form.hodId=$rootScope.getById(users,$scope.form.hodId.id);
 	 			$scope.form.managerId=null;
  			}else if($scope.form.managerId.id!=null){
 	 			$scope.form.managerId=$rootScope.getById(users,$scope.form.managerId.id);
 	 			$scope.form.hodId=null;
  			}
  			
 			if($scope.form.department.id!=null){
 	 			$scope.form.department=$rootScope.getById(departments,$scope.form.department.id);
  			}
		 
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
	
	 
}])
.controller('UnitEditCtrl',['$scope',"$rootScope",'unit','locations','locationNames','$http','$state','modals',function($scope,$rootScope,unit,locations,locationNames,$http,$state,modals) {
		$scope.form=unit;
 		$scope.locations=locations;
 		$scope.locationNames=locationNames;
		 
 		$scope.addRow=function(){
 			$scope.unitLocations={};
  			
 			$scope.unitLocations.locationName=$rootScope.getById(locationNames,$scope.selected.id);
 			$scope.unitLocations.locations=$rootScope.getById(locations,$scope.location);
 			$scope.form.unitLocations.push($scope.unitLocations);
  			$scope.location=null;
 			$scope.selected=null;
 			$scope.unitLocations=null;
 	 	}

 		
	$scope.updateUnit=function(){	
		
  			$http.post('units/update/'+$rootScope.userInfo.id,$scope.form).success(function(data){
				$rootScope.notify.showSuccess("Unit Updated Successfully");
				$state.go('dashboard.unitMaster',{},{reload:true});
    			}).error(function(data){
    				$rootScope.notify.handleError(data);
    			})
	}
	
	$scope.cancelUpdate=function(){
		if($scope.userform.$dirty){
			var promise = modals.open("confirm",{ message: "Unsaved Data! Are you sure to Cancel ?"});
			promise.then(function handleResolve( response ) {$state.go('dashboard.unitMaster',{},{reload:true});},
					function handleReject( error ) {});
		}else{
			$state.go('dashboard.unitMaster',{},{reload:true});
		}
		
	}

 
}]);
