// proporção de scalonamento estático
window._x = getScale();

// cross-browser requestAnimationFrame
var requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (cb) {
      window.setTimeout(cb, 1000 / 60);
    };
})();

// criando o canvas
var canvas = document.createElement('canvas'),
  ctx = canvas.getContext('2d');

canvas.width = 788 * _x;
canvas.height = 385 * _x;
document.querySelector('#conteudo').appendChild(canvas);

var mouse = {x: 0, y: 0};

document.addEventListener('mousemove', function (e) {
  var $principal = $('#principal');
  mouse.x = e.clientX - $principal.offset().left || e.pageX - $principal.offset().left;
  mouse.y = e.clientY || e.pageY;
}, false);

// loop principal
var lastTime;
function main() {
  var now = Date.now(),
    dt = (now - lastTime) / 1000.0;

  update(dt);
  render();

  lastTime = now;
  requestAnimFrame(main);
}

function init() {
  lastTime = Date.now();
  main();
}

var bg = new Image();
bg.style.width = canvas.width;
bg.style.height = canvas.height;
bg.src = '../img/fotos/12/bg.svg';

var lixoSprite = new Image();
lixoSprite.src = '../img/fotos/12/lixos-sprite.svg';

var lixosPreset = [
  {type: 'vidro', sprite: new Sprite(lixoSprite, [0, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'pilhas', sprite: new Sprite(lixoSprite, [50, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'papel', sprite: new Sprite(lixoSprite, [100, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'papel', sprite: new Sprite(lixoSprite, [150, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'organico', sprite: new Sprite(lixoSprite, [200, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'papel', sprite: new Sprite(lixoSprite, [250, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'organico', sprite: new Sprite(lixoSprite, [300, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'plastico', sprite: new Sprite(lixoSprite, [350, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'plastico', sprite: new Sprite(lixoSprite, [400, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'pilhas', sprite: new Sprite(lixoSprite, [450, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'organico', sprite: new Sprite(lixoSprite, [500, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)},
  {type: 'organico', sprite: new Sprite(lixoSprite, [550, 0], [50 * _x, 50 * _x], 0, [0], null, null, true)}
];

var cestosSprite = new Image();
cestosSprite.src = '../img/fotos/12/cestos-sprite.svg';

var cestos = [
  {
    pos: [255 * _x, 300 * _x],
    type: 'organico',
    left: 0 * _x,
    sprite: new Sprite(cestosSprite, [0, 0], [60 * _x, 60 * _x], 0, [0], null, null, true)
  },
  {
    pos: [315 * _x, 300 * _x],
    type: 'papel',
    left: 60 * _x,
    sprite: new Sprite(cestosSprite, [60, 0], [60 * _x, 60 * _x], 0, [0], null, null, true)
  },
  {
    pos: [375 * _x, 300 * _x],
    type: 'pilhas',
    left: 120 * _x,
    sprite: new Sprite(cestosSprite, [120, 0], [60 * _x, 60 * _x], 0, [0], null, null, true)
  },
  {
    pos: [435 * _x, 300 * _x],
    type: 'plastico',
    left: 180 * _x,
    sprite: new Sprite(cestosSprite, [180, 0], [60 * _x, 60 * _x], 0, [0], null, null, true)
  },
  {
    pos: [495 * _x, 300 * _x],
    type: 'vidro',
    left: 240 * _x,
    sprite: new Sprite(cestosSprite, [240, 0], [60 * _x, 60 * _x], 0, [0], null, null, true)
  }
];

var lixos = [],
  ultimoLixo = Date.now(),
  gameTime = 0, // tempo decorrido no jogo
  isGameOver = true,
  score = 0,
  lifes = 6;

var lifeImg = new Image();
lifeImg.src = '../img/fotos/12/lifes.svg';
var lifeIndex = 0;
var lifeSprite = new Sprite(lifeImg, [lifeIndex, 0], [100 * _x, 100 * _x], 0, [0], null, null, true);

// atualizando objetos do jogo
function update(dt) {
  gameTime += dt;

  updateEntities(dt);

  if (Date.now() - ultimoLixo > (2000 * _x) && !isGameOver) {
    var random = Math.floor(Math.random() * 12);
    lixos.push({
      pos: [370 * _x, 55 * _x],
      type: lixosPreset[random].type,
      sprite: lixosPreset[random].sprite
    });

    ultimoLixo = Date.now();
  }

  checkCollisions();
}

function updateEntities(dt) {
  // problema de posição do mouse resolvido com
  // _x * mouse.x / getScale();
  if (!isGameOver) {
    cestos.forEach(function (_cesto) {
      _cesto.pos[0] = (_x * mouse.x / getScale() - (_cesto.sprite.size[0] * 5) / 2) + _cesto.left;
    });
  }

  lixos.forEach(function (lixo, i) {
    lixo.pos[1] += (100 * _x) * dt;

    if (lixo.pos[1] > canvas.height && !isGameOver) {
      lixos.splice(i, 1);

      lifes--;
      if (lifes == -1) {
        gameOver();
        lifeIndex = 0;
      }

      lifeIndex += 100;
      lifeSprite = new Sprite(lifeImg, [lifeIndex, 0], [100 * _x, 100 * _x], 0, [0], null, null, true);
    }
  });
}

// colisões
function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 ||
  b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
  return collides(pos[0], pos[1],
    pos[0] + size[0], pos[1] + size[1],
    pos2[0], pos2[1],
    pos2[0] + size2[0], pos2[1] + size2[1]);
}

function checkCollisions() {
  checkPlayerBounds();

  lixos.forEach(function (lixo, i) {
    var pos = lixo.pos;
    var size = lixo.sprite.size;

    cestos.forEach(function (_cesto) {
      var pos2 = _cesto.pos;
      var size2 = _cesto.sprite.size;

      if (boxCollides(pos, size, pos2, size2) && lixo.type == _cesto.type && !isGameOver) {
        lixos.splice(i, 1);

        score++;
        if (score == 20)
          end();
      }
    });
  });
}

function checkPlayerBounds() {
  cestos.forEach(function (_cesto) {
    if (_cesto.pos[0] - _cesto.left < 0) {
      _cesto.pos[0] = 0 + _cesto.left;
    } else if (_cesto.pos[0] > canvas.width - (_cesto.sprite.size[0] * 5) + _cesto.left) {
      _cesto.pos[0] = canvas.width - (_cesto.sprite.size[0] * 5) + _cesto.left;
    }
  });
}

// desenhando tudo
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  renderEntities(lixos);
  renderEntities(cestos);

  // desenhando o numero de vidas
  lifeSprite.render(ctx);

  // desenhando placar
  var fontSize = 30 * _x;
  ctx.fillStyle = '#fff';
  ctx.font = fontSize + 'px arial';
  ctx.fillText(score < 10 ? '0' + score : score, 685 * _x, 53 * _x);
}

function renderEntities(list) {
  list.forEach(function (entity) {
    renderEntity(entity);
  });
}

function renderEntity(entity) {
  ctx.save();
  ctx.translate(entity.pos[0], entity.pos[1]);
  entity.sprite.render(ctx);
  ctx.restore();
}

function end() {
  $('#end-screen').fadeIn();
  isGameOver = true;
}

// gameover
function gameOver() {
  $('#gameover-screen').fadeIn();
  isGameOver = true;
  lifes = '';
}

// resetando o jogo para o estado original
function reset() {
  isGameOver = false;
  gameTime = 0;
  score = 0;
  lifes = 6;
  lixos = [];
}
