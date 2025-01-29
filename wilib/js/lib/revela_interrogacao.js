define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  var revelaMod = require('../lib/revela');

  function _init(revela, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var config = {
      fontSize: 13,
      img: '../img/fotos/mao_mundo.png',
      imgConfig: {
        width: 'auto',
        height: 'auto',
        left: 333,
        top: 8
      }
    };

    $.extend(config, settings);

    //criando container geral
    var $revela_interrogacao = $('<section>')
      .attr('data-edi', 'revela-interrogacao')
      .addClass('revela-interrogacao')
      .appendTo('#conteudo');

    //container esquerdo
    $('<div>')
      .addClass('boxx boxx-left')
      .appendTo($revela_interrogacao);

    //container esquerdo
    $('<div>')
      .addClass('boxx boxx-right')
      .appendTo($revela_interrogacao);

    //container flutuante verticalmente
    $('<div>')
      .addClass('boxx-in')
      .appendTo('.boxx');

    //criando o resto da estrutura dinamicamente
    revela.forEach(function (obj, i) {
      var $item = $('<div>')
        .addClass('item');

      $('<div>')
        .addClass('ico btn-rev')
        .attr('data-revela', i)
        .appendTo($item);

      $('<div>')
        .addClass('texto box-rev')
        .attr('data-revela', i)
        .css('font-size', config.fontSize)
        .html('<p>' + obj + '</p>')
        .appendTo($item);

      if (i < revela.length / 2) {
        $item.appendTo('.boxx-left .boxx-in');
      } else {
        $item.appendTo('.boxx-right .boxx-in');
      }
    });

    //imagem no centro
    if (config.img !== false) {
      $('<img>')
        .attr({
          'id': 'img',
          'src': config.img
        })
        .css(config.imgConfig)
        .appendTo($revela_interrogacao);
    }

    //icone e animacao
    $('.revela-interrogacao .ico')
      .iconeInterrogacao(true, {
        widthFinal: 41,
        heightFinal: 39
      });

    //chamando o revela
    revelaMod.revela('btn-rev', 'box-rev', function () {
      if (callback) callback();
    }, function () {
      if (callbackFinal) callbackFinal();
    });

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_interrogacao: _init
  };

});