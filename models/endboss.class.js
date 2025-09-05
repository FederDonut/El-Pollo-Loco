class Endboss extends MovableObject{

    height = 800;
    width = 500;
    y = -50;


    IMAGES_walking =[
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
    ]

    Endboss_audio =[
        'audio/endBoss.mp3',
        'audio/endboss died.mp3'
    ]

    constructor(){
        super().loadImage(this.IMAGES_walking[0]);
        this.loadImages(this.IMAGES_walking);
        this.x = 2600
        this.animate();
    }

    animate(){
        //this.moveLeft();
        setInterval(() =>{
            this.playAnimation(this.IMAGES_walking);

        },100)
    }

    
    
    
}