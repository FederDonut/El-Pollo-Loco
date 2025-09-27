class Endboss extends MovableObject{

    height = 800;
    width = 500;
    y = -50;
    speed = 25;
    detectionX = false;
    isWalking = false;
    isAlert = false;
    isAttacking = false;
    //bossThemePlayed = false;
    distanceX = false;
    //zeroEnergy = false;
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

    //Endboss_audio =[
    //    'audio/endBoss.mp3',
    //    'audio/endboss died.mp3',
    //    'audio/strongpunch.mp3',
    //]

    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_alert);
        this.loadImages(this.IMAGES_damage);
        this.loadImages(this.IMAGES_dead);
        this.loadImages(this.IMAGES_attack);
        //this.endbossSounds();
        this.x = 9000//2600
        this.animate();
        this.bossMovement();
        this.playEndbossSounds();
        //this.bossAttackMovement();
    }

  

    animate(){
        //this.moveLeft();
        this.intervalId.push(setInterval(() =>{
            if(this.isHurt()){
                this.playAnimation(this.IMAGES_damage);
            }else if(this.isDead()){
                this.playAnimation(this.IMAGES_dead);
                this.dead();
                //this.stopEndbossTheme();
                //this.playDeadSound();
                this.world.audio.stopEndbossTheme();
                this.world.audio.playEndbossDeadSound();
                this.world.audio.zeroEnergy = false;

                setTimeout(()=>{this.world.gameOver()},4000);
           
            }else{
                 
                if(this.isAlert){//this.isAlert
                    this.playAnimation(this.IMAGES_alert)
                }else if(this.isWalking){
                    this.playAnimation(this.IMAGES_walking)
                    this.moveLeft();
                }else if(this.isAttacking){
                    this.playAnimation(this.IMAGES_attack);
                    this.bossAttack();

                }
            }
        },200));
    }

    playEndbossSounds(){
        this.intervalId.push(setInterval(()=>{
            if(this.distanceX && !this.isHurt()&& !this.isDead()){
                //this.startEndbossTheme();
                this.world.audio.startEndbossTheme();
                console.log(true);
            }
            else{
                //this.stopEndbossTheme();
                this.world.audio.stopEndbossTheme();
                console.log(false)

            }  
        },200))
    }  

    bossMovement(){
        if(this.isAttacking){
            setTimeout(()=> this.bossMovement(),this.IMAGES_attack.length);
            return;
        }
            
        else if(!this.detectionX){
            setTimeout(() => this.bossMovement(),1000);
            return;
        }else{
            if(this.isAlert){
                //console.log(1)
                this.isAlert = false;
                this.isWalking = true; // beginnt zu laufen 
                //console.log('IsAlert = ',this.isAlert);
                setTimeout(() => this.bossMovement(),2000);
            }else{
                //this.sequenceStatus = 2;
                //console.log(2)
                this.isAlert = true;
                this.isWalking = false;
                setTimeout(() => this.bossMovement(),3000);
            }
        }
              
    }

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
    
    //endbossSounds(){
    //    this.bossSound = new Audio(this.Endboss_audio[0]);
    //    this.deathSound = new Audio(this.Endboss_audio[1]);
    //    this.damageSound = new Audio(this.Endboss_audio[2])
    //}
//
    //startEndbossTheme(){
    //    if(!this.bossThemePlayed){
    //        this.bossSound.loop = true; // bewirkt,dass die Audiodatei vn anfang bis ende gespielt wird            bossTheme1.play();
    //        this.bossSound.play();
    //        this.bossThemePlayed = true;
    //    }
    //    
    //}
//
    //stopEndbossTheme(){
    //    if(this.bossThemePlayed){
    //        this.bossThemePlayed=false;
    //        this.bossSound.pause();
    //        this.bossSound.currentTime=0
    //    }
    //}
//
    //playDeadSound(){
    //    if(!this.zeroEnergy){
    //        this.deathSound.play();
    //        this.zeroEnergy = true;
    //    }
    //}
    
    stopIntervals(){
        this.intervalId.forEach(interval => {clearInterval(interval)});
        this.intervalId = [];
    }
}  
