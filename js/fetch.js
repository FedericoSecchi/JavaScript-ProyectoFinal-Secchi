// Función asincrónica para obtener los productos disponibles
const productosdisponibles = async () => {
    // Se realiza una solicitud de fetch para obtener el archivo JSON que contiene la información de los productos
    const response = await fetch('../data/stock.json');
    // Se espera a que la respuesta se convierta en formato JSON
    const data = await response.json();

    // Se devuelve la data obtenida
    return data;
};

// Se llama a la función productosdisponibles y se maneja la respuesta con el método then
productosdisponibles().then(res => {
    // Se asigna la respuesta al objeto global "productos"
    window.productos = res;
});
