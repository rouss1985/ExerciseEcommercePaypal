//esto lo ocupa para ver si tiene algo el local storage y no causar errores
var store = JSON.parse(localStorage.getItem('ids'));

//le asigno el valor de la base local
if(store==null){
    var local=[];
}else{
    var local = JSON.parse(localStorage.getItem('ids'));
}

//este es el template que se usa para cada fila de los productos del carrito
function elementoCarrito(product){
    let producto = `
    <tr>
      <th scope="row">${product[0].title}</th>
      <td>${product[0].price}</td>
      <td></td>
    </tr>
    `;
    //regreso el template ya armado
    return producto;
}

//esta funcion itera los ids que guardo al agregar al carrito, estan en el local storage como ids
function drawCarrito(){
    //arranco la sumatoria en cero
    let sumatoria=0;
    //jalo el elemento que me va a servir para ir agregando elementos del carrito
    let cartpContainer = document.getElementById("cart-container");

    //ejecuto un for each de los id's que tengo en el arreglo ids del local storage
    local.forEach(function(value){
        //filtro el arreglo data y regreso solo el elemento con el id solicitado
        let parray = data.products.filter(function(p){
            if (p.id==value) { return p; }
        });
        //le sumo el precio del elemento que estoy iterando a la sumatoria, primero la tengo que pasar a int
        sumatoria+=parseInt(parray[0].price);
        //esto asigna el template de las filas a una variable, se ejecuta una funcion y como parametro se pasa el objeto
        //del producto que estoy iterando
        elemento=elementoCarrito(parray);

        //genero el elemento tr
        let producttr = document.createElement("tr");
        producttr.className = "col text-center";
        producttr.innerHTML = elemento;
        //se lo pego al elemento cart-container
        cartpContainer.appendChild(producttr);
    });

    //este segundo temlate solo es para el precio y solo le pinto el resultado de la sumatoria
    let sumaTemplate = `
    <tr>
      <td>Total</td>
      <td></td>
      <td id="total">${sumatoria}
      <form action="https://www.sandbox.paypal.com/cgi-bin/webscr" method="post" class="has-validation-callback">
          <input type="hidden" name="cmd" value="_xclick">
          <input type="hidden" name="business" value="pagos@laboratoriademo.mx">
          <input type="hidden" name="item_name" value="Pago de carrito">
          <input type="hidden" name="currency_code" value="MXN">
          <input type="hidden" name="amount" value="${sumatoria}">
          <input type="hidden" name="no_shipping" value="1">
          <input type="hidden" name="invoice" id="invoice" value="1">
          <input type="submit" name="submit" value="pagar" alt="Make payments with PayPal - it's fast, free and secure!">
      </form>
      </td>
    </tr>
    `;
    //creo un nuevo tr para la sumatoria
    let sumas = document.createElement("tr");
    sumas.className = "col text-center";
    sumas.innerHTML = sumaTemplate;

    //le pego la sumatoria al elemento
    cartpContainer.appendChild(sumas);
}
//aqui ejecuto el código
drawCarrito();
