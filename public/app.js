var app = angular.module('myApp', []);

app.factory('socketio', function ($rootScope) {
  var socket = io.connect('http://localhost:8080');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});

// in one of your controllers
app.controller('MyCtrl', ['$scope', 'socketio', function ($scope, socketio) {
    socketio.on('count', function (data) {
	  $scope.sock = data;
	});
}]);