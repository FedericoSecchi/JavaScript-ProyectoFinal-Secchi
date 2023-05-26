// Función asincrónica para mostrar los productos en el contenedor
const pintarProductos = async () => {
    // Se llama a la función productosdisponibles para obtener los datos de los productos
    const data = await productosdisponibles();
    
    // Se obtiene el contenedor donde se mostrarán los productos en el DOM
    const contenedor = document.getElementById("producto-contenedor");

    // Se itera sobre cada producto en la data obtenida
    data.forEach(producto => {
        // Se crea un elemento div para representar cada producto
        const div = document.createElement('div');
        div.classList.add('card');
        
        // Se agrega el contenido HTML al div, utilizando los datos del producto
        div.innerHTML += `<div class="card-image">
                          <img src=${producto.imagen}>
                          <span class="card-title">${producto.nombre}</span>
                          <a class="btn-floating halfway-fab waves-effect waves-light red"><i data-id=${producto.id} class="material-icons agregar">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <p>${producto.desc}</p>
                            <p>Precio: $${producto.precio}</p>
                            <p>Tamaño: ${producto.tamaño}</p>
                            <p>Color: ${producto.color}</p>
                            <p>Material: ${producto.material}</p>
                            <p>Marca: ${producto.marca}</p>
                        </div>
                       `;
        
        // Se agrega el div al contenedor en el DOM
        contenedor.appendChild(div);
    });
};
