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
	var bombs;
}
function preload(){
	this.load.image('background','assets/fondpong.png');	
	this.load.image('sol','assets/soltir.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('plate', 'assets/platform.png');
	this.load.spritesheet('perso','assets/robot.png',{frameWidth: 31.5, frameHeight: 40});
	this.load.image('arme', 'assets/arme.png');
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(60,730,'sol').setScale(1).refreshBody();
	platforms.create(470,730,'sol');
	platforms.create(850,730,'sol');
	platforms.create(1150,100,'sol');
	platforms.create(250,630,'plate');
	platforms.create(450,540,'plate');
	platforms.create(500,540,'plate');
	platforms.create(750,440,'plate');
	platforms.create(800,440,'plate');
	platforms.create(600,340,'plate');
	
	player = this.physics.add.sprite(20,680,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:950, y:0, stepX:70 }
	})
	 this.physics.add.collider(stars, platforms);
	 this.physics.add.overlap(player,stars,collectStar, null, this);
	 
	 function collectStar (player, star){
		 star.disableBody(true, true);
	 }
	 
	 
	 //Lorsqu'on ramasse l'arme on peut tirer
	 
	 arme = this.physics.add.group({
		key: 'arme',
		repeat:0,
		setXY: {x:950, y:600, stepX:70 }
	})
	 this.physics.add.collider(arme, platforms);
	 this.physics.add.overlap(player,arme,collectarme, null, this);
	 
	 function collectarme (player, arme){
		 arme.disableBody(true, true);
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
