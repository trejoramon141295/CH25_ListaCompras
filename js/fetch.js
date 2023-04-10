// Fetch

// producto = null;
// function getProducto() {
//     return new Promise((resolve, reject) => {
//         if (producto == null) {
//             reject(new Error("Producto no Existe"));
//         }//if null

//         setTimeout(() => {
//             resolve(producto);
//         }, 5000);
//     });//new Promise
// }//get Producto

function getProducto(){ //con fetch
    let promesa = fetch("https://fakestoreapi.com/products",{
        method: "GET"
    });
    promesa.then( (response) =>{
        response.json().then((prods) =>{
            createCards (prods);
            console.log("prods=>json()");
            console.log(prods);
        }//prods
        )//then json
        .catch((err) => {
            console.error("Error en el Formato de la respuesta: " + err.menssage);            
        }); //catch json
    }//response
    )//then
    .catch((error) => {
        console.error("Error en la respuesta " + error.menssage);            
    }); //catch promesa
}//getProducto

getProducto();
    // .then((prod) => console.log(prod)) //resolve
    // .catch((err) => console.log(err.menssage)); //reject

let mainProds = document.getElementById("mainProds");
function createCards(prods){
    prods.forEach(prod => {
        mainProds.insertAdjacentHTML("beforeend",
        `   <div class="card col" style="width: 18rem;">
                <img src="${prod.image}" class="card-img-top" alt="${prod.description}">

            </div>
        `)
    });
}//createCards