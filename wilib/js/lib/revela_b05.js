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

  function _init(revelas, callback, callbackFinal, settings, callbackTempoBloqueio) {

    edi.iniciar(_configEDI);//montar o palco

    var peca = this;
    var finalizada = false;
    var ordem = 0;// caso seja revelado na ordem

    var config = {
      tempoBloqueio: 5000,
      efeito: 'fade',
      piscar: true,
      fontSize: 14,
      bloqueiaClickFinal: false,
      left: 300
    };

    if (settings) {
      $.extend(config, settings);
    }

    var ct = $('<div>')
      .css({
        position: 'absolute',
        top: 85,
        left: config.left,
        border: 'solid 1px #ccc',
        width: 768 - config.left,
        height: 270,
        padding: 5,
        borderRadius: 10
      })
      .appendTo('#conteudo');

    var middle = $('<div>')
      .css({
        position: 'relative',
        display: 'table-cell',
        verticalAlign: 'middle',
        width: 768 - config.left,
        height: 270
      })
      .appendTo(ct);

    for (var i = 0; i < revelas.length; i++) {

      var box = $('<div>')
        .css({
          width: 768 - config.left,
          height: parseInt(270 / revelas.length)
        }).appendTo(middle);

      var boxMidlle = $('<div>')
        .css({
          width: 768 - config.left,
          height: parseInt(270 / revelas.length),
          verticalAlign: 'middle',
          textAlign: 'center',
          display: 'table-cell'
        }).appendTo(box);

      var boxBtn = $('<div>')
        .css({
          float: 'left',
          height: parseInt(270 / revelas.length)
        })
        .appendTo(boxMidlle);

      var btnMiddle = $('<div>')
        .css({
          display: 'table-cell',
          verticalAlign: 'middle',
          height: parseInt(270 / revelas.length)
        })
        .appendTo(boxBtn);

      $('<div>')
        .css({
          background: '#91BB49',
          width: 30,
          height: 30,
          marginLeft: 10,
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center',
          color: '#fff',
          borderRadius: 5,
          border: '2px solid #FFF',
          boxShadow: '1px 1px 1px rgba(0,0,0,0.5)',
          textShadow: '1px 1px 1px rgba(0,0,0,0.5)'
        })
        .html('<span style="display: none;">' + (i + 1) + '</span>')
        .addClass('btn-revela')
        .attr('data-revela', i)
        .appendTo(btnMiddle);


      var boxTxt = $('<div>')
        .css({
          float: 'left',
          height: parseInt(270 / revelas.length),
          marginLeft: 10,
          padding: 2
        })
        .addClass('box-revela')
        .attr('data-revela', i)
        .appendTo(boxMidlle);

      $('<div>')
        .css({
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'left',
          fontSize: config.fontSize,
          width: 718 - config.left,
          height: parseInt(270 / revelas.length),
          color: '#666'
        })
        .html(revelas[i])
        .appendTo(boxTxt);

    }

    var $btnRev = $('.btn-revela'),
      $boxRev = $('.box-revela');

    $btnRev.css('cursor', 'pointer');

    $boxRev.hide();

    $btnRev.click(BtnRevClick);

    $btnRev.attr('data-edi', 'revela_b05"');

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

    function BtnRevClick() {
      var self = $(this);
      var dataRev = $(this).attr('data-revela');

      self.off().css({cursor: 'default'}).find('span').fadeIn();

      $boxRev.each(function (i, obj) {
        if (dataRev == $(obj).attr('data-revela')) {
          setTimeout(function () {
            if (config.efeito == 'fade') {
              $(obj).fadeIn();
            } else if (config.efeito == 'slideDown') {
              $(obj).slideDown();
            }
          }, 500);

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
          $('[data-index="' + ordem + '"]').click(BtnRevClick);
        }
      });

      $(this).removeClass('piscar');

      $btnRev.off('click');

      if (peca.objetivos.length !== 0) {
        if (config.tempoBloqueio) {
          edi.regressiva(config.tempoBloqueio, 'para clicar em outro botão', function () {
            $btnRev.click(BtnRevClick);

            if (!!callbackTempoBloqueio) callbackTempoBloqueio();

            if (peca.objetivos.length === 0) {
              finalizada = true;
              if (callbackFinal) callbackFinal(self);
            }

            self.off('click');
            if (peca.objetivos.length === 0 && config.bloqueiaClickFinal) {
              $btnRev.off('click');
            }
          }, config);
        } else {
          $btnRev.click(BtnRevClick);

          self.off('click');
          if (peca.objetivos.length === 0 && config.bloqueiaClickFinal) {
            $btnRev.off('click');
          }
        }

      } else if (!config.bloqueiaClickFinal) {
        edi.regressiva(config.tempoBloqueio, 'para clicar em outro botão', function () {

          if (!!callbackTempoBloqueio) callbackTempoBloqueio();

          if (peca.objetivos.length === 0) {
            finalizada = true;
            if (callbackFinal) callbackFinal(self);
          }

          $btnRev.click(BtnRevClick);

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
    }

    ARR_TAREFAS[tarefaRevela].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    telaAtual: _telaAtual,
    revela_b05: _init
  };

});
