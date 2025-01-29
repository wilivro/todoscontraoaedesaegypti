define(function(require) {
  var tarefaAlternativa = addTarefa(),
    corretas = [];
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _telaAtual() {
    return edi.util.getURL('quest');
  }

  function _init(alternativas, callBack, callBackFinal, settings) {


    edi.iniciar(_configEDI); //montar o palco
    _configEDI.qtdTelas = edi.qtdTelas;
    var peca = this,
      condicao = true;

    var config = {
      aleatorio: true,
      fontSize: 10,
      top: 80,
      left: 10,
      textAlign: 'initial',
      width: 600,
      height: 50,
      trocarTxt: false
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.aleatorio) {
      alternativas.sort(function() {
        return 0.5 - Math.random();
      });
    }

    var ctAll = $('<secition>')
      .css({
        position: 'absolute',
        top: config.top,
        left: config.left
      })
      .appendTo('#conteudo');

    var img_carimbo = $('<img>')
      .attr({
        id: 'carimbo',
        src: '../wilib/img/svg/carimbo.svg',
        width: 80
      })
      .css({
        position: 'absolute',
        display: 'inherit',
        top: 120,
        left: 800,
        zIndex: 1
      })
      .appendTo('#conteudo');

    var finalizar = function(id, acertou, elemento) {

      edi.objetivos.pop();
      edi.objetivos.unshift(acertou ? 1 : 2);
      peca.objetivos.pop();

      var status = acertou ? 'T' : 'F';
      if ( !! licao.config.WIQUADRO) Wiquadro.api.addInteration(6, id, null, status);

      if (!peca.objetivos.length && edi.objetivos.indexOf(2) >= 0) {
        edi.objetivos = [2];
      }

      if (peca.objetivos.length === 0) {
        if (edi.objetivos.indexOf(2) < 0) {
          if ( !! callBackFinal)
            callBackFinal(true);
        } else {
          if ( !! callBackFinal)
            callBackFinal(false);
        }
        edi.finalizar();
      }

      if (config.trocarTxt) {
        elemento.find('.txt p').html();
      }

      if ( !! callBack) callBack(acertou, $("#" + id));
    };

    var carimbo = function(id, _condicao, pos, elemento) {
      var dv_carimbo = $("#carimbo"),
        top = $('#' + id).position().top / getScale(),
        left = $('#' + id).position().left / getScale();

      condicao = false;

      dv_carimbo
        .animate({
            top: top,
            left: left + config.left - 7
          }, 500,
          function() {
            dv_carimbo
              .animate({
                  top: $('#' + id)[0].offsetTop + config.top,
                  left: $('#' + id)[0].offsetLeft + config.left - 2,
                  width: 54
                }, 500,
                function() {
                  $('#' + id).addClass('ok').find('img').css({
                    display: 'inherit'
                  }).fadeIn();
                  dv_carimbo
                    .animate({
                        top: top,
                        left: left + config.left - 7,
                        width: 80
                      }, 500,
                      function() {
                        dv_carimbo
                          .animate({
                              top: 120,
                              left: 800
                            }, 500,
                            function() {

                              condicao = true;

                              require(['../../canvas/objetos/animaCerto', '../../canvas/objetos/animaErrado'], function(Certo, Errado) {

                                if ((corretas[pos] === 1 && JSON.parse(_condicao)) || (corretas[pos] === 0 && !JSON.parse(_condicao))) {

                                  var certo = new Certo.animaCerto({
                                    cor: '#0060B6',
                                    width: 20
                                  });
                                  certo.obj
                                    .css({
                                      position: '',
                                      marginLeft: 5,
                                      marginTop: 6,
                                      display: 'inherit'
                                    })
                                    .appendTo(elemento.find('.result'));
                                  certo.play();
                                  finalizar(id, true, elemento);

                                  if (config.trocarTxt)
                                    elemento.find('.txt p')
                                      .css({
                                        color: '#9c0'
                                      })
                                      .html(elemento.find('.msgT').html());

                                } else {
                                  var errado = new Errado.animaErrado({
                                    cor: '#F00',
                                    width: 20
                                  });
                                  errado.obj
                                    .css({
                                      position: '',
                                      marginLeft: 5,
                                      marginTop: 7,
                                      display: 'inherit'
                                    })
                                    .appendTo(elemento.find('.result'));
                                  errado.play();
                                  finalizar(id, false, elemento);

                                  if (config.trocarTxt)
                                    elemento.find('.txt p')
                                      .css({
                                        color: '#f00'
                                      })
                                      .html(elemento.find('.msgF').html());
                                }

                              });
                            });
                      });
                });
          });
    };

    var colocaCliqueErrado = function(elemento) {
      elemento.mouseover(function() {
        $(this).css({
          background: 'rgba(204,204,204,.3)'
        });
      })
        .mouseleave(function() {
          $(this).css({
            background: '#FFF'
          });
        });
    };

    var colocaCliqueCerto = function(elemento){
      elemento.mouseover(function() {
          $(this).css({
            background: 'rgba(204,204,204,.3)'
          });
        })
        .mouseleave(function() {
          $(this).css({
            background: '#FFF'
          });
        });
    };

    for (var i = 0; i < alternativas.length; i++) {

      edi.objetivos.push(0);
      peca.objetivos.push(0);

      corretas.push(alternativas[i].dataCorreta ? 1 : 0);

      var ct = $('<div>')
        .addClass('ct')
        .css({
          border: '1px solid #CCC',
          borderRadius: 10,
          width: config.width,
          height: config.height,
          backgroundColor: '#fff',
          marginTop: 5
        })
        .appendTo(ctAll);

      var boxTexto = $('<div>')
        .addClass('txt')
        .css({
          display: 'inline-block',
          textAlign: 'center',
          width: config.width - 150,
          marginLeft: 5,
          borderWidth: '0 1px 0 0',
          borderColor: '#CCC',
          borderStyle: 'solid',
          height: config.height
        })
        .appendTo(ct);

      var boxSuport = $('<div>')
        .css({
          position: 'absolute',
          textAlign: config.textAlign,
          width: config.width - 155,
          height: config.height
        })
        .appendTo(boxTexto);

      var boxCenter = $('<div>')
        .css({
          display: 'table-cell',
          verticalAlign: 'middle',
          width: config.width - 155,
          height: config.height
        })
        .appendTo(boxSuport);

      var center = $('<p>')
        .css({
          display: 'table-cell',
          width: config.width - 155,
          fontSize: config.fontSize
        })
        .html(alternativas[i].texto)
        .appendTo(boxCenter);

      var boxCirc1 = $('<div>')
        .css({
          display: 'inline-block',
          width: 65,
          marginLeft: 5,
          borderWidth: '0 1px 0 0',
          borderColor: '#CCC',
          borderStyle: 'solid',
          height: config.height
        })
        .appendTo(ct);

      if (i === 0) $('<div>')
        .css({
          position: 'absolute',
          width: 65,
          height: 17,
          textAlign: 'center',
          marginLeft: -2,
          backgroundColor: '#fff',
          borderRadius: '5px 5px 0 0',
          color: '#093',
          top: -12
        })
        .html('CERTA')
        .appendTo(boxCirc1);

      var circ1 = $('<div>')
        .attr({
          id: 'btn1' + i,
          class: 'botao',
          'data-alternativa': i,
          'data-correta': true
        })
        .css({
          marginLeft: 7,
          marginTop: (config.height - 45) / 2,
          width: 45,
          height: 45,
          borderRadius: 45,
          border: '1px solid #CCC',
          cursor: 'pointer'
        })
        .appendTo(boxCirc1);

      colocaCliqueErrado(circ1);

      $('<img>')
        .attr({
          src: '../wilib/img/svg/circ_certa.svg',
          id: 'certoImg',
          width: 45
        })
        .css({
          display: 'none'
        })
        .appendTo(circ1);

      var boxCirc2 = $('<div>')
        .css({
          display: 'inline-block',
          width: 66,
          marginLeft: 5,
          height: config.height
        })
        .appendTo(ct);

      if (i === 0) $('<div>')
        .css({
          position: 'absolute',
          width: 65,
          height: 17,
          textAlign: 'center',
          marginLeft: -2,
          backgroundColor: '#fff',
          borderRadius: '5px 5px 0 0',
          color: '#F00',
          top: -12
        })
        .html('ERRADA')
        .appendTo(boxCirc2);

      var circ2 = $('<div>')
        .attr({
          id: 'btn2' + i,
          class: 'botao',
          'data-alternativa': i,
          'data-correta': false
        })
        .css({
          marginLeft: 7,
          marginTop: (config.height - 45) / 2,
          width: 45,
          height: 45,
          borderRadius: 45,
          cursor: 'pointer',
          border: '1px solid #CCC'
        })
        .appendTo(boxCirc2);

        colocaCliqueCerto(circ2);

      $('<img>')
        .attr({
          src: '../wilib/img/svg/circ_errada.svg',
           id: 'erradoImg',
          width: 45
        })
        .css({
          display: 'none'
        })
        .appendTo(circ2);

      var boxVisto = $('<div>')
        .attr({
          'data-alternativa': i,
          class: 'result'
        })
        .css({
          marginTop: -39,
          marginLeft: 67,
          background: '#FFF',
          borderWidth: '1px 1px 1px 2px',
          borderColor: '#CCC',
          borderLeftColor: '#FFF',
          borderStyle: 'solid',
          borderRadius: '0 5px 5px 0',
          width: 30,
          height: 30
        })
        .appendTo(boxCirc2);

      var msgT = $('<p>')
        .addClass('msgT')
        .html(alternativas[i].msgT)
        .css({
          display: 'none'
        })
        .appendTo(ct);

      var msgF = $('<p>')
        .addClass('msgF')
        .html(alternativas[i].msgF)
        .css({
          display: 'none'
        })
        .appendTo(ct);

    }

    $('.botao').mousedown(function() {
      var self = $(this);
      if (condicao) {
        var
        elemento = $(this).closest('.ct'),
          id = $(this).attr('id'),
          _condicao = $(this).attr('data-correta'),
          pos = $(this).attr('data-alternativa'),
          btns = $('[data-alternativa="' + self.attr('data-alternativa') + '"');

        btns.css({
          cursor: 'default'
        }).off();

        carimbo(id, _condicao, pos, elemento);

      }

    });

    ARR_TAREFAS[tarefaAlternativa].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    iniciar: _init,
    telaAtual: _telaAtual
  };

});