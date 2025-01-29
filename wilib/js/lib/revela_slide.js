define(function (require) {
  var tarefarevela_slide = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(rev, cb, cbfinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this;
    var finalizada = false;
    var revelas = [];
    var _cbFinal = true; //pra não ficar chamando o callback toda hora

    var $rev = $(rev)
      .hide()
      .attr('data-edi', 'revela')
      .addClass('a');

    var config = {
      bloqueiaClick: true,
      tempoBloqueio: 70,
      ocultarRev: false,
      delay: 0,
      regressiva: {
        left: 655,
        top: 340
      },
      btnPrevConfig: {
        left: 90,
        top: 310
      },
      btnNextConfig: {
        left: 555,
        top: 310
      }
    };

    if (settings) {
      $.extend(config, settings);
    }

    //adicionando objetivos
    $rev.each(function (i, obj) {
      revelas.push(obj);
      peca.objetivos.push(0);
      edi.objetivos.push(0);
    });

    //criando botoes para avançar e voltar
    $('<span>')//botao voltar
      .attr('id', 'btn-prev')
      .css({
        width: 53,
        height: 60,
        position: 'absolute',
        left: config.btnPrevConfig.left,
        top: config.btnPrevConfig.top,
        background: 'url(../wilib/img/svg/btn-seta-esq.svg)',
        backgroundSize: '100% 100%',
        cursor: 'pointer'
      })
      .click(onClick)
      .appendTo('#conteudo');

    $('<span>')//botao avançar
      .attr('id', 'btn-next')
      .css({
        width: 53,
        height: 60,
        position: 'absolute',
        left: config.btnNextConfig.left,
        top: config.btnNextConfig.top,
        background: 'url(../wilib/img/svg/btn-seta-dir.svg)',
        backgroundSize: '100% 100%',
        cursor: 'pointer'
      })
      .click(onClick)
      .appendTo('#conteudo');

    $(revelas[0])
      .show()
      .removeClass('a');

    $('#btn-prev').hide();

    peca.objetivos.pop();
    edi.objetivos.pop();

    var i = 0;

    function onClick() {
      var self = $(this);

      $rev.fadeOut();

      if (self.attr('id') == 'btn-prev') {
        if (i > 0 && i <= $rev.length - 1) {
          i--;
        }
      } else if (self.attr('id') == 'btn-next') {
        if (i < $rev.length - 1 && i >= 0) {
          i++;
        }
      }

      $(revelas[i]).fadeIn();

      //ocultando btns
      if (i === 0) {
        $('#btn-prev').fadeOut();
      } else {
        $('#btn-prev').fadeIn();
      }

      if (i == $rev.length - 1) {
        $('#btn-next').fadeOut();
      } else {
        $('#btn-next').fadeIn();
      }

      //tempo p clicar novamente
      if (config.bloqueiaClick && i != $rev.length - 1) {
        //removendo temporariamente o click
        $('#btn-prev, #btn-next').off();

        edi.regressiva(config.tempoBloqueio, 'para clicar em outro botão', function () {
          $('#btn-prev, #btn-next').click(onClick);
        }, {
          posx: config.regressiva.left,
          posy: config.regressiva.top
        });
      }

      //certificando que todos os itens foram vistos
      //antes de chamar o finalizar
      var b = true;

      if (b && $(revelas[i]).hasClass('a')) {
        peca.objetivos.pop();
        edi.objetivos.pop();

        $(revelas[i])
          .removeClass('a');
      }

      $('.a').each(function () {
        b = false;
      });

      if (!finalizada) {
        edi.finalizar();
      }

      if (peca.objetivos.length === 0) {
        config.bloqueiaClick = false;
        finalizada = true;
        if (cbfinal && _cbFinal) {
          _cbFinal = false;
          cbfinal();
        }
      }
    }

    ARR_TAREFAS[tarefarevela_slide].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_slide: _init
  };

});
