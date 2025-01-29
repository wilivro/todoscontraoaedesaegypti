

//require(["../../canvas/objetos/mascoteIndice"], function (canvas) {
//    var anima = new canvas.mascoteIndice();
//    anima.obj.css({
//        top: 0,
//        left: 0
//    }).appendTo('#conteudo');
//    anima.play();
//});

define(function (require) {

    var _canvas = function(){

        var id = "canvas_"+$('canvas').length;
        var _icone = $('<canvas>')
            .css({
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'transparent'
            })
            .attr('id', id)
            .attr('data-name','mascoteIndice')

        var _canvas = _icone[0];
        var _exportRoot = new lib.mascoteIndice();
        var _stage = new createjs.Stage(_canvas);

        function _init(settings, cb) {

            this.player = _exportRoot.mascoteIndice;

            if(lib.callback) lib.callback = cb;

            var configCanvas = {
                width: 240
            };

            if (settings) {
                $.extend(configCanvas, settings);
            }

            var canvasWidth = 240;
            var canvasHeight = 128;

            this.mascoteIndiceStage.scaleX = configCanvas.width * getScale()/canvasWidth;
            this.mascoteIndiceStage.scaleY = this.mascoteIndiceStage.scaleX;

            _icone.attr({
                width:canvasWidth*this.mascoteIndiceStage.scaleX,
                height:canvasHeight*this.mascoteIndiceStage.scaleY
            });

            _icone.css({
                "transform-origin":'top left',
                "transform":"scale("+(1/getScale())+")"
            });

            this.mascoteIndiceStage.addChild(this.mascoteIndiceRoot);
            this.mascoteIndiceStage.update();

            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", this.mascoteIndiceStage);
        }

        return {
            obj: _icone,
            play: _init,
            player: null,
            mascoteIndiceRoot: _exportRoot,
            mascoteIndiceStage:_stage
        };
    }

    return {mascoteIndice:_canvas};

});