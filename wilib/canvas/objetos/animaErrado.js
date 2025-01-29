//Pra chamar na peça
/*
var img = "../canvas/objetos/animaErrado";

require([img], function (canvas) {
    var mascote = new canvas.animaErrado({cor: '#FFF'});
    mascote.obj.css({
        top: '10px',
         left: '20px',
    }).appendTo($botaoAsterisco);
mascote.play();
*/

define(function (require) {

    var _canvas = function(settings){

        var configCanvas = {
            width: 42,
            cor: '#000'
        };

        if (settings) {
            $.extend(configCanvas, settings);
        }

        var id = "canvas_"+$('canvas').length;
        var _icone = $('<canvas>')
            .css({
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'transparent'
            })
            .attr('id', id)
            .attr('data-name','animaCerto')

        var _canvas = _icone[0];

        lib.cor = function(){
            return configCanvas.cor;
        }

        var _exportRoot = new lib.erradoBranco();
        var _stage = new createjs.Stage(_canvas);

        function _init() {

            var canvasWidth = 42;
            var canvasHeight = 40;

            this.erradoStage.scaleX = configCanvas.width*getScale()/canvasWidth;
            this.erradoStage.scaleY = this.erradoStage.scaleX;

            _icone.attr({
                width:canvasWidth*this.erradoStage.scaleX,
                height:canvasHeight*this.erradoStage.scaleY
            });

            _icone.css({
                "transform-origin":'top left',
                "transform":"scale("+ 1 / getScale() +")"
            });

            this.erradoStage.addChild(this.certoRoot);
            //this.certoRoot.verdeClaro.alpha = 1;
            this.erradoStage.update();

            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", this.erradoStage);
        }

        return {
            obj: _icone,
            play: _init,
            certoRoot: _exportRoot,
            erradoStage:_stage
        };
    }

    return {animaErrado:_canvas};

});
