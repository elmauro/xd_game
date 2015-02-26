window.onload = function () {
    // variables del juego
    var game = new Phaser.Game(320, 480, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
    //declaramos las variables globales del juego
    var cubo1;
    var cubo2;
    var cubo3;
    var cubo4;
    var cubo5;
    var cubo6;
    var cubo7;

    var cursors;


    function preload() {
        game.load.image('cubo1', '/images/T1-A.png');
		game.load.image('cubo2', '/images/T2-A.png');
		game.load.image('cubo3', '/images/T3-A.png');
		game.load.image('cubo4', '/images/T4-A.png');
		game.load.image('cubo5', '/images/T5-A.png');
		game.load.image('cubo6', '/images/T6-A.png');
		game.load.image('cubo7', '/images/T7-A.png');
    }

    function create() {
        //personaje
        cubo1 = game.add.sprite(0, 0, 'cubo1');
        cubo2 = game.add.sprite(0, 10, 'cubo1');
        cubo3 = game.add.sprite(0, 20, 'cubo1');
        cubo4 = game.add.sprite(10, 20, 'cubo1');

        //asignamos física
        game.physics.arcade.enable(cubo1);
        game.physics.arcade.enable(cubo2);
        game.physics.arcade.enable(cubo3);
        game.physics.arcade.enable(cubo4);
        //controles del juego (flechas del teclado)
        cursors = game.input.keyboard.createCursorKeys();
    }
    
    function update() {
        // configuramos la velocidad de nuestra cubo1
        cubo1.body.velocity.setTo(0, 0);
        cubo2.body.velocity.setTo(0, 0);
        cubo3.body.velocity.setTo(0, 0);
        cubo4.body.velocity.setTo(0, 0);

        // añadimos eventos de moviemiento en caso de presionar algún boton del cursor
        if (cursors.left.isDown)
        {
            cubo1.body.velocity.x = -100;
            cubo2.body.velocity.x = -100;
            cubo3.body.velocity.x = -100;
            cubo4.body.velocity.x = -100;
        }
        else if (cursors.right.isDown)
        {
            cubo1.body.velocity.x = 100;
            cubo2.body.velocity.x = 100;
            cubo3.body.velocity.x = 100;
            cubo4.body.velocity.x = 100;
        }
        if (cursors.up.isDown)
        {
            cubo1.body.velocity.y = -100;
            cubo2.body.velocity.y = -100;
            cubo3.body.velocity.y = -100;
            cubo4.body.velocity.y = -100;
        }
        else if (cursors.down.isDown)
        {
            cubo1.body.velocity.y = 100;
            cubo2.body.velocity.y = 100;
            cubo3.body.velocity.y = 100;
            cubo4.body.velocity.y = 100;
        }

    }


};