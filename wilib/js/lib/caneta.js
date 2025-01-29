define(function(require) {
  "use strict";

  var tarefaCaneta = addTarefa();

  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(texto, callback, settings) {
    edi.iniciar(_configEDI); //montar o palco

    var config = {
      texto: {
        width: 450,
        position: 'absolute',
        left: 30,
        top: 40,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'script',
        color: '#919191',
        lineHeight: 1.4,
        textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
      },
      caneta: {
        width: 150,
        posInicial: {
          x: 600,
          y: 10
        },
        posFinal: {
          x: 600,
          y: 10
        },
        ponta: 7,
        imagem: '../wilib/img/svg/caneta.svg',
        ajustePonta: {
          x: 0,
          y: 0
        }
      },
      tempo: 60,
      cb: null
    };

    if (settings) {
      $.extend(config, settings);
    }

    var _font;
    switch (config.texto.fontFamily) {
      case 'script':
        _font = 'fontScript';
        break;

      case 'eraserdust':
        _font = 'fontErasdust';
        break;

      default:
        _font = 'fontScript';
        break;
    }

    var util = {
      //retorna um numero inteiro e aleatório entre o min e o max
      getRandomInt: function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      },

      getOffSet: function(a) {
        return {
          left: (a.offset().left + (a.width() / 2)),
          top: (a.offset().top + (a.height() / 2)) - a.parent().height()
        };
      }
    };

    //container principal
    var $canetaBox = $('<section>')
      .addClass('caneta-box')
      .attr('data-edi', 'caneta')
      .css({
        width: 790,
        height: 315,
        position: 'absolute'
      }).appendTo('#conteudo');

    //adicionando o texto ao palco
    var $texto = $('<p>')
      .attr('id', 'caneta-texto')
      .css(config.texto)
      .appendTo($canetaBox);

    //ocultando o texto
    var tmp = '',
      tag = false;
    for (var i = 0; i <= texto.length; i++) {

      // tratando as tags
      if (texto[i] == '<') { // se o caractere atual for '<' então é uma tag
        tag = true;
      } else if (texto[i] == '>' && tag) { // se tag == true e caractere atual for '>' entao feche a tag
        tag = false;
      }

      // montando a tag
      if (tag) {
        tmp += texto[i];
      } else if (texto[i] == '>' && !tag) {
        tmp += texto[i];
        $(tmp).appendTo($texto);
        tmp = ''; //limpando a variável temporaria
      }

      // modificando texto e adicionando
      if (!tag && texto[i] != '>') {
        $('<span>')
          .addClass('a ' + _font)
          .attr('id', 'letra' + i)
          .html(texto[i])
          .css({
            color: config.color,
            opacity: 0
          }).appendTo($texto);
      }
    }

    //criando ponto de referência inicial
    $('<span>')
      .attr('id', 'posInicial')
      .css({
        position: 'absolute',
        left: config.caneta.posInicial.x,
        top: config.caneta.posInicial.y
      }).appendTo($canetaBox);

    //criando ponto de referência final
    $('<span>')
      .attr('id', 'posFinal')
      .css({
        position: 'absolute',
        left: config.caneta.posFinal.x,
        top: config.caneta.posFinal.y
      }).appendTo($canetaBox);

    //criando e animando a caneta
    var $caneta = $('<img>')
      .attr({
        'id': 'caneta',
        'src': config.caneta.imagem
      })
      .css({
        width: config.caneta.width * (WINDOW_WIDTH / WIDTH_DEFAULT),
        backgroundSize: '100% 100%',
        position: 'absolute',
        left: $('#posInicial').offset().left,
        top: $('#posInicial').offset().top,
        cursor: 'pointer'
      }).appendTo('body');

    function canetaAnimation() {
      $caneta.css({
        left: '+=' + util.getRandomInt(0, 17),
        top: '+=' + util.getRandomInt(0, 17)
      });
    }

    $caneta.click(play);

    function play() {
      $caneta.off();
      $caneta.animate({
        left: $('#letra0').offset().left,
        top: ($('#letra0').offset().top - (config.texto.fontSize * (WINDOW_WIDTH / WIDTH_DEFAULT))) - ($caneta.height() * 0.75)
      }, 1000, function() {

        //mascara
        var index = 0;
        var loop = setInterval(function() {
          var $letra = $('#letra' + index)
            .css('opacity', 1)
            .removeClass('a');

          if ($letra.offset() !== null) {
            $caneta.css({
              left: $letra.offset().left + (config.caneta.ajustePonta ? config.caneta.ajustePonta.x : 0),
              top: (($letra.offset().top - (config.texto.fontSize * (WINDOW_WIDTH / WIDTH_DEFAULT))) - ($caneta.height() * 0.75)) + (config.caneta.ajustePonta ? config.caneta.ajustePonta.y : 0)
            });
          }

          canetaAnimation();

          index++; //incrementando o indice de letras

          if ($('.a').length === 0) { //verificando se a mascara acabou
            clearInterval(loop);
            $caneta.css('z-index', -100);
            $caneta.animate({
              left: $('#posFinal').offset().left,
              top: $('#posFinal').offset().top + 100
            }, 1000);
            edi.finalizar();
            if (callback) callback();
          }
        }, config.tempo);
      });
    }

    ARR_TAREFAS[tarefaCaneta].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    caneta: _init
  };

});
