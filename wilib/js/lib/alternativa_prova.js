define(function(require) {
  var tarefaAlterBtn = addTarefa();
  var edi = require('../lib/edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(bt_botoes, callback, callbackFinal, settings) {
    edi.iniciar(_configEDI); //montar o palco
    peca = this;
    var config = {
      widhRodape: 80,
      heightRodape: 20,
      marginLeftNumRodape: 3,
      marginLeftRodape: 10,
      fontSize: 14,
      lineHeight: '14px'
    };

    var mascote;

    var corGradiente = {
      'background': 'linear-gradient(to bottom, #ffff00 0%,#ccff00 36%,#99cc00 100%)',
      'filter': 'progid:DXImageTransform.Microsoft.gradient( startColorstr="#ffff00", endColorstr="#99cc00",GradientType=0 )',
      'border-radius': '50%'
    };

    var questao = 0;
    var btns_clicados = [];
    var certos = 0;

    if (settings) {
      $.extend(config, settings);
    }

    //--------------------------sections-------------------------------

    var sc_bloqueio = $('<section>') //bloqueio durante a transação
    .css({
      position: 'absolute',
      width: '100%',
      height: '100%',
      opacity: '0.5',
      backgroundColor: '#000',
      zIndex: 2000
    })
      .appendTo('#principal');

    var sc_numero = $('<section>') //fica numero e pergunta
    .css({
      position: 'absolute',
      width: '15%',
      height: '80%'
      //backgroundColor: edi.util.corAleatoria()
    })
      .appendTo('#principal');

    var sc_rodape = $('<section>') //fica numero e pergunta
    .css({
      position: 'absolute',
      width: '100%',
      height: '20%',
      top: '80%',
      borderTop: '2px solid #CCC'
      //backgroundColor: edi.util.corAleatoria()
    })
      .appendTo('#principal');

    var sc_pergunta = $('<section>') //fica numero e pergunta
    .css({
      position: 'absolute',
      width: '60%',
      height: '80%',
      left: '15%'
      //backgroundColor: edi.util.corAleatoria()
    })
      .appendTo('#principal');

    var sc_falaMascote = $('<section>') //fica numero e pergunta
    .css({
      position: 'absolute',
      width: '25%',
      height: '80%',
      left: '75%'
      //backgroundColor: edi.util.corAleatoria()
    })
      .appendTo('#principal');

    var sc_final = $('<section>') //fica a tela final depois das respostas do usuario
    .css({
      position: 'absolute',
      width: '75%',
      height: '80%',
      backgroundColor: '#FFF'
    })
      .hide()
      .appendTo('#principal');

    //--------------------------Fim sections-------------------------------

    //--------------------------- Criação rodape --------------------------------
    var dv_rodape = $('<div>') //parte onde fica SUAS RESPOSTAS no rodape
    .addClass('bold')
      .css({
        position: 'absolute',
        width: sc_rodape.width() * 0.2,
        height: sc_rodape.height(),
        color: '#666',
        backgroundColor: '#CCC',
        lineHeight: sc_rodape.height() + 'px',
        textAlign: 'center',
        fontSize: '12px'

      })
      .html('SUAS RESPOSTAS')
      .appendTo(sc_rodape);

    var dv_rodape_quest = $('<div>') //fica o numero de questões
    .addClass('bold')
      .css({
        position: 'absolute',
        width: sc_rodape.width() * 0.45,
        left: sc_rodape.width() * 0.2,
        height: sc_rodape.height(),
        color: '#999',
        //backgroundColor: edi.util.corAleatoria(),
        textAlign: 'center',
        fontSize: '12px'
      })
      .appendTo(sc_rodape);

    var dv_rodape_quest_centralizado = $('<div>') //centralizar o numero de questões 
    .addClass('bold')
      .css({
        position: 'relative',
        width: sc_rodape.width() * 0.45,
        height: sc_rodape.height(),
        textAlign: 'center',
        display: 'table-cell',
        verticalAlign: 'middle'
      })
      .appendTo(dv_rodape_quest);

    for (var i = 0; i < bt_botoes.length; i++) {
      var dv_num_quest = $('<div>')
        .css({
          position: 'relative',
          display: 'inline-block',
          width: config.widhRodape + (config.marginLeftNumRodape * bt_botoes.length),
          height: config.heightRodape,
          marginLeft: config.marginLeftRodape,
          lineHeight: '20px',
          textAlign: 'center'
          //backgroundColor: edi.util.corAleatoria()
        })
        .appendTo(dv_rodape_quest_centralizado);

      var dv_num_alternativa = $('<div>') //numero das alternativas
      .css({
        position: 'relative',
        display: 'inline-block',
        //width: (dv_num_quest.width()/3)-(config.marginLeftNumRodape*bt_botoes.length),
        //height: 20,
        lineHeight: '20px',
        textAlign: 'center',
        marginLeft: config.marginLeftNumRodape + 'px',
        //backgroundColor: edi.util.corAleatoria()
      })
        .html((i + 1) < 10 ? '0' + (i + 1) + ' - ' : (i + 1) + ' - ')
        .appendTo(dv_num_quest);

      var dv_clicada = $('<div>') //mostra o que o usuario clicou
      .attr('id', 'clicado' + i)
        .css({
          position: 'relative',
          display: 'inline-block',
          width: dv_num_alternativa.width(),
          //height: dv_num_alternativa.height(),
          lineHeight: '20px',
          textAlign: 'center',
          marginLeft: config.marginLeftNumRodape + 'px'
          //backgroundColor: edi.util.corAleatoria()
        })
        .html('')
        .appendTo(dv_num_quest);

      var dv_num_icone = $('<div>') //mostra icone certo errrado
      .attr('id', 'vistoNum' + i)
        .css({
          position: 'relative',
          display: 'inline-block',
          width: dv_num_alternativa.width(),
          //height: dv_num_alternativa.height(),
          lineHeight: '20px',
          textAlign: 'center',
          marginLeft: config.marginLeftNumRodape + 'px',
          //backgroundColor: edi.util.corAleatoria()
        })
        .html('')
        .appendTo(dv_num_quest);
    }

    var dv_porcentagem = $('<div>') //fica porcentagem
    .addClass('bold')
      .css({
        position: 'absolute',
        width: sc_rodape.width() * 0.1,
        left: sc_rodape.width() * 0.65,
        height: sc_rodape.height(),
        color: '#999',
        borderLeft: '2px solid #CCC',
        borderRight: '2px solid #CCC',
        //backgroundColor: edi.util.corAleatoria(),
        textAlign: 'center',
        fontSize: '12px'
      })
      .appendTo(sc_rodape);

    var dv_porcentagem_centralizado = $('<div>')
      .css({
        position: 'relative',
        width: dv_porcentagem.width(),
        height: dv_porcentagem.height(),
        display: 'table-cell',
        verticalAlign: 'middle'
      })
      .appendTo(dv_porcentagem);

    var dv_num_porcentagem = $('<div>')
      .addClass('bold')
      .css({
        position: 'relative',
        display: 'inline-block',
        width: dv_porcentagem.width(),
        marginBottom: 8
      })
      .html("0%")
      .appendTo(dv_porcentagem_centralizado);

    var dv_barra_porcentagem = $('<div>')
      .addClass('bold')
      .css({
        position: 'relative',
        display: 'inline-block',
        height: 10,
        width: dv_porcentagem.width() - 8,
        border: '1px solid #000'
      })
      .appendTo(dv_porcentagem_centralizado);

    var dv_barra_porcentagem_dentro = $('<div>')
      .css({
        position: 'relative',
        height: 10,
        width: '0%',
        backgroundColor: '#9c0'
      })
      .appendTo(dv_barra_porcentagem);

    var dv_prosseguir = $('<div>') //fica o nome prosseguir
    .addClass('bold')
      .css({
        position: 'absolute',
        width: sc_rodape.width() * 0.25,
        left: sc_rodape.width() * 0.75,
        height: sc_rodape.height(),
        color: '#999',
        //backgroundColor: edi.util.corAleatoria(),
        textAlign: 'center',
        fontSize: '12px'
      })
      .appendTo(sc_rodape);

    var dv_prosseguir_centralizado = $('<div>')
      .css({
        position: 'relative',
        width: dv_prosseguir.width(),
        height: dv_prosseguir.height(),
        display: 'table-cell',
        verticalAlign: 'middle'
      })
      .appendTo(dv_prosseguir);

    var dv_triangulo = $('<div>')
      .css({
        position: 'relative',
        width: dv_prosseguir_centralizado.width() * 0.2,
        //height: dv_prosseguir_centralizado.width(),
        display: 'inline-block',
        'float': 'left',
        'margin-left': '604px',
        'margin-top': '11px',
        'border-color': ' transparent transparent transparent #CCC',
        'border-width': (sc_rodape.height() / 2 - 10) + 'px',
        'border-style': 'solid'
      })
      .appendTo(sc_rodape);

    var dv_prosseguir_texto = $('<div>')
      .addClass('bold')
      .css({
        position: 'relative',
        display: 'inline-block',
        width: dv_prosseguir_centralizado.width() * 0.8,
        fontSize: '18px',
        color: '#CCC'
      })
      .html("<span style='font-size: 17px'>clique aqui para</span><br>PROSSEGUIR")
      .appendTo(dv_prosseguir_centralizado);


    //------------------------ FIM Criação rodape -------------------------------


    var montaProva = function(quest, interacao) {

      //--------------------------Criação Bola -------------------------------

      var dv_bola = $('<div>')
        .attr('id', 'bola' + quest)
        .css({
          position: 'absolute',
          top: '20px',
          left: '50%',
          marginLeft: '-40px',
          width: '83px',
          height: '83px'
        })
        .css(corGradiente)
        .appendTo(sc_numero);

      var dv_num_bola = $('<div>')
        .addClass('bold')
        .css({
          position: 'relative',
          display: 'table-cell',
          verticalAlign: 'middle',
          height: '83px',
          width: '83px',
          textAlign: 'center',
          fontSize: '40px',
          color: '#FFF',
          fontStyle: 'italic'
        })
        .html((quest + 1) < 10 ? '0' + (quest + 1) : (quest + 1))
        .appendTo(dv_bola);

      //-------------------------- FIM Criação Bola -------------------------------


      //--------------------Criação divs Pergunta Resposta ------------------------

      var dv_pergunta = $('<div>')
        .attr('id', 'pergunta' + quest)
        .css({
          position: 'absolute',
          width: sc_pergunta.width(),
          height: '25%'
          //backgroundColor: edi.util.corAleatoria()
        })
        .appendTo(sc_pergunta);

      var dv_resposta = $('<div>')
        .attr('id', 'resposta' + quest)
        .css({
          position: 'absolute',
          top: '25%',
          left: '-68px',
          width: sc_pergunta.width() + 70,
          height: '75%'
          //backgroundColor: edi.util.corAleatoria()
        })
        .appendTo(sc_pergunta);

      var dv_pergunta_texto = $('<div>')
        .addClass('bold')
        .css({
          position: 'relative',
          display: 'table-cell',
          verticalAlign: 'middle',
          height: dv_pergunta.height(),
          width: dv_pergunta.width(),
          textAlign: 'center',
          fontSize: '16px',
          color: '#557641',
          fontStyle: 'italic'
        })
        .html(bt_botoes[questao].pergunta)
        .appendTo(dv_pergunta);


      for (var i = 0; i < bt_botoes[questao].textos.length; i++) {

        var dv_quest = $('<div>') //fica as coisas da resposta
        .css({
          position: 'absolute',
          top: (dv_resposta.height() / bt_botoes[questao].textos.length) * i,
          width: dv_resposta.width(),
          height: dv_resposta.height() / bt_botoes[questao].textos.length,
          color: '#999'
          //backgroundColor: edi.util.corAleatoria()

        })
          .appendTo(dv_resposta);

        var dv_icone = $('<div>') //fica a animação certo errado
        .addClass('visto')
          .attr('id', 'visto' + i)
          .attr('data-correta', bt_botoes[questao].textos[i].dataCorreta)
          .css({
            position: 'relative',
            display: 'inline-block',
            width: dv_resposta.width() * 0.1,
            height: dv_resposta.height() / bt_botoes[questao].textos.length,
            //backgroundColor: edi.util.corAleatoria()
          })
          .appendTo(dv_quest);

        var dv_btn = $('<div>') //fica o botão da alternativa
        .css({
          position: 'relative',
          display: 'inline-block',
          width: dv_resposta.width() * 0.1,
          height: dv_resposta.height() / bt_botoes[questao].textos.length,
          //backgroundColor: edi.util.corAleatoria()
        })
          .appendTo(dv_quest);

        var dv_btn_letra = $('<div>') //a letra centralizado e a função do click
        .addClass('bold')
          .attr('id', 'btn_' + i)
          .attr('alternativa', i)
          .attr('questao', quest)
          .attr('data-correta', bt_botoes[questao].textos[i].dataCorreta)
          .css({
            position: 'relative',
            display: 'table-cell',
            verticalAlign: 'middle',
            textAlign: 'center',
            fontSize: '30px',
            width: dv_resposta.width() * 0.1,
            height: dv_resposta.height() / bt_botoes[questao].textos.length
          })
          .html(String.fromCharCode(65 + parseInt(i)))
          .appendTo(dv_btn);

        if (interacao)
          dv_btn_letra
            .css('cursor', 'pointer')
            .mouseover(dentroMouse)
            .mouseout(foraMouse)
            .click(clickMouse);


        var dv_frase_resposta = $('<div>') //fica a frase da alternativa
        .css({
          position: 'relative',
          display: 'inline-block',
          width: dv_resposta.width() * 0.8,
          height: dv_resposta.height() / bt_botoes[questao].textos.length,
          //backgroundColor: edi.util.corAleatoria()
        })
          .appendTo(dv_quest);

        var dv_frase_resposta_texto = $('<div>') // a frase da alternativa centralizado 
        .css({
          position: 'relative',
          display: 'table-cell',
          verticalAlign: 'middle',
          fontSize: config.fontSize,
          lineHeight: config.lineHeight,
          width: dv_resposta.width() * 0.8,
          height: dv_resposta.height() / bt_botoes[questao].textos.length
        })
          .html(bt_botoes[questao].textos[i].texto)
          .appendTo(dv_frase_resposta);

      }

      //------------------FIM Criação divs Pergunta Resposta ----------------------


      criaFalaMascote(bt_botoes[questao].fraseMascote);

      sc_pergunta.animate({
        'opacity': '1'
      }, 500);
      sc_numero.animate({
        'opacity': '1'
      }, 500);
      sc_falaMascote.animate({
        'opacity': '1'
      }, 500);
      sc_bloqueio.fadeOut();
    };

    montaProva(questao, true);

    function criaFalaMascote(fraseMascote) {

      //-----------------------criação balao mascote --------------------------

      var dv_balao_mascote = $('<div>') //parte onde o balao do mascote
      .addClass('bold')
        .addClass('arredondado')
        .css({
          position: 'absolute',
          width: sc_falaMascote.width() - 15,
          height: sc_falaMascote.height() - 130,
          color: '#999',
          marginLeft: 5,
          marginTop: 20,
          textAlign: 'center',
          border: '2px solid #CCC'
        })
        .appendTo(sc_falaMascote);

      dv_balao_mascote.peBalao({
        top: 195,
        left: 20,
        scaleX: 2,
        scaleY: -2,
        borda: '#CCC',
      });

      var dv_texto_balao_centralizado = $('<div>')
        .attr('id', 'falaMascote')
        .css({
          position: 'relative',
          width: dv_balao_mascote.width(),
          height: dv_balao_mascote.height(),
          display: 'table-cell',
          verticalAlign: 'middle',
          marginRight: '5px'
        })
        .html(fraseMascote)
        .appendTo(dv_balao_mascote);
      //-----------------------FIM criação balao mascote --------------------------
    }



    //------------------------------- Funções Mouse------------------------------

    function dentroMouse() {

      $(this).css({
        fontSize: '50px',
        color: '#9c0'
      });

    }

    function foraMouse() {
      $(this).css({
        fontSize: '30px',
        color: '#999'
      });
    }

    function clickMouse() {
      sc_bloqueio.fadeIn();
      var clique = $(this).attr('alternativa');
      var correta = $(this).attr('data-correta');
      btns_clicados.push([clique, correta]);
      $('#clicado' + questao).html($(this).html());

      apagaQuadro();
    }

    function apagaQuadro() {

      questao++;
      sc_pergunta.find('div').fadeOut();
      sc_numero.find('div').fadeOut();
      sc_falaMascote.find('div').fadeOut(500, function() {});

      setTimeout(function() {
        sc_pergunta.find('div').remove();
        sc_numero.find('div').remove();
        sc_falaMascote.find('div').remove();
        sc_pergunta.css('opacity', '0');
        sc_numero.css('opacity', '0');
        sc_falaMascote.css('opacity', '0');
        if (questao == bt_botoes.length)
          montaFinal();
        else
          montaProva(questao, true);
      }, 500);
    }

    //------------------------------FIM Funções Mouse -----------------------------

    //------------------------------- Funções final -------------------------------

    function montaFinal() {

      for (var i = 0; i < bt_botoes.length; i++) {
        bt_botoes[i].fraseMascote = "Hora da revisão";
      }

      var dv_final_centraliza = $('<div>')
        .css({
          position: 'relative',
          width: sc_final.width(),
          height: sc_final.height(),
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center'
        })
        .appendTo(sc_final);

      var finalParte2 = function() {

        dv_final_centraliza.find('div').fadeOut();
        sc_falaMascote.find('div').fadeOut();


        setTimeout(function() {

          sc_falaMascote.css('opacity', '0');
          var dv_frase_final2 = $('<div>')
            .addClass('bold')
            .css({
              color: '#557641',
              fontStyle: 'italic',
              fontSize: '22px',
              marginBottom: '5px',
              width: 400,
              textAlign: 'left',
              display: 'inline-table',
              opacity: '0'

            })
            .html("Verifique suas respostas na lista abaixo.<br>Vamos revisar todo o seu teste ?")
            .appendTo(dv_final_centraliza);

          var dv_avanca_final2 = $('<div>')
            .addClass('bold')
            .css({
              color: '#9c0',
              textAlign: 'center',
              fontSize: '16px',
              marginLeft: '45px',
              cursor: 'pointer',
              opacity: '0'
            })
            .click(revisao)
            .html("<i id='repeat' class='fa fa-repeat' style='font-size:22px; padding-right:10px'></i>Clique aqui para revisar o seu teste.")
            .appendTo(dv_final_centraliza);

          require(["../../canvas/objetos/animaCerto", "../../canvas/objetos/animaErrado"], function(certo, errado) {

            for (var i = 0; i < btns_clicados.length; i++) {

              if (btns_clicados[i][1] == 'true') {

                mascote = new certo.animaCerto({
                  cor: '#0060B6'
                });

                mascote.obj.css({
                  width: '19px',
                  top: '-15px'
                }).appendTo($('#vistoNum' + i));
                mascote.play();

                //$('#vistoNum'+i).html('T');
                certos++;
              } else {

                mascote = new errado.animaErrado({
                  cor: '#F00'
                });
                mascote.obj.css({
                  width: '19px',
                  top: '-12px'
                }).appendTo($('#vistoNum' + i));
                mascote.play();
              }

            }

            var porcentagem = Math.floor((certos * 100) / btns_clicados.length);
            dv_barra_porcentagem_dentro.css('width', porcentagem + '%');
            dv_num_porcentagem.html(porcentagem + '%');


          });

          dv_frase_final2.css({
            opacity: '1'
          }, 500);
          dv_avanca_final2.css({
            opacity: '1'
          }, 500);

        }, 500);


        //animação do repeat fazer com o estilo css do loading

        sc_falaMascote.find('div').remove();


        criaFalaMascote("confira suas respostas <br><br>certa<br><br>errada<br><br>Agora vamos revisar todo seu teste.");

        $('<img>')
          .attr('src', '../wilib/img/svg/visto_correto.svg')
          .attr('width', '25px')
          .css({
            position: 'absolute',
            top: '45px',
            left: '35px'
          })
          .appendTo($('#falaMascote'));

        $('<img>')
          .attr('src', '../wilib/img/svg/errado2.svg')
          .attr('width', '25px')
          .css({
            position: 'absolute',
            top: '85px',
            left: '35px'
          })
          .appendTo($('#falaMascote'));


        sc_falaMascote.animate({
          opacity: 1
        }, 500);

      };

      var dv_frase_final = $('<div>')
        .addClass('bold')
        .css({
          color: '#557641',
          textAlign: 'center',
          fontStyle: 'italic',
          fontSize: '22px',
          marginBottom: '5px'
        })
        .html("Vamos corrigir as respostas?")
        .appendTo(dv_final_centraliza);

      var dv_avanca_final = $('<div>')
        .addClass('bold')
        .css({
          color: '#9c0',
          textAlign: 'center',
          fontSize: '16px',
          marginLeft: '45px',
          cursor: 'pointer'
        })
        .click(finalParte2)
        .html("Clique aqui para corrigir o seu teste.")
        .appendTo(dv_final_centraliza);

      var dv_seta_final = $('<div>')
        .attr('id', 'seta')
        .css({
          position: 'absolute',
          left: '170px',
          top: '157px',
          'border-color': ' transparent transparent transparent #9c0',
          'border-width': '11px',
          'border-style': 'solid'
        })
        .appendTo(dv_avanca_final);

      criaFalaMascote("Parabéns você respondeu todas as perguntas. <br><br> Agora vamos corrigi-las?");
      sc_falaMascote.animate({
        opacity: 1
      }, 500);
      sc_final.fadeIn();
      sc_bloqueio.fadeOut();

    }

    function revisao() {
      questao = 0;
      sc_final.fadeOut();
      sc_pergunta.find('div').fadeOut();
      sc_numero.find('div').fadeOut();
      sc_falaMascote.find('div').fadeOut(500, function() {});

      setTimeout(function() {
        sc_pergunta.find('div').remove();
        sc_numero.find('div').remove();
        sc_falaMascote.find('div').remove();
        sc_pergunta.css('opacity', '0');
        sc_numero.css('opacity', '0');
        sc_falaMascote.css('opacity', '0');


        dv_triangulo.css('border-color', ' transparent transparent transparent #9c0');
        dv_prosseguir_texto.css('color', '#9c0');
        dv_prosseguir_centralizado
          .css({
            'cursor': 'pointer',
            zIndex: 2
          })
          .click(prosseguirResultadoClique);

        montaProva(questao, false);
        prosseguirResultado();
        //if (questao == bt_botoes.length)
        // montaFinal();
        // else
        //     montaProva(questao, true);
      }, 500);

    }

    function prosseguirResultadoClique() {
      questao++;
      sc_bloqueio.fadeIn();
      sc_pergunta.find('div').fadeOut();
      sc_numero.find('div').fadeOut();
      sc_falaMascote.find('div').fadeOut(500, function() {});

      setTimeout(function() {
        sc_pergunta.find('div').remove();
        sc_numero.find('div').remove();
        sc_falaMascote.find('div').remove();
        sc_pergunta.css('opacity', '0');
        sc_numero.css('opacity', '0');
        sc_falaMascote.css('opacity', '0');
        sc_bloqueio.fadeOut();
        if (questao == bt_botoes.length)
          montaFinalFinal();
        else {
          montaProva(questao, false);
          prosseguirResultado();
        }

      }, 500);

    }

    var finalizacao = function() {
      edi.finalizar();
    };

    function montaFinalFinal() {

      sc_final.find('div').remove();
      sc_final.fadeIn();
      var dv_final_centraliza = $('<div>')
        .css({
          position: 'relative',
          width: sc_final.width(),
          height: sc_final.height(),
          display: 'table-cell',
          verticalAlign: 'middle',
          textAlign: 'center'
        })
        .appendTo(sc_final);
      dv_final_centraliza.find('div').fadeOut();
      sc_falaMascote.find('div').fadeOut();


      setTimeout(function() {

        sc_falaMascote.css('opacity', '0');
        var dv_frase_final2 = $('<div>')
          .addClass('bold')
          .css({
            color: '#557641',
            fontStyle: 'italic',
            fontSize: '22px',
            marginBottom: '5px',
            width: 400,
            textAlign: 'left',
            display: 'inline-table',
            opacity: '0'

          })
          .html("A revisão está concluída")
          .appendTo(dv_final_centraliza);

        var dv_avanca_final2 = $('<div>')
          .addClass('bold')
          .css({
            color: '#9c0',
            textAlign: 'center',
            fontSize: '16px',
            marginLeft: '45px',
            cursor: 'pointer',
            opacity: '0'
          })
          .click(revisao)
          .html("<i id='repeat' class='fa fa-repeat' style='font-size:22px; padding-right:10px'></i>Clique aqui para revisar o seu teste.")
          .appendTo(dv_final_centraliza);
        dv_prosseguir_centralizado.off();

        criaFalaMascote("Parabéns você concluiu o teste.");
        dv_frase_final2.animate({
          opacity: '1'
        }, 500);
        sc_falaMascote.animate({
          opacity: '1'
        }, 500);
        dv_avanca_final2.animate({
          opacity: '1'
        }, 500);
        sc_falaMascote.animate({
          opacity: '1'
        }, 500);
        sc_falaMascote.fadeIn();
        finalizacao();
        finalizacao = function() {};
      }, 500);
    }

    function prosseguirResultado() {
      var img;
      if (btns_clicados[questao][1] == 'true') {
        img = "../../canvas/objetos/animaCerto";
        //edi.objetivos.unshift(1);

        require([img], function(canvas) {
          mascote = new canvas.animaCerto({
            cor: '#0060B6'
          });
          mascote.obj.css({
            top: '4px',
            left: '17px',
          })
            .appendTo($('#visto' + btns_clicados[questao][0]));
          mascote.play();
        });
        //edi.acertos.push(_this);

      } else {
        img = "../../canvas/objetos/animaErrado";

        require([img], function(canvas) {
          mascote = new canvas.animaErrado({
            cor: '#F00'
          });
          mascote.obj.css({
            top: '10px',
            left: '20px',
          }).appendTo($('#visto' + btns_clicados[questao][0]));
          mascote.play();
        });


        var dv_fica_seta = $('<div>')
          .css({
            position: 'absolute',
            top: '3px',
            left: 0
          })
          .appendTo($('.visto[data-correta="true"]'));

        $('<i>')
          .addClass('fa fa-arrow-right')
          .css({
            fontSize: '47px',
            color: '#0060B6'
          })
          .appendTo(dv_fica_seta);

        (function loopSeta() {
          dv_fica_seta.animate({
              left: '18px',
            },
            1000, function() {
              dv_fica_seta.animate({
                left: '0px'
              }, 1000, loopSeta);
              /* stuff to do after animation is complete */
            });
        })();

      }
    }

    //------------------------------FIM Funções final -----------------------------

    var pathMascote = "../../canvas/objetos/mascoteTeste";

    require([pathMascote], function(canvas) {
      mascote = new canvas.mascote();
      mascote.obj.css({
        left: 630,
        top: 237
      }).appendTo('#conteudo').transition({
        scale: -1.5
      });
      mascote.play();
    });

    ARR_TAREFAS[tarefaAlterBtn].resolve(config.cb);

    return {
      container: sc_numero
    };
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    alternativa_botao: _init,
    telaAtual: edi.util.getURL('quest')
  };

});