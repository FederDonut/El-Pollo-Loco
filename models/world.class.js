/**
 * @class
 * Represents the main game world, managing all objects, game logic, collisions, 
 * rendering, and state (like timers and game flow).
 */
class World {

    inactivityTimer;
    sleepTimer;
    anyKeyPressed = false;
    chillMode =false;
    sleepMode = false;
    isObjectVisible = false; // fixiert statusbar Bossgegener
    canThrow = true; 
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
    enemy_health_bar = new Statusbar(new Statusbar().IMAGES_endboss_bar, 1300, 30);
    coin_bar = new Statusbar(new Statusbar().IMAGE_coin_bar , 0, 80);
    bottle_bar = new Statusbar(new Statusbar().IMAGE_bottle_bar ,0, 150 )
    audio = new AudioController();
     
     /**
     * Creates an instance of World.
     * Initializes the canvas, context, controls, level, and starts the game loops.
     * @param {HTMLCanvasElement} canvas - The canvas element for drawing.
     * @param {Keyboard} keyboard - The keyboard/input manager.
     * @param {Level} level - The level data object.
     */
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
        this.collisonControll(); 
    }

    /**
     * Assigns the 'world' reference to all essential game components 
     * (Character, Enemies, Audio, Keyboard).
     */
    setWorld(){
        this.character.world = this;
        this.level.enemies.forEach((enemy)=> enemy.world = this);
        this.audio.world = this;
        this.keyboard.world = this;
    }

    /**
    * Starts the main game loop (10 FPS) for checking game logic.
    */
    run(){
        this.intervalId.push(setInterval(()=>{
        this.checkInvincibilityTimer();
        this.checkMissileCollision()
        this.checkThrowObjects();
        this.checkCollectibleBottle();
        this.checkCoinCollision();
        this.endbossMovement();
        this.checkEndbossDistance();
        this.gameOver();
        },100))
    }

    collisonControll(){
        this.intervalId.push(setInterval(()=>{
            this.character.lastPositionY = this.character.y;
            this.checkCollisions();
        },10))
    }
    /**
    * Sets up event listeners for key presses to monitor player activity.
    */
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

    /**
    * Clears existing inactivity timers and resets the idle flags.
    */
    resetTimers(){
        clearTimeout(this.inactivityTimer);
        clearTimeout(this.sleepTimer);
        this.chillMode = false;
        this.sleepMode = false;
    }

    /**
    * Starts the timer for short inactivity, leading to "chill" mode.
    */
    startInteractivTimer(){
        this.inactivityTimer = setTimeout(()=>{
            if(!this.anyKeyPressed){
                this.chillMode = true;
                this.sleepMode = false; 
            }
        },100);
    
    }

    /**
    * Starts the timer for long inactivity, leading to "sleep" mode.
    */
    startSleepTimer(){
        this.sleepTimer = setTimeout(()=>{
            if(!this.anyKeyPressed){
                this.chillMode = false;
                this.sleepMode = true;
            }
        },10000)
    }

    /**
    * Checks if the attack button is pressed and throws a missile if bottles are available.
    */
    checkThrowObjects(){
        if(this.keyboard.attack&& this.bottle_counter !== 0 && this.canThrow){
            this.canThrow = false;
            this.audio.playLaserShotSound();
            this.audio.stopLaserShotSound();
            let bottle = new Missile(this.character.x +100, this.character.y +30);
            this.throable_objects.push(bottle); 
            this.bottle_counter -=1;
            this.bottle_bar.setCollection(this.bottle_counter);
            setTimeout(()=>{this.canThrow = true},1000)
        }
    }

    /**
     * Creates and adds an explosion object to the game world.
     * @param {number} x - X-coordinate of the explosion.
     * @param {number} y - Y-coordinate of the explosion.
     */
    addExplosion(x,y){
        let explosion = new Explosion(x,y);
        this.firePower.push(explosion)
    }
    
    /**
    * Checks for collisions between the character and enemies.
    */
    
    checkCollisions(){ 
        this.level.enemies.forEach((enemy) =>{
            if(this.character.isCollidingFromAbove(enemy)&& !this.character.isColliding(this.endboss)){
                this.enemyDestruction(enemy);  
                
            }else if(this.character.isColliding(enemy)&& !this.character.invincible && !this.character.isHurt()){
                if(enemy === this.endboss){
                    this.character.damage()
                    this.character.damage();
                    this.character.damage();
                    this.character.damage();
                    console.log('dreifacher schaden')
                    this.resetTimers();
                    this.health_bar.setPercentage(this.character.energy);
                    this.checkPlayerActivity();
                }else{
                    this.character.damage();
                    this.character.damage();
                    this.resetTimers();
                    this.health_bar.setPercentage(this.character.energy);
                    this.checkPlayerActivity();
                }
                
            }
            //else if(this.character.isColliding(this.endboss)){
            //    this.character.damage();
            //    this.resetTimers();
            //    this.health_bar.setPercentage(this.character.energy);
            //    this.checkPlayerActivity();
            //}
        })
        this.checkBouncingStatus();
    }

    enemyDestruction(enemy){
        this.character.invincible = true;
        this.character.isBouncing = true;
        enemy.damage();
        this.character.lastStompTime = new Date().getTime(); 
        this.character.jump();
        this.audio.playEnemyDamageSound();
        this.audio.stopEnemyDamageSound();
        this.checkPlayerActivity();
    }

    checkBouncingStatus(){
    const Y_STOMP_THRESHOLD = 350;
        if (this.character.y >= 394) {this.character.isBouncing = false;}
        if(this.character.isBouncing && this.character.speedY <= 0 && this.character.y > Y_STOMP_THRESHOLD){
            this.character.isBouncing = false;
        }
    }

    checkInvincibilityTimer(){
        const TIME_PROTECTION = 200;
        const timePassed = new Date().getTime() - this.character.lastStompTime;
        if (timePassed > TIME_PROTECTION && !this.character.isBouncing) {
            this.character.invincible = false;
        }
    }

    /**
    * Checks for collisions between the character and collectible bottles.
    */
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
                }
            }
        })
    }

    /**
    * Checks for collisions between the character and collectible coins.
    */
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

    /**
    * Checks for collisions between thrown missiles and enemies.
    */
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
    
    /**
    * Handles the visual and logical effect of a missile detonation.
    * @param {Missile} bottle - The missile object that detonated.
    */
    missileExplosion(bottle){   
        bottle.damage();
        this.addExplosion(bottle.x, bottle.y);
    }

    /**
    * Applies damage to the endboss and updates its health bar.
    * @param {MovableObject} enemy - The enemy object that was hit.
    */
    endbossDamage(enemy){
        if(enemy === this.endboss){
            enemy.damage();
            this.enemy_health_bar.setPercentage(enemy.energy);
        }else{
            enemy.damage(); 
        }
    }
   
    /**
    * Triggers the endboss's behavior when the character reaches a certain X position.
    */
    endbossMovement(){
        if(this.endboss && this.character.x >= 7300 && !this.endboss.isdetectionX){
            this.endboss.detectionX = true;
            this.isObjectVisible = true;   
        }
    }
   
    /**
    * Checks the distance to the endboss to trigger attack patterns and boss music.
    */
    checkEndbossDistance(){
        let distance = Math.abs((this.character.x + this.character.width)-this.endboss.x);
        if(distance <= 200 && !this.endboss.isAttacking){
            this.endboss.bossAttackMovement();
        }else if(distance <= 1400 ){
           this.endboss.distanceX = true;  
           this.audio.stopWorldBackgroundSound();
        }else if(distance >=1401 && this.endboss.distanceX === false){
            this.audio.playWorldBackgroundSound();
        }
    }

    /**
    * The main rendering function. Clears the canvas, draws all objects (handling camera/parallax), 
    * and uses `requestAnimationFrame` for continuous drawing.
    */
    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x , 0); // transalte verschiebt die camera
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x , 0);
        this.addToMap(this.health_bar);
        this.addToMap(this.coin_bar);
        this.addToMap(this.bottle_bar);
        this.ctx.translate(this.camera_x , 0);
        if(this.isObjectVisible){
            this.ctx.translate(-this.camera_x , 0);
           
            this.addToMap(this.enemy_health_bar);
            this.ctx.translate(this.camera_x , 0);
        }
        this.addObjectsToMap(this.level.enemies);
         //this.addToMap(this.level.endboss);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throable_objects);
        this.addObjectsToMap(this.firePower);
        this.ctx.translate(-this.camera_x , 0);
        let self = this;
        requestAnimationFrame(function(){
            self.draw()
        });
    }

    /**
    * Helper function to draw an array of objects.
    * @param {DrawableObject[]} objects - An array of objects to draw.
    */
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

    /**
    * Flips the canvas context horizontally for drawing mirrored images.
    * @param {MovableObject} mo - The object being flipped.
    */
    flipImgae(mo){
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context to its original state after drawing a flipped image.
     * @param {MovableObject} mo - The object that was flipped.
     */
    flipImgaeBack(mo){
        mo.x = mo.x * -1
        this.ctx.restore();
    }

    /**
    * Checks the win/loss conditions and initiates the game over/you won sequence.
    */
    gameOver(){
        if(this.gameIsEnding){
            return
        }
        if(this.character.energy === 0){
            this.gameIsEnding = true;
            this.endboss.speed = 0;        
            setTimeout(()=>{
                this.stopGame();
                gameIsOver();
            },4000);
        }
        if(this.endboss.energy===0){
            this.gameIsEnding = true;
            this.character.speed = 0;
            setTimeout(()=>{
               this.stopGame();
                YouWonTheGame();
            },4000)
        }        
    }
    
    /**
     * Halts all game activity: stops intervals, clears arrays, and stops sounds.
     */
    stopGame(){    
        this.stopIntervals();
        this.clearArrays();
        this.audio.stopAllSounds();       
    }

    //Cut
    /**
    *  Clears all arrays, 
    */
    clearArrays(){
        this.level.enemies = []
        this.level.clouds = []
        this.level.coins = []
        this.level.bottles = []
        this.level.backgroundObjects = [];
        this.firePower = []
        this.throable_objects=[];
        this.intervalId = [];
        this.audio.soundLib = [];
    }

     /**
    * Stops all running intervals for the world, character, and all objects in the level.
    */
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

    /**
    * Mutes all managed game sounds.
    */
    muteAllSounds(){
        this.audio.muteAllWorldSounds();
    }

    /**
    * Restores sound volume for all managed game sounds.
    */
    audibleAllSounds(){
        this.audio.audibleAllWorldSounds();
    }
}