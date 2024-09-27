const genericUrl = "https://striveschool-api.herokuapp.com/api/product/";
const genericUrlId = new URLSearchParams(location.search);
const urlId = genericUrlId.get("idProduct");
const authorizationUrl =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzE1MDc5YzQ1ZjAwMTU2OWI0ZDciLCJpYXQiOjE3Mjc0MjY4OTYsImV4cCI6MTcyODYzNjQ5Nn0.SpucDUs6uzg_9R-tbhtlGPKGfBPx9JJZrT5QQpUy4CY";

const productDetails = () => {
  if (urlId) {
    fetch(genericUrl + urlId, {
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
      .then((data) => {
        console.log("dettaglio prodotto", data);
        displayDetails(data);
      })
      .catch((err) => {
        console.log("ERRORE!", err);
      });
  } else {
    console.log("ID prodotto non fornito");
  }
};

const displayDetails = function (pDet) {
  const row = document.getElementById("index-row");
  const newCol = document.createElement("div");
  const col = document.createElement("div");
  col.classList.add("col", "col-12", "col-md-4");
  col.innerHTML = `
    <div class="card">
      <img src="${pDet.imageUrl}" class="card-img-top" alt="immagine dei prodotti inseriti">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${pDet.name}</h5>
        <p class="card-text flex-grow-1">${pDet.description}</p>
        <p class="card-text">${pDet.price}€</p>
       <a href="./backoffice.html?idProduct=${pDet._id}" class="btn btn gradient-customBtn mt-3">Modifica scheda prodotto</a>
        <button id="deleteButton" class="btn gradient-BtnRed mt-3">Elimina Prodotto</button>
      </div>
    </div>`;

  row.appendChild(col);
  document.getElementById("deleteButton").addEventListener("click", deleteProduct);
};

const deleteProduct = function () {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(genericUrl + urlId, {
      method: "DELETE",
      headers: {
        Authorization: authorizationUrl,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("prodotto eliminato");
          location.assign("./index.html");
        } else {
          throw new Error("Errore! Prodotto non cancellato");
        }
      })
      .catch((err) => {
        console.log("ERRORE", err);
      });
  }
};

productDetails();
