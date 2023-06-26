import { get } from "../rest.js";

const goToTop = document.getElementById("goToTop");
const pricesDialogTitle = document.getElementById("pricesDialogTitle");
const pricesDialogDescription = document.getElementById("pricesDialogDescription");
const pricesDialogPluses = document.getElementById("pricesDialogPluses");
const pricesDialogPrice = document.getElementById("pricesDialogPrice");
const pricesContent = document.getElementById("pricesContent");
const pricesDialog = document.querySelector('#pricesDialog');
let currentPrice = {};


const initPrices = () => {
  getPrices();

  document.querySelector('#pricesDialogClose').onclick = () => {
    pricesDialog.style.display = null;
    pricesDialog.close();
    pricesDialogTitle.innerText = ''
    pricesDialogDescription.innerText = 'Упс. Что-то пошло не так...';
    pricesDialogPluses.innerHTML = ``;
    pricesDialogPrice.innerText = ``;
  }

  window.onscroll = () => scrollFunction();

  goToTop.addEventListener("click", (e) => {
    topFunction();
  })
}

const scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTop.style.display = "block";
  } else {
    goToTop.style.display = "none";
  }
}
const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const getPrices = () => {
  get('prices').then(data => {
    cretePriceContent(data)
  }).catch(error => {
    console.error(error)
  })
}

const cretePriceContent = (data) => {
  while (pricesContent.firstChild) {
    pricesContent.removeChild(pricesContent.lastChild);
  }
  data.forEach(priceGroup =>  {
    const resultPriceGroup = document.createElement('div');
    resultPriceGroup.classList.add("prices-group");

    const priceGroupTitle = document.createElement('div');
    priceGroupTitle.classList.add("prices-group-title");
    priceGroupTitle.innerText = priceGroup.group;

    const priceGroupContent = document.createElement('div');
    priceGroupContent.classList.add("prices-group-content");

    resultPriceGroup.appendChild(priceGroupTitle);

    priceGroup.services.forEach(service => {
      const priceGroupContentItem = document.createElement('div');
      priceGroupContentItem.classList.add("prices-group-content-item");
      priceGroupContentItem.addEventListener("click", (e) => {openDialog(service['service-id'])})

      const priceGroupContentItemName = document.createElement('div');
      priceGroupContentItemName.classList.add("prices-group-content-item-name");
      priceGroupContentItemName.innerText = service.name;

      const priceGroupContentItemPrice = document.createElement('div');
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

const openDialog = (serviceId) => {
  get(`price/${serviceId}`).then(data => {
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
  pricesDialog.style.display = 'flex';
  pricesDialog.show();
}

export { initPrices, pricesDialog, cretePriceContent, currentPrice }
