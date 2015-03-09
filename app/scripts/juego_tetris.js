TETRIS.juego = function () {
    this.detenerCuadrado = function(){
        y = tablero_tetris.consultarFilaLlena();

        if (y != -1) {
            tablero_tetris.eliminarFilaLlena(y);
        }

        bloque = new TETRIS.bloque();
        bloque.crearAleatorio({ X:5, Y:1 });
        bloque.aleatorio();
        bloque.mostrarBloque();
    };
};

window.onload = function () {
    // variables del juego
    game = new Phaser.Game(400, 800, Phaser.AUTO, 'game', {preload: preload, create: create, update: update});
    
    //declaramos las variables globales del juego
    var cursors;
    var rightdown;
    var leftdown;
    var updown;
    var down;


    function preload() {
        game.load.image('RED', '/images/T1-A_40x40.png');
		game.load.image('GRAY', '/images/T2-A_40x40.png');
		game.load.image('AQUA', '/images/T3-A_40x40.png');
		game.load.image('YELLOW', '/images/T4-A_40x40.png');
		game.load.image('VIOLET', '/images/T5-A_40x40.png');
		game.load.image('BLUE', '/images/T6-A_40x40.png');
		game.load.image('GREEN', '/images/T7-A_40x40.png');
    };

    function create() {
        //personaje
        juego_tetris = new TETRIS.juego();
        tablero_tetris = new TETRIS.tablero();
        tablero_tetris.crear();

        bloque = new TETRIS.bloque();
        bloque.crearAleatorio({ X:5, Y:1 });
        bloque.aleatorio();
        bloque.mostrarBloque();

        cursors = game.input.keyboard.createCursorKeys();

        timer = game.time.create(false);
        timer.loop(800, updateCounter, this);
        timer.start();
    };

    function updateCounter() {
        bloque.desplazarBloqueAbajo();
    };
    
    function update() {
        // añadimos eventos de moviemiento en caso de presionar algún boton del cursor
        if (cursors.left.isDown)
        {
            if(leftdown) return;
            
            leftdown = true;
            bloque.desplazarBloqueIzquierda();
        }
        else if(cursors.left.isUp)
        {
            leftdown = false;
        }

        if (cursors.right.isDown)
        {
            if(rightdown) return;
            
            rightdown = true;
            bloque.desplazarBloqueDerecha();
        }
        else if(cursors.right.isUp)
        {
            rightdown = false;
        }

        if (cursors.up.isDown)
        {
            if(updown) return;
            
            updown = true;
            bloque.rotarCuadros();   
        }
        else if (cursors.up.isUp)
        {
            updown = false;
        }

        if (cursors.down.isDown)
        {
            if(down) return;
            
            down = true;
            bloque.desplazarBloqueAbajo();   
        }
        else if (cursors.down.isUp)
        {
            down = false;
        }
    };
};