class World {

    
    inactivityTimer;
    sleepTimer;
    anyKeyPressed = false;
    timeStamp1 = false;
    chillMode =false;
    sleepMode = false;
   
   
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    bottle_counter = 0;
    coin_counter = 0;
    bossThemePlayed = false;
    throable_objects = [];
    firePower = [];


    character = new Character();
    //explosion = new Explosion();
    health_bar = new Statusbar();
    enemy_health_bar = new Statusbar(new Statusbar().IMAGES_endboss_bar, 9000, 30);
    coin_bar = new Statusbar(new Statusbar().IMAGE_coin_bar , 0, 80);
    bottle_bar = new Statusbar(new Statusbar().IMAGE_bottle_bar ,0, 150 )
     
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.endbossSounds();
        this.checkPlayerActivity();
        this.run();   
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(()=>{

        this.character.lastPositionY = this.character.y;

        this.checkCollisions();
        this.checkMissileCollision()
        this.checkThrowObjects();
        this.checkCollectibleBottle();
        this.checkCoinCollision();
        this.endbossMovement();
        this.endbossAttack();
        
        //this.checkEndbossAudio();
            
           
        },100)
    }

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
                console.log('chill Modus aktiv');
                this.chillMode = true;
                this.sleepMode = false; 
                console.log(this.chillMode);
            }
        },5000);
    
    }

    startSleepTimer(){
        this.sleepTimer = setTimeout(()=>{
            if(!this.anyKeyPressed){
                console.log('character schläft');
                this.chillMode = false;
                this.sleepMode = true;
                console.log(this.sleepMode);
            }
        },10000)
    }

    checkThrowObjects(){
        if(this.keyboard.attack&& this.bottle_counter !== 0){
            
            let bottle = new Missile(this.character.x +100, this.character.y +30);
            this.throable_objects.push(bottle);
           
            // Hier flugbahn der Flasche ändern
            
            // neue Funktion implementieren 
            console.log('peng')
            this.bottle_counter -=1;
            console.log(this.bottle_counter)
            this.bottle_bar.setCollection(this.bottle_counter);
        }
    }

    addExplosion(x,y){
        let explosion = new Explosion(x,y);
        this.firePower.push(explosion)
    }

    
    
    checkCollisions(){
        let endboss = this.level.enemies[3];
        this.level.enemies.forEach((enemy,i) =>{
            if(this.character.isCollidingFromAbove(enemy, this.character.lastPositionY)&& !this.character.isColliding(endboss)){
                console.log('gegner stirbt')
                enemy.damage();
                // test
                this.character.jump();
                // Es wird ein Mechanismus benötigt, welcher dem character keinen Schaden berechnet
               
            }else if(this.character.isColliding(enemy)){
                console.log('normaler Schaden für den character')
                this.character.damage();
                this.health_bar.setPercentage(this.character.energy);
            }
        })
    }
    
    // hier weitermachen
    //checkEnemyCollision(){
    //    let endboss = this.level.enemies[3];
//
    //    this.level.enemies.forEach((enemy)=>){
    //        if(this.character.isColliding(enemy[3],this.character.lastPositionY)){
    //            
    //        }else{
    //            if(this.character.isCollidingFromAbove(enemy, this.character.lastPositionY)){
    //                console.log('gegner stirbt')
    //                enemy.damage();
    //                // test
    //                this.character.jump();
    //                // Es wird ein Mechanismus benötigt, welcher dem character keinen Schaden berechnet
    //               enemies.splice
    //            }else if(this.character.isColliding(enemy)){
    //                console.log('normaler Schaden für den character')
    //                this.character.damage();
    //                this.health_bar.setPercentage(this.character.energy);
    //            } 
    //        }
    //    })
    //}

    checkCollectibleBottle(){
        this.level.bottles.forEach((bottle, i) =>{
            if(this.character.isColliding(bottle)){
                //Test
                //console.log('x = ',this.character.x ,'Größe = ' ,this.character.height , 'y = ',this.character.y,'breite = ' , this.character.width)
                //console.log('x = ',bottle.x,'größe = ', bottle.height,'y = ', bottle.y, 'breite = ',bottle.width)


                bottle.collectBottle = true;
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
                    console.log('collision detected');
                    this.endbossDamage(enemy);
                    bottle.removeMissile = true;
                    this.missileExplosion(bottle);
                    //explosion.removeExplosion = true;
                    bottle.detonateAndDamage(enemy);
                    
                    
                    //wichtiger Verweis zu 
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
        if(enemy === this.level.enemies[3]){
            console.log(true);
            enemy.damage();
            console.log(enemy.energy);
            this.enemy_health_bar.setPercentage(enemy.energy);
        }else{
            enemy.damage();
            // funktioniert aber explosions-animation muss noch angepasst werden. 
        }
    }
    endbossSounds(){
        this.bossTheme1 = new Audio('audio/endBoss.mp3');
    }
    endbossMovement(){
        let endboss =this.level.enemies[3];
            if(endboss && this.character.x >= 7300 && !endboss.isdetectionX){
                endboss.detectionX = true;
            }
    }
   
    endbossAttack(){
        let endboss = this.level.enemies[3];
        let distanze = Math.abs((this.character.x + this.character.width) - endboss.x);
        if(distanze <= 200 && !endboss.isAttacking){
            //console.log('boss führt Angriff aus');
            endboss.bossAttackMovement();
        }
    }

    checkEndbossAudio(){
        if(this.character.x > 1500 && ! this.bossThemePlayed){
            this.bossTheme1.loop = true; // bewirkt,dass die Audiodatei vn anfang bis ende gespielt wird            bossTheme1.play();
            this.bossTheme1.play();
            this.bossThemePlayed = true;
        }else if(this.character.x < 1490 && this.bossThemePlayed){
            this.bossThemePlayed=false;
            this.bossTheme1.pause();
            this.bossTheme1.currentTime=0

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
        
        //Coin_bar position
       
         

        //this.addObjectsToMap(this.detonation, 0);
        
        this.addToMap(this.enemy_health_bar);
        
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

}