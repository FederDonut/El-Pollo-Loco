class Statusbar extends DrawableObject{

    height = 100
    width = 300
    
    

    
    IMAGES_health_bar = [
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
                    'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
    ];

    IMAGES_endboss_bar = [
                    'img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
                    'img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
    ]
    percentatge = 100;

    constructor(images = null, x, y){
        super();
        this.images = images || this.IMAGES_health_bar
        this.loadImages(this.images);
        this.x = x || 50;
        this.y = y || 20;
        this.height = 80;
        this.width = 400;
        this.setPercentage(100);
    }

    setPercentage(percentatge){
        this.percentatge = percentatge;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        
    }

    resolveImageIndex(){
        if(this.percentatge === 100){
            return 0;
        }
        else if(this.percentatge > 80){
            return 1;
        }
        else if(this.percentatge > 60){
            return 2;
        }
        else if(this.percentatge > 40){
            return 3;
        }
        else if(this.percentatge > 20){
            return 4;
        }
        else{
            return 5;
        }
    }
}