define(function(require) {
  var click = {
    x: 0,
    y: 0
  }; // used for recording mouse cords
  var tarefaArrasta = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(classGroupArrasta, classGroupSolta, callBack, callBackFinal, settings, callBackEndLoading, callBackDrag, callBackStop) {
    var peca = this;
    edi.iniciar(_configEDI); //montar o palco

    var condicao = true;

    var config = {
      zIndexDefault: true,
      alvoFixo: false,
      corTexto: '#9c0',
      gradiente: 'corGradiente',
      centraliza: true,
      append: true,
      destroy: false,
      colorirFilho: false,
      animacaoFundoArrasta: false, //Animação para o fundo do div que vai ser arrastado
      reloadCorreta: false,
      multAlvo: false,
      clone: false,
      target: true,
      position: 'relative',
      displaySpan: 'table',
      tempoMultitela: 0,
      cb: null //callBack apos remover ctLoading
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.animacaoFundoArrasta) {
      $('.' + classGroupArrasta).each(function(index, el) {
        $(this).addClass(config.gradiente);
      });
    }

    $("." + classGroupArrasta)
      .draggable({
        revert: "invalid"
      })
      .css('cursor', 'pointer');

    // DRAG ADD Z-INDEX 20 PARA O ARRASTA FICAR SOBRE OS OUTROS E STOP ADD Z-INDEX 1 PARA O ARRASTA FICAR IGUAL AOS DEMAIS.
    $("." + classGroupArrasta).draggable({
      drag: function(event, ui) {
        if ( !! callBackDrag) callBackDrag($(this));
        if (config.zIndexDefault) $(this).css('z-index', '20');
      },
      stop: function(event, ui) {
        if ( !! callBackStop) callBackStop($(this));
        if (config.zIndexDefault) $(this).css('z-index', '0');
      }
    })
      .on('dragstart', function(event, ui) {
        scaleFactor = getScale();
        $('#droppable_area_ids').html('');
        click.x = event.clientX;
        click.y = event.clientY;
      })
      .on('drag', function(event, ui) {
        var zoom = getScale();
        var original = ui.originalPosition;

        ui.position = {
          left: (event.clientX - click.x + original.left) / zoom,
          top: (event.clientY - click.y + original.top) / zoom
        };
      })
      .on('dragend', function(event, ui) {
        click.x = 0;
        click.y = 0;
      });

    $.each($("." + classGroupSolta), function(key, alvo) {
      var corretaArrasta = "." + classGroupArrasta + "[data-correta='" + $(this).attr('data-correta') + "']";

      if (!config.multAlvo && $(corretaArrasta).length) {
        edi.objetivos.push(0);
        peca.objetivos.push(0);
      }

      if (config.multAlvo) {
        for (i = 0; i < $(corretaArrasta).length; i++) {
          edi.objetivos.push(0);
          peca.objetivos.push(0);
        }
      }

    });

    var arrastasTop = [];
    var arrastasLeft = [];

    $("." + classGroupArrasta).each(function(a, b) {
      var $arrasta = $(this);
      arrastasTop[a] = $arrasta.offset().top - $('#principal').offset().top;
      arrastasLeft[a] = $arrasta.offset().left - $('#principal').offset().left;

    });

    $("." + classGroupArrasta).each(function(a) {

      var $arrasta = $(this);
      $arrasta
        .attr({
          'data-Y': Math.ceil(arrastasTop[a]),
          'data-X': Math.ceil(arrastasLeft[a]),
          'data-id': ( !! $arrasta.attr('data-id')) ? $arrasta.attr('data-id') : a
        });
    });

    $("." + classGroupArrasta).each(function(a) {

      var $arrasta = $(this);
      $arrasta
        .css({
          position: 'absolute',
          top: arrastasTop[a],
          left: arrastasLeft[a]
        }).appendTo('#principal');

    });

    function appendArrasta(obj, parent) {

      if (config.clone) {
        var $clone = obj.clone();
        $clone.addClass("arrasta").css({
          cursor: "pointer",
          left: $clone.attr('data-x') + 'px',
          top: $clone.attr('data-y') + 'px'
        })
          .appendTo('#principal')
          .draggable({
            revert: true
          });
      }

      if (config.centraliza) {
        obj
          .css({
            top: (config.reloadCorreta) ? 0 : obj.css('top'),
            left: (config.reloadCorreta) ? 0 : obj.css('left'),
            position: config.position,
            display: 'table-cell',
            verticalAlign: 'middle',
            height: (config.reloadCorreta) ? 'auto' : obj.css('height')
          }).removeClass('azulAlpha').draggable({
            revert: false
          });

        $(parent).css({
          textAlign: "center"
        });
      }
      if (!config.destroy) {
        var dv_rel = $('<span>')
          .css({
            width: "100%",
            height: "100%",
            display: config.displaySpan,
            position: config.position
          })
          .addClass('add')
          .append(obj.css({
            margin: (config.reloadCorreta) ? 0 : obj.css('margin'),
            padding: (config.reloadCorreta) ? 0 : obj.css('padding')
          }));

        if (config.colorirFilho) {
          dv_rel.children().css('color', config.corTexto);
        }

        $(parent)
          .css('display', 'inline-block')
          .append(dv_rel);

        if (!config.multAlvo) {
          $(parent).droppable('destroy');
        }
      }
    }

    var styleAlvo, acertou;


    $("." + classGroupSolta)
      .droppable({
        accept: "." + classGroupArrasta,
        tolerance: "pointer",
        over: function(a, ui) {
          acertou = ($(this).attr('data-correta') == $(ui.draggable).attr('data-correta'));
          //concertando o bug quando tem alvos proximos
          if (config.target) {

            styleAlvo = this.style.boxShadow;
            $(this).css({
              boxShadow: 'inset 0 5px 30px -10px rgba(0,0,0,0.51)'
            });
          }
        },
        out: function(a, ui) {
          if (config.target) {
            this.style.boxShadow = styleAlvo;
          }
        },
        drop: function(a, ui) {

          if (config.target) {
            this.style.boxShadow = styleAlvo;
          }

          var alvo = $(this).attr('data-correta');
          var arrasta = $(ui.draggable).attr('data-correta');


          if ( !! $(this).attr('data-correta') && !! $(ui.draggable).attr('data-correta'))


            if (acertou || !config.alvoFixo) {

              if (acertou) {
                edi.acertos.push($(ui.draggable).attr('data-id'));
              }

              var parent = this;

              appendArrasta(ui.draggable, parent);

              if (config.centraliza) {

                ui.draggable
                  .css({
                    position: config.position,
                    display: 'table-cell',
                    left: 0,
                    top: 0
                  });

                $(this).css({
                  textAlign: "center"
                });
              }

              if (config.append) {

              } else {
                if (config.colorirFilho)
                  ui.draggable.css('color', config.corTexto);
              }

              ui.draggable
                .draggable("destroy")
                .css('cursor', 'default')
                .css('z-index', '0')
                .removeClass(config.gradiente);

              if (config.destroy) {
                $(ui.draggable)
                  .remove();
              }

              edi.objetivos.pop();
              edi.objetivos.unshift(acertou ? 1 : 2);
              peca.objetivos.pop();

              if (!peca.objetivos.length && edi.objetivos.indexOf(2) >= 0) {
                edi.objetivos = [2];
              }

              if (peca.objetivos.length === 0 && callBackFinal) {
                if (edi.objetivos.indexOf(2) < 0) {
                  callBackFinal(true);
                } else {
                  callBackFinal(false);
                }
              }

            } else {
              if (!acertou)
                $(ui.draggable)
                  .animate({
                    left: $(ui.draggable).attr('data-X'),
                    top: $(ui.draggable).attr('data-Y')
                  })
                  .css('z-index', '0');
            }

          if ( !! callBack) {
            callBack(acertou, $(ui.draggable), $(this));
          }

          if ( !! licao.config.WIQUADRO)
            Wiquadro.api.addInteration(2, $(ui.draggable).attr('id'), $(this).attr('id'), acertou);

          if (condicao)
            edi.finalizar({tempoMultitela: config.tempoMultitela}, null, function() {
              condicao = false;
            });
        }
      });

    if (config.reloadCorreta) {

      var temp = edi.util.getURL('acertos');

      if (temp !== null) {

        var acertos = temp.split(',');

        for (var i = 0; i < acertos.length; i++) {

          if (acertos[i] === "")
            continue;

          var self = $('[data-id="' + acertos[i] + '"]');

          self
            .css({
              cursor: 'default'
            })
            .unbind();

          if ( !! config.multAlvo) {
            appendArrasta(self, $(".alvo[data-correta='" + self.attr('data-correta') + "']").first());
          } else {
            appendArrasta(self, $(".alvo[data-correta='" + self.attr('data-correta') + "']").first());
            $(".alvo[data-correta='" + self.attr('data-correta') + "']").first().removeAttr('data-correta');
          }

          edi.acertos.push(self.attr('data-id'));
          peca.objetivos.pop();
          edi.objetivos.pop();
          edi.objetivos.unshift(1);
        }
      }
    }

    if ( !! callBackEndLoading) {
      callBackEndLoading();
    }
    ARR_TAREFAS[tarefaArrasta].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    arrasta: _init,
    util: edi.util,
    telaAtual: edi.util.getURL('quest'),
    root: edi
  };

});