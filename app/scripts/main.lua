---
-- Created by IntelliJ IDEA.
-- User: mcadavip
-- Date: 26/10/11
-- Time: 12:56 PM
-- To change this template use File | Settings | File Templates.
--

require('bloque')
require('tablero')

tablero_tetris = tablero.crear()
tetris = {}
local color = display.newRect(0,0,display.contentWidth,display.contentHeight)
color:setFillColor(255,255,255)

blq = bloque.crearaleatorio({ X=9, Y=0 })
blq:Aleatorio()
blq:MostrarBloque()

function tetris:DetenerCuadrado()
  local y = tablero_tetris:ConsultarFilaLlena()

  if y ~= -1 then
    tablero_tetris:EliminarFilaLlena(y)
  end

  blq = bloque.crearaleatorio({ X=9, Y=0 })
  blq:Aleatorio()
  blq:MostrarBloque()
end


function pasaelTiempo( event)
  blq:DesplazarBloqueAbajo()
end

pasaelTiempo()
timer.performWithDelay( 800, pasaelTiempo, 0 )

function touche( event )
  if event.phase == 'began' then
    posicionX = event.x
    posicionY = event.y
  else
    if event.x == posicionX and event.y == posicionY then
      return
    end
    if event.x > posicionX then
      blq:DesplazarBloqueDerecha()
    else
      if event.x < posicionX then
        blq:DesplazarBloqueIzquierda()
      else
        if event.y < posicionY then
          blq:RotarCuadros()
        else
           if event.y > posicionY then
            blq:DesplazarBloqueAbajo()
           end
        end
      end
    end
    posicionX = event.x
    posicionY = event.y
    blq:MostrarBloque()
  end
end

Runtime:addEventListener('touch', touche)