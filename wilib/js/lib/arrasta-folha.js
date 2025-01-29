define(function(require) {
  "use strict";

  var tarefaArrastaFolha = addTarefa();

  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  var arrastaMod = require('../lib/arrasta');

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(folhas, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco

    var config = {
      width: 100, //largura da folha <-- QUEM IMPLEMENTOU NÃO UTILIZOU
      height: 120, //altura da folha <-- QUEM IMPLEMENTOU NÃO UTILIZOU
      fontSize: 13, //tamanho da font quando soltar
      lineHeight: 1, //espaçamento entre linhas
      minScale: 0.6, //valor minimo do transform: scale()
      maxScale: 1.3, //valor maximo do transform: scale()
      tamanhoAlvo: 640
    };

    if (settings) {
      $.extend(config, settings);
    }

    //container geral da peça
    var $arrastaFolha = $('<section>')
      .addClass('arrasta-folha')
      .attr('data-edi', 'arrastaFolha')
      .appendTo('#conteudo');

    //pasta
    var $pastaBack = $('<div>')
      .addClass('pasta-back')
      .appendTo($arrastaFolha);

    var $pastaFront = $('<div>')
      .addClass('pasta-front')
      .appendTo($arrastaFolha);


    var rotate = -45, //valor incial da rotação, será incrementado mais a frente
      left = 5; //valor inicial do left, também será incrementado mais a frente

    //criando os arrastas
    folhas.forEach(function(obj) {
      var $arrasta = $('<div>')
        .addClass('arrasta')
        .attr('data-correta', 0)
        .css({
          position: 'absolute',
          left: left,
          top: 59
        })
        .appendTo($arrastaFolha);

      var $folha = $('<div>')
        .addClass('arrasta-folha-folha')
        .html('<span>' + obj + '</span>')
        .attr('data-rotate', rotate)
        .css({
          transform: 'rotate(' + rotate + 'deg) scale(' + config.minScale + ')',
          fontSize: config.fontSize
        }).appendTo($arrasta);

      $folha
        .mouseenter(function() {
          self = $(this);
          self.css({
            transform: 'rotate(' + self.attr('data-rotate') + 'deg) scale(0.8)',
            zIndex: 1
          });
        })
        .mouseleave(function() {
          self = $(this);

          self.css({
            transform: 'rotate(' + self.attr('data-rotate') + 'deg) scale(' + config.minScale + ')',
            zIndex: 0
          });
        })
        .click(function() {
          self = $(this);

          self.css({
            transform: 'rotate(0deg) scale(' + config.minScale + ')',
            zIndex: 1
          });
        });

      rotate += 15; //incrementando o angulo de rotação
      left += 3; //incrementando o posicionamento left
    });

    //criando os alvos
    var $alvos = $('<section>')
      .addClass('arrasta-folha-alvos')
      .appendTo($arrastaFolha);

    folhas.forEach(function(obj) {
      var $alvo = $('<div>')
        .addClass('alvo')
        .attr('data-correta', 0)
        .css({
          width: config.tamanhoAlvo / folhas.length,
          height: 315,
          float: 'left'
        })
        .appendTo($alvos);
    });


    //métodos
    var self;

    function mouseEnter() {



    }

    function mouseLeave() {

    }

    function mouseClick() {

    }

    //chamando o arrasta()
    arrastaMod.arrasta('arrasta', 'alvo', function(a, b, c) {
      b.unbind();

      b.find('.arrasta-folha-folha').off();

      //criado para resolver problema de centraliazar
      c.find('.add').css({
        width: 'auto',
        height: 'auto'
      });

      if (a) {
        b.css({
          top: (c.height() / 2) - (b.height() / 2),
          left: (c.width() / 2) - (b.width() / 2),
          display: 'table-cell'
        });

        b.find('.arrasta-folha-folha').css({
          transform: 'rotate(0deg) scale(' + config.maxScale + ')',
          lineHeight: config.lineHeight
        });
      }

      if (callBack) callBack(a, b, c);
    }, function(a) {
      if (callBackFinal) callBackFinal(a);
    }, {
      target: false
    });

    ARR_TAREFAS[tarefaArrastaFolha].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    arrastaFolha: _init
  };

});