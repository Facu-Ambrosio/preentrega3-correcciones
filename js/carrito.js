/* const armadoCarrito = () => { //funcion que arma la estrucutra html del carrito en el carrito.html
      for (let dibujo of carrito) { //por cada articulo en el carrito del storage
            let fila = document.createElement("li"); //crea una etiqueta section

            fila.classList.add("list-group-item", "listItemsCarrito"); //a dicha etiquete section le agrega las clases container y sectionCarrito
            fila.innerHTML = ` 
            <section class = "container sectionCarrito" >
                  <div class="row align-items-center">
                        <div class="col-1">
                              <img class="imagenCarrito" src="../Assets/Galeria/reescaladas/${dibujo.nombre}.jpg" alt="">
                        </div>
                        <div class="col-7">
                              ${dibujo.nombre} (x ${dibujo.cantidad})
                        </div>
                        <div class="col-2">
                              precio:  $${dibujo.precio * dibujo.cantidad}
                        </div>
                        <div class="col-2">
                              <button type="button" class="btn btn-danger" id = "${dibujo.nombre}">Sacar del carrito</button>
                        </div>
                  </div>
            </section>
            `; //estructura HTML del carrito
            lista.appendChild(fila); //se agrega el section nuevo al main de carrito.html
      }
}
const precioFinal = () => { //funcion que calcula y muestra el precio final de todos los productos en el carrito
      let total = carrito.map((el) => el.cantidad * el.precio).reduce((acumulador, elemento) => acumulador + elemento, 0) //hago un map() a todos los precios de los productos en el localStorage multiplicado por sus respectivas cantidades, y luego se suman
      precioTotal.innerHTML = `
      <ul class="list-group" >
            <li class="list-group-item" id="precioTotal">
                  el precio total es de $${total}
            </li>
      </ul>
      ` //se muestra en pantalla el precio final
}

const sacarCarrito = (e) => { //funcion que permite sacar articulos del carrito
      const nombre = e.target.id; //se declara una variable que almacena el id del boton que coincide con el nombre del articulo
      const carritoStorage = JSON.parse(localStorage.getItem("carrito")); // se obtiene del storage el carrito

      const elementoASacar = carritoStorage.find((e) => e.nombre === nombre); //objeto a sacar 
      if (elementoASacar) { //si el elemento que se quiere sacar  no se ha sacado antes
            const carritoNuevo = carritoStorage.filter((el) => el.nombre !== nombre); //se crea un carrito nuevo sin incluir el articulo

            localStorage.setItem("carrito", JSON.stringify(carritoNuevo)); //se sube al storage el carrito nuevo

            alert(`Acaba de sacar el/los dibujo/s "${nombre}" del carrito. Recargue la página.`); //aviso al usuario de que saco el articulo del carrito, una vez que se recargue la pagina el articulo desaparecera

      } else { //en caso de que el usuario no recargue la pagina una vez eliminado el articulo, y se vuelva a apretar el boton de sacare del carrito
            alert(`El dibujo "${nombre}" ya se quitó del carrito, recargue la pagina`); //aviso de que ya lo ha sacado del carrito
      }

}



let lista = document.getElementById("elementos"); //ul del carrito.html

let carrito = JSON.parse(localStorage.getItem("carrito")); //carrito del storage
let precioTotal = document.getElementById("precioTotal");

if (carrito) {
      armadoCarrito(); //funcion que arma la estructura HTML del carrito
      precioFinal();
} else {
      alert("el carrito esta vacio, vuelva al inicio")
}

let sacar = document.getElementsByTagName("button"); //botones para sacar elementos del carrito
for (let botones of sacar) { //por cada boton de sacar del carrito en el carrito.html se declara un evento
      botones.addEventListener("click", sacarCarrito); //evento del tipo click y que acciona la funcion sacarCarrito
} */



// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//funcion que quite elementos HTML, evento
const sacar = (e) => {
      let nombre = e.target.id;
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      let carritoSinElemento = carrito.filter((el) => el.nombre !== nombre);
      if (carritoSinElemento.length === 0) {
            localStorage.removeItem("carrito");
            let precioCarrito = document.getElementById("precioCarrito");
            precioCarrito.innerHTML = "";
      } else {
            localStorage.setItem("carrito", JSON.stringify(carritoSinElemento));
      }      
      let precioTotal = suma(carritoSinElemento);
      let precioCarrito = document.getElementById("precioCarrito");
      if (precioTotal === 0){
            precioCarrito.innerHTML= '';
            alert("Usted ha vaciado el carrito, regrese al inicio");
      } else {
            precioCarrito.innerHTML=`
            <div class="alert alert-success" role="alert">
                  El precio total es de $${precioTotal}
            </div>
            `;
      }
      let liAsacar = document.getElementById(`${nombre}_Lista`);
      liAsacar.remove();
}

//funcion que calcule el precio totol
const suma = (carrito) =>{
      let precios = []
      for (let i of carrito){
            let precioIndividual = i.precio * i.cantidad;
            precios.push(precioIndividual);
      }
      let precioFinal = precios.reduce((acum, elem) => acum + elem, 0);
      return  precioFinal;
}

//funcion que agregue elementos HTML de los productos
const listas = () => {
      let main = document.getElementById("mainCarrito");
      let ul = document.createElement("ul");
      ul.classList.add("list-group", "list-group-flush", "ulCarrito");
      let carrito = JSON.parse(localStorage.getItem("carrito"));
      if (carrito) {
            for (let i of carrito) {
                  let li = document.createElement("li");
                  li.id = `${i.nombre}_Lista`
                  li.classList.add("list-group-item", "listaCarrito", "align-items-center");
                  li.innerHTML = `
                  <div   class = "divCarritoImagen col-2">
                        <img src="../Assets/Galeria/reescaladas/${i.nombre}.jpg" class = "imagenCarrito">
                  </div>
                  <div class = "col-3">
                        ${i.nombre} x ${i.cantidad}
                  </div>
                  <div  class ="col-5  precioCarrito justify-content-end">
                       Precio: $ ${i.cantidad * i.precio}
                  </div>
                  <div   class = "col-2">
                        <button type="button" class="btn btn-danger" id = "${i.nombre}">
                              Sacar del carrito
                        </button>
                  </div>
                  `
                  ul.appendChild(li);
            }
            let precioTotal = suma(carrito);
            let precioCarrito = document.createElement("div");
            precioCarrito.id = "precioCarrito"
            precioCarrito.innerHTML=`
            <div class="alert alert-success" role="alert">
                  El precio total es de $${precioTotal}
            </div>
            `;
            main.appendChild(ul);
            main.appendChild(precioCarrito);
            let botones = main.getElementsByTagName("button");
            for (let i of botones) {
                  i.addEventListener("click", sacar);
            }
      } else {
            alert("el carrito esta vacio");
      }
}

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------


let carrito = JSON.parse(localStorage.getItem("carrito"));

listas();










