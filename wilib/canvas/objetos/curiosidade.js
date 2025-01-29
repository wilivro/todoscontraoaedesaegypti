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
            .attr('data-name','curiosidade')

        var _canvas = _icone[0];
        var _exportRoot = new lib.curiosidade();
        var _stage = new createjs.Stage(_canvas);

        function _init(settings) {

            var configCanvas = {
                width: 196
            };

            if (settings) {
                $.extend(configCanvas, settings);
            }

            var canvasWidth = 196;
            var canvasHeight = 149;

            this.curiosidadeStage.scaleX = (configCanvas.width*WINDOW_WIDTH)/(canvasWidth*WIDTH_DEFAULT);
            this.curiosidadeStage.scaleY = this.curiosidadeStage.scaleX;

            _icone.attr({
                width:canvasWidth*this.curiosidadeStage.scaleX,
                height:canvasHeight*this.curiosidadeStage.scaleY
            });

            _icone.css({
                "transform-origin":'top left',
                "transform":"scale("+(1/stage.scaleX)+")"
            });

            this.curiosidadeStage.addChild(this.curiosidadeRoot);
            this.curiosidadeStage.update();

            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", this.curiosidadeStage);
        }

        return {
            obj: _icone,
            play: _init,
            curiosidadeRoot: _exportRoot,
            curiosidadeStage:_stage
        };
    }

    return {curiosidade:_canvas};

});