/**
 * @extends MovableObject
 * @class
 * Represents the final boss enemy, a large chicken. It features complex logic 
 * for detection, alert, walking, attacking, and sound control.
 */
class Endboss extends MovableObject{

    height = 800;
    width = 500;
    y = -50;
    speed = 70;
    detectionX = false;
    isWalking = false;
    isAlert = false;
    isAttacking = false;
    distanceX = false;
    intervalId = [];
    world;
    audio;

    IMAGES_walking =[
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
       
    ];

    IMAGES_alert =[
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
    ]

    IMAGES_attack = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_damage = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    /**parameters for a more precisely collison detection */
    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    };

    /**
    * Creates an instance of Endboss.
    * Loads all animation images, sets the initial X position, and starts the core loops.
    */
    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_alert);
        this.loadImages(this.IMAGES_damage);
        this.loadImages(this.IMAGES_dead);
        this.loadImages(this.IMAGES_attack);
        this.x = 9000
        this.animate();
        this.bossMovement();
        this.playEndbossSounds();
    }

  
    /**
     * Controls the boss's animation based on its current state (Hurt, Dead, Alert, Walking, Attacking).
    */
    animate(){
        this.intervalId.push(setInterval(() =>{
            if(this.isHurt()){
                this.playAnimation(this.IMAGES_damage);
            }else if(this.isDead()){
               this.bossDies();
            }else{
                this.controllBossStatus();
            }
        },200));
    }

    /**
    * Controls the boss's theme music based on the player's proximity (`distanceX`).
    */
    playEndbossSounds(){
        this.intervalId.push(setInterval(()=>{
            if(this.distanceX && !this.isDead()){
                this.world.audio.startEndbossTheme();
            }
        },200))
    }  

    /**
    * Manages the boss's movement pattern (Alert <-> Walk) using time-delayed state changes.
    */
    bossMovement(){
        if(this.isAttacking){
            setTimeout(()=> this.bossMovement(),this.IMAGES_attack.length);
            return;
        }
        else if(!this.detectionX){
            setTimeout(() => this.bossMovement(),1000);
            return;
        }else{
            this.changeBossStatus();
        }        
    }

    /**
    * Triggers the boss death sequence.
    * Plays the death animation, sets the 'dead' state, stops the boss theme music, and plays the boss dead sound.
    * Resets the energy flag.
    */
    bossDies(){
        this.playAnimation(this.IMAGES_dead);
        this.dead();
        this.world.audio.stopEndbossTheme();
        this.world.audio.playEndbossDeadSound();
        this.world.audio.zeroEnergy = false;
    }

    /**
    * Manages and plays the appropriate boss animation based on its current status:
    * - Alert: Plays the alert animation.
    * - Walking: Plays the walking animation and initiates movement to the left.
    * - Attacking: Plays the attack animation and initiates the boss attack action.
    */
    controllBossStatus(){
        if(this.isAlert){
            this.playAnimation(this.IMAGES_alert)
        }else if(this.isWalking){
            this.playAnimation(this.IMAGES_walking)
            this.moveLeft();
        }else if(this.isAttacking){
            this.playAnimation(this.IMAGES_attack);
            this.bossAttack();
        }
    }

    /**
    * Changes the boss's internal state between 'alert' and 'walking', triggering a delayed status change.
    * If currently 'alert', it switches to 'walking' after a 1-second delay (to start movement).
    * If currently not 'alert' (i.e., walking), it switches to 'alert' after a 3-second delay.
    */
    changeBossStatus(){
        if(this.isAlert){
            this.isAlert = false;
            this.isWalking = true; 
            setTimeout(() => this.bossMovement(),1000); //2000
        }else{
            this.isAlert = true;
            this.isWalking = false;
            setTimeout(() => this.bossMovement(),3000);
        }
    }

    /**
    * Triggers the attack animation and movement for a short duration.
    * Resets the state back to alert after the attack is complete.
    */
    bossAttackMovement(){
        if(!this.isAttacking && !this.isDead()){
            this.isAttacking = true;
            this.isWalking = false; 
            this.isAlert = false;
            setTimeout(()=> {
                this.isAttacking = false;
                this.isAlert = true; 
            },this.IMAGES_attack.length *100);
        }
    }
    
    /**
     * Clears all intervals associated with the Endboss, stopping all its processes.
    */
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}  
