define(function (require) {
  var tarefaAlternativa = addTarefa();
  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(palavra, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var config = {
      top: 80,
      left: 0,
      espacoPalavra: 0,
      espacoLetras: 47,
      corTexto: '#666',
      corLetra: '#9C0',
      textShadow: '1px 1px 1px #000',
      cb: null
    };

    if (settings) {
      $.extend(config, settings);
    }

    var ct = $('<section>')
      .css({
        position: 'absolute',
        left: config.left,
        top: config.top
      })
      .appendTo('#conteudo');

    $('<div>')
      .attr({
        id: 'testeLetra'
      })
      .css({
        width: 20,
        marginLeft: 10,
        float: 'left',
        height: 1
      })
      .appendTo(ct);

    $('<div>')
      .attr({
        id: 'testeTexto'
      })
      .css({
        width: 20,
        float: 'left',
        height: 1
      })
      .appendTo(ct);

    $('<div>')
      .attr({
        id: 'ctInicial'
      })
      .css({
        position: 'absolute',
        textAlign: 'center',
        left: 0,
        top: 120,
        width: 788,
        height: 40
      })
      .appendTo(ct);

    var objetivos = [];

    for (var i = 0; i < palavra.length; i++) {

      objetivos.push(0);

      $('<div>')
        .addClass('letra')
        .attr({
          id: 'letra' + i
        })
        .css({
          width: 20,
          textAlign: 'center',
          cursor: 'pointer',
          color: config.corLetra,
          fontSize: 28,
          textShadow: config.textShadow,
          marginBottom: config.espacoPalavra
        })
        .html(palavra[i].letra)
        .appendTo('#testeLetra');

      var ctTexto = $('<div>')
        .attr({
          id: 'texto' + i
        })
        .css({
          width: 750,
          height: 35,
          margin: 0,
          padding: 0,
          display: 'none',
          cursor: 'pointer'
        })
        .appendTo('#testeTexto');

      $('<div>')
        .css({
          width: 750,
          height: config.espacoLetras,
          fontSize: 14,
          margin: 0,
          color: config.corTexto,
          position: 'relative',
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'left'
        })
        .html(palavra[i].texto)
        .appendTo(ctTexto);
    }

    var letraPosition = [];

    var $letra = $('.letra'),
      $principal = $('#principal');

    $letra.each(function (a) {
      var $letra = $(this);
      letraPosition[a] = {
        top: $letra.offset().top - $principal.offset().top,
        left: $letra.offset().left - $principal.offset().left
      };
    });

    $letra.each(function () {
      $(this).css({display: 'inline-block'}).appendTo('#ctInicial');
    });


    var letraTop = [];
    var letraLeft = [];

    $letra.each(function (a) {
      var $letra = $(this);
      letraTop[a] = $letra.offset().top - $principal.offset().top;
      letraLeft[a] = $letra.offset().left - $principal.offset().left;

    });

    $letra.each(function (a) {
      var $letra = $(this);
      $letra
        .css({
          position: 'absolute',
          top: letraTop[a],
          left: letraLeft[a]
        }).appendTo('#principal');
    });

    $letra.click(function () {
      $(".letra").each(function (a) {
        var $letra = $('#letra' + a),
          $texto = $('#texto' + a);
        $letra
          .animate({
            top: letraPosition[a].top,
            left: letraPosition[a].left
          }, 1000, function () {
            $letra.click(function () {
              if ($letra.hasClass('letra')) {

                if (!!licao.config.WIQUADRO)
                  Wiquadro.api.addInteration(1, $letra.attr('id'), $texto.attr('id'), 'T');

                $letra
                  .removeClass('letra')
                  .unbind('click');

                $texto
                  .fadeIn(800);

                objetivos.pop();

                if (!objetivos.length)
                  edi.finalizar();

              }
            });
          });
      });
    });

    ARR_TAREFAS[tarefaAlternativa].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_palavra: _init
  };

});