const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

let doctorsForm = document.getElementById("doctors-form");
let doctors = document.getElementById("doctors-body");
var doctorSelector = doctorsForm.selector;
let goToTop = document.getElementById("goToTop");
let doctorsDialogTitle = document.getElementById("doctors-dialog-title");
let doctorsDialogDescription = document.getElementById("doctors-dialog-description");
let doctorsDialogPluses = document.getElementById("doctors-dialog-pluses");

getDoctors();

var doctorsDialog = document.querySelector('#doctorsDialog');
document.querySelector('#doctorsDialogClose').onclick = function() {
  doctorsDialog.close();
  doctorsDialogTitle.innerText = ''
  doctorsDialogDescription.innerText = 'Упс. Что-то пошло не так...';
  doctorsDialogPluses.innerHTML = ``;
}
doctorSelector.addEventListener("change", findDoctors);

let doctorsValue = [];
let filteredDoctorsValue = [];
let doctorContentArray = [];

goToTop.addEventListener("click", (e) => {
  topFunction();
})

window.onscroll = function() {scrollFunction()};

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

function getDoctors() {
  GetUrl("doctors").then((data) => {
    doctorsValue = data;
    filteredDoctorsValue = doctorsValue;
    updateDoctors();
  }).catch((error) => console.log(error))
}


function updateDoctors() {
  let counter = 0;
  let doctorContent = document.createElement('div');
  doctorContent.classList.add("doctors-content");

  doctorContentArray.forEach((doctorContentForRemove) => doctors.removeChild(doctorContentForRemove));
  doctorContentArray = [];

  filteredDoctorsValue
    .forEach((doctorInfo) => {
      if (counter < 4) {
        doctorContent.appendChild(createDoctorCard(doctorInfo));
        counter++;
      } else {
        counter = 0;
        doctors.appendChild(doctorContent);
        doctorContentArray.push(doctorContent);

        doctorContent = document.createElement('div');
        doctorContent.classList.add("doctors-content");

        doctorContent.appendChild(createDoctorCard(doctorInfo));
        counter++;
      }
    })
  doctors.appendChild(doctorContent);
  doctorContentArray.push(doctorContent);
}

function createDoctorCard(doctorInfo) {
  let doctorCard = document.createElement('div');
  doctorCard.classList.add("doctor-card");

  let doctorAvatar = document.createElement('div');
  doctorAvatar.classList.add("doctor-avatar");

  let doctorName = document.createElement('div');
  doctorName.classList.add("doctor-name");
  doctorName.innerText = doctorInfo.name;

  let doctorSpec = document.createElement('div');
  doctorSpec.classList.add("doctor-spec");
  doctorSpec.innerText = doctorInfo.specialization;

  let img = document.createElement('img');
  img.classList.add("doctor-image");
  img.src = doctorInfo.photo;
  doctorAvatar.appendChild(img);

  doctorCard.appendChild(doctorAvatar);
  doctorCard.appendChild(doctorName);
  doctorCard.appendChild(doctorSpec);
  doctorCard.addEventListener("click", (e) => {
    openDialog(doctorInfo.id);
  })

  return doctorCard
}

function findDoctors() {
  var selectedOption = doctorSelector.options[doctorSelector.selectedIndex].value;
  console.log(selectedOption);
  filteredDoctorsValue = [];
  doctorsValue
    .filter((doctorInfo) => doctorInfo.specialization.includes(selectedOption) || doctorSelector.selectedIndex === 0)
    .forEach((doctor) => filteredDoctorsValue.push(doctor));
  updateDoctors();
}

function openDialog(doctorId) {
  GetUrl(`doctor/${doctorId}`).then(data => {
    doctorsDialogTitle.innerText = data.name;
    doctorsDialogDescription.innerText = data.description;

    let plusesHtml = `
          <div class="pluses-group-title">${data.name} владеет следующими профессиональными навыками:</div>
    `;

    data.pluses.split(".").forEach(plus => {
      plusesHtml += `
          <div class="plus-price-group">
            <img class="doctors-dialog-content-plus" src="../img/point-plus.png"/>
            <div class="doctors-dialog-content-text">${plus}</div>
          </div>
      `;
    });
    doctorsDialogPluses.innerHTML = plusesHtml;
  }).catch(error => console.error(error));
  doctorsDialog.show();
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
