let cart = [];

// AGREGAR AL CARRITO
function addToCart(product, price) {
    // Verificar si el producto ya existe
    const existing = cart.find(item => item.product === product);

    if(existing){
        existing.quantity++;
    } else {
        cart.push({
            product: product,
            price: price,
            quantity: 1
        });
    }

    updateCart();
}

// MOSTRAR / OCULTAR CARRITO
function toggleCart(){
    const box = document.getElementById("cartBox");
    box.style.display = (box.style.display === "block") ? "none" : "block";
}

// ACTUALIZA LA LISTA DEL CARRITO
function updateCart(){
    const cartList = document.getElementById("cartList");
    const cartCount = document.getElementById("cartCount");
    const totalCarrito = document.getElementById("totalCarrito");

    cartList.innerHTML = "";
    let total = 0;
    let cantidadTotal = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        cantidadTotal += item.quantity;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.product} - $${item.price} x ${item.quantity}
            <button onclick="removeItem('${item.product}')">❌</button>
        `;
        cartList.appendChild(li);
    });

    cartCount.innerText = cantidadTotal;
    totalCarrito.innerText = total;
}

// QUITAR PRODUCTO DEL CARRITO
function removeItem(product){
    cart = cart.filter(item => item.product !== product);
    updateCart();
}

// FINALIZAR COMPRA
function checkout(){
    if(cart.length === 0){
        alert("Tu carrito está vacío.");
        return;
    }

    const metodo = document.getElementById("paymentMethod").value;

    alert(
        "Compra realizada con éxito.\n" +
        "Método de pago: " + metodo + "\n" +
        "Productos: " + cart.length
    );

    cart = [];
    updateCart();
}
// FINALIZAR COMPRA
function checkout(){
    if(cart.length === 0){
        alert("Tu carrito está vacío.");
        return;
    }

    const metodo = document.getElementById("paymentMethod").value;
    let datos = "";

    if(metodo === "Tarjeta"){
        const numero = prompt("Ingresa tu número de tarjeta");
        const nombre = prompt("Nombre del titular");
        const cvv = prompt("Ingresa el CVV (3 dígitos)");

        if(!numero || !nombre || !cvv){
            alert("Debes llenar todos los datos.");
            return;
        }

        datos = `Tarjeta terminación: ${numero.slice(-4)}`;

    } else if(metodo === "Transferencia"){
        const referencia = prompt("Ingresa el número de referencia de la transferencia:");

        if(!referencia){
            alert("Debes ingresar una referencia.");
            return;
        }

        datos = `Referencia: ${referencia}`;

    } else if(metodo === "Efectivo"){
        alert("Deberás pagar en efectivo al recibir tu producto.");
        datos = "Pago en efectivo";
    }

    alert(
        "Compra realizada con éxito.\n" +
        "Método de pago: " + metodo + "\n" +
        datos + "\n" +
        "Total pagado: $" + document.getElementById("totalCarrito").innerText
    );

    cart = [];
    updateCart();
}