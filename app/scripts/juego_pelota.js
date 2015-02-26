window.onload = function () {
    // variables del juego
    var game = new Phaser.Game(800, 400, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
    //declaramos las variables globales del juego
    var pelota;
    var cursors;


    function preload() {
        game.load.image('pelota', '/images/pelota.png');  
    }

    function create() {
        //personaje
        pelota = game.add.sprite(game.world.centerX, game.world.centerY, 'pelota');
        //asignamos física
        game.physics.arcade.enable(pelota);
        //controles del juego (flechas del teclado)
        cursors = game.input.keyboard.createCursorKeys();
    }
    
    function update() {
        // configuramos la velocidad de nuestra pelota
        pelota.body.velocity.setTo(0, 0);
        // añadimos eventos de moviemiento en caso de presionar algún boton del cursor
        if (cursors.left.isDown)
        {
            pelota.body.velocity.x = -200;
        }
        else if (cursors.right.isDown)
        {
            pelota.body.velocity.x = 200;
        }
        if (cursors.up.isDown)
        {
            pelota.body.velocity.y = -200;
        }
        else if (cursors.down.isDown)
        {
            pelota.body.velocity.y = 200;
        }

    }


};