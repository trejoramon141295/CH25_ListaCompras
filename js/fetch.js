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
        `   <div class="col-12 col-md-6 col-lg-4" >
                <div class="card" style="width: 18rem;" >
                    <img src="${prod.image}" class="card-img-top" alt="${prod.description}"
                    style="max-width: 15rem; height: 15rem;">
                    <div class="card-body">
                        <h5 class="card-title">${prod.title}</h5>
                        <p class="card-text"><strong>${prod.category}</strong></p>
                        <p class="card-text">${prod.description.slice(0,20)} ...</p>
                        <button type="button" class="btn btn-primary" 
                        data-bs-toggle="modal" 
                        data-bs-target="#exampleModal_${prod.id}">
                        Mas Info
                        </button>
                    </div>
                </div>
            </div> <!-- div Cards -->                    
            <!-- Modal -->
            <div class="modal fade" id="exampleModal_${prod.id}" 
            tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">${prod.title}</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${prod.description}
                            <p class=text-end><strong> $ ${prod.price} USD </strong></p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `)
    });
}//createCards