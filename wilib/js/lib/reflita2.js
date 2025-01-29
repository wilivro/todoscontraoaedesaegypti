define(function (require) {
  "use strict";

  var tarefaRevela = addTarefa();

	var edi = require('../lib/edi'),//requisitando o EDI
		_configEDI = null;

	function _setConfig (config) {//setando as configurações do EDI
		_configEDI = config;
	}

	function _init (dica, callback, settings) {
		edi.iniciar(_configEDI);//montar o palco

		var peca = this;

		var config = {
            fontSize: 13,
            lineHeight: 1.3,
            color: '#666',
            tempoFinalizar: 3000,
            mascote: 0,
            textAlign: 'center'
		}

		if (settings) {
			$.extend(config, settings);
		}

        //container principal
        var $reflita = $('<section>')
            .addClass('reflita')
            .attr('data-edi', 'reflita')
            .appendTo('#conteudo');

        //criando balão de conteudo
        var $balao = $('<div>')
            .addClass('reflita-balao')
            .appendTo($reflita);


        //criando box de texto
        var $texto = $('<div>')
            .addClass('balao-texto')
            .html('<p>'+dica+'</p>')
            .css({
                fontSize: config.fontSize,
                lineHeight: config.lineHeight,
                color: config.color,
                textAlign: config.textAlign
            }).appendTo($balao);

        //criando e startando animação do ícone
        var pathReflita = "../../canvas/objetos/animaReflita";

        require([pathReflita], function (canvas) {
            var anima = new canvas.reflita();
            anima.obj.attr({
              width: 100,
              height: 180
            }).css({
                top: 25,
                left: 40
            }).appendTo($balao);
            anima.play();
        });


        function mascote0 () {
            var pathMascote = "../../canvas/objetos/mascoteIndice";

            require([pathMascote], function (canvas) {
                canvas.obj.css({
                    top: 245,
                    left: 0
                }).appendTo($reflita);
                canvas.play();
            });
        }

        function mascote1 () {
          $('<img>')
            .attr('src', '../wilib/img/svg/mascote_pensando.svg')
            .css({
              width: 50,
              height: 100,
              position: 'absolute',
              left: 82,
              top: 264
            }).appendTo($reflita);
        }

        //escolhendo o mascote
        switch(config.mascote) {
            case 0:// default
                mascote0();
                break;

            case 1:
                mascote1();
                break;
        }

        //chamando finalizar e callback depois do tempo programado
        setTimeout(function () {
            edi.finalizar();
            if (callback) callback();
        }, config.tempoFinalizar);

        ARR_TAREFAS[tarefaRevela].resolve();
	}

	return {
		objetivos: [],
		setConfig: _setConfig,
		reflita2: _init
	};
});
