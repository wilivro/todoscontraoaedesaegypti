define(function(require) {
  var tarefaAlterBtn = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configuraÃ§Ãµes do EDI
    _configEDI = config;
  }

  function _popup(msg, opt) {
    edi.util.popUp(msg, opt);
  }

  function _init(bt_botoes, callback, callbackFinal, settings) {

    edi.iniciar(_configEDI); //montar o palco
    var peca = this,
      tempMargin,
      config = {
        width: 150,
        height: 50,
        left: 125,
        top: 150,
        randomico: false,
        displayFilho: 'inline-block',
        tamanhoTexto: 25,
        fontSize: 14,
        fontWeight: 'bold',
        colunas: 3,
        margin: '5px 5px 5px 5px',
        padding: '0',
        display: 'table',
        btnBranco: false,
        animacao: false,
        animaLeft: 10,
        animaTop: 0,
        animaTam: 42,
        corAnimaCerto: '#fff',
        corAnimaErrado: '#fff',
        cor: '#666',
        lineHeight: 'none',
        finalizar: true,
        textAlign: 'center',
        semBtn: false,
        cb: null,
        txtCorCerto: '#fff',
        txtCorErrado: '#fff'
      };

    if (settings) {
      $.extend(config, settings);
    }

    tempMargin = config.margin;

    if (config.randomico) {
      bt_botoes.sort(function() {
        return 0.5 - Math.random();
      });
    }

    if(!bt_botoes){
      ARR_TAREFAS[tarefaAlterBtn].resolve(config.cb);
      return;
    }

    //adicionando a box principal ao #conteudo

    function creatMargin(margin) {

      var $margin = margin.split(" ");
      if ($margin.length == 2) {
        return parseInt($margin[1].replace('px', '')) * 2;
      }
      return parseInt($margin[1].replace('px', '')) + parseInt($margin[3].replace('px', ''));
    }


    if (typeof config.margin == 'string') {
      tempMargin = creatMargin(config.margin);
    }

    var $alterBtnMain = $('<section>');
    $alterBtnMain
      .addClass('alter-btn')
      .attr('data-edi', 'alternativa_botao')
      .css({
        position: 'absolute',
        left: config.left,
        top: config.top,
        display: config.display,
        width: (config.width + (tempMargin * 2) + 22) * config.colunas
      }).appendTo('#conteudo');

    //criando os botoes
    bt_botoes.forEach(function(btn, i) {

      if (btn.dataCorreta) {
        peca.objetivos.push(0);
        edi.objetivos.push(0);
      }

      var botao = $('<div>')
        .addClass((!config.semBtn)?((config.btnBranco) ? '_btn btn-sem-estilo' : '_btn btn btn-default'):'_btn')
        .attr({
          id: 'btn' + i,
          'data-correta': btn.dataCorreta
        })
        .appendTo($alterBtnMain);

      botao.css({
        position: 'relative',
        display: 'inline-block',
        width: config.width,
        height: config.height + 20,
        margin: config.margin

      })
        .click(handlerBtnClick);

      $('<div>')
        .css({
          position: 'relative',
          width: config.width,
          height: config.height + 20,
          verticalAlign: 'middle',
          display: 'table-cell',
          textAlign: config.textAlign,
          fontSize: config.fontSize,
          color: (config.btnBranco) ? '#666' : '#fff',
          fontWeight: config.fontWeight,
        })
        .html(btn.texto)
        .appendTo(botao);

    });

    //tratamento do click no botao
    function handlerBtnClick(e) {
      e.stopPropagation();

      var _this = $(this);

      _this.off();
      _this.addClass(!config.semBtn?'btn-default-active':'_btn');

      if (peca.objetivos.length) {
        edi.objetivos.pop();
      }
      peca.objetivos.pop();
      var img;
      if (_this.attr('data-correta') == 'true') {
        edi.objetivos.unshift(1);

        //se config.btnBranco
        if (config.btnBranco) {
          $(this).find('div').css({
            color: config.txtCorCerto
          });
          if(!config.semBtn)
            $(this).addClass('.btn-sem-estilo btn-sem-estilo-acertou');
        }

        //animação

        if (config.animacao) {
          img = "../../canvas/objetos/animaCerto";
          require([img], function(canvas) {
            var mascote = new canvas.animaCerto({
              width: config.animaTam,
              cor: config.corAnimaCerto
            });
            mascote.obj.css({
              left: config.animaLeft,
              top: (config.height / 2) - 10 + config.animaTop
            }).appendTo(_this);
            mascote.play();
          });
        }

        //callback
        if (callback) callback(true, _this);
      } else {
        edi.objetivos.unshift(2);
        //se config.btnBranco
        if (config.btnBranco) {
          $(this).find('div').css({
            color: config.txtCorErrado
          });
          if(!config.semBtn)
            $(this).addClass('.btn-sem-estilo btn-sem-estilo-errou');
        }

        //animação
        if (config.animacao) {
          img = "../../canvas/objetos/animaErrado";
          require([img], function(canvas) {
            var mascote = new canvas.animaErrado({
              width: config.animaTam,
              cor: config.corAnimaErrado
            });
            mascote.obj.css({
              left: config.animaLeft,
              top: (config.height / 2) - 7 + config.animaTop
            }).appendTo(_this);
            mascote.play();
          });
        }

        //callback
        if (callback) callback(false, _this);
      }

      if (!peca.objetivos.length && edi.objetivos.indexOf(2) >= 0) {
        if (callbackFinal) callbackFinal(false);
        edi.objetivos = [2];
        $('.alter-btn ._btn').off('click');
        if (config.btnBranco) $('.alter-btn ._btn').unbind('click');
      } else if (!peca.objetivos.length && edi.objetivos.indexOf(2) < 0) {
        if (callbackFinal) callbackFinal(true);
        $('.alter-btn ._btn').off('click');
        if (config.btnBranco) $('.alter-btn ._btn').unbind('click');
      }

      if (config.finalizar) {
        edi.finalizar();
      }

    }

    //tratamento de mouseenter no botao
    function handlerBtnMouseEnter() {
      var _this = $(this);
      if (!config.btnBranco) _this.parent().addClass('btn-default-hover');
    }

    //tratamento de mouseleave no botao
    function handlerBtnMouseLeave() {
      var _this = $(this);
      if (!config.btnBranco) _this.parent().removeClass('btn-default-hover');
    }

    function handlerBtnSomClick(e) {
      e.stopPropagation();
    }

    function WiQuadroInteraction(element, result) {
      if ( !! WIQUADRO) Wiquadro.api.addInteration(INTERACAO_CLICK, element.id, result);
    }

    ARR_TAREFAS[tarefaAlterBtn].resolve(config.cb);

    return {
      container: $alterBtnMain
    };
  }

  return {
    root: edi,
    objetivos: [],
    setConfig: _setConfig,
    alternativa_botao: _init,
    telaAtual: edi.util.getURL('quest'),
    popup: _popup
  };

});