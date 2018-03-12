//esto lo ocupa para ver si tiene algo el local storage y no causar errores
var store = JSON.parse(localStorage.getItem('ids'));

//le asigno el valor de la base local
if(store==null){
    var local=[];
}else{
    var local = JSON.parse(localStorage.getItem('ids'));
}
let counter=local.length;
let contadorspan = document.getElementById("counterItems");
contadorspan.innerHTML = counter;


function drawProducts(data) {
  let products = data.products;
  let productsContainer = document.getElementById("products-container");
  products.forEach((product, index) => {
    let productHTML = createProductHTML(product);
    productsContainer.appendChild(productHTML);
  });
}

function createProductHTML(product) {
  let template = `
    <h3>${product.title}</h3>
    <img src='${product.imageUrl}' alt='${product.description}'/>
    <p>${product.description}</p>
    <button id=${product.id}
      data-accion="agregar"
      onclick="addToCart(${product.id})"
      class='btn btn-primary agregar'>
        + Agregar a carrito
      </button>
    <hr/>
  `;
  let productContainer = document.createElement("div");
  productContainer.className = "col text-center";
  productContainer.innerHTML = template;
  return productContainer;
}
//ejecuto el script
drawProducts(data);


function addToCart(id) {
    //aqui solo debe ir el cambio de estados no el agregar al carrito pues se debe poder borrar
    changeButtonStatus(id);
}

function removeFromCart(id) {
    //Elimino del carrito
    remove(local,id);
}

//funccion genérica para eliminar de un  array
function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}


function increaseCounter() {
    counter +=1;
    contadorspan.innerHTML = counter;
}

function decreaseCounter() {
    counter -=1;
    contadorspan.innerHTML = counter;
}

function changeButtonStatus(id) {

    //primero obtengo el boton por id, ese id me lo pasa el boton al hacer click
    let boton = document.getElementById(id);
    //jalo el data-accion del boton que estoy clikeando
    var accion = boton.dataset.accion;

    //checo cual es la accion del boton y ejecuto segun sea el caso
    if(accion=="agregar"){
        //solo agrego los id de cada producto a un array local esto solo aplica si la accion es agregar
        local.push(id);
        localStorage.setItem('ids', JSON.stringify(local));

        boton.classList.remove("agregar");
        boton.className = "eliminar";
        boton.dataset.accion="eliminar";
        boton.innerText="Eliminar de carrito";
        increaseCounter();
    }else{

        //este fragmento es si la accion es eliminar
        removeFromCart(id);
        boton.classList.remove("eliminar");
        boton.className = "agregar";
        boton.dataset.accion="agregar";
        boton.innerText="Agregar a carrito";
        decreaseCounter();
    }
}
