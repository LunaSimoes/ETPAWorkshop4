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
	var text1;
	var text2;
	var text3;
	var text4;

}
function preload(){
	this.load.image('background','assets/fond.png');	
	this.load.image('sol','assets/platdonnee.png');
	this.load.image('stars', 'assets/donnee.png');
	this.load.image('touche', 'assets/touche.png');
	this.load.image('touchesaut', 'assets/touchesaut.png');
	this.load.image('recolte', 'assets/recolte.png');
	this.load.image('finished', 'assets/finished.png');
	this.load.spritesheet('perso','assets/robot.png',{frameWidth: 31.5, frameHeight: 40});
}
function create(){
	this.add.image(515,50,'background');
	
	platforms = this.physics.add.staticGroup();
	platforms.create(-100,700,'sol').setScale(1).refreshBody();
	platforms.create(380,700,'sol').setScale(1).refreshBody();
	platforms.create(1000,700,'sol').setScale(1).refreshBody();
	
	
	//consigne
	text1 = this.add.text(16, 50, '"Bonjour Programme 6.4.8.', {fontSize: '20px', fill:'#FFF'});
	text2 = this.add.text(16, 100, 'Vous etes charge de retrouver les fragments de code manquant a notre projet.', {fontSize: '20px', fill:'#FFF'});
	text3 = this.add.text(16, 150, 'L un de ces fragments se trouve au fond de cette salle.', {fontSize: '20px', fill:'#FFF'});
	text4 = this.add.text(16, 200, 'Recoltez toutes les donnees et vous pourrez rentrer."', {fontSize: '20px', fill:'#FFF'});
	
	//tuto
	
	touche = this.physics.add.staticGroup();
	touche.create(170,350,'touche').setScale(1).refreshBody();
	
	touchesaut = this.physics.add.staticGroup();
	touchesaut.create(620,350,'touchesaut').setScale(1).refreshBody();
	
	recolte = this.physics.add.staticGroup();
	recolte.create(920,350,'recolte').setScale(1).refreshBody();


//player
	
	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	this.physics.add.collider(player,platforms);
	
	cursor = this.input.keyboard.createCursorKeys();
	
	
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
