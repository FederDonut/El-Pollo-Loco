class Statusbar extends DrawableObject{

    height = 100
    width = 300
    
    

    // Precentage
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

    // Collection 
    IMAGE_bottle_bar =[
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
                    'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
    ];

    IMAGE_coin_bar = [
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
                    'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
    ];
    percentatge = 100;
    collection = 0;

    constructor(images = null, x, y){
        super();
        this.images = images || this.IMAGES_health_bar
        this.loadImages(this.images);
        this.x = x || 50;
        this.y = y || 20;
        this.height = 80;
        this.width = 400;
        this.setPercentage(100);
        //this.collectItems(0);
    }

    setPercentage(percentatge){
        this.percentatge = percentatge;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path];
        
    }

    //collectItems(){
    //    let path = this.images[]
    //};

    reverseResolveIndex(){
        if(this.collection === 100){
            return 0
        }
        else if(this.collection > 80){
            return 
        }
        else if(this.collection > 60){
            return 
        }
        else if(this.collection > 40){
            return 
        }
        else if(this.collection > 20){
            return 
        }
        else{
            return 
        }
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