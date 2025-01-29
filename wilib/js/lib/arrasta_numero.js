define(function(require) {
  var tarefaarrasta_numero = addTarefa();

  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  var arrastaMod = require('../lib/arrasta');

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(alternativas, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco
    var peca = this;

    //atribuindo dataCorreta às alternativas
    alternativas.forEach(function(obj, i) {
      obj.dataCorreta = i + 1;
    });

    var config = {
      embaralhar: true,
      arrastaConfig: {
        width: 260,
        height: 47,
        left: 10,
        top: 10,
        tamanhoArrasta: 30,
        numeroLineHeight: 1.7,
        fontSize: 13,
        textAlign: 'center'
      },
      alvoConfig: {
        width: 320,
        height: 47,
        fontSize: 12,
        left: 445,
        top: 10,
        textAlign: 'center'
      },
      reloadCorreta: false
    };

    if (settings) {
      $.extend(config, settings);
    }

    var $arrasta = $('<section>')
      .addClass('arrasta_numero')
      .css({
        width: '100%',
        height: 315,
        position: 'absolute'
      })
      .attr('data-edi', 'arrasta_numero')
      .appendTo('#conteudo');

    var $arrastaConteudo = $('<div>')
      .addClass('arrastaConteudo')
      .css({
        position: 'absolute',
        left: config.arrastaConfig.left,
        top: config.arrastaConfig.top,
        background: 'linear-gradient(to bottom, #fff, #eee)',
        padding: 5,
        display: 'table',
        borderRadius: 5,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)'
      })
      .appendTo($arrasta);

    var $alvoConteudo = $('<div>')
      .addClass('alvoConteudo')
      .css({
        position: 'absolute',
        left: config.alvoConfig.left,
        top: config.alvoConfig.top,
        background: 'linear-gradient(to bottom, #fff, #eee)',
        padding: 5,
        display: 'table',
        borderRadius: 5,
        boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)'
      })
      .appendTo($arrasta);

    //embaralhando array
    function embaralhar(arr) {
      var indexAtual = arr.length,
        valorTemporaio, indexAleatorio;

      while (0 !== indexAtual) {
        indexAleatorio = Math.floor(Math.random() * indexAtual);
        indexAtual -= 1;

        valorTemporaio = arr[indexAtual];
        arr[indexAtual] = arr[indexAleatorio];
        arr[indexAleatorio] = valorTemporaio;
      }

      return arr;
    }

    var alter = alternativas;

    if (config.embaralhar) alter = embaralhar(alternativas);

    alter.forEach(function(obj, i) {

      var $item = $('<div>')
        .addClass('item')
        .css({
          width: config.arrastaConfig.width,
          height: config.arrastaConfig.height,
          position: 'relative'
        })
        .attr({
          'data-index': i + 1,
          'id': 'arrasta' + (i + 1),
        })
        .appendTo($arrastaConteudo);

      var $arr = $('<div>')
        .addClass('arrasta')
        .css({
          width: config.arrastaConfig.tamanhoArrasta,
          height: config.arrastaConfig.tamanhoArrasta,
          fontSize: 0.6 * config.arrastaConfig.tamanhoArrasta,
          color: '#fff',
          position: 'absolute',
          top: (config.arrastaConfig.height / 2) - (config.arrastaConfig.tamanhoArrasta / 2) - 6,
          fontWeight: 'bold',
          lineHeight: config.arrastaConfig.numeroLineHeight,
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #85929C, #516472)',
          borderRadius: '50%',
          border: '4px solid #fff',
          boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3),' +
            'inset 0 0 3px rgba(0, 0, 0, 0.3),' +
            'inset 0 10px 1px 1px  rgba(255, 255, 255, 0.1)',
          cursor: 'pointer'
        })
        .html(i + 1)
        .attr({
          'data-index': i + 1,
          'data-correta': obj.dataCorreta
        })
        .appendTo($item)
        .mouseenter(function() {
          $(this).css({
            background: 'linear-gradient(to bottom, #BDDD5D, #7CB432)',
            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3),' +
              'inset 0 0 3px rgba(0, 0, 0, 0.3),' +
              'inset 0 10px 1px 1px  rgba(255, 255, 255, 0.2)',
          });
        })
        .mouseout(function() {
          $(this).css({
            background: 'linear-gradient(to bottom, #85929C, #516472)',
            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3),' +
              'inset 0 0 3px rgba(0, 0, 0, 0.3)' +
              'inset 0 10px 1px 1px  rgba(255, 255, 255, 0.1)',
          });
        });

      var $arrTexto = $('<div>')
        .addClass('texto')
        .attr('data-index', i + 1)
        .css({
          width: config.arrastaConfig.width - config.arrastaConfig.tamanhoArrasta - 15,
          height: config.arrastaConfig.height,
          position: 'absolute',
          left: config.arrastaConfig.tamanhoArrasta + 15,
        })
        .appendTo($item);

      var t = $('<div>')
        .css({
          width: '100%',
          textAlign: config.arrastaConfig.textAlign,
          fontSize: config.arrastaConfig.fontSize,
          textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
        })
        .html(alter[i].arrasta)
        .appendTo($arrTexto);

      t.css('margin-top', (config.arrastaConfig.height / 2) - (t.height() / 2));
    });

    //embaralhando novamente
    alter = embaralhar(alter);

    alter.forEach(function(obj, i) {
      //alvos
      var $item = $('<div>')
        .addClass('item')
        .attr('data-index', i + 1)
        .css({
          width: config.alvoConfig.width,
          height: config.alvoConfig.height,
          position: 'relative'
        })
        .appendTo('.alvoConteudo');

      var $arr = $('<div>')
        .addClass('alvo')
        .attr({
          'data-index': i + 1,
          'data-correta': obj.dataCorreta
        })
        .css({
          width: config.arrastaConfig.tamanhoArrasta + 8,
          height: config.arrastaConfig.tamanhoArrasta + 8,
          position: 'absolute',
          top: (config.arrastaConfig.height / 2) - (config.arrastaConfig.tamanhoArrasta / 2) - 6,
          background: 'linear-gradient(to bottom, #fff, #eee)',
          borderRadius: '50%',
          boxShadow: 'inset 1px 1px 3px rgba(0, 0, 0, 0.3)',
        })
        .appendTo($item);

      var $arrTexto = $('<div>')
        .addClass('texto')
        .css({
          width: config.alvoConfig.width - config.arrastaConfig.tamanhoArrasta - 15,
          height: config.alvoConfig.height,
          position: 'absolute',
          left: config.arrastaConfig.tamanhoArrasta + 15,
        })
        .attr('data-index', i + 1)
        .appendTo($item);

      var t = $('<div>')
        .css({
          width: '100%',
          textAlign: config.alvoConfig.textAlign,
          fontSize: config.alvoConfig.fontSize,
          textShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
        })
        .html(alter[i].alvo)
        .appendTo($arrTexto);

      t.css('margin-top', (config.arrastaConfig.height / 2) - (t.height() / 2));
    });

    function adicionando(b) {

      var $arr = $('<div>')
        .addClass('_arrasta')
        .css({
          width: config.arrastaConfig.tamanhoArrasta,
          height: config.arrastaConfig.tamanhoArrasta,
          fontSize: 0.6 * config.arrastaConfig.tamanhoArrasta,
          color: '#fff',
          position: 'absolute',
          top: (config.arrastaConfig.height / 2) - (config.arrastaConfig.tamanhoArrasta / 2) - 6,
          fontWeight: 'bold',
          lineHeight: config.arrastaConfig.numeroLineHeight,
          textAlign: 'center',
          background: 'linear-gradient(to bottom, #BDDD5D, #7CB432)',
          boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3),' +
            'inset 0 0 3px rgba(0, 0, 0, 0.3),' +
            'inset 0 10px 1px 1px  rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          border: '4px solid #fff',
          cursor: 'pointer',
          display: 'none'
        })
        .html(b.attr("data-index"))
        .appendTo('#arrasta' + b.attr("data-index"))
        .fadeIn();
    }



    //chamando o arrasta
    arrastaMod.arrasta('arrasta', 'alvo', function(a, b, c) { //a: se acertou //b: arrasta //c: alvo
      c.unbind();

      //definindo background nos arrastas
      if (a) {
        $(b)
          .off()
          .css({
            background: 'linear-gradient(to bottom, #72BAE2, #1C8FD0)',
            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3),' +
              'inset 0 0 3px rgba(0, 0, 0, 0.3),' +
              'inset 0 10px 1px 1px  rgba(255, 255, 255, 0.1)',
          });
      } else {
        $(b)
          .off()
          .css({
            background: 'linear-gradient(to bottom, #E3727A, #D31826)',
            boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3),' +
              'inset 0 0 3px rgba(0, 0, 0, 0.3),' +
              'inset 0 10px 1px 1px  rgba(255, 255, 255, 0.1)',
          });
      }

      //adicionando elemento ao item
      adicionando(b);

      if (callBack) callBack(a);
    }, function(a) {
      if (callBackFinal) callBackFinal(a);
    }, {
      reloadCorreta: config.reloadCorreta
    });

    if (config.reloadCorreta) {

      var temp = edi.util.getURL('acertos');

      if (temp !== null) {

        var acertos = temp.split(',');

        for (var i = 0; i < acertos.length; i++) {

          var self = $('[data-id="' + acertos[i] + '"]');

          self
            .off()
            .css({
              background: 'linear-gradient(to bottom, #72BAE2, #1C8FD0)',
              boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.3),' +
                'inset 0 0 3px rgba(0, 0, 0, 0.3),' +
                'inset 0 10px 1px 1px  rgba(255, 255, 255, 0.1)',
            });

          adicionando(self);

        }
      }
    }
    ARR_TAREFAS[tarefaarrasta_numero].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    arrasta_numero: _init
  };

});