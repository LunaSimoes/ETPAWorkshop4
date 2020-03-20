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
	this.load.image('balle','assets/balle.png');
	this.load.image('blocus','assets/black2.png');
	this.load.image('finished', 'assets/finished.png');
	this.load.spritesheet('perso','assets/robot.png',{frameWidth: 31.5, frameHeight: 40});
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
	

//player

	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	
	cursor = this.input.keyboard.createCursorKeys();
	
	
//paddle
	
	paddle = this.physics.add.group();
	paddle.create(200, 150, 'paddle')
	paddle.create(800, 150, 'paddle')
	 this.physics.add.collider(paddle, platforms);
	 paddle.setVelocityY(100);
	 
	 
	paddle.children.iterate(function (child){
		child.setBounceY(Phaser.Math.FloatBetween(1, 1));
	});
	
	this.physics.add.collider(paddle, [player], hitpaddle, null, this);
	
		//toucher
	
	function hitpaddle (player, paddle){
		
		this.physics.pause();
		player.setTint(0xff0000);
	};
	
	
	balle = this.physics.add.group();
	balle.create(600, 250, 'balle');
	 this.physics.add.collider(balle, platforms);
	 this.physics.add.collider(balle, paddle);
	 balle.setVelocityX(270);

	 
	balle.children.iterate(function (child){
		child.setBounceY(Phaser.Math.FloatBetween(1, 1));
		child.setBounceX(Phaser.Math.FloatBetween(2, 2));
	});
	this.physics.add.collider(balle, [player], hitmonster, null, this);
	
	//toucher
	
	function hitmonster (player, balle){
		
		this.physics.pause();
		player.setTint(0xff0000);
	};
	
	
	//star
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:1000, y:0, stepX:70 }
	})
	 this.physics.add.collider(stars, platforms);
	 this.physics.add.overlap(player,stars,collectStar, null, this);
	 
	 function collectStar (player, star){
		 star.disableBody(true, true);
		 
		finished = this.physics.add.staticGroup();
		finished.create(500,300,'finished')
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
