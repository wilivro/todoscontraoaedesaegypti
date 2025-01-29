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
      mainWidth: 790,
      width: 300,
      height: 50,
      left: 0,
      top: 0,
      margin: 5,
      fontSize: 13,
      textAlign: 'center'
    };

    $.extend(config, settings);

    //criando container geral
    var $revela_exclamacao = $('<section>')
      .attr('data-edi', 'revela-exclamacao')
      .addClass('revela-exclamacao')
      .css({
        maxWidth: config.mainWidth,
        position: 'absolute',
        left: config.left,
        top: config.top
      })
      .appendTo('#conteudo');


    //criando o resto da estrutura dinamicamente
    revela.forEach(function (obj, i) {
      var $item = $('<div>')
        .addClass('item')
        .css({
          width: config.width,
          height: config.height,
          margin: config.margin,
          position: 'relative'
        })
        .appendTo($revela_exclamacao);

      var $revela = $('<div>')
        .addClass('box-rev')
        .attr('data-revela', i)
        .css({
          width: config.width,
          height: config.height,
          margin: config.margin,
          background: 'linear-gradient(to bottom, #fff, #eee)',
          boxShadow: '0 2px 2px rgba(0, 0, 0, 0.3)',
          borderTop: '1px solid rgba(0, 0, 0, 0.01)',
          borderRadius: 5,
          position: 'relative'
        })
        .appendTo($item);

      $('<div>')
        .addClass('ico btn-rev')
        .attr('data-revela', i)
        .css({
          width: 53,
          height: 47,
          position: 'absolute',
          left: 10,
          top: '50%',
          marginTop: -23
        })
        .appendTo($item);

      var $texto = $('<div>')
        .addClass('texto')
        .css({
          width: config.width - config.height - 20,
          height: config.height,
          fontSize: config.fontSize,
          position: 'absolute',
          left: config.height + 10,
          textAlign: config.textAlign,
          display: 'table'
        })
        .appendTo($revela);

      $('<p>').css({
        display: 'table-cell',
        verticalAlign: 'middle'
      })
        .html(obj)
        .appendTo($texto);
    });

    $('.ico').iconeExclamacao2(true);

    //chamando o revela
    revelaMod.revela('btn-rev', 'box-rev', function (a) {
      if (callback) callback();
      $(a)
        .html('')
        .iconeExclamacao2(true);
    }, function () {
      if (callbackFinal) callbackFinal();
    });

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_exclamacao: _init
  };

});
