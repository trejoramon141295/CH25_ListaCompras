// El código va aquí -> 
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

let tabla = document.getElementById("tablaListaCompras");//No traemos la tabla por su Id
let cuerpoTabla = tabla.getElementsByTagName("tbody");//Solo dentro de la tabla en especifico

let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let isValid = true;
let idTimeout;
let precio = 0;
let contador = 0;
let totalEnProductos = 0;
let costoTotal = 0; 
//Limpiar campos
btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    cuerpoTabla[0].innerHTML="";
    contador = 0;
    totalEnProductos = 0;
    costoTotal = 0; 
    contadorProductos.innerText="0";
    productosTotal.innerText = "0";
    precioTotal.innerText = "0";
});//clear btnclear

function validarCantidad(){
    if (txtNumber.value.length == 0) {
        return false;
    }//if
    if(isNaN(txtNumber.value)){
        return false;
    }//if
    if(parseFloat(txtNumber.value)<=0){
        return false;
    }//if
    return true;
};//validar Cantidad

function getPrecio(){
    return Math.floor(Math.random()*50*100)/100;
};//getPrecio

btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    isValid = true;
    clearTimeout(idTimeout);//Cancelamos Timeout cada vez
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    let lista = "Los siguientes campos deben se llenado correctamente: <ul>";
    if (txtNombre.value.length < 2) {
        txtNombre.style.border = "solid thin red";//Borde en rojo
        lista += "<li>Se debe escribir un nombre Válido</li>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } else {
        txtNombre.style.border = "";
    }//if txtNombre

    if (! validarCantidad()) {
        txtNumber.style.border = "solid thin red";//Borde en rojo
        lista += "<li>Se debe escribir una cantidad Válida</li>";
        alertValidaciones.style.display = "block";
        isValid = false;
    } else {
        txtNumber.style.border = "";
    }//if No valida la cantidad
    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
    idTimeout = setTimeout(function () {
        alertValidaciones.style.display = "none";
    }, 3000);//Tiempo para quitar el emsje de validaciones
    if (isValid){
        precio = getPrecio();
        contador++;
        let row = ` <tr>
                        <th>${contador}</th>
                        <td>${txtNombre.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
        cuerpoTabla[0].insertAdjacentHTML("beforeend", row);//Agragas tabla
        contadorProductos.innerText=contador;
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText= totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`; 
        txtNombre.value = "";//Limpiar campos
        txtNumber.value = "";
        txtNombre.focus();//llevar al campo del nombre
    }//if para solo agragar cuando ambos campos se cumplan

});//Boton Agregar Click

txtNombre.addEventListener("blur", function (event) {//blur cuando se sale del campo ejecuta la operacion
    event.preventDefault();
    txtNombre.value = txtNombre.value.trim();//Con trim borras espacios
});//txtNumbre.blur
txtNumber.addEventListener("blur", function (event) {
    event.preventDefault();
    txtNumber.value = txtNumber.value.trim();
});//txtNumber.blur