class AudioController{

    world;

    Character_audio =   [
        'audio/run.mp3',
        'audio/jump.mp3',
        'audio/attack_sound.mp3',
        'audio/character_is_dead.mp3',
        'audio/character_damage.mp3'
    ];
    
    Endboss_audio =   [
        'audio/endBoss.mp3',
        'audio/endboss died.mp3',
        'audio/strongpunch.mp3',
    ]

    isMuted = false;
    gotDamage = false;
    takeCoin = false;
    reloading = false;
    bossThemePlayed = false;

    zeroEnergy = false;
    charIsDead = false;
    charGotDamage = false;
    jumping = false;
    characterMovement = false;

    //characterSounds(){
    //    this.runSound = new Audio(this.Character_audio[0]);
    //    this.jumpSound = new Audio(this.Character_audio[1]);
    //    this.deathSound = new Audio(this.Character_audio[3]);
    //    this.damageSound = new Audio(this.Character_audio[4]);

    //}

    constructor(){
        //Endboss
        this.bossSound = new Audio(this.Endboss_audio[0]);
        this.bossDeathSound = new Audio(this.Endboss_audio[1]);
        this.bossDamageSound = new Audio(this.Endboss_audio[2]);

        //Character
        this.charRunSound = new Audio(this.Character_audio[0]);
        this.charJumpSound = new Audio(this.Character_audio[1]);
        this.charDeathSound = new Audio(this.Character_audio[3]);
        this.charDamageSound = new Audio(this.Character_audio[4]);


    }

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


    // Enboss Audio
    startEndbossTheme(){
        if(!this.bossThemePlayed){
            this.bossSound.loop = true; // bewirkt,dass die Audiodatei vn anfang bis ende gespielt wird            bossTheme1.play();
            this.bossSound.play();
            this.bossThemePlayed = true;
        }
        
    }

    stopEndbossTheme(){
        if(this.bossThemePlayed){
            this.bossThemePlayed=false;
            this.bossSound.pause();
            this.bossSound.currentTime=0
        }
    }

    playEndbossDeadSound(){
        if(!this.zeroEnergy){
            this.bossDeathSound.play();
            this.zeroEnergy = true;
        }
    }


    //Character Audio

    wastedSound(){
        if(!this.charIsDead){
            this.charDeathSound.play();
            this.charIsDead = true;
        }
    }

    characterTakeDamageSound(){
        if(!this.charGotDamage){
            this.charDamageSound.play();
            this.charGotDamage = true;
        }
    }

    characterJumpSound(){
        if(!this.jumping){
            this.charJumpSound.play();
            this.jumping = true;
        }
    }

    characterRunSound(){
        if(!this.characterMovement){
            this.charRunSound.playbackRate = 1.3;
            this.charRunSound.volume = 1;
            this.charRunSound.play();
            this.characterMovement = true;
        }
    }

    muteAllWorldSounds(){

    }
}