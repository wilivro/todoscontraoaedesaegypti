define(function(require) {
  var tarefaAlternativa = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _telaAtual() {
    return edi.util.getURL('quest');
  }

  function _init(alternativas, callBack, callBackFinal, settings) {


    edi.iniciar(_configEDI); //montar o palco
    _configEDI.qtdTelas = edi.qtdTelas;
    var peca = this;

    var config = {
      posx: 20,
      posy: 80,
      altura: 300,
      largura: 670,
      aleatorio: true,
      tamanhoBox: 40,
      tamanhoBoxTexto: 250,
      tamanhoFonteTexto: 16,
      marginBtns: 10,
      tamanhoFonteLetra: 20
    };

    if (settings) {
      $.extend(config, settings);
    }

    console.log(alternativas);

    if (config.aleatorio) {
      alternativas.sort(function() {
        return 0.5 - Math.random();
      });
    }

    var alternativa_div = $('<div>')
      .attr('data-edi', 'alternativa')
      .css('position', 'absolute')
      .css('top', config.posy)
      .css('left', config.posx)
      .css('height', config.altura)
      .css('width', config.largura)
      .appendTo($('#conteudo'));

    var cliqueCerto = function(letra) {
      letra.click(function() {

        var boxResultado = $(this).parent().find('.vf-resultado');
        var self = $(this);

        var icone = $('<div>')
          .css({
            position: 'relative',
            left: '-21px',
            top: '-20px',
            width: 42,
            height: 40,
            marginTop: '50%',
            marginLeft: '50%'
          })
          .addClass('ico-mini-certo')
          .appendTo(boxResultado);

        var img = "../../canvas/objetos/animaCerto";

        require([img], function(canvas) {
          var mascote = new canvas.animaCerto({
            cor: '#0060B6'
          });
          mascote.obj.css({
            top: '0px',
            left: '0px',
          }).appendTo(icone);
          mascote.play();
        });

        edi.objetivos.pop();
        peca.objetivos.pop();
        edi.objetivos.unshift(1);
        edi.finalizar();
        if ( !! callBack) callBack(true, self);

      });
    };

    var cliqueErrado = function(letra) {
      letra.click(function() {

        var boxResultado = $(this).parent().find('.vf-resultado');
        var self = $(this);

        var icone = $('<div>')
          .css({
            position: 'relative',
            left: '-16px',
            top: '-15px',
            width: 32,
            height: 30,
            marginTop: '50%',
            marginLeft: '50%'
          })
          .addClass('ico-mini-errado')
          .appendTo(boxResultado);

        var img = "../../canvas/objetos/animaErrado";

        require([img], function(canvas) {
          var mascote = new canvas.animaErrado({
            cor: '#F00'
          });
          mascote.obj.css({
            top: '0px',
            left: '0px',
          }).appendTo(icone);
          mascote.play();
        });

        edi.objetivos.pop();
        peca.objetivos.pop();
        edi.objetivos.unshift(2);
        edi.finalizar();
        if ( !! callBack) callBack(false, self);

      });
    };

    for (var i in alternativas) {
      //jshint evil : true

      var alternativa_section = $('<section>')
        .addClass('vf-section')
        .css({
          display: 'flex',
          marginBottom: config.marginBtns + 'px'
        })
        .appendTo(alternativa_div);

      var alternativa_box = $('<div>')
        .css({
          display: 'table',
          height: config.tamanhoBox + 'pt',
          width: (config.tamanhoBox * 2 + 5) + 'pt',
          backgroundColor: '#ddd',
          borderRadius: '5px'
        })
        .css('position', 'relative')
        .appendTo(alternativa_section);

      var boxSprite = $('<div>')
        .addClass('vf-resultado')
        .css({
          border: '1px solid rgb(220,220,220)',
          color: '#999',
          float: 'left',
          display: 'inline-block',
          height: config.tamanhoBox + 'pt',
          width: config.tamanhoBox + 'pt',
          borderRadius: '3px',
          margin: '0 1px 2px 0',
          backgroundColor: '#FFF'
        })
        .appendTo(alternativa_box);

      var letra = $('<div>')
        .attr('data-textoFinal', alternativas[i].textoFinal ? alternativas[i].textoFinal : '')
        .addClass('vf-resposta')
        .css({
          border: '1px solid rgb(220,220,220)',
          color: '#999',
          float: 'left',
          fontSize: config.tamanhoFonteLetra + 'pt',
          fontWeight: 'bold',
          textAlign: 'center',
          lineHeight: config.tamanhoBox + 'pt',
          display: 'inline-block',
          height: config.tamanhoBox + 'pt',
          width: config.tamanhoBox + 'pt',
          borderRadius: '3px',
          margin: '0 2px 2px -1px',
          backgroundColor: '#FFF'
        })
        .html(String.fromCharCode(65 + eval(i)))
        .appendTo(alternativa_box);

      var textoBox = $('<div>')
        .css({
          display: 'table',
          marginLeft: '10px',
          width: config.tamanhoBoxTexto + 'px',
          height: config.tamanhoBox + 'pt',
          position: 'relative',
          color: '#666',
          fontSize: config.tamanhoFonteTexto + 'px'
        })
        .appendTo(alternativa_section);

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

        cliqueCerto(letra);

      } else {
        cliqueErrado(letra);

      }

    }

    $('.vf-section .vf-resposta')
      .css('cursor', 'pointer')
      .mouseenter(function() {

        $(this).css({
          backgroundColor: 'rgb(238, 238, 238)',
          // fontSize: (config.tamanhoFonte + 5) + 'pt',
        });

      }).click(function() {

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
    ARR_TAREFAS[tarefaAlternativa].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    alternativa: _init,
    telaAtual: _telaAtual,
    root: edi
  };

});