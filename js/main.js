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

let datos = [];//Se alamcenaran los datos de la tabla
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

    localStorage.setItem("contadorProductos",contador);
    localStorage.setItem("totalEnProductos",totalEnProductos);
    localStorage.setItem("costoTotal",costoTotal.toFixed(2));
    
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
        let elemento = `{
                        "id" : ${contador},
                        "nombre" : "${txtNombre.value}",
                        "cantidad" : "${txtNumber.value}",
                        "precio" : "${precio}"
                        }` ;//ojo con la sintaxis de las comillas y comas
        datos.push(JSON.parse(elemento));//Tener un arreglo

        localStorage.setItem("datos",JSON.stringify(datos));//Guardarlo el el local storage
                        
        cuerpoTabla[0].insertAdjacentHTML("beforeend", row);//Agragas tabla
        contadorProductos.innerText=contador;
        totalEnProductos += parseFloat(txtNumber.value);
        productosTotal.innerText= totalEnProductos;
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        //JSON
        let resumen =` {"contadorProductos" : ${contador},
                        "totalEnProductos"  : ${totalEnProductos},
                        "costoTotal"        : ${costoTotal.toFixed(2)} }`;
        localStorage.setItem("resumen",resumen);
        //Se hizo inicialmente uno por uno, se sustituye con lo de Jason 
        // localStorage.setItem("contadorProductos",contador);
        // localStorage.setItem("totalEnProductos",totalEnProductos);
        // localStorage.setItem("costoTotal",costoTotal.toFixed(2));
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

//Evento al cargar la pagina
window.addEventListener("load",function(event){
    if(localStorage.getItem("resumen")==null){
        let resumen =` {"contadorProductos" : ${contador},
                        "totalEnProductos"  : ${totalEnProductos},
                        "costoTotal"        : ${costoTotal.toFixed(2)} }`;
        localStorage.setItem("resumen",resumen);//No olvidar
    }//if
    let res = JSON.parse(localStorage.getItem("resumen"));
    //Validando que existe el datos
    if(localStorage.getItem("datos")!= null){
        datos = JSON.parse(localStorage.getItem("datos"));
        
        datos.forEach(r => {
            let row = ` <tr>
                        <th>${r.id}</th>
                        <td>${r.nombre}</td>
                        <td>${r.cantidad}</td>
                        <td>${r.precio}</td>
                        </tr>`;
            cuerpoTabla[0].insertAdjacentHTML("beforeend", row);            
        });

    }//!=null
    // if(localStorage.getItem("contadorProductos")==null){
    //     localStorage.setItem("contadorProductos","0");
    // }//Establece a 0 si no hay valores para evitar el NaN
    // if(localStorage.getItem("totalEnProductos")==null){
    //     localStorage.setItem("totalEnProductos","0");
    // }//Establece a 0 si no hay valores para evitar el NaN
    // if(localStorage.getItem("costoTotal")==null){
    //     localStorage.setItem("costoTotal","0.0");
    // }//Establece a 0.0 si no hay valores para evitar el NaN
    // contador = parseInt(localStorage.getItem("contadorProductos"));
    // totalEnProductos =parseInt(localStorage.getItem("totalEnProductos"));
    // costoTotal =parseFloat(localStorage.getItem("costoTotal"));

    contador = res.contadorProductos;
    totalEnProductos = res.totalEnProductos;
    costoTotal = res.costoTotal;

    contadorProductos.innerText=contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal}`;

});