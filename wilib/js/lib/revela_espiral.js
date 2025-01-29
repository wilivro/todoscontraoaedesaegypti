define(function (require) {
  var tarefaRevela = addTarefa();

  var edi = require('../lib/edi'),//requisitando o EDI
    _configEDI = null;

  function _setConfig(config) {//setando as configurações do EDI
    _configEDI = config;
  }

  function _init(texto, palavra, settings) {
    edi.iniciar(_configEDI);//montar o palco

    var config = {};

    if (settings) {
      $.extend(config, settings);
    }

//--------------------------container geral------------------------------
    var $conteudo = $('#conteudo');

    $conteudo.css('background-Color', '#000');
    var containerGeral = $('<section>')
      .css({
        position: 'absolute',
        width: 788,
        height: 330,
        top: 80,
        textAlign: 'center',
        left: ($conteudo.width() - 788) / 2
      })
      .appendTo('#conteudo');

//----------------transforamando as palvras em tracinhos no texto----------------

    var dv_ficaPalavras = $('<div>')
      .attr('id', 'ficaPalavras')
      .css({
        position: 'absolute',
        top: (containerGeral.height() - 40) / 2,
        left: (containerGeral.width() - 20) / 2,
        width: 20,
        height: 20,
        textAlign: 'center',
        backgroundColor: edi.util.corAleatoria()
      })
      .appendTo(containerGeral);

    for (var i = 0; i < palavra.length; i++) {
      var aux = '';
      for (var j = 0; j < palavra[i].length; j++) {
        aux += '_';
      }

      var dv_palavras = $('<div>')
        .addClass('palavras')
        .attr('id', 'palavra' + i)
        .attr('data-palavra', palavra[i])
        .css({
          position: 'absolute',
          textAlign: 'center',
          color: '#FFF'
        })
        .appendTo(dv_ficaPalavras)
        .html(palavra[i]);

      //console.log((dv_ficaPalavras.width()-dv_palavras.width())/2)

      dv_palavras
        .css('left', (dv_ficaPalavras.width() - dv_palavras.width()) / 2);


      texto = texto.replace('{' + i + '}', '<div id="palavraNoTexto' + i + '" class="noTexto" style="display:inline-block;" data-palavraTexto=\'' + palavra[i] + '\'>' + aux + '</div>');

    }

    $('<div>')
      .css({
        position: 'absolute',
        width: 641,
        top: 180,
        textAlign: 'center',
        left: (containerGeral.width() - 641) / 2,
        lineHeight: '27px',
        color: '#FFF',
        fontSize: '17px'

        //backgroundColor: edi.util.corAleatoria()
      })
      .html(texto)
      .appendTo(containerGeral);

    var cont = 0;
    var animacaoEspiral;

    $('.noTexto').each(function (index) {

      var posy = (($(this).offset().top - $(containerGeral).offset().top) + $(this).height() / 2) - 1;
      var posx = ($(this).offset().left - $(containerGeral).offset().left + $(this).width() / 2) - 1;

      var _x = Math.sin((0 / 180) * Math.PI) * posx;
      var _y = Math.cos((0 / 180) * Math.PI) * posy;


      $('#palavra' + index).attr({
        'posx': _x,
        'posy': _y
      });

      // var dv_ponto = $('<div>')
      //        .attr('id', 'quadrado'+index)
      //    	.css({
      //    		position: 'absolute',
      //    		top: posy,
      //    		left: posx,
      //    		width: 10,
      //    		height: 10,
      //    		backgroundColor: '#9c0'
      //    	})
      //    	.appendTo(containerGeral);
      var dv_ponto = $('<div>')
        .attr('id', 'quadrado' + index)
        .css({
          position: 'absolute',
          top: posy,
          left: posx,
          width: 1,
          height: 1,
          backgroundColor: '#9c0'
        })
        .appendTo(containerGeral);
    });

    function animacaoDoEspiral(self, seuStop) {
      var aX = parseFloat($(self).css('left')) + (parseFloat($(self).css('height')) / 2 );
      var aY = parseFloat($(self).css('top') + (parseFloat($(self).css('width'))) / 2);
      var bX = parseFloat($(seuStop).css('left'));
      var bY = parseFloat($(seuStop).css('top'));

      var raioEspiral = Math.sqrt(Math.pow(Math.abs(aY - bY), 2) + Math.pow(Math.abs(aX - bX), 2));

      fps = 10;
      $("#palavra1").css('top', '2px');

      var x1 = parseFloat($(self).css('left'));
      var y1 = 0;//não pega no chrome aparece NaN-->parseFloat($("#palavra1").css('top'));
      var cont = 0;
      var C = 5;
      var anima = this;
      this.interval = setInterval(function () {

        r = C * Math.exp(0.05 * cont);
        if (r > raioEspiral)
          r = raioEspiral;
        var posEspiralx = ((r * Math.cos(cont)) * -1) + x1;
        var posEspiraly = (r * Math.sin(cont)) + y1;
        //log("X1 = "+x1+" y1 = "+y1+" poxEspiralX = "+posEspiralx+" posEpiraly = "+posEspiraly);
        cont += 0.1;
        $(self).css({
          'left': posEspiralx,
          'top': posEspiraly
        });
        var r1_x = parseFloat($(self).offset().left);
        var r1_y = parseFloat($(self).offset().top);
        var r1_h = parseFloat($(self).height());
        var r1_w = parseFloat($(self).width());
        var r2_x = parseFloat($(seuStop).offset().left);
        var r2_y = parseFloat($(seuStop).offset().top);
        var r2_h = parseFloat($(seuStop).height());
        var r2_w = parseFloat($(seuStop).width());

        colide(r1_x, r1_y, r1_h, r1_w, r2_x, r2_y, r2_h, r2_w, anima.interval);
      }, fps);
      return {
        interval: null
      };
    }

    //$('.noTexto').each(function(index, el) {

    //log($(this).attr('id'));
    var cont2 = 0;
    var umAtrasDoOutro = setInterval(function () {
      var anima = new animacaoDoEspiral($('#palavra' + cont2), $('#quadrado' + cont2));//$('#palavraNoTexto'+cont2));
      cont2++;
      if (cont2 == palavra.length)
        clearInterval(umAtrasDoOutro);
    }, 1000);
    //console.log(anima);
    //});


    //setTimeout(function(){clearInterval(animacaoEspiral)}, 10000);
    function colide(r1_x, r1_y, r1_h, r1_w, r2_x, r2_y, r2_h, r2_w, end) {

      if ((r1_x + r1_w < r2_x || r1_x > r2_x + r2_w) || (r1_y + r1_h < r2_y || r1_y > r2_y + r2_h)) {
        //$('#palavraNoTexto1').css('background-color','#F00');
        return false;
      } else {
        //$('#palavraNoTexto1').css('background-color','#9c0');
        log(end);
        clearInterval(end);
        return true;
      }

    }

    // setInterval(function(){
    //     	$('#palavra'+cont).animate({
    //     		top: $('#palavra'+cont).attr('posy')/2,
    //     		left: $('#palavra'+cont).attr('posx')/2},
    //     		500, function() {
    //     		/* stuff to do after animation is complete */
    //     	});
    //     	cont++;
    //     },1000);

    ARR_TAREFAS[tarefaRevela].resolve();
  }

  return {
    objetivos: [],
    setConfig: _setConfig,
    revela_espiral: _init
  };

});