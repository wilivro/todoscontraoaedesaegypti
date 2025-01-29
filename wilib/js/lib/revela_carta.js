define(function (require) {
  var tarefa = addTarefa(),
    edi = require('./edi'),
    _configEDI = null;

  function _setConfig(config) {
    _configEDI = config;
  }

  function _init(cartas, opt) {
    edi.iniciar(_configEDI);
    var peca = this, config, index = 0, arrayCartas = [];

    config = {
      left: 0, //posicionamento horizontal da div .cartas
      top: 0, //posicionamento vertical da div .cartas
      width: 88, //largura da carta
      height: 110, //altura da carta
      random: true //cartas aleatorias?
    };

    $.extend(config, opt);

    // criando container principal
    var $revelaCarta = $('<section>').attr({
      'id': 'revela-carta',
      'data-edi': 'revela-carta'
    }).appendTo('#conteudo');

    var $cartas = $('<div>')
      .addClass('cartas')
      .css({
        left: config.left,
        top: config.top
      }).appendTo($revelaCarta);

    // adicioando objetivos e montando as cartas
    cartas.forEach(function (carta, i) {
      peca.objetivos.push(0);
      edi.objetivos.push(0);

      var $carta = $('<div>')
        .attr('id', i)
        .addClass('carta')
        .html(carta)
        .css({
          width: config.width,
          height: config.height
        });

      arrayCartas.push($carta);
    });

    if (config.random) {
      arrayCartas.sort(function () {
        return 5 - Math.random();
      });
    }

    arrayCartas.forEach(function (data) {
      $(data).appendTo($cartas);
    });

    $('.carta#0')
      .addClass('piscar')
      .click(handleClick);

    function handleClick() {
      var $self = $(this);

      $self.css({
        border: '8px solid #99CC00',
        background: 'none'
      });

      $self.find('*')
        .addClass('revelada')
        .fadeIn();

      $('.carta')
        .removeClass('piscar')
        .off('click');

      index++;

      $('.carta' + ('#' + index))
        .addClass('piscar')
        .click(handleClick);

      console.log(index);

      // decrementando objetivos
      peca.objetivos.pop();
      peca.objetivos.unshift(1);
      edi.objetivos.pop();
      edi.objetivos.unshift(1);
      edi.finalizar();
    }

    // removendo a tela de loading
    ARR_TAREFAS[tarefa].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_carta: _init
  };
});
