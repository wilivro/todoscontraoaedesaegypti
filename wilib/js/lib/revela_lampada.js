define(function (require) {
  var tarefarevela_lampada = addTarefa();

  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(rev, cb, cbfinal, opt) {
    edi.iniciar(_configEDI); //montar o palco

    var peca = this;

    var config = {
      width: 200,
      left: 0,
      top: 70,
      margin: 10,
      textAlign: 'center',
      fontSize: 12,
      fontColor: '#666',
      fontWeight: 'bold',
      tempoBloqueio: 1000,
      efeito: 'fade',
      delay: 0
    };

    if (opt) {
      $.extend(config, opt);
    }

    // adicionando objetivos
    rev.forEach(function () {
      peca.objetivos.push(0);
      edi.objetivos.push(0);
    });

    // container principal
    var $revela_lampada = $('<section>')
      .addClass('revela-lampada')
      .attr('data-edi', 'revela-lampada')
      .css({
        width: 790,
        height: 315,
        position: 'absolute',
        left: config.left,
        top: config.top
      })
      .appendTo('#conteudo');

    // criando os revelas
    rev.forEach(function (data, i) {
      var $revelaBox = $('<div>')
        .addClass('revela-box')
        .css({
          width: config.width,
          height: 300,
          margin: config.margin,
          float: 'left',
          position: 'relative'
        })
        .appendTo($revela_lampada);

      //criando e startando animação do ícone
      require(['../../canvas/objetos/animaLampada'], function (canvas) {
        var anima = new canvas.lampada();
        anima.obj.appendTo($revelaBox);

        anima.obj
          .addClass('btnRev')
          .attr('data-revela', i)
          .css({
            position: 'absolute',
            left: (config.width / 2) - 60,
            top: 10,
            zIndex: 1000,
            cursor: 'pointer'
          })
          .click(handlerClick);

        anima.play();

        // resolvendo problema do tamanho do canvas
        stage.scaleX = getScale();
        stage.scaleY = stage.scaleX;

        anima.obj.mouseenter(function () {
          anima.play();
          anima.obj.attr({
            width: 130 * stage.scaleX,
            height: 130 * stage.scaleY
          }).addClass('btnRev');
        });
      });

      $('<div>')
        .addClass('revela')
        .attr('data-revela', i)
        .html(data)
        .css({
          width: '100%',
          height: 'auto',
          padding: 5,
          margin: '130px 0 0 -5px',
          background: 'linear-gradient(to bottom, #fff, #eee)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
          textAlign: config.textAlign,
          fontSize: config.fontSize,
          fontWeight: config.fontWeight,
          color: config.fontColor,
          borderRadius: 5,
          display: 'none'
        })
        .appendTo($revelaBox);
    });

    // tratando o click
    function handlerClick() {
      var $self = $(this);
      var $revela = $('.revela');

      $revela.each(function (i, data) {
        if ($self.attr('data-revela') == $(data).attr('data-revela')) {
          $(data).fadeIn();

          if (!!cb)
            cb($self, $(data));

          // removendo objetivos
          edi.objetivos.unshift(1);
          edi.objetivos.pop();
          peca.objetivos.pop();
          if (peca.objetivos.length === 0) {
            if (cbfinal) cbfinal();
          }
          edi.finalizar();

          // removendo click da lampada
          $self.off();
        }
      });
    }

    ARR_TAREFAS[tarefarevela_lampada].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_lampada: _init
  };

});
