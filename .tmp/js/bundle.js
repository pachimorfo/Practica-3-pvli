(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'
function Bat(game, sprite, x, y){
    	Phaser.Sprite.call(this,game,x,y,sprite,4);
   	    game.physics.arcade.enable(this);
      	this.body.enable = true;
      	this.body.gravity.x = 0;
      	this.body.gravity.y = 0;
  		this.anchor.setTo(0.5, 0.5);      	
  	  	this.velx = 150;
      	this.vely = 0;
      	this.chase = false;
      	//this.scale.setTo(1.5,1.5);
      	var att = this.animations.add('batattack');
      	//var move = this.animations.add('batmove');	
  	  	      	
}
Bat.prototype = Object.create(Phaser.Sprite.prototype);
Bat.constructor = Bat;
Bat.prototype.batAttack = function(x,y){
	

    
    if (this.x > x)
        this.velx = -150;   
    else if (this.x < x)
        this.velx = 150;
    else this.velx = 0;
                
    if (this.y > y)
        this.vely = -150;
    else if (this.y < y)
        this.vely = 150;
    else this.vely = 0;

    this.body.velocity.x = this.velx;
    this.body.velocity.y = this.vely;

	        
},
Bat.prototype.batmove = function(paredes){
	this.animations.play('batattack',15,true);
	this.vely = 0; 

    if (paredes)
    	this.velx = - this.velx;
               
   	this.body.velocity.x = this.velx;  
   	this.body.velocity.y = this.vely;                

}
module.exports = Bat;
},{}],2:[function(require,module,exports){
var GameOver = {
    create: function () {
        console.log("Game Over");
        var button = this.game.add.button(500, 300, 
                                          'button', 
                                          this.actionOnClick, 
                                          this, 2, 1, 0);
        button.anchor.set(0.5);
        var goText = this.game.add.text(400, 100, "GameOver");
        var text = this.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        goText.anchor.set(0.5);
        button.addChild(text);
        
        //TODO 8 crear un boton con el texto 'Return Main Menu' que nos devuelva al menu del juego.

        var buttonMenu = this.game.add.button(250, 300, 
                                          'button', 
                                          this.menuOnClick, 
                                          this, 2, 2, 4);
        buttonMenu.anchor.set(0.5);
        var textMenu = this.game.add.text(0, 0, "Return Main Menu");
        textMenu.anchor.set(0.5);
        buttonMenu.addChild(textMenu);
        
    },
    
    //TODO 7 declarar el callback del boton.

    actionOnClick: function(){
        this.game.state.start('play');    
    },
    menuOnClick: function(){
        this.game.state.start('menu');    
    }

};


module.exports = GameOver;
},{}],3:[function(require,module,exports){
'use strict';

//TODO 1.1 Require de las escenas, play_scene, gameover_scene y menu_scene.

var gameOver = require ('./gameover_scene.js');
var playScene = require ('./play_scene.js');
var menuScene = require ('./menu_scene.js');


//  The Google WebFont Loader will look for this object, so create it before loading the script.
//Hechos Ejercicio 1 y 2, falta el loadcomplete;

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
    this.game.load.spritesheet('button', 'images/buttons.png', 168, 70);
    this.game.load.image('logo', 'images/phaser.png');
  },

  create: function () {
    //this.game.state.start('preloader');
      this.game.state.start('menu');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(100,300, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5); 
    this.game.load.setPreloadSprite(this.loadingBar);
    this.game.stage.backgroundColor = "#000000";
    
    
    
    this.load.onLoadStart.add(this.loadStart, this);
    //TODO 2.1 Cargar el tilemap images/map.json con el nombre de la cache 'tilemap'.
      //la imagen 'images/simples_pimples.png' con el nombre de la cache 'tiles' y
      // el atlasJSONHash con 'images/rush_spritesheet.png' como imagen y 'images/rush_spritesheet.json'
      //como descriptor de la animación.
      this.game.load.audio('intro','sounds/Intro.mp3');
      this.game.load.audio('loopeo','sounds/Loop.mp3');
      this.game.load.audio('final','sounds/Final.mp3');
      this.game.load.audio('jump','sounds/Jump.mp3');
      this.game.load.audio('hit','sounds/Hit.mp3');
      this.game.load.image('tiles', 'images/TileSetFinal.png');
      
      this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
      //Texturas de Dimitri
      this.game.load.image('rush', 'images/Dimitri Rusheo.png');

      this.game.load.spritesheet('DimitriI', 'images/Dimitri cayendo Izquierda.png', 32,32,5);

      this.game.load.image('Paracaidas', 'images/Dimitri Paracaidas.png');
  
      this.game.load.spritesheet('DimitriPD', 'images/Dimitri Pared Izquierda.png', 32,32,4);



      this.game.load.spritesheet('batmove', 'images/Bat move.png', 32,32,4);
      
      this.game.load.spritesheet('batattack', 'images/Bat Attack.png',32,32,4);
    

      //TODO 2.2a Escuchar el evento onLoadComplete con el método loadComplete que el state 'play'
    this.load.onLoadComplete.add(this.loadComplete,this);



  },

  loadStart: function () {
    //this.game.state.start('play');
    console.log("Game Assets Loading ...");
  },
  loadComplete: function(){
  	this.game.state.start('play');

  },
    
    
   //TODO 2.2b function loadComplete()
    update: function(){
        this._loadingBar
    }
};


var wfconfig = {
 
    active: function() { 
        console.log("font loaded");
        init();
    },
 
    google: {
        families: ['Sniglet']
    }
 
};
 
//TODO 3.2 Cargar Google font cuando la página esté cargada con wfconfig.
//TODO 3.3 La creación del juego y la asignación de los states se hará en el método init().

window.onload = function () {
 
 	WebFont.load(wfconfig);


};

function init(){
 var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
 game.antialias = false;

//TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
                game.state.add('boot',BootScene);
                game.state.add('menu',menuScene);
                game.state.add('preloader',PreloaderScene);
                game.state.add('play',playScene);
                game.state.add('gameOver', gameOver);
//TODO 1.3 iniciar el state 'boot'. 
                game.state.start('boot');
    

};



},{"./gameover_scene.js":2,"./menu_scene.js":4,"./play_scene.js":5}],4:[function(require,module,exports){
var MenuScene = {
    create: function () {
        this.game.world.setBounds(0,0,800,600);
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY+ 175, 
                                               'button', 
                                               this.actionOnClick, 
                                               this, 2, 1, 0);
        buttonStart.anchor.set(0.5);
        var textStart = this.game.add.text(0, 0, "Start");
        textStart.font = 'Sniglet';
        textStart.anchor.set(0.5);
        buttonStart.addChild(textStart);
    },
    
    actionOnClick: function(){
        this.game.state.start('preloader');
    } 
};

module.exports = MenuScene;
},{}],5:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}
var Bat = require('./bat');


//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    _timer: 0,
    _saltoPared: false,
    _enPared: false,
    w: 800, 
    h: 600,
    _bat: {},
    _ptos: 0,
    _isPaused: false,
    _menu: {},
    _menu2: {},
    _unpauseMenu: {},
    _clock: {},
    p: 0,
    _gravitycontroler: true,

    //Método constructor...
  create: function () {
      this.intro = this.game.add.sound('intro');
      this.loopeo = this.game.add.sound('loopeo');
      this.final = this.game.add.sound('final');
      this.hit = this.game.add.sound('hit');
      this.jump = this.game.add.sound('jump');
     if(!this.intro.isPlaying && !this.loopeo.isPlaying)
          this.intro.play();
      this.loopeo.loop = true;
      //Creamos al player con un sprite por defecto.
      //this.soundmaster.intro = this.game.add.audio('intro');
      //this.soundmaster.loopeo = this.game.add.audio('loopeo');
      //this.soundmaster.final = this.game.add.audio('final');
      //this.soundmaster.intro.play();
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('TileSetMapachi','tiles');
      //Creacion de las layers
      this.Fondo = this.map.createLayer('Fondo');
      this.Suelo = this.map.createLayer('Suelo');
      //this.Colisiones = this.map.createLayer('Colisiones');
      this.Deathzones = this.map.createLayer('Deathzones');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this._bat = this.game.add.group();
      var b = new Bat(this.game, 'batattack',10,40);
      console.log(b.x);
      this._bat.add(b);
      //this._bat.push(new Bat(this.game, 'batmove', 10,8640));
      //this._bat.push(new Bat(this.game, 'batmove', 10,10816));
      this._rush = this.game.add.sprite(100,2, 'DimitriI');
      this._rush.scale.setTo(2,2);
      this._rush.animations.add('DimitriI');
      this._rush.animations.play('DimitriI',30,true);
      var self = this;
      

     
      
     // this._rush.animations.add('rush');
     // this._rush.animations.add('Paracaidas');
      //4416
   

      /*for(var i = 0; i < this._bat.length; i++) {
      	this._bat[i].velx = 150;
      	this._bat[i].vely = 0;
      	this._bat[i].scale.setTo(1.5,1.5);
        this._bat[i].animations.add('batattack');
        this._bat[i].animations.add('batmove');
      	
  	  }*/
  	  console.log(this._bat.length);
  	  console.log(this._bat[0]);
      this._pause = this.game.add.text(this.w - 100, 20, 'Pause', { font: '24px Arial', fill: '#ffj' });
      this._pause.fixedToCamera = true;
      this._pause.inputEnabled = true;
      this._puntos = this.game.add.text(this.w - 200, 50, 'Puntos: ' + this._ptos, { font: '24px Arial', fill: '#ffj' });
      this._puntos.fixedToCamera = true;
      this._clock = this.game.time.create(false);
      this._clock.loop(1000, this.updateclock,this);
      this._clock.start();
      
      
      var menu2;
      var unpauseMenu;
      
      this._pause.events.onInputUp.add(function () {
        self._clock.pause();
        self._isPaused = true;
        self._rush.body.bounce.y = 0; //0,2
        self._rush.body.gravity.y = 0;
        self._rush.body.gravity.x = 0;
        self._rush.body.velocity.x = 0;
        self._bat.forEach(function (b){
        	b.body.velx = 0;                    
          	b.body.vely = 0;    
          	console.log(b.x);
            

        });
        

        self._menu = self.game.add.button(self.game.camera.x + 500, self.game.camera.y + 300, 
                                          'button', 
                                          self.actionOnClick, 
                                          self, 2, 1, 0);
        self._menu.anchor.set(0.5);
        var text = self.game.add.text(0, 0, "Reset Game");
        text.anchor.set(0.5);
        self._menu.addChild(text);
               
      
        

        self._menu2 = self.game.add.button(self.game.camera.x + 250, self.game.camera.y + 300, 
                                          'button', 
                                          self.menuOnClick, 
                                          self, 2, 2, 4);
        self._menu2.anchor.set(0.5);
        var textMenu = self.game.add.text(0, 0, "Return Main Menu");
        textMenu.anchor.set(0.5);
        self._menu2.addChild(textMenu);

        self._unpauseMenu = self.game.add.button(self.game.camera.x + 350, self.game.camera.y + 450, 
                                          'button', 
                                          self.unpause, 
                                          self, 2, 2, 4);
        self._unpauseMenu.anchor.set(0.5);
        var textUnpause = self.game.add.text(0, 0, "Continue");
        textUnpause.anchor.set(0.5);
        self._unpauseMenu.addChild(textUnpause);
        
        
        
      });


      this.map.setCollisionBetween(1, 5000, true, 'Suelo');
      this.map.setCollisionBetween(1, 5000, true, 'Deathzones');
      //this.map.setCollisionBetween(1, 5000, true, 'Colisiones');
      //this.death.visible = false;
      //Cambia la escala a x3.
      this.Fondo.setScale(2,2);
      this.Suelo.setScale(2,2);
      this.Deathzones.setScale(2,2);
      this.Suelo.resizeWorld(); //resize world and adjust to the screen
      
      //nombre de la animación, frames, framerate, isloop
      /*this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);*/
      this.configure();
  },
    
    //IS called one per frame.
    update: function () {
      if(!this.intro.isPlaying && !this.loopeo.isPlaying && this.intro.isDecoded && this.loopeo.isDecoded)
        this.loopeo.play();
       // this.soundmaster.intro.onStop.addOnce(function() {  
         // this.soundmaster.loopeo.loopFull();
         // this.soundmaster.loopeo.play()}, this);

        if(!this._isPaused){
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.Suelo);
        var movement = this.GetMovement();
        this._puntos.text = 'Puntuación: ' + this._ptos;
        
        //transitions
        /*switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                else{
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }    
                break;
                
            case PlayerState.JUMP:
                
                var currentJumpHeight = this._rush.y - this._initialJumpHeight;
                this._playerState = (currentJumpHeight*currentJumpHeight < this._jumpHight*this._jumpHight)
                    ? PlayerState.JUMP : PlayerState.FALLING;
                break;
                
            case PlayerState.FALLING:
                if(this.isStanding()){
                    if(movement !== Direction.NONE){
                        this._playerState = PlayerState.RUN;
                        this._rush.animations.play('run');
                    }
                    else{
                        this._playerState = PlayerState.STOP;
                        this._rush.animations.play('stop');
                    }
                }
                break;     
        }
        //States
        switch(this._playerState){
                
            case PlayerState.STOP:
                moveDirection.x = 0;
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:*/
            //Colisiion con la pared. Reseteamos el salto.
                if(collisionWithTilemap){
                    this._enPared = true;
                    this._saltoPared = false;
                }        
                if(this._enPared) {//Si esta en pared, cambiamos gravedad, sensacion de rozamiento.
                    this._rush.body.gravity.y = 5000;
                    this._rush.loadTexture('DimitriPD', 0);
           			this._rush.animations.add('DimitriPD');
				      	this._rush.animations.play('DimitriPD',30,true);
                    
           			
               		
               		//Salto para salir de la pared.
                    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){        
                        this._saltoPared = true;
                        this._enPared = false;
                        this.jump.play();
                        this._rush.loadTexture('DimitriI', 0);
						this._rush.animations.play('DimitriI',30,true);
                    }
                }
                else if (this._rush.body.gravity.y < 25000 && this._gravitycontroler)
                    this._rush.body.gravity.y = 25000;
               
                if(!this._enPared){//Si no es pared, movimiento normal ---->>>>>>>>>> TIMER
                    if(movement === Direction.RIGHT){//Mov Derecha
                        moveDirection.x = this._speed;
                        if(this._rush.scale.x < 0)
                            this._rush.scale.x *= -1;
                    }
                    else if(movement === Direction.NONE){//Sin moverse

                    }
                    else {//Mov Izquierda
                        moveDirection.x = -this._speed;
                            if(this._rush.scale.x > 0)
                               this._rush.scale.x *= -1; 

                    }
                }
              
        //}
        //movement
        this.movement(moveDirection,5,
                      this.Suelo.layer.widthInPixels*this.Suelo.scale.x - 10);
       


       
       
        this._timer++;
      //console.log(this._timer);
        if (this._timer > 200)
            this.teleport(); 


         if(this._saltoPared){
        			this._rush.body.velocity.y = -750;      	

            		if(this._rush.x < 300)
                		this._rush.body.velocity.x = +250;
            		else 
               			this._rush.body.velocity.x = -250;
        			this.p++;
        			if(this.p > 20){
        				this.p = 0;
        				this._saltoPared = false;
        			}	        	

        		}
        
        //this.batMove(); 
     
        var self = this;
        this._bat.forEach(function (b){
        	if(self._rush.y > b.y && (self._rush.y - b.y) < 200)//CAMBIAR
        		b.batAttack(self._rush.x, self._rush.y);        		     
        	else if(self._rush.y < b.y &&  (b.y - self._rush.y) < 200 ){
        		b.batAttack(self._rush.x, self._rush.y); 
        	}
        	else
        		b.batmove(self.game.physics.arcade.collide(b, self.Suelo));  

        });
        	
     
        if(this.checkPlayerFell()){
            //poner flash rojo.
            this.hit.play();
            this.game.camera.flash(0xff0000, 500);
            this._ptos = 0;
            this.onPlayerFell();
        }
        else{
        	this._rush.body.gravity.y += 100;
       
        	if(this.checkPlayerBat()){
       
        		this.game.camera.flash(0xff0000, 500);
              this.hit.play();
            	this._ptos = 0;
            	this.onPlayerFell();
        	}
          

        }        
        

    }},
    updateclock: function(){
    	this._ptos++;
    },
    actionOnClick: function(self){
        this._unpauseMenu.destroy();
        this._menu2.destroy();
    	self.destroy();

        this._isPaused = false;
    	this._rush.body.bounce.y = 1000; //0,2
        this._rush.body.gravity.y = 25000; //2000
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this._ptos = 0;

        
        this.game.state.start('play');    
    },
    menuOnClick: function(self){
        
        this._menu.destroy();
        this._unpauseMenu.destroy();
    	self.destroy();
        
        this._isPaused = false;
    	this._rush.body.bounce.y = 1000; //0,2
        this._rush.body.gravity.y = 25000; //2000
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this._ptos = 0;
        
        this.game.state.start('menu');    
    },
    unpause: function(self){
    	this._clock.resume();
    	this._menu.destroy();
        this._menu2.destroy();
    	self.destroy();

    	this._isPaused = false;
    	this._rush.body.bounce.y = 1000; //0,2
        this._rush.body.gravity.y = 25000; //2000
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
    	
    },
    
    teleport: function (){//SI REDIMENSIONAMOS, CAMBIAR PUNTOS DE TP. IMPORTANTE RESETEAR BAAAAAAAAAATS!!!!!!!!!!!!
            var puntTele = [960,3520,6656,9664,12224];
            for (var i = 1; i<= 4 ; i++){
             //   console.log(this._rush.y);
               //  console.log(puntTele[i]);
            if (this._rush.y > puntTele[i] && this._rush.y < puntTele[i]+10){   
            var nextPoint = Math.floor((Math.random() * 3) + 0)
            console.log(nextPoint);
            this._rush.y = puntTele[nextPoint]; 
            //this.game.camera.setPosition(this._rush.x, this._rush.y);
           // this.game.camera.view.y = this._rush.y;
           // console.log('teleportado');
            this._timer = 0;
            console.log(puntTele[nextPoint]);
            
            this.game.camera.follow(this._rush);
            }
        }   
    },
    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },
    
    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver'; 
        this.destroyResources();
        this.game.state.start('gameOver');
    
    },
    
    checkPlayerFell: function(){
        return(this.game.physics.arcade.collide(this._rush, this.Deathzones));
            //this.onPlayerFell();
    }, 
    checkPlayerBat: function(){
        return(this.game.physics.arcade.collide(this._rush, this._bat));
            //this.onPlayerFell();
    },
        
    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },
        
    isJumping: function(collisionWithTilemap){
        //return this.canJump(collisionWithTilemap) && 
            return this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
    },
        
    GetMovement: function(){
        var movement = Direction.NONE
        //Move Right
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        	this._rush.loadTexture('DimitriI', 0);
			this._rush.animations.play('DimitriI',30,true);
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        	this._rush.loadTexture('DimitriI', 0);
			this._rush.animations.play('DimitriI',30,true);
            movement = Direction.LEFT;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        	//this._rush.animations.play('rush');
        	if(!this._enPared){
        		this._rush.loadTexture('rush');
            	this._rush.y += 4;
        	}
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this._gravitycontroler){
        	//this._rush.animations.play('Paracaidas');
          this._gravitycontroler = false;
        	console.log('AAAAAAAAAARRRRRRRRRIBA');
        	if(!this._enPared){
        		this._rush.loadTexture('Paracaidas');
            	this._rush.body.gravity.y = 5001;
        	}
        }
        else if(!this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){    
          this._gravitycontroler = true;
        }
        if(movement === Direction.NONE){
			/*this._rush.loadTexture('DimitriI');
			this._rush.animations.add('DimitriI');
			this._rush.animations.play('DimitriI',30,true);*/
		}
		
        return movement;
        
    },
    //configure the scene
    configure: function(){
        //Start the Arcade Physics systems
        this.game.world.setBounds(0, 0, 20000, 20000);
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.arcade.enable(this._rush);
        /*for(var i = 0; i < this._bat.length; i++) {
        	this.game.physics.arcade.enable(this._bat[i]);
    	}*/
        
        this._rush.body.bounce.y = 1000; //0,2
        this._rush.body.gravity.y = 25000; //2000
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        this._enPared = false;
        
        this.game.camera.follow(this._rush);
    },
    //move the player
    movement: function(point, xMin, xMax){
        this._rush.body.velocity = point;// * this.game.time.elapseTime;
        
        if((this._rush.x < xMin && point.x < 0)|| (this._rush.x > xMax && point.x > 0))
            this._rush.body.velocity.x = 0;

    },
    
    //TODO 9 destruir los recursos tilemap, tiles y logo.
    destroyResources: function(){
        this._rush.destroy();
        /*for(var i=0;i<this._bat.length;i++){
        	this._bat[i].destroy();
        	this._bat.pop();
        }*/
        this.intro.stop();
        this.loopeo.stop();
        //this.tilemap.destroy();
        //this.tiles.destroy();
        this.game.world.setBounds(0,0,800,600);
    }
};

module.exports = PlayScene;

},{"./bat":1}]},{},[3]);
