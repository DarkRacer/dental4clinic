const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}

getPrices()

let goToTop = document.getElementById("goToTop");
let pricesDialogTitle = document.getElementById("pricesDialogTitle");
let pricesDialogDescription = document.getElementById("pricesDialogDescription");
let pricesDialogPluses = document.getElementById("pricesDialogPluses");
let pricesDialogPrice = document.getElementById("pricesDialogPrice");
let pricesContent = document.getElementById("pricesContent");
var pricesDialog = document.querySelector('#pricesDialog');


document.querySelector('#pricesDialogClose').onclick = function() {
  pricesDialog.close();
  pricesDialogTitle.innerText = ''
  pricesDialogDescription.innerText = 'Упс. Что-то пошло не так...';
  pricesDialogPluses.innerHTML = ``;
  pricesDialogPrice.innerText = ``;
}

goToTop.addEventListener("click", (e) => {
  topFunction();
})

window.onscroll = function() {scrollFunction()};

goToTop.addEventListener("click", (e) => {
  topFunction();
})

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTop.style.display = "block";
  } else {
    goToTop.style.display = "none";
  }
}
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function getPrices() {
  GetUrl('prices').then(data => {
    let result = ``;

    data.forEach(priceGroup =>  {
      let groupHtml = `
        <div class="prices-group">
            <div class="prices-group-title">${priceGroup.group}</div>
            <div class="prices-group-content">
      `;

      priceGroup.services.forEach(service => {
        groupHtml+= `
                    <div class="prices-group-content-item" id="body-service" onclick="openDialog(${service['service-id']})">
                      <div class="prices-group-content-item-name">${service.name}</div>
                      <div class="prices-group-content-item-price">${service.price} ₽</div>
                    </div>`;
      })
      groupHtml+= `
                </div>
      </div>
      `;
      result += groupHtml;
    });

    pricesContent.innerHTML=result;
  }).catch(error => {
    console.error(error)
  })
}

function openDialog(serviceId) {
  GetUrl(`price/${serviceId}`).then(data => {
    pricesDialogTitle.innerText = data.name;
    pricesDialogDescription.innerText = data.description;
    pricesDialogPrice.innerText = data.price + " ₽";

    let plusesHtml = `
          <div class="pluses-group-title">Что входит в стоимость</div>
    `;

    data.pluses.split(".").forEach(plus => {
      plusesHtml += `
          <div class="plus-price-group">
            <img class="prices-dialog-content-plus" src="../img/point-plus.png"/>
            <div class="prices-dialog-content-text">${plus}</div>
          </div>
      `;
    });
    pricesDialogPluses.innerHTML = plusesHtml;
  }).catch(error => console.error(error));
  pricesDialog.show();
}

function GetCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function GetUrl(getUrl) {
  return fetch(url + getUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}
