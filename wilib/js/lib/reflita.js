define(function (require) {
  var tarefaReflita = addTarefa();

  var C_PASTA_IMAGENS = '../../img/';

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  /**
   @typedef prdReflita
   @type {object}
   @property {number} x muda posição X do preparaFinalização.
   @property {number} y muda posição Y do preparaFinalização.
   */

  /**
   * Método para criar peça Reflita
   * @param {string} titulo Define o título do Reflita.
   * @param {string} texto  Define o texto do Reflita.
   * @param {prdProsseguir} mudar Utilizado para mudar paramêtros do botão prosseguir.
   * @param {prdReflita} settings Modifica x e y do preparaFinalização.
   */
  function _init(titulo, texto, settings) {
    edi.iniciar(_configEDI);//montar o palco

    $('#dv_titulo').remove();

    var config = {
      mascote: true,
      raio: true,
      lineHeight: undefined
    };

    if (settings) {
      $.extend(config, settings);
    }

    var $reflita = $('<section>')
      .attr('id', 'reflita-main')
      .appendTo('#conteudo');

    var $titulo = $('<h1>')
      .attr('id', 'reflita-titulo')
      .appendTo($reflita)
      .html(titulo);

    var $texto = $('<div>')
      .attr('id', 'reflita-texto')
      .appendTo($reflita)
      .html('<p>' + texto + '</p>');

    if (config.lineHeight) {
      $texto.find('p').css('lineHeight', config.lineHeight);
    }

    if (config.raio) {
      var $raio = $('<img>')
        .attr('id', 'reflita-raio')
        .attr('src', C_PASTA_IMAGENS + 'mc_raio.png')
        .appendTo($reflita);
    }

    if (config.mascote) {
      var $mascote = $('<span>')
        .attr('id', 'reflita-mascote')
        .appendTo($reflita)
        .sprite({
          fps: 30,
          no_of_frames: 40,
          play_frames: 40
        });
    }

    ARR_TAREFAS[tarefaReflita].resolve();
  }

  return {
    setConfig: _setConfig,
    reflita: _init
  };

});