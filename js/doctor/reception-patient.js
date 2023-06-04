const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}
var userId = 2;


let left8Up = document.getElementById("left8Up");
let left8Down = document.getElementById("left8Down");
let right1Up = document.getElementById("right1Up");
let right1Down = document.getElementById("right1Down");
let left7Up = document.getElementById("left7Up");
let left7Down = document.getElementById("left7Down");
let right2Up = document.getElementById("right2Up");
let right2Down = document.getElementById("right2Down");
let left6Up = document.getElementById("left6Up");
let left6Down = document.getElementById("left6Down");
let right3Up = document.getElementById("right3Up");
let right3Down = document.getElementById("right3Down");
let left5Up = document.getElementById("left5Up");
let left5Down = document.getElementById("left5Down");
let right4Up = document.getElementById("right4Up");
let right4Down = document.getElementById("right4Down");
let left4Up = document.getElementById("left4Up");
let left4Down = document.getElementById("left4Down");
let right5Up = document.getElementById("right5Up");
let right5Down = document.getElementById("right5Down");
let left3Up = document.getElementById("left3Up");
let left3Down = document.getElementById("left3Down");
let right6Up = document.getElementById("right6Up");
let right6Down = document.getElementById("right6Down");
let left2Up = document.getElementById("left2Up");
let left2Down = document.getElementById("left2Down");
let right7Up = document.getElementById("right7Up");
let right7Down = document.getElementById("right7Down");
let left1Up = document.getElementById("left1Up");
let left1Down = document.getElementById("left1Down");
let right8Up = document.getElementById("right8Up");
let right8Down = document.getElementById("right8Down");


let firstRequestCell1 = document.getElementById("first-request-cell1");
let firstRequestCell2 = document.getElementById("first-request-cell2");
let secondRequestCell1 = document.getElementById("second-request-cell1");
let secondRequestCell2 = document.getElementById("second-request-cell2");
let thirdRequestCell1 = document.getElementById("third-request-cell1");
let thirdRequestCell2 = document.getElementById("third-request-cell2");

let toothPictures = document.getElementById("toothPictures");


let nameField = document.getElementById("name");
let dateOfBirthdayField = document.getElementById("dateOfBirthday");
let phoneField = document.getElementById("phone");
let eMailField = document.getElementById("e-mail");
let allergiesField = document.getElementById("allergies");
let dataAppointment = {};
let toothCard = {};


getAppointment()


function getAppointment() {
  let query = window.location.href.split('/');
  let appointmentId = query[query.length - 1]
  GetUrl(`appointments/${appointmentId}`).then((data) => {
    dataAppointment = data;
    getUserInfo(dataAppointment['user-id'])
    getRequests(dataAppointment['user-id'])
    getUserToothCard(dataAppointment['user-id'])
    getToothPictures(dataAppointment['user-id'])
  }).catch((error) => {
    console.error(error)
    createCalendar(date.getMonth(), date.getFullYear())
  })
}

function getUserInfo(patientId) {
  GetUrl(`user/${patientId}`).then(data => {
    nameField.innerText = data['full-name'];
    dateOfBirthdayField.innerText = data.dateOfBirthday
    phoneField.innerText = data.phone
    eMailField.innerText = data['e-mail']
    allergiesField.innerText = data.allergies
  }).catch(error => console.error(error));
}

function getRequests(patientId) {
  GetUrl(`user/requests/${patientId}`).then(data => {
    firstRequestCell1.innerText = data[0] ? data[0].date : '';
    firstRequestCell2.innerText = data[0] ? data[0].description : '';
    secondRequestCell1.innerText = data[1] ? data[1].date : '';
    secondRequestCell2.innerText = data[1] ? data[1].description : '';
    thirdRequestCell1.innerText = data[2] ? data[2].date : '';
    thirdRequestCell2.innerText = data[2] ? data[2].description : '';
  }).catch(error => console.error(error));
}

function getUserToothCard(patientId) {
  GetUrl(`user/tooth-card/${patientId}`).then((data) => {
    toothCard = data;
    updateToothCard();
  }).catch(error => console.error(error));
}

function getToothPictures(patientId) {
  GetUrl(`user/tooth/${patientId}`).then(data => {
    data.forEach((picture) => {
      let img = document.createElement('img');
      img.classList.add("tooth-picture");
      img.src = picture.data;
      toothPictures.appendChild(img);
    })
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}

var toothPictureDialog = document.querySelector('#toothPicture');
document.querySelector('#openToothPicture').onclick = function() {
  toothPictureDialog.show();
}
document.querySelector('#toothPictureClose').onclick = function() {
  toothPictureDialog.close();
}

var diagnosisDialog = document.querySelector('#diagnosisDialog');
document.querySelector('#openDiagnosisDialog').onclick = function() {
  diagnosisDialog.show();
}
document.querySelector('#diagnosisDialogClose').onclick = function() {
  diagnosisDialog.close();
}


var paymentsDialog = document.querySelector('#paymentsDialog');
document.querySelector('#openPaymentsDialog').onclick = function() {
  paymentsDialog.show();
}
document.querySelector('#paymentsDialogClose').onclick = function() {
  paymentsDialog.close();
}
left8Up.addEventListener("change", (e) => {
  toothCard.left8Up = left8Up.selectedIndex
});
left8Down.addEventListener("change", (e) => {
  toothCard.left8Down = left8Down.selectedIndex
});
right1Up.addEventListener("change", (e) => {
  toothCard.right1Up = right1Up.selectedIndex
});
right1Down.addEventListener("change", (e) => {
  toothCard.right1Down = right1Down.selectedIndex
});
left7Up.addEventListener("change", (e) => {
  toothCard.left7Up = left7Up.selectedIndex
});
left7Down.addEventListener("change", (e) => {
  toothCard.left7Down = left7Down.selectedIndex
});
right2Up.addEventListener("change", (e) => {
  toothCard.right2Up = right2Up.selectedIndex
});
right2Down.addEventListener("change", (e) => {
  toothCard.right2Down = right2Down.selectedIndex
});
left6Up.addEventListener("change", (e) => {
  toothCard.left6Up = left6Up.selectedIndex
});
left6Down.addEventListener("change", (e) => {
  toothCard.left6Down = left6Down.selectedIndex
});
right3Up.addEventListener("change", (e) => {
  toothCard.right3Up = right3Up.selectedIndex
});
right3Down.addEventListener("change", (e) => {
  toothCard.right3Down = right3Down.selectedIndex
});
left5Up.addEventListener("change", (e) => {
  toothCard.left5Up = left5Up.selectedIndex
});
left5Down.addEventListener("change", (e) => {
  toothCard.left5Down = left5Down.selectedIndex
});
right4Up.addEventListener("change", (e) => {
  toothCard.right4Up = right4Up.selectedIndex
});
right4Down.addEventListener("change", (e) => {
  toothCard.right4Down = right4Down.selectedIndex
});
left4Up.addEventListener("change", (e) => {
  toothCard.left4Up = left4Up.selectedIndex
});
left4Down.addEventListener("change", (e) => {
  toothCard.left4Down = left4Down.selectedIndex
});
right5Up.addEventListener("change", (e) => {
  toothCard.right5Up = right5Up.selectedIndex
});
right5Down.addEventListener("change", (e) => {
  toothCard.right5Down = right5Down.selectedIndex
});
left3Up.addEventListener("change", (e) => {
  toothCard.left3Up = left3Up.selectedIndex
});
left3Down.addEventListener("change", (e) => {
  toothCard.left3Down = left3Down.selectedIndex
});
right6Up.addEventListener("change", (e) => {
  toothCard.right6Up = right6Up.selectedIndex
});
right6Down.addEventListener("change", (e) => {
  toothCard.right6Down = right6Down.selectedIndex
});
left2Up.addEventListener("change", (e) => {
  toothCard.left2Up = left2Up.selectedIndex
});
left2Down.addEventListener("change", (e) => {
  toothCard.left2Down = left2Down.selectedIndex
});
right7Up.addEventListener("change", (e) => {
  toothCard.right7Up = right7Up.selectedIndex
});
right7Down.addEventListener("change", (e) => {
  toothCard.right7Down = right7Down.selectedIndex
});
left1Up.addEventListener("change", (e) => {
  toothCard.left1Up = left1Up.selectedIndex
});
left1Down.addEventListener("change", (e) => {
  toothCard.left1Down = left1Down.selectedIndex
});
right8Up.addEventListener("change", (e) => {
  toothCard.right8Up = right8Up.selectedIndex
});
right8Down.addEventListener("change", (e) => {
  toothCard.right8Down = right8Down.selectedIndex
});


function updateToothCard() {
  left8Up.selectedIndex = toothCard.left8Up;
  left8Down.selectedIndex = toothCard.left8Down;
  right1Up.selectedIndex = toothCard.right1Up;
  right1Down.selectedIndex = toothCard.right1Down;
  left7Up.selectedIndex = toothCard.left7Up;
  left7Down.selectedIndex = toothCard.left7Down;
  right2Up.selectedIndex = toothCard.right2Up;
  right2Down.selectedIndex = toothCard.right2Down;
  left6Up.selectedIndex = toothCard.left6Up;
  left6Down.selectedIndex = toothCard.left6Down;
  right3Up.selectedIndex = toothCard.right3Up;
  right3Down.selectedIndex = toothCard.right3Down;
  left5Up.selectedIndex = toothCard.left5Up;
  left5Down.selectedIndex = toothCard.left5Down;
  right4Up.selectedIndex = toothCard.right4Up;
  right4Down.selectedIndex = toothCard.right4Down;
  left4Up.selectedIndex = toothCard.left4Up;
  left4Down.selectedIndex = toothCard.left4Down;
  right5Up.selectedIndex = toothCard.right5Up;
  right5Down.selectedIndex = toothCard.right5Down;
  left3Up.selectedIndex = toothCard.left3Up;
  left3Down.selectedIndex = toothCard.left3Down;
  right6Up.selectedIndex = toothCard.right6Up;
  right6Down.selectedIndex = toothCard.right6Down;
  left2Up.selectedIndex = toothCard.left2Up;
  left2Down.selectedIndex = toothCard.left2Down;
  right7Up.selectedIndex = toothCard.right7Up;
  right7Down.selectedIndex = toothCard.right7Down;
  left1Up.selectedIndex = toothCard.left1Up;
  left1Down.selectedIndex = toothCard.left1Down;
  right8Up.selectedIndex = toothCard.right8Up;
  right8Down.selectedIndex = toothCard.right8Down;
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
    .then(response => response)
}
