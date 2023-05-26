const pintarProductos = async () => {
    const data = await productosdisponibles()
    const contenedor = document.getElementById("producto-contenedor");

    data.forEach(producto => {
        const div = document.createElement('div');
        div.classList.add('card');
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
        contenedor.appendChild(div);
    });
};