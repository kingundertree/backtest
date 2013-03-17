
function showMenu(){
	var sl=document.getElementById('mycustomer');
	var slLeft=sl.offsetLeft;

	if (slLeft==0) {
		sl.style.left="240px";
		//sl.style.boxshadow="-3px 0 4px #999";
	}else{
		sl.style.left="0px";
	}
}


angular.module('customerlistall',[]).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/temple', {templateUrl: 'temple/customerlistall.html', controller: customerlist}).
      otherwise({redirectTo: '/temple'});
}]);


function customerlist($scope, $http) {
	$http.get("data/user.json").success(function(data) {

		// 最后来电时间
		$scope.orderProp = "-lastcalltime";
		for (var i in data) {
			var time = data[i].lastcalltime;
			var now = new Date().getTime();  
			var tdiff = parseInt((now - time)/1000);
			var day = parseInt(tdiff/86400);
			if (day > 0) {
				data[i].lct = day + "天前";
			} else {
				var min = parseInt(tdiff/60);
				if (min < 60) {
					data[i].lct = min + "分钟前";
				} else {
					var hour = parseInt(tdiff/3600);
					data[i].lct = hour + "小时前";
				}
			}
		}

		$scope.users = data;
	});

	$scope.phone = function(user) {
		document.getElementById("cover").style.display = "block";
		$scope.user = user;
	}
}

