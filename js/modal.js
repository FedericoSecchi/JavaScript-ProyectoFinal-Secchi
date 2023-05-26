// Seleccionar el contenedor del modal
const modalContenedor = document.querySelector('.modal-contenedor');

// Seleccionar el botón de abrir el carrito
const abrirCarrito = document.getElementById('cesta-carrito');

// Seleccionar el botón de cerrar el carrito
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');

// Agregar un evento de clic al botón de abrir el carrito
abrirCarrito.addEventListener('click', () => modalContenedor.classList.toggle('modal-active'));

// Agregar un evento de clic al botón de cerrar el carrito
cerrarCarrito.addEventListener('click', () => modalContenedor.classList.toggle('modal-active'));

// Agregar un evento de clic al contenedor del modal
modalContenedor.addEventListener('click', () => cerrarCarrito.click());

// Agregar un evento de clic a los elementos dentro del modal del carrito
document.querySelector('.modal-carrito').addEventListener('click', (e) => {
    // Evitar que el evento de clic se propague hacia los elementos padre
    e.stopPropagation();

    // Verificar si el elemento clickeado contiene la clase "boton-eliminar"
    if (e.target.classList.contains('boton-eliminar')) {
        // Obtener el atributo "data-id" del elemento clickeado
        console.log(e.target.dataset);
        // Llamar a la función eliminarProductoCarrito con el ID obtenido
        eliminarProductoCarrito(e.target.dataset.id);
    }
});
