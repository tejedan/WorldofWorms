
class Play extends Phaser.Scene{
    constructor(){
        super("playScene");//sdsds///
    }
    preload(){
        this.load.image('dirtfield', 'assets/Dirtfield.png');
        this.load.image('rocket', 'assets/DrillD.png');
        this.load.image('spaceship', 'assets/Worm.png');
        this.load.image('greenworm', 'assets/WormC.png');
        this.load.audio('music', 'assets/music.wav');
        this.load.spritesheet('explosion', './assets/explosionB.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.audio('sfx_select', './assets/blipSelect.wav');
        this.load.audio('sfx_hit1', './assets/Impact.wav');
        this.load.audio('sfx_hit2', './assets/Hit2.ogg');
        this.load.audio('sfx_hit3', './assets/Hit3.wav');
        this.load.audio('sfx_hit4', './assets/Hit4.wav');
        this.load.audio('sfx_rocket', './assets/Drill.wav');
        
    }
    create(){
        this.sound.play('music');
        this.starfield = this.add.tileSprite(
            0,0,640,480, 'dirtfield'
        ).setOrigin(0,0);

        this.p1Rocket = new Rocket(
            this,
            game.config.width/2,
            game.config.height - borderUISize - borderPadding - 380,
            'rocket'
        );

        this.ship1 = new Ship(
            this,
            100,
            200,
            'spaceship',
            0,
            1,
            2
        );

        this.ship2 = new Ship(
            this,
            300,
            240,
            'spaceship',
            0,
            1,
            2
        );

        this.ship3 = new Ship(
            this,
            500,
            400,
            'greenworm',
            0,
            2,
            4
        );

        this.ship4 = new Ship(
            this,
            100,
            300,
            'greenworm',
            0,
            2,
            4
        );

        this.ship5 = new Ship(
            this,
            380,
            150,
            'greenworm',
            0,
            2,
            4
        );
    

        // white borders
            this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
            this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);


            keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
            keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
            keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
            keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
          
            this.anims.create({
                key: 'explode',
                frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
                frameRate: 30
            });
        this.p1Score = 0;
        this.timer = 60;

        let scoreConfig = {
            fontFamily: 'Monaco',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 100
          }
          this.scoreLeft = this.add.text(borderUISize + borderPadding, 400, this.p1Score, scoreConfig);



          this.gameOver = false;
          scoreConfig.fixedWidth = 0;
          this.clock = this.time.delayedCall(60000, () => {
              this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
              this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart', scoreConfig).setOrigin(0.5);
              this.gameOver = true;
          }, null, this);
          this.direction = Math.random() < 0.5 ? -2 : 2;
          this.directionB = Math.random() < 0.5 ? -2 : 2;
          this.directionC = Math.random() < 0.5 ? -4 : 4;
          this.directionD = Math.random() < 0.5 ? -4 : 4;
          this.directionE = Math.random() < 0.5 ? -4 : 4
    }
    update() {
        this.starfield.tilePositionX -= 4;

        
    
        this.ship1.x -= this.direction
        this.ship2.x -= this.directionB
        this.ship3.x -= this.directionC
        this.ship4.x -= this.directionD
        this.ship5.x -= this.directionE


        setInterval(function(){ this.timer += 1; }, 1000);
        
        

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if (!this.gameOver) {               
            this.p1Rocket.update();         // update rocket sprite
            this.ship1.update();           // update spaceships (x3)
            this.ship2.update();
            this.ship3.update();
            this.ship4.update();
            this.ship5.update();
        } 
        

        this.checkCollision(this.p1Rocket, this.ship1);
        this.checkCollision(this.p1Rocket, this.ship2);
        this.checkCollision(this.p1Rocket, this.ship3);
        this.checkCollision(this.p1Rocket, this.ship4);
        this.checkCollision(this.p1Rocket, this.ship5);




        
    }
    checkCollision(rocket, ship){
        if(rocket.x > ship.x && 
           rocket.x < ship.x+ ship.width && 
           rocket.y +rocket.height > ship.y && 
           rocket.y < ship.y + ship.height){
               this.shipExplode(ship)
               rocket.reset();
               ship.reset();
           }
    }
     shipExplode(ship){
         ship.alpha = 0
         let boom = this.add.sprite(ship.x,ship.y,'explosion').setOrigin(0,0);
         boom.anims.play('explode');
         boom.on('animationcomplete', () => {
             ship.reset();
             ship.alpha = 0;
             let Droll
             Droll = this.getRandomInt(4)
             if(Droll == 0){
                this.sound.play('sfx_hit1');
             }
             if(Droll == 1){
                this.sound.play('sfx_hit2');
             }
             if(Droll == 2){
                this.sound.play('sfx_hit3');
             }
             if(Droll == 3){
                this.sound.play('sfx_hit4');
             }
             
             boom.destroy();
         })
         this.p1Score += ship.points;
         this.scoreLeft.text = this.p1Score; 
         
     }
    getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }
    
}