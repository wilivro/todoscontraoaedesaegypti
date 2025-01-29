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
      tempoBloqueia: 1000
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
      'id': 'slide-horizontal',
      'data-edi': 'slide-horizontal'
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
        .addClass('button btn-prev')
        .css({cursor: 'pointer'})
        .html('<i class="fa fa-chevron-left">');

      // não adiciona o botao no primeiro slide
      if (i !== 0) {
        $btnPrev
          .appendTo($slide)
          .click(handleLeftClick);
      }

      // conteudo do slide
      var $container = $('<div>')
        .addClass('container')
        .html(slide)
        .appendTo($slide);

      // botao avançar
      var $btnNext = $('<div>')
        .addClass('button btn-next')
        .css({cursor: 'pointer'})
        .html('<i class="fa fa-chevron-right">');

      // não adiciona botao 'prox' ao ultimo slide
      if (i !== (slides.length - 1)) {
        $btnNext
          .appendTo($slide)
          .click(handleRightClick);
      }
    });

    function handleLeftClick() {
      var $self = $(this);
      $page.animate({left: '+=778px'});
    }

    function handleRightClick() {
      var $self = $(this),
        $_slide = $self.closest('.slide');

      $page.animate({left: '-=778px'});

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

          edi.finalizar({mostrarResultado: false});

          // chamando callback
          if (cb)
            cb();

          // chamando callback final
          if ($('.show').length === peca.objetivos.length)
            if(!!cbfinal)cbfinal();

        }
        $('.btn-prev').click(handleLeftClick);
        $('.btn-next').click(handleRightClick);
      });
    }

    ARR_TAREFAS[tarefaSlide].resolve();

    return {
      objetivos: peca.objetivos,
      finalizar: edi.finalizar({mostrarResultado: false})
    };
  } //

  return {
    objetivos: [],
    regressiva: edi.regressiva,
    setConfig: _setConfig,
    slide_horizontal: _init
  };
});
