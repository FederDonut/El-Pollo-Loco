class World {

    inactivityTimer;
    sleepTimer;
    anyKeyPressed = false;
    chillMode =false;
    sleepMode = false;
    isObjectVisible = false; // fixiert statusbar Bossgegener
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle_counter = 0;
    coin_counter = 0;
    throable_objects = [];
    firePower = [];
    intervalId =[];
    endboss = null;
    gameIsEnding = false;
    character = new Character();
    health_bar = new Statusbar();
    enemy_health_bar = new Statusbar(new Statusbar().IMAGES_endboss_bar, 1200, 30);
    coin_bar = new Statusbar(new Statusbar().IMAGE_coin_bar , 0, 80);
    bottle_bar = new Statusbar(new Statusbar().IMAGE_bottle_bar ,0, 150 )
    audio = new AudioController();
     

    constructor(canvas, keyboard,level){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level
        this.endboss = this.level.enemies[3];
        this.draw();
        this.setWorld();
        this.checkPlayerActivity();
        this.startInteractivTimer();
        this.startSleepTimer();
        this.run();  
    }

    setWorld(){
        this.character.world = this;
        this.level.enemies.forEach((enemy)=> enemy.world = this);
        this.audio.world = this;
    }

    run(){
        this.intervalId.push(setInterval(()=>{
        this.character.lastPositionY = this.character.y;
        this.checkCollisions();
        this.checkMissileCollision()
        this.checkThrowObjects();
        this.checkCollectibleBottle();
        this.checkCoinCollision();
        this.endbossMovement();
        this.checkEndbossDistance();
        this.gameOver();
        //this.stopGame();
        },100))
    }

    //checkAudioArray(){
    //    console.table(this.audio.soundLib);
    //    let test = this.audio.soundLib[1];
    //    test.play();
    //}

    checkPlayerActivity(){
        window.addEventListener('keydown', ()=>{
            this.anyKeyPressed = true;
            this.resetTimers();
        });
        window.addEventListener('keyup', ()=>{
            this.anyKeyPressed = false;
            this.resetTimers();
            this.startInteractivTimer();
            this.startSleepTimer();
        });
    }

    resetTimers(){
        clearTimeout(this.inactivityTimer);
        clearTimeout(this.sleepTimer);
        this.chillMode = false;
        this.sleepMode = false;
    }

    startInteractivTimer(){
        this.inactivityTimer = setTimeout(()=>{
            if(!this.anyKeyPressed){
                //console.log('chill Modus aktiv');
                this.chillMode = true;
                this.sleepMode = false; 
                //console.log(this.chillMode);
            }
        },100);
    
    }

    startSleepTimer(){
        this.sleepTimer = setTimeout(()=>{
            if(!this.anyKeyPressed){
                this.chillMode = false;
                this.sleepMode = true;
            }
        },10000)
    }

    checkThrowObjects(){
        if(this.keyboard.attack&& this.bottle_counter !== 0){
            this.audio.playLaserShotSound();
            this.audio.stopLaserShotSound();
            let bottle = new Missile(this.character.x +100, this.character.y +30);
            this.throable_objects.push(bottle); 
            this.bottle_counter -=1;
            this.bottle_bar.setCollection(this.bottle_counter);
        }
    }

    addExplosion(x,y){
        let explosion = new Explosion(x,y);
        this.firePower.push(explosion)
    }
    
    checkCollisions(){
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isCollidingFromAbove(enemy, this.character.lastPositionY)&& !this.character.isColliding(this.endboss)){
                enemy.damage();
                this.character.jump();
                // Neues Audio Object
                this.audio.playEnemyDamageSound();
                this.audio.stopEnemyDamageSound();
                this.checkPlayerActivity();
            }else if(this.character.isColliding(enemy)){
                //console.log('normaler Schaden für den character')
                this.character.damage();
                this.resetTimers();
                this.health_bar.setPercentage(this.character.energy);
            }
        })
    }
    
    checkCollectibleBottle(){
        this.level.bottles.forEach((bottle, i) =>{
            if(this.character.isColliding(bottle)){
                bottle.collectBottle = true;
                this.audio.playReloadingSound();
                this.audio.stopReloadingSound();
                if(bottle.collectBottle){
                    let targetBottle = this.level.bottles
                    targetBottle.splice(i,1)
                    this.bottle_counter ++;
                    this.bottle_bar.setCollection(this.bottle_counter);
                    //console.log(targetBottle, this.bottle_counter);
                }
            }
        })
    }

    checkCoinCollision(){
        this.level.coins.forEach((coin,i) =>{
            if(this.character.isColliding(coin)){
                coin.collectCoin = true;
                this.audio.playCoinSound();
                this.audio.stopCoinSound();
                if(coin.collectCoin){
                    let targetCoin = this.level.coins;
                    targetCoin.splice(i,1);
                    this.coin_counter ++;
                    this.coin_bar.setCollection(this.coin_counter);
                }
            }
        })    
    }

    checkMissileCollision(){
        this.throable_objects.forEach((bottle) =>{
            this.level.enemies.forEach((enemy) =>{
                 if(bottle.isColliding(enemy)){
                    bottle.removeMissile = true;
                    this.missileExplosion(bottle);
                    if(enemy === this.endboss){
                        this.endbossDamage(enemy);
                        this.audio.playEnemyDamageSound();
                        this.audio.stopEnemyDamageSound();
                    }else if(enemy !== this.endboss){
                        enemy.damage();
                        this.audio.playEnemyDamageSound();
                        this.audio.stopEnemyDamageSound();
                    }
                }
            });
        });
        this.throable_objects = this.throable_objects.filter(bottle => !bottle.removeMissile);
        this.firePower = this.firePower.filter(explosion => !explosion.removeExplosion);
    }
    
    missileExplosion(bottle){   
        bottle.damage();
        //console.log(bottle.x , bottle.y);
        //Explosion
        this.addExplosion(bottle.x, bottle.y);
          
    }

    endbossDamage(enemy){
        if(enemy === this.endboss){// //this.level.enemies[3]
            console.log(true);
            enemy.damage();
            console.log(enemy.energy);
            this.enemy_health_bar.setPercentage(enemy.energy);
        }else{
            enemy.damage();
            // funktioniert aber explosions-animation muss noch angepasst werden. 
        }
    }
   
    endbossMovement(){
        if(this.endboss && this.character.x >= 7300 && !this.endboss.isdetectionX){
            this.endboss.detectionX = true;
            this.isObjectVisible = true;   
        }
    }
   
    checkEndbossDistance(){
        let distance = Math.abs((this.character.x + this.character.width)-this.endboss.x);
        if(distance <= 200 && !this.endboss.isAttacking){
            this.endboss.bossAttackMovement();
        }else if(distance <= 1400 ){
            this.endboss.distanceX = true;
            this.audio.stopWorldBackgroundSound();
        }else if(distance >=1401){
            this.endboss.distanceX = false;
            this.audio.playWorldBackgroundSound();
        }
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x , 0); // transalte verschiebt die camera
        // Y Achse muss angegeben werden, da dies sonst zu Fehlern führt. 
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x , 0);
        // Space for fixed Objects
        this.addToMap(this.health_bar);
        this.addToMap(this.coin_bar);
        this.addToMap(this.bottle_bar);
        this.ctx.translate(this.camera_x , 0);
        //this.addObjectsToMap(this.detonation, 0);
        //this.endboss.x +100
        //statusbar 
        if(this.isObjectVisible){
            this.ctx.translate(-this.camera_x , 0);
            this.addToMap(this.enemy_health_bar);
            this.ctx.translate(this.camera_x , 0);
        }
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throable_objects);
        this.addObjectsToMap(this.firePower);
        this.ctx.translate(-this.camera_x , 0);
        // Draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function(){
            self.draw()
        });
    }

    addObjectsToMap(objects){
        objects.forEach(o => {
            this.addToMap(o);
        })
    }
    //mo = MovableObject
    addToMap(mo){
        if(mo.otherDirection){
            this.flipImgae(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if(mo.otherDirection){
            this.flipImgaeBack(mo);    
        }
    }

    flipImgae(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    flipImgaeBack(mo){
        mo.x = mo.x * -1
        this.ctx.restore();
    }

    gameOver(){
        if(this.gameIsEnding){
            return
        }
        if(this.character.energy === 0){
            this.gameIsEnding = true;
            this.endboss.speed = 0;
            //this.stopGame();        
            setTimeout(()=>{
                console.log('test')
                this.stopGame();
                gameIsOver();
            },7000);
        }
        if(this.endboss.energy===0){
            this.gameIsEnding = true;
            this.character.speed = 0;
            //this.stopGame();
            setTimeout(()=>{
               this.stopGame();
                YouWonTheGame();
            },4000)
        }        
    }
    
    
    stopGame(){    
        this.stopIntervals();
        this.clearArrays();
        this.audio.stopAllSounds();       
    }

    clearArrays(){
        this.level.enemies = []
        this.level.clouds = []
        this.level.coins = []
        this.level.bottles = []
        this.firePower = []
        this.throable_objects=[];
        this.intervalId = [];
        this.audio.soundLib = [];
    }

    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.character.stopIntervals();
        this.level.enemies.forEach((enemy)=>{
            enemy.stopIntervals();
        })
        this.level.clouds.forEach((cloud)=>{
            cloud.stopIntervals();
        })
        this.level.coins.forEach((coin)=>{
            coin.stopIntervals();
        })
    
    }
    

    muteAllSounds(){
        this.audio.muteAllWorldSounds();
    }
    audibleAllSounds(){
        this.audio.audibleAllWorldSounds();
    }
}