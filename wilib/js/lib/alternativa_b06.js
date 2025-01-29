define(function(require) {
    var tarefaAlterBtn = addTarefa();
    var edi = require('../lib/edi'), //requisitando o EDI
        _configEDI = null;

    function _setConfig(config) { //setando as configurações do EDI
        _configEDI = config;
    }

    function _popup(msg, opt) {
        edi.util.popUp(msg, opt);
    }

    function _init(bt_botoes, callback, callbackFinal, settings) {
        edi.iniciar(_configEDI); //montar o palco
        peca = this;

        var config = {
            width: 176,
            height: 38,
            margin: '0px 13px 10px 10px',
            left: 0,
            top: 73
        };

        if (settings) {
            $.extend(config, settings);
        }


        var sc_ficaBotao = $('<section>')
            .attr('id', 'ficaBotoes')
            .attr('data-edi', 'alternativa_botao')
            .css({
                position: 'absolute',
                top: config.top,
                left: config.left,
                width: (config.width + 23) * 4, // 23 é da margin-left
                height: 315,
            }).appendTo('#conteudo');

        var sc_centralizaBotoes = $('<div>')
            .css({
                position: 'relative',
                display: 'table-cell',
                verticalAlign: 'middle',
                textAlign: 'center',
                width: sc_ficaBotao.width(),
                height: 315,
            })
            .appendTo(sc_ficaBotao);

        var mouseCima = function() {
            $(this).css('border', '1px solid #CCC');
        };

        var mouseFora = function() {
            $(this).css('border', '0px solid #CCC');
        };

        //criando os botoes

        var par = true;
        var aux = 0;

        for (var i = 0; i < bt_botoes.length; i++) {

            if (bt_botoes[i].dataCorreta) {
                edi.objetivos.push(0);
                this.objetivos.push(0);
            }

            var dv_botoes = $('<div>')
                .attr('id', 'btn' + i)
                .css({
                    position: 'relative',
                    display: 'inline-block',
                    width: config.width,
                    height: config.height,
                    margin: config.margin,
                    textAlign: 'center',
                })
                .appendTo(sc_centralizaBotoes);

            if ((i + 1) % 7 === 0 && i !== 0)
                $('<br>').appendTo(sc_centralizaBotoes);

            var dv_centralizaBotoes = $('<div>')
                .attr('id', 'botoes'+i)
                .attr('data-correta', bt_botoes[i].dataCorreta)
                .addClass('botoes')
                .css({
                    position: 'relative',
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    height: config.height,
                    width: config.width,
                    color: '#999',
                    cursor: 'pointer'
                })
                .mouseover(mouseCima)
                .mouseout(mouseFora)
                .click(handlerBtnClick)
                .html(bt_botoes[i].texto)
                .appendTo(dv_botoes);
        }

        if(!!edi.util.getURL('acertos')){
            var acertos = edi.util.getURL('acertos').split(',');
            acertos.forEach(function(entra){
                $('#'+entra).click().off();
            });    
        }
        

        //tratamento do click no botao
        function handlerBtnClick(e) {
            e.stopPropagation();
            $(this).css('border', '0px solid #CCC');

            var _this = $(this);

            if (peca.objetivos.length) {
                edi.objetivos.pop();
            }

            peca.objetivos.pop();
            if (_this.attr('data-correta') == 'true') {
                edi.objetivos.unshift(1);
                _this.css('color', '#0060B6');
                edi.acertos.push(_this.attr('id'));
                //callback
                if (callback) callback(true, _this);
            } else {
                edi.objetivos.unshift(2);
                _this.css('color', '#F00');
                //callback
                if (callback) callback(false, _this);
            }

            if (!peca.objetivos.length && edi.objetivos.indexOf(2) >= 0) {
                if (callbackFinal) callbackFinal(false);
                edi.objetivos = [2];
                $('.botoes').off();
                
            } else if (!peca.objetivos.length && edi.objetivos.indexOf(2) < 0) {
                if (callbackFinal) callbackFinal(true);
                $('.botoes').off();
            }

            //if (config.finalizar) {
                edi.finalizar();
            //}

        }

        function WiQuadroInteraction(element, result) {
            if ( !! WIQUADRO) Wiquadro.api.addInteration(INTERACAO_CLICK, element.id, result);
        }

        ARR_TAREFAS[tarefaAlterBtn].resolve(config.cb);

        return {
            container: sc_ficaBotao
        };
    }

    return {
        objetivos: [],
        setConfig: _setConfig,
        alternativa_b06: _init,
        telaAtual: edi.util.getURL('quest'),
        popup: _popup
    };

});