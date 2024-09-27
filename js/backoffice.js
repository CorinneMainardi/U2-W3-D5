const genericUrl = "https://striveschool-api.herokuapp.com/api/product/";

const authorizationUrl =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzE1MDc5YzQ1ZjAwMTU2OWI0ZDciLCJpYXQiOjE3Mjc0MjY4OTYsImV4cCI6MTcyODYzNjQ5Nn0.SpucDUs6uzg_9R-tbhtlGPKGfBPx9JJZrT5QQpUy4CY";
//classeprodotto
class Product {
  constructor(name, description, brand, imageUrl, price) {
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.imageUrl = imageUrl;
    this.price = price;
  }
}
const genericUrlId = new URLSearchParams(location.search);

const urlId = genericUrlId.get("idProduct");

if (urlId) {
  fetch(genericUrl + urlId)
    // .then((response) => (response.ok ? response.json() : Promise.reject(new Error("Errore! Prodotto da modificare non recuperato "))))
    //provato a fare il thernary operator.

    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore! Prodotto da modificare non recuperato");
      }
    })
    .then((modifiedProduct) => {
      const modifiedName = document.getElementById("name");
      const modifiedDescription = document.getElementById("description");
      const modifiedBrand = document.getElementById("brand");
      const modifiedImageUrl = document.getElementById("imageUrl");
      const modifiedPrice = document.getElementById("price");

      modifiedName.value = modifiedProduct.name;
      modifiedDescription.value = modifiedProduct.description;
      modifiedBrand.value = modifiedProduct.brand;
      modifiedImageUrl.value = modifiedProduct.imageUrl;
      modifiedPrice.value = modifiedProduct.price;

      document.getElementById("boBtn").innerText = "modifica scheda prodotto";
    })
    .catch((err) => {
      console.log("error", err);
    });
}

const productsForm = document.getElementById("productsForm");
productsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  //mi creo le cnst del form
  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;

  //creo il prodotto a partire dalla classe
  const product = new Product(name, description, brand, imageUrl, price);
  console.log("prodotto creato", product);

  fetch(urlId ? genericUrl + urlId : genericUrl, {
    //ternary per scegliere il metodo da utilizzare
    method: urlId ? "PUT" : "POST",
    body: JSON.stringify(product),
    headers: {
      Authorization: authorizationUrl,
      "Content-Type": "application/json",
    },
  })
    .then((response) =>
      response.ok
        ? (alert(urlId ? "Prodotto modificato con successo" : "Prodotto salvato con successo"), !urlId && productsForm.remove())
        : Promise.reject(new Error("Errore nella risposta"))
    )
    .catch((err) => {
      console.log("ERRORE", err);
    });
});
