define(function (require) {
  "use strict";

  var tarefaArrastaBola = addTarefa();

  var arrastaMod = require('../lib/arrasta');

	var edi = require('../lib/edi'),//requisitando o EDI
		_configEDI = null;

	function _setConfig (config) {//setando as configurações do EDI
		_configEDI = config;
	}

	function _init (bolas, cb, opt, cbFinal) {
		edi.iniciar(_configEDI);//montar o palco

		var finalizada = false;
    var bolinhas = [];

    // add objetivos
    var objetivos = [];
    bolas.forEach(function(data, i) {
      objetivos.push([]);
      for(var j=0; j < data.qtd; j++) {
        objetivos[i].push(0);
      }
    });

		var config = {
      arrasta: {
        width: 375,
        height: 85,
        left: 130,
        top: 20,
        padding: '10px 40px'
      },
      alvo: {
        width: 300,
        height: 300,
        left: 130,
        top: 150        
      },
      tamanhoBolas: 27,
      margin: '7.5px 4px',
      animacao: false,
      embaralhar: true,
      mascara: true
		};

		if (opt) {
			$.extend(config, opt);
		}

    var $arrastaB = $('<section>')
      .addClass('arrasta-bola')
      .attr('data-edi', 'arrasta-bola')
      .css({
        width: 790,
        height: 315,
        position: 'absolute'
      })
      .appendTo('#conteudo');

    var $topo = $('<div>')
      .addClass('arrasta-bola-topo')
      .css({
        minHeight: 100,
        position: 'relative'
      })
      .appendTo($arrastaB);

    var $topoInner = $('<div>')
      .addClass('topo-inner')
      .css({
        width: config.arrasta.width,
        height: config.arrasta.height,
        padding: config.arrasta.padding,
        display: 'block',
        borderRadius: 10,
        position: 'absolute',
        left: config.arrasta.left,
        top: config.arrasta.top,
        background: 'linear-gradient(to bottom, #fff, #eee)',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
      })
      .appendTo($topo);

    var $alvos = $('<div>')
      .addClass('alvos')
      .css({
        position: 'absolute',
        left: config.alvo.left,
        top: config.alvo.top,
      })
      .appendTo($arrastaB);

    var $alvosLateral = $('<div>')
      .addClass('alvos-lateral')
      .css({
        background: 'linear-gradient(#fff, #eee)',
        position: 'absolute',
        left: 0,
        top: 0,
        borderRadius: 10,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
      })
      .appendTo($alvos);

    var $alvosAlvos = $('<div>')
      .css({
        background: 'linear-gradient(#fff, #eee)',
        position: 'absolute',
        left: 14 + config.tamanhoBolas,
        top: 5,
        width: config.alvo.width,
        borderLeft: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
      })
      .appendTo($alvos);

    bolas.forEach(function(data, i){
      $(data).attr('data-correta', i);

      // criando as bolinhas
      for(var j=0; j < data.qtd; j++) {
        bolinhas.push({
          dataCorreta: i,
          cor: data.cor,
          img: data.img
        });
      }

      var $alvoRef = $('<div>')
        .addClass('alvo-ref mascara')
        .css({
          width: config.tamanhoBolas,
          height: config.tamanhoBolas,
          background: data.cor,
          borderRadius: '50%',
          margin: config.margin,
          border: '3px solid #fff',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
          position: 'relative'
        })
        .appendTo($alvosLateral);

      if (data.img) { // se houver imagem
        $alvoRef.css({
          background: 'url(' + data.img + ') no-repeat center, #fff',
          backgroundSize: '100% 100%'
        });
      }

      var $alvosAlvosInner = $('<div>')
        .addClass('alvo-alvo-inner')
        .css({
          width: config.alvo.width,
          display: 'block',
          float: 'left',
          position: 'relative'
        })
        .appendTo($alvosAlvos);

      for(var l=0; l < data.qtd; l++) {
        $('<div>')
          .addClass('alvo')
          .attr('data-correta', i)
          .css({
            width: config.tamanhoBolas + 3,
            height: config.tamanhoBolas + 3,
            float: 'left',
            border: '1px solid #ccc',
            margin: 4,
            borderRadius: '50%',
            display: 'inline-block'
          })
          .appendTo($alvosAlvosInner);
      }
    });

    // embaralhando as bolinhas
    if (config.embaralhar) {
      bolinhas.sort(function() {
        return 0.5 - Math.random();
      });     
    }

    // instanciando as bolinhas
    bolinhas.forEach(function(data) {
      var $bolinha = $('<div>')
        .addClass('bolinha arrasta mascara')
        .attr({
          'data-correta': data.dataCorreta,
          'data-cor': data.cor,
          'data-img': data.img
        })
        .css({
          width: config.tamanhoBolas,
          height: config.tamanhoBolas,
          background: 'linear-gradient(to bottom, #999, #666)',
          border: '3px solid #fff',
          boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
          float: 'left',
          borderRadius: '50%',
          margin: 2,
          cursor: 'pointer'
        })
        .appendTo($topoInner)
        .mouseenter(function(){
          if (data.img) {
            $(this).css({
              background: 'url(' + data.img + ') no-repeat center, #fff',
              backgroundSize: '100% 100%'
            });
          } else {
            $(this).css('background', $(this).attr('data-cor'));
          }
        })
        .mouseleave(function(){
          $(this).css('background', 'linear-gradient(to bottom, #999, #666)');
        });
    });


    // chamando módulo arrasta.js
    arrastaMod.arrasta('arrasta', 'alvo', function(a, b, c) {
      b.css({
        background: b.attr('data-cor'),
        left: -3,
        top: -3
      }).off();

      if (b.attr('data-img')) {
        b.css({
          background: 'url(' + b.attr('data-img') + ') no-repeat center #fff',
          backgroundSize: '100% 100%'
        });
      }

      if(a) {
        objetivos[b.attr('data-correta')].pop();
      }

      if(objetivos[b.attr('data-correta')].length === 0) {
        bolas[b.attr('data-correta')].cb(a);
      }

      if(config.animacao && objetivos[b.attr('data-correta')].length === 0) {
        var $animBox = $('<div>')
          .addClass('anim')
          .css({
            width: 30,
            height: 30,
            position: 'absolute',
            left: config.alvo.width + 20,
            top: 5,
            borderRadius: 5,
            background: 'linear-gradient(#fff, #eee)',
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.3)',
            display: 'none'
          })
          .appendTo(c.parent())
          .fadeIn();

        $('<span>')
          .css({
            width: 20,
            borderTop: '1px solid rgba(0, 0, 0, 0.2)',
            position: 'absolute',
            left: -20,
            top: 14
          })
          .appendTo($animBox);

        var img = "../../canvas/objetos/animaCerto";
        require([img], function (canvas) {
            var mascote = new canvas.animaCerto({
                width: 25,
                cor: '#037CC2'
            });
            mascote.obj.css({
                top: 3,
                left: 2
            }).appendTo($animBox);
            mascote.play();
        });
      }

    }, function() {
      var a = true;
      edi.objetivos.forEach(function (data) {
        if (data != 1) a = false;
      });

      if(cb) cb(a);
      if(cbFinal) cbFinal(a);
    });

    // adicionando a mascara
    if (config.mascara) {
      $('<div>')
      .css({
        width: '93%',
        height: '93%',
        position: 'absolute',
        left: 1,
        top: 1,
        borderRadius: '50%',
        background: 'linear-gradient(to bottom, rgba(225, 225, 225, 0.7), rgba(225, 225, 225, 0))'
      })
      .appendTo('.mascara');
    }

    ARR_TAREFAS[tarefaArrastaBola].resolve();
	}

	return {
		objetivos: [],
		setConfig: _setConfig,
		arrastaBola: _init
	};

});
