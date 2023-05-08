const productosdisponibles = async () => {
    const response = await fetch('../data/stock.json');
    const data = await response.json();

    return data
};

productosdisponibles().then(res=> {
     window.productos = res;
})