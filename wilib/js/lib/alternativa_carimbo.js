define(function(require) {
  var tarefaCarimbo = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(alternativas, callBack, callBackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco

    var peca = this,
      condicao = true;

    var config = {
      posx: 150,
      posy: 80,
      altura: 300,
      largura: 670,
      aleatorio: false,
      tamanhoBoxTexto: 250,
      tamanhoBox: 30,
      tamanhoFonteTexto: 14,
      marginBtns: 10,
      tamanhoFonteLetra: 20
    };

    if (settings) {
      $.extend(config, settings);
    }

    if (config.aleatorio) {
      alternativas.sort(function() {
        return 0.5 - Math.random();
      });
    }

    var finalizar = function() {

      if (peca.objetivos.length === 0) {
        if (condicao)
          edi.finalizar(_configEDI);
        condicao = false;
      }
    };

    var addCliqueCerto = function(_this, divAppend) {
      _this.click(function() {

        var boxResultado = $(this).parent().find('.vf-resultado');

        var icone = $('<div>')
          .css({
            position: 'relative',
            left: '-320px',
            top: '-60px',
            zIndex: '1',
            width: 554,
            height: 149,
            background: 'url("../wilib/img/svg/txt_certo.svg") 0 0 no-repeat',
            backgroundSize: '100% 100%'
          })
          .appendTo(boxResultado)
          .animate({
            width: 110,
            height: 30,
            top: 6,
            left: -30
          }, 500, function() {
            icone.css('z-index', '0');
            finalizar();
          });

        edi.objetivos.pop();
        peca.objetivos.pop();
        edi.objetivos.unshift(1);

        if ( !! callBack) callBack(true);

        if ( !! licao.config.WIQUADRO)
          Wiquadro.api.addInteration(6, $(this).attr('id'), null, 'T');
      });
    };

    var addCliqueErrado = function(_this, divAppend) {
      _this.click(function() {

        var boxResultado = $(this).parent().find('.vf-resultado');

        var icone = $('<div>')
          .css({
            position: 'relative',
            left: '-320px',
            top: '-60px',
            zIndex: '1',
            width: 554,
            height: 277,
            background: 'transparent url("../wilib/img/svg/txt_errado.svg") 0 0 no-repeat',
            backgroundSize: '100% 100%'
          })
          .appendTo(boxResultado)
          .animate({
            width: 110,
            height: 40,
            top: 2,
            left: -30
          }, 500, function() {
            icone.css('z-index', '0');
            finalizar();
          });

        edi.objetivos.pop();
        peca.objetivos.pop();
        edi.objetivos.unshift(2);

        if ( !! callBack) callBack(false);

        if ( !! licao.config.WIQUADRO)
          Wiquadro.api.addInteration(6, $(this).attr('id'), null, 'F');

      });
    };

    

    var alternativa_div = $('<div>')
      .attr('data-edi', 'alternativa')
      .css('position', 'absolute')
      .css('top', config.posy)
      .css('left', config.posx)
      .css('height', config.altura)
      .css('width', config.largura)
      .appendTo($('#conteudo'));

    for (var i in alternativas) {

      var alternativa_section = $('<section>')
        .addClass('vf-section')
        .css({
          display: 'flex',
          marginBottom: config.marginBtns + 'px'
        })
        .appendTo(alternativa_div);

      var textoBox = $('<div>')
        .css({
          display: 'inline-block',
          marginRight: '10px',
          padding: '10px',
          width: config.tamanhoBoxTexto + 'pt',
          height: config.tamanhoBox + 'pt',
          position: 'relative',
          fontSize: config.tamanhoFonteTexto + 'px',
          border: '1px solid rgb(220,220,220)',
          borderRadius: '10px'
        })
        .appendTo(alternativa_section);

      var alternativa_box = $('<div>')
        .css({
          borderColor: 'rgb(199, 214, 223)',
          borderWidth: '3px',
          borderStyle: 'dashed',
          color: '#999',
          float: 'left',
          display: 'inline-block',
          height: '40pt',
          width: '90pt',
          borderRadius: '10px',
          margin: '0 1px 2px 0',
          backgroundColor: '#FFF'
        })
        .attr('id', 'alternativa_' + i)
        .addClass('vf-resposta')
        .css('position', 'relative')
        .appendTo(alternativa_section);

      var boxSprite = $('<div>')
        .addClass('vf-resultado')
        .css({
          color: '#999',
          float: 'left',
          margin: '5px 0 0 35px'
        })
        .appendTo(alternativa_box);

      var textoP = $('<div>')
        .css({
          position: 'absolute',
          top: '50%',
          display: 'table-cell',
          verticalAlign: 'middle'
        })
        .appendTo(textoBox);

      var textoSpan = $('<div>')
        .css({
          position: 'relative'
        })
        .html(alternativas[i].alternativa)
        .appendTo(textoP);

      textoSpan
        .css({
          width: 'auto',
          top: '-' + (textoSpan.height() / 2) + 'px'
        });

      if (alternativas[i].correta) {

        edi.objetivos.push(0);
        peca.objetivos.push(0);

        addCliqueCerto(alternativa_box);

      } else {

        addCliqueErrado(alternativa_box);

      }

    }

    $('.vf-section .vf-resposta')
      .css('cursor', 'pointer')
      .click(function() {

        $(this).parent().find('.vf-resposta')
          .unbind('mouseenter')
          .unbind('mouseleave')
          .unbind('click')
          .css({
            backgroundColor: '#FFF',
            cursor: 'default',
          });

        if (edi.objetivos.indexOf(0) < 0) {
          $('.vf-resposta')
            .unbind('mouseenter')
            .unbind('mouseleave')
            .unbind('click')
            .css({
              cursor: 'default'
            });
        }

        if (!peca.objetivos.length && edi.objetivos.indexOf(2) >= 0) {
          edi.objetivos = [2];
          if (callBackFinal) callBackFinal(false);
        } else if (!peca.objetivos.length && edi.objetivos.indexOf(2) < 0) {
          if (callBackFinal) callBackFinal(true);
        }

      }).mouseleave(function() {

        $(this)
          .css({
            backgroundColor: '#FFF',
            fontSize: config.tamanhoFonte + 'pt',
            color: '#999'
          });

      });
    ARR_TAREFAS[tarefaCarimbo].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    alternativa_carimbo: _init
  };

});