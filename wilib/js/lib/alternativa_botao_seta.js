define(function(require) {
  var tarefaAlterBtn = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(bt_botoes, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco
    var peca = this;
    var config = {
      topSeta: 125,
      topBalao: -3,
      leftBalao: 40,
      scaleXBalao: -1.5,
      scaleYBalao: 1.5
    };

    if (settings) {
      $.extend(config, settings);
    }

    //Criando ctGeral
    var ctGeral = $('<secition>')
      .css({
        position: 'absolute',
        top: 90
      })
      .appendTo('#conteudo');
    //**************************************************

    //Criando balao
    var balao = $('<div>')
      .addClass('balao')
      .attr('data-edi', 'alternativa_botao_seta')
      .css({
        background: '#fff',
        width: 700,
        height: 190,
        padding: '0 20px',
        position: 'absolute',
        left: 20,
        top: 0,
        borderRadius: 10,
        border: '1px solid #E2E2E2'
      })
      .appendTo(ctGeral);
    balao.peBalao({
      scaleX: config.scaleXBalao,
      scaleY: config.scaleYBalao,
      left: config.leftBalao,
      top: config.topBalao
    });
    //**************************************************

    var tela = edi.util.getURL('quest'); //<--- tela atual
    var index = edi.util.getURL('quest') - 1; // <--- posicao array

    //Criando circulo com numero
    var num = $('<div>').css({
      width: 50,
      height: 50,
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
      fontSize: 35,
      color: '#666'
    })
      .html(tela);

    $('<div>')
      .css({
        position: 'relative',
        top: 15,
        width: 50,
        height: 50,
        borderRadius: 50,
        border: '3px solid #CCC',
        boxShadow: '-1px 1px 1px 1px rgba(0,0,0,.6)'
      })
      .html(num)
      .appendTo(balao);
    //**************************************************

    //Criando seta
    //Criando funcao da animacao da seta
    function addAnimacao() {

      $(this).transition({
        width: '90px'
      }, 500);

      $(this).find('.retangulo').transition({
        width: '64px',
        backgroundColor: '#9c0'
      }, 500);

      $(this).find('.triangulo').transition({
        'border-color': ' transparent transparent transparent #9c0'
      }, 500);

      $('.texto2').fadeIn();
      $('.texto_btn_spn').fadeIn();
      $('.btn-sem-estilo').click(clickBotoes); // <---- atribuindo funcao do click nos botoes

    }
    //**************************************************

    //Desenhando Seta
    var dv_seta = $('<div>')
      .attr('id', 'seta')
      .addClass('clique')
      .css({
        position: 'absolute',
        top: config.topSeta,
        width: '40px',
        height: '25px',
        cursor: 'pointer'
      })
      .appendTo(balao);


    var dv_trianguloSombra = $('<div>')
      .addClass('trianguloSombra')
      .css({
        'float': 'right',
        'margin-left': '-21px',
        'margin-top': '-2px',
        'border-color': 'transparent transparent transparent #ccc',
        'border-width': '13px',
        'border-style': 'solid'
      })
      .appendTo(dv_seta);
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
      .appendTo(dv_seta);

    var dv_retangulo = $('<div>')
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
      .appendTo(dv_seta);

    dv_seta.click(addAnimacao); // <---- atribuindo funcao do click a seta
    //**************************************************
    //**************************************************

    //Criando funcao do click dos botoes
    function clickBotoes() {
      var _this = $(this);
      var img;

      if ( !! callback) callback(_this.data('correta'));

      _this.find('span').css('color', '#FFF');
      $('.btn-sem-estilo').css({
        cursor: 'default'
      }).unbind();

      if (_this.data('correta')) {

        edi.objetivos.pop();
        peca.objetivos.pop();
        edi.objetivos.unshift(1);

        _this
          .css({
            background: '#00F',
            border: '1px solid #00D'
          });

        img = "../../canvas/objetos/animaCerto";

        require([img], function(canvas) {
          var mascote = new canvas.animaCerto({
            width: 35,
            cor: '#fff'
          });
          mascote.obj.css({
            left: 10,
            top: 2
          }).appendTo(_this);
          mascote.play();
        });
      } else {

        edi.objetivos.pop();
        peca.objetivos.pop();
        edi.objetivos.unshift(2);

        _this
          .css({
            background: '#F00',
            border: '1px solid #D00'
          });

        img = "../../canvas/objetos/animaErrado";
        require([img], function(canvas) {
          var mascote = new canvas.animaErrado({
            width: 35,
            cor: '#fff'
          });
          mascote.obj.css({
            left: 10,
            top: 7
          }).appendTo(_this);
          mascote.play();
        });
      }
      edi.finalizar();
    }
    //**************************************************


    //Criando textos do balao
    $('<div>')
      .addClass('texto1')
      .css({
        position: 'absolute',
        color: '#666',
        width: 500,
        textAlign: 'center',
        top: 35,
        left: 150
      })
      .html(bt_botoes[index].texto1).
    appendTo(balao);

    $('<div>')
      .addClass('texto2')
      .css({
        position: 'absolute',
        color: '#666',
        width: 500,
        textAlign: 'center',
        top: config.topSeta,
        left: 150,
        display: 'none'
      })
      .html('<span class="spnTexto">' + bt_botoes[index].texto2 + '</span>')
      .appendTo(balao);
    //**************************************************

    //criando os botoes e atribuindo click

    var ctBotoes = $('<div>')
      .css({
        position: 'absolute',
        top: 220,
        left: 0,
        textAlign: 'center',
        width: 788
      })
      .appendTo(ctGeral);

    for (var i = 0; i < bt_botoes[index].btn.length; i++) {

      if (bt_botoes[index].btn[i].dataCorreta) {
        edi.objetivos.push(0);
        peca.objetivos.push(0);
      }

      var spn = $('<span>')
        .addClass('texto_btn_spn')
        .css({
          color: '#666',
          display: 'none'
        })
        .html(bt_botoes[index].btn[i].btn);


      var btn = $('<div>')
        .addClass('texto_btn')
        .css({
          width: 200,
          height: 40,
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center',
          color: '#666'
        })
        .append(spn);

      $('<div>')
        .addClass('btn-sem-estilo')
        .css({
          width: 200,
          height: 40,
          margin: '0 10px',
          boxShadow: '-1px 1px 2px 1px rgba(0,0,0,.5)',
          display: 'inline-block'
        })
        .attr({
          id: 'btn-' + tela + '-' + i,
          'data-correta': bt_botoes[index].btn[i].dataCorreta
        })
        .append(btn)
        .appendTo(ctBotoes);

    }
    //**************************************************


    ARR_TAREFAS[tarefaAlterBtn].resolve();

  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    alternativa_botao: _init,
    telaAtual: edi.util.getURL('quest')
  };

});