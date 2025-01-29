define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('./edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(btnRevela, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this;

    var config = {
      width: 788,
      larguraRetalgulo: 245,
      alturaRetangulo: 122,
      fontSize: '14px',
      marginLeft: 3,
      marginRight: 3,
      marginBottom: 20,
      marginTop: 10,
      borderRadius: 15,
      marginRightBola: 195,
      marginBottomBola: 85,
      posxBtns: 30,
      posyBtns: 101,
      widthConteinerBtn: 930,
      left: 0,
      height: 'auto',
      textAlign: ''
    };

    if (settings) {
      $.extend(config, settings);
    }

    var sc_quadro = $('<section>')
      .attr('id', 'sc_quadro')
      .css({
        position: 'absolute',
        width: config.width,
        height: config.height,
        top: ((383 - config.height) / 2) + 40,
        left: ((788 - config.width) / 2) + config.left,
        textAlign: 'center'
      })
      .appendTo('#conteudo');

    var sc_btn = $('<section>')
      .attr('id', 'sc_btn')
      .css({
        position: 'absolute',
        width: config.widthConteinerBtn,
        height: config.height,
        top: config.posyBtns,
        left: config.posxBtns,
        textAlign: config.textAlign,
        zIndex: 1
      })
      .appendTo('#conteudo');

    function mouseOver() {
      $(this).removeClass('loadingR')
        .css({
          '-webkit-animation': 'loadingR linear 1.5s paused',
          '-moz-animation': 'loadingR linear 1.5s paused',
          '-ms-animation': 'loadingR linear 1.5s paused',
          'animation': 'loadingR linear 1.5s paused',
          backgroundImage: 'url(../wilib/img/svg/asterisco_amarelo.svg)'
        });
    }

    function mouseOut() {
      $(this).addClass('loadingR')
        .css({
          '-webkit-animation': 'loadingR linear 1.5 running',
          '-moz-animation': 'loadingR linear 1.5 running',
          '-ms-animation': 'loadingR linear 1.5 running',
          'animation': 'loadingR linear 1.5 running',
          backgroundImage: 'url(../wilib/img/svg/asterisco.svg)'
        });
    }

    var clique = function () {
      var _this = $(this);
      var revelado = $('#retangulo' + _this.attr('data-revela'));
      _this.css('cursor', 'default');
      _this.off();

      peca.objetivos.pop();
      edi.objetivos.pop();
      edi.objetivos.unshift(1);

      if (!!callback) callback($(this));

      if (!!licao.config.WIQUADRO)
        Wiquadro.api.addInteration(1, revelado.attr('id'), _this.attr('id'), true);

      if (peca.objetivos.length === 0) {
        edi.finalizar();
        if (callbackFinal) callbackFinal(self);
      }

      $(this).removeClass('loadingR')
        .css({
          '-webkit-animation': 'loadingR linear 1.5s paused',
          '-moz-animation': 'loadingR linear 1.5s paused',
          '-ms-animation': 'loadingR linear 1.5s paused',
          'animation': 'loadingR linear 1.5s paused',
          backgroundImage: 'url(../wilib/img/svg/asterisco_amarelo.svg)'
        });

      revelado.animate({
        height: config.alturaRetangulo + 4,
        overflow: 'initial'
      }, 300);

    };

    for (var i = 0; i < btnRevela.length; i++) {

      peca.objetivos.push(0);
      edi.objetivos.push(0);

      var dv_QuadroTexto = $('<div>')
        .attr('id', 'retangulo' + i)
        .addClass('retangulo')
        .css({
          position: 'relative',
          display: 'inline-block',
          marginLeft: config.marginLeft,
          marginRight: config.marginRight,
          marginBottom: config.marginBottom,
          marginTop: config.marginTop,
          borderRadius: config.borderRadius,
          boxShadow: 'rgba(0, 0, 0, 0.8) 0px 1px 3px'
        })
        .appendTo(sc_quadro);

      var dv_FicaTexto = $('<div>')
        .attr('id', 'retangulo' + i)
        .css({
          position: 'relative',
          display: 'inline-block',
          borderRadius: config.borderRadius
        })
        .appendTo(dv_QuadroTexto);

      var dv_FicaBtn = $('<div>')
        .attr('id', 'bola' + i)
        .css({
          position: 'relative',
          display: 'inline-block',
          marginRight: config.marginRightBola,
          marginBottom: config.marginBottomBola,
          marginTop: config.marginTop
        })
        .appendTo(sc_btn);

      $('<div>')
        .attr('id', 'texto' + i)
        .addClass('bold')
        .css({
          position: 'relative',
          width: config.larguraRetalgulo - 80,
          height: config.alturaRetangulo,
          fontSize: config.fontSize,
          color: '#666',
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center',
          paddingLeft: '80px'

        })
        .html('<span class="revela" data-revela="' + i + '">' + btnRevela[i].texto + '</span>')
        .appendTo(dv_FicaTexto);

      $('<div>')
        .attr({
          'id': 'btn_' + i,
          'data-revela': i
        })
        .addClass('loadingR')
        .css({
          position: 'relative',
          top: 0,
          width: 60,
          height: 60,
          borderRadius: '50%',
          cursor: 'pointer',
          '-webkit-animation': 'loadingR linear 1.5s infinite',
          '-moz-animation': 'loadingR linear 1.5s infinite',
          '-ms-animation': 'loadingR linear 1.5s infinite',
          'animation': 'loadingR linear 1.5s infinite'
        })
        .click(clique)
        .on('mouseover', mouseOver)
        .on('mouseout', mouseOut)
        .css('background-image', 'url(../wilib/img/svg/asterisco.svg)')
        .css('background-size', '100%')
        .appendTo(dv_FicaBtn);
      console.log(peca.objetivos);
    }

    var retangulosTop = [];
    var retangulosLeft = [];

    var $retangulo = $(".retangulo");
    var $principal = $('#principal');

    $retangulo.each(function (a) {
      var $quadros = $(this);
      retangulosTop[a] = $quadros.offset().top - $principal.offset().top - 12;
      retangulosLeft[a] = $quadros.offset().left - $principal.offset().left - 5;

    });

    $retangulo.each(function (a) {
      var $quadros = $(this);
      $quadros
        .css({
          position: 'absolute',
          top: retangulosTop[a],
          left: retangulosLeft[a],
          overflow: 'hidden',
          height: 0
        }).appendTo('#principal');
    });

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_roletinha: _init
  };

});
