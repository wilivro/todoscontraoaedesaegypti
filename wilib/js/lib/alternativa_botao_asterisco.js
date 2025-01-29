define(function(require) {
  var tarefaAlterBtn = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(bt_botoes, textos, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco
    peca = this;

    //---------------Váriaveis----------------------------

    var config = {
      width: 200,
      height: 50,
      left: 5,
      top: 260,
      linhas: 1,
      textAlign: 'left',
      margin: '5px 5px 5px 5px',
      padding: '0 5px',
      display: 'table',
      lineHeight: '16px',
      finalizar: true,
      widthTexto: 621,
      heightTexto: 130,
      topTexto: 100,
      leftTexto: 10,
      numeracao: true,
      ficaCertas: true

    };

    if (settings) {
      $.extend(config, settings);
    }

    var objectives = 0;
    var index = 0;
    var telaAtual = edi.util.getURL('quest') - 1;
    var questCertas = edi.util.getURL('quest') - 1;

    var colunas = Math.ceil(bt_botoes[telaAtual].length / config.linhas);

    //-----------------------Declarações de funções----------------

    //-----------------------Animações dos asteriscos----------------



    var animacaoAsterico = function(t) {

      var pulsar = function() {
        t.transition({
          scale: 1.2
        }, 1000, function() {
          t.transition({
            scale: 1
          }, 1000, pulsar);
        });
      };

      t.transition({
        scale: 1,
        rotate: '0deg'
      }, 1000, pulsar);

    };

    //-----------------------Clique do botao alternativa----------------

    var eventoBotao = function() {

      $(this).unbind('click');

      var _this = $(this).attr('id');

      if (peca.objetivos.length) {
        edi.objetivos.pop();
      }

      peca.objetivos.pop();

      var botaoTodo = $('#' + _this + ',#' + _this);
      var $botaoAsterisco = $(this).find('i').parent();
      $(this).find('i').remove();


      var correta = $(this).data('correta');

      if ( !! licao.config.WIQUADRO)
        Wiquadro.api.addInteration(6, $(this).attr('id'), null, correta);



      var cor = correta ? '#0060B6' : '#F00';
      botaoTodo
        .transition({
          color: '#FFF',
          backgroundColor: cor,
          cursor: 'default'
        }, 500);

      $(this).find('.bold')
        .transition({
          color: '#FFF',
          cursor: 'default'
        }, 500);

      var img;

      if (correta) {
        img = "../../canvas/objetos/animaCerto";
        edi.objetivos.unshift(1);

        require([img], function(canvas) {
          var mascote = new canvas.animaCerto({
            cor: '#FFF'
          });
          mascote.obj.css({
            top: '4px',
            left: '17px',
          }).appendTo($botaoAsterisco);
          mascote.play();
        });
        edi.acertos.push(_this);
        if (callback) callback(true);

      } else {

        edi.objetivos.unshift(2);

        img = "../../canvas/objetos/animaErrado";

        require([img], function(canvas) {
          var mascote = new canvas.animaErrado({
            cor: '#FFF'
          });
          mascote.obj.css({
            top: '10px',
            left: '20px',
          }).appendTo($botaoAsterisco);
          mascote.play();
        });

        if (callback) callback(false);
      }


      if (!peca.objetivos.length && edi.objetivos.indexOf(2) >= 0) {
        edi.objetivos = [2];
        $('.botao').unbind('click');
        $('.botao').css('cursor', 'default');
      } else if (!peca.objetivos.length && edi.objetivos.indexOf(2) < 0) {
        $('.botao').unbind('click');
        $('.botao').css('cursor', 'default');
        if (callbackFinal) callbackFinal();

      }

      if (config.finalizar) {
        edi.finalizar();
      }



    };
    //tratamento de mouseenter no botao

    ARR_TAREFAS[tarefaAlterBtn].resolve();


    //-----------------------Fim de Declarações de funções----------------

    //-----------------Criando Bolinha de numeros caso true--------------
    var $circuloQuestao = $('<div>');
    if (config.numeracao) {

      $circuloQuestao
        .css({
          position: 'absolute',
          left: '50%',
          top: '50%',
          display: 'inline-block',
          marginTop: '-30px',
          marginLeft: '-30px',
          height: 50,
          width: 50,
          textAlign: 'center',
          lineHeight: '50px',
          fontSize: 30,
          fontWeight: 'bold',
          color: 'rgb(128, 126, 126)',
          border: '5px solid rgb(192, 207, 216)',
          opacity: 0.8,
          borderRadius: 50
        })
        .html(edi.util.getURL('quest'));
    }

    //---------------------Criando container dos botões----------------

    var $containerAlter = $('<section>');
    $containerAlter
      .addClass('containerAlter')
      .attr('data-edi', 'alternativa_botao_asterisco')
      .css({
        position: 'absolute',
        left: config.left,
        top: config.top,
        display: config.display,
      }).appendTo('#conteudo');


    //--Criando container dos textos onde fica os topicos numero da quest e frase da questão---

    var $containerTexto = $('<section>');
    $containerTexto
      .addClass('containerTexto arredondado')
      .attr('data-edi', 'TextoAlternativa')
      .css({
        position: 'absolute',
        left: config.leftTexto,
        top: config.topTexto,
        height: config.heightTexto,
        width: config.widthTexto,
        border: '2px solid rgb(220, 220, 220)',
        backgroundColor: '#FFF'
      })
      .appendTo('#conteudo')
      .peBalao({
        scaleX: 2,
        scaleY: 2,
        borda: 'rgb(220, 220, 220)',
        top: -23,
        left: 20
      });

    //--------Criando container do numero da questao----------

    var $containerQuest = $('<div>');
    $containerQuest
      .css({
        position: 'relative',
        width: (config.widthTexto * 0.2) - 1,
        display: 'block',
        textAlign: 'center',
        float: 'left',
        height: config.heightTexto,
        borderRight: '1px solid rgba(153,153,153,0.5)'

      })
      .append($circuloQuestao)
      .appendTo($containerTexto);


    //--------Criando container do "topico" dos textos----------

    var $containerTopico = $('<div>');
    $containerTopico
      .css({
        position: 'relative',
        width: (config.widthTexto * 0.1),
        display: 'block',
        textAlign: 'center',
        float: 'left',
        height: config.heightTexto
      })
      .appendTo($containerTexto);

    //--------Criando container das frases----------

    var $containerFrase = $('<div>');
    $containerFrase
      .css({
        position: 'relative',
        width: (config.widthTexto * 0.7),
        display: 'block',
        textAlign: 'center',
        float: 'left',
        height: config.heightTexto,

      })
      .appendTo($containerTexto);

    //-----------------------Criando o mural dos textos----------------

    for (var i = 0; i < textos[telaAtual].length; i++) {

      //---------------------Criando o lugar dos topicos----------------

      var $lugarTopico = $('<div>');
      $lugarTopico
        .attr('id', 'topico' + i)
        .css({
          position: 'relative',
          display: 'block',
          borderBottom: (i != textos[telaAtual].length - 1) ? '1px solid rgba(153,153,153,0.5)' : ''

        })
        .appendTo($containerTopico);

      //-----------------------Criando o topico----------------

      var $topico = $('<p>');
      $topico
        .css({
          position: 'relative',
          width: $containerTopico.width(),
          display: 'table-cell',
          verticalAlign: 'middle',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#AAA',
          height: $containerTexto.height() / textos[telaAtual].length + 'px',
        })
        .html(textos[telaAtual][i].topico)
        .appendTo($lugarTopico);

      //---------------------Criando o lugar das frase----------------

      var $lugarFrase = $('<div>');
      $lugarFrase
        .attr('id', 'frase' + i)
        .css({
          position: 'relative',
          borderBottom: (i != textos[telaAtual].length - 1) ? '1px solid rgba(153,153,153,0.5)' : ''
        })
        .appendTo($containerFrase);

      //-----------------------Criando a frase----------------

      var $frase = $('<p>');
      $frase
        .css({
          position: 'relative',
          width: $containerFrase.width(),
          display: 'table-cell',
          verticalAlign: 'middle',
          height: $containerTexto.height() / textos[telaAtual].length + 'px',
          lineHeight: config.lineHeight,
          textAlign: config.textAlign,
          padding: '0px 5px'
        })
        .html(textos[telaAtual][i].texto)
        .appendTo($lugarFrase);
    }

    //-----------------------Criando os botões----------------

    for (var x = 0; x < config.linhas; x++) {

      var $alterBtnCols = $('<div>')
        .css({
          width: 'auto',
          height: 'auto',
        })
        .appendTo($containerAlter);


      for (var j = 0; j < colunas; j++) {
        if (!bt_botoes[telaAtual][index])
          break;

        //------Criando div onde vai ficar os textos e asteriscos/certo/errado------

        var $botoes = $('<div>');

        $botoes
          .addClass('botao boxBranco')
          .attr('id', 'botao' + index)
          .attr('data-correta', bt_botoes[telaAtual][index].dataCorreta)
          .css({
            position: 'relative',
            display: 'inline-block',
            cursor: 'pointer',
            margin: config.margin,
            height: config.height,
            width: config.width,
          })
          .click(eventoBotao)
          .appendTo($alterBtnCols);

        if (bt_botoes[telaAtual][index].dataCorreta) {
          edi.objetivos.push(0);
          this.objetivos.push(0);
        }

        //------Criando div onde vai ficar certo/errado e asterisco--------

        var $bt_asterisco = $('<div>');
        $bt_asterisco
          .addClass('asterisco bt_asterisco' + index)
          .css({
            position: 'relative',
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'center',
            fontSize: '25px',
            width: '30%',
            height: config.height,
            color: '#9C0'
          })
          .appendTo($botoes);

        //-----------------------Criando tag i para os asteriscos----------------

        var $asteriscoAnimado = $('<i>');
        $asteriscoAnimado
          .addClass('fa fa-asterisk iconeAsterisco')
          .attr('id', 'asterisco' + index)
          .transition({
            scale: 0,
            rotate: '360deg'
          })
          .appendTo($bt_asterisco);

        //------------Criando P onde fica o texto dentro dos botões------------

        var $bt_frase = $('<p>');
        $bt_frase
          .addClass('bold')
          .css({
            position: 'relative',
            width: $botoes.width(),
            display: 'table-cell',
            verticalAlign: 'middle',
            fontSize: '80%',
            textAlign: 'center',
            color: '#999',
            height: $botoes.height() / textos[telaAtual].length + 'px',
          })
          .html(bt_botoes[telaAtual][index] ? bt_botoes[telaAtual][index].texto : 'null')
          .appendTo($botoes);
        index++;

        //-----Mandando os astericos para a função das Animações dos asteriscos------

        animacaoAsterico($asteriscoAnimado);

      }
    }

    ARR_TAREFAS[tarefaAlterBtn].resolve();

    return {
      container: $containerAlter
    };
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    alternativa_botao_asterisco: _init
  };

});