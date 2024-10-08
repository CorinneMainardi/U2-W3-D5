const genericUrl = "https://striveschool-api.herokuapp.com/api/product/";
const authorizationUrl =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmY2NzE1MDc5YzQ1ZjAwMTU2OWI0ZDciLCJpYXQiOjE3Mjc0MjY4OTYsImV4cCI6MTcyODYzNjQ5Nn0.SpucDUs6uzg_9R-tbhtlGPKGfBPx9JJZrT5QQpUy4CY";

const displayProducts = (arrayP) => {
  console.log(arrayP);
  arrayP.forEach((p) => {
    const col = document.createElement("div");
    col.classList.add("col", "col-12", "col-md-4");
    col.innerHTML = `
        <div class="card d-flex flex-column" style="height: 100%;">
         <a href="./details.html?idProduct=${p._id}">
            <img src="${p.imageUrl}" class="card-img-top" alt="immagine dei prodotti inseriti" style="object-fit: contain; height: 200px;"> </a>
            <div class="card-body d-flex flex-column flex-grow-1">
                <h5 class="card-title">${p.name}</h5>
                <p class="card-text flex-grow-1">${p.description}</p>
                <p class="card-text">${p.price}€</p>
                <a href="./details.html?idProduct=${p._id}" class="btn btn gradient-customBtn mt-3">Dettagli prodotto</a>
                <a href="./backoffice.html?idProduct=${p._id}" class="btn gradient-BtnRed mt-3">Modifica scheda prodotto</a>
            </div>
        </div>`;
    const row = document.getElementById("index-row");
    row.appendChild(col);
  });
};

const getProduct = () => {
  const loading = document.getElementById("loading");
  loading.style.display = "inline-block";
  fetch(genericUrl, {
    headers: {
      Authorization: authorizationUrl,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .then((data) => {
      console.log("prodotti in vendita", data);
      displayProducts(data);
      loading.style.display = "none";
    })
    .catch((err) => {
      console.log("ERRORE!", err);
    });
};

getProduct();
