define(function (require) {
  var tarefaBtnNumero = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(botoes, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this;
    var clickAnterior;

    var qtd = botoes.length / 2;
    qtd = Math.ceil(qtd);

    var config = {
      aleatorio: false,
      QtdNumbTop: qtd,
      tamanhoBoxTexto: 535,
      tamanhoFontBtns: 30,
      larguraBtn: 35,
      alturaBtn: 35,
      marginBtns: 10,
      tamanhoFonteTexto: 16,
      tempoPassar: 5,
      leftBtns: 0,
      leftRevela: 0,
      topRevela: 0,
      showNumber: true
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.aleatorio) {
      botoes.sort(function () {
        return 0.5 - Math.random();
      });
    }

    var ctn = $("<section>")
      .attr('data-edi', 'revela_btn_numero')
      .appendTo('#conteudo');


    var container = $('<section>')
      .css({
        position: 'relative',
        textAlign: 'center',
        display: 'table-cell',
        verticalAlign: 'middle',
        width: 788,
        height: 315,
        paddingLeft: config.leftRevela,
        paddingTop: config.topRevela
      })
      .appendTo(ctn);

    var containerBtns = $('<section>')
      .css({
        position: 'absolute',
        top: 68,
        left: config.leftBtns,
        width: 788,
        height: 315
      })
      .appendTo(ctn);

    var btns1 = $('<div>')
      .css({
        top: 20,
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        height: 50
      })
      .addClass('btns1')
      .appendTo(containerBtns);

    var btns2 = $('<div>')
      .css({
        top: 205,
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        height: 50
      })
      .addClass('btns2')
      .appendTo(containerBtns);

    var boxTexto = $('<div>')
      .css({
        position: 'relative',
        width: config.tamanhoBoxTexto,
        height: 150,
        borderRadius: 10,
        border: '1px solid rgb(167, 185, 195)',
        boxShadow: '1px 1px 5px 1px rgba(128,128,128,.3)',
        verticalAlign: 'middle',
        display: 'none',
        top: 5
      })
      .appendTo(container);

    var dvTexto = $('<div>')
      .css({
        position: 'absolute',
        left: 55,
        height: boxTexto.height(),
        width: boxTexto.width() - 110
      })
      .appendTo(boxTexto);

    var texto = $('<div>')
      .css({
        fontSize: config.tamanhoFonteTexto,
        fontWeight: 'bold',
        letterSpacing: 1,
        position: 'relative',
        textAlign: 'center',
        display: 'table-cell',
        lineHeight: '18px',
        verticalAlign: 'middle',
        width: dvTexto.width(),
        height: dvTexto.height()
      })
      .appendTo(dvTexto);

    if(config.showNumber) {
      var btnTexto = $('<div>')
        .css({
          position: 'relative',
          width: 0,
          height: 0,
          margin: 0,
          top: 0,
          left: 0,
          float: 'left',
          textAlign: 'center',
          fontSize: '34px',
          lineHeight: '35px',
          padding: 5
        })
        .addClass('btn btn-hover')
        .appendTo(boxTexto);
    }

    for (var i = 0; i < botoes.length; i++) {

      edi.objetivos.push(0);
      peca.objetivos.push(0);

      var btns = (i + 1) <= config.QtdNumbTop ? btns1 : btns2;

      if (!!botoes[i].letra) {
        $('<div>')
          .css({
            position: 'relative',
            width: config.larguraBtn,
            height: config.alturaBtn,
            margin: 0,
            marginRight: config.marginBtns,
            fontSize: config.tamanhoFontBtns,
            lineHeight: '35px'
          })
          .attr('data-texto', i)
          .html(botoes[i].letra)
          .addClass('btn btn-default')
          .appendTo(btns);
      } else {
        $('<div>')
          .css({
            position: 'relative',
            width: config.larguraBtn,
            height: config.alturaBtn,
            margin: 0,
            marginRight: config.marginBtns,
            fontSize: config.tamanhoFontBtns,
            lineHeight: '35px'
          })
          .attr('data-texto', i)
          .html(i + 1)
          .addClass('btn btn-default ativo')
          .appendTo(btns);
      }

    }

    $('.btn-default').click(_onClickBtn);

    function _onClickBtn(e) {

      e.stopPropagation();

      var $self = $(this);

      if ($self.hasClass("active")) return;

      $("[data-edi='revela_btn_numero'] .btn-default").removeClass("active");
      
      if(peca.objetivos.length > 0) {
        $("[data-edi='revela_btn_numero'] .btn-default").off();
        $(this).addClass('btn-default-hover').removeClass("ativo").off();
      }

      $self.addClass("active");

      if (!$self.hasClass('check')) {
        edi.objetivos.pop();
        peca.objetivos.pop();

        if (licao.config.WIQUADRO)
          Wiquadro.api.addInteration(edi.interacao.revela, $(this).attr('id'), $(this).attr('id'), 'T');

        if (!!config.tempoPassar || config.tempoPassar !== 0) {
          edi.regressiva(config.tempoPassar + '000', 'para clicar em outro botão!', function () {
            if(peca.objetivos.length > 0){
              $("[data-edi='revela_btn_numero'] .ativo").click(_onClickBtn);
            }
            edi.finalizar();
          });
        } else {
          edi.finalizar();
        }
        $self.addClass("check");

        if (peca.objetivos.length === 0) {
          $("[data-edi='revela_btn_numero'] .check").click(_onClickBtn);
          if (!!callBackFinal) {
            callBackFinal();
          }
        }
      }

      var num = $self.attr('data-texto');

      texto.html(botoes[num].texto);

      if (clickAnterior)
        $(clickAnterior)
          .css({
            cursor: 'pointer'
          })
          .animate({
            opacity: 1
          }, 200);

      $self
        .css({
          cursor: 'default'
        })
        .animate({
          opacity: 0
        }, 200, function () {
          clickAnterior = this;
        });

      boxTexto.css('display', 'inline-block');
      if(btnTexto){
        btnTexto
        .css({
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          fontWeight: 'normal'
        })
        .html($self.html())
        .animate({
          top: -20,
          left: -20,
          width: 35,
          height: 35
        }, 200, function () {
          if (!$('#progress').length)
            $("[data-edi='revela_btn_numero'] .btn-default").click(_onClickBtn);
        });
      }

      if (!!callBack) {
        callBack();
      }

    }

    ARR_TAREFAS[tarefaBtnNumero].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_btn_numero: _init
  };

});
