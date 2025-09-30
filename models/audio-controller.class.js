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

    World_audio = [
        'audio/better-call-saul-theme.mp3',
        'audio/star-wars-tie-fighter-blaster-sound-effect.mp3',
        'audio/strongpunch.mp3',
        'audio/hee-hee_tTMj1yC.mp3',
        'audio/reload.mp3'
    ]

    isMuted = false;
    gotDamage = false;
    takeCoin = false;
    reloading = false;
    bossThemePlayed = false;
    worldSundTrack = false;
    zeroEnergy = false;
    charIsDead = false;
    charGotDamage = false;
    jumping = false;
    characterMovement = false;
    shot = false;

    soundLib = [];
    soundId;

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
        

        //World
        this.worldSound = new Audio(this.World_audio[0]);
        this.laserShotSound = new Audio(this.World_audio[1]);
        this.damageSond = new Audio(this.World_audio[2]);
        this.coinSound = new Audio(this.World_audio[3])
        this.reloadSound = new Audio(this.World_audio[4]);

        this.soundLib.push( this.bossSound,this.bossDeathSound,this.bossDamageSound,this.charRunSound,this.charJumpSound,this.charDeathSound,this.charDamageSound,
                            this.worldSound,this.laserShotSound,this.damageSond,this.coinSound,this.reloadSound
        );

    }

    playWorldBackgroundSound(){
        if(!this.worldSundTrack){
            this.worldSound.volume = 0.7;
            this.worldSound.loop = true;
            this.worldSound.play();
            this.worldSundTrack = true;
        }
       
    }

    stopWorldBackgroundSound(){
        if(this.worldSundTrack){
            this.worldSundTrack = false;
            this.worldSound.loop = false;
            this.worldSound.pause();
            this.worldSound.currentTime = 0;
        }
    }

    playLaserShotSound(){
        if(!this.shot){
            this.laserShotSound.play();
            this.shot = true;
        }
    }

    stopLaserShotSound(){
        if(this.shot){
            this.shot = false;
            this.laserShotSound.currentTime = 0;
        }
    }

    playEnemyDamageSound(){
        if(!this.gotDamage){
            this.damageSond.play()
            this.gotDamage =true 
        }
    }

    stopEnemyDamageSound(){
        if(this.gotDamage){
            this.gotDamage = false;
            this.damageSond.currentTime = 0;
        }
    }

    playCoinSound(){
        if(!this.takeCoin){
            this.coinSound.play();
            this.takeCoin = true;
        }
    }

    stopCoinSound(){
        if(this.takeCoin){
            this.takeCoin = false;
            this.coinSound.currentTime = 0;
        }
    }

    playReloadingSound(){
        if(!this.reloading){
            this.reloadSound.play();
            this.reloading = true;
        }
    }

    stopReloadingSound(){
        if(this.reloading){
            this.reloading = false;
            this.reloadSound.currentTime = 0;
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

    stopAllSounds(){
        this.stopCoinSound();
        this.stopEndbossTheme();
        this.stopEnemyDamageSound();
        this.stopLaserShotSound();
        this.stopReloadingSound();
        this.stopWorldBackgroundSound();
    }

    muteAllWorldSounds(){
        this.soundLib.forEach((sound)=>{
            sound.muted = true;
        })
    }

    audibleAllWorldSounds(){
        this.soundLib.forEach((sound)=>{
            sound.muted = false;
        })        
    }

}