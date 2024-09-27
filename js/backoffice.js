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
  fetch(genericUrl + urlId, {
    method: "GET",
    headers: {
      Authorization: authorizationUrl,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore! Prodotto da modificare non recuperato");
      }
    })
    .then((modifiedProduct) => {
      document.getElementById("name").value = modifiedProduct.name;
      document.getElementById("description").value = modifiedProduct.description;
      document.getElementById("brand").value = modifiedProduct.brand;
      document.getElementById("imageUrl").value = modifiedProduct.imageUrl;
      document.getElementById("price").value = modifiedProduct.price;

      document.getElementById("boBtn").innerText = "Modifica scheda prodotto";
    })
    .catch((err) => {
      console.log("Si è verificato un errore:", err);
      alert("Errore: " + err);
    });
}

const productsForm = document.getElementById("productsForm");
productsForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const price = document.getElementById("price").value;

  const product = new Product(name, description, brand, imageUrl, price);
  console.log("Prodotto creato", product);

  const method = urlId ? "PUT" : "POST";

  fetch(urlId ? genericUrl + urlId : genericUrl, {
    method: method,
    body: JSON.stringify(product),
    headers: {
      Authorization: authorizationUrl,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(urlId ? "Prodotto modificato con successo" : "Prodotto salvato con successo");
        if (!urlId) productsForm.reset();
      } else {
        throw new Error("Errore nella risposta");
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
      alert("Errore: " + err.message);
    });
});

const resetButton = document.getElementById("resetBtn");
resetButton.addEventListener("click", function (e) {
  e.preventDefault();
  if (confirm("Sei sicuro di voler resettare il modulo?")) {
    productsForm.reset(); //
  }
});
