define(function (require) {
  var tarefaAlternativa = addTarefa();
  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _telaAtual() {
    return edi.util.getURL('quest');
  }

  function _init(texto, settings, callBack, callBackFinal) {


    edi.iniciar(_configEDI);//montar o palco
    _configEDI.qtdTelas = edi.qtdTelas;
    var peca = this, intervalo;

    var config = {
      top: 280,
      qtdLinhas: 2,
      arrQtdBoy: [1, 2],
      widthBalao: 400,
      leftBalao: 0,
      distancia: 25,
      inverter: true,
      tempoBloqueio: 5
    };

    if (settings) {
      $.extend(config, settings);
    }

    var ctAll = $('<section>')
      .attr('id', 'ctAll')
      .css({
        position: 'absolute',
        top: config.top
      })
      .appendTo('#conteudo');

    $.fn.efeito = function () {
      var $self = $(this);

      if ($self.find('.clone').length < 1) {
        $self.clone()
          .addClass('clone')
          .css({
            position: 'absolute',
            marginLeft: -42
          })
          .appendTo($self.parent());
      }

      var $clone = $self.parent().find('.clone');

      $clone.animate({
        width: 63,
        height: 90,
        marginLeft: -52,
        marginTop: -15,
        opacity: 0
      }, 500, function () {
        $clone.remove();
      });

    };

    var index = config.qtdLinhas;

    function eventosBoys(boy) {
      boy.mouseover(function () {
        var $self = $(this);
        if (!$self.parent().hasClass('on')) {
          intervalo = setInterval(function () {
            $self.efeito();
          }, 500);
        }
      })
        .mouseleave(function () {
          clearInterval(intervalo);
        })
        .click(function () {

          var $self = $(this);

          if (!!licao.config.WIQUADRO) Wiquadro.api.addInteration(1, $self.attr('id'), 'balao' + $self.attr('data-id'), 'T');

          $('<div>').addClass('bloqueio').appendTo('#conteudo');

          edi.regressiva(config.tempoBloqueio * 1000, 'para clicar em outro boneco!', function () {

            if (!$self.hasClass('ok')) {
              edi.objetivos.pop();
              peca.objetivos.pop();
              edi.finalizar();

              if (!!callBack) callBack();

              if (edi.objetivos.length === 0) {
                if (callBackFinal) callBackFinal();
              }

            }

            $self.addClass('on ok');

            $('.bloqueio').remove();
          });

          $('.boxBoy').removeClass('on');
          $('.msg').remove();

          var balao = $('<div>')
            .addClass('msg')
            .css({
              width: config.widthBalao,
              marginLeft: -100 + (config.leftBalao)
            })
            .appendTo($self.parent());

          balao.peBalao({
            scaleY: -1.5,
            scaleX: -1.5,
            top: 149,
            left: 120 - (config.leftBalao),
            borda: '#ccc',
            tamanhoBorda: 12
          });

          var x = $self.parent().attr('data-id').charAt(0);
          var y = $self.parent().attr('data-id').charAt(1);

          var center = $('<div>')
            .addClass('center')
            .css({
              width: config.widthBalao
            })
            .html(texto[x][y])
            .appendTo(balao);

        });
    }

    for (var iLinhas = 0; iLinhas < config.qtdLinhas; iLinhas++) {

      index += (config.inverter) ? -1 : 1;

      var linhas = $('<div>')
        .addClass('linha')
        .css({
          top: ((iLinhas === 0) ? 0 : config.distancia * iLinhas) * (config.inverter ? -1 : 1),
          zIndex: index
        })
        .appendTo(ctAll);

      for (var iBoy = 0; iBoy < config.arrQtdBoy[iLinhas]; iBoy++) {

        edi.objetivos.push(0);
        peca.objetivos.push(0);

        var boxBoy = $('<div>')
          .attr({
            id: 'boxBoy' + iLinhas + iBoy,
            'data-id': '' + iLinhas + iBoy + ''
          })
          .addClass('boxBoy')
          .appendTo(linhas);

        var boy = $('<img>')
          .addClass('boy')
          .attr({
            src: '../wilib/img/svg/green_boy.svg'
          })
          .appendTo(boxBoy);

        eventosBoys(boy);
      }

    }

    ARR_TAREFAS[tarefaAlternativa].resolve();
  }

  return {
    root: edi,
    objetivos: [],
    setConfig: _setConfig,
    green_boy: _init,
    telaAtual: _telaAtual
  };

});