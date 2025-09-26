class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 535;
    height =  150;
    width = 150;

    gotDamage = false;
    takeCoin = false;
    reloading = false;;

    playEnemyDamageSound(){
        if(!this.gotDamage){
            this.damageSond = new Audio('audio/strongpunch.mp3');
            this.damageSond.play()
            this.gotDamage =true 
        }
    }

    playCoinSound(){
        if(!this.takeCoin){
            this.coinSound = new Audio('audio/hee-hee_tTMj1yC.mp3');
            this.coinSound.play();
            this.takeCoin = true;
        }
    }

    playReloadingSound(){
        if(!this.reloading){
            this.reloadSound = new Audio('audio/reload.mp3');
            this.reloadSound.play();
            this.reloading = true;
        }
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        
    }

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(array){
        if(!Array.isArray(array))return; // Fallback
        array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path]= img;
        });
    }

    drawFrame(ctx){

        if(this instanceof Character || this instanceof Chicken 
            || this instanceof Missile || this instanceof Endboss || this instanceof Bottle || this instanceof Coin || this instanceof Chick){
            ctx.beginPath();
            ctx.lineWidth = '1';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    
}