define(function (require) {
  var tarefaLigar = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(liga, alvo, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this,
      condicao = true,
      drag = false;

    liga.forEach(function (liga) {
      alvo.forEach(function (alvo) {
        if (alvo.dataCorreta == liga.dataCorreta) {
          peca.objetivos.push(0);
          edi.objetivos.push(0);
        }
      });
    });

    var config = {
      ligaAleatorio: true,
      alvoAleatorio: true,
      corAleatoria: true,
      borderColor: '#ddd',
      erros: false,
      fontWeight: 'bold',
      fontSize: 12,
      ligaFixo: true,
      liga: {
        width: 150,
        height: 'none',
        left: 20,
        top: 140,
        paddingTop: 5,
        paddingBottom: 5,
        marginBottom: 10,
        textAlign: 'center'
      },
      alvo: {
        width: 150,
        height: 'none',
        left: 470,
        top: 10,
        paddingTop: 6,
        paddingBottom: 6,
        marginBottom: 5,
        textAlign: 'center'
      }
    };

    if (settings) {
      $.extend(config, settings);
    }

    // embaralhando liga
    if (config.ligaAleatorio) {
      liga.sort(function () {
        return 0.5 - Math.random();
      });
    }

    // embaralhando alvo
    if (config.alvoAleatorio) {
      alvo.sort(function () {
        return 0.5 - Math.random();
      });
    }

    //desenhando elastico
    //criando e limpando intervalo para não ficar pesado
    var desenharElastico = (function () {
      var loop = null;

      return {
        start: function (a, b, ol) {
          loop = setInterval(function () {
            //desenhando
            util.ligar(a, b, ol);
          }, 60 / 1000);
        },
        stop: function () {
          clearInterval(loop);
        }
      };

    })();

    var loops = [],//armazena os loops de cada bolinha
      loopIndex = 0;//indexa os loops para que seja criado sempre um novo

    var balancar = (function () {
      var loop = null;

      return {
        start: function (a, b, ol) {
          loopIndex++;

          $(b)
            .css('top', util.pontoY(a) + 18)
            .css('left', util.pontoX(a))
            .attr('loop-index', loopIndex);

          util.ligar(a, b, ol);

          var ang = 0;
          var pos = util.pontoX(b);

          var loopBalancar = function () {
            $(b).css('left', pos + (Math.cos(ang += 0.1) * 15));
            util.ligar(a, b, ol);
          };

          loops[loopIndex] = setInterval(loopBalancar, 100);

        },

        stop: function (b) {
          clearInterval(loops[$(b).attr('loop-index')]);
          delete loops[$(b).attr('loop-index')];
        }
      };
    })();

    // conjunto de métodos úteis neste módulo
    var util = {
      ligar: function (a, b, ol) {

        var _pontoCentro = {
          a: util.pontoCentro(a),
          b: util.pontoCentro(b)
        };

        $(ol).css(
          'width', util.distancia(
            _pontoCentro.a.x,
            _pontoCentro.a.y,
            _pontoCentro.b.x,
            _pontoCentro.b.y
          )
        );

        $(ol).css(
          'top', util.pontoMedio(
            _pontoCentro.a.x,
            _pontoCentro.a.y,
            _pontoCentro.b.x,
            _pontoCentro.b.y
          ).y
        ).css(
          'left', util.pontoMedio(
            _pontoCentro.a.x,
            _pontoCentro.a.y,
            _pontoCentro.b.x,
            _pontoCentro.b.y
          ).x - (util.largura(ol) / 2)
        ).css('height', 1);

        var angle = (Math.atan((_pontoCentro.a.y - _pontoCentro.b.y) / (_pontoCentro.a.x - _pontoCentro.b.x))) * 180 / Math.PI;

        $(ol).css('transform', 'rotate(' + angle + ')');
      },

      // retora o centro de um elemento
      pontoCentro: function (a) {
        return {
          x: util.pontoX(a) + (util.altura(a) / 2),
          y: util.pontoY(a) + (util.largura(a) / 2)
        };
      },

      pontoMedio: function (x1, y1, x2, y2) {
        return {
          x: (x1 + x2) / 2,
          y: (y1 + y2) / 2
        };
      },

      // retorna a propriedade height sem o 'px'
      altura: function (a) {
        //jshint evil: true
        return eval($(a).height());
      },

      // retorna a propriedade width sem o 'px'
      largura: function (a) {
        //jshint evil: true
        return eval($(a).width());
      },

      // retorna a propriedade left sem o 'px'
      pontoX: function (a) {
        //jshint evil: true
        return eval($(a).css('left').replace('px', ''));
      },

      // retorna a propriedade top sem o 'px'
      pontoY: function (a) {
        //jshint evil: true
        return eval($(a).css('top').replace('px', ''));
      },

      // retorna a distancia entre dois pontos
      distancia: function (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      }
    };

    var $ligaMain = $('<section>')
      .addClass('liga-main')
      .css({
        width: 790,
        height: 315,
        position: 'absolute',
        fontWeight: config.fontWeight,
        fontSize: config.fontSize
      }).appendTo('#conteudo');


    var $ligaBox = $('<div>')
      .addClass('liga-box')
      .css({
        width: config.liga.width,
        display: 'block',
        position: 'absolute',
        left: config.liga.left,
        top: config.liga.top
      })
      .appendTo($ligaMain);


    var $alvoBox = $('<div>')
      .addClass('alvo-box')
      .css({
        width: config.alvo.width,
        display: 'block',
        position: 'absolute',
        left: config.alvo.left,
        top: config.alvo.top
      })
      .appendTo($ligaMain);


    // completando ligas
    liga.forEach(function (obj, i) {
      var $liga = $('<div>')
        .addClass('liga')
        .attr({
          'data-index': i,
          'data-correta': obj.dataCorreta
        })
        .css({
          width: config.liga.width,
          height: config.liga.height,
          paddingTop: config.liga.paddingTop,
          paddingLeft: 5,
          paddingRight: 5,
          paddingBottom: config.liga.paddingBottom,
          marginBottom: config.liga.marginBottom,
          borderRadius: 5,
          float: 'left',
          textAlign: config.liga.textAlign,
          background: 'linear-gradient(to bottom, #fff, #eee)',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.4)',
          borderTop: '1px solid rgba(0, 0, 0, 0.01)',
          position: 'relative',
          color: '#666'
        })
        .html(obj.conteudo)
        .appendTo($ligaBox);

      criarLiga(i, $liga, obj.cor);
    });

    //função para criar ligas
    function criarLiga(i, obj, bg) {
      var bgCor = null;

      if (bg) {//para repetir a cor
        bgCor = bg;
      } else {
        bgCor = edi.util.corAleatoria();
      }

      $('<span>').css({
        width: 25,
        height: 1,
        position: 'absolute',
        left: $(obj).width() + 10,
        top: 0,
        borderTop: '1px solid' + config.borderColor,
        display: 'none'
      }).appendTo(obj).fadeIn();

      var $suporte = $('<span>')
        .addClass('liga-suporte')
        .css({
          width: 0,
          height: 0,
          position: 'absolute',
          left: $(obj).width() + 35,
          top: 0,
          display: 'none'
        }).appendTo(obj).fadeIn();

      var $elastico = $('<span>')
        .addClass('liga-elastico')
        .css({
          width: 30,
          height: 1,
          position: 'absolute',
          top: 14,
          left: $(obj).width() + 20,
          transform: 'rotate(90deg)',
          borderTop: '1px solid' + config.borderColor,
          zIndex: 100,
          display: 'none'
        }).appendTo(obj).fadeIn();

      var $bolinha = $('<span>')
        .addClass('liga-bolinha')
        .attr({
          'data-correta': $(obj).attr('data-correta'),
          'data-index': i,
          'data-bg-color': bgCor, //p manter a mesma cor quando recriado
          'id': 'liga-' + i
        })
        .css({
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: bgCor,
          position: 'absolute',
          left: $(obj).width() + 28,
          top: 20,
          cursor: 'pointer',
          boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.3)',
          zIndex: 100,
          display: 'none'
        }).appendTo(obj).fadeIn();

      $bolinha.attr({
        'data-pos-x': util.pontoX($bolinha),
        'data-pos-y': util.pontoY($bolinha)
      });

      $bolinha.draggable({
        start: function () {
          scaleFactor = getScale();
          drag = false;
          balancar.stop($bolinha);
          desenharElastico.start($suporte, $bolinha, $elastico);
        },
        stop: function () {
          if (!drag) {
            $(this).animate({
              left: $(this).attr('data-pos-x'),
              top: $(this).attr('data-pos-y')
            }, {
              step: function () {
                util.ligar($suporte, $bolinha, $elastico);
              },

              complete: function () {
                balancar.start($suporte, $bolinha, $elastico);
              }
            });
          }

          desenharElastico.stop();
        }
      });

      var $touchHelper = $('<div>').css({
                                       display: 'block',
                                       backgroundColor: 'transparent',
                                       width: 45,
                                       height: 45,
                                       marginTop: -15,
                                       marginLeft: -15
      });

      $bolinha.append($touchHelper);

      balancar.start($suporte, $bolinha, $elastico);
    }

    // completando arrastas
    alvo.forEach(function (obj, i) {
      var $alvo = $('<div>')
        .addClass('alvo')
        .attr({
          'data-index': i,
          'data-correta': obj.dataCorreta
        })
        .css({
          width: config.alvo.width,
          height: config.alvo.height,
          paddingTop: config.alvo.paddingTop,
          paddingBottom: config.alvo.paddingBottom,
          marginBottom: config.alvo.marginBottom,
          borderRadius: 5,
          float: 'left',
          textAlign: config.alvo.textAlign,
          background: 'linear-gradient(to bottom, #fff, #eee)',
          boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.4)',
          borderTop: '1px solid rgba(0, 0, 0, 0.01)',
          position: 'relative',
          color: '#666'
        })
        .html(obj.conteudo)
        .appendTo($alvoBox);

      $('<span>')
        .addClass('liga-suporte')
        .css({
          width: 20,
          position: 'absolute',
          left: -20,
          top: ($alvo.height() / 2) + 5,
          borderTop: '1px solid' + config.borderColor
        }).appendTo($alvo);

      var $alvo_ = $('<span>')
        .addClass('liga-bolinha liga-alvo aberto')
        .attr({
          'data-correta': obj.dataCorreta,
          'id': 'alvo-' + i
        })
        .css({
          width: 22,
          height: 22,
          borderRadius: '50%',
          background: config.borderColor,
          position: 'absolute',
          left: -30,
          top: $alvo.height() / 2 - (config.alvo.paddingBottom),
          cursor: 'pointer',
          boxShadow: 'inset 1px 1px 1px rgba(0, 0, 0, 0.2)'
        }).appendTo($alvo);

      $alvo_.droppable({
        tolerance: "touch",
        over: function () {
          $alvo_.css({
            boxShadow: 'inset 1px 1px 1px rgba(0, 0, 0, 0.7)'
          });
        },

        out: function () {
          $alvo_.css({
            boxShadow: 'inset 1px 1px 1px rgba(0, 0, 0, 0.2)'
          });
        },

        drop: function (e, ui) {
          var lCorreta = $(ui.draggable).attr('data-correta'),
            aCorreta = $alvo_.attr('data-correta'),
            _corBG = $(ui.draggable).attr('data-bg-color'),
            index = $(ui.draggable).attr('data-index'),
            aberto = $alvo_.hasClass('aberto');

          if (lCorreta == aCorreta && aberto) {

            peca.objetivos.unshift(1);
            edi.objetivos.unshift(1);

            drag = true;
            $(ui.draggable)
              .appendTo($alvo_)
              .css({
                left: 3,
                top: 3
              }).off();

            $alvo_.removeClass('aberto');

            //decrementando objetivos
            peca.objetivos.pop();
            edi.objetivos.pop();

            if (condicao) {
              edi.finalizar(null, null, function () {
                condicao = false;
              });
            }

            //criando outro liga
            if (!config.ligaFixo && condicao) criarLiga(index, $('.liga[data-index="' + index + '"]'), _corBG);

            //chamando callbacks
            if (callback) callback(true, $(ui.draggable), $alvo_);

            if (callbackFinal && !condicao) callbackFinal(true);

          } else {

            if (config.erros) {
              console.log('asdasd');

              peca.objetivos.unshift(2);
              edi.objetivos.unshift(2);

              drag = true;
              $(ui.draggable)
                .appendTo($alvo_)
                .css({
                  left: 3,
                  top: 3
                }).off();

              //decrementando objetivos
              peca.objetivos.pop();
              edi.objetivos.pop();

              if (condicao) {
                edi.finalizar(null, null, function () {
                  condicao = false;
                });
              }

              //criando outro liga
              if (!config.ligaFixo && condicao) criarLiga(index, $('.liga[data-index="' + index + '"]'), _corBG);

            }

            if (!config.erros)
              $alvo_.css({boxShadow: 'inset 1px 1px 1px rgba(0, 0, 0, 0.2)'});

            //chamando callbacks
            if (callback) callback(false, $(ui.draggable), $alvo_);
            if (callbackFinal && !condicao) callbackFinal(false);
          }
        }
      });
    });

    ARR_TAREFAS[tarefaLigar].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    ligar: _init
  };

});
