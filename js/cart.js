// Se crea un array vacío para almacenar los productos en el carrito
let carrito = [];

// Se obtiene el elemento del DOM que representa el contenedor de productos
const productoContenedor = document.getElementById('producto-contenedor');

// Se agrega un evento de clic al contenedor de productos
productoContenedor.addEventListener('click', (e) => {
    // Verifica si el elemento clickeado contiene la clase "agregar"
    if (e.target.classList.contains('agregar')) {
        // Se llama a la función para agregar el producto al carrito, pasando el ID del producto
        agregarProductoAlCarrito(e.target.dataset.id);
    };
});

// Función para agregar un producto al carrito
const agregarProductoAlCarrito = (productoId) => {
    // Verifica si el producto ya está en el carrito
    const estaRepetido = carrito.some(producto => producto.id.toString() === productoId.toString());

    if (!estaRepetido) {
        // Si el producto no está repetido, se busca el producto en el array de productos por su ID
        const productoEncontrado = productos.find(producto => producto.id.toString() === productoId.toString());

        // Se agrega el producto al carrito con una cantidad inicial de 1
        carrito.push({ ...productoEncontrado, cantidad: 1 });

        // Se muestra el producto en el carrito
        pintarProductoCarrito(productoEncontrado);

        // Se muestra una notificación indicando que se agregó el producto al carrito
        Toastify({
            text: `Se agregó ${productoEncontrado.nombre} al carrito`,
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: '#32CD32',
            stopOnFocus: true
        }).showToast();
    } else {
        // Si el producto ya está en el carrito, se busca el producto repetido en el carrito
        const productoRepetido = carrito.find(producto => producto.id.toString() === productoId.toString());
        // Se incrementa la cantidad del producto repetido en 1
        productoRepetido.cantidad++;
        // Se actualiza la cantidad en el elemento del DOM correspondiente
        const cantidad = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidad.innerText = `Cantidad: ${productoRepetido.cantidad}`;

        // Se muestra una notificación indicando que se aumentó la cantidad del producto en el carrito
        Toastify({
            text: `Se aumentó la cantidad de ${productoRepetido.nombre} en el carrito`,
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'right',
            backgroundColor: '#32CD32',
            stopOnFocus: true
        }).showToast();
    }
    
    // Se actualizan los totales del carrito
    actualizarTotalesCarrito(carrito);
    
    // Se guarda el carrito en el almacenamiento local
    guardarCarritoStorage(carrito);
};

// Función para mostrar un producto en el carrito
const pintarProductoCarrito = (producto) => {
    const contenedor = document.getElementById('tabla-carrito');
    const tr = document.createElement('tr');
    tr.classList.add('productoEnCarrito');
    tr.id = `productoEnCarrito-${producto.id}`
    tr.innerHTML = `
        <td>${producto.nombre}</td>
        <td>Precio: $${producto.precio}</td>
        <td id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</td>
        <td><button class="btn waves-effect waves-ligth boton-eliminar" data-id="${producto.id}">X</button></td>
    `;
    contenedor.appendChild(tr);
};

// Función para actualizar los totales del carrito
const actualizarTotalesCarrito = (carrito) => {
    // Se calcula el total de la cantidad de productos en el carrito
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    
    // Se calcula el total de la compra sumando el precio de cada producto multiplicado por su cantidad
    const totalCompra = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

    // Se muestra el total de la cantidad en el elemento del DOM correspondiente
    pintarTotalesCarrito(totalCantidad, totalCompra);
};

// Función para mostrar los totales del carrito en el DOM
const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

// Función para eliminar un producto del carrito
const eliminarProductoCarrito = (productoId) => {
    // Se busca el índice del producto en el carrito
    const productoIndex = carrito.findIndex(producto => producto.id === productoId);
    // Se elimina el producto del carrito
    carrito.splice(productoIndex, 1);
    // Se vuelve a mostrar el carrito
    pintarCarrito(carrito);
    // Se actualizan los totales del carrito
    actualizarTotalesCarrito(carrito);
    // Se elimina la fila correspondiente al producto eliminado del DOM
    const row = document.getElementById(`productoEnCarrito-${productoId}`);
    row.remove();

    // Se muestra una notificación indicando que se eliminó el producto del carrito
    Toastify({
        text: `Se eliminó el producto del carrito`,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#FF6347',
        stopOnFocus: true
    }).showToast();

    // Se guarda el carrito en el almacenamiento local
    guardarCarritoStorage(carrito);
};

// Función para guardar el carrito en el almacenamiento local
const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

// Función para cargar el carrito desde el almacenamiento local
const cargarCarritoDesdeLocalStorage = () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    }
};

// Función para mostrar el carrito en el DOM
const pintarCarrito = (carrito) => {
    carrito.forEach(producto => {
        pintarProductoCarrito(producto);
    });
};

// Función para vaciar el carrito
const vaciarCarrito = () => {
    const contenedorCarrito = document.getElementById('tabla-carrito');
    contenedorCarrito.innerHTML = "";
    localStorage.clear();
    carrito = [];
    actualizarTotalesCarrito(carrito);
};

// Evento que se dispara cuando el contenido del DOM ha sido cargado
document.addEventListener('DOMContentLoaded', () => {
    // Se carga el carrito desde el almacenamiento local
    cargarCarritoDesdeLocalStorage();

    // Se agrega un evento de clic al botón para vaciar el carrito
    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
});
