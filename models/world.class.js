class World {

    character = new Character();
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
     
    constructor(canvas, keyboard){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }

    setWorld(){
        this.character.world = this;
    }

    checkCollisions(){
        setInterval(()=>{
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)){
                   //console.log('collision with character detected');
                   this.character.damage(); 
                   //this.character.energy -= 5;
                    console.log('character Energy ' +this.character.energy);
                    if(this.character.energy <= 0){
                        this.character.checkEnergy();
                    }
                };
            });
        },1000)
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x , 0); // transalte verschiebt die camera
        // Y Achse muss angegeben werden, da dies sonst zu Fehlern führt. 
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        
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