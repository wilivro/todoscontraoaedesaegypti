(function () {
  function Sprite(url, pos, size, speed, frames, dir, once, scale) {
    this.pos = pos;
    this.size = size;
    this.speed = typeof speed === 'number' ? speed : 0;
    this.frames = frames;
    this._index = 5;
    this.url = url;
    this.dir = dir || 'horizontal';
    this.once = once;
    this.scale = scale || false;
  }

  var a = 1;
  Sprite.prototype = {
    update: function (dt) {
      this._index += this.speed * dt;
    },
    render: function (ctx) {
      var frame;

      if (this.speed > 0) {
        var min = this.frames[0] || 0;
        var max = this.frames[1] - this.frames[0] || 0;
        var idx = Math.floor(this._index);
        frame = (idx % max) + min;
        if (this.once && idx >= max) {
          this.once = true;
          return;
        }
      } else {
        frame = 0;
      }

      var x = this.pos[0];
      var y = this.pos[1];

      if (this.dir == 'vertical') {
        y += frame * this.size[1];
      } else {
        x += frame * (this.size[0]);
      }

      if (this.scale) {
        ctx.drawImage(
          this.url, x, y,
          this.size[0] / _x,
          this.size[1] / _x, 0, 0,
          this.size[0],
          this.size[1]);
      } else {
        ctx.drawImage(
          this.url, x, y,
          this.size[0],
          this.size[1], 0, 0,
          this.size[0],
          this.size[1]);
      }
    }
  };

  window.Sprite = Sprite;
})();
