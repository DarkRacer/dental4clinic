import { get } from "../rest.js";

const doctorsForm = document.getElementById("doctors-form");
const doctors = document.getElementById("doctors-body");
const doctorSelector = doctorsForm.selector;
const goToTop = document.getElementById("goToTop");
const doctorsDialogTitle = document.getElementById("doctors-dialog-title");
const doctorsDialogDescription = document.getElementById("doctors-dialog-description");
const doctorsDialogPluses = document.getElementById("doctors-dialog-pluses");
const doctorsDialog = document.querySelector('#doctorsDialog');

let currentDoctor = {};
let doctorsValue = [];
let filteredDoctorsValue = [];
let doctorContentArray = [];

const initDoctors = () => {
  getDoctors();

  document.querySelector('#doctorsDialogClose').onclick = () => {
    doctorsDialog.style.display = null;
    doctorsDialog.close();
    doctorsDialogTitle.innerText = ''
    doctorsDialogDescription.innerText = 'Упс. Что-то пошло не так...';
    doctorsDialogPluses.innerHTML = ``;
  }
  doctorSelector.addEventListener("change", findDoctors);

  goToTop.addEventListener("click", (e) => {
    topFunction();
  })

  window.onscroll = () => scrollFunction();
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

const getDoctors = () => {
  get("doctors").then((data) => {
    doctorsValue = data;
    filteredDoctorsValue = doctorsValue;
    updateDoctors();
  }).catch((error) => console.log(error))
}

const updateDoctors = () => {
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

const createDoctorCard = (doctorInfo) => {
  const doctorCard = document.createElement('div');
  doctorCard.classList.add("doctor-card");

  const doctorAvatar = document.createElement('div');
  doctorAvatar.classList.add("doctor-avatar");

  const doctorName = document.createElement('div');
  doctorName.classList.add("doctor-name");
  doctorName.innerText = doctorInfo.name;

  const doctorSpec = document.createElement('div');
  doctorSpec.classList.add("doctor-spec");
  doctorSpec.innerText = doctorInfo.specialization;

  const img = document.createElement('img');
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

const findDoctors = () => {
  const selectedOption = doctorSelector.options[doctorSelector.selectedIndex].value;
  filteredDoctorsValue = [];
  doctorsValue
    .filter((doctorInfo) => doctorInfo.specialization.includes(selectedOption) || doctorSelector.selectedIndex === 0)
    .forEach((doctor) => filteredDoctorsValue.push(doctor));
  updateDoctors();
}

const openDialog = (doctorId) => {
  get(`doctor/${doctorId}`).then(data => {
    currentDoctor = data
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
  doctorsDialog.style.display = 'flex';
  doctorsDialog.show();
}

const updateDoctorsValue = (data) => {
  doctorsValue = data;
  filteredDoctorsValue = doctorsValue
}

export { initDoctors, updateDoctors, updateDoctorsValue, doctorsDialog, currentDoctor }
