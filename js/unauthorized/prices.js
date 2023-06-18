const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
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
    data.forEach(priceGroup =>  {
      var resultPriceGroup = document.createElement('div');
      resultPriceGroup.classList.add("prices-group");

      var priceGroupTitle = document.createElement('div');
      priceGroupTitle.classList.add("prices-group-title");
      priceGroupTitle.innerText = priceGroup.group;

      var priceGroupContent = document.createElement('div');
      priceGroupContent.classList.add("prices-group-content");

      resultPriceGroup.appendChild(priceGroupTitle);

      priceGroup.services.forEach(service => {
        var priceGroupContentItem = document.createElement('div');
        priceGroupContentItem.classList.add("prices-group-content-item");
        priceGroupContentItem.addEventListener("click", (e) => {openDialog(service['service-id'])})

        var priceGroupContentItemName = document.createElement('div');
        priceGroupContentItemName.classList.add("prices-group-content-item-name");
        priceGroupContentItemName.innerText = service.name;

        var priceGroupContentItemPrice = document.createElement('div');
        priceGroupContentItemPrice.classList.add("prices-group-content-item-price");
        priceGroupContentItemPrice.innerText = service.price + ' ₽';

        priceGroupContentItem.appendChild(priceGroupContentItemName);
        priceGroupContentItem.appendChild(priceGroupContentItemPrice);

        priceGroupContent.appendChild(priceGroupContentItem);
      });

      resultPriceGroup.appendChild(priceGroupContent);
      pricesContent.appendChild(resultPriceGroup);
    });
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
