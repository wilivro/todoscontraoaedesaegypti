define(function (require) {
  var tarefaRevela = addTarefa(),
    edi = require('./edi'),
    _configEDI = null;

  function _setConfig(config) {
    _configEDI = config;
  }

  function _init(objs, settings, callbackFinal) {
    edi.iniciar(_configEDI);

    var peca = this,
      config = {
        leftBall: 150,
        widthTexto: 620,
        heightTexto: 40,
        leftTexto: 150,
        topTexto: 90,
        paddingBoxTexto: 0,
        exemplo: true
      };

    if (settings) {
      $.extend(config, settings);
    }

    var secao = $('<section>')
      .attr('id', 'revela_d05')
      .appendTo('#conteudo');

    $('<div>')
      .addClass('bloqueio')
      .appendTo(secao);

    function animacao(ball) {
      ball.animate({
        top: 350
      }, tempo, "easeOutBounce", function () {
        if ($(this).hasClass('last')) {
          $('<div>')
            .addClass('box')
            .css({
              left: config.leftBall + (20 * objs.length / 2) - 7
            })
            .appendTo(secao)
            .animate({
              width: 20 * objs.length,
              height: 20,
              top: 350 - 7,
              left: config.leftBall - 7
            }, 500, function () {
              var leftReturn = '-=' + (config.leftBall - 10).toString();
              $('.ball, .box').animate({
                top: '-=150',
                left: leftReturn
              }, 1000, function () {
                $('.bloqueio').remove();
              });
            });
        }
      })
        .mouseover(function () {
          $(this).addClass('piscar');
        })
        .mouseleave(function () {
          $(this).removeClass('piscar');
        });
    }

    for (var i = 0; i < objs.length; i++) {
      peca.objetivos.push(0);
      edi.objetivos.push(0);

      var num = (i === 0) ? 1 : '1.' + i,
        tempo = 2000 * num,
        ball = $('<div>')
          .addClass((i == objs.length - 1) ? 'last btn-revela ball' : 'btn-revela ball')
          .attr({
            id: 'bola' + i,
            'data-revela': i
          })
          .css({
            left: 150 + (20 * i)
          })
          .appendTo(secao);

      var ct = $('<div>')
        .attr({
          id: 'texto' + i
        })
        .addClass('boxTexto')
        .css({
          top: (config.heightTexto + 10 - config.paddingBoxTexto) * i + config.topTexto,
          left: config.leftTexto,
          width: config.widthTexto,
          height: config.heightTexto
        })
        .appendTo(secao);

      animacao(ball, tempo);

      if (config.exemplo) {
        $('<img>')
          .addClass('ex')
          .css({
            top: ct.height() / 2 - 14
          })
          .attr({
            src: '../wilib/img/svg/exemplo.svg'
          })
          .appendTo(ct);
      }

      $('<div>')
        .addClass('middle')
        .css({
          width: ct.width() - 55,
          height: ct.height(),
          paddingLeft: (config.exemplo) ? 55 : 24
        })
        .html(objs[i])
        .appendTo(ct);
    }

    $('.btn-revela').click(function () {
      var revela = $('#texto' + $(this).attr('data-revela')),
        bola = $('#' + $(this).attr('id'));

      revela.fadeIn();

      var y = parseInt(revela.css('top')) + (revela.height() / 2 - 3),
        x = parseInt(revela.css('left')) + 8;

      bola.animate({
        top: y,
        left: x
      }, 500, function () {
        if (peca.objetivos.length === 0) {
          edi.finalizar();

          var box = $('.box');
          box
            .transition({
              top: '-=25',
              width: box.width() * 1.5,
              height: box.height() * 1.5,
              rotate: '180deg',
              opacity: 0
            });
          if (callbackFinal) callbackFinal();
        }
      })
        .css('cursor', 'default')
        .removeClass('piscar')
        .off();

      if (!!licao.config.WIQUADRO)
        Wiquadro.api.addInteration(1, bola.attr('id'), revela.attr('id'), 'T');

      peca.objetivos.pop();
      edi.objetivos.pop();
      edi.objetivos.unshift(1);

    });

    ARR_TAREFAS[tarefaRevela].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_d05: _init
  };

});
