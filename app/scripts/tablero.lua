---
-- Created by IntelliJ IDEA.
-- User: mcadavip
-- Date: 31/10/11
-- Time: 02:55 PM
-- To change this template use File | Settings | File Templates.
--

tablero = {}
tablero.__index = tablero

function tablero.crear()
  local tab = {}             -- el nuevo objeto
  setmetatable(tab,tablero)  -- hace una ubicación del tablero

  tab.tamanocuadro = 10
  tab.LIMITE_ABAJO = 31
  tab.LIMITE_IZQUIERDO = -1
  tab.LIMITE_DERECHO = 16
  tab.LIMITE_ARRIBA = -5

  tab.matriz = {} -- create the matrix

  for i=0,15 do
    tab.matriz[i] = {} -- create a new row
    for j=0,30 do
      tab.matriz[i][j] = nil
    end
  end

  return tab
end

function tablero:PuedeRotar(cuadros)
  local i = 0
  while i < 4 do
    if cuadros[i].ubicacion.X == -1 or cuadros[i].ubicacion.X == 16 or
      cuadros[i].ubicacion.Y == -1 or cuadros[i].ubicacion.Y == 31 or
      self.matriz[cuadros[i].ubicacion.X][cuadros[i].ubicacion.Y] ~= nil then
      return false
    end
    i = i + 1
  end
  return true;
end

function tablero:PuedeDesplazarse(tipomovimiento, cuadros)
  if tipomovimiento.TIPO == "IZQUIERDA" then
    local i = 0
    while i < 4 do
      if cuadros[i].ubicacion.X == 0 or self.matriz[cuadros[i].ubicacion.X - 1][cuadros[i].ubicacion.Y] ~= nil then
        return false
      end
      i = i + 1
    end

    else if tipomovimiento.TIPO == "DERECHA" then
      local i = 0
      while i < 4 do
        if cuadros[i].ubicacion.X == 15 or self.matriz[cuadros[i].ubicacion.X + 1][cuadros[i].ubicacion.Y] ~= nil then
          return false
        end
        i = i + 1
      end

      else if tipomovimiento.TIPO == "ABAJO" then
        local i = 0
        while i < 4 do
          if cuadros[i].ubicacion.Y == 30 or self.matriz[cuadros[i].ubicacion.X][cuadros[i].ubicacion.Y + 1] ~= nil then
            return false
          end
          i = i + 1
        end
      end
    end
  end
  return true;
end

function tablero:IngresarCuadradosMatriz(cuadros)
  local i = 0
  while i < 4 do
    self.matriz[cuadros[i].ubicacion.X][cuadros[i].ubicacion.Y] = cuadros[i]
    i = i + 1
  end
end

function tablero:EliminarCuadradoMatriz(cuadro)
  self.matriz[cuadro.ubicacion.X][cuadro.ubicacion.Y] = nil;
end

function tablero:ConsultarFilaLlena()
  local filallena = 0

  for y = self.LIMITE_ABAJO - 1, 0, -1 do
    filallena = 0;
    for x = self.LIMITE_IZQUIERDO + 1, self.LIMITE_DERECHO -1 do
      if self.matriz[x][y] ~= nil then
          filallena = filallena + 1
      end
    end

    if filallena == 16 then
        return y;
    end
  end

  return -1;
end

function tablero:EliminarFilaLlena(fila)
  for y = fila - 1, 1, -1 do
    for x = self.LIMITE_IZQUIERDO + 1, self.LIMITE_DERECHO - 1 do
      self.matriz[x][fila] = self.matriz[x][y]

      if self.matriz[x][fila] ~= nil then
        self.matriz[x][fila]:MoverCuadradoAbajo()
      end
    end
    fila = fila-1
  end
  self:Redibujar();
end

function tablero:Redibujar()
  local color = display.newRect(0,0,display.contentWidth,display.contentHeight)
  color:setFillColor(255,255,255)

  for i=0,15 do
    for j=0,30 do
      if self.matriz[i][j] ~= nil then
        self.matriz[i][j]:mostrar()
      end
    end
  end
end