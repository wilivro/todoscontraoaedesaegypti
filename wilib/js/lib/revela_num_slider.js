define(function (require) {
  var tarefaBtnNumero = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(botoes, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    if (!botoes || botoes.length === 0) {
      ARR_TAREFAS[tarefaBtnNumero].resolve();
      return;
    }

    var peca = this;
    var clickAnterior;
    var index = 0;

    var config = {
      imgWidth: 190,
      imgHeight: 240,
      imgLeft: -35,
      imgTop: 10,
      tamanhoBoxTexto: 400,
      tamanhoFontBtns: 20,
      marginBtns: 5,
      tamanhoFonteTexto: 16,
      padding: 0,
      tempoPassar: 5,
      showNum: true,
      espacoSetas: 388,
      topSetas: 210,
      leftSetas: 165,
      left: 40,
      textAlign: 'center',
      textoGrande: false,
      topGeral: 80,
      leftGeral: 45,
      verticalAlign: 'middle'
    };

    if (settings) {
      $.extend(config, settings);
    }

    var ctn = $("<section>")
      .css({position: 'absolute', top: config.topGeral, left: config.leftGeral})
      .attr('data-edi', 'revela_num_slider')
      .appendTo('#conteudo');


    var container = $('<div>')
      .css({
        position: 'relative',
        textAlign: 'center',
        display: 'table-cell',
        verticalAlign: 'middle',
        width: 740,
        height: 205
      })
      .appendTo(ctn);

    var containerBtns = $('<section>')
      .css({
        position: 'absolute',
        top: config.topSetas,
        height: 100,
        left: config.leftSetas
      })
      .attr('id', 'num_slider')
      .appendTo(ctn);

//        INICIO DOS BOTOES

    var ctBotoes = $('<div>')
      .css({
        position: 'absolute',
        width: 500,
        height: 100,
        textAlign: 'center'
      }).appendTo(containerBtns);

    var ctMenos = $('<div>').css({
      display: 'inline-block',
      position: 'relative',
      textAlign: 'center',
      verticalAlign: 'middle',
      marginRight: -15
    })
      .click(function () {
        $('.btn.active').prev().click();
      })
      .appendTo(ctBotoes);

    var btns = $('<div>')
      .css({
        display: 'inline-block',
        position: 'relative',
        textAlign: 'center',
        verticalAlign: 'middle',
        boder: 'solid 1px red',
        width: config.espacoSetas
      })
      .addClass('btns')
      .appendTo(ctBotoes);


    var ctMais = $('<div>').css({
      display: 'inline-block',
      position: 'relative',
      textAlign: 'center',
      verticalAlign: 'middle'
    })
      .click(function () {
        $('.btn.active').next().click();
      })
      .appendTo(ctBotoes);

    var spanMais = $('<span>')
      .mouseover(function () {
        $(setaMais).css('scale', '1.1');
        $(icoMais).css('scale', '1.1');
      })
      .mouseleave(function () {
        $(setaMais).css('scale', '1');
        $(icoMais).css('scale', '1');
      })
      .appendTo(ctMais);

    var icoMais = $('<i>').css({
      fontSize: 20,
      color: 'rgba(255,255,255,.7)',
      position: 'relative',
      left: -33,
      top: -10
    })
      .addClass('fa fa-plus')
      .appendTo(spanMais);

    var setaMais = $('<i>').css({
      position: 'relative',
      fontSize: 50,
      color: '#9C0',
      textShadow: '1px 1px 1px rgba(0,0,0,.5)'
    })
      .addClass('fa fa-play')
      .appendTo(spanMais);

    var setaMenos = $('<i>').css({
      position: 'relative',
      fontSize: 50,
      color: '#9C0',
      top: '-1px',
      textShadow: '1px -1px 1px rgba(0,0,0,.5)',
      scale: '-1'
    })
      .addClass('fa fa-play')
      .mouseover(function () {
        $(setaMenos).css('scale', '-1.1');
        $(icoMenos).css('scale', '1.1');
      })
      .mouseleave(function () {
        $(setaMenos).css('scale', '-1');
        $(icoMenos).css('scale', '1');
      });

    var icoMenos = $('<i>').css({
      fontSize: 20,
      color: 'rgba(255,255,255,.7)',
      position: 'relative',
      left: -22,
      top: -10
    })
      .mouseover(function () {
        $(setaMenos).css('scale', '-1.1');
        $(icoMenos).css('scale', '1.1');
      })
      .mouseleave(function () {
        $(setaMenos).css('scale', '-1');
        $(icoMenos).css('scale', '1');
      })
      .addClass('fa fa-minus');

    $('<div>').append(setaMais).append(icoMais).appendTo(ctMais);
    $('<div>').append(setaMenos).append(icoMenos).appendTo(ctMenos);

//        FIM DOS BOTOES

    var boxTexto = $('<div>')
      .css({
        position: 'relative',
        width: config.tamanhoBoxTexto,
        height: 150,
        borderRadius: (config.textoGrande) ? 2 : 10,
        border: '1px solid rgb(167, 185, 195)',
        boxShadow: '1px 1px 5px 1px rgba(128,128,128,.3)',
        verticalAlign: 'middle',
        display: 'none',
        padding: '10px 20px',
        top: 5,
        left: config.left
      })
      .appendTo(container);

    var dvTexto = $('<div>')
      .addClass('texto')
      .css({
        position: 'absolute',
        height: boxTexto.height(),
        width: config.tamanhoBoxTexto
      })
      .appendTo(boxTexto);

    if (config.textoGrande)
      dvTexto.slimScroll({
        width: dvTexto.width(),
        height: dvTexto.height(),
        size: 5,
        position: 'right',
        color: '#000',
        alwaysVisible: true,
        distance: 0,
        start: dvTexto,
        railVisible: true,
        railColor: '#000',
        railOpacity: 0.3,
        wheelStep: 10,
        allowPageScroll: false,
        disableFadeOut: false
      });
    containerBtns.css({width: boxTexto.width()});

    var texto = $('<div>')
      .css({
        fontSize: config.tamanhoFonteTexto,
        fontWeight: 'bold',
        letterSpacing: 1,
        padding: config.padding,
        position: 'relative',
        textAlign: config.textAlign,
        display: 'table-cell',
        color: '#666',
        lineHeight: '18px',
        verticalAlign: config.verticalAlign,
        overflow: 'auto',
        width: dvTexto.width(),
        height: dvTexto.height()
      })
      .appendTo(dvTexto);

    for (var i = 0; i < botoes.length; i++) {

      edi.objetivos.push(0);
      peca.objetivos.push(0);

      if (botoes[i].img) {
        $('<div>')
          .css({
            position: 'absolute',
            float: 'left',
            width: config.imgWidth,
            height: config.imgHeight,
            borderRadius: 10,
            border: '7px solid #fff',
            boxShadow: '1px 1px 5px 2px rgba(128,128,128,.5)',
            verticalAlign: 'middle',
            left: config.imgLeft,
            top: config.imgTop,
            backgroundImage: botoes[i].img,
            backgroundSize: '100% 100%',
            display: 'none'
          })
          .addClass('img' + i)
          .appendTo(container);
      }

      if (!!botoes[i].letra) {
        $('<div>')
          .css({
            position: 'relative',
            display: (config.showNum) ? 'inline-block' : 'none',
            width: 25,
            height: 25,
            margin: config.marginBtns,
            fontSize: config.tamanhoFontBtns,
            lineHeight: '25px'
          })
          .attr({
            'data-texto': i,
            'data-index': i,
            id: 'botao' + i
          })
          .html(botoes[i].letra)
          .addClass('btn btn-default')
          .appendTo(btns);
      } else {
        $('<div>')
          .css({
            position: 'relative',
            width: 25,
            display: (config.showNum) ? 'inline-block' : 'none',
            height: 25,
            margin: config.marginBtns,
            fontSize: config.tamanhoFontBtns,
            lineHeight: '25px'
          })
          .attr({
            'data-texto': i,
            'data-index': i,
            id: 'botao' + i
          })
          .html(i + 1)
          .addClass('btn btn-default')
          .appendTo(btns);
      }
    }

    function _onClickBtn(e) {

      if (config.textoGrande) {
        $('.slimScrollBar').animate({top: 0});
        $('.texto').scrollTop(0);
      }

      e.stopPropagation();

      var $self = $(this);

      if ($self.hasClass("active")) return;

      if (!$self.hasClass('ok')) $("[id='num_slider'] .btn-default").removeClass("active").off();

      if (!$self.hasClass('check')) {
        edi.objetivos.pop();
        peca.objetivos.pop();

        if (licao.config.WIQUADRO)
          Wiquadro.api.addInteration(edi.interacao.revela, $self.attr('id'), $(this).attr('id'), 'T');

        edi.regressiva(config.tempoPassar + '000', 'para clicar em outro botão!', function () {
          $("[id='num_slider'] .btn-default").click(_onClickBtn);
          edi.finalizar();
        });
        $self.addClass("check");

        if (peca.objetivos.length === 0) {
          $("[id='num_slider'] .btn-default").click(_onClickBtn);
          if (!!callBackFinal) {
            callBackFinal();
          }
        }
      }

      var num = $self.attr('data-texto');

      texto.html(botoes[num].texto);

      if (clickAnterior)
        $(clickAnterior)
          .removeClass('btn-hover active')
          .addClass('btn-default');
      $('.img' + $(clickAnterior).attr('data-index')).fadeOut();

      $self
        .removeClass('btn-default')
        .addClass('btn-hover active ok');
      clickAnterior = this;

      index = $self.attr('data-index');

      if (index === 0) {
        ctMenos.css({opacity: 0, cursor: 'default'});
      } else {
        ctMenos.css({opacity: 1, cursor: 'pointer'});
      }

      if (index == botoes.length - 1) {
        ctMais.css({opacity: 0, cursor: 'default'});
      } else {
        ctMais.css({opacity: 1, cursor: 'pointer'});
      }

      $('.img' + $(this).attr('data-index')).fadeIn();


      boxTexto.css('display', 'inline-block');
      if (!$('#progress').length)
        $("[id='num_slider'] .btn-default").click(_onClickBtn);

      if (!!callBack) {
        callBack();
      }
    }

    $('.btn-default').click(_onClickBtn);

    ARR_TAREFAS[tarefaBtnNumero].resolve();
    $('#botao0').click();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    telaAtual: edi.util.getURL('quest'),
    revela_num_slider: _init
  };

});
