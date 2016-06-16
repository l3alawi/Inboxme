


var myApp = angular.module('myApp',['ngMaterial','ngMessages','btford.socket-io','ngTagsInput','textAngular','ngSanitize','ngFileUpload']);




myApp.controller('WidthDemoCtrl',function ($mdDialog,$scope) {

  var vm = this;

  

  /*this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index ' + index)
        .ok('Nice')
    );
  };*/
})







myApp.controller('message', function($scope, $mdDialog, $mdMedia,$http) {


  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $http({
				    url: "/home",
				    method: "GET"
				}).success(function(response) {

				 $scope.messages= response.messageSend;




				
				
				}).error(function(response) {
				    console.log(response);
				});

		$scope.showMessage = function($index){
			console.log($index);
		}



  
  $scope.showAdvanced = function(ev,index) {

  	   	$scope.name = $scope.messages[index].to;
      $scope.message = $scope.messages[index].message;
      $scope.subject = $scope.messages[index].subject;

      $http({
            url: "/read",
            method: "POST",
            headers: {
          'Content-Type': 'application/json '
           },
            data: data
        }).success(function(data, status, headers, config) {
            console.log(data);
        }).error(function(data, status, headers, config) {
            console.log(status);
        });

  		console.log('rrr');
  		

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dialog1.tmpl.html',
      scope:$scope.$new(), 
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });



    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
}

    function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}




});



myApp.controller('inbox', function($scope, $mdDialog, $mdMedia,$http) {


  $scope.status = '  ';
  $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

  $http({
				    url: "/home",
				    method: "GET"
				}).success(function(response) {

				 $scope.messages= response.messageReceive;




				
				
				}).error(function(response) {
				    console.log(response);
				});

	



  
  $scope.showAdvanced = function(ev,index) {
  		

  		console.log('rrr');
  		$scope.name = $scope.messages[index].from;
  		$scope.message = $scope.messages[index].message;
  		$scope.subject = $scope.messages[index].subject;

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;

    $mdDialog.show({
      controller: DialogController,
      templateUrl: '<b /b> <i /i> <p /p> src="" alt=""',
      scope:$scope.$new(), 
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });



    $scope.$watch(function() {
      return $mdMedia('xs') || $mdMedia('sm');
    }, function(wantsFullScreen) {
      $scope.customFullscreen = (wantsFullScreen === true);
    });
}

    function DialogController($scope, $mdDialog) {
  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
}




});




/**
Copyright 2016 Google Inc. All Rights Reserved. 
Use of this source code is governed by an MIT-style license that can be in foundin the LICENSE file at http://material.angularjs.org/license.
**/




myApp.controller('MyCtrl', ['$scope', 'Upload', '$timeout', function ($scope, Upload, $timeout) {
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });
    $scope.$watch('file', function () {
        if ($scope.file != null) {
            $scope.upload([$scope.file]);
        }
    });
    $scope.log = '';

    $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                Upload.upload({
                    url: '/send',
                    fields: {
                        'username': $scope.username
                    },
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    $scope.log = progressPercentage + '%';
                           console.log(file);
                }).success(function (data, status, headers, config) {
                   
                        $scope.log = 'file: ' + config.file.name ;
                    
                });
            }
        }
    };
}]);


myApp.controller('contactsController', function ($http) {


// geet all contacts from server
	


// angular material autocomplete





})

myApp.controller('MainCtrl', function($scope,$mdDialog, $http) {


   $http({
            url: "/home",
            method: "GET"
        }).success(function(response) {

         console.log(response.user.friends);

        }).error(function(response) {
            console.log(response);
        });

$scope.desti = 'Friends in the app';
      $scope.loadCountries = function($query) {
        return data = $http({url:'/friendsApp', method:'GET',params: {searsh: $query}}).success(function(response) {
          });
      };


  

  $scope.aficher = function(index){

  	if(index == '0'){
  		$scope.desti = 'All friends';
        $scope.loadCountries = function($query) {
        return data = $http({url:'/profile', method:'GET',params: {searsh: $query}}).success(function(response) {
          });
      };

  	}

    if(index == '1'){
     $scope.desti = 'Friends in the app';
      $scope.loadCountries = function($query) {
        return data = $http({url:'/friendsApp', method:'GET',params: {searsh: $query}}).success(function(response) {
          });
      };

    }
  	if(index == '2'){
  		$scope.desti = 'Friends online';
  	}

  }




			$scope.sendMessage = function(){

				

				validateEmail($scope.tags);

				if(typeof  $scope.message == "undefined" || $scope.message == ''){
					$mdDialog.show(
			      $mdDialog.alert()
			        .title('Empty message !')
			        .textContent('You should write somethings !!')
			        .ok('Ok ?')
			    );
							}
					
				sendMail($scope.message,$scope.subject, $scope.tags);

				$scope.message = '';
        $scope.subject='';
        $scope.tags='';
				
			
		}



function sendMail(mail,subject,to){
	var data = {
								to: [String],
								subject: String,
								message:String,
								date:String
							}
	for(var i = 0; i< to.length ; i++){
		data.to.push(to[i].text);
	}
	var date = new Date();

	data.date = date;
	data.message = mail;
	data.subject = subject;
	console.log(data);


	$http({
				    url: "/send",
				    method: "POST",
				    headers: {
					'Content-Type': 'application/json '
					 },
				    data: data
				}).success(function(data, status, headers, config) {
				    console.log(data);
				}).error(function(data, status, headers, config) {
				    console.log(status);
				});
	


	
            

}

function validateEmail(object) {
	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



	    if(typeof object == 'undefined'){

	    	var j = i + 1;
			$mdDialog.show(
			      $mdDialog.alert()
			        .title('Email invalid !')
			        .textContent('You should write an email adress')
			        .ok('Ok ?')
			    );
			return ;

	    }


	for(var i = 0; i< object.length ; i++){
		if(re.test(object[i].text)){
			

		}else{
			var j = i + 1;
			$mdDialog.show(
			      $mdDialog.alert()
			        .title('Email invalid !')
			        .textContent('email number'+' '+ j +' '+'is invalid')
			        .ok('Ok ?')
			    );
		}
	}
    


}
				
  

});





myApp.controller('WidthDemoCtrl', DemoCtrl);

function DemoCtrl($mdDialog) {
  var vm = this;

  this.announceClick = function(index) {
    $mdDialog.show(
      $mdDialog.alert()
        .title('You clicked!')
        .textContent('You clicked the menu item at index ' + index)
        .ok('Nice')
    );
  };
}



