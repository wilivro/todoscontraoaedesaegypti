define(function(require) {
  var tarefaRevela = addTarefa();

  var edi = require('./edi'),
    _configEDI = null;

  function _setConfig(config) {
    _configEDI = config;
  }

  function _init(objs, settings, callbackFinal) {
    edi.iniciar(_configEDI);

    var cont = 0,
      config = {
        tempoBloqueio: 5,
        color: '#A39B86',
        backgroundColor: '#47370D',
        cssP: {
          textShadow: '1px 1px 1px #000'
        }
      };

    if (settings) {
      $.extend(config, settings);
    }

    function regressiva(cb) {
      edi.regressiva(1000 * config.tempoBloqueio, 'para clicar em outro botão!', cb, {
        posx: 500,
        posy: 20,
        cor: '#fff'
      });
    }

    var atual = function() {

      $('.tecla').hide();
      $('.middle p').fadeOut(500, function() {
        $(this).html(objs[cont]);
      }).fadeIn(500);

      regressiva(function() {
        switch (cont) {
          case 0:
            $('.dir').fadeIn();
            break;
          case objs.length - 1:
            $('.esq').fadeIn();
            break;
          default:
            $('.dir, .esq').fadeIn();
            break;
        }
      });
    };

    var secao = $('<section>')
      .attr('id', 'ct_b08')
      .appendTo('#conteudo');

    var bgBlack = $('<div>')
      .attr('id', 'bgBlack')
      .css({
        background: config.backgroundColor
      })
      .appendTo(secao);

    var tela = $('<img>')
      .attr({
        id: 'tela',
        src: '../wilib/img/svg/tela_projetor.svg'
      })
      .appendTo(secao);

    var projecao = $('<div>')
      .addClass('projecao')
      .appendTo(secao);

    var projetor = $('<img>')
      .attr({
        id: 'projetor',
        src: '../wilib/img/svg/projetor.svg'
      })
      .click(function() {
        regressiva(
          function() {
            $('.dir').fadeIn();
          }
        );

        $(this).css({
          cursor: 'default'
        }).off();
        $('.projecao').fadeIn();
        $('.middle p').html(objs[0]).fadeIn();
      })
      .appendTo(secao);

    var ctTexto = $('<div>')
      .attr('id', 'ctTexto')
      .appendTo(secao);

    var middle = $('<div>')
      .addClass('middle')
      .appendTo(ctTexto);

    var p = $('<p>')
      .css({
        fontSize: config.fontSize,
        color: config.color
      })
      .css(config.cssP)
      .appendTo(middle);

    var setaDir = $('<div>')
      .addClass('tecla dir')
      .appendTo(secao);

    $('<p>')
      .addClass('p')
      .html('Próximo Slide')
      .appendTo(setaDir);

    $('<img>')
      .addClass('img')
      .attr({
        src: '../wilib/img/svg/tecla-seta-dir.svg',
        width: 40,
        height: 40
      })
      .mouseover(function() {
        $(this).parent().find('p').css({
          display: 'block'
        });
      })
      .mouseleave(function() {
        $(this).parent().find('p').css({
          display: 'none'
        });
      })
      .mousedown(function() {
        cont++;
        atual();

        if (cont == objs.length - 1) {
          if (!$('#final').length)
            edi.finalizar();

          if ( !! callbackFinal) callbackFinal();
        }
      })
      .appendTo(setaDir);

    var setaEsq = $('<div>')
      .addClass('tecla esq')
      .appendTo(secao);

    $('<p>')
      .html('Slide Anterior')
      .appendTo(setaEsq);

    $('<img>')
      .attr({
        src: '../wilib/img/svg/tecla-seta-esq.svg',
        width: 40,
        height: 40
      })
      .mouseover(function() {
        $(this).parent().find('p').css({
          display: 'block'
        });
      })
      .mouseleave(function() {
        $(this).parent().find('p').css({
          display: 'none'
        });
      })
      .mousedown(function() {
        cont--;
        atual();
      })
      .appendTo(setaEsq);

    ARR_TAREFAS[tarefaRevela].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    ct_b08: _init
  };

});