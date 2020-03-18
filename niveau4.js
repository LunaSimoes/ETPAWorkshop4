var config = {
	type: Phaser.AUTO,
	width: 1024 ,
	height: 728,
	physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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
	var monster;
}
function preload(){
	this.load.image('background','assets/fondzelda.png');	
	this.load.image('sol','assets/montagne.png');
	this.load.image('sol2','assets/forest.png');
	this.load.image('sol3','assets/solzelda.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('monster','assets/monster.png');
	this.load.spritesheet('perso','assets/robott.png',{frameWidth: 31, frameHeight: 47});
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(250,50,'sol').setScale(1).refreshBody();
	platforms.create(-80,150,'sol')
	platforms.create(-150,300,'sol')
	platforms.create(550,700,'sol3');
	platforms.create(-150,650,'sol');
	platforms.create(500,400,'sol2');
	platforms.create(1200,50,'sol3');

	


	monster = this.physics.add.group();
	monster.create(200, 300, 'monster');
	monster.create(800, 300, 'monster');
	 this.physics.add.collider(monster, platforms);

	 
	monster.children.iterate(function (child){
		child.setBounceY(Phaser.Math.FloatBetween(1, 1.3));
	});
	
	player = this.physics.add.sprite(250,160,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:900, y:600, stepX:70 }
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
		monster.setVelocityY(-150);
	}
	
	else if(cursor.right.isDown) {
		player.anims.play('left',true);
		player.setVelocityX(190);
		player.setFlipX(true);
		monster.setVelocityY(150);		
	}
	
	else {
		player.anims.play('stop',true);
		player.setVelocityX(0);
	}

	if(cursor.up.isDown){
		player.setVelocityY(-200);
	}
	
	if(cursor.down.isDown){
		player.setVelocityY(200);
	}
}
