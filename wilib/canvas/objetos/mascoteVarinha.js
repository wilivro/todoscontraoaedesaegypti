

//require(["../../canvas/objetos/mascoteVarinha"], function (canvas) {
//    var anima = new canvas.mascoteVarinha();
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
            .attr('data-name','mascoteVarinha')

        var _canvas = _icone[0];
        var _exportRoot = new lib.mascoteVarinha();
        var _stage = new createjs.Stage(_canvas);

        function _init(settings, cb) {

            this.player = _exportRoot.mascoteVarinha;

            if(lib.callback) lib.callback = cb;

            var configCanvas = {
                width: 70
            };

            if (settings) {
                $.extend(configCanvas, settings);
            }

            var canvasWidth = 70;
            var canvasHeight = 65;

            this.mascoteVarinhaStage.scaleX = configCanvas.width * getScale()/canvasWidth;
            this.mascoteVarinhaStage.scaleY = this.mascoteVarinhaStage.scaleX;

            _icone.attr({
                width:canvasWidth*this.mascoteVarinhaStage.scaleX,
                height:canvasHeight*this.mascoteVarinhaStage.scaleY
            });

            _icone.css({
                "transform-origin":'top left',
                "transform":"scale("+(1/getScale())+")"
            });

            this.mascoteVarinhaStage.addChild(this.mascoteVarinhaRoot);
            this.mascoteVarinhaStage.update();

            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", this.mascoteVarinhaStage);
        }

        return {
            obj: _icone,
            play: _init,
            player: null,
            mascoteVarinhaRoot: _exportRoot,
            mascoteVarinhaStage:_stage
        };
    }

    return {mascote:_canvas};

});