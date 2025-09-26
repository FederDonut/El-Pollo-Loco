class AudioController{

    


    isMuted = false;
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
}