define(function (require) {
  var tarefaQuebraCabeca = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _telaAtual() {
    return edi.util.getURL('quest');
  }

  function _init(src, callBack, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var stageScale = getScale();

    var config = {
      width: 300,
      height: 300,
      left: 10,
      top: 10,
      background: '#ddd',
      numPecas: 4, //este valor não é preciso
      callBacks: null
    };

    if (settings) {
      $.extend(config, settings);
    }

    //container quebra-cabeça
    var $quebraCabeca = $('<section>')
      .addClass('quebra-cabeca')
      .attr('data-edi', 'quebraCabeca')
      .css({
        width: '100%',
        height: 315,
        position: 'absolute'
      }).appendTo('#conteudo');

    var $puzzleParent = $('<div>')
      .addClass('puzzle-parent')
      .attr('id', 'puzzle-parent')
      .css({
        position: 'absolute',
        left: config.left,
        top: config.top,
        width: config.width,
        height: config.height,
        transform: 'scale(' + 1 / stageScale + ')'
      }).appendTo($quebraCabeca);

    $('<canvas>')
      .addClass('puzzle-canvas')
      .attr('id', 'puzzle-canvas')
      .css({
        width: config.width,
        height: config.height
      }).appendTo($puzzleParent);

    new Puzzle('puzzle-parent', {
      src: src,
      largura: config.width,
      altura: config.height,
      numPieces: config.numPecas,
      backgroundColor: config.background,
      callBack: function () {
        edi.finalizar();
        if (callBack) callBack();
      },
      callBacks: config.callBacks//passar um array com os callbacks
    });

    ARR_TAREFAS[tarefaQuebraCabeca].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    telaAtual: _telaAtual,
    quebraCabeca: _init
  };

});
