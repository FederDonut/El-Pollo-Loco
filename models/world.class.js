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
    isObjectVisible = false; 
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
        this.manager = new WorldManager(this);
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
     * Stops all game activity by delegating the stop command to the WorldManager.
     * This method is called by global functions (e.g., init, tryAgain) to safely
     * terminate game loops, clear arrays, and stop audio playback.
     * * @returns {void}
     */
    stopGame(){
    this.manager.stopGame(); 
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
        this.manager.gameOver();
        },100))
    }

    /**
    * Starts a continuous collision control process.
    * It sets up an interval that runs every 10 milliseconds.
    * In each interval, it updates the character's last vertical position
    * and then checks for any collisions.
    * @returns {void}
    */
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
            setTimeout(()=>{this.canThrow = true},2000)
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
                   this.endBossStrength()
                }else{
                    this.enemyStrength();
                } 
            }
        })
        this.checkBouncingStatus();
    }

    /**
    * Applies a strong damage sequence to the main character, simulating an Endboss attack.
    * The character is damaged four times.
    * Resets the player's inactivity timers, updates the health bar percentage based on the character's energy,
    * and then checks for overall player activity.
    */
    endBossStrength(){
        for(let i = 0 ; i< 4; i++){
            this.character.damage()
        }
        this.resetTimers();
        this.health_bar.setPercentage(this.character.energy);
        this.checkPlayerActivity();
    }
    
    /**
    * Applies standard damage to the main character, simulating an attack from a regular enemy.
    * The character is damaged twice.
    * Resets the player's inactivity timers, updates the health bar percentage based on the character's energy,
    * and then checks for overall player activity.
    */
    enemyStrength(){
        this.character.damage();
        this.character.damage();
        this.resetTimers();
        this.health_bar.setPercentage(this.character.energy);
        this.checkPlayerActivity();
    }

    /**
    * Handles the logic when the character successfully stomps on and destroys an enemy.
    * Sets the character to an invincible and bouncing state, damages the enemy,
    * and initiates a jump and sound effects.
    * @param {Object} enemy - The enemy object that was destroyed.
    */
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

    /**
    * Checks and updates the character's bouncing status after stomping on an enemy.
    * Sets 'isBouncing' to false when the character reaches a certain Y position (394)
    * or starts falling below a threshold while bouncing.
    */
    checkBouncingStatus(){
    const Y_STOMP_THRESHOLD = 350;
        if (this.character.y >= 394) {this.character.isBouncing = false;}
        if(this.character.isBouncing && this.character.speedY <= 0 && this.character.y > Y_STOMP_THRESHOLD){
            this.character.isBouncing = false;
        }
    }

    /**
    * Manages the character's temporary invincibility period after stomping on an enemy.
    * Removes invincibility after a short 'TIME_PROTECTION' duration (200ms)
    * and only if the character is no longer bouncing.
    */
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
                        this.enemyDamageSound();
                    }else if(enemy !== this.endboss){
                        enemy.damage();
                        this.enemyDamageSound();    
                    }}});});
        this.throable_objects = this.throable_objects.filter(bottle => !bottle.removeMissile);
        this.firePower = this.firePower.filter(explosion => !explosion.removeExplosion);
    }
    
    /**
    * Plays the enemy damage sound effect by first initiating the sound
    * and then immediately stopping it (likely intended to ensure the sound plays only once or
    * to handle quick playback state, although the immediate stop might be a logic error depending on the implementation).
    */
    enemyDamageSound(){
        this.audio.playEnemyDamageSound();
        this.audio.stopEnemyDamageSound();
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
        if(distance <= 750 && !this.endboss.isAttacking){
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
        this.manager.drawCharacterAndStatusBars();
        if(this.isObjectVisible){
            this.manager.drawEnboss();
        }
        this.manager.drawTrowableObjectsAndEnemys();
        let self = this;
        requestAnimationFrame(function(){
            self.draw()
        });
    }
}