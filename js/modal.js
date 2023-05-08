// Seleccionamos el elemento HTML que contiene el modal del carrito
const modalContenedor = document.querySelector('.modal-contenedor');

// Seleccionamos el botón que abre el carrito
const abrirCarrito = document.getElementById('cesta-carrito');

// Seleccionamos el botón que cierra el carrito
const cerrarCarrito = document.getElementById('btn-cerrar-carrito');

// Añadimos un event listener al botón abrir carrito que togglea la clase 'modal-active'
// en el contenedor del modal, lo que muestra o esconde el modal
abrirCarrito.addEventListener('click', () => modalContenedor.classList.toggle('modal-active'));

// Añadimos un event listener al botón cerrar carrito que togglea la clase 'modal-active'
// en el contenedor del modal, lo que muestra o esconde el modal
cerrarCarrito.addEventListener('click', () => modalContenedor.classList.toggle('modal-active'));

// Añadimos un event listener al contenedor del modal que, cuando se haga click en cualquier parte
// del mismo, ejecutará el evento click en el botón cerrar carrito, lo que cerrará el modal
modalContenedor.addEventListener('click', () => cerrarCarrito.click());

// Añadimos un event listener al contenedor de la lista de productos del carrito que, cuando se haga click
// en cualquier elemento con la clase 'boton-eliminar', llamará a la función eliminarProductoCarrito con
// el valor del atributo 'value' del botón como argumento
document.querySelector('.modal-carrito').addEventListener('click', (e) => {
    e.stopPropagation();
    if (e.target.classList.contains('boton-eliminar')) {
        console.log(e.target.dataset)
        eliminarProductoCarrito(e.target.dataset.id);
    }
});
