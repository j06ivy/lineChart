function Zyxel_FuncFactory() {
    if( !(this instanceof Zyxel_FuncFactory) ){
        return new Zyxel_FuncFactory();
    }
    this.Init();
}

Zyxel_FuncFactory.prototype.Init = function() {
    // body...
    var GetJSONDataModule = angular.module('GetJSONDataModule', []);
    GetJSONDataModule.factory('getJsonDataSerivce', function($http) {            
        var counter = 0;
        return function(data_url, _scope){            
          var HttpGet = function (url, counter, _scope) { 

               var rand_url = url +"?rand=" + new Date().getTime();               
               $http.get(rand_url)
                .success(function(jsonData) {
                    console.log('success');
                    _scope.chartConfig.series = jsonData;                  
                }).error(function(jsonData, status) {
                    console.log('oops, get json data failed!, retry times:' + (counter++));
                    if(counter<3) {            
                        HttpGet(data_url, counter, _scope);
                    }
                    else {
                        _scope.chartConfig.series = [];
                    }
                });
            }
            HttpGet(data_url, counter, _scope);    
        };
    });

    var checkConfigValue = function (user_value, possibleList) {
        var ret = '';
        
        if(possibleList.length == 0){
            return '';
        }
        if(user_value === '' || user_value == undefined) {
            return possibleList[0];
        }
        var pos = possibleList.indexOf(user_value);
        return ((pos > -1) ? possibleList[pos] : possibleList[0]);        
    }

    //Module initialization
    var widgetModule = angular.module('widget_config', ['GetJSONDataModule']);
    widgetModule.factory('highstock_config', function (getJsonDataSerivce){
        
        var chartConfig = {       
            options: {
                chart: { 
                    zoomType: 'x'                    
                },
                rangeSelector : {
                    buttons: [{
                        type: 'hour',
                        count: 1,
                        text: '1h'
                    }, {
                        type: 'day',
                        count: 1,
                        text: '1d'
                    }, {
                        type: 'month',
                        count: 1,
                        text: '1m'
                    }, {
                        type: 'year',
                        count: 1,
                        text: '1y'
                    }, {
                        type: 'all',
                        text: 'All'
                    }],
                    inputEnabled: false,
                    selected : 2
                },
                legend: {
                       enabled: true,
                        align: 'right',
                        y:40,
                        verticalAlign: 'top',
                        floating:'false',
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                navigator: {
                    enabled: true
                }
            },
            series: [],       
            title: {
                text: 'Power Consumption'
            },
            yAxis: {
                opposite: false,
                labels: {
                    align: 'right',
                    x: 0,
                    y: -2,
                    formatter: function () {
                        return this.value + 'w';
                    }
                },

            },
            useHighStocks: true
        }
              
        return function(jsonObj, _scope) {            
            var config = chartConfig;
            config.options.chart.zoomType      = checkConfigValue(jsonObj.zoomType, ['x', 'y', 'xy']);
            config.options.navigator.enabled   = checkConfigValue(jsonObj.navigator, [true, false]);
            config.title.text                  = jsonObj.title;            
            config.options.useHighStocks       = checkConfigValue(jsonObj.useHighStocks, [true, false]);
            _scope.chartConfig = config;
            getJsonDataSerivce(jsonObj.data_url, _scope);            
        };    
    });

    widgetModule.factory('map_config', function(){ 

    });

    widgetModule.factory('topochart_config', function(){ 
        
    });

    widgetModule.factory('xxx_config', function(){ 
        
    }); 
};

Zyxel_FuncFactory.prototype.InitMapConfig = function (){

};


Zyxel_FuncFactory.prototype.InitTopoConfig = function (){
    
};

(function(){
    var _instance = Zyxel_FuncFactory();
})()
