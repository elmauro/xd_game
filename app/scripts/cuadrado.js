TETRIS.cuadrado = function () {
	this.self;
	this.game;
	this.tamano;
	this.color;
	this.ubicacion;

	this.crear = function (game, tamano, color) {
		this.game = game;
		this.tamano = tamano;
		this.color = color;
		this.ubicacion = {};
	};

	this.mostrar = function (tamano, color) {
		this.self = this.game.add.sprite(this.ubicacion.X, this.ubicacion.Y, this.color);
	};

	this.ocultar = function (tamano, color) {
		this.self.parent.removeChild(this.self);
	};

	this.moverCuadradoIzquierda = function(){
	  this.ubicacion.X =  this.ubicacion.X - 40
	}

	this.moverCuadradoDerecha = function(){
	  this.ubicacion.X =  this.ubicacion.X + 40
	}

	this.moverCuadradoAbajo = function(){
	  this.ubicacion.Y =  this.ubicacion.Y + 40
	}
};


