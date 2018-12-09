'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.Home',  
  'myApp.AboutUs',
  'myApp.AboutUsPages',
  'myApp.Products',
  'myApp.ProductDetails',
  'myApp.ProductFullDetails',
  'myApp.ContactUs',
  'myApp.ContactUsPages',
  'myApp.ContactUsEnquiry',
  'myApp.Services',
  'myApp.Clients',
  'myApp.SocialWork',
  'myApp.version',
  'ngAnimate'
]).
config(function($routeProvider,$locationProvider) {
      //  $locationProvider.html5Mode(true);
  $routeProvider.otherwise({redirectTo: '/Home'});
})
.controller('localeCntr', function($scope,$http,$route) {

// alert('Narender');
    $scope.selectedPage="Home";
 $scope.narender='Narender Rao Balguri';
 $scope.traslations={};
 $scope.permissions={
     "services":false,
     "clients":false,
     "socialwork":false,
     "FAQS":false,
     "careers":false,
     "productvideos":false
     
 };
 $scope.sendmail=function(serializedData){
      
   $http({method: 'POST',url:"sendmail.php",data:serializedData,headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function(response){
         console.log(response);
         alert("Mail sent");
         $route.reload();
    }, function(){});

   
 };
 $scope.language=localStorage.language?localStorage.language:"english";
 var languageFilePath = 'js/data/translations/' + $scope.language + '.json';
           // $resource(languageFilePath).get(function (data) {
    $http.get(languageFilePath).success(function(response) {
        $scope.traslations= response;
        $('.loading').fadeOut();
    });
    $scope.changeLanguage=function(language){
        $(".lang-right button").removeClass("selected");
        $('#'+language).addClass("selected");
        $scope.language=language;
        localStorage.language=language;
        languageFilePath='js/data/translations/' + language + '.json';
        $http.get(languageFilePath).success(function(response) {
        $scope.traslations= response;
    });
    
    };
    $scope.getTranslation=function(key){
       var translation= $scope.traslations[key];
       return translation==undefined?key:translation;
    };
 
});

;

angular.module('myApp.Home', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Home', {
    templateUrl: 'templates/Home.html',
    controller: 'Home'
  });
}])

.controller('Home', function($scope,$http) {
  var imagePath = 'images/Logo.png';
   $scope.selectedPage='Home';
    $scope.pageclass='page-home';       
    
     $('.nav li ').removeClass("active");
     $('.nav li ').removeClass("hover");
     $('#liHome').addClass("active");
});

angular.module('myApp.AboutUs', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/AboutUs', {
    templateUrl: 'templates/AboutUs.html',
    controller: 'AboutUs'
  });
}])
       
.controller('AboutUs', [function() {
 $('.nav li ').removeClass("active");
 $('.nav li ').removeClass("hover");                                                                                                                                                                                                                
     $('#liAboutUs').addClass("active");

}]);

angular.module('myApp.AboutUsPages', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/AboutUs/:id', {
    templateUrl: 'templates/AboutUs.html',
    controller: 'AboutUsPages'
  });
}])

.controller('AboutUsPages', function($scope, $http,$route,$routeParams) {
        $scope.selectedTag = ($routeParams.id || 0 );
$scope.selectedPage='AboutUs';
  $('.nav li').removeClass("active");
  $('.nav li ').removeClass("hover");
     $('#liAboutUs').addClass("active");
     
     

});

angular.module('myApp.Products', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Products', {
    templateUrl: 'templates/Products.html',
    controller: 'Products'
  });
}])

.controller('Products', function($scope, $http,$route,$routeParams) {
        $scope.productsPage = ($routeParams.productsPage || 0 );
//$scope.pageclass='page-products';
$scope.selectedPage='Products';
$scope.permissions={  
     "Chicken":true,
     "Fish":false,
     "Shirmp":false,
     "Dog":false,
     "Horse":false,
     "Cow":false,
     "Pig":false,
     "Cat":false
 };
// $http.get("js/data/productList.json")
//  .success(function (response) {
//      $scope.todos = response.records;
//      });
    $('.nav li ').removeClass("active");
     $('.nav li ').removeClass("hover");
     $('#liProducts').addClass("active");
});


angular.module('myApp.ProductDetails', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ProductDetails/:category', {
    templateUrl: 'templates/ProductDetails.html',
    controller: 'ProductDetails'
  });
}])

.controller('ProductDetails', function($scope,$http, $route,$routeParams) {
         var renderAction = $route.current.action;
$scope.selectedPage='Products';
// $scope.pageclass='page-products';
$scope.category = ($routeParams.category || "" );
//$http.get("js/data/productDetails/"+$scope.product_Id+".htm")
$http.get("js/data/productList.json")
  .success(function (response) {
      $scope.productList = response.records;
      $scope.productid=($routeParams.productid || 0 );
      });
      
      $('.nav li ').removeClass("active");
     $('.nav li ').removeClass("hover");
     $('#liProducts').addClass("active");
});


angular.module('myApp.ProductFullDetails', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ProductDetails/:category/:productid', {
    templateUrl: 'templates/ProductDetails.html',
    controller: 'ProductFullDetails'
  });
}])

.controller('ProductFullDetails', function($scope,$http, $route,$routeParams) {
         var renderAction = $route.current.action;
// $scope.pageclass='page-products';
 $scope.selectedPage='Products';
$scope.category = ($routeParams.category || "" );
$scope.productid=($routeParams.productid || "" );
//$http.get("js/data/productDetails/"+$scope.product_Id+".htm")
$http.get("js/data/productList.json")
  .success(function (response) {
      $scope.productList = response.records;
//      $scope.enlargeImage=function(e){
//          $('ul #enlarge').
//      };
//      
      });
      
      $('.nav li ').removeClass("active");
     $('.nav li ').removeClass("hover");
     $('#liProducts').addClass("active");
    
});


angular.module('myApp.ContactUsPages', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ContactUs/:id', {
    templateUrl: 'templates/ContactUs.html',
    controller: 'ContactUsPages'
  });
}])

.controller('ContactUsPages', function($scope, $http,$route,$routeParams) {
        $scope.selectedTag = ($routeParams.id || 0 );
$scope.selectedPage='ContactUs';

$scope.getLocation=function getLocation()
    {
                var mapProp = {
                    center: new google.maps.LatLng(17.479746 , 78.425212),
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                 $('#map').width($('#map').parent().width()).height($('#map').parent().height());
                var map = new google.maps.Map(document.getElementById("map"),mapProp);
                var marker = new google.maps.Marker({
    // The below line is equivalent to writing:
    // position: new google.maps.LatLng(-34.397, 150.644)
    position: new google.maps.LatLng(17.479746, 78.425212), //{lat: -34.397, lng: 150.644}
    map: map
  });

  // You can use a LatLng literal in place of a google.maps.LatLng object when
  // creating the Marker object. Once the Marker object is instantiated, its
  // position will be available as a google.maps.LatLng object. In this case,
  // we retrieve the marker's position using the
  // google.maps.LatLng.getPosition() method.
  var infowindow = new google.maps.InfoWindow({
    content: '<p>Decvin Labs Pvt Limited</p>'
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.open(map, marker);
  });
    };

  $('.nav li').removeClass("active");
  $('.nav li ').removeClass("hover");
     $('#liContactUs').addClass("active");
     
     

});

angular.module('myApp.ContactUs', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ContactUs', {
    templateUrl: 'templates/ContactUs.html',
    controller: 'ContactUs'
  });
}])
       
.controller('ContactUs', ['$scope',function($scope) {
 $('.nav li ').removeClass("active");
 $('.nav li ').removeClass("hover");                                                                                                                                                                                                                
     $('#liContactUs').addClass("active");
$scope.ContactType='Feedback';
 $scope.sendmail=function(){
   if($scope.htmlform.$valid){
         var data={email:'narenderrao',name:'Narender'};
         var serializedData = $('#feedbackForm').serialize();
         $scope.$parent.sendmail(serializedData);
   } else{
      alert('Please enter valid values');
   }

 };
 
   


}]);

angular.module('myApp.ContactUsEnquiry', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/ContactUs/Enquiry/:category/:productid', {
    templateUrl: 'templates/ContactUs.html',
    controller: 'ContactUsEnquiry'
  });
}])
       
.controller('ContactUsEnquiry', function($scope,$http, $route,$routeParams) {
        
 $scope.selectedPage='Products';
$scope.category = ($routeParams.category || "" );
$scope.productid=($routeParams.productid || "" );
$scope.ContactType='Enquiry';
$('#productDetails').html($scope.category + "  " + $scope.productid);
 $('.nav li ').removeClass("active");
 $('.nav li ').removeClass("hover");                                                                                                                                                                                                                
     $('#liContactUs').addClass("active");
 $scope.sendmail=function(){
   if($scope.htmlform.$valid){
         var data={email:'narenderrao',name:'Narender'};
         var serializedData = $('#feedbackForm').serialize();
serializedData+="&product="+encodeURIComponent($scope.category + "  " + $scope.productid);
         $scope.$parent.sendmail(serializedData);
   } else{
      alert('Please enter valid values');
   }

 };


});

angular.module('myApp.Services', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Services', {
    templateUrl: 'templates/Services.html',
    controller: 'Services'
  });
}])
       
.controller('Services', [function() {
 
 $scope.selectedPage='Services';
 $('.nav li ').removeClass("active");
     $('.nav li ').removeClass("hover");
     $('#liServices').addClass("active");

}]);

angular.module('myApp.Clients', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/Clients', {
    templateUrl: 'templates/Services.html',
    controller: 'Clients'
  });
}])
       
.controller('Clients', [function() {
 
 $scope.selectedPage='Clients';
 $('.nav li ').removeClass("active");
     $('.nav li ').removeClass("hover");
     $('#liClients').addClass("active");

}]);

angular.module('myApp.SocialWork', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/SocialWork', {
    templateUrl: 'templates/Services.html',
    controller: 'SocialWork'
  });
}])
       
.controller('SocialWork', [function() {
 
 $scope.selectedPage='SocialWork';
 $('.nav li ').removeClass("active");
     $('.nav li ').removeClass("hover");
     $('#liSocialWork').addClass("active");

}]);



//var settings=