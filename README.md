# BakeTheDOM

Disenar e implementar una pagina web tematica utilizando JavaScript puro (vanilla JS), con el fin de demostrar dominio de los conceptos fundamentales del DOM, la manipulacion dinamica de elementos y eventos.

<br>

---

## Objetivo del proyecto

El objetivo principal de este proyecto es aplicar los fundamentos de HTML, CSS y JavaScript para construir una aplicacion web interactiva.  
El tema elegido es una **pasteleria llamada Sweet Tentation**, la cual permite mostrar productos y gestionar un **carrito de compras dinamico**.  
El enfoque se centra en la manipulacion directa del DOM, la modularizacion del codigo y el uso de almacenamiento local para conservar los datos del carrito.

---

## Estructura del proyecto

### 1. index.html

Archivo principal que define la estructura de la pagina inicial.  
Contiene la cabecera con el nombre del sitio, el area principal donde se cargan los productos de forma dinamica y el panel lateral del carrito de compras.  
Tambien incluye los enlaces al archivo de estilos (`style.css`) y al script principal (`main.js`).

### 2. productos.html

Archivo que contiene el listado de productos usando una estructura de tarjeta.  
No se muestra directamente en la pagina, sino que es cargado de manera asincronica mediante el archivo `api.js`, simulando una inyeccion de datos externa.  
Cada producto incluye atributos como nombre, descripcion, precio e imagen, que son transformados en objetos de JavaScript para su manipulacion.

### 3. css/style.css

Archivo encargado del diseno visual del sitio.  
Aplica variables, gradientes, sombras y distribucion responsiva mediante Flexbox y Grid para asegurar una buena experiencia en distintos tamanos de pantalla.

---

## JavaScript modular

El proyecto se divide en varios modulos de JavaScript.  
Cada archivo JS se encarga de darle una funcionalidad especifica al sitio web.

### 4. js/api.js

Este modulo se encarga de obtener el contenido de `productos.html` de forma asincronica usando `fetch()`.  
Convierte el HTML en texto para su procesamiento y lo envia a `utils.js`.  
Su proposito es simular la conexion con una fuente de datos externa (como una API real), pero utilizando un archivo local.

### 5. js/utils.js

Contiene funciones reutilizables para otras partes del codigo.  
Incluye herramientas para procesar el HTML de productos, formatear precios y convertir nodos en datos manipulables.  
Estas funciones reducen la repeticion de codigo y mejoran la organizacion del proyecto.

### 6. js/dom.js

Responsable de inyectar dinamicamente los productos en la pagina principal (`index.html`).  
Tambien se encarga de agregar los **Event Listeners** (por ejemplo, botones de "Agregar al carrito") y de actualizar la interfaz cuando ocurren cambios en el DOM.

### 7. js/cart.js

Controla toda la **logica interna del carrito de compras**.  
Incluye las funciones para:

- Agregar productos al carrito
- Eliminar productos
- Cambiar cantidades
- Calcular subtotales y totales

Ademas, utiliza **LocalStorage** para guardar el contenido del carrito, de modo que los datos se mantengan aunque el usuario recargue la pagina.

### 8. js/cart-view.js

Cada vez que se modifica la informacion interna del carrito (por ejemplo, al agregar o eliminar un producto), este modulo actualiza el DOM para que el usuario vea los cambios en tiempo real.  
Tambien muestra mensajes como "Tu carrito esta vacio" cuando corresponde.

### 9. js/main.js

Es el punto de entrada principal de la aplicacion.  
Coordina la comunicacion entre todos los modulos anteriores.  
Al cargar la pagina:

1. Obtiene los productos mediante `api.js`.
2. Los procesa con `utils.js`.
3. Los muestra en pantalla con `dom.js`.
4. Inicializa el carrito y sincroniza los eventos con `cart.js` y `cart-view.js`.

Actua como el centro de control del proyecto.

---

## Apuntes de conceptos

### Manipulacion del DOM

- `document.querySelector()` -> Selecciona el primer elemento que coincide con un selector CSS.
- `document.querySelectorAll()` -> Selecciona todos los elementos que cumplen el selector especificado.
- `addEventListener()` -> Permite escuchar eventos del usuario como clics, cambios o teclas presionadas.
- `innerHTML` y `textContent` -> Sirven para modificar el contenido interno de un elemento HTML.
- `createElement()` -> Permite crear nodos HTML nuevos desde JavaScript y agregarlos al documento.

### LocalStorage

Permite almacenar datos de manera persistente en el navegador, lo cual hace posible que los productos agregados al carrito no se pierdan al recargar la pagina.

### Modularizacion

El codigo se organiza en archivos separados (modulos) para mejorar su mantenimiento.  
Cada modulo cumple una tarea especifica y se comunica con los demas.

---

## Tecnologias utilizadas

| Tecnologia                | Funcion principal                                   |
| ------------------------- | --------------------------------------------------- |
| **HTML5**                 | Estructura del sitio y de las tarjetas de productos |
| **CSS3 (Flexbox y Grid)** | Diseno responsivo y estetico                        |
| **JavaScript (Vanilla)**  | Eventos y manipulacion del DOM                      |
| **LocalStorage**          | Almacenamiento del carrito de compras               |

---
