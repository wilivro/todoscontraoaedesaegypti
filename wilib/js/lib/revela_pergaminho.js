define(function (require) {
  var tarefaPergaminho = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(rev, cb, cbfinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var peca = this;

    var config = {
      width: 120,
      height: 100,
      left: 155,
      top: 140,
      margin: 20,
      textAlign: 'center',
      fontSize: 14,
      fontColor: '#888',
      textoMarginTop: 0,
      tempoBloqueio: 1000,
      pergaminhoTopCSS: null,
      pergaminhoBottomCSS: null,
      pergaminhoBodyCSS: null
    };

    if (settings) {
      $.extend(config, settings);
    }

    for (var i in rev) {
      peca.objetivos.push(0);
      edi.objetivos.push(0);
    }

    var $revPergaminho = $('<section>')
      .addClass('rev-pergaminho')
      .attr('data-edi', 'revela-pergaminho')
      .css({
        left: config.left,
        top: config.top,
        position: 'absolute'
      }).appendTo('#conteudo');


    for (i in rev) {
      if (rev.hasOwnProperty(i)) {
        var $pergaminho = $('<div>')
          .addClass('rev-per')
          .attr({
            'id': 'rev-per-' + i
          })
          .css({
            width: config.width,
            margin: config.margin,
            textAlign: config.textAlign,
            fontSize: config.fontSize,
            color: config.fontColor
          })
          .appendTo($revPergaminho)
          .mouseenter(mouseEnter)
          .mouseleave(mouseLeave)
          .click(click);

        var $pergaminhoTop = $('<img>')
          .attr('src', '../wilib/img/svg/pergaminho_top.svg')
          .addClass('rev-per-top')
          .css('width', config.width + 20)
          .appendTo($pergaminho);

        if (config.pergaminhoTopCSS)
          $pergaminhoTop.css(config.pergaminhoTopCSS);

        var $pergaminhoBody = $('<div>')
          .css({
            position: 'relative',
            display: 'table-cell',
            verticalAlign: 'middle'
          })
          .addClass('rev-per-body')
          .html('<p style="margin-top: ' + config.textoMarginTop + 'px; display: none">' + rev[i] + '</p>')
          .appendTo($pergaminho);

        if (config.pergaminhoBodyCSS)
          $pergaminhoBody.css(config.pergaminhoBodyCSS);

        var $pergaminhoBottom = $('<img>')
          .attr('src', '../wilib/img/svg/pergaminho_bottom.svg')
          .addClass('rev-per-bottom')
          .css('width', config.width + 26)
          .appendTo($pergaminho);

        if (config.pergaminhoBottomCSS)
          $pergaminhoBottom.css(config.pergaminhoBottomCSS);
      }
    }

    function mouseEnter() {
      if (!$(this).hasClass('open')) $(this).css('opacity', 0.8);
    }

    function mouseLeave() {
      $(this).css('opacity', 1);
    }

    function click() {

      var self = $(this);

      self.addClass('open');

      self.find('.rev-per-body').animate({
        height: config.height - 2
      }, 500, function () {
        $(this).find('p').fadeIn();
        $(this).parent().css('opacity', 1);
      });

      peca.objetivos.pop();
      edi.objetivos.pop();

      edi.finalizar();

      $('.rev-per').off('click');

      if (peca.objetivos.length !== 0) {
        edi.regressiva(config.tempoBloqueio, 'para clicar em outro botão', function () {
          $('.rev-per').click(click);
          self.off();
          $('.rev-per.open').off('click');
        });
      }

      if (cb) cb(self);

      if (peca.objetivos.length === 0 && cbfinal) cbfinal(self);
    }

    ARR_TAREFAS[tarefaPergaminho].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_pergaminho: _init
  };

});
