define(function(require) {
	var tarefaalternativa_select = addTarefa();
	var edi = require('../lib/edi'), //requisitando o EDI
		_configEDI = null;

	function _setConfig(config) { //setando as configurações do EDI
		_configEDI = config;
	}

	function _init(texto, alternativas, callBack, callBackFinal, settings) {
		edi.iniciar(_configEDI); //montar o palco

		var peca = this,
			_texto = texto,
			_objt = alternativas.length,
			finalizada = false;

		//config padrão
		var config = {
			width: 680,
			height: 200,
			textAlign: 'center',
			fontSize: 25,
			position: 'absolute',
			left: 50,
			top: 130,
			lineHeight: 1,
			salvarDados: true
		};

		//mesclando configurações
		if (settings) $.extend(config, settings);

		//criando sessão principal
		var $alterSelect = $('<section>')
			.addClass('alter-select')
			.attr('data-edi', 'alternativa_select')
			.css(config)
			.appendTo('#conteudo');

		//montando estrutura dos selects
		if (config.salvarDados && sessionStorage.getItem('dadosAlterSelect')) {
			_texto = sessionStorage.getItem('dadosAlterSelect');
		}

		alternativas.forEach(function(obj, i) {
			var $select = '<span class="alter-select-tag" id="alter-select-tag-' + i + '" data-correta="' + obj.opcaoCorreta + '">';
			$select += '<ul>';
			//montando estrutura de options
			obj.opcoes.forEach(function(obj, j) {
				var $option = '\n<li class="alter-option-tag" id="alter-option-tag-' + j + '" value="' + obj + '">' + obj + '</li>';
				$select += $option;
			});

			//fechando a tag select
			$select += '\n</ul>';
			$select += '\n</span>';

			//modificando texto
			_texto = _texto.replace('{' + i + '}', $select);
			_texto = _texto.replace('<span class="errou" id="alter-select-tag-' + i + '"></span>', $select);

			//atribuindo o novo texto à peça
			$alterSelect.html(_texto);
		});

		//adicionando objetivos
		$('.alter-select-tag').each(function() {
			peca.objetivos.push(0);
			edi.objetivos.push(0);
		});

		$('.alter-select-tag').click(function() {
			$('.alter-select-tag ul').hide();
			$(this).find('ul').toggle();
		});

		//corrigindo
		$('.alter-select-tag ul li').click(function(e) {
			var self = $(this), //referencia ao select
				atr = self.parent().parent().attr('data-correta'), //atributo data-correta
				value = self.html(), // valor para substituir o select
				id = self.parent().parent().attr('id');

			console.log(self, id);

			//decrementando os objetivos
			peca.objetivos.pop();
			edi.objetivos.pop();

			if (value == atr) { //se estiver correto
				//substitua o select por isto
				self.parent().parent().replaceWith('<span class="acertou">' + value + '</span>');

				//setando correto aos objetivos
				edi.objetivos.unshift(1);

				//chamando callback
				if (callBack) callBack(true);
			} else {
				self.parent().parent().replaceWith('<span class="errou" id="' + id + '">' + value + '</span>');

				//setando errado aos objetivos
				edi.objetivos.unshift(2);

				//chamando callback
				if (callBack) callBack(false);
			}

			//salvando os dados sessão
			if (config.salvarDados) {
				sessionStorage.setItem('dadosAlterSelect', $('.alter-select').html().toString());

				//reparando um bug
				if (peca.objetivos.length === 0) {
					var bkpHTML = $('.alter-select').html();
					$('.alter-select .errou').html('');

					sessionStorage.setItem('dadosAlterSelect', $('.alter-select').html().toString());

					//restaurando o backup
					$('.alter-select').html(bkpHTML);
				}
			}

			edi.finalizar();

			var acertos = 0;
			//chamando o callback final
			if (peca.objetivos.length === 0 && callBackFinal) {
				$('.alter-select .acertou').each(function() {
					acertos++;
				});

				if (acertos == _objt) {
					callBackFinal(true);
				} else {
					callBackFinal(false);
				}
			}

			//limpando session storage
			if ($('.alter-select .errou').length === 0) sessionStorage.clear();
		});
		ARR_TAREFAS[tarefaalternativa_select].resolve();
	}

	return {
		objetivos: [],
		setConfig: _setConfig,
		alternativa_select: _init
	};

});