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

    //Método constructor...
  create: function () {
      this.configure();
      //Creamos al player con un sprite por defecto.
      //CREAR GRUPO PARA LAS PAREDES. ->>> platforms = game.add.group();
      this.map = this.game.add.tilemap('tilemap');
      this.map.addTilesetImage('TileSetMapachi','tiles');
      //Creacion de las layers
      this.Fondo = this.map.createLayer('Fondo');
      this.Suelo = this.map.createLayer('Suelo');
      //this.Colisiones = this.map.createLayer('Colisiones');
     // this.Deathzones = this.map.createLayer('Deathzones');
      //Colisiones con el plano de muerte y con el plano de muerte y con suelo.
      this._rush = this.game.add.sprite(10,2, 'rush');
      this.map.setCollisionBetween(1, 5000, true, 'Suelo');
      //this.map.setCollisionBetween(1, 5000, true, 'Colisiones');
      //this.death.visible = false;
      //Cambia la escala a x3.
      this.Fondo.setScale(1,1);
      this.Suelo.setScale(1,1);
      //this.Deathzones.setScale(3,3);
      
      this.Suelo.resizeWorld(); //resize world and adjust to the screen
      
      //nombre de la animación, frames, framerate, isloop
      this._rush.animations.add('run',
                    Phaser.Animation.generateFrameNames('rush_run',1,5,'',2),10,true);
      this._rush.animations.add('stop',
                    Phaser.Animation.generateFrameNames('rush_idle',1,1,'',2),0,false);
      this._rush.animations.add('jump',
                     Phaser.Animation.generateFrameNames('rush_jump',2,2,'',2),0,false);
      
  },
    
    //IS called one per frame.
    update: function () {
        var moveDirection = new Phaser.Point(0, 0);
        var collisionWithTilemap = this.game.physics.ninja.collide(this._rush, this.Suelo);
        var movement = this.GetMovement();
        //transitions
        switch(this._playerState)
        {
            case PlayerState.STOP:
            case PlayerState.RUN:
                if(this.isJumping(collisionWithTilemap)){
                    this._playerState = PlayerState.JUMP;
                    this._initialJumpHeight = this._rush.y;
                    this._rush.animations.play('jump');
                }
                /*else if(){//si tenemos el salto disponible, podemos saltar una vez

                }*/
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
                //Animacion stop/caida.
                break;
            case PlayerState.JUMP:
            case PlayerState.RUN:
            case PlayerState.FALLING:
                if(movement === Direction.RIGHT){
                   /* moveDirection.x = this._speed;
                    if(this._rush.scale.x < 0)
                        this._rush.scale.x *= -1;*/
                    this._rush.body.moveRight(150);
                    //animacion derecha.
                }
                else{
                    /*moveDirection.x = -this._speed;
                    if(this._rush.scale.x > 0)
                        this._rush.scale.x *= -1; */
                    this._rush.body.moveLeft(150);
                    //Animacion izquierda.
                }
                if(this._playerState === PlayerState.JUMP)
                    this._rush.body.moveUp(350);
                if(this._playerState === PlayerState.FALLING)
                    moveDirection.y = 0;
                break;    
        }
        //movement
        this.movement(moveDirection,5,
                      this.Suelo.layer.widthInPixels*this.Suelo.scale.x - 10);
        this.checkPlayerFell();
    },
    
    
    canJump: function(collisionWithTilemap){
        return this.isStanding() && collisionWithTilemap || this._jamping;
    },
    
    onPlayerFell: function(){
        //TODO 6 Carga de 'gameOver'; 
        this.game.state.start('gameOver');
    
    },
    
    checkPlayerFell: function(){
        if(this.game.physics.ninja.collide(this._rush, this.death))
           this.onPlayerFell();
    },
        
    isStanding: function(){
        return this._rush.body.blocked.down || this._rush.body.touching.down
    },
        
    isJumping: function(collisionWithTilemap){
        return this.canJump(collisionWithTilemap) && 
            this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
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
        this.game.physics.startSystem(Phaser.Physics.NINJA);
        this.game.world.setBounds(0, 0, 20000, 20000);
        
        this.game.stage.backgroundColor = '#a9f0ff';
        this.game.physics.ninja.enable(this._rush);
        
        this._rush.body.bounce.y = 1000; //0,2
        this._rush.body.gravity.y = 20000; //2000
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
