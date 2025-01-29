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
            .attr('data-name','animaCerto');

        var _canvas = _icone[0];

        lib.cor = function(){
            return configCanvas.cor;
        };

        var _exportRoot = new lib.certoBranco();
        var _stage = new createjs.Stage(_canvas);

        function _init() {

            var canvasWidth = 42;
            var canvasHeight = 40;

            this.certoStage.scaleX = configCanvas.width*getScale()/canvasWidth;
            this.certoStage.scaleY = this.certoStage.scaleX;

            _icone.attr({
                width:canvasWidth*this.certoStage.scaleX,
                height:canvasHeight*this.certoStage.scaleY
            });

            _icone.css({
                "transform-origin":'top left',
                "transform":"scale("+(1/getScale())+")"
            });

            this.certoStage.addChild(this.certoRoot);
            this.certoStage.update();

            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", this.certoStage);
        }

        return {
            obj: _icone,
            play: _init,
            certoRoot: _exportRoot,
            certoStage:_stage
        };
    };

    return {animaCerto:_canvas};

});
