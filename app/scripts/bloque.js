TETRIS.bloque = function () {
	this.tipo_bloque = [
	    'J',
	    'L',
	    'T',
	    'Z',
	    'S',
	    'LINEA',
	    'CUADRO'
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
	    'RED',
	    'GRAY',
	    'AQUA',
	    'YELLOW',
	    'VIOLET',
	    'BLUE',
	    'GREEN'
	];

	this.self;
	this.game;
	this.ubicacion;
	this.cuadros;
	
	this.crear = function (game, ubicacion, tipobloque) {
		this.game = game;
		
		this.ubicacion =  { X:ubicacion.X, Y:ubicacion.Y }
	    this.color = {};
	    this.tipobloque = tipobloque;
	    thid.tipomovimiento = {};
	    this.tiporotacion =  this.tipo_rotacion[1];
	    this.anteriorrot = {};
	    this.cuadros = [];
	    this.detenido = false;
	};

	this.crearAleatorio = function (game, ubicacion) {
		this.game = game;
		
		this.ubicacion =  { X:ubicacion.X, Y:ubicacion.Y }
	    this.color = {};
	    this.tipobloque = {};
	    this.tipomovimiento = {};
	    this.tiporotacion =  this.tipo_rotacion[1];
	    this.anteriorrot = {};
	    this.cuadros = [];
	    this.detenido = false;
	};

	this.aleatorio = function(){
	  proximo = Math.floor((Math.random() * 7) + 1);

	  if(proximo == 7) {
	    proximo = 6
	  }

	  this.tipobloque = this.tipo_bloque[1];
	  this.crearUbicacionCuadros()
	}

	this.desplazarBloqueIzquierda = function(){
	  //if tablero_tetris:PuedeDesplazarse(bloque.enumTipoMovimiento[1], self.cuadros) {
	    this.ocultarBloque()

	    i = 0
	    while(i < 4) {
	      this.cuadros[i].moverCuadradoIzquierda();
	      i = i + 1
	    }

	    this.mostrarBloque();
	    this.ubicacion = this.cuadros[0].ubicacion;
	  //}
	}

	this.desplazarBloqueDerecha = function(){
	  //if tablero_tetris:PuedeDesplazarse(bloque.enumTipoMovimiento[1], self.cuadros) {
	    this.ocultarBloque()

	    i = 0
	    while(i < 4) {
	      this.cuadros[i].moverCuadradoDerecha();
	      i = i + 1
	    }

	    this.mostrarBloque();
	    this.ubicacion = this.cuadros[0].ubicacion;
	  //}
	}

	this.crearUbicacionCuadros = function(){
		this.color = this.colores[this.tipo_bloque.indexOf(this.tipobloque)];
		cuadrado1 = new TETRIS.cuadrado();
		cuadrado2 = new TETRIS.cuadrado();
		cuadrado3 = new TETRIS.cuadrado();
		cuadrado4 = new TETRIS.cuadrado();

		cuadrado1.crear(this.game, 20, this.color)
		cuadrado2.crear(this.game, 20, this.color)
		cuadrado3.crear(this.game, 20, this.color)
		cuadrado4.crear(this.game, 20, this.color)

		this.cuadros.push(cuadrado1);
		this.cuadros.push(cuadrado2);
		this.cuadros.push(cuadrado3);
		this.cuadros.push(cuadrado4);

		if(this.tipobloque == "J") {
			this.cuadros[0].ubicacion = this.ubicacion
			this.cuadros[1].ubicacion = this.unoArriba()
			this.cuadros[2].ubicacion = this.unoAbajo()
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo()
		}
		else if(this.tipobloque == "L") {
			this.cuadros[0].ubicacion = this.ubicacion
			this.cuadros[1].ubicacion = this.unoArriba()
			this.cuadros[2].ubicacion = this.unoAbajo()
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo()
		}
		else if(this.tipobloque == "Z") {
			this.cuadros[0].ubicacion = this.ubicacion
			this.cuadros[1].ubicacion = this.unoIzquierda()
			this.cuadros[2].ubicacion = this.unoAbajo()
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo()
		}
		else if(this.tipobloque == "CUADRO") {
			this.cuadros[0].ubicacion = this.ubicacion
			this.cuadros[1].ubicacion = this.unoDerecha()
			this.cuadros[2].ubicacion = this.unoAbajo()
			this.cuadros[3].ubicacion = this.unoDerechaUnoAbajo()
		}
		else if(this.tipobloque == "T") {
			this.cuadros[0].ubicacion = this.ubicacion
			this.cuadros[1].ubicacion = this.unoDerecha()
			this.cuadros[2].ubicacion = this.unoIzquierda()
			this.cuadros[3].ubicacion = this.unoAbajo()
		}
		else if(this.tipobloque == "S") {
			this.cuadros[0].ubicacion = this.ubicacion
			this.cuadros[1].ubicacion = this.unoDerecha()
			this.cuadros[2].ubicacion = this.unoAbajo()
			this.cuadros[3].ubicacion = this.unoIzquierdaUnoAbajo()
		}
		else if(this.tipobloque == "LINEA") {
			this.cuadros[0].ubicacion = this.ubicacion
			this.cuadros[1].ubicacion = this.unoArriba()
			this.cuadros[2].ubicacion = this.unoAbajo()
			this.cuadros[3].ubicacion = this.dosAbajo()
		}
							
	}
					

	this.mostrarBloque = function(){
		i = 0
	  	while(i < 4) {
	    	this.cuadros[i].mostrar();
	    	i = i + 1;
	  	}
	}

	this.ocultarBloque = function(){
	  	i = 0
	  	while(i < 4) {
	    	this.cuadros[i].ocultar()
	    	i = i + 1
	  	}
	}

	this.unoArriba = function(){
		return { X:this.ubicacion.X, Y:this.ubicacion.Y - 40 };
	}

	this.unoAbajo = function(){
		return { X:this.ubicacion.X, Y:this.ubicacion.Y + 40 };
	}

	this.unoDerechaUnoAbajo = function(){
		return { X:this.ubicacion.X + 40, Y:this.ubicacion.Y + 40 };
	}
};