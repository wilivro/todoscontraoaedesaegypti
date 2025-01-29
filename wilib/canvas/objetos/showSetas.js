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
            .attr('width', '1788')
            .attr('data-name','showSetas')
            .attr('height', '383')

        function _init(edi, licao, settings, cb) {
            canvas = this.obj[0];
            lib.edi = edi;
            lib.licao = licao;
            exportRoot = new lib.showSetas();

            if (lib.callback) lib.callback = cb;

            stage = new createjs.Stage(canvas);

            var configCanvas = {
                width: 788
            };

            if (settings) {
                $.extend(configCanvas, settings);
            }

            var canvasWidth = 788;
            var canvasHeight = 383;

            stage.scaleX = (configCanvas.width*WINDOW_WIDTH)/(canvasWidth*WIDTH_DEFAULT);
            stage.scaleY = stage.scaleX;

            _icone.attr({
                width:canvasWidth*stage.scaleX,
                height:canvasHeight*stage.scaleY
            });

            _icone.css({
                "transform-origin":'top left',
                "transform":"scale("+(1/stage.scaleX)+")"
            });

            stage.addChild(exportRoot);
            stage.update();

            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);


        }

        return {
            obj: _icone,
            play: _init
        };
    }

    return {seta:_canvas};

});