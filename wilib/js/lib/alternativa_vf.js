define(function(require) {
  var tarefaalternativa_pn = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(alternativas, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco

    var peca = this,
      alter = alternativas;

    //config padrão
    var config = {
      width: 740,
      left: 25,
      top: 10,
      embaralhar: true,
      fontSize: 14,
      animacao: true,
      margin: '0 0 10px 0',
      textoBtn: ['V', 'F']
    };

    //mesclando configurações
    if (settings) $.extend(config, settings);

    //embaralhar altenativas
    if (config.embaralhar) {
      var indexAtual = alter.length,
        valorTemporaio, indexAleatorio;

      while (0 !== indexAtual) {
        indexAleatorio = Math.floor(Math.random() * indexAtual);
        indexAtual -= 1;

        valorTemporaio = alter[indexAtual];
        alter[indexAtual] = alter[indexAleatorio];
        alter[indexAleatorio] = valorTemporaio;
      }
    }

    //adicionando objetivos
    alter.forEach(function() {
      peca.objetivos.push(0);
      edi.objetivos.push(0);
    });

    //criando container principal
    var $alterPN = $('<section>')
      .addClass('alter-vf')
      .attr('data-edi', 'alternativa_vf')
      .css({
        width: config.width,
        top: config.top,
        left: config.left
      })
      .appendTo('#conteudo');

    alter.forEach(function(obj, i) {
      //criando container p cada alternativa
      var $item = $('<div>')
        .addClass('item')
        .css('margin', config.margin)
        .attr('data-correta', obj.dataCorreta)
        .appendTo($alterPN);

      //criando container dos botões
      var $btns = $('<div>')
        .addClass('btns')
        .appendTo($item);

      //criando botões
      var $btnTrue = $('<span>')
        .addClass('_btn btn-true')
        .attr('id', 'btn-true-' + i)
        .attr('data-fraseFim', obj.fraseFinal && obj.dataCorreta ? obj.fraseFinal : '')
        .appendTo($btns)
        .mouseenter(onMouseEnter)
        .mouseleave(onMouseLeave)
        .click(onMouseClick);

      $('<div>')
        .css({top: 2})
        .html(config.textoBtn[0])
        .appendTo($btnTrue);

      var $btnFalse = $('<span>')
        .addClass('_btn btn-false')
        .attr('id', 'btn-false-' + i)
        .attr('data-fraseFim', obj.fraseFinal && !obj.dataCorreta ? obj.fraseFinal : '')
        .appendTo($btns)
        .mouseenter(onMouseEnter)
        .mouseleave(onMouseLeave)
        .click(onMouseClick);

      $('<div>')
        .css({top: 2})
        .html(config.textoBtn[1])
        .appendTo($btnFalse);

      var $miniIcon = $('<span>')
        .addClass('mini-icon')
        .appendTo($btns);

      //criando container do texto
      var $texto = $('<div>')
        .addClass('texto')
        .css({
          color: '#666',
          width: config.width - 200,
          fontSize: config.fontSize
        })
        .html('<p>' + obj.texto + '</p>')
        .appendTo($item);

      //definindo btn correto
      if (obj.dataCorreta) {
        $btnTrue.attr('data-correta', true);
        $btnFalse.attr('data-correta', false);
      } else {
        $btnTrue.attr('data-correta', false);
        $btnFalse.attr('data-correta', true);
      }
    });

    function popUp(texto) {
      var sc_quadro = $('<section>')
        .css({
          position: 'absolute',
          width: 788,
          height: 383,
          top: 0,
          background: 'rgba(0,0,0,0.5)',
          zIndex: 4999
        })
        .hide()
        .appendTo('#principal');

      var dv_ficaTexto = $('<div>')
        .addClass('arredondado')
        .css({
          position: 'relative',
          top: '50%',
          left: '50%',
          background: '#FFF',
          width: 400,
          height: 200,
          textAlign: 'center',
          margin: '-100px 0 0 -250px',
          paddingLeft: '100px',
          border: '2px solid #333'
        })
        .hide()
        .transition({
          scale: 0
        }, 0)
        .appendTo(sc_quadro);

      var dv_texto = $('<div>')
        .css({
          position: 'relative',
          verticalAlign: 'middle',
          display: 'table-cell',
          textAlign: 'center',
          width: 300,
          height: 200
        })
        .html(texto)
        .appendTo(dv_ficaTexto);

      var dv_btn = $('<div>')
        .addClass('redondo')
        .css({
          position: 'absolute',
          width: 29,
          height: 29,
          top: -11,
          left: 479,
          background: '#FFF',
          color: '#F00',
          cursor: 'pointer',
          fontSize: '35px'
        })
        .html('<i class="fa fa-times-circle" style="position: relative; top: -2px;"></i>')
        .click(function(evt) {
          sc_quadro.fadeOut();
          dv_ficaTexto.fadeIn().transition({
            scale: 0
          }, 500, function() {
            sc_quadro.remove();
          });
        })
        .appendTo(dv_ficaTexto);

      sc_quadro.fadeIn();
      dv_ficaTexto.fadeIn().transition({
        scale: 1
      }, 500);


    }

    function onMouseClick() {
      var self = $(this),
        correta = self.attr('data-correta'),
        $miniIcon = self.parent().find('.mini-icon');

      if (self.attr('data-fraseFim') !== '')
        popUp(self.attr('data-fraseFim'));

      if (correta == 'true') {
        self.removeClass('hover').off();
        self.parent().find('._btn').off();

        animaTrue($miniIcon);

        edi.objetivos.unshift(1);

        if (callback) callback(true, self);
      } else {
        self.removeClass('hover').off();

        self.parent().find('._btn').off();

        animaFalse($miniIcon);

        edi.objetivos.unshift(2);

        if (callback) callback(false, self);
      }

      peca.objetivos.pop();
      edi.objetivos.pop();
      edi.finalizar();

      var acertou = false,
        acertos = 0;

      edi.objetivos.forEach(function(obj) {
        if (obj == 1) acertos++;
      });

      if (acertos == edi.objetivos.length) acertou = true;

      if (peca.objetivos.length === 0 && callbackFinal) callbackFinal(acertou);
    }

    function onMouseEnter() {
      $(this).addClass('hover');
    }

    function onMouseLeave() {
      $(this).removeClass('hover');
    }

    function animaTrue($miniIcon) {
      if (config.animacao) {
        var $icoMiniAcertou = $('<span>')
          .css({
            width: 42,
            height: 40,
            position: 'absolute',
            left: 2,
            top: -1
          })
          .appendTo($miniIcon);

        var img = "../../canvas/objetos/animaCerto";

        require([img], function(canvas) {
          var mascote = new canvas.animaCerto({
            cor: '#0060B6'
          });
          mascote.obj.css({
            width: 32 * getScale(),
            top: '2px',
            left: '10px'
          }).appendTo($icoMiniAcertou);
          mascote.play();
        });

      }
    }

    function animaFalse($miniIcon) {
      if (config.animacao) {
        var $icoMiniErrou = $('<span>')
          .css({
            width: 32,
            height: 32,
            position: 'absolute',
            left: 11,
            top: 4
          })
          .appendTo($miniIcon);

        var img = "../../canvas/objetos/animaErrado";

        require([img], function(canvas) {
          var mascote = new canvas.animaErrado({
            cor: '#F00'
          });
          mascote.obj.css({
            top: '0px',
            left: '0px',
          }).appendTo($icoMiniErrou);
          mascote.play();
        });

      }
    }

    ARR_TAREFAS[tarefaalternativa_pn].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    alternativa_vf: _init
  };

});