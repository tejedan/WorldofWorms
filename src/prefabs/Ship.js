class Ship extends Phaser.GameObjects.Sprite{
    constructor(scene,x, y, texture, frame, pointValue, Speed){
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.wormSpeed = Speed
    }
    update(){

        if(this.x < -this.width) {
            this.x = game.config.width;
        }
        if(this.x > 640){
            this.x = 50
        }
    }
    reset(){
        this.x = game.config.width + 50;
        this.alpha = 1;
    }
    
}