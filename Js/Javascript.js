// Array de productos
const productos = {
  producto1: {
    nombre: "Papas fritas Avengers",
    precio: "500",
    descripcion:
      "Papas fritas Avengers para reunirse con amigos.",
    srcImg: "https://media.istockphoto.com/id/1199460959/es/foto/macaroni-cremoso-y-papas-fritas-con-tocino.jpg?s=612x612&w=0&k=20&c=g6XQAeKe0tFMtoO-HnPRcIzRmez7G8KSw5RPkykEZ4Q=",
  },
  producto2: {
    nombre: "Hamburguesa Hawkeye",
    precio: "1200",
    descripcion:
      "Hamburguesa con un sabor que da en el blanco.",
    srcImg:
      "https://img.freepik.com/foto-gratis/vista-frontal-hamburguesa-stand_141793-15542.jpg?w=996&t=st=1672103788~exp=1672104388~hmac=b0120b5bf0216e94be8b2f6baf7e4039949a81c1cc4c9b863f1e224ac4514582",
  },
  producto3: {
    nombre: "Pizza CapiAmerica",
    precio: "1500",
    descripcion:
      "Pizza con un piso duro como el escudo del Cap.",
    srcImg:
      "https://www.periodistadigital.com/wp-content/uploads/2020/02/pizza-americana.jpg",
  },
  producto4: {
    nombre: "Pancho Hulk",
    precio: "400",
    descripcion:
      "Con este pancho vas a quedar lleno como Bruce Banner.",
    srcImg:
      "https://img-global.cpcdn.com/recipes/689c483388f76a9e/400x400cq70/photo.jpg",
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
  const pivoteCarrito = {
    nombre: e.querySelector(".div-info .nombre-prod").textContent,
    precio: e.querySelector(".div-precio-boton .precio").textContent,
    cantidad: 1,
  };
  if (carrito.hasOwnProperty(pivoteCarrito.nombre)) {
    carrito[pivoteCarrito.nombre].cantidad += 1;
  } else {
    carrito[pivoteCarrito.nombre] = { ...pivoteCarrito };
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
