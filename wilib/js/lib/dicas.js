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

		var config = {
            fontSize: 13,
            lineHeight: 1.3,
            color: '#666',
            tempoFinalizar: 3000
		};

		if (settings) {
			$.extend(config, settings);
		}

        //container principal
        var $dicas = $('<section>')
            .addClass('dicas')
            .attr('data-edi', 'dicas')
            .appendTo('#conteudo');

        //criando balão de conteudo
        var $balao = $('<div>')
            .addClass('dicas-balao')
            .appendTo($dicas);

        //criando mascote
        var $mascote = $('<img>')
            .attr({
                'src': '../wilib/img/svg/mascote_lendo.svg',
                'id': 'mascote'
            })
            .css({
                width: 150,
                position: 'absolute',
                left: 110,
                top: 260
            })
            .appendTo($dicas);

        //criando box de texto
        var $texto = $('<div>')
            .addClass('balao-texto')
            .html('<p>'+dica+'</p>')
            .css({
                fontSize: config.fontSize,
                lineHeight: config.lineHeight,
                color: config.color
            }).appendTo($balao);

        //criando e startando animação do ícone
        require(['../../canvas/objetos/animaDicas'], function (canvas) {
            canvas.obj.css({
                top: 48,
                left: 40
            }).appendTo($balao);
            canvas.play();
        });

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
		dicas: _init
	};

});
