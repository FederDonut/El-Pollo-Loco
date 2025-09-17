class Endboss extends MovableObject{

    height = 800;
    width = 500;
    y = -50;
    speed = 25;
    detectionX = false;
    isWalking = false;
    isAlert = false;
    //Schlatet zwischen den zusänden 0 = start 1 = alert 2 = walking
   
    
    

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

    Endboss_audio =[
        'audio/endBoss.mp3',
        'audio/endboss died.mp3'
    ]

    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.loadImages(this.IMAGES_alert);
        this.loadImages(this.IMAGES_damage);
        this.loadImages(this.IMAGES_dead);
        this.x = 9000//2600
        this.animate();
        this.bossMovement();
    }

  

    animate(){
        //this.moveLeft();
        setInterval(() =>{


            if(this.isHurt()){
                this.playAnimation(this.IMAGES_damage);

            }else if(this.isDead()){
                this.playAnimation(this.IMAGES_dead);
                this.dead();
                let deathSound = new Audio(this.Endboss_audio[1]);
                deathSound.play();
           
            }else{
                 
                if(this.isAlert){//this.isAlert
                    //console.log('alarm')
                    //console.log(this.isAlert)
                    this.playAnimation(this.IMAGES_alert)
                }else if(this.isWalking){
                    //console.log('Boss lauft jetzt los ')
                    //console.log(this.isWalking)
                    this.playAnimation(this.IMAGES_walking)
                    this.moveLeft();
                }
            }
        },200);
        
    }  

    bossMovement(){
            
        if(!this.detectionX){
            setTimeout(() => this.bossMovement(),1000);
            return;
        }else{
            if(this.isAlert){
                //console.log(1)
                this.isAlert = false;
                this.isWalking = true;
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
}  
