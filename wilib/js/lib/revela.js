define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('./edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _telaAtual() {
    return edi.util.getURL('quest');
  }

  function _init(btnRevela, boxRevela, callback, callbackFinal, settings, callbackTempoBloqueio) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this;
    var finalizada = false;
    var ordem = 0;// caso seja revelado na ordem

    var $btnRev = $('.' + btnRevela),
      $boxRev = $('.' + boxRevela);

    var config = {
      inverso: false,
      tempoBloqueio: 1000,
      efeito: 'fade',
      piscar: true,
      ocultarBtn: false,
      ocultarRev: false,
      ordenado: false,
      delay: 0,
      bloqueiaClickFinal: true
    };

    if (settings) {
      $.extend(config, settings);
    }

    $btnRev.css('cursor', 'pointer');

    if(!config.inverso)
      $boxRev.hide();

    $btnRev.on('click', BtnRevClick);

    $btnRev.attr('data-edi', 'revela"');

    $btnRev.mouseenter(function () {
      if (config.piscar) $(this).addClass('piscar');
    });

    $btnRev.mouseout(function () {
      if (config.piscar) $(this).removeClass('piscar');
    });

    $btnRev.each(function (i, data) {
      peca.objetivos.push(0);
      edi.objetivos.push(0);
      $(data).attr('data-index', i);
    });

    // trabalhando revela em ordem
    if (config.ordenado) {
      $btnRev.each(function (i, data) {
        $(data).off('click');
      });

      $('[data-index="0"]').on('click', BtnRevClick);
    }

    function BtnRevClick() {
      var self = $(this);
      var dataRev = $(this).attr('data-revela');

      if (config.ocultarRev) $boxRev.fadeOut();

      $boxRev.each(function (i, obj) {
        if (dataRev == $(obj).attr('data-revela')) {
          setTimeout(function () {
            if (config.efeito == 'fade') {
              if(!config.inverso) {
                $(obj).fadeIn();
              } else {
                $(obj).fadeOut();
              }
            } else if (config.efeito == 'slideDown') {
              if(!config.inverso) {
                $(obj).slideDown();
              } else {
                $(obj).slideUp();
              }
            }
          }, config.delay);

          if (config.ocultarBtn) self.fadeOut();

          if (!self.attr('visualizada')) {
            peca.objetivos.pop();
            edi.objetivos.pop();
            edi.objetivos.unshift(1);
          }

          self.attr('visualizada', true);

          if (callback) callback(self, $(obj));

          //interação wiquadro
          if (!!licao.config.WIQUADRO)
            Wiquadro.api.addInteration(1, $(obj).attr('id'), self.attr('id'), 'T');

          ordem++;
          // adicionando o click de volta ao btn
          $('[data-index="' + ordem + '"]').on('click', BtnRevClick);
        }
      });

      $(this).removeClass('piscar');

      $btnRev.off('click');

      if (peca.objetivos.length !== 0) {
        if (config.tempoBloqueio) {
          edi.regressiva(config.tempoBloqueio, 'para clicar em outro botão', function () {
            $btnRev.on('click', BtnRevClick);

            if (!!callbackTempoBloqueio) callbackTempoBloqueio();

            $btnRev.mouseenter(function () {
              if (config.piscar) $(this).addClass('piscar');
            });

            $btnRev.mouseout(function () {
              if (config.piscar) $(this).removeClass('piscar');
            });

            self.off('click');
            if (peca.objetivos.length === 0 && config.bloqueiaClickFinal) {
              $btnRev.off('click');
            }
          }, config);
        } else {
          $btnRev.on('click', BtnRevClick);

          $btnRev.mouseenter(function () {
            if (config.piscar) $(this).addClass('piscar');
          });

          $btnRev.mouseout(function () {
            if (config.piscar) $(this).removeClass('piscar');
          });

          self.off('click');
          if (peca.objetivos.length === 0 && config.bloqueiaClickFinal) {
            $btnRev.off('click');
          }
        }

      } else if (!config.bloqueiaClickFinal) {
        edi.regressiva(config.tempoBloqueio, 'para clicar em outro botão', function () {

          if (!!callbackTempoBloqueio) callbackTempoBloqueio();

          $btnRev.on('click', BtnRevClick);

          $btnRev.mouseenter(function () {
            if (config.piscar) $(this).addClass('piscar');
          });

          $btnRev.mouseout(function () {
            if (config.piscar) $(this).removeClass('piscar');
          });

          self.off('click');
        });
      }

      if (!finalizada) {
        edi.finalizar();
      }

      if (peca.objetivos.length === 0) {
        finalizada = true;
        if (callbackFinal) callbackFinal(self);
      }
    }

    ARR_TAREFAS[tarefaRevela].resolve(config.cb);
  }

  return {
    root: edi,
    objetivos: [],
    setConfig: _setConfig,
    telaAtual: _telaAtual,
    revela: _init
  };

});
