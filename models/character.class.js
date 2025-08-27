class Character extends MovableObject{

    height = 300
    y = 395

    IMAGES_walking =[
                    'img/2_character_pepe/2_walk/W-21.png',
                    'img/2_character_pepe/2_walk/W-22.png',
                    'img/2_character_pepe/2_walk/W-23.png',
                    'img/2_character_pepe/2_walk/W-24.png',
                    'img/2_character_pepe/2_walk/W-25.png',
                    'img/2_character_pepe/2_walk/W-26.png',
    ];
    
    
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_walking);
        this.animate();
        
    }

    animate(){
        setInterval(() =>{
        // Modulu function --> % <-- bezieht sich auf einen Rest Betrag
        let i = this.currentImage % this.IMAGES_walking.length; // let i = 0 % 6; 0, Rest 0
        // 0,1,2,3,4,5,0
        this.path = this.IMAGES_walking[i];
        this.img = this.imageCache[this.path];
        this.currentImage++;
        },100)
    }

    jump(){

    }
}