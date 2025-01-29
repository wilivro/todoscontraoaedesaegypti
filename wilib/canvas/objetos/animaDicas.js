define(function (require) {

    var id = "canvas_"+$('canvas').length
    var _icone = $('<canvas>')
        .css({
            position: 'absolute',
            top: 0,
            left: 0,
            background: 'transparent'
        })
        .attr('id', id)
        .attr('width', '95')
        .attr('data-name','dicas')
        .attr('height', '150')

    function _init(cb) {

        canvas = this.obj[0];
        exportRoot = new lib.dicas();

        if (lib.callback) lib.callback = cb;

        stage = new createjs.Stage(canvas);

        //bodyScale(WINDOW_WIDTH/WIDTH_DEFAULT);

        stage.scaleX = getScale();
        stage.scaleY = getScale();

        var canvasWidth = $("#"+id).width();
        var canvasHeight = $("#"+id).height();

        $("#"+id).attr({
            width:canvasWidth*stage.scaleX,
            height:canvasHeight*stage.scaleY
        });

        $("#"+id).css({
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
        play: _init,

    };

});