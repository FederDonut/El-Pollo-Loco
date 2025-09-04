let canvas;
let world;
let keyboard = new Keyboard();



function init(){
  
   
    //console.log('my Character is', world.character);
}

function startGame(){
    let overlayRef = document.getElementById('startScreen');
    console.log('start');
    overlayRef.classList.toggle('d-none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    
}

window.addEventListener('keydown', (event) => {
    
    //console.log(event.code);
    //console.log(event.key);

    if (event.key == "ArrowRight"){
        keyboard.right = true;
    };

    if (event.key == "ArrowLeft"){
        keyboard.left = true;
    };

    if (event.key == "ArrowUp"){
        keyboard.up = true;
    };

    if (event.key == "ArrowDown"){
        keyboard.down = true;
    };

    if(event.key == " "){
        keyboard.space == true;
    }

    if(event.key == "d"){
        keyboard.attack = true;
       
    }
});

window.addEventListener('keyup', (event) =>{
     if (event.key == "ArrowRight"){
        keyboard.right = false;
    };

    if (event.key == "ArrowLeft"){
        keyboard.left = false;
    };

    if (event.key == "ArrowUp"){
        keyboard.up = false;
    };

    if (event.key == "ArrowDown"){
        keyboard.down = false;
    };
    
    if(event.key == " "){
        keyboard.space == false;
    }

    if(event.key == "d"){
        keyboard.attack = false;
    }

});