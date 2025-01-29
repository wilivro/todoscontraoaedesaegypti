licao.config.DEBUG = false;
var Wiquadro = Wiquadro || {};
var WIQUADRO_URL_API = "http://localhost/";

// utils
(function($){
    Wiquadro = Wiquadro || {};
    Wiquadro.utils = {};
    
    Wiquadro.utils.querystring = function()
    {
        var querys = [];
        
        location.search.substring(1).split('&').forEach(function(query){
            var q = query.split('=');
            querys[q[0]] = q[1];
        });
        
        return querys;
    }();

    Wiquadro.utils.interation = function() {
        return {
            revela: 1,
            arrasta: 2,
            pergunta: 3,
            liga: 4,
            alternativa_botao: 5,
            alternativa: 6
        };
    }();
    
}(jQuery));

// api
(function($){
    Wiquadro = Wiquadro || {};
    Wiquadro.api = {};
    
    Wiquadro.api.setEdcmidiaAsFinished = function(callback){
        var idalunoturmaedcmidia = Wiquadro.utils.querystring['idalunoturmaedcmidia'],
            key = Wiquadro.utils.querystring['key'],
            urlApi = Wiquadro.utils.querystring['url_api'];
            
        var url = urlApi + '/platform/edcmidia?idalunoturmaedcmidia=' + idalunoturmaedcmidia + '&key=' + key;
        
        $.ajax({
            url: url,
            dataType: 'json'
        }).done(callback);
    }; 

    Wiquadro.api.addInteration = function(idtipointeracao, objetointeragido, interacao, acertou, callback){
        var idalunoturmaedcmidia = Wiquadro.utils.querystring['idalunoturmaedcmidia'],
            key = Wiquadro.utils.querystring['key'],
            urlApi = Wiquadro.utils.querystring['url_api'];
            
        var url = urlApi + '/platform/edcmidiainteration';

        $.ajax({
            url: url,
            type: "POST",
            data: {
                'idalunoturmaedcmidia': idalunoturmaedcmidia,
                'key': decodeURI(key),
                'idtipointeracao': idtipointeracao, 
                'objetointeragido': objetointeragido, 
                'interacao': interacao, 
                'acertou': acertou
            },
            dataType: 'json'
        }).done(callback);
    };

}(jQuery));