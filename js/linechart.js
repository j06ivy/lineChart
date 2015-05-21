var chartApp = angular.module('chartApp', ["highcharts-ng", "widget_config"]);

var settingString = '{"data_url": "js/json/chart-data.json", "zoomType": "xy", "navigator": true, "title": "Power Consumption"}';
var settingString2 = '{"data_url": "js/json/chart-data.json", "zoomType": "xy", "navigator": true, "title": "Power Consumption2","inputEnabled": "true"}';

chartApp.value("config_data", settingString);
chartApp.value("config_data2", settingString2);
chartApp.controller('myctrl', function ($scope, $http, $timeout, config_data, highstock_config){
    
    highstock_config( angular.fromJson(config_data), $scope );    
     
});
chartApp.controller('myctrl2', function ($scope, $http, $timeout, config_data2, highstock_config){
    
    highstock_config( angular.fromJson(config_data2), $scope );    
     
});
