let carrito = [];

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('agregar')) {
        agregarProductoAlCarrito(e.target.dataset.id);
    };
});

const agregarProductoAlCarrito = (productoId) => {

    const estaRepetido = carrito.some(producto => producto.id.toString() === productoId.toString());

    console.log(estaRepetido, carrito)
    if (!estaRepetido) {
        // const producto = { ...productoEncontrado, cantidad: 1 };
        const productoEncontrado = productos.find(producto => {

            return producto.id.toString() === productoId.toString()
        });

        carrito.push({ ...productoEncontrado, cantidad: 1 });
        pintarProductoCarrito(productoEncontrado);
        console.log(carrito)
    } else {
        const productoRepetido = carrito.find(producto => producto.id.toString() === productoId.toString());
        productoRepetido.cantidad++;
        const cantidad = document.getElementById(`cantidad${productoRepetido.id}`);
        cantidad.innerText = `Cantidad: ${productoRepetido.cantidad}`;
    }
    actualizarTotalesCarrito(carrito);
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
    guardarCarritoStorage(carrito);
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
    console.log(`productoEnCarrito-${productoId}`)
    const row = document.getElementById(`productoEnCarrito-${productoId}`);
    row.remove()
};

const pintarCarrito = (carrito) => {
    const contenedor = document.getElementById('carrito-contenedor');

    contenedor.innerHTML = '';

    carrito.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" data-id="${producto.id}">X</button>
        `;
        contenedor.appendChild(div);
    });
};

const guardarCarritoStorage = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const cargarCarritoDesdeLocalStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem('carrito'));
    if (carritoStorage) {
        carritoStorage.forEach(producto => {
            carrito.push(producto);
        });
    }
};
