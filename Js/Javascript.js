// Array de productos
const productos = {
  producto1: {
    nombre: "Dados Para Rol",
    precio: "500",
    descripcion:
      "Los dados para usar en tus partidas.",
    srcImg: "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2015/07/dados-juegos-de-rol.jpg?fit=1000%2C598&quality=50&strip=all&ssl=1",
  },
  producto2: {
    nombre: "Pantalla de DM",
    precio: "1200",
    descripcion:
      "Pantalla para que nadie vea que hace tu DM.",
    srcImg:
      "https://gcdn.lanetaneta.com/wp-content/uploads/2022/04/DD-Como-construir-una-pantalla-DM-personalizada.jpg",
  },
  producto3: {
    nombre: "Manual del jugador",
    precio: "1500",
    descripcion:
      "Manual del Jugador para todos aquellos que quieran empezar en el rol.",
    srcImg:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6nU1Whcb1ZUoGE5gC3Rtk3RQG2alwBZr3v66kRtX7OxL-b-xTDJHzUunlfJVpfU_wAZg&usqp=CAU",
  },
  producto4: {
    nombre: "Pancho Hulk",
    precio: "400",
    descripcion:
      "Guia del DM, si quieres empezar a dirigir partidas necesitas una!",
    srcImg:
      "https://zeth.com.ar/wp-content/uploads/Edge_entertainment_Guia_del_dungeon_master_original_01.jpg",
  },
};



// Se captura el template de los productos
const templateProd = document.getElementById("template-prod").content;
const contenedorProd = document.querySelector(".contenedor-productos");
const fragment = document.createDocumentFragment();




// TODO LO RELACIONADO A AGREGAR LOS PRODUCTOS AL DOM
Object.values(productos).forEach((producto) => {
  templateProd.querySelector(".div-info .nombre-prod").textContent =
    producto.nombre;
  templateProd.querySelector(".div-precio-boton .precio").textContent =
    producto.precio;
  templateProd.querySelector(".div-info .descripcion-prod").textContent =
    producto.descripcion;
  templateProd
    .querySelector(".contenedor-img img")
    .setAttribute("alt", producto.nombre);
  templateProd
    .querySelector(".contenedor-img img")
    .setAttribute("src", producto.srcImg);
  const clone = templateProd.cloneNode(true);
  fragment.appendChild(clone);
});
contenedorProd.appendChild(fragment);




// TODO LO RELACIONADO AL CARRITO DE COMPRA
let carrito = {};
const templateTabla = document.getElementById(
"agregar-producto-al-carro"
).content;
const tbodyCarrito = document.getElementById("carrito-body");
const fragmentTabla = document.createDocumentFragment();
const templateFoot = document.getElementById("tfooter").content;
const tfootCarrito = document.getElementById("footer");

contenedorProd.addEventListener("click", (e) => {
if (e.target.textContent === "Agregar") {
    setCarrito(e.target.parentElement.parentElement);
}
e.stopPropagation();
});

const setCarrito = (e) => {
const pCarrito = {
    nombre: e.querySelector(".div-info .nombre-prod").textContent,
    precio: e.querySelector(".div-precio-boton .precio").textContent,
    cantidad: 1,
};

if (carrito.hasOwnProperty(pCarrito.nombre)) {
    carrito[pCarrito.nombre].cantidad += 1;
} else {
    carrito[pCarrito.nombre] = { ...pCarrito };
}
pintarTabla(carrito);
};



const pintarTabla = (objetoCarrito) => {
Object.values(objetoCarrito).forEach((objeto) => {
    const cloneTabla = templateTabla.cloneNode(true);
    cloneTabla.getElementById("producto").textContent = objeto.nombre;
    cloneTabla.getElementById("cant").textContent = objeto.cantidad;
    cloneTabla.getElementById("precio-uni").textContent = objeto.precio;
    let precioTotal = parseFloat(objeto.precio) * objeto.cantidad;
    cloneTabla.getElementById("precio-total-prod").textContent =
    precioTotal.toFixed(2);
    fragmentTabla.appendChild(cloneTabla);
});
tbodyCarrito.innerHTML = "";
tbodyCarrito.appendChild(fragmentTabla);
pintarFooter();
};
const pintarFooter = () => {
tfootCarrito.innerHTML = "";
if (Object.keys(carrito).length === 0) {
    tfootCarrito.innerHTML =
    "<tr><td colspan = 4>¡No hay nada en tu carrito!</td></tr>";
} else {
    const total = Object.values(carrito).reduce(
      (acc, { cantidad, precio }) => acc + cantidad * precio,
    0
    );
    templateFoot.getElementById("total-a-pagar").textContent = total.toFixed(2);
    const cloneFoot = templateFoot.cloneNode(true);
    fragment.appendChild(cloneFoot);
    tfootCarrito.appendChild(fragment);
    
    
    
    //Boton Vaciar carrito
    const botonVaciar = document.getElementById("vaciar-tabla");
    botonVaciar.addEventListener("click", () => {
    carrito = {};
    pintarTabla(carrito);
    pintarFooter();
    });




    //Botones aumentar y disminuir cantidades
}
};
tbodyCarrito.addEventListener("click", (e) => {
if (e.target.classList.contains("button")) {
    aumentarDisminuir(e.target);
}
});
const aumentarDisminuir = (boton) => {
if (boton.textContent === "+") {
    const indicador =
    boton.parentElement.parentElement.firstElementChild.textContent;
    Object.values(carrito).forEach((elemento) => {
    if (elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad++;
    }
    });
}
if (boton.textContent === "-") {
    const indicador =
    boton.parentElement.parentElement.firstElementChild.textContent;
    Object.values(carrito).forEach((elemento) => {
    if (elemento.nombre === indicador) {
        carrito[elemento.nombre].cantidad--;
        if (carrito[elemento.nombre].cantidad === 0) {
        delete carrito[elemento.nombre];
        }
    }
    });
}
pintarTabla(carrito);
pintarFooter();
};
