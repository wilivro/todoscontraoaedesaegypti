define(function (require) {
  var modulo = {};

  modulo._edi = require('../lib/edi');
  modulo._config = null;
  modulo._tarefa = addTarefa();

  // setando configurações do edi
  modulo.setConfig = function (config) {
    modulo._config = config;
  };

  // iniciando tudo
  modulo.init = function (itens, img, texto, config, cb, cbfinal) {

    if (!itens) {
      throw '[itens] é um parâmetro obrigatório!';
    }

    var peca = this;

    // iniciando o EDI
    modulo._edi.iniciar(modulo._config);

    // configurações default da peça
    peca.config = {
      left: 100,
      top: 100,
      width: 100,
      height: 100
    };

    // mesclando configurações da peça
    $.extend(peca.config, config);

    // montando estrutura HTML
    peca.container = $('<div>')
      .attr('id', 'revela_f01')
      .appendTo('#conteudo');


    // img da peça
    if (img) {
      peca.img = $('<img>')
        .addClass('img')
        .attr('src', img)
        .appendTo(peca.container);
    }

    // container dos btns
    peca.boxBtns = $('<div>')
      .addClass('boxBtns')
      .appendTo(peca.container);

    // texto da peça
    if (texto) {
      peca.texto = $('<div>')
        .addClass('texto')
        .html(texto)
        .appendTo(peca.boxBtns);
    }

    // container dos botoes
    peca.btns = $('<div>')
      .addClass('btns')
      .appendTo(peca.boxBtns);

    itens.forEach(function (data, i) {

      var item = $('<div>')
        .addClass('item')
        .appendTo(peca.btns);

      $('<div>')
        .addClass('_btn')
        .html(i + 1)
        .attr('data-correta', i)
        .appendTo(item)
        .click(handleClick);

      $('<div>')
        .addClass('_rev')
        .html($('<p>').html(data))
        .attr('data-correta', i)
        .appendTo(item);

      modulo._edi.objetivos.push(0);

    });

    function handleClick() {
      $(this).off();

      $('[data-correta="' + $(this).attr('data-correta') + '"]')
        .fadeIn().css('display', 'table');

      modulo._edi.objetivos.pop();
      modulo._edi.finalizar();

      if (modulo._edi.objetivos.length === 0 && cbfinal) {
        cbfinal();
      }

    }

    // removendo a tela de loading
    ARR_TAREFAS[modulo._tarefa].resolve();

  };

  return {
    objetivos: [], // objetivos
    setConfig: modulo.setConfig, // configurações do EDI
    iniciar: modulo.init // método construtor da peça
  };

});
