function main(){var now=Date.now(),dt=(now-lastTime)/1e3;update(dt),render(),lastTime=now,requestAnimFrame(main)}function init(){lastTime=Date.now(),main()}function update(dt){gameTime+=dt,handleInput(dt),updateEntities(dt),Math.random()<1-Math.pow(.993,1)&&!isGameOver&&enemies.push({pos:[Math.random()*(canvas.width-102),0],sprite:new Sprite(_enemies[Math.floor(gameTime)%3],[102,0],[102,119],16,[0,78])}),Date.now()-lastCloud>15e3&&(clouds.push({pos:[-784,0],sprite:new Sprite(cloud,[0,0],[784,181],0,[0])}),lastCloud=Date.now()),Math.random()<1-Math.pow(.993,damages)&&!isGameOver&&0!==damages&&smokes.length<4&&smokes.push({pos:[-1103,Math.random()*(canvas.height-251)],speed:50*Math.random(),sprite:new Sprite(smoke,[0,0],[1103,251],0,[0])}),checkCollisions(),scoreEl.html("Pontos: "+score)}function handleInput(dt){if(input.isDown("LEFT")&&(player.pos[0]-=playerSpeed*dt,player.sprite=player.animations.left),input.isDown("RIGHT")&&(player.pos[0]+=playerSpeed*dt,player.sprite=player.animations.right),input.isDown("SPACE")&&canFire&&!isGameOver){player.sprite=player.animations.shoot;var x=player.pos[0]+player.sprite.size[0]/2-10,y=player.pos[1];bullets.push({pos:[x,y],dir:"up",sprite:new Sprite(bullet,[20,0],[20,20],12,[0,2])}),canFire=!1}else input.isDown("SPACE")||(canFire=!0);window.onkeyup=function(e){37!=e.keyCode&&39!=e.keyCode||(player.sprite=player.animations.idle)}}function updateEntities(dt){player.sprite.update(dt),bullets.forEach(function(bullet,i){bullet.pos[1]-=bulletSpeed*dt,bullet.sprite.update(dt),bullet.pos[1]<0&&bullets.splice(i,1)}),enemies.forEach(function(enemy,i){enemy.pos[1]+=enemySpeed*dt,enemy.sprite.update(dt),enemy.pos[1]>canvas.height&&(enemies.splice(i,1),damages++,15==damages&&gameOver())}),clouds.forEach(function(cloud,i){cloud.pos[0]+=30*dt,cloud.pos[0]>canvas.width+cloud.sprite.size&&clouds.splice(i,1)}),smokes.forEach(function(smoke,i){smoke.pos[0]+=smoke.speed*dt,smoke.pos[0]>canvas.width+smoke.sprite.size&&smokes.splice(i,1)})}function collides(x,y,r,b,x2,y2,r2,b2){return!(x2>=r||x>r2||y2>=b||y>b2)}function boxCollides(pos,size,pos2,size2){return collides(pos[0],pos[1],pos[0]+size[0],pos[1]+size[1],pos2[0],pos2[1],pos2[0]+size2[0],pos2[1]+size2[1])}function checkCollisions(){checkPlayerBounds(),enemies.forEach(function(enemy,i){var pos=enemy.pos,size=enemy.sprite.size;bullets.forEach(function(bullet,j){var pos2=bullet.pos,size2=bullet.sprite.size;return boxCollides(pos,size,pos2,size2)?(enemies.splice(i,1),score++,15==score&&end(),void bullets.splice(j,1)):void 0})})}function checkPlayerBounds(){player.pos[0]<0?player.pos[0]=0:player.pos[0]>canvas.width-player.sprite.size[0]&&(player.pos[0]=canvas.width-player.sprite.size[0]),player.pos[1]<0?player.pos[1]=0:player.pos[1]>canvas.width-player.sprite.size[1]&&(player.pos[1]=canvas.width-player.sprite.size[1])}function render(){ctx.clearRect(0,0,canvas.width,canvas.height),ctx.drawImage(sky,0,0),renderEntities(clouds),ctx.drawImage(bg,0,0),isGameOver||renderEntity(player),renderEntities(bullets),renderEntities(enemies),renderEntities(smokes)}function renderEntities(list){list.forEach(function(entity){renderEntity(entity)})}function renderEntity(entity){ctx.save(),ctx.translate(entity.pos[0],entity.pos[1]),entity.sprite.render(ctx),ctx.restore()}function end(){$("#end-screen").fadeIn(),isGameOver=!0}function gameOver(){$("#gameover-screen").fadeIn(),isGameOver=!0}function reset(){isGameOver=!1,gameTime=0,score=0,damages=0,enemies=[],bullets=[],smokes=[],player.pos=[canvas.width/2,290]}var requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(cb){window.setTimeout(cb,1e3/60)}}(),canvas=document.createElement("canvas"),ctx=canvas.getContext("2d");canvas.width=788,canvas.height=385,document.querySelector("#conteudo").appendChild(canvas);var lastTime,sky=new Image;sky.src="../img/fotos/45/sky-gradient.png";var bg=new Image;bg.src="../img/fotos/45/bg.png";var cloud=new Image;bg.onload=function(){clouds.push({pos:[-200,0],sprite:new Sprite(cloud,[0,0],[784,181],0,[0])})},cloud.src="../img/fotos/45/clouds.png";var smoke=new Image;smoke.src="../img/fotos/45/smoke.png";var bullet=new Image;bullet.src="../img/fotos/45/bullet.png";var playerLeft=new Image;playerLeft.src="../img/fotos/45/player-left.png";var playerRight=new Image;playerRight.src="../img/fotos/45/player-right.png";var playerIdle=new Image;playerIdle.src="../img/fotos/45/player-idle.png";var playerShoot=new Image;playerShoot.src="../img/fotos/45/player-shoot.png";var _enemies=[],enemy1=new Image;enemy1.src="../img/fotos/45/enemy1.png",_enemies.push(enemy1);var enemy2=new Image;enemy2.src="../img/fotos/45/enemy2.png",_enemies.push(enemy2);var enemy3=new Image;enemy3.src="../img/fotos/45/enemy3.png",_enemies.push(enemy3);var player={pos:[canvas.width/2,290],sprite:new Sprite(playerIdle,[0,0],[61,77],0,[0,1]),animations:{idle:new Sprite(playerIdle,[0,0],[61,77],0,[0,1]),left:new Sprite(playerLeft,[61,0],[61,81],25,[0,18]),right:new Sprite(playerRight,[61,0],[61,81],25,[0,18]),shoot:new Sprite(playerShoot,[0,0],[61,75],0,[0,1])}},bullets=[],enemies=[],clouds=[],smokes=[],canFire=!0,gameTime=0,lastCloud=Date.now(),isGameOver=!0,score=0,damages=0,scoreEl=$("#score"),playerSpeed=200,bulletSpeed=100,enemySpeed=80;