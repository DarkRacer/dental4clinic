const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}


getPrices()

var pricesDialog = document.querySelector('#pricesDialog');
// document.querySelector('#openPricesDialog').onclick = function() {
//   pricesDialog.show();
// }
document.querySelector('#pricesDialogClose').onclick = function() {
  pricesDialog.close();
}


let goToTop = document.getElementById("goToTop");
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

function openDialog(serviceId) {
  console.log(serviceId)
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


let pricesContent = document.getElementById("pricesContent");

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
    console.log(error)
  })
}


function GetCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function GetUrl(getUrl) {
  console.log("get " + getUrl);
  return fetch(url + getUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

function PostUrl(postUrl, body) {
  console.log("get " + postUrl);
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response.json())
}
