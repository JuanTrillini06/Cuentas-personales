# Proyecto: Gestor personal de gastos
## Descripción de Rol:
Para este proyecto vamos a trabajar en conjunto como desarrolladores junior con stack basico, es decir, vas a limitar tu conocimiento a HTML5, CSS3, javascript, MongoDB y Express.

## Objetivo del proyecto:
Brindar una pagina para autogestion de ingreso/egreso de dinero en cuentas administrando los movimientos.

## Stack del proyecto:
<ul>
	<li>HTML5</li>
	<li>CSS3</li>
	<li>JavaScript</li>
	<li>MongoDB</li>
	<li>Express</li>
</ul>
## Plataforma de despliegue:
Github + Vercel

## Alcances y limites del proyecto:
### Alcances:
<ul>
	<li>Registrar e iniciar sesion a un usuario</li>
	<li>Registrar cuentas</li>
	<li>Registrar movimientos</li>
	<li>Visualizar balance</li>
	<li>Agrupación por etiquetas (ejemplo: ahorro, comida, alquiler)</li>
</ul>
### Limites:
<ul>
	<li>NO recuperación de cuenta</li>
	<li>NO se vincula a plataformas bancarias</li>
	<li>NO emula ahorros</li>
</ul>
## Características de alcances:
### Registrar e iniciar sesión a un usuario:
El usuario debe ser capaz de registrarse a iniciar sesión para tener asociada sus cuentas y movimientos de forma independiente a otro usuario. Debe contar con CRUD de usuario donde compruebe si el email ya está registrado al momento de hacer el registro, comprobar la contraseña al momento de iniciar sesión con JWT. El usuario va a contar con nombre, apellido, email, contraseña, rango horario (automatico por ubicacion)

### Registrar cuentas:
Mientras el usuario este en sesión iniciada, poder manejar un CRUD de cuentas (para cargar diferentes cuentas de bancos, bancos virtuales, etc) el cual va a contar con nombre, entidad bancaria y tipo de moneda.

### Registrar movimientos:
Mientras el usuario este en sesion iniciada y existan cuentas, poder manejar un CRUD de movimientos para cargar movimientos tipo Entrada/Salida (E/S) que sumen o resten al valor de la cuenta. Debe contar con descripcion, etiqueta/s, monto, y cuenta, ademas de moneda que tiene que autodetectarse con el tipo de moneda de cuenta.

### Visualizar balance:
Minetras el usuario este en sesion iniciada y existan cuentas se debe poder visualizar un balance del dinero en cuenta, los movimientos clasificados por categoria (grafico de torta mostrando los totales por categoria) y una opcion para visualizar el dinero total de todas las cuentas distinguidas por tipo de moneda.

## Caracteristicas del FrontEnd:
La interfaz debe ser amigable y moderna adaptada para dispositivmos moviles y computadoras (Responsive).
Tiene que dar la opcion de tema claro/oscuro.
Tiene que suavizar bordes.
Utilizar colores de bajo impacto entre fondo general y fondo de graficos, menu, y deplegables posibles.
No utilizar colores vividos en los botones, es decir, en lugar de usar un verde normal, utilizar un verde pastel.