define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  var revelaMod = require('../lib/revela');//requisitando Revela


  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(frase, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var config = {
      top: 68,
      left: 10,
      bloqueiaClickFinal: true,
      tempoBloqueio: 1000,
      width: 700,
      height: 315,
      alturaFrase: 100,//use 'auto' caso não tenha borda
      larguraFrase: 300,
      fontSize: 14,
      lineHeight: '',
      textAlign: 'left',
      paddingLeftTxt: 20,
      borda: '2px solid #999',
      posx: 498,
      posy: 250
    };

    if (settings) {
      $.extend(config, settings);
    }

    var $containerGeral = $('<section>')
      .attr('id', 'containerGeral')
      .css({
        position: 'absolute',
        top: config.top,
        left: config.left,
        width: config.width,
        height: config.height
      })
      .appendTo('#conteudo');

    for (var i = 0; i < frase.length; i++) {

      var $containerFrase = $('<div>')
        .attr('id', 'containerFrase' + i)
        .css({
          position: 'relative',
          height: 100 / frase.length + '%'
        })
        .appendTo($containerGeral);

      var $containerBtn = $('<div>')
        .attr('id', 'containerBtn' + i)
        .css({
          position: 'relative',
          display: 'block',
          height: '100%'
        })
        .appendTo($containerFrase);

      var $dv_centralizaBotoes = $('<div>')
        .css({
          position: 'relative',
          display: 'table-cell',
          height: $containerBtn.height(),
          verticalAlign: 'middle'
        })
        .appendTo($containerBtn);


      var $botoes = $('<div>')
        .addClass('animacao')
        .attr('id', 'botao' + i)
        .css({
          position: 'relative',
          width: '100px',

          verticalAlign: 'middle'

        })
        .appendTo($dv_centralizaBotoes);

      var $dv_seta = $('<div>')
        .attr('id', 'seta' + i)
        .attr('data-revela', i)
        .addClass('clique')
        .css({
          width: '40px',
          height: '25px',
          cursor: 'pointer'
        })
        .appendTo($botoes);


      $('<div>')
        .addClass('trianguloSombra')
        .css({
          'float': 'right',
          'margin-left': '-21px',
          'margin-top': '-2px',
          'border-color': 'transparent transparent transparent #ccc',
          'border-width': '13px',
          'border-style': 'solid'
        })
        .appendTo($dv_seta);
      var triangulo = $('<div>')
        .addClass('triangulo')
        .css({
          'float': 'right',
          'margin-left': '-21px',
          'margin-top': '1px',
          'border-color': ' transparent transparent transparent #FF9933',
          'border-width': '10px',
          'border-style': 'solid'
        })
        .appendTo($dv_seta);

      $('<div>')
        .addClass('retangulo')
        .css({
          'float': 'left',
          'border-top': '1px solid #ccc',
          'border-bottom': '1px solid #ccc',
          'border-left': '1px solid #ccc',
          'background-color': '#FF9933',
          'width': '14px',
          'margin-top': '6px',
          'height': '8px'
        })
        .appendTo($dv_seta);

      $dv_seta.click(addAnimacao);


      var $dv_centralizaCotnainerFrase = $('<div>')
        .css({
          position: 'relative',
          display: 'table-cell',
          verticalAlign: 'middle'
        })
        .attr('data-revela', i)
        .addClass('revela')
        .appendTo($containerBtn);

      var $ficaFrase = $('<div>')
        .addClass('arredondado')
        .css({
          position: 'relative',
          width: config.larguraFrase,
          height: config.alturaFrase,
          verticalAlign: 'middle',
          border: config.borda

        })
        .appendTo($dv_centralizaCotnainerFrase);

      $('<div>')
        .attr('id', 'frase' + i)
        .css({
          position: 'relative',
          width: $ficaFrase.width(),
          height: $ficaFrase.height(),
          fontSize: config.fontSize,
          lineHeight: config.lineHeight,
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: config.textAlign,
          paddingLeft: config.paddingLeftTxt
        })
        .html(frase[i])
        .appendTo($ficaFrase);
    }

    function addAnimacaoNoDiv() {
      $('.clique').click(addAnimacao);
    }

    function addAnimacao() {

      $(this).transition({
        width: '90px'
      }, config.tempoBloqueio);

      $(this).find('.retangulo').transition({
        width: '64px',
        backgroundColor: '#9c0'
      }, config.tempoBloqueio);

      $(this).find('.triangulo').transition({
        'border-color': ' transparent transparent transparent #9c0'
      }, config.tempoBloqueio);
    }


    revelaMod.revela('clique', 'revela', callback, callbackFinal, {
      piscar: false,
      tempoBloqueio: config.tempoBloqueio,
      posx: config.posx,
      posy: config.posy
    }, addAnimacaoNoDiv);

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_seta: _init
  };

});