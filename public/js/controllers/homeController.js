

myApp.controller('AppCtrl',function($scope,$http){

	$http({
				    url: "/home",
				    method: "GET"
				}).success(function(response) {

				 $scope.name = response.google.name;
				 $scope.friends = response.google.contacts.length


				
				
				}).error(function(response) {
				    console.log(response);
				});
			
		

});