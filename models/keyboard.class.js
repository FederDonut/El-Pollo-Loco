class Keyboard {

    left = false;
    right = false;
    up = false;
    down = false;
    attack = false;
    space = false;
    //anyKeyPressed = false;

    mobileButtons(){
    document.getElementById('goLeft').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.left = true;
        console.log('left')
    });

    document.getElementById('goLeft').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.left = false;
    });

    document.getElementById('goRight').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.right = true;
    });

    document.getElementById('goRight').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.right = false;
    });

    document.getElementById('jump').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.up = true;
    });

    document.getElementById('jump').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.up = false;
    });

    document.getElementById('attack').addEventListener('touchstart', (event) =>{
        event.preventDefault()
        this.attack = true;
    });

    document.getElementById('attack').addEventListener('touchend', (event) =>{
        event.preventDefault();
        this.attack = false;
    });
}
}