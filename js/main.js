// El código va aquí -> 
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");

//Limpiar campos
btnClear.addEventListener("click",function(event){
    event.preventDefault();
    txtNombre.value ="";
    txtNumber.value ="";
});

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

    let lista = "Los siguientes campos deben se llenado correctamente: <ul>";
   if (txtNombre.value.length == 0) {
        txtNombre.style.border="solid thin red";//Borde en rojo
        lista += "<li>Se debe escribir un nombre Valido</li>";  
        alertValidaciones.style.display="block";
   }else{
        txtNombre.style.border = "";
   }//if txtNombre

   if (txtNumber.value.length == 0) {
        txtNumber.style.border="solid thin red";//Borde en rojo
        lista+="<li>Se debe escribir una cantidad Valida</li>";  
        alertValidaciones.style.display="block";
    }else{
        txtNumber.style.border = "";
    }//if txtNumber
    lista += "</ul>";
    alertValidacionesTexto.insertAdjacentHTML("beforeend", lista);
});//Boton Agregar

txtNombre.addEventListener("blur", function(event){//blur cuando se sale del campo ejecuta la operacion
    event.preventDefault();
    txtNombre.value=txtNombre.value.trim();//Con trim borras espacios
});//txtNumbre.blur
txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    txtNumber.value=txtNombre.value.trim();
});//txtNumber.blur