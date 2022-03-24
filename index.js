// Automatic Modal
(() => {
    if((window.location.href).includes('index')){
        const body = document.body
        const divModal = document.createElement('div');
        divModal.classList = "modal"
        divModal.innerHTML = `<h1>Welcome!</h1>`
        body.append(divModal);
        divModal.style.opacity = "0";
    
        setTimeout(() => {
            divModal.style.opacity = "1";
        }, 50);
        setTimeout(() => {
            divModal.style.opacity = "0";
        }, 1500);
        setTimeout(() => {
            divModal.style.display = 'none';
        }, 2550);
    }
})();

// HTML References
const btnComprar = document.querySelectorAll('.btn-comprar');
const mainProductos = document.querySelector('main');

// Events
const btnCategorias = () =>{
    window.location = 'products.html';
}

btnComprar.forEach(element => {
    element.addEventListener('click', (event)=> {
        btnComprarClickeado(event);
    });
});

const btnComprarClickeado = (event) => {
    const itemSeleccionado = event.target.closest('.card');
    const itemId = itemSeleccionado.id;
    const itemTitulo = itemSeleccionado.querySelector('h2').textContent;
    const itemPrecio = parseInt(itemSeleccionado.querySelector('p').textContent);
    agregarProducto(itemId,itemTitulo, itemPrecio);
}

const agregarProducto = (itemId, itemTitulo, itemPrecio) => {
    const itemPlaceholder = document.querySelector('#item-placeholder');
    itemPlaceholder.style.display = 'none';

    const divCarrito = document.querySelector('#carrito');
    const divItem = document.createElement ('div');
    divItem.id = `${itemId}`;
    divItem.classList.add('item-carrito');
    const titleItemImpreso = divCarrito.getElementsByClassName("title-item-agregado");
    
    for (let i = 0; i < titleItemImpreso.length; i++) {
        if (titleItemImpreso[i].innerText === itemTitulo) {
        const elementQuantity = titleItemImpreso[i].parentElement.parentElement.querySelector('.cant-item');
        if(elementQuantity.value <= 9){
            elementQuantity.value++;
        }
        actualizarTotalCarrito();
        return;
        }
    }

    const contenidoCarrito = `
    <div>
        <h4 class="title-item-agregado">${itemTitulo}</h4> 
        <p>${itemPrecio} €</p>
    </div> 
    <div>
        <input class="cant-item" type="number"
        value="1" max="10"> <button type="button" class="btn-delete">X</button>
    </div>`

    divItem.innerHTML = contenidoCarrito;
    divCarrito.append(divItem);
    divItem.querySelector('.btn-delete').addEventListener('click', borrarProducto);

    activarBtn();

    const cantItemsCarrito = document.querySelectorAll('.item-carrito')
    cantItemsCarrito.forEach((itemCarrito) => {
        let cantidad = itemCarrito.querySelector('input');
        cantidad.addEventListener("change", modificarCantidad);
    });
    actualizarTotalCarrito();
}

const actualizarTotalCarrito = () => {

    let total = 0;
    const sumaTotal = document.querySelector('.total-acumulado').childNodes[3];
    const itemsCarrito = document.querySelectorAll('.item-carrito');
    
    itemsCarrito.forEach((itemCarrito) => {
        const shoppingCartItemPriceElement = itemCarrito.querySelector('p');
        const shoppingCartItemPrice = parseInt(
        shoppingCartItemPriceElement.textContent.replace('€',''));
        const shoppingCartItemQuantityElement = itemCarrito.querySelector('input');
        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);
        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });
    sumaTotal.innerHTML = `${total} €`;
}

const modificarCantidad = (event) => {
    const cantidad = event.target;
    if (cantidad.value <= 0){
      cantidad.value = 1;
    }
    actualizarTotalCarrito();
} 

const borrarProducto = (event) => {
    const botonBorrar = event.target;
    botonBorrar.closest('.item-carrito').remove();
    popUpEventos('Producto Borrado con exito.');

    const divCarrito = document.querySelector('#carrito');
    const titleItemImpreso = divCarrito.getElementsByClassName("title-item-agregado");

    if(titleItemImpreso.length == 1){
        const itemPlaceholder = document.querySelector('#item-placeholder');
        itemPlaceholder.style.display = 'flex';
        desactivarBtn();
    }
    actualizarTotalCarrito();
}

const carritoComprado = () => {
    const itemsCarrito = document.querySelectorAll('.item-carrito');
    const itemsCarritoPlaceHolder = document.querySelector('#item-placeholder');
    for (let i = 0; i < itemsCarrito.length; i++) {
        itemsCarrito[i].remove();
    }
    itemsCarritoPlaceHolder.style.display = "flex";
    actualizarTotalCarrito()

    desactivarBtn();
    popUpEventos('Agradecemos tu compra.');
}

// PopUp Events
const popUpEventos = (msj) => {
    const body = document.body
        const divModal = document.createElement('div');
        divModal.classList = "modal"
        divModal.innerHTML = `<h1>${msj}</h1>`
        body.append(divModal);
        divModal.style.opacity = "0";
        setTimeout(() => {
            divModal.style.opacity = "1";
        }, 50);
        setTimeout(() => {
            divModal.style.opacity = "0";
        }, 1500);
        setTimeout(() => {
            divModal.style.display = 'none';
        }, 2550);
}

const desactivarBtn = () => {
    const btnComprarTodo = document.querySelector('.btn-comprar-2');
    btnComprarTodo.disabled = true;
    btnComprarTodo.classList.add('disabled');
    
}

const activarBtn = () => {
    const btnComprarTodo = document.querySelector('.btn-comprar-2');
    btnComprarTodo.disabled = false;
    btnComprarTodo.classList.remove('disabled');
}