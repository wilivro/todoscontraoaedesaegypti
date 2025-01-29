define(function (require) {
  var tarefaSlide = addTarefa(),
    edi = require('../lib/edi'),
    _configEDI = null;

  // setando as configurações do edi
  function _setConfig(opt) {
    _configEDI = opt;
  }

  // método principal
  function _init(slides, cb, cbfinal, opt) {
    edi.iniciar(_configEDI);
    var peca = this;

    // configurações
    var config = {
      tempoBloqueia: 1000,
      fontSize: 15,
      textAlign: "center",
      lineHeight: 1,
      color: "#fff"
    };

    $.extend(config, opt);

    if (!slides)
      return console.error('[slides] é um parâmetro obrigatório!');

    // adicionando objetivos
    slides.forEach(function (slide, i) {
      if (i == slides.length - 1)
        return;

      peca.objetivos.push(0);
      edi.objetivos.push(0);
    });

    // container principal
    var $slideHorizontal = $('<div>').attr({
      'id': 'revela_a08',
      'data-edi': 'revela_a08'
    }).appendTo('#conteudo');

    // container dos slides
    var $page = $('<div>')
      .attr('id', 'page')
      .css('width', slides.length * 788)
      .appendTo($slideHorizontal);

    // montando os lides
    slides.forEach(function (slide, i) {
      var $slide = $('<div>')
        .addClass('slide')
        .attr('id', i)
        .appendTo($page);

      // botão retroceder
      var $btnPrev = $('<div>')
        .addClass('button btn-prev');

      // não adiciona o botao no primeiro slide
      if (i !== 0) {
        $btnPrev
          .appendTo($slide)
          .click(handleLeftClick);
      }

      // conteudo do slide
      var $container = $('<div>')
        .addClass('container')
        .appendTo($slide);

      $('<div>')
        .addClass('txt fontErasdust')
        .html(slide)
        .css({
          fontSize: config.fontSize,
          textAlign: config.textAlign,
          lineHeight: config.lineHeight,
          color: config.color
        }).appendTo($container);

      // botao avançar
      var $btnNext = $('<div>')
        .addClass('button btn-next');

      // não adiciona botao 'prox' ao ultimo slide
      if (i !== (slides.length - 1)) {
        $btnNext
          .appendTo($slide)
          .click(handleRightClick);
      }
    });

    function handleLeftClick() {
      $page.animate({left: '+=778px'}, 1);
    }

    function handleRightClick() {
      var $self = $(this),
        $_slide = $self.closest('.slide');

      $page.animate({left: '-=778px'}, 1);

      $('.btn-prev, .btn-next').off();

      edi.regressiva(config.tempoBloqueia, 'para clicar no próximo botao!', function () {

        // condição para não chamar o edi.finalizar
        // mais de uma vêz no mesmo botao
        if (!$_slide.hasClass('show')) {
          $_slide.addClass('show');

          peca.objetivos.unshift(1);
          edi.objetivos.unshift(1);

          peca.objetivos.pop();
          edi.objetivos.pop();

          edi.finalizar();

          // chamando callback
          if (cb)
            cb();

          // chamando callback final
          if ($('.show').length === peca.objetivos.length) {
            cbfinal();
            config.tempoBloqueia = 0;
          }

        }

        $('.btn-prev').click(handleLeftClick);
        $('.btn-next').click(handleRightClick);
      }, {posx: 330, posy: 330});
    }

    ARR_TAREFAS[tarefaSlide].resolve();

    return {
      objetivos: peca.objetivos,
      finalizar: edi.finalizar()
    };
  } //

  return {
    objetivos: [],
    regressiva: edi.regressiva,
    setConfig: _setConfig,
    revela_a08: _init
  };
});
