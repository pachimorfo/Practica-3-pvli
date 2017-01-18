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


