define(function(require) {
  var tarefaCartas = addTarefa();
  var edi = require('../lib/edi'),
    _configEDI = null;

  function _setConfig(config) {
    _configEDI = config;
  }

  function _init(cartas, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI);

    var peca = this,
      condicao = true,
      cont = 0;

    var config = {
      width: 86,
      height: 127,
      distanciaCartasInicial: 100,
      distanciaCartasFinal: 60,
      fontSize: 10,
      color: '#8CA8B8',
      aleatorio: true
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.aleatorio) {
      cartas.sort(function() {
        return 0.5 - Math.random();
      });
    }

    var ctAll = $('<section>')
      .css({
        position: 'absolute',
        top: 20,
        left: 10
      })
      .attr('data-edi', 'edi-cartas')
      .appendTo('#conteudo');

    function ordenar() {
      $('#carta' + cont)
        .transition({
          x: (config.distanciaCartasFinal * cont) + config.distanciaCartasInicial,
          y: 20 * cont + 50
        }, 500, function() {
          cont++;
          ordenar();
        });
    }

    var finalizar = function() {

      edi.objetivos.pop();
      peca.objetivos.pop();
      edi.objetivos.unshift(1);
      edi.finalizar();

      if ( !! callBack) callBack();

      if (peca.objetivos.length === 0 && callBackFinal) {
        cont = 0;
        callBackFinal();
        ordenar();
      }
    };

    var addClique = function(_this){
      _this.click(function() {
        if (condicao) {
          condicao = false;
          var _this = $(this);
          _this.off();
          _this.transition({
            rotateY: '90deg'
          }, 500, function() {
            _this.find('.carta').remove();
            _this.transition({
              rotateY: '0deg'
            }, 600, function() {
              finalizar();
              condicao = true;
            });
          });
        }
      });
    };

    for (var i = 0; i < cartas.length; i++) {

      edi.objetivos.push(0);
      peca.objetivos.push(0);

      var ctFirst = $('<div>')
        .css({
          display: 'inline-block',
          textAlign: 'center',
          width: config.width + 20,
          height: config.height + 35,
          background: '#FFF',
          border: 'double 3px #8CA8B8'
        });

      var ctSecond = $('<div>')
        .css({
          display: 'table-cell',
          textAlign: 'center',
          position: 'relative',
          background: '#FFF',
          verticalAlign: 'middle',
          padding: 10,
          border: 'solid 1px #8CA8B8',
          borderRadius: 10,
          cursor: 'pointer'
        })
        .transition({
          rotateY: '180deg'
        })
        .append(ctFirst);

        addClique(ctSecond);

      var ctThird = $('<div>')
        .attr('id', 'carta' + i)
        .append(ctSecond)
        .appendTo(ctAll);

      ctThird
        .css({
          position: 'absolute',
          scale: 0.1,
          top: 0,
          left: -90
        });

      var fundoCarta = $('<img>')
        .addClass('carta')
        .attr({
          src: '../wilib/img/svg/fundoCarta.svg',
          width: ctThird.width(),
          height: ctThird.height() - 5
        })
        .css({
          backgroundSize: '100% 100%',
          position: 'absolute',
          top: -1,
          left: -1
        })
        .transition({
          rotateY: '180deg'
        })
        .appendTo(ctSecond);

      var img = $('<img>')
        .css({
          display: 'inline-block',
          textAlign: 'center',
          border: 'solid 1px #8CA8B8',
          borderRadius: 10,
          marginTop: 5
        })
        .attr({
          position: 'relative',
          width: config.width,
          height: config.height,
          src: cartas[i].img
        })
        .appendTo(ctFirst);

      var txt = $('<span>')
        .css({
          display: 'inline-block',
          textAlign: 'center',
          fontSize: config.fontSize,
          color: config.color,
          fontWeight: 'bold',
          margin: 0
        })
        .html(cartas[i].texto)
        .appendTo(ctFirst);

      var circulo = $('<div>')
        .css({
          position: 'absolute',
          width: 30,
          height: 30,
          borderRadius: 50,
          backgroundColor: '#FFF',
          top: 4,
          left: 4,
          border: 'solid 1px #8CA8B8'
        })
        .appendTo(ctFirst);

      var num = $('<div>')
        .css({
          position: 'realtive',
          verticalAlign: 'middle',
          display: 'table-cell',
          color: '#8CA8B8',
          fontWeight: 'bold',
          fontSize: 22,
          width: circulo.width(),
          height: circulo.height()
        })
        .html(i + 1)
        .appendTo(circulo);
    }

    (function destribuirCartas() {
      $('#carta' + cont)
        .transition({
          x: (140 * cont) + config.distanciaCartasInicial,
          y: 100,
          scale: 1
        }, 100, function() {
          cont++;
          destribuirCartas();
        });
    })();

    ARR_TAREFAS[tarefaCartas].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    cartas: _init
  };

});