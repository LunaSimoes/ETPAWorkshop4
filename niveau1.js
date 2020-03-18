var config = {
	type: Phaser.AUTO,
	width: 1024 ,
	height: 728,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        }
    },
	scene: {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);


function init(){
	var platforms;
	var player;
	var stars;
	var paddle;
	
	this.gameOver = false;
	
}
function preload(){
	this.load.image('background','assets/fondpong.png');	
	this.load.image('sol','assets/solpong.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('paddle','assets/paddle.png');
	this.load.image('monster','assets/monster.png');
	this.load.image('blocus','assets/black2.png');
	this.load.spritesheet('perso','assets/robott.png',{frameWidth: 31, frameHeight: 47});
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(60,600,'sol').setScale(1).refreshBody();
	platforms.create(470,600,'sol');
	platforms.create(850,600,'sol');
	platforms.create(60,0,'sol');
	platforms.create(470,0,'sol');
	platforms.create(850,0,'sol');
	platforms.create(860,250,'blocus');
	platforms.create(140,250,'blocus');
	
	paddle = this.physics.add.group();
	paddle.create(200, 300, 'paddle')
	paddle.create(800, 300, 'paddle')
	 this.physics.add.collider(paddle, platforms);
	 paddle.setVelocityY(140);
	 

	 
	paddle.children.iterate(function (child){
		child.setBounceY(Phaser.Math.FloatBetween(1, 1.2));
	});
	
	

monster = this.physics.add.group();
	monster.create(300, 200, 'monster');
	 this.physics.add.collider(monster, platforms);
	 this.physics.add.collider(monster, paddle);
	 monster.setVelocityX(250);

	 
	monster.children.iterate(function (child){
		child.setBounceY(Phaser.Math.FloatBetween(1, 1));
		child.setBounceX(Phaser.Math.FloatBetween(2, 2));
	});
	
	
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:1000, y:0, stepX:70 }
	})
	 this.physics.add.collider(stars, platforms);
	 this.physics.add.overlap(player,stars,collectStar, null, this);
	 
	 function collectStar (player, star){
		 star.disableBody(true, true);
	 }

	
	
	this.anims.create({
		key:'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 10,
		repeat: -1
	});
	
	this.anims.create({
		key:'stop',
		frames: this.anims.generateFrameNumbers('perso', {start: 4, end: 4}),
		frameRate: 20,
		repeat: -1
	});

	
}

function update(){
	
	player.body.velocity.x = 0;
	
		if(cursor.left.isDown){
		player.anims.play('left',true);
		player.setVelocityX(-190);
		player.setFlipX(false);
	}
	
	else if(cursor.right.isDown) {
		player.anims.play('left',true);
		player.setVelocityX(190);
		player.setFlipX(true);
	}
	
	else {
		player.anims.play('stop',true);
		player.setVelocityX(0);
	}

	if(cursor.up.isDown && player.body.touching.down){
		player.setVelocityY(-200);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(400);
	}
	
	
}
