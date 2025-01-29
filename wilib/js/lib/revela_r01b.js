define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('./edi'),
    _configEDI = null;

  function _setConfig(config) {
    _configEDI = config;
  }

  function _init(objs, settings, callbackFinal) {
    edi.iniciar(_configEDI);

    var peca = this,
      config = {
        width: '',
        fontSize: 14,
        leftBall: 150,
        widthTexto: 620,
        heightTexto: 40,
        leftTexto: 150,
        topTexto: 90,
        paddingBoxTexto: 0,
        top: 100,
        left: 10,
        topRevela: -22,
        leftRevela: 261
      };

    if (settings) {
      $.extend(config, settings);
    }

    var secao = $('<section>')
      .attr('id', 'revela_r01b')
      .css({
        position: 'absolute',
        top: config.top,
        left: config.left
      })
      .appendTo('#conteudo');

    function eventosPata(_this) {
      _this.mouseover(function () {
        $(this).find('#pag1').stop(true, true)
          .transition({
            top: -25
          });
        $(this).find('#pag2').stop(true, true)
          .transition({
            top: -15,
            left: 15,
            rotate: '20deg'
          });
        $(this).find('.pastFront').stop(true, true)
          .transition({
            skewX: '10deg',
            left: -6
          });
      })
        .mouseleave(function () {
          $('.pag').css({
            top: 2,
            left: 5,
            rotate: 0
          });
          $('.pastFront').css({
            skewX: 0,
            left: 0
          });

        })
        .click(function () {

          var pos = parseInt($(this).attr('id').replace("pasta", "")),
            $this = $(this);

          if (!$this.hasClass('ok')) {
            peca.objetivos.pop();
            edi.objetivos.pop();
            edi.objetivos.unshift(1);
            $this.addClass('ok');
          }

          $('.revela').remove();

          $('<div>')
            .addClass('bloqueio')
            .appendTo('#conteudo');

          edi.regressiva(1000, 'para clicar em outra pasta...', function () {
            $('.bloqueio').remove();

            if (!$('#final').length) {
              edi.finalizar(null, null, function () {
                if (!!callbackFinal) callbackFinal();
              });
            }
          });

          var pagAbs = $('<div>')
            .addClass('revela')
            .css({
              width: config.width,
              top: $this.position().top - 140,
              left: $this.position().left - 120
            })
            .prependTo(secao);

          $('<div>')
            .addClass('pagRel')
            .css({
              width: config.width,
              fontSize: config.fontSize
            })
            .html(objs[pos])
            .appendTo(pagAbs);

          pagAbs.transition({
            top: config.topRevela,
            left: config.leftRevela,
            scale: 1
          });

        });
    }

    for (var i = 0; i < objs.length; i++) {

      peca.objetivos.push(0);
      edi.objetivos.push(0);

      var pasta = $('<div>')
        .addClass('pasta')
        .css({
          top: 70 * i,
          left: (i % 2 === 0) ? 0 : 70
        })
        .attr({id: 'pasta' + i})
        .appendTo(secao);

      $('<img>')
        .css({
          position: 'absolute',
          left: 0
        })
        .attr({
          src: '../wilib/img/svg/pasta-back.svg',
          width: 60,
          height: 60
        })
        .appendTo(pasta);

      var pag1 = $('<div>')
        .attr({id: 'pag1'})
        .addClass('pag')
        .appendTo(pasta);

      var pag2 = $('<div>')
        .attr({id: 'pag2'})
        .addClass('pag')
        .appendTo(pasta);

      $('<img>')
        .addClass('pastFront')
        .css({
          position: 'absolute',
          left: 0
        })
        .attr({
          src: '../wilib/img/svg/pasta-front.svg',
          width: 60,
          height: 60
        }).appendTo(pasta);

      eventosPata(pasta);
    }

    ARR_TAREFAS[tarefaRevela].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_r01b: _init
  };

});
