YahooWeatherGetter = new Object();
YahooWeatherGetter.showArea = undefined;

YahooWeatherGetter.showYahooWeather = function(lon, lat, div){
    YahooWeatherGetter.showArea = div;
    YahooWeatherGetter.callJsonp(YahooWeatherGetter.getUrlYahooPlaceFinder(lon, lat, YahooWeatherGetter.getYahooPlaceFinder));
}

YahooWeatherGetter.showError = function(){
    if(YahooWeatherGetter.showArea)
        YahooWeatherGetter.showArea.innerHTML = "無法取得天氣...";
}

YahooWeatherGetter.callJsonp = function(url){
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script);
}
function getYahooPlaceFinder(data){
    if(data){
        // data.query.results.Result.woeid
        // 28752317
        YahooWeatherGetter.callJsonp(
            YahooWeatherGetter.getUrlYahooWeatherForecast(data.query.results.Result.woeid, YahooWeatherGetter.getYahooWeatherForecast));
    }
}
YahooWeatherGetter.getYahooPlaceFinder = getYahooPlaceFinder;

function getYahooWeatherForecast(data){
    if(data){
        // data.query.results.Result.woeid
        // 28752317
        if(YahooWeatherGetter.showArea){
            var strHtml = "";
            strHtml += "<div style='float:left;'><img src='http://l.yimg.com/a/i/us/we/52/" + data.query.results.channel.item.condition.code + ".gif' /></div>";
            strHtml += "<div style='margin-left:60px;'><label>" + data.query.results.channel.location.city + "</label><br/>";
            strHtml += " " + data.query.results.channel.item.condition.temp.toFixed(1) + "℃ " + data.query.results.channel.item.condition.text + "</div>";
            
            // data.query.results.channel.location.city
            // data.query.results.channel.item.condition.code
            // http://l.yimg.com/a/i/us/we/52/28.gif
            YahooWeatherGetter.showArea.innerHTML = strHtml;
        }
    }
}
YahooWeatherGetter.getYahooWeatherForecast = getYahooWeatherForecast;

YahooWeatherGetter.getUrlYahooPlaceFinder = function(lon, lat, callback){
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22"
    + lat + "%2C" + lon + "%22%20and%20gflags%3D%22R%22%20and%20lang%3D%22zh%22&format=json&diagnostics=true&callback=" + callback.name;
    return url;
}

YahooWeatherGetter.getUrlYahooWeatherForecast = function(woeid, callback){
    var url = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D"
    + woeid + "%20and%20u%3D%22c%22&format=json&diagnostics=true&callback=" + callback.name;
    return url;

    http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D28752317%20and%20u%3D%22c%22&format=json&diagnostics=true&callback=
}

YahooWeatherGetter.getCfromF = function(f){
    var c = (f - 32) * 5 / 9;
    return c;
}

YahooWeatherGetter.getFfromC = function(f){
    var f = c * 9 / 5 + 32;
    return f;
}