define(function (require) {
    var tarefaBlocaNota = addTarefa();

    var edi = require('../lib/edi'),//requisitando o EDI
        _configEDI = null;

    function _setConfig(config) {//setando as configurações do EDI
        _configEDI = config;
    }

    function _init(blocos, callback, callbackFinal, settings) {
        edi.iniciar(_configEDI);//montar o palco

        var peca = this,
            zIndex = 0;

        var config = {
            width: 180,
            height: 130,
            fontSize: 14,
            fontFamily: "trebuchet_ms",
            colorido: false,
            lineHeight: 1,
            left: 370,
            top: 77,
            margem: 50,
            qtdX: null,
            clipePos: {
              x: 86,
              y: 86
            }
        };

        if (settings) {
            $.extend(config, settings);
        }

        var cores = [
            '#FC9491',
            '#E9DA7D',
            '#EAA2D2',
            '#B3D16D',
            '#E6A561',
            '#A1D9E7',
            '#DEBCF0',
            '#F1F2EC'
        ];

        //embaralhando array
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

        blocos.forEach(function () {
            peca.objetivos.push(0);
            edi.objetivos.push(0);
        });

        //container principal
        var $revBN = $('<section>')
            .addClass('revela-bloco-nota')
            .attr('data-edi', 'revela-bloco-nota')
            .appendTo('#conteudo');

        //criando o bloco de notas
        blocos.forEach(function (obj, i) {

            var $bloco = $('<div>')
                .addClass('bloco')
                .attr('id', 'bloco-' + i)
                .css({
                    width: config.width,
                    height: config.height,
                    background: '#FBF3A0',
                    position: 'absolute',
                    left: 870,
                    top: 100,
                    fontSize: config.fontSize,
                    fontFamily: config.fontFamily,
                    lineHeight: config.lineHeight
                }).appendTo($revBN);

            var p = $('<p>')
                .css({
                    height: config.height,
                    display: 'table-cell',
                    verticalAlign: 'middle',
                    textAlign: 'center'
                })
                .html(obj)
                .appendTo($bloco);


            var rotate = (Math.random() * (50 - 30)) - 50;

            $bloco.css('transform', 'rotate(' + rotate + 'deg)');

            if (config.colorido) {
                cores = embaralhar(cores);
                var n = Math.round(Math.random() * cores.length);

                $bloco.css('background', cores[n]);
            }

            setTimeout(function () {
                $bloco.animate({
                    left: 52,
                    top: 77
                }, 500);
            }, 100 * i);

            $bloco.click(onClick);
        });

        //criando container do clipe
        var $clipe = $('<div>')
            .addClass('clipe')
            .appendTo($revBN);

        //parte de cima do clipe
        var $clipeFront = $('<div>')
            .addClass('clipe-front')
            .prependTo($clipe);

        //parte de baixo do clipe
        var $clipeBack = $('<div>')
            .addClass('clipe-back')
            .prependTo($clipe);

        //animação do clipe
        $clipe.animate({
            left: config.clipePos.x,
            top: config.clipePos.y
        }, 500, function () {
            $clipeBack.hide();
        });

        // configurações de alinhamento
        var incremento = {
            x: 0,
            y: 0
        };

        var qtdIndex = 0; // guarda o index atual do bloco de notas

        function onClick() {
            var self = $(this);

            peca.objetivos.pop();
            edi.objetivos.pop();

            self.css({
                'transition-duration': '1.5s',
                'transform': 'rotate(0)',
                'z-index': 99
            });

            if (config.qtdX) {
                self.animate({
                    left: config.left + incremento.x,
                    top: config.top + incremento.y
                }, 500, function () {
                    self.css('zIndex', ++qtdIndex);
                    if (peca.objetivos.length == 0)
                        setTimeout(function(){
                            if (callbackFinal) callbackFinal();
                        },1500)
                });

                // quebrando a linha
                incremento.x += self.width() + 30;
                qtdIndex++;

                if (qtdIndex >= config.qtdX) {
                    incremento.x = 0;
                    incremento.y = self.height() + 30;
                    qtdIndex = 0;
                }
            } else {
                self.animate({
                    left: config.left + (Math.random() * config.margem),
                    top: config.top + (Math.random() * config.margem)
                }, 500, function () {
                    self.css('zIndex', ++qtdIndex);
                });
            }

            self.off();

            if (peca.objetivos.length == 0) {
                setTimeout(function () {
                    $clipeBack.show();
                }, 500);

            }

            edi.finalizar();

            if (callback) callback();
        }

        ARR_TAREFAS[tarefaBlocaNota].resolve();
    }

    return {
        root: edi,
        objetivos: [],
        setConfig: _setConfig,
        revela_bloco_nota: _init
    };

});
