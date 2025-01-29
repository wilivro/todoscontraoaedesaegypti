define(function (require) {
    "use strict"
    
    var tarefaRevelaBtn = addTarefa();
    
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;
    
    var revelaMod = require('../lib/revela');

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(alter, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco
    var peca = this;
    
    var config = {
            width: 130,
            height: 35,
            margin: 5,
            padding: 5,
            fontSize: 15,
            qtdX: 4,
            cb: null
    }
    
    if (settings) {
            $.extend(config, settings);
        }
        
        //container principal
        var $revBtn  = $('<section>')
            .addClass('revela-btn')
            .attr('data-edi', 'revela-btn')
            .appendTo('#conteudo');
        
        //container dos btns
        var $boxBtn = $('<div>')
            .addClass('box-btn')
            .css({width: ((config.width+config.margin*2+config.padding*2)+10)*config.qtdX})
            .appendTo($revBtn);
        
        //container dos revelas
        var $boxRev = $('<div>')
            .addClass('box-rev')
            .appendTo($revBtn);
        
               //criando btns e revelas
        alter.forEach(function (obj, i) {
            var ctTexto = $('<div>')
                .css({
                    width: config.width,
                    height: config.height,
                    display: 'table-cell',
                    position: 'relative',
                    verticalAlign: 'middle'
                })
                .html(obj.titulo)

            var $btn = $('<div>')
                .addClass('btn btn-default')
                .attr('data-revela', i)
                .html(ctTexto)
                .css({
                    width: config.width,
                    height: config.height,
                    margin: config.margin,
                    padding: config.padding,
                    fontSize: config.fontSize,
                    float: 'left'
                }).appendTo($boxBtn);
            
            var $rev = $('<div>')
                .addClass('revela')
                .attr('data-revela', i)
                .appendTo($boxRev);
            
            //se tiver imagem
            if (obj.img) {
                $('<img>')
                    .attr('src', obj.img)
                    .appendTo($rev);
            }
            
            var $revRight = $('<div>')
                .addClass('rev-right')
                .appendTo($rev);
            
            $('<h2>')
                .html(obj.titulo)
                .appendTo($revRight);
            
            $('<p>')
                .html(obj.texto)
                .appendTo($revRight);
        });
        
        function handlerClick (btn, rev) {
            $('.box-rev .revela').fadeOut();
            $('.btn').css('opacity', 1);
            //fade à mão
            btn.css('opacity', 0);
        }
        
        //chemando o revela
        revelaMod.revela('btn', 'revela', function (a, b) {
            handlerClick(a, b);
        }, function () {
            //
        }, {bloqueiaClickFinal: false});
        
        ARR_TAREFAS[tarefaRevelaBtn].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revelaBtn: _init
  }

});