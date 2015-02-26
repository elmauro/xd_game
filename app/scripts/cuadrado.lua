---
-- Created by IntelliJ IDEA.
-- User: mcadavip
-- Date: 26/10/11
-- Time: 01:17 PM
-- To change this template use File | Settings | File Templates.
-- Clase cuadrado

cuadrado = {}
cuadrado.__index = cuadrado

function cuadrado.crear(tamano, color)
   local cdr = {}             -- el nuevo objeto
   setmetatable(cdr,cuadrado)  -- hace una ubicación del cuadrado

   cdr.tamano = tamano
   cdr.color = color
   cdr.ubicacion = { }

   return cdr
end

function cuadrado:mostrar()
  display.newImage( self.color, self.ubicacion.X * self.tamano, self.ubicacion.Y * self.tamano )

  --[[local cdrb = display.newRect( self.ubicacion.X * self.tamano, self.ubicacion.Y * self.tamano, self.tamano, self.tamano )
  cdrb:setFillColor(0,0,0)

  local cdr = display.newRect( (self.ubicacion.X * self.tamano) + 1, (self.ubicacion.Y * self.tamano) + 1, self.tamano - 2, self.tamano - 2 )
  cdr:setFillColor(self.color.Red, self.color.Green, self.color.Blue)]]--
end

function cuadrado:ocultar()
  local cdr = display.newRect( self.ubicacion.X * self.tamano, self.ubicacion.Y * self.tamano, self.tamano, self.tamano )
  cdr:setFillColor(255, 255, 255)
end

function cuadrado:MoverCuadradoIzquierda()
  self.ubicacion.X =  self.ubicacion.X - 1
end

function cuadrado:MoverCuadradoDerecha()
  self.ubicacion.X =  self.ubicacion.X + 1
end

function cuadrado:MoverCuadradoAbajo()
  self.ubicacion.Y =  self.ubicacion.Y + 1
end

return cuadrado