
HTMLElement.prototype.canvasLoad = function(source, opt, cb) {
  if (!source)
    throw new Error('[source] é o parâmetro obrigatório!');

  if (!cb && typeof cb === 'function')
    cb = opt;

  var stage, exportRoot, canvas = this, root = source, newRoot, _opt;

  _opt = {
    scale: 0
  };

  $.extend(_opt, opt);

  root = root.replace(/^.*[\/\\]/g, '').replace(/-/g, '');

  newRoot = 'new lib.' + root + '()';

  require([source], function() {
    //jshint evil : true
    exportRoot = eval(newRoot);

    stage = new createjs.Stage(canvas);
    stage.scaleX = getScale() + _opt.scale;
    stage.scaleY = getScale() + _opt.scale;
    stage.addChild(exportRoot);
    stage.update();

    // redimensionando o canvas
    canvas.width *= getScale();
    canvas.height *= getScale();
    canvas.style.transformOrigin = 'top left';
    canvas.style.transform = 'scale(' + 1 / getScale() + ')';

    createjs.Ticker.setFPS(lib.properties.fps);
    createjs.Ticker.addEventListener("tick", stage);

    if (cb) cb(stage);
  });
};
