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
var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
canvas.width = 788;
canvas.height = 385;
document.querySelector('#conteudo').appendChild(canvas);

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

var sky = new Image();
sky.src = '../img/fotos/45/sky-gradient.png';

var bg = new Image();
bg.src = '../img/fotos/45/bg.png';

var cloud = new Image();
bg.onload = function () {
  clouds.push({
    pos: [-200, 0],
    sprite: new Sprite(cloud, [0, 0], [784, 181], 0, [0])
  });
};
cloud.src = '../img/fotos/45/clouds.png';

var smoke = new Image();
smoke.src = '../img/fotos/45/smoke.png';

var bullet = new Image();
bullet.src = '../img/fotos/45/bullet.png';

var playerLeft = new Image();
playerLeft.src = '../img/fotos/45/player-left.png';

var playerRight = new Image();
playerRight.src = '../img/fotos/45/player-right.png';

var playerIdle = new Image();
playerIdle.src = '../img/fotos/45/player-idle.png';

var playerShoot = new Image();
playerShoot.src = '../img/fotos/45/player-shoot.png';

var _enemies = [];

var enemy1 = new Image();
enemy1.src = '../img/fotos/45/enemy1.png';
_enemies.push(enemy1);

var enemy2 = new Image();
enemy2.src = '../img/fotos/45/enemy2.png';
_enemies.push(enemy2);

var enemy3 = new Image();
enemy3.src = '../img/fotos/45/enemy3.png';
_enemies.push(enemy3);

// player
var player = {
  pos: [canvas.width / 2, 290],
  sprite: new Sprite(playerIdle, [0, 0], [61, 77], 0, [0, 1]),
  animations: {
    'idle': new Sprite(playerIdle, [0, 0], [61, 77], 0, [0, 1]),
    'left': new Sprite(playerLeft, [61, 0], [61, 81], 25, [0, 18]),
    'right': new Sprite(playerRight, [61, 0], [61, 81], 25, [0, 18]),
    'shoot': new Sprite(playerShoot, [0, 0], [61, 75], 0, [0, 1])
  }
};

var bullets = [];
var enemies = [];
var clouds = [];
var smokes = [];

var canFire = true;
var gameTime = 0;
var lastCloud = Date.now();
var isGameOver = true;

var score = 0;
var damages = 0;
var scoreEl = $('#score');

var playerSpeed = 200;
var bulletSpeed = 100;
var enemySpeed = 80;

// atualizando objetos do jogo
function update(dt) {
  gameTime += dt;

  handleInput(dt);
  updateEntities(dt);
  if (Math.random() < 1 - Math.pow(0.993, 1) && !isGameOver) {
    enemies.push({
      pos: [Math.random() * (canvas.width - 102), 0],
      sprite: new Sprite(_enemies[Math.floor(gameTime) % 3], [102, 0], [102, 119], 16, [0, 78])
    });
  }

  if (Date.now() - lastCloud > 15000) {
    clouds.push({
      pos: [-784, 0],
      sprite: new Sprite(cloud, [0, 0], [784, 181], 0, [0])
    });
    lastCloud = Date.now();
  }

  if (Math.random() < 1 - Math.pow(0.993, damages) && !isGameOver && damages !== 0 && smokes.length < 4) {
    smokes.push({
      pos: [-1103, Math.random() * (canvas.height - 251)],
      speed: Math.random() * (80 - 30),
      sprite: new Sprite(smoke, [0, 0], [1103, 251], 0, [0])
    });
  }

  checkCollisions();

  scoreEl.html('Pontos: ' + score);
}

function handleInput(dt) {
  if (input.isDown('LEFT')) {
    player.pos[0] -= playerSpeed * dt;
    player.sprite = player.animations.left;
  }

  if (input.isDown('RIGHT')) {
    player.pos[0] += playerSpeed * dt;
    player.sprite = player.animations.right;
  }

  if (input.isDown('SPACE') && canFire && !isGameOver) {
    player.sprite = player.animations.shoot;

    var x = player.pos[0] + (player.sprite.size[0] / 2) - 10;
    var y = player.pos[1];

    bullets.push({
      pos: [x, y],
      dir: 'up',
      sprite: new Sprite(bullet, [20, 0], [20, 20], 12, [0, 2])
    });

    canFire = false;
  } else if (!input.isDown('SPACE')) {
    canFire = true;
  }

  window.onkeyup = function (e) {
    if (e.keyCode == 37 || e.keyCode == 39)
      player.sprite = player.animations.idle;
  };
}

function updateEntities(dt) {
  // atualizando a animação do player
  player.sprite.update(dt);

  // atualizando todas as balas
  bullets.forEach(function (bullet, i) {
    bullet.pos[1] -= bulletSpeed * dt;

    bullet.sprite.update(dt);

    if (bullet.pos[1] < 0)
      bullets.splice(i, 1);
  });

  enemies.forEach(function (enemy, i) {
    enemy.pos[1] += enemySpeed * dt;

    enemy.sprite.update(dt);

    if (enemy.pos[1] > canvas.height) {
      enemies.splice(i, 1);

      damages++;
      if (damages == 15)
        gameOver();
    }
  });

  clouds.forEach(function (cloud, i) {
    cloud.pos[0] += 30 * dt;

    if (cloud.pos[0] > (canvas.width + cloud.sprite.size))
      clouds.splice(i, 1);
  });

  smokes.forEach(function (smoke, i) {
    smoke.pos[0] += smoke.speed * dt;

    if (smoke.pos[0] > (canvas.width + smoke.sprite.size))
      smokes.splice(i, 1);
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

  // detectando colisoes de todos os inimigos e balas
  enemies.forEach(function (enemy, i) {
    var pos = enemy.pos;
    var size = enemy.sprite.size;

    bullets.forEach(function (bullet, j) {
      var pos2 = bullet.pos;
      var size2 = bullet.sprite.size;

      if (boxCollides(pos, size, pos2, size2)) {
        // removendo o inimigo
        enemies.splice(i, 1);

        // adicionando pontos
        score++;
        if (score == 15)
          end();

        // removendo bala e parando esta interação
        bullets.splice(j, 1);
        return;
      }
    });
  });
}

function checkPlayerBounds() {
  if (player.pos[0] < 0) {
    player.pos[0] = 0;
  } else if (player.pos[0] > canvas.width - player.sprite.size[0]) {
    player.pos[0] = canvas.width - player.sprite.size[0];
  }

  if (player.pos[1] < 0) {
    player.pos[1] = 0;
  } else if (player.pos[1] > canvas.width - player.sprite.size[1]) {
    player.pos[1] = canvas.width - player.sprite.size[1];
  }
}

// desenhando tudo
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(sky, 0, 0);
  renderEntities(clouds);
  ctx.drawImage(bg, 0, 0);

  // renderizando player
  if (!isGameOver) {
    renderEntity(player);
  }

  renderEntities(bullets);
  renderEntities(enemies);
  renderEntities(smokes);

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
}

// resetando o jogo para o estado original
function reset() {
  isGameOver = false;
  gameTime = 0;
  score = 0;
  damages = 0;

  enemies = [];
  bullets = [];
  smokes = [];

  player.pos = [canvas.width / 2, 290];
}
