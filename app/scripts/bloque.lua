---
-- Created by IntelliJ IDEA.
-- User: mcadavip
-- Date: 27/10/11
-- Time: 10:33 AM
-- To change this template use File | Settings | File Templates.
-- Clase bloque

require('cuadrado')

bloque = {}
bloque.__index = bloque

bloque.enumTipoBloque = {}
bloque.enumTipoBloque[6] = { TIPO = "CUADRO", INDICE = 6}
bloque.enumTipoBloque[0] = { TIPO = "J", INDICE = 0 }
bloque.enumTipoBloque[1] = { TIPO = "L", INDICE = 1 }
bloque.enumTipoBloque[2] = { TIPO = "T", INDICE = 2 }
bloque.enumTipoBloque[3] = { TIPO = "Z", INDICE = 3 }
bloque.enumTipoBloque[4] = { TIPO = "S", INDICE = 4 }
bloque.enumTipoBloque[5] = { TIPO = "LINEA", INDICE = 5 }

bloque.enumTipoMovimiento = {}
bloque.enumTipoMovimiento[1] = { TIPO = "IZQUIERDA", INDICE = 1}
bloque.enumTipoMovimiento[2] = { TIPO = "DERECHA", INDICE = 2}
bloque.enumTipoMovimiento[3] = { TIPO = "ABAJO", INDICE = 3}

bloque.enumTipoRotacion = {}
bloque.enumTipoRotacion[1] = { TIPO = "NORTE", INDICE = 1}
bloque.enumTipoRotacion[2] = { TIPO = "ORIENTE", INDICE = 2}
bloque.enumTipoRotacion[3] = { TIPO = "SUR", INDICE = 3}
bloque.enumTipoRotacion[4] = { TIPO = "OCCIDENTE", INDICE = 4 }

bloque.ubicacion = {}
bloque.cuadros = {}
bloque.colores = {}

bloque.colores[0] = "T5-A.png"--{ Red=0, Green=0, Blue=255 }
bloque.colores[1] = "T4-A.PNG"--{ Red=0, Green=255, Blue=0 }
bloque.colores[2] = "T2-A.png"--{ Red=255, Green=0, Blue=0 }
bloque.colores[3] = "T7-A.png"--{ Red=255, Green=255, Blue=0 }
bloque.colores[4] = "T6-A.png"--{ Red=0, Green=255, Blue=255 }
bloque.colores[5] = "T1-A.png"--{ Red=255, Green=0, Blue=255 }
bloque.colores[6] = "T3-A.png"--{ Red=200, Green=200, Blue=200 }

function bloque.crear(ubicacion, tipobloque)
    local blq = { }             -- el nuevo objeto
    setmetatable(blq,bloque)  -- hace una ubicación del bloque

    blq.ubicacion =  { X = ubicacion.X, Y = ubicacion.Y }
    blq.color = {}
    blq.tipobloque = tipobloque
    blq.tipomovimiento = {}
    blq.tiporotacion =  bloque.enumTipoRotacion[1]
    blq.anteriorrot = {}
    blq.cuadros = {}
    blq.detenido = false
    return blq
end

function bloque.crearaleatorio(ubicacion)
    local blq = { }             -- el nuevo objeto
    setmetatable(blq,bloque)  -- hace una ubicación del bloque

    blq.ubicacion =  { X = ubicacion.X, Y = ubicacion.Y }
    blq.color = {}
    blq.tipobloque = {}
    blq.tipomovimiento = {}
    blq.tiporotacion =  bloque.enumTipoRotacion[1]
    blq.anteriorrot = {}
    blq.cuadros = {}
    blq.detenido = false
    return blq
end

function bloque:Aleatorio()
  local proximo = math.random (7)

  if proximo == 7 then
    proximo = 6
  end

  self.tipobloque = bloque.enumTipoBloque[proximo]
  self:CrearUbicacionCuadros()
end

function bloque:DesplazarBloqueIzquierda()
  if tablero_tetris:PuedeDesplazarse(bloque.enumTipoMovimiento[1], self.cuadros) then
    self:OcultarBloque()

    local i = 0
    while i < 4 do
      self.cuadros[i]:MoverCuadradoIzquierda()
      i = i + 1
    end

    self:MostrarBloque()
    self.ubicacion = self.cuadros[0].ubicacion
  end
end

function bloque:DesplazarBloqueDerecha()
  if tablero_tetris:PuedeDesplazarse(bloque.enumTipoMovimiento[2], self.cuadros) then
    self:OcultarBloque()

    local i = 0
    while i < 4 do
      self.cuadros[i]:MoverCuadradoDerecha()
      i = i + 1
    end

    self:MostrarBloque()
    self.ubicacion = self.cuadros[0].ubicacion
  end
end

function bloque:DesplazarBloqueAbajo()
  if tablero_tetris:PuedeDesplazarse(bloque.enumTipoMovimiento[3], self.cuadros) then
    self:OcultarBloque()

    local i = 0
    while i < 4 do
      self.cuadros[i]:MoverCuadradoAbajo()
      i = i + 1
    end

    self:MostrarBloque()
    self.ubicacion = self.cuadros[0].ubicacion;
  else
    tablero_tetris:IngresarCuadradosMatriz(self.cuadros)
    tetris:DetenerCuadrado()
    self.detenido = true
  end
end

function bloque:CrearUbicacionCuadros()
  self.color = bloque.colores[self.tipobloque.INDICE]

  self.cuadros[0] = cuadrado.crear(10, self.color)
  self.cuadros[1] = cuadrado.crear(10, self.color)
  self.cuadros[2] = cuadrado.crear(10, self.color)
  self.cuadros[3] = cuadrado.crear(10, self.color)

  if self.tipobloque.TIPO == "J" then
    self.cuadros[0].ubicacion = self.ubicacion
    self.cuadros[1].ubicacion = self:UnoArriba()
    self.cuadros[2].ubicacion = self:UnoAbajo()
    self.cuadros[3].ubicacion = self:UnoIzquierdaUnoAbajo()
   else if self.tipobloque.TIPO == "L" then
      self.cuadros[0].ubicacion = self.ubicacion
      self.cuadros[1].ubicacion = self:UnoArriba()
      self.cuadros[2].ubicacion = self:UnoAbajo()
      self.cuadros[3].ubicacion = self:UnoDerechaUnoAbajo()
      else if self.tipobloque.TIPO == "Z" then
        self.cuadros[0].ubicacion = self.ubicacion
        self.cuadros[1].ubicacion = self:UnoIzquierda()
        self.cuadros[2].ubicacion = self:UnoAbajo()
        self.cuadros[3].ubicacion = self:UnoDerechaUnoAbajo()
        else if self.tipobloque.TIPO == "CUADRO" then
          self.cuadros[0].ubicacion = self.ubicacion
          self.cuadros[1].ubicacion = self:UnoDerecha()
          self.cuadros[2].ubicacion = self:UnoAbajo()
          self.cuadros[3].ubicacion = self:UnoDerechaUnoAbajo()
          else if self.tipobloque.TIPO == "T" then
            self.cuadros[0].ubicacion = self.ubicacion
            self.cuadros[1].ubicacion = self:UnoDerecha()
            self.cuadros[2].ubicacion = self:UnoIzquierda()
            self.cuadros[3].ubicacion = self:UnoAbajo()
            else if self.tipobloque.TIPO == "S" then
              self.cuadros[0].ubicacion = self.ubicacion
              self.cuadros[1].ubicacion = self:UnoDerecha()
              self.cuadros[2].ubicacion = self:UnoAbajo()
              self.cuadros[3].ubicacion = self:UnoIzquierdaUnoAbajo()
              else if self.tipobloque.TIPO == "LINEA" then
                self.cuadros[0].ubicacion = self.ubicacion
                self.cuadros[1].ubicacion = self:UnoArriba()
                self.cuadros[2].ubicacion = self:UnoAbajo()
                self.cuadros[3].ubicacion = self:DosAbajo()
              end
            end
          end
        end
      end
   end
  end
end

function bloque:MostrarBloque()
  local i = 0
  while i < 4 do
    self.cuadros[i]:mostrar()
    i = i + 1
  end
end

function bloque:OcultarBloque()
  local i = 0
  while i < 4 do
    self.cuadros[i]:ocultar()
    i = i + 1
  end
end

function bloque:RotarCuadros()
  if self.detenido == false then
    local anterior1 = self.cuadros[0].ubicacion
    local anterior2 = self.cuadros[1].ubicacion
    local anterior3 = self.cuadros[2].ubicacion
    local anterior4 = self.cuadros[3].ubicacion
    local anteriorrot = self.tiporotacion

    self:OcultarBloque()

    local nuevarot = 0
    nuevarot = self.tiporotacion.INDICE + 1

    if nuevarot > 4 then
      nuevarot = 1
    end

    self.tiporotacion = bloque.enumTipoRotacion[nuevarot]

    if self.tipobloque.TIPO == "J" then
     self:RotarJ(self.tiporotacion)
     self:Revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot)
     else if self.tipobloque.TIPO == "L" then
        self:RotarL(self.tiporotacion)
        self:Revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot)
        else if self.tipobloque.TIPO == "Z" then
          self:RotarZ(self.tiporotacion)
          self:Revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot)
          else if self.tipobloque.TIPO == "T" then
            self:RotarT(self.tiporotacion)
            self:Revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot)
            else if self.tipobloque.TIPO == "S" then
              self:RotarS(self.tiporotacion)
              self:Revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot)
              else if self.tipobloque.TIPO == "LINEA" then
                self:RotarLinea(self.tiporotacion)
                self:Revertir(anterior1, anterior2, anterior3, anterior4, anteriorrot)
              end
            end
          end
        end
     end
    end
  end
end

function bloque:Revertir(anterior1, anterior2, anterior3, anterior4, anteriorRot)
  if tablero_tetris:PuedeRotar(self.cuadros) == false then
    self.cuadros[0].ubicacion = anterior1;
    self.cuadros[1].ubicacion = anterior2;
    self.cuadros[2].ubicacion = anterior3;
    self.cuadros[3].ubicacion = anterior4;
    self.tiporotacion = anteriorRot;
  end
end

-- Funciones para la posición de los cuadros

function bloque:RotarJ(rot)
  if rot.TIPO == "NORTE" then
    self.cuadros[0].ubicacion = self.ubicacion
    self.cuadros[1].ubicacion = self:UnoArriba()
    self.cuadros[2].ubicacion = self:UnoAbajo()
    self.cuadros[3].ubicacion = self:UnoIzquierdaUnoAbajo()
    else if rot.TIPO == "ORIENTE" then
      self.cuadros[0].ubicacion = self.ubicacion
      self.cuadros[1].ubicacion = self:UnoDerecha()
      self.cuadros[2].ubicacion = self:UnoIzquierda()
      self.cuadros[3].ubicacion = self:UnoIzquierdaUnoArriba()
      else if rot.TIPO == "SUR" then
        self.cuadros[0].ubicacion = self.ubicacion
        self.cuadros[1].ubicacion = self:UnoArriba()
        self.cuadros[2].ubicacion = self:UnoArribaUnoDerecha()
        self.cuadros[3].ubicacion = self:UnoAbajo()
        else if rot.TIPO == "OCCIDENTE" then
          self.cuadros[0].ubicacion = self.ubicacion
          self.cuadros[1].ubicacion = self:UnoIzquierda()
          self.cuadros[2].ubicacion = self:UnoDerecha()
          self.cuadros[3].ubicacion = self:UnoDerechaUnoAbajo()
        end
      end
    end
  end
end

function bloque:RotarL(rot)
  if rot.TIPO == "NORTE" then
    self.cuadros[0].ubicacion = self.ubicacion
    self.cuadros[1].ubicacion = self:UnoArriba()
    self.cuadros[2].ubicacion = self:UnoAbajo()
    self.cuadros[3].ubicacion = self:UnoDerechaUnoAbajo()
    else if rot.TIPO == "ORIENTE" then
      self.cuadros[0].ubicacion = self.ubicacion
      self.cuadros[1].ubicacion = self:UnoDerecha()
      self.cuadros[2].ubicacion = self:UnoIzquierda()
      self.cuadros[3].ubicacion = self:UnoDerechaUnoAbajo()
      else if rot.TIPO == "SUR" then
        self.cuadros[0].ubicacion = self.ubicacion
        self.cuadros[1].ubicacion = self:UnoArriba()
        self.cuadros[2].ubicacion = self:UnoArribaUnoIzquierda()
        self.cuadros[3].ubicacion = self:UnoAbajo()
        else if rot.TIPO == "OCCIDENTE" then
          self.cuadros[0].ubicacion = self.ubicacion
          self.cuadros[1].ubicacion = self:UnoIzquierda()
          self.cuadros[2].ubicacion = self:UnoDerecha()
          self.cuadros[3].ubicacion = self:UnoArribaUnoDerecha()
        end
      end
    end
  end
end

function bloque:RotarZ(rot)
  if rot.TIPO == "NORTE" then
    self.cuadros[0].ubicacion = self.ubicacion
    self.cuadros[1].ubicacion = self:UnoArriba()
    self.cuadros[2].ubicacion = self:UnoArribaUnoIzquierda()
    self.cuadros[3].ubicacion = self:UnoDerecha()
    else if rot.TIPO == "ORIENTE" then
      self.cuadros[0].ubicacion = self.ubicacion
      self.cuadros[1].ubicacion = self:UnoDerecha()
      self.cuadros[2].ubicacion = self:UnoArribaUnoDerecha()
      self.cuadros[3].ubicacion = self:UnoAbajo()
      else if rot.TIPO == "SUR" then
        self.cuadros[0].ubicacion = self.ubicacion
        self.cuadros[1].ubicacion = self:UnoArriba()
        self.cuadros[2].ubicacion = self:UnoArribaUnoIzquierda()
        self.cuadros[3].ubicacion = self:UnoDerecha()
        else if rot.TIPO == "OCCIDENTE" then
          self.cuadros[0].ubicacion = self.ubicacion
          self.cuadros[1].ubicacion = self:UnoDerecha()
          self.cuadros[2].ubicacion = self:UnoArribaUnoDerecha()
          self.cuadros[3].ubicacion = self:UnoAbajo()
        end
      end
    end
  end
end

function bloque:RotarS(rot)
  if rot.TIPO == "NORTE" then
    self.cuadros[0].ubicacion = self.ubicacion
    self.cuadros[1].ubicacion = self:UnoDerecha()
    self.cuadros[2].ubicacion = self:UnoAbajo()
    self.cuadros[3].ubicacion = self:UnoIzquierdaUnoAbajo()
    else if rot.TIPO == "ORIENTE" then
      self.cuadros[0].ubicacion = self.ubicacion
      self.cuadros[1].ubicacion = self:UnoIzquierda()
      self.cuadros[2].ubicacion = self:UnoArribaUnoIzquierda()
      self.cuadros[3].ubicacion = self:UnoAbajo()
      else if rot.TIPO == "SUR" then
        self.cuadros[0].ubicacion = self.ubicacion
        self.cuadros[1].ubicacion = self:UnoDerecha()
        self.cuadros[2].ubicacion = self:UnoAbajo()
        self.cuadros[3].ubicacion = self:UnoIzquierdaUnoAbajo()
        else if rot.TIPO == "OCCIDENTE" then
          self.cuadros[0].ubicacion = self.ubicacion
          self.cuadros[1].ubicacion = self:UnoIzquierda()
          self.cuadros[2].ubicacion = self:UnoArribaUnoIzquierda()
          self.cuadros[3].ubicacion = self:UnoAbajo()
        end
      end
    end
  end
end

function bloque:RotarT(rot)
  if rot.TIPO == "NORTE" then
    self.cuadros[0].ubicacion = self.ubicacion
    self.cuadros[1].ubicacion = self:UnoDerecha()
    self.cuadros[2].ubicacion = self:UnoIzquierda()
    self.cuadros[3].ubicacion = self:UnoAbajo()
    else if rot.TIPO == "ORIENTE" then
      self.cuadros[0].ubicacion = self.ubicacion
      self.cuadros[1].ubicacion = self:UnoArriba()
      self.cuadros[2].ubicacion = self:UnoAbajo()
      self.cuadros[3].ubicacion = self:UnoIzquierda()
      else if rot.TIPO == "SUR" then
        self.cuadros[0].ubicacion = self.ubicacion
        self.cuadros[1].ubicacion = self:UnoDerecha()
        self.cuadros[2].ubicacion = self:UnoIzquierda()
        self.cuadros[3].ubicacion = self:UnoArriba()
        else if rot.TIPO == "OCCIDENTE" then
          self.cuadros[0].ubicacion = self.ubicacion
          self.cuadros[1].ubicacion = self:UnoArriba()
          self.cuadros[2].ubicacion = self:UnoAbajo()
          self.cuadros[3].ubicacion = self:UnoDerecha()
        end
      end
    end
  end
end

function bloque:RotarLinea(rot)
  if rot.TIPO == "NORTE" then
    self.cuadros[0].ubicacion = self.ubicacion
    self.cuadros[1].ubicacion = self:UnoArriba()
    self.cuadros[2].ubicacion = self:UnoAbajo()
    self.cuadros[3].ubicacion = self:DosAbajo()
    else if rot.TIPO == "ORIENTE" then
      self.cuadros[0].ubicacion = self.ubicacion
      self.cuadros[1].ubicacion = self:UnoIzquierda()
      self.cuadros[2].ubicacion = self:UnoDerecha()
      self.cuadros[3].ubicacion = self:DosDerecha()
      else if rot.TIPO == "SUR" then
        self.cuadros[0].ubicacion = self.ubicacion
        self.cuadros[1].ubicacion = self:UnoArriba()
        self.cuadros[2].ubicacion = self:UnoAbajo()
        self.cuadros[3].ubicacion = self:DosAbajo()
        else if rot.TIPO == "OCCIDENTE" then
          self.cuadros[0].ubicacion = self.ubicacion
          self.cuadros[1].ubicacion = self:UnoIzquierda()
          self.cuadros[2].ubicacion = self:UnoDerecha()
          self.cuadros[3].ubicacion = self:DosDerecha()
        end
      end
    end
  end
end


function bloque:UnoArriba()
  return { X = self.ubicacion.X, Y = self.ubicacion.Y - 1 }
end

function bloque:UnoArribaUnoDerecha()
  return { X = self.ubicacion.X + 1, Y = self.ubicacion.Y - 1 }
end

function bloque:UnoArribaUnoIzquierda()
  return { X = self.ubicacion.X - 1, Y = self.ubicacion.Y - 1 }
end

function bloque:UnoAbajo()
  return { X = self.ubicacion.X, Y = self.ubicacion.Y + 1 }
end

function bloque:DosAbajo()
  return { X = self.ubicacion.X, Y = self.ubicacion.Y + (1 * 2) }
end

function bloque:DosAbajoUnoDerecha()
  return { X = self.ubicacion.X + 1, Y = self.ubicacion.Y + (1 * 2) }
end

function bloque:DosAbajoUnoIzquierda()
  return { X = self.ubicacion.X - 1, Y = self.ubicacion.Y + (1 * 2) }
end

function bloque:TresAbajo()
  return { X = self.ubicacion.X, Y = self.ubicacion.Y + (1 * 3) }
end

function bloque:UnoDerecha()
  return { X = self.ubicacion.X + 1, Y = self.ubicacion.Y }
end

function bloque:DosDerecha()
  return { X = self.ubicacion.X + (1 * 2), Y = self.ubicacion.Y }
end

function bloque:TresDerecha()
  return { X = self.ubicacion.X + (1 * 3), Y = self.ubicacion.Y }
end

function bloque:UnoDerechaUnoAbajo()
  return { X = self.ubicacion.X + 1, Y = self.ubicacion.Y + 1 }
end

function bloque:DosDerechaUnoAbajo()
  return { X = self.ubicacion.X + (1 * 2), Y = self.ubicacion.Y + 1 }
end

function bloque:UnoIzquierda()
  return { X = self.ubicacion.X - 1, Y = self.ubicacion.Y }
end

function bloque:DosIzquierda()
  return { X = self.ubicacion.X - (1 * 2), Y = self.ubicacion.Y }
end

function bloque:TresIzquierda()
  return { X = self.ubicacion.X - (1 * 3), Y = self.ubicacion.Y }
end

function bloque:UnoIzquierdaUnoAbajo()
  return { X = self.ubicacion.X - 1, Y = self.ubicacion.Y + 1 }
end

function bloque:UnoIzquierdaUnoArriba()
  return { X = self.ubicacion.X - 1, Y = self.ubicacion.Y - 1 }
end

function bloque:DosIzquierdaUnoAbajo()
  return { X = self.ubicacion.X - (1 * 2), Y = self.ubicacion.Y + 1 }
end

function bloque:prueba()
  local textObject = display.newText( bloque.enumTipoRotacion[3].TIPO , 50, 50, native.systemFont, 24 )
  textObject:setTextColor( 255,255,0 )
end
