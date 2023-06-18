const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

let goToTop = document.getElementById("goToTop");
let pricesDialogTitle = document.getElementById("pricesDialogTitle");
let pricesDialogDescription = document.getElementById("pricesDialogDescription");
let pricesDialogPluses = document.getElementById("pricesDialogPluses");
let pricesDialogPrice = document.getElementById("pricesDialogPrice");
let pricesContent = document.getElementById("pricesContent");
let createForm = document.getElementById("create-form");
let editForm = document.getElementById("edit-form");
let editPriceDialogSave = document.getElementById("editPriceDialogSave");
var pricesDialog = document.querySelector('#pricesDialog');

let currentPrice = {};

getPrices()

var createPriceDialog = document.querySelector('#createPriceDialog');
document.querySelector('#openCreatePriceDialog').onclick = function() {
  createPriceDialog.show();
}
document.querySelector('#createPriceDialogClose').onclick = function() {
  createPriceDialog.close();
}
document.querySelector('#createPriceDialogSave').onclick = function() {
  const createPriceBody = {
    name: createForm.name.value,
    cost: createForm.cost.value,
    description: createForm.description.value,
    pluses: createForm.pluses.value
  }
  PostUrl('price/create', createPriceBody).then((data) => {
    cretePriceContent(data);
    createPriceDialog.close();
  }).catch((error) => console.error(error))
}

document.querySelector('#pricesDialogClose').onclick = function() {
  pricesDialog.close();
  pricesDialogTitle.innerText = ''
  pricesDialogDescription.innerText = 'Упс. Что-то пошло не так...';
  pricesDialogPluses.innerHTML = ``;
  pricesDialogPrice.innerText = ``;
}

var editPriceDialog = document.querySelector('#editPriceDialog');
document.querySelector('#openEditPriceDialog').onclick = function() {
  pricesDialog.close();
  editForm.nameEdit.value = currentPrice.name
  editForm.costEdit.value = currentPrice.price
  editForm.descriptionEdit.value = currentPrice.description
  editForm.plusesEdit.value = currentPrice.pluses
  editPriceDialog.show();
}
document.querySelector('#editPriceDialogClose').onclick = function() {
  editPriceDialog.close();
}
document.querySelector('#editPriceDialogSave').onclick = function() {
  const editPriceBody = {
    name: editForm.nameEdit.value,
    cost: editForm.costEdit.value,
    description: editForm.descriptionEdit.value,
    pluses: editForm.plusesEdit.value
  }
  PostUrl('price/edit', editPriceBody).then((data) => {
    cretePriceContent(data);
    createPriceDialog.close();
  }).catch((error) => console.error(error))
  editPriceDialog.close();
}

var deletePriceDialog = document.querySelector('#deletePriceDialog');
document.querySelector('#openDeletePriceDialog').onclick = function() {
  pricesDialog.close();
  deletePriceDialog.show();
}
document.querySelector('#deletePriceDialogClose').onclick = function() {
  PostUrl('price/delete', currentPrice).then((data) => {
    cretePriceContent(data);
    createPriceDialog.close();
  }).catch((error) => console.error(error))
  deletePriceDialog.close();
}
document.querySelector('#backButtonDeletePriceDialogClose').onclick = function() {
  deletePriceDialog.close();
  pricesDialog.show();
}


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
    cretePriceContent(data)
  }).catch(error => {
    console.error(error)
  })
}

function cretePriceContent(data) {
  while (pricesContent.firstChild) {
    pricesContent.removeChild(pricesContent.lastChild);
  }
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
}

function openDialog(serviceId) {
  GetUrl(`price/${serviceId}`).then(data => {
    currentPrice = data
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
function PostUrl(postUrl, body) {
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}
