define(function(require) {
    var tarefaalternativa_img = addTarefa();
    var edi = require('../lib/edi'), //requisitando o EDI
        _configEDI = null;

    function _setConfig(config) { //setando as configurações do EDI
        _configEDI = config;
    }

    function _init(bt_img, cb, cbFinal, settings) {

        //      alert('Modulo em manutenção');

        edi.iniciar(_configEDI); //montar o palco
        peca = this;
        var objectives = 0;

        var config = {
            width: 150,
            left: 125,
            top: 150,
            colunas: 3,
            margin: 5,
            padding: 5,
            display: 'table',
            animacao: true,
            miniIconTop: null,
            embaralhar: false,
            balao: true,
            topIcoCerto: 9,
            leftIcoCerto: 4,
            topIcoErrado: 12,
            leftIcoErrado: 12,
            cb: null
        };

        var textoConfig = {
            width: 90,
            height: 100,
            left: 0,
            top: 80,
            setaLeft: 75,
            fontSize: 12,
            lineHeight: 1,
            pMarginTop: 0,
            balao: {
                top: 0,
                left: 0,
                scaleX: -1,
                scaleY: 1,
                background: '#FFF',
                borda: '#E2E2E2',
                tamanhoBorda: 9,
                rotate: 0
            }
        };

        //corrigindo problema de botoes impares
        if ((bt_img.length % 2 !== 0) && (config.colunas % 2 === 0) && config.colunas > 1) {
            bt_img.push({});
        }

        if (settings) {
            $.extend(config, settings);
        }

        //função para embaralhar o array
        function embaralhar(arr) {
            var indexAtual = arr.length,
                valorTemporaio, indexAleatorio;

            while (0 !== indexAtual) {
                indexAleatorio = Math.floor(Math.random() * indexAtual);
                indexAtual -= 1;

                valorTemporaio = arr[indexAtual];
                arr[indexAtual] = arr[indexAleatorio];
                arr[indexAleatorio] = valorTemporaio;
            }

            return arr;
        }

        //embaralhando
        if (config.embaralhar) bt_img = embaralhar(bt_img);

        //adicionando a box principal ao #conteudo
        var $alterImgMain = $('<section>')
            .addClass('alter-img')
            .attr('data-edi', 'alternativa_img')
            .css({
                position: 'absolute',
                left: config.left,
                top: config.top,
                display: config.display
            }).appendTo('#conteudo');

        //criando os botoes
        var index = 0;
        for (var i = 0; i < config.colunas; i++) {
            if (bt_img[index]) {
                var $alterImgCols = $('<div>')
                    .css({
                        width: config.width / config.colunas,
                        height: config.height,
                        display: 'table',
                        float: 'left'
                    })
                    .addClass('alter-img-cols')
                    .appendTo('.alter-img');

                for (var j = 0; j < bt_img.length / config.colunas; j++) {
                    //mesclando configurações
                    $.extend(textoConfig, bt_img[index].textoConfig);

                    //container
                    var $alterImgContent = $('<div>')
                        .addClass('alter-img-content')
                        .css('margin', config.margin)
                        .appendTo($alterImgCols);

                    //container da img e do mini-icon
                    var $alterImgBox = $('<div>')
                        .addClass('alter-img-box');

                    if (config.imgBoxCSS) $alterImgBox.css(config.imgBoxCSS);

                    if (bt_img[index].src) $alterImgBox.appendTo($alterImgContent);

                    //container do p com o texto
                    var $alterImgTexto = $('<div>')
                        .css(textoConfig)
                        .addClass('alter-img-texto');

                    //appendo do texto
                    if (bt_img[index].texto) {
                        $alterImgTexto.appendTo($alterImgContent);
                        $alterImgTexto.peBalao(textoConfig.balao);
                    }

                    //mini-icon
                    var $miniIcon = $('<span>')
                        .addClass('mini-icon')
                        .css('left', (config.width / 2) - 25);

                    if (config.miniIconCSS) $miniIcon.css(config.miniIconCSS);

                    if (config.miniIconTop) $miniIcon.css('top', config.miniIconTop);
                    if (config.animacao) $miniIcon.appendTo($alterImgBox);

                    var $img = $('<img>');

                    objectives++;

                    if (bt_img[index].dataCorreta) {
                        edi.objetivos.push(0);
                        this.objetivos.push(0);
                    }

                    if (bt_img[index].src) {
                        $img.css({
                            width: config.width,
                            height: config.height,
                            margin: config.margin,
                            padding: config.padding,
                            lineHeight: config.lineHeight,
                            position: 'relative'
                        })
                            .addClass('img')
                            .attr({                                
                                'src': bt_img[index].src,
                                'data-correta': bt_img[index].dataCorreta,
                                'btn-': +edi.util.getURL('quest') + index,
                                'id': +edi.util.getURL('quest') + index
                            })
                            .appendTo($alterImgBox)
                            .click(handlerImgClick)
                            .mouseenter(handlerImgMouseEnter)
                            .mouseleave(handlerImgMouseLeave);

                        $('<p>')
                            .addClass('p')
                            .html(bt_img[index].texto)
                            .css({
                                'line-height': textoConfig.lineHeight,
                                'margin-top': textoConfig.pMarginTop
                            })
                            .appendTo($alterImgTexto);

                        if (bt_img[index].dataSom) {
                            $('<span>')
                                .addClass('btn-som')
                                .appendTo($alterImgBox)
                                .click(handlerImgSomClick);
                        }
                    }
                    index++;
                }

            }
        }

        //tratamento do click no botao
        function handlerImgClick(e) {
            e.stopPropagation();

            var _this = $(this);
            _this.css('opacity', 1).off();

            _this.parent().parent().find('.alter-img-texto').fadeIn();

            _this.parent().find('.mini-icon').fadeIn();

            if (peca.objetivos.length) {
                edi.objetivos.pop();
            }

            peca.objetivos.pop();

            if (_this.attr('data-correta') == 'true') {
                edi.objetivos.unshift(1);

                //se config.btnBranco
                if (config.btnBranco) {
                    $(this).addClass('.btn-sem-estilo btn-sem-estilo-acertou');
                }

                //animação
                if (config.animacao) {
                    require(['../../canvas/objetos/animaCerto'], function(canvas) {
                        var mascote = new canvas.animaCerto({
                            cor: 'blue'
                        });
                        mascote.obj.css({
                            top: 11,
                            left: 8
                        }).appendTo(_this.parent().find('.mini-icon'));
                        mascote.play();
                    });
                }

                //chamando o callback, retornando acertou e o elemento ativo
                if (cb) cb(true, _this);
            } else {
                edi.objetivos.unshift(2);
                //se config.btnBranco
                if (config.btnBranco) {
                    $(this).addClass('.btn-sem-estilo btn-sem-estilo-errou');
                }

                //animção
                if (config.animacao) {
                    require(['../../canvas/objetos/animaErrado'], function(canvas) {
                        var mascote = new canvas.animaErrado({
                            cor: 'red'
                        });
                        mascote.obj.css({
                            top: 12,
                            left: 12
                        }).appendTo(_this.parent().find('.mini-icon'));
                        mascote.play();
                    });
                }

                //chamando o callback, retornando errou e o elemento ativo
                if (cb) cb(false, _this);
            }

            if (!peca.objetivos.length && edi.objetivos.indexOf(2) >= 0) {
                edi.objetivos = [2];
                $('.alter-img .img').off('click').off('mouseenter').off('mouseleave');
            } else if (!peca.objetivos.length && edi.objetivos.indexOf(2) < 0) {
                if (cbFinal) cbFinal(_this);
                $('.alter-img .img').off('click').off('mouseenter').off('mouseleave');
            }

            edi.finalizar();
        }

        //tratamento de mouseenter no botao
        function handlerImgMouseEnter() {
            var _this = $(this);
            _this.parent().css({
                opacity: 0.7
            });
        }

        //tratamento de mouseleave no botao
        function handlerImgMouseLeave() {
            var _this = $(this);
            _this.parent().css({
                opacity: 0.5
            });
        }

        function handlerImgSomClick(e) {
            e.stopPropagation();
        }

        function WiQuadroInteraction(element, result) {
            if ( !! WIQUADRO) Wiquadro.api.addInteration(INTERACAO_CLICK, element.id, result);
        }

        ARR_TAREFAS[tarefaalternativa_img].resolve(config.cb);
        return {
            container: $alterImgMain
        };
    }

    return {
        objetivos: [],
        setConfig: _setConfig,
        alternativa_img: _init
    };

});