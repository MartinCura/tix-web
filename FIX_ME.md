Things to fix
=============

Solved
------

* Mensajes de error si los filtros son inválidos (e.g., fecha inicio >= fecha final) : (mc)
* Aclarar que el instalador es para Debian-based : (mc)
* Lista de Panel de Admin en sidebar no queda desplegada : (mc) ahora siempre abierta
* Page title dice "Tix App" en vez de "TiX App" : (mc)
* Installation graphs: Al cambiar el rango (incluso con el botón) se olvida de la opción up/down-stream : (mc)
* Filtros de reporte: mostrar por default el último buscado : (mc)
* Al cambiar entre isp's, queda el gráfico (o falta de él) del anterior : (mc)
* Filtros de reportes: Opción "Todos" (los días de la semana) no parece funcionar como debería : (mc)
* Warnings en sección Filtros de reporte : (mc)


Que van a quedar como "To do"
-----------------------------

* Falta devolución de error en varios lados
* Abstraer host:port address
* ¿Tiene sentido que "Reporte de usuario" esté en la sección "Configuración"?
* Al registrarse correctamente, redirigir al login
* RecoverView redefine clase HomeView (cambiarle al nombre correcto)
* Poder modificar la escala de los gráficos
* Si se carga la página de una instalación distinta a la idx 0, igual aparece la 0 desplegada : (mc) Intenté arreglarlo pero fracasé
* Los gráficos muestran el rango que tiene datos, en vez de todo el rango elegido
* Gráficos: las fechas en el eje no especifican el año (pero todavía se puede pasar el mouse y lo dice)


### Cosas para hablar con tix-backend:

- Endpoint en backend con la fecha del último dato para cierto usuario+instalación+isp
- Tema de errores en listado de impersonalización
