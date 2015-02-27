TETRIS.cuadrado = function () {
	this.self;
	this.game;
	this.tamano;
	this.color;
	this.ubucacion;

	this.crear = function (game, tamano, color) {
		this.game = game;
		this.tamano = tamano;
		this.color = color;
		this.ubicacion = {};
	};

	this.mostrar = function (tamano, color) {
		this.self = this.game.add.sprite(this.ubicacion.X, this.ubicacion.Y, this.color);
	};
};


