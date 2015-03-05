TETRIS.cuadrado = function () {
	this.self;
	this.tamano;
	this.color;
	this.ubicacion;

	this.crear = function (tamano, color) {
		this.tamano = tamano;
		this.color = color;
		this.ubicacion = {};
	};

	this.mostrar = function () {
		this.self = game.add.sprite(this.ubicacion.X * this.tamano, this.ubicacion.Y * this.tamano, this.color);
	};

	this.ocultar = function () {
		this.self.parent.removeChild(this.self);
	};

	this.moverCuadradoIzquierda = function(){
	  	this.ubicacion.X =  this.ubicacion.X - 1;
	};

	this.moverCuadradoDerecha = function(){
	  	this.ubicacion.X =  this.ubicacion.X + 1;
	};

	this.moverCuadradoAbajo = function(){
	  	this.ubicacion.Y =  this.ubicacion.Y + 1;
	};
};


