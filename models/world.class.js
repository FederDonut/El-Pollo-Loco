class World {

    character = new Character();
    health_bar = new Statusbar();
    level = level1
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    throable_objects = [];
     
    constructor(canvas, keyboard,){
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld(){
        this.character.world = this;
    }

    run(){
        setInterval(()=>{

        this.checkCollisions();
        this.checkThrowObjects();    
           
        },200)
    }


    checkThrowObjects(){
        if(this.keyboard.attack){
            let bottle = new Missile(this.character.x +100, this.character.y +30);
            this.throable_objects.push(bottle);
        }
    }
    checkCollisions(){
        this.level.enemies.forEach((enemy) => {
               if(this.character.isColliding(enemy)){
                  this.character.damage(); 
                   this.health_bar.setPercentage(this.character.energy);
               };
           });
    }

    draw(){
        this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.camera_x , 0); // transalte verschiebt die camera
        // Y Achse muss angegeben werden, da dies sonst zu Fehlern führt. 
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x , 0);
        // Space for fixed Objects
        this.addToMap(this.health_bar);
        this.ctx.translate(this.camera_x , 0); 
        

        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throable_objects);
        
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