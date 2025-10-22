class WorldManager{

    constructor(world){
        this.world = world;
    }
    /**
    * Draws all dynamic and collectible objects in the game world.
    *
    * This includes enemies, bottles, coins, throwable objects, and fire power.
    * It applies a final translation to prepare the canvas for fixed HUD elements.
    *
    * @returns {void}
    */
    drawTrowableObjectsAndEnemys(){
        this.addObjectsToMap(this.world.level.bottles);
        this.addObjectsToMap(this.world.level.coins);
        this.addObjectsToMap(this.world.level.enemies);
        this.addObjectsToMap(this.world.throable_objects);
        this.addObjectsToMap(this.world.firePower);
        this.world.ctx.translate(-this.world.camera_x , 0);
    }

     /**
    * Draws the Endboss's health bar on the canvas, ensuring it remains fixed on the screen
    * (not scrolling with the camera).
    *
    * @returns {void}
    */
    drawEnboss(){
        this.world.ctx.translate(-this.world.camera_x , 0);
        this.addToMap(this.world.enemy_health_bar);
        this.world.ctx.translate(this.world.camera_x , 0);
    }

    /**
    * Draws the main game elements and the player's status bars.
    *
    * It applies camera translation to draw background, clouds, and character at their
    * world coordinates, and then resets the translation to draw fixed status bars (HUD).
    *
    * @returns {void}
    */
    drawCharacterAndStatusBars(){
        this.world.ctx.translate(this.world.camera_x , 0);
        this.addObjectsToMap(this.world.level.backgroundObjects);
        this.addObjectsToMap(this.world.level.clouds);
        this.addToMap(this.world.character);
        this.world.ctx.translate(-this.world.camera_x , 0);
        this.addToMap(this.world.health_bar);
        this.addToMap(this.world.coin_bar);
        this.addToMap(this.world.bottle_bar);
        this.world.ctx.translate(this.world.camera_x , 0);
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
    // hier cut


    addToMap(mo){
        if(mo.otherDirection){
            this.flipImgae(mo);
        }
        mo.draw(this.world.ctx);
        //mo.drawFrame(this.ctx); --> Debugging Function
        if(mo.otherDirection){
            this.flipImgaeBack(mo);    
        }
    }

    /**
    * Flips the canvas context horizontally for drawing mirrored images.
    * @param {MovableObject} mo - The object being flipped.
    */
    flipImgae(mo){
        this.world.ctx.save();
        this.world.ctx.translate(mo.width, 0);
        this.world.ctx.scale(-1,1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the canvas context to its original state after drawing a flipped image.
        * @param {MovableObject} mo - The object that was flipped.
        */
    flipImgaeBack(mo){
        mo.x = mo.x * -1
        this.world.ctx.restore();
    }

    /**
    * Checks the win/loss conditions and initiates the game over/you won sequence.
    */
    gameOver(){
        if(this.world.gameIsEnding){
            return
        }
        if(this.world.character.energy === 0){
            this.characterIsDead();
        }
        if(this.world.endboss.energy===0){
            this.endbossIsDead();
        }        
    }

    /**
    * Initiates the sequence for the endboss defeat.
    * Sets the global game ending flag, stops the main character's movement, and
    * after a 4-second delay, stops all game activity and calls the 'YouWonTheGame' function.
    */
    endbossIsDead(){
        this.world.gameIsEnding = true;
        this.world.character.speed = 0;
        setTimeout(()=>{
            this.stopGame();
            YouWonTheGame();
        },4000)
    }

    /**
    * Initiates the sequence for the main character's death.
    * Sets the global game ending flag, stops the endboss's movement, and
    * after a 4-second delay, stops all game activity and calls the 'gameIsOver' function.
    */
    characterIsDead(){
        this.world.gameIsEnding = true;
        this.world.endboss.speed = 0;        
        setTimeout(()=>{
            this.stopGame();
            gameIsOver();
        },4000);
    }
    /**
     * Halts all game activity: stops intervals, clears arrays, and stops sounds.
        */
    stopGame(){    
        this.stopIntervals();
        this.clearArrays();
        this.world.audio.stopAllSounds();       
    }

    //Cut
    /**
    *  Clears all arrays, 
    */
    clearArrays(){
        this.world.level.enemies = []
        this.world.level.clouds = []
        this.world.level.coins = []
        this.world.level.bottles = []
        this.world.level.backgroundObjects = [];
        this.world.firePower = []
        this.world.throable_objects=[];
        this.world.intervalId = [];
        this.world.audio.soundLib = [];
    }

        /**
    * Stops all running intervals for the world, character, and all objects in the level.
    */
    stopIntervals(){
        this.world.intervalId.forEach(interval => {clearInterval(interval)});
        this.world.character.stopIntervals();
        this.world.level.enemies.forEach((enemy)=>{
            enemy.stopIntervals();
        })
        this.world.level.clouds.forEach((cloud)=>{
            cloud.stopIntervals();
        })
        this.world.level.coins.forEach((coin)=>{
            coin.stopIntervals();
        })
    }

    /**
    * Mutes all managed game sounds.
    */
    muteAllSounds(){
        this.world.audio.muteAllWorldSounds();
    }

    /**
    * Restores sound volume for all managed game sounds.
    */
    audibleAllSounds(){
        this.world.audio.audibleAllWorldSounds();
    }
}
