define(function (require) {
  var tarefaIndice = addTarefa();

  var C_PASTA_IMAGENS = '../wilib/img/';

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(titulo, sub_titulo, texto, settings) {
    edi.iniciar(_configEDI);
    var config = {
      padding: '40px 0 0 40px',
      heigth: 280
    };

    if (settings) {
      $.extend(config, settings);
    }




    var dv_bg = $('<div>')
      .css('width', 850)
      .css('height', 383)
      .css('display', 'block')
      .css('background', 'url(' + C_PASTA_IMAGENS + 'bg/fundo-gramado.png)')
      .appendTo('#conteudo');

    var dv_texto_box = $('<div>')
      .attr('id', 'dv_texto_box')
      .css('position', 'absolute')
      .css('top', 26)
      .css('left', 200)
      .css('display', 'none')
      .addClass('arredondado')
      .css('padding', config.padding)
      .css('width', 370)
      .css('height', config.heigth)
      .css('border', '1px solid #fff')
      .css('background-color', 'rgba(255,255,255,0.3)')
      .appendTo(dv_bg);

    var sp_titulo = $('<span>')
      .attr('id', 'sp_titulo')
      .addClass('bold')
      .addClass('i')
      .css('position', 'relative')
      .css('display', 'block')
      .css('font-size', '20px')
      .css('color', '#DCA13A')
      .css('margin-bottom', 8)
      .html(titulo)
      .appendTo(dv_texto_box);

    var sp_subtitulo = $('<span>')
      .attr('id', 'sp_subtitulo')
      .css('font-style', 'italic')
      .css('position', 'relative')
      .css('display', 'block')
      .css('font-size', '20px')
      .css('color', '#FFF')
      .html(sub_titulo)
      .appendTo(dv_texto_box);

    var dv_ficaTextos = $('<div>')
      .css('display', 'table-cell')
      .css('position', 'relative')
      .css('width', '370px')
      .css('height', '234px')
      .css('vertical-align', 'middle')
      .appendTo(dv_texto_box);

    var sp_texto = $('<span>')
      .attr('id', 'sp_texto')
      .addClass('i')
      .css('font-weight', '300')
      .css('position', 'relative')
      .css('display', 'block')
      .css('font-size', '16px')
      .css('color', '#FFF')
      .css('margin-bottom', 5)
      .html(texto[0])
      .appendTo(dv_ficaTextos);

    for (var i = 1; i < texto.length; i++) {
      var sp_indice = $('<span>')
        .attr('id', 'sp_indice' + i)
        .addClass('i')
        .css('font-weight', '300')
        .css('position', 'relative')
        .css('display', 'block')
        .css('font-size', '14px')
        .css('color', '#FFF')
        .css('margin-bottom', 5)
        .html(texto[i])
        .appendTo(dv_ficaTextos);
    }

    require(["../../canvas/objetos/mascoteIndice"], function (canvas) {
      var anima = new canvas.mascoteIndice();
      anima.obj.css({
        top: 255,
        left: -100
      }).appendTo('#conteudo');
      anima.play(null, function () {
        dv_texto_box.fadeIn(800, function () {
          edi.finalizar({
            mostrarResultado: false,
            corFinalizar: 'black'
          });
        });
      });
    });

    var dv_info = $('<div>')
      .attr('id', 'dv_info')
      .css('position', 'absolute')
      .css('top', 40)
      .css('left', 40)
      .css('width', 98)
      .css('height', 98)
      .iconeIndice(true)
      .appendTo(dv_bg);

    ARR_TAREFAS[tarefaIndice].resolve();

  }

  return {
    setConfig: _setConfig,
    indice: _init
  };

});