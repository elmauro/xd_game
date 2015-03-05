TETRIS.tablero = function () {
	this.tamanocuadro;
	this.LIMITE_ABAJO;
	this.LIMITE_IZQUIERDO;
	this.LIMITE_DERECHO;
	this.LIMITE_ARRIBA;

	this.matriz = {};

	this.crear = function () {
		this.tamanocuadro = 10;
		this.LIMITE_ABAJO = 31;
		this.LIMITE_IZQUIERDO = -1;
		this.LIMITE_DERECHO = 16;
		this.LIMITE_ARRIBA = -5;

		this.matriz = {};

		for (i=0; i<10; i++){
			this.matriz[i] = {};
		
			for (j=0; j<20; j++){
				this.matriz[i][j] = null;
			}
		}	
	}

	this.puedeRotar = function(cuadros){
		i = 0;
		
		while (i < 4) {
			if (cuadros[i].ubicacion.X == -1 || cuadros[i].ubicacion.X == 10 ||
				cuadros[i].ubicacion.Y == -1 || cuadros[i].ubicacion.Y == 20 ||
				this.matriz[cuadros[i].ubicacion.X][cuadros[i].ubicacion.Y] != null) {
				return false
			}
			i = i + 1;
		}
		return true;
	}

	this.puedeDesplazarse = function(tipomovimiento, cuadros){
		if (tipomovimiento == "IZQUIERDA") {
			i = 0;
			
			while (i < 4) {
				if (cuadros[i].ubicacion.X == 0 || this.matriz[cuadros[i].ubicacion.X - 1][cuadros[i].ubicacion.Y] != null) {
					return false;
				}
			
				i = i + 1;
			}
		}
		else if (tipomovimiento == "DERECHA") {
			i = 0;
			
			while (i < 4) {
				if (cuadros[i].ubicacion.X == 9 || this.matriz[cuadros[i].ubicacion.X + 1][cuadros[i].ubicacion.Y]!= null) {
					return false;
				}
				i = i + 1;
			}
		}
		else if (tipomovimiento == "ABAJO") {
			i = 0;
			
			while (i < 4) {
				if (cuadros[i].ubicacion.Y == 19 || this.matriz[cuadros[i].ubicacion.X][cuadros[i].ubicacion.Y + 1]!= null) {
					return false;
				}
				
				i = i + 1;
			}
		}
		return true;
	}

	this.ingresarCuadradosMatriz = function(cuadros){
		i = 0;
		
		while (i < 4) {
			this.matriz[cuadros[i].ubicacion.X][cuadros[i].ubicacion.Y] = cuadros[i];
			i = i + 1;
		}
	}

	this.eliminarCuadradoMatriz = function(cuadro){
  		this.matriz[cuadro.ubicacion.X][cuadro.ubicacion.Y] = null;
	}

	this.consultarFilaLlena = function(){
		filallena = 0;

		for (y = this.LIMITE_ABAJO - 1; y > 0; y--) {
			filallena = 0;
			
			for (x = this.LIMITE_IZQUIERDO + 1; y > this.LIMITE_DERECHO; y--) {
				if (this.matriz[x][y] != null) {
					filallena = filallena + 1;
				}
			}

			if (filallena == 21) {
				return y;
			}
		}

		return -1;
	}

	this.eliminarFilaLlena = function(fila){
		for (y = fila - 1; y > 1; y--) {
			for (x = this.LIMITE_IZQUIERDO + 1; x > this.LIMITE_DERECHO; x--) {
				this.matriz[x][fila] = this.matriz[x][y];

				if (this.matriz[x][fila]!= null) {
					this.matriz[x][fila].moverCuadradoAbajo();
				}
			}
			fila = fila-1;
		}
		this.redibujar();
	}

	this.redibujar = function(){
		//color = display.newRect(0,0,display.contentWidth,display.contentHeight)
		//color:setFillColor(255,255,255)

		for (i=0; i < 10; i++) {
			for (j=0; j < 20; j++) {
				if (this.matriz[i][j]!= null) {
					this.matriz[i][j].mostrar();
				}
			}
		}
	}
};