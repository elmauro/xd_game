TETRIS.bloque = function () {
	this.tipo_bloque = [
		'L',
		'T',
		'CUADRO',
		'LINEA',
	    'J',
	    'S',
	    'Z'
	];

	this.tipo_movimiento = [
	    'IZQUIERDA',
	    'DERECHA',
	    'ABAJO'
	];

	this.tipo_rotacion = [
	    'NORTE',
	    'ORIENTE',
	    'SUR',
	    'OCCIDENTE'
	];

	this.colores = [
	    'YELLOW',
	    'GRAY',
	    'AQUA',
	    'RED',
	    'VIOLET',
	    'BLUE',
	    'GREEN'
	];

	this.self;
	this.ubicacion;
	this.cuadros;
	
	this.crear = function (ubicacion, tipobloque) {
		this.ubicacion =  { X:ubicacion.X, Y:ubicacion.Y };
	    this.color = {};
	    this.tipobloque = tipobloque;
	    thid.tipomovimiento = {};
	    this.tiporotacion =  this.tipo_rotacion[0];
	    this.anteriorrot = {};
	    this.cuadros = [];
	    this.detenido = false;
	};

	this.crearAleatorio = function (ubicacion) {
		this.ubicacion =  { X:ubicacion.X, Y:ubicacion.Y };
	    this.color = {};
	    this.tipobloque = {};
	    this.tipomovimiento = {};
	    this.tiporotacion =  this.tipo_rotacion[0];
	    this.anteriorrot = {};
	    this.cuadros = [];
	    this.detenido = false;
	};

	this.aleatorio = function(){
	  	proximo = Math.floor((Math.random() * 7) + 1);

	  	if(proximo == 7) {
			proximo = 6;
	  	}

	  	this.tipobloque = this.tipo_bloque[proximo];
	  	this.crearUbicacionCuadros()
	};

	this.desplazarBloqueIzquierda = function(){
	  if (tablero_tetris.puedeDesplazarse(this.tipo_movimiento[0], this.cuadros)) {
		    this.ocultarBloque();

		    i = 0;
		    while(i < 4) {
	      		this.cuadros[i].moverCuadradoIzquierda();
		      	i = i + 1;
		    }

		    this.mostrarBloque();
		    this.ubicacion = this.cuadros[0].ubicacion;
	  }
	};

	this.desplazarBloqueDerecha = function(){
	  if (tablero_tetris.puedeDesplazarse(this.tipo_movimiento[1], this.cuadros)) {
		    this.ocultarBloque();

		    i = 0;
		    while(i < 4) {
	      		this.cuadros[i].moverCuadradoDerecha();
		      	i = i + 1;
		    }

		    this.mostrarBloque();
		    this.ubicacion = this.cuadros[0].ubicacion;
	  }
	};

	this.desplazarBloqueAbajo = function(){
		if (tablero_tetris.puedeDesplazarse(this.tipo_movimiento[2], this.cuadros)) {
			this.ocultarBloque();

			i = 0;
			while(i < 4) {
				this.cuadros[i].moverCuadradoAbajo();
				i = i + 1;
			}

			this.mostrarBloque();
			this.ubicacion = this.cuadros[0].ubicacion;
		}
		else
		{
			tablero_tetris.ingresarCuadradosMatriz(this.cuadros);
			//tetris:DetenerCuadrado()
			this.detenido = true;
		}
	};

	this.crearUbicacionCuadros = function(){
		this.color = this.colores[this.tipo_bloque.indexOf(this.tipobloque)];
		cuadrado1 = new TETRIS.cuadrado();
		cuadrado2 = new TETRIS.cuadrado();
		cuadrado3 = new TETRIS.cuadrado();
		cuadrado4 = new TETRIS.cuadrado();

		cuadrado1.crear(40, this.color);
		cuadrado2.crear(40, this.color);
		cuadrado3.crear(40, this.color);
		cuadrado4.crear(40, this.color);

		this.cuadros.push(cuadrado1);
		this.cuadros.push(cuadrado2);
		this.cuadros.push(cuadrado3);
		this.cuadros.push(cuadrado4);

		if(this.tipobloque == "J") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo();
		}
		else if(this.tipobloque == "L") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo();
		}
		else if(this.tipobloque == "Z") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoIzquierda();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo();
		}
		else if(this.tipobloque == "CUADRO") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo();
		}
		else if(this.tipobloque == "T") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoIzquierda();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
		else if(this.tipobloque == "S") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo();
		}
		else if(this.tipobloque == "LINEA") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.dosAbajo();
		}
							
	};				

	this.mostrarBloque = function(){
		i = 0;
	  	while(i < 4) {
	    	this.cuadros[i].mostrar();
	    	i = i + 1;
	  	}
	};

	this.ocultarBloque = function(){
	  	i = 0;
	  	while(i < 4) {
	    	this.cuadros[i].ocultar();
	    	i = i + 1;
	  	}
	};

	this.rotarCuadros = function(){
		if (this.detenido == false) {
			anterior1 = this.cuadros[0].ubicacion;
			anterior2 = this.cuadros[1].ubicacion;
			anterior3 = this.cuadros[2].ubicacion;
			anterior4 = this.cuadros[3].ubicacion;
			anteriorrot = this.tiporotacion;

			this.ocultarBloque();

			nuevarot = 0;
			nuevarot = this.tipo_rotacion.indexOf(this.tiporotacion) + 1;

			if (nuevarot > 3) {
				nuevarot = 0;
			}

			this.tiporotacion = this.tipo_rotacion[nuevarot];

			if (this.tipobloque == "J") {
				this.rotarJ(this.tiporotacion);
				this.revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot);
			}
			else if (this.tipobloque == "L") {
				this.rotarL(this.tiporotacion);
				this.revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot);
			}	
			else if (this.tipobloque == "Z") {
				this.rotarZ(this.tiporotacion);
				this.revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot);
			}
			else if (this.tipobloque == "T") {
				this.rotarT(this.tiporotacion);
				this.revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot);
			}
			else if (this.tipobloque == "S") {
				this.rotarS(this.tiporotacion);
				this.revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot);
			}
			else if (this.tipobloque == "LINEA") {
				this.rotarLinea(this.tiporotacion);
				this.revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot);
			}

			this.mostrarBloque();
		}
	};

	this.revertir = function(anterior1, anterior2, anterior3, anterior4, anteriorRot){
		if (tablero_tetris.puedeRotar(this.cuadros) == false) {
			this.cuadros[0].ubicacion = anterior1;
			this.cuadros[1].ubicacion = anterior2;
			this.cuadros[2].ubicacion = anterior3;
			this.cuadros[3].ubicacion = anterior4;
			this.tiporotacion = anteriorRot;
		}
	};

	this.rotarJ = function(rot){
		if (rot == "NORTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo();
		}
		else if (rot == "ORIENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoIzquierda();
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoArriba();
		}
		else if (rot == "SUR") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoArribaUnoDerecha();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
		else if (rot == "OCCIDENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoIzquierda();
			this.cuadros[2].ubicacion = this.unoDerecha();
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo();
		}
	};

	this.rotarL = function(rot){
		if (rot == "NORTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo();
		}
		else if (rot == "ORIENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoIzquierda();
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo();
		}
		else if (rot == "SUR") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoArribaUnoIzquierda();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
		else if (rot == "OCCIDENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoIzquierda();
			this.cuadros[2].ubicacion = this.unoDerecha();
			this.cuadros[3].ubicacion = this.unoArribaUnoDerecha();
		}
	};

	this.rotarZ = function(rot){
		if (rot == "NORTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoArribaUnoIzquierda();
			this.cuadros[3].ubicacion = this.unoDerecha();
		}
		else if (rot == "ORIENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoArribaUnoDerecha();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
		else if (rot == "SUR") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoArribaUnoIzquierda();
			this.cuadros[3].ubicacion = this.unoDerecha();
		}
		else if (rot == "OCCIDENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoArribaUnoDerecha();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
	};

	this.rotarS = function(rot){
		if (rot == "NORTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo();
		}
		else if (rot == "ORIENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoIzquierda();
			this.cuadros[2].ubicacion = this.unoArribaUnoIzquierda();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
		else if (rot == "SUR") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo();
		}
		else if (rot == "OCCIDENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoIzquierda();
			this.cuadros[2].ubicacion = this.unoArribaUnoIzquierda();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
	};

	this.rotarT = function(rot){
		if (rot == "NORTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoIzquierda();
			this.cuadros[3].ubicacion = this.unoAbajo();
		}
		else if (rot == "ORIENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoIzquierda();
		}
		else if (rot == "SUR") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoDerecha();
			this.cuadros[2].ubicacion = this.unoIzquierda();
			this.cuadros[3].ubicacion = this.unoArriba();
		}
		else if (rot == "OCCIDENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.unoDerecha();
		}
	};

	this.rotarLinea = function(rot){
		if (rot == "NORTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.dosAbajo();
		}
		else if (rot == "ORIENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoIzquierda();
			this.cuadros[2].ubicacion = this.unoDerecha();
			this.cuadros[3].ubicacion = this.dosDerecha();
		}
		else if (rot == "SUR") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoArriba();
			this.cuadros[2].ubicacion = this.unoAbajo();
			this.cuadros[3].ubicacion = this.dosAbajo();
		}
		else if (rot == "OCCIDENTE") {
			this.cuadros[0].ubicacion = this.ubicacion;
			this.cuadros[1].ubicacion = this.unoIzquierda();
			this.cuadros[2].ubicacion = this.unoDerecha();
			this.cuadros[3].ubicacion = this.dosDerecha();
		}
	};

	this.unoArriba = function(){
		return { X:this.ubicacion.X, Y:this.ubicacion.Y - 1 };
	};

	this.unoArribaUnoDerecha = function(){
	  	return { X:this.ubicacion.X + 1, Y:this.ubicacion.Y - 1 };
	};

	this.unoArribaUnoIzquierda = function(){
	  	return { X:this.ubicacion.X - 1, Y:this.ubicacion.Y - 1 };
	};

	this.unoAbajo = function(){
		return { X:this.ubicacion.X, Y:this.ubicacion.Y + 1 };
	};

	this.dosAbajo = function(){
	  	return { X:this.ubicacion.X, Y:this.ubicacion.Y + (1 * 2) };
	};

	this.dosAbajoUnoDerecha = function(){
	  	return { X:this.ubicacion.X + 1, Y:this.ubicacion.Y + (1 * 2) };
	};

	this.dosAbajoUnoIzquierda = function(){
	  	return { X:this.ubicacion.X - 1, Y:this.ubicacion.Y + (1 * 2) };
	};

	this.tresAbajo = function(){
	  	return { X:this.ubicacion.X, Y:this.ubicacion.Y + (1 * 3) };
	};

	this.unoDerecha = function(){
	  	return { X:this.ubicacion.X + 1, Y:this.ubicacion.Y }
	};

	this.dosDerecha = function(){
	  	return { X:this.ubicacion.X + (1 * 2), Y:this.ubicacion.Y };
	};

	this.tresDerecha = function(){
	  	return { X:this.ubicacion.X + (1 * 3), Y:this.ubicacion.Y }
	};

	this.unoDerechaUnoAbajo = function(){
		return { X:this.ubicacion.X + 1, Y:this.ubicacion.Y + 1 };
	};

	this.dosDerechaUnoAbajo = function(){
	  	return { X:this.ubicacion.X + (1 * 2), Y:this.ubicacion.Y + 1 }
	};

	this.unoIzquierda = function(){
	  	return { X:this.ubicacion.X - 1, Y:this.ubicacion.Y }
	};

	this.dosIzquierda = function(){
	  	return { X:this.ubicacion.X - (1 * 2), Y:this.ubicacion.Y }
	};

	this.tresIzquierda = function(){
	  	return { X:this.ubicacion.X - (1 * 3), Y:this.ubicacion.Y }
	};

	this.unoIzquierdaUnoAbajo = function(){
	  	return { X:this.ubicacion.X - 1, Y:this.ubicacion.Y + 1 }
	};

	this.unoIzquierdaUnoArriba = function(){
	  	return { X:this.ubicacion.X - 1, Y:this.ubicacion.Y - 1 }
	};

	this.dosIzquierdaUnoAbajo = function(){
	  	return { X:this.ubicacion.X - (1 * 2), Y:this.ubicacion.Y + 1 }
	};
};