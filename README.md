# Metodologia-de-Sistemas-2


### Integrantes:
Rodrigo Sisko, Simón Bucci, Josué Chazarreta y Santino Gullacci


### Temática:
Sistema de gestión de viajes: La app web permite dos modos: usuario y admin (cómo entrar a cada uno explicado al final de este readme). 

Como usuario se visualiza una página principal con 3 paquetes turísticos, donde se puede elegir ver más detalles acerca de alguno de ellos. Una vez seleccionado alguno de los paquetes, es posible hacer una reservación con datos personales. 

El modo admin (hacer el login para poder realizar cambios) muestra un dashboard que permite ver los paquetes (y agregar más, borrarlos o editarlos) o las reservaciones (que también permite eliminarlas). También tiene un botón para actualizar los precios de todos los paquetes. Si se hicieron cambios en los precios, al refrescar la página y entrar como usuario debería llegar una notificación con dicha información.


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

La forma en la que aplicamos el patrón <font size=4>**`Observer`**</font> fue creando una carpeta observerPattern con un priceSubject.js que notifica a los observadores cacheObserver.js y logObserver.js (no implementados del todo) y databaseObserver.js (implementado).

Las notificaciones de cambio de precio se implementaron en la pagina principal (home) con **PriceNotification.js** y **usePriceChanges.js**.
Funciona de la siguiente manera. El usuario entra a la pagina principal, luego el administrador cambia el precio uno o varios paquetes desde el dashboard, los observers son notificados por el backend, y finalmente el usuario recarga la página principal, ahi **usePriceChanges.js** detecta los cambios y en la pagina principal que ve el usuario se muestra una notificación con los paquetes que cambiaron de precio.



# Sistema Web Full-Stack con Docker - PATAGONIA TRIP

### Servicios del Sistema

| Servicio | Tecnología | Puerto | Función |
|----------|------------|--------|---------|
| **Frontend** | React 18 | 3000 | Interfaz de usuario |
| **Backend** | Express + Sequelize | 3001 | API REST |
| **Database** | PostgreSQL 15 | 5432 | Base de datos principal |
| **pgAdmin** | pgAdmin 4 | 5050 | Administración de BD |

---

### Prerrequisitos
- Docker Desktop
- Docker Compose
- Git

### Primera Construcción y Ejecución del Sistema

```bash
# Clonar repositorio
git clone https://github.com/S-Bucci/Metodologia-de-Sistemas-2

# Situarse en la carpeta Proyecto
cd Metodologia-de-Sistemas-2/Proyecto

# Construir todas las imágenes (solo debe hacerse la primera vez. Si ya se hizo, saltearse este punto)
docker-compose build

# Inicializar base de datos y servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Detener servicios y borrar cambios hechos
docker-compose down -v
```

---



### Comandos Principales
```bash
# Iniciar todos los servicios en primer plano
docker-compose up

# Iniciar todos los servicios en segundo plano
docker-compose up -d

# Detener servicios
Si se iniciaron los servicios en primer plano, ubicarse en la consola en la que se iniciaron los servidores y hacer la combinación de teclas CTRL+C

# Detener servicios
docker-compose down

# Detener servicios y borrar cambios hechos
docker-compose down -v

```

### URLs de Acceso
- **Frontend:** http://localhost:3000
- **Frontend - Admin:** http://localhost:3000/admin *(user: admin@example.com, contraseña: admin123)*
- **Backend API:** http://localhost:3001/api
- **Health Check:** http://localhost:3001/health
- **pgAdmin 4:** http://localhost:5050 *(user: app_user, contraseña: app_password)*
- **Base de datos:** http://localhost:5432 

---
