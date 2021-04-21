
class Menu extends Phaser.Scene {
    constructor(){
        super("menuScene");
    }
    preload(){
        this.load.audio('sfx_select', './assets/blipSelect.wav');
        this.load.audio('sfx_explosion', './assets/Impact.wav');
        this.load.audio('sfx_rocket', './assets/Drill.wav');
        this.load.image('start', 'assets/Start.png');
    }
    create(){
      this.ship5 = new Ship(
        this,
        320,
        240,
        'start',
        0,
        2,
        4
    );
        let menuConfig = {
            fontFamily: 'Monaco',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }


          keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
          keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);



    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {


          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {


          this.sound.play('sfx_select');
          this.scene.start('playScene');    
        }
      }


}