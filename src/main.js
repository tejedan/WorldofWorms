
//Nathan Tejeda, RPatrolMod(World of Worms), April 21, 2021, Took about 6 hours to complete
// 60 points for Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi)
// 20 points for Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
// 10 points for Create 4 new explosion SFX and randomize which one plays on impact
// 5 points for Add your own (copyright-free) background music to the Play scene
// 5 points for Randomize each spaceship's movement direction at the start of each play
// 100 total(hopefully)

//sounds from https://freesound.org/
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}
let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT, music;