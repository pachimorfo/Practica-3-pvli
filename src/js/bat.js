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