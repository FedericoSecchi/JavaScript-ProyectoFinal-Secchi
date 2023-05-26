let carrito = [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        agregarProductoAlCarrito(e.target.dataset.id);
    };
});

const agregarProductoAlCarrito = (productoId) => {
    const estaRepetido = carrito.some(producto => producto.id.toString() === productoId.toString());

    if (!estaRepetido) {
        const productoEncontrado = productos.find(producto => producto.id.toString() === productoId.toString());

        carrito.push({ ...productoEncontrado, cantidad: 1 });
        pintarProductoCarrito(productoEncontrado);

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
        const productoRepetido = carrito.find(producto => producto.id.toString() === productoId.toString());
        productoRepetido.cantidad++;
        const cantidad = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidad.innerText = `Cantidad: ${productoRepetido.cantidad}`;

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
    actualizarTotalesCarrito(carrito);
    guardarCarritoStorage(carrito);
};

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

const actualizarTotalesCarrito = (carrito) => {
    const totalCantidad = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    const totalCompra = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

    pintarTotalesCarrito(totalCantidad, totalCompra);
};

const pintarTotalesCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById('contador-carrito');
    const precioTotal = document.getElementById('precioTotal');

    contadorCarrito.innerText = totalCantidad;
    precioTotal.innerText = totalCompra;
};

const eliminarProductoCarrito = (productoId) => {
    const productoIndex = carrito.findIndex(producto => producto.id === productoId);
    carrito.splice(productoIndex, 1);
    pintarCarrito(carrito);
    actualizarTotalesCarrito(carrito);
    const row = document.getElementById(`productoEnCarrito-${productoId}`);
    row.remove();

    Toastify({
        text: `Se eliminó el producto del carrito`,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#FF6347',
        stopOnFocus: true
    }).showToast();

    guardarCarritoStorage(carrito);
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const cargarCarritoDesdeLocalStorage = () => {
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        pintarCarrito(carrito);
        actualizarTotalesCarrito(carrito);
    }
};

const pintarCarrito = (carrito) => {
    carrito.forEach(producto => {
        pintarProductoCarrito(producto);
    });
};

const vaciarCarrito = () => {
    const contenedorCarrito = document.getElementById('tabla-carrito');
    contenedorCarrito.innerHTML = "";
    localStorage.clear();
    carrito = [];
    actualizarTotalesCarrito(carrito);
};

document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeLocalStorage();

    const botonVaciarCarrito = document.getElementById('vaciar-carrito');
    botonVaciarCarrito.addEventListener('click', vaciarCarrito);
});
