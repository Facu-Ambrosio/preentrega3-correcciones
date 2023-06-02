/* const productos = [ //array con todos los productos disponibles
      { nombre: "15 Dias Mas", precio: 9000, cantidad: 1 },
      { nombre: "Muerte Roja", precio: 15000, cantidad: 1 },
      { nombre: "Demonios Internos", precio: 9000, cantidad: 1 },
      { nombre: "Vampire Batman", precio: 15000, cantidad: 1 },
      { nombre: "The Hand", precio: 9000, cantidad: 1 },
      { nombre: "Pizza y Alcohol en Gel", precio: 15000, cantidad: 1 },
      { nombre: "Principe Prospero", precio: 9000, cantidad: 1 },
      { nombre: "The Old Men", precio: 5000, cantidad: 1 },
]
const agregarCarrito = (e) => { //funcion que agrega al carrito los productos
      let dibujo = e.target.id; // id del dibujo
      let carritoStorage = JSON.parse(localStorage.getItem("carrito")) || []; // Si no hay elementos en el carrito del localStorage, se asigna un array vacío

      let dibujoExistente = carritoStorage.find((el) => el.nombre === dibujo); //variable que  indica si el dibujo al cual se agrega al carrito existe o no

      if (dibujoExistente) { //en caso de que el dibujo que se quiere agregar al carrito ya estuviera en este
            dibujoExistente.cantidad += 1; //se le suma 1 a la cantidad en el carrito
            alert(`Usted agregó ${dibujoExistente.cantidad} dibujo/s de "${dibujo}" a su carrito`); //se muestra un alert donde incique al usuario que ha agregado un articulo al carrito
      } else { //si el articulo no existe en el carrito
            let nuevoDibujo = productos.find((el) => el.nombre === dibujo); //se declara un objeto nuevo que sea el  del producto elegido
            carritoStorage.push(nuevoDibujo); //se agrega el producto al carrito que va directo al localStorage
            alert(`Usted agregó ${nuevoDibujo.cantidad} dibujo/s de "${dibujo}" a su carrito`); //alert que avisa que el usuario añadio al carrito en producto
      }

      localStorage.setItem("carrito", JSON.stringify(carritoStorage)); //subida al localStorage del carrito
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
let mainCatalogo = document.getElementById("mainCatalogo"); //obtengo como etiqueta padre el main del index.html

let boton = mainCatalogo.querySelectorAll("button"); //obtengo todos los tag button dentro del main

for (let i of boton) { //agrego a cada boton dentro del main un evento del tipo click, y cuya funcion sea agregarCarrito
      i.addEventListener("click", agregarCarrito);
} */

const productos = [ //array con todos los productos disponibles
      { nombre: "15 Dias Mas", precio: 9000, cantidad: 1 },
      { nombre: "Muerte Roja", precio: 15000, cantidad: 1 },
      { nombre: "Demonios Internos", precio: 9000, cantidad: 1 },
      { nombre: "Vampire Batman", precio: 15000, cantidad: 1 },
      { nombre: "The Hand", precio: 9000, cantidad: 1 },
      { nombre: "Pizza y Alcohol en Gel", precio: 15000, cantidad: 1 },
      { nombre: "Principe Prospero", precio: 9000, cantidad: 1 },
      { nombre: "The Old Men", precio: 5000, cantidad: 1 },
]
//funcion que aumente la cantidad
const sumar = (nombre, storage) => {
      storage.find((el) => el.nombre === nombre).cantidad += 1;
}
// funcion que agregue los articulos al array carrito, evento
const agregar = (e) => {
// VARIABLES--------------------------------------------------------------------/
      let storage = JSON.parse(localStorage.getItem("carrito"));
      let nombre = e.target.id; //nombre del articulo, =====> STR
      let productoNombre = productos.find((el) => el.nombre === nombre); //agarra el objeto en el array productos =====> OBJETO
// DESARROLLO-----------------------------------------------------------------/
      if (!storage) {
            const storageNuevo = [];
            storageNuevo.push(productoNombre); //elemento agregado al array carrito
            localStorage.setItem("carrito", JSON.stringify(storageNuevo));
      } else {
            let existencia = storage.some((el) => el.nombre === nombre);
            if (existencia) {
                  sumar(nombre, storage);
            } else {
                  storage.push(productoNombre);
            }
            localStorage.setItem("carrito", JSON.stringify(storage));
      }
}
const main = () => {
      let mainCatalogo = document.getElementById("mainCatalogo");
      let botones = mainCatalogo.getElementsByTagName("button");
      for (let boton of botones) {
            boton.addEventListener("click", agregar);
      }
}

main()



/* 

*/