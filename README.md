# Metodologia-de-Sistemas-2


### Integrantes:
Rodrigo Sisko, Simón Bucci, Josué Chazarreta y Santino Gullacci


### Temática:
Sistema de gestión de viajes


### <u>Patrones elegidos para realizar el proyecto</u>

### *Patrón Creacional*
El patrón creacional elegido es el **Builder**. En la teoría se menciona que debe ser utilizado cuando hay objetos con muchos parámetros opcionales o distintas representaciones. Y las ventajas son que maneja bien objetos complejos y que es flexible

Nuestro proyecto consiste en armar viajes con muchas variables que pueden ser personalizadas que pueden ir de solo un viaje de ida hasta un viaje ida y vuelta con hotel incluido, los parámetros de los paquetes son muy amplios y variados.

Por esto consideramos que el patrón **Builder** es el que más se ajusta a nuestro proyecto.

Para aplicar correctamente el patrón **Builder** incorporamos dos nuevos archivos:

- **PackageBuilder.js**: Empaqueta la construcción del objeto paquete paso por paso. Se definen los métodos para configurar cada atributo del paquete sin necesidad de crear objetos demasiado grandes con parámetros desordenados. 
_(backend/models/PackageBuilder.js)_

- **PackageDirector.js**: Dirige el proceso de construcción. Define diferentes formas de armar un paquete (por ejemplo, un paquete básico, uno completo, uno con servicios adicionales, etc...).
_(backend/models/PackageDirector.js)_


### *Patrón Estructural*
El patrón estructural elegido es el <font size=4>**`Facade`**</font>. En la teoría dice que la motivación para 
utilizarlo es ocultar complejidad interna y reducir el acoplamiento del cliente. La idea 
es no exponer al usuario a detalles internos y simplificar lo que él ve en pantalla. 

En nuestro proyecto se puede aplicar por ejemplo, para procesar los pagos, verificar 
la disponibilidad de vuelos, verificar disponibilidad de hoteles, y más. 

Por esto consideramos que el patrón <font size=4>**`Facade`**</font> es el mejor para el proyecto. 

Para aplicar correctamente el patrón **Facade** incorporamos la carpeta **services** y un nuevo archivo:

- **packages.facade.js**: centraliza y simplifica toda la lógica de gestión de paquetes, permitiendo que el controlador interactúe con una única interfaz sin manejar directamente los procesos internos.
_(backend/services/package.facade.js)_

Se actualizó _packages.controller.js_ para que delegue toda la gestión de paquetes al PackageFacade. Permitiendo que el controlador trabaje con una interfaz simple mientras el Facade se encarga internamente de usar el Builder, garantizando que los paquetes se creen y actualicen siguiendo el proceso definido.
### *Patrón de Comportamiento*

El patrón de comportamiento elegido es el <font size=4>**`Observer`**</font>. La teoría dice que la 
motivación es la necesidad de que varios objetos reaccionen automáticamente 
cuando otro cambia de estado, sin acoplarlos directamente. 

En nuestro caso podríamos utilizarlo en algún sistema de notificaciones, por 
ejemplo, cuando algún vuelo baja de precio, cuando un paquete baja de precio. De 
esta manera podríamos tener al usuario pendiente para que aproveche un 
descuento. 

Por esto consideramos que el patrón <font size=4>**`Observer`**</font> es el que más se adapta al 
proyecto.

X espacio para explicar observerPattern

Las notificaciones de cambio de precio se implementaron en la pagina principal (home) con **PriceNotification.js** y **usePriceChanges.js**.
Funciona de la siguiente manera. El usuario entra a la pagina principal, luego el administrador cambia el precio uno o varios paquetes desde el dashboard, los observers son notificados por el backend, y finalmente el usuario recarga, ahi **usePriceChanges.js** detecta los cambios y en la pagina principal que ve el usuario se muestra una notificación con los paquetes que cambiaron de precio.