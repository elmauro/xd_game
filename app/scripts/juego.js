var game = new Phaser.Game(400, 300, Phaser.AUTO, '', { preload: preload, create: create, update: update });
 
function preload() {
	game.load.image('bg', '/images/starfield.png');
}
 
function create() {
    fondo = game.add.tileSprite(0, 0, 400, 300, 'bg');
    hola = game.add.text(game.world.width/2, game.world.height/2, "Hola Mundo", {font: 'Bold 40px Arial', fill: '#FFF' });
    hola.anchor.x=0.5;
    hola.anchor.y=0.5;
}
function update() {
    fondo.tilePosition.y += 1;
}