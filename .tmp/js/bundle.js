(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
      this.game.load.image('tiles', 'images/TileSetFinal.png');
      this.game.load.tilemap('tilemap', 'images/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.atlas('rush', 'images/rush_spritesheet.png', 'images/rush_spritesheet.json', Phaser.Loader.TEXTURE_ATLAS_JSON_HASH);
      this.game.load.image('bat', 'images/bat.png');


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

//TODO 1.2 Añadir los states 'boot' BootScene, 'menu' MenuScene, 'preloader' PreloaderScene, 'play' PlayScene, 'gameOver' GameOver.
                game.state.add('boot',BootScene);
                game.state.add('menu',menuScene);
                game.state.add('preloader',PreloaderScene);
                game.state.add('play',playScene);
                game.state.add('gameOver', gameOver);
//TODO 1.3 iniciar el state 'boot'. 
                game.state.start('boot');
    

};



},{"./gameover_scene.js":1,"./menu_scene.js":3,"./play_scene.js":4}],3:[function(require,module,exports){
var MenuScene = {
    create: function () {
        this.game.world.setBounds(0,0,800,600);
        var logo = this.game.add.sprite(this.game.world.centerX, 
                                        this.game.world.centerY, 
                                        'logo');
        logo.anchor.setTo(0.5, 0.5);
        var buttonStart = this.game.add.button(this.game.world.centerX, 
                                               this.game.world.centerY, 
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
},{}],4:[function(require,module,exports){
'use strict';

//Enumerados: PlayerState son los estado por los que pasa el player. Directions son las direcciones a las que se puede
//mover el player.
var PlayerState = {'JUMP':0, 'RUN':1, 'FALLING':2, 'STOP':3}
var Direction = {'LEFT':0, 'RIGHT':1, 'NONE':3}


//Scena de juego.
var PlayScene = {
    _rush: {}, //player
    _speed: 300, //velocidad del player
    _jumpSpeed: 600, //velocidad de salto
    _jumpHight: 150, //altura máxima del salto.
    _playerState: PlayerState.STOP, //estado del player
    _direction: Direction.NONE,  //dirección inicial del player. NONE es ninguna dirección.
    _timer: 0,
    _salto: true,
    _saltoPared: true,
    _enPared: false,
    w: 800, 
    h: 600,
    _bat: {}, //bat

    //Método constructor...
  create: function () {
      //Creamos al player con un sprite por defecto.
      //TODO 5 Creamos a rush 'rush'  con el sprite por defecto en el 10, 10 con la animación por defecto 'rush_idle01'
      //TODO 4: Cargar el tilemap 'tilemap' y asignarle al tileset 'patrones' la imagen de sprites 'tiles'
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('TileSetMapachi','tiles');
      //Creacion de las layers
      this.Fondo = this.map.createLayer('Fondo');
      this.Suelo = this.map.createLayer('Suelo');
      //this.Colisiones = this.map.createLayer('Colisiones');
      this.Deathzones = this.map.createLayer('Deathzones');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this._rush = this.game.add.sprite(100,2, 'rush');
      this._bat = this.game.add.sprite(10,500, 'bat');
      this._bat.velx = 150;
      this._bat.vely = 0;
      this._pause = this.game.add.text(this.w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
      this._pause.fixedToCamera = true;
      this._pause.inputEnabled = true;
      //this._pause.cameraOffset.setTo(200, 500);
      var self = this;
      var menu;
      var choiseLabel;
      this._pause.events.onInputUp.add(function () {
        // When the paus button is pressed, we pause the game
        self.game.paused = true;
       

        // Then add the menu
        menu = self.game.add.sprite(self.camera.width/2, self.camera.height/2, 'menu');
        //menu.fixedToCamera = true;
        menu.anchor.setTo(0.5, 0.5);

        // And a label to illustrate which menu item was chosen. (This is not necessary)
        choiseLabel = self.game.add.text(self.camera.width/2, self.camera.height-150, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
      });
      this.game.input.onDown.add(unpause,self);
      
      function unpause(event){
        // Only act if paused
        if(self.game.paused){
            // Calculate the corners of the menu
            var x1 = self.w/2 - 270/2, x2 = self.w/2 + 270/2,
                y1 = self.h/2 - 180/2, y2 = self.h/2 + 180/2;

            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 90) + 3*Math.floor(y / 90);

                // Display the choice
                choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                self.game.paused = false;
            }
        }
    };



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
      this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
      this.configure();
  },
    
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.arcade.collide(this._rush, this.Suelo);
        var movement = this.GetMovement();
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
                    this._saltoPared = true;
                    this._salto = true;
                }        
                if(this._enPared) {//Si esta en pared, cambiamos gravedad, sensacion de rozamiento.
                    this._rush.body.gravity.y = 5000;
                    //Salto para salir de la pared.
                    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this._saltoPared){
                        //this.jump();
                        moveDirection.y = -12500;
                        this._saltoPared = false;
                        this._enPared = false;
                    }
                }
                else
                    this._rush.body.gravity.y = 10000;
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

                    }//Salto normal. ->>>>>>>>>>>>>>>>>>>>>> SE HACE A LA VEZ QUE EL OTRO SALTO Y NO VA BIEN, RETOCAR.
                    if(this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && this._salto){
                        moveDirection.y = -12500;
                        //this.jump();
                        this._salto = false;
                    }
                }
                console.log(this._salto + 'salto normal');
                console.log(this._saltoPared + 'salto pared');

        //}
        //movement
        this.movement(moveDirection,5,
                      this.Suelo.layer.widthInPixels*this.Suelo.scale.x - 10);
       


        if(this.checkPlayerFell()){
            //poner flash rojo.
            this.game.camera.flash(0xff0000, 500);
            this.onPlayerFell();
        }
       
        this._timer++;
      //console.log(this._timer);
        if (this._timer > 200)
            this.teleport();

        if (this._rush.y > this._bat.y && (this._rush.y - this._bat.y) < 200)
            this.batAttack();
        else if (this._rush.y < this._bat.y &&  (this._bat.y - this._rush.y) < 200 )
             this.batAttack();

        else this.batMove();

    },
    jump: function(){
        for(var i = 0; i<20;i++)
            this._rush.y -= 5;     
        
    },
    batAttack:function (){
                if (this._bat.x > this._rush.x)
                    this._bat.velx = -150;   
                else if (this._bat.x < this._rush.x)
                    this._bat.velx = 150;
                else this._bat.velx = 0;
                if (this._bat.y > this._rush.y)
                    this._bat.vely = -150;
                else if (this._bat.y < this._rush.y)
                    this._bat.vely = 150;
                else this._bat.vely = 0;

            this._bat.body.velocity.x = this._bat.velx;
            this._bat.body.velocity.y = this._bat.vely;
    },

    batMove: function(){
           
            console.log('salio');
            this._bat.vely = 0;
           
            if (this.game.physics.arcade.collide(this._bat, this.Suelo))
                this._bat.velx = - this._bat.velx;
                
            this._bat.body.velocity.x = this._bat.velx;                    
            this._bat.body.velocity.y = this._bat.vely;       
    },

    pause: function(){
        this.game.paused = true;

        // Then add the menu
        this.menu = this.game.add.sprite(this.w/2, this.h/2, 'menu');
        this.menu.anchor.setTo(0.5, 0.5);
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
        this.game.state.start('gameOver');
    
    },
    
    checkPlayerFell: function(){
        return(this.game.physics.arcade.collide(this._rush, this.Deathzones));
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
            movement = Direction.RIGHT;
        }
        //Move Left
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
            movement = Direction.LEFT;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
            this._rush.y += 4;
        }
        if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)){
            this._rush.y -= 4;
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
        this.game.physics.arcade.enable(this._bat);
        
        this._rush.body.bounce.y = 1000; //0,2
        this._rush.body.gravity.y = 10000; //2000
        this._rush.body.gravity.x = 0;
        this._rush.body.velocity.x = 0;
        
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
        this.tilemap.destroy();
        this.tiles.destroy();
        this.game.world.setBounds(0,0,800,600);
    }
};

module.exports = PlayScene;

},{}]},{},[2]);
