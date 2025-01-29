define(function(require) {
  var tarefaRevela = addTarefa();

  var edi = require('./edi'), //requisitando o EDI
    _configEDI = null;

  function _setConfig(config) { //setando as configurações do EDI
    _configEDI = config;
  }

  function _init(linhas, colunas, palavras, frase, callBack) {
    edi.iniciar(_configEDI); //montar o palco

    var peca = this;
    var objPalavras = [];
    var tentaNovamente = false;
    var linha = [];

    var i, j, deuCerto, tentativa, auxLinha, auxColuna, o, aux;

    var addClique = function(_this) {
      _this.click(function() {
        for (z = 0; z < objPalavras.length; z++) {

          for (x = 0; x < objPalavras[z].pontos.length; x++) {
            if (objPalavras[z].pontos[x].x == $(this).attr('x') && objPalavras[z].pontos[x].y == $(this).attr('y')) {
              mostrarPalavra(objPalavras[z]);
            }
          }
        }
      });
    };

    var addFilter = function(_this, posy){
      _this.filter('[y="' + posy + '"]')
      .fadeOut(300, function() {
        $(this).css('color', '#f8e13a').fadeIn().off();
      }).off();
    };

    palavras.forEach(function(data) {
      edi.objetivos.push(0);
      peca.objetivos.push(0);
    });


    //tentar montar o caça palavras, pode ser que nao de certo ai ele tenta dnovo =)
    do {
      objPalavras = [];
      tentaNovamente = false;

      linha = [];

      for (i = 0; i < linhas; i++) {
        linha[i] = {};
        linha[i].coluna = [];

        for (j = 0; j < colunas; j++) {
          //linha[i].coluna[j] = String.fromCharCode(65 + Math.floor(Math.random()*26));
          linha[i].coluna[j] = '*';

        }

      }

      var qtdHorizontais = Math.floor(palavras.length / 2) + Math.floor(palavras.length % 2);
      var qtdVerticais = Math.floor(palavras.length / 2);

      //colocando as palavras verticais
      for (i = 0; i < qtdVerticais; i++) {

        deuCerto = false;
        tentativa = 0;
        while (!deuCerto && tentativa <= 100) {

          auxLinha = 0;
          auxColuna = 0;

          //seta valores randomicos para linha e coluna que vai iniciar a palavra
          auxLinha = Math.floor(Math.random() * (linhas - palavras[i].length + 1));
          auxColuna = Math.floor(Math.random() * colunas);
          auxLinha2 = auxLinha;

          for (j = 0; j < palavras[i].length; j++) {

            if (linha[auxLinha].coluna[auxColuna] != '*' && linha[auxLinha].coluna[auxColuna] != palavras[i].charAt(j)) {
              deuCerto = false;
              break;
            }
            if (j + 1 == palavras[i].length) {
              deuCerto = true;
            }
            auxLinha++;

          }

          if (deuCerto) {

            //cria um objeto palavra pra ser adicionado ao conjunto de palavras com os pontos
            o = {
              palavra: palavras[i],
              pontos: []
            };

            for (j = 0; j < palavras[i].length; j++) {

              o.pontos.push({
                x: auxColuna,
                y: auxLinha2
              });

              linha[auxLinha2].coluna[auxColuna] = palavras[i].charAt(j);

              auxLinha2++;

            }


            objPalavras.push(o);
          }

          tentativa++;

        }

      }

      //colocando as palavras horizontais
      for (i = qtdVerticais; i < palavras.length; i++) {

        deuCerto = false;
        tentativa = 0;
        while (!deuCerto && tentativa <= 100) {
          if (tentativa > 90) {

            console.log(tentativa);
            tentaNovamente = true;
            break;
          }


          auxLinha = 0;
          auxColuna = 0;

          //seta valores randomicos para linha e coluna que vai iniciar a palavra
          auxLinha = Math.floor(Math.random() * linhas);
          auxColuna = Math.floor(Math.random() * (colunas - palavras[i].length + 1));
          auxColuna2 = auxColuna;

          for (j = 0; j < palavras[i].length; j++) {

            if (linha[auxLinha].coluna[auxColuna] != '*' && linha[auxLinha].coluna[auxColuna] != palavras[i].charAt(j)) {
              deuCerto = false;
              break;
            }
            if (j + 1 == palavras[i].length) {
              deuCerto = true;
            }
            auxColuna++;

          }

          //se deu tudo certo ele adiciona a palavra ao array de objetos de palavras
          if (deuCerto) {
            //cria um objeto palavra pra ser adicionado ao conjunto de palavras com os pontos
            o = {
              palavra: palavras[i],
              pontos: []
            };

            for (j = 0; j < palavras[i].length; j++) {

              o.pontos.push({
                x: auxColuna2,
                y: auxLinha
              });

              linha[auxLinha].coluna[auxColuna2] = palavras[i].charAt(j);

              auxColuna2++;

            }

            objPalavras.push(o);

          }

          tentativa++;

        }

      }


    } while (tentaNovamente);

    //console.log(JSON.stringify(objPalavras));
    //Inicio da criacao dos elementos na tela
    var altura = 300;
    var largura = 400;

    for (i = 0; i < objPalavras.length; i++) {
      aux = '';
      for (j = 0; j < objPalavras[i].palavra.length; j++) {
        aux += '_';
      }
      frase = frase.replace('{' + i + '}', '<div class="palavras palavra' + i + '" style="display:inline-block;" banco_id=\'' + i + '\' palavra=\'' + objPalavras[i].palavra + '\'>' + aux + '</div>');

    }

    var frase_div = $('<div>')
      .css('width', (670 - largura - colunas) + 'px')
      .css('height', altura + 'px')
      .css('position', 'absolute')
      .css('text-align', 'center')
      .css('color', '#666')
      .css('top', '100px')
      .css('left', '30px')
      .css('font-size', '15px')
      .addClass('box2 centraliza-vertical texto')
      .appendTo($('#conteudo'));

    var frase_div2 = $('<div>')
      .addClass('centraliza-vertical2')
      .appendTo(frase_div);

    var frase_div3 = $('<div>')
      .attr({
        id: 'frase'
      })
      .addClass('centraliza-vertical3')
      .html(frase)
      .appendTo(frase_div2);

    var caca_palavras_div = $('<div>')
      .css('width', (largura + colunas) + 'px')
      .css('height', altura + 'px')
      .css('position', 'absolute')
      .css('top', '68px')
      .css('right', '30px')
      .css('background-color', '#7ea6d7')
      .css('color', '#fff')
      .css('padding', '7px 0 7px 15px')
      .addClass('caca-palavras')
      .addClass('box2')
      .addClass('borda-cinza')
      .addClass('arredondado')
      .appendTo($('#conteudo'));

    for (i = 0; i < linhas; i++) {
      aux = '';

      for (j = 0; j < colunas; j++) {
        var dv = $('<div>')
          .html((linha[i].coluna[j] != '*') ? linha[i].coluna[j] : String.fromCharCode(65 + Math.floor(Math.random() * 26)))
          .css('width', (largura / colunas) + 'px')
          .css('height', (altura / linhas) + 'px')
          .css('text-transform', 'uppercase')
          .css('display', 'inline-block')
          .css('cursor', 'pointer')
          .css('text-align', 'center')
          .attr('x', j)
          .attr('y', i)
          .appendTo(caca_palavras_div);

        addClique(dv);

        aux += linha[i].coluna[j] + ' ';

      }

    }

    function mostrarPalavra(palavra) {

      for (i = 0; i < palavra.pontos.length; i++) {
        addFilter($('div[x="' + palavra.pontos[i].x + '"]'), palavra.pontos[i].y);
      }

      $('div[palavra="' + palavra.palavra + '"]').fadeTo(300, 0.01, function() {

        $(this).html(palavra.palavra).css('color', '#7ea6d7').fadeTo(300, 1);
      });
      edi.objetivos.unshift(1);

      peca.objetivos.pop();
      edi.objetivos.pop();

      edi.finalizar();

      if (callBack && peca.objetivos.length === 0) {
        callBack();

      }
    }

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    caca_palavras: _init
  };

});