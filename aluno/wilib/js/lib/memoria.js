define(function (require) {
  var tarefaAlternativa = addTarefa();
  var edi = require('../lib/edi'),
    _configEDI = null;

  function _setConfig(config) {
    _configEDI = config;
  }

  function _init(cartas, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI);

    var peca = this,
      condicao = true,
      cont = 0,
      carta1 = null,
      carta2 = null,
      _carta1 = null,
      _carta2 = null;

    var config = {
      width: 85,
      height: 21,
      fontSize: 18,
      color: '#FFF',
      qtdCartasTop: 6,
      top: 0,
      left: 1,
      aleatorio: true,
      padding: 10
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.aleatorio) {
      cartas.sort(function () {
        return 0.5 - Math.random();
      });
    }

    var ctAll = $('<section>')
      .css({
        position: 'absolute',
        width: 131 * config.qtdCartasTop,
        top: 70 + config.top,
        left: config.left
      })
      .attr('data-edi', 'edi-cartas')
      .appendTo('#conteudo');

    var qtd = 0;
    for (var y = 0; y < cartas.length; y++) {
      if (!cartas[y].cartaBranca)
        qtd++;
    }

    for (var x = 0; x < (Math.floor(qtd / 2)); x++) {
      edi.objetivos.push(0);
      peca.objetivos.push(0);
    }

    var finalizar = function () {
      edi.objetivos.pop();
      peca.objetivos.pop();
      edi.objetivos.unshift(1);
      edi.finalizar();
      carta1.removeClass('frente');
      carta2.removeClass('frente');
      carta1 = null;
      carta2 = null;

      if (!!callBack) callBack();

      if (peca.objetivos.length === 0 && callBackFinal) {
        cont = 0;
        callBackFinal();
      }
    };

    var desvirarCartas = function () {
      $.each($(".frente"), function () {

        var _this = $(this);

        _this.transition({
          rotateY: '90deg'
        }, 500, function () {
          _this.find('.ctFirst').css('opacity', '0');
          _this.find('.carta').css('opacity', '1');
          _this.transition({
            rotateY: '180deg'
          }, function () {
            if (carta1 !== null && carta2 !== null) {
              carta1.removeClass('frente');
              carta2.removeClass('frente');
              virarCarta(carta1);
              virarCarta(carta2);
            }
            carta1 = null;
            carta2 = null;
          });
        });
      });
    };

    var virarCarta = function ($this) {
      var atual = $this;
      atual.click(function () {
        if (condicao) {
          condicao = false;
          var _this = $(atual);
          _this.off();
          _this.transition({
            rotateY: '90deg'
          }, 500, function () {
            _this.find('.ctFirst').css('opacity', '1');
            _this.find('.carta').css('opacity', '0');
            _this.transition({
              rotateY: '0deg'
            }, 600, function () {
              condicao = true;

              _this.addClass('frente');

              carta1 = carta2;
              carta2 = atual;

              _carta1 = _carta2;
              _carta2 = atual.attr('data-correta');

              if (carta1 !== null) {
                if (_carta1 == _carta2) {
                  finalizar();
                } else {
                  setTimeout(() => {
                    desvirarCartas();
                  }, 2000);
                  edi.regressiva(2100, '', null, {
                    bloqueio: true,
                    posx: 1555,
                  })
                }
              }
            });
          });
        }
      });
    };

    for (var i = 0; i < cartas.length; i++) {

      var ctSecond = $('<div>')
        .addClass('ctSecond')
        .css({
          display: 'table-cell',
          textAlign: 'center',
          position: 'relative',
          background: '#FFF',
          verticalAlign: 'middle',
          padding: config.padding,
          border: (!!cartas[i].cartaBranca) ? '' : 'solid 1px #8CA8B8',
          borderRadius: 6,
          cursor: (!!cartas[i].cartaBranca) ? '' : 'pointer'
        })
        .transition({
          rotateY: '180deg'
        })
        .attr({
          id: 'cartaVirada' + i,
          'data-correta': cartas[i].dataCorreta
        });
      virarCarta(ctSecond);

      var ctThird = $('<div>')
        .attr('id', 'carta' + i)
        .addClass('ctThird')
        .append(ctSecond)
        .appendTo(ctAll);

      ctThird
        .css({
          display: 'inline-block',
          margin: '0 2px',
          padding: 0,
          scale: 0
        });


      var ctFirst = $('<div>')
        .addClass('ctFirst')
        .css({
          opacity: 0,
          textAlign: 'center',
          margin: '0',
          padding: 0,
          width: config.width + 20,
          height: config.height + 55,
          background: (!!cartas[i].bg) ? cartas[i].bg : '',
          borderRadius: 5
        })
        .appendTo(ctSecond);

      if (!!cartas[i].texto) {
        $('<span>')
          .css({
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'center',
            fontSize: config.fontSize,
            color: config.color,
            fontWeight: 'bold',
            width: ctFirst.width(),
            height: ctFirst.height()
          })
          .html(cartas[i].texto)
          .appendTo(ctFirst);
      }

      if (!!cartas[i].img) {
        var img = $('<img>')
          .css({
            width: ctFirst.width(),
            height: ctFirst.height(),
            borderRadius: 5
          })
          .attr({
            src: cartas[i].img
          })
          .appendTo(ctFirst);

      }

      if (!cartas[i].cartaBranca) {
        $('<img>')
          .addClass('carta')
          .attr({
            src: '../wilib/img/svg/cartaHorizontal.svg',
            width: ctThird.width(),
            height: ctThird.height()
          })
          .css({
            backgroundSize: '100% 100%',
            position: 'absolute',
            width: ctThird.width(),
            height: ctThird.height(),
            top: -1,
            margin: '0',
            padding: 0,
            left: -1
          })
          .transition({
            rotateY: '180deg'
          })
          .appendTo(ctSecond);

      }

    }


    (function distribuirCartas() {
      $('#carta' + cont)
        .transition({
          scale: 1
        }, 100, function () {
          cont++;
          distribuirCartas();
          this.hide().show(0); // Forçar o repaint no chrome, parece inutil mas não é
        });
    })();

    ARR_TAREFAS[tarefaAlternativa].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    memoria: _init
  };

});