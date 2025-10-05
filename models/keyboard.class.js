class Keyboard {

    left = false;
    right = false;
    up = false;
    down = false;
    attack = false;
    space = false;

    world = null;
    //anyKeyPressed = false;

    startTimers(){
        this.world.startInteractivTimer();
        this.world.startSleepTimer();
    }

   
    mobileButtons(){
        //this.world.checkPlayerActivity();
        
    document.getElementById('goLeft').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.left = true;
    });

    document.getElementById('goLeft').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.left = false;
    });

    document.getElementById('goRight').addEventListener('touchstart', (event) =>{
        event.preventDefault()
       
        this.right = true;
    });

    document.getElementById('goRight').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.right = false;
    });

    document.getElementById('jump').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.up = true;
    });

    document.getElementById('jump').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.up = false;
    });

    document.getElementById('attack').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.attack = true;
    });

    document.getElementById('attack').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.startTimers();
        this.attack = false;
    });
}
}