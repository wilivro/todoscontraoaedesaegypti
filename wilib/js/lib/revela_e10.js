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

  function _init(revelas, callback, settings) {

    edi.iniciar(_configEDI);//montar o palco

    var peca = this;
    var tamanho = 0;

    var config = {
      left: 10,
      top: 98
    };

    if (settings) {
      $.extend(config, settings);
    }

    var sc_conteudo = $('<section>')
      .css({
        position: 'absolute',
        left: config.left,
        top: config.top
      })
      .appendTo('#conteudo');

    var revela = function (_this) {
      $('.' + $(_this).data('revela')).fadeIn();
      if (!$('#final').length)
        edi.finalizar(null, null, callback);
    };

    var animacao = function () {
      var _this = $(this);

      var $elemento = $('#' + $(this).data('barra'));

      edi.objetivos.pop();
      peca.objetivos.pop();

      _this.off();

      $elemento.animate({
        height: $elemento.attr('data-animacao')

      }, 1000, function () {
        if (tamanho == 1)
          revela(_this);
        $('#' + $(_this).data('barra')).find('div').animate({
          left: '-25px',
          width: '60px'
        }, 1000, function () {
          revela(_this);
        });
      });
    };


    for (var i = 0; i < revelas.length; i++) {

      tamanho = revelas[i].frases.length;

      edi.objetivos.push(0);
      peca.objetivos.push(0);

      var sc_botoes = $('<section>')
        .css({
          position: 'relative',
          width: 316,
          height: 258,
          display: 'inline-block',
          marginLeft: 5,
          textAlign: 'center'
        })
        .appendTo(sc_conteudo);

      var dv_recebeTudo = $('<div>')
        .css({
          position: 'absolute',
          width: sc_botoes.width(),
          height: sc_botoes.height()
        })
        .appendTo(sc_botoes);

      var sc_ficaFrases = $('<section>')
        .addClass('revela' + i)
        .css({
          position: 'absolute',
          width: 316,
          top: 69,
          display: 'none'
        })
        .appendTo(dv_recebeTudo);

      var dv_centralizaHorizontal = $('<div>')
        .css({
          position: 'relative',
          display: 'inline-block'
        })
        .appendTo(dv_recebeTudo);


      $('<div>')
        .addClass('btn')
        .attr('data-barra', 'barraVertical' + i)
        .attr('data-revela', 'revela' + i)
        .click(animacao)
        .css({
          position: 'relative',
          width: 188,
          height: 47,
          display: 'table-cell',
          verticalAlign: 'middle',
          backgroundColor: '#8DA8B9',
          zIndex: 2
        })
        .html(revelas[i].titulo)
        .appendTo(dv_centralizaHorizontal);

      var dv_barraVertical = $('<div>')
        .attr('id', 'barraVertical' + i)
        .attr('data-animacao', (65 * (tamanho / 2)) - 16)
        .css({
          position: 'relative',
          display: 'inline-block',
          width: 10,
          backgroundColor: '#99CC00',
          zIndex: 1

        })
        .appendTo(dv_centralizaHorizontal);


      for (var j = 0; j < tamanho; j++) {

        if (j < tamanho / 2 && tamanho % 2 === 0)
          $('<div>')
            .css({
              position: 'absolute',
              width: 0,
              height: 10,
              top: (65 * j) + 39,
              left: 5,
              backgroundColor: '#99CC00',
              zIndex: -1

            })
            .appendTo(dv_barraVertical);
        else if (j < (tamanho - 1) / 2)
          $('<div>')
            .css({
              position: 'absolute',
              width: 0,
              height: 10,
              top: (65 * j) + 39,
              left: 5,
              backgroundColor: '#99CC00',
              zIndex: -1
            })
            .appendTo(dv_barraVertical);

        var margem = 0;

        if (j != tamanho - 1 || tamanho % 2 === 0)
          margem = (j % 2 === 0) ? 60 : 0;

        console.log(j);

        var dv_ficaFrase = $('<div>')
          .css({
            position: 'relative',
            width: 124,
            height: 54,
            marginRight: margem,
            marginBottom: 6,
            border: '1px solid #8CA8B8',
            borderRadius: 15,
            display: 'inline-block',
            boxShadow: '2px 2px 3px rgba(0,0,0,0.5)',
            backgroundColor: '#FFF',
            zIndex: 3
          })
          .appendTo(sc_ficaFrases);

        $('<div>')
          .css({
            position: 'relative',
            width: dv_ficaFrase.width(),
            height: dv_ficaFrase.height(),
            display: 'table-cell',
            verticalAlign: 'middle'
          })
          .html(revelas[i].frases[j])
          .appendTo(dv_ficaFrase);
      }
    }

    ARR_TAREFAS[tarefaRevela].resolve(config.cb);
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    telaAtual: _telaAtual,
    revela_e10: _init
  };

});
