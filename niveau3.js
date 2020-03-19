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
	this.load.image('sol','assets/solma.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('bombs', 'assets/bombs.png');
	this.load.spritesheet('perso','assets/robot.png',{frameWidth: 31.5, frameHeight: 40});
}
function create(){
	this.add.image(400,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(60,730,'sol').setScale(1).refreshBody();
	platforms.create(470,730,'sol');
	platforms.create(850,730,'sol');
	platforms.create(450,630,'sol');
	platforms.create(650,530,'sol');
	platforms.create(450,430,'sol');
	platforms.create(650,330,'sol');
	platforms.create(450,230,'sol');
	
	player = this.physics.add.sprite(20,680,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	//star
	
	stars = this.physics.add.group({
		key: 'stars',
		repeat:0,
		setXY: {x:500, y:0, stepX:70 }
	})
	 this.physics.add.collider(stars, platforms);
	 this.physics.add.overlap(player,stars,collectStar, null, this);
	 
	 function collectStar (player, star){
		 star.disableBody(true, true);
	 }
	 
	 //bombs
	 
	 bombs = this.physics.add.group({
		key: 'bombs',
		repeat:2,
		setXY: {x:20, y:-600, stepX:400 }
	})
	 this.physics.add.collider(bombs, [player], hitbombs, null, this);
	 
	 bombs = this.physics.add.group({
		key: 'bombs',
		repeat:2,
		setXY: {x:40, y:-1000, stepX:300 }
	})
	 this.physics.add.collider(bombs, [player], hitbombs, null, this);
	 
	 bombs = this.physics.add.group({
		key: 'bombs',
		repeat:2,
		setXY: {x:40, y:-2000, stepX:250 }
	})
	 this.physics.add.collider(bombs, [player], hitbombs, null, this);
	 
	  bombs = this.physics.add.group({
		key: 'bombs',
		repeat:2,
		setXY: {x:60, y:-3000, stepX:300 }
	})
	 this.physics.add.collider(bombs, [player], hitbombs, null, this);
	 
	  bombs = this.physics.add.group({
		key: 'bombs',
		repeat:2,
		setXY: {x:60, y:-6000, stepX:600 }
	})
	 this.physics.add.collider(bombs, [player], hitbombs, null, this);
	 
	  bombs = this.physics.add.group({
		key: 'bombs',
		repeat:2,
		setXY: {x:40, y:-8000, stepX:250 }
	})
	 this.physics.add.collider(bombs, [player], hitbombs, null, this);
	
		//toucher
	
	function hitbombs (player, bombs){
		
		this.physics.pause();
		player.setTint(0xff0000);
	};
	
	 
	//fin bombs
	
	
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
