const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}

var doctorId = 1;

let firstRowDoctor = document.getElementById("firstRowDoctor");
let firstRowDoctorCell1 = document.getElementById("firstRowDoctorCell1");
let firstRowDoctorName = document.getElementById("firstRowDoctorName");
let firstRowDoctorCell2 = document.getElementById("firstRowDoctorCell2");
let firstRowDoctorDescription = document.getElementById("firstRowDoctorDescription");
let firstRowDoctorCell3 = document.getElementById("firstRowDoctorCell3");
let firstRowDoctorPrice = document.getElementById("firstRowDoctorPrice");

let secondRowDoctor = document.getElementById("secondRowDoctor");
let secondRowDoctorCell1 = document.getElementById("secondRowDoctorCell1");
let secondRowDoctorName = document.getElementById("secondRowDoctorName");
let secondRowDoctorCell2 = document.getElementById("secondRowDoctorCell2");
let secondRowDoctorDescription = document.getElementById("secondRowDoctorDescription");
let secondRowDoctorCell3 = document.getElementById("secondRowDoctorCell3");
let secondRowDoctorPrice = document.getElementById("secondRowDoctorPrice");

let thirdRowDoctor = document.getElementById("thirdRowDoctor");
let thirdRowDoctorCell1 = document.getElementById("thirdRowDoctorCell1");
let thirdRowDoctorName = document.getElementById("thirdRowDoctorName");
let thirdRowDoctorCell2 = document.getElementById("thirdRowDoctorCell2");
let thirdRowDoctorDescription = document.getElementById("thirdRowDoctorDescription");
let thirdRowDoctorCell3 = document.getElementById("thirdRowDoctorCell3");
let thirdRowDoctorPrice = document.getElementById("thirdRowDoctorPrice");

let fourthRowDoctor = document.getElementById("fourthRowDoctor");
let fourthRowDoctorCell1 = document.getElementById("fourthRowDoctorCell1");
let fourthRowDoctorName = document.getElementById("fourthRowDoctorName");
let fourthRowDoctorCell2 = document.getElementById("fourthRowDoctorCell2");
let fourthRowDoctorDescription = document.getElementById("fourthRowDoctorDescription");
let fourthRowDoctorCell3 = document.getElementById("fourthRowDoctorCell3");
let fourthRowDoctorPrice = document.getElementById("fourthRowDoctorPrice");


let firstRowAll = document.getElementById("firstRowAll");
let firstRowAllCell1 = document.getElementById("firstRowAllCell1");
let firstRowAllName = document.getElementById("firstRowAllName");
let firstRowAllCell2 = document.getElementById("firstRowAllCell2");
let firstRowAllDescription = document.getElementById("firstRowAllDescription");
let firstRowAllCell3 = document.getElementById("firstRowAllCell3");
let firstRowAllPrice = document.getElementById("firstRowAllPrice");

let secondRowAll = document.getElementById("secondRowAll");
let secondRowAllCell1 = document.getElementById("secondRowAllCell1");
let secondRowAllName = document.getElementById("secondRowAllName");
let secondRowAllCell2 = document.getElementById("secondRowAllCell2");
let secondRowAllDescription = document.getElementById("secondRowAllDescription");
let secondRowAllCell3 = document.getElementById("secondRowAllCell3");
let secondRowAllPrice = document.getElementById("secondRowAllPrice");

let thirdRowAll = document.getElementById("thirdRowAll");
let thirdRowAllCell1 = document.getElementById("thirdRowAllCell1");
let thirdRowAllName = document.getElementById("thirdRowAllName");
let thirdRowAllCell2 = document.getElementById("thirdRowAllCell2");
let thirdRowAllDescription = document.getElementById("thirdRowAllDescription");
let thirdRowAllCell3 = document.getElementById("thirdRowAllCell3");
let thirdRowAllPrice = document.getElementById("thirdRowAllPrice");

let fourthRowAll = document.getElementById("fourthRowAll");
let fourthRowAllCell1 = document.getElementById("fourthRowAllCell1");
let fourthRowAllName = document.getElementById("fourthRowAllName");
let fourthRowAllCell2 = document.getElementById("fourthRowAllCell2");
let fourthRowAllDescription = document.getElementById("fourthRowAllDescription");
let fourthRowAllCell3 = document.getElementById("fourthRowAllCell3");
let fourthRowAllPrice = document.getElementById("fourthRowAllPrice");


let deleteButton = document.getElementById("deleteButton");
let addButton = document.getElementById("addButton");

let doctorsForm = document.getElementById("doctors-form");
let doctors = document.getElementById("doctors-body");
var doctorSelector = doctorsForm.selector;
let goToTop = document.getElementById("goToTop");
let doctorsDialogTitle = document.getElementById("doctors-dialog-title");
let doctorsDialogDescription = document.getElementById("doctors-dialog-description");
let doctorsDialogPluses = document.getElementById("doctors-dialog-pluses");
let createForm = document.getElementById("create-form");
let editForm = document.getElementById("edit-form");
let doctorNameServices = document.getElementById("doctorNameServices");

let imageString ='';

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
let currentDoctor = {};

let doctorServiceTableValue = [];
let servicesTableValue = [];

let selectedRowDoctorService = -1;
let selectedRowServices = -1;

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

var createDoctorDialog = document.querySelector('#createDoctorDialog');
document.querySelector('#openCreateDoctorDialog').onclick = function() {
  createDoctorDialog.show();
}
document.querySelector('#createDoctorDialogClose').onclick = function() {
  createDoctorDialog.close();
}
document.querySelector('#createDoctorDialogSave').onclick = function() {
  const createDoctorBody = {
    name: createForm.name.value,
    surname: createForm.surname.value,
    patronymic: createForm.patronymic.value,
    specialization: createForm.spec.options[createForm.spec.selectedIndex].value,
    photo: imageString,
    description: createForm.description.value,
    pluses: createForm.pluses.value
  }
  PostUrl('doctor/create', createDoctorBody).then((data) => {
    doctorsValue = data;
    filteredDoctorsValue = doctorsValue;
    updateDoctors();
    imageString = '';
    createDoctorDialog.close();
  }).catch((error) => {
    imageString = '';
    console.error(error)
  })
}

var editDoctorDialog = document.querySelector('#editDoctorDialog');
document.querySelector('#openEditDoctorDialog').onclick = function() {
  doctorsDialog.close();
  editForm.nameEdit.value = currentDoctor['part-name']
  editForm.surnameEdit.value = currentDoctor.surname
  editForm.patronymicEdit.value = currentDoctor.patronymic
  editForm.descriptionEdit.value = currentDoctor.description
  editForm.plusesEdit.value = currentDoctor.pluses
  editDoctorDialog.show();
}
document.querySelector('#editDoctorDialogClose').onclick = function() {
  editDoctorDialog.close();
  doctorsDialog.show();
}
document.querySelector('#editDoctorDialogSave').onclick = function() {
  const editDoctorBody = {
    name: editForm.nameEdit.value,
    surname: editForm.surnameEdit.value,
    patronymic: editForm.patronymicEdit.value,
    specialization: editForm.specEdit.options[editForm.specEdit.selectedIndex].value,
    photo: imageString,
    description: editForm.descriptionEdit.value,
    pluses: editForm.plusesEdit.value
  }
  PostUrl('doctor/edit', editDoctorBody).then((data) => {
    doctorsValue = data;
    filteredDoctorsValue = doctorsValue;
    updateDoctors();
    imageString = '';
    editDoctorDialog.close();
  }).catch((error) => {
    imageString = '';
    console.error(error)
  })

}

var deleteDoctorDialog = document.querySelector('#deleteDoctorDialog');
document.querySelector('#openDeleteDoctorDialog').onclick = function() {
  doctorsDialog.close();
  deleteDoctorDialog.show();
}
document.querySelector('#backButtonDeleteDoctorDialogClose').onclick = function() {
  deleteDoctorDialog.close();
  doctorsDialog.show();
}
document.querySelector('#deleteDoctorDialogClose').onclick = function() {
  PostUrl('doctor/delete', currentDoctor).then((data) => {
    doctorsValue = data;
    filteredDoctorsValue = doctorsValue;
    updateDoctors();
    deleteDoctorDialog.close();
  }).catch((error) => console.error(error))
}

var servicesDoctorDialog = document.querySelector('#servicesDoctorDialog');
document.querySelector('#openCreateServicesDoctorDialog').onclick = function() {
  doctorNameServices.innerText = `${createForm.surname.value} ${createForm.name.value} ${createForm.patronymic.value}`
  getServicesForDoctor()
  getServices()
  servicesDoctorDialog.show();
}
document.querySelector('#openEditServicesDoctorDialog').onclick = function() {
  doctorNameServices.innerText = `${editForm.surnameEdit.value} ${editForm.nameEdit.value} ${editForm.patronymicEdit.value}`
  getServicesForDoctor()
  getServices()
  servicesDoctorDialog.show();
}
document.querySelector('#openServicesDoctorDialog').onclick = function() {
  doctorNameServices.innerText = `${currentDoctor.name}`
  getServicesForDoctor()
  getServices()
  servicesDoctorDialog.show();
}
document.querySelector('#servicesDoctorDialogClose').onclick = function() {
  servicesDoctorDialog.close();
}

deleteButton.addEventListener("click", (e) => {
  if (selectedRowDoctorService > -1) {
    PostUrl(`services/doctor/delete/${doctorId}`, doctorServiceTableValue[selectedRowDoctorService]).then((data) => {
      doctorServiceTableValue = data;
      updateDoctorServices();
    }).catch((error) => {
      console.error(error)
    })
  }
});

addButton.addEventListener("click", (e) => {
  if (selectedRowServices > -1) {
    PostUrl(`services/doctor/add/${doctorId}`, servicesTableValue[selectedRowServices]).then((data) => {
      doctorServiceTableValue = data;
      updateDoctorServices();
    }).catch((error) => {
      console.error(error)
    })
  }
})


function getServicesForDoctor() {
  GetUrl(`services/doctor/${doctorId}`).then((data) => {
    doctorServiceTableValue = data;
    updateDoctorServices();
  }).catch((error) => console.log(error))
}

function getServices() {
  GetUrl("services/all").then((data) => {
    servicesTableValue = data;
    updateServices();
  }).catch((error) => console.log(error))
}

function updateDoctorServices() {
  if (doctorServiceTableValue[0]) {
    firstRowDoctorName.textContent = doctorServiceTableValue[0].service
    firstRowDoctorDescription.textContent = doctorServiceTableValue[0].description
    firstRowDoctorPrice.textContent = doctorServiceTableValue[0].price
  } else {
    firstRowDoctorName.textContent = ''
    firstRowDoctorDescription.textContent = ''
    firstRowDoctorPrice.textContent = ''
  }

  if (doctorServiceTableValue[1]) {
    secondRowDoctorName.textContent = doctorServiceTableValue[1].service
    secondRowDoctorDescription.textContent = doctorServiceTableValue[1].description
    secondRowDoctorPrice.textContent = doctorServiceTableValue[1].price
  } else {
    secondRowDoctorName.textContent = ''
    secondRowDoctorDescription.textContent = ''
    secondRowDoctorPrice.textContent = ''
  }

  if (doctorServiceTableValue[2]) {
    thirdRowDoctorName.textContent = doctorServiceTableValue[2].service
    thirdRowDoctorDescription.textContent = doctorServiceTableValue[2].description
    thirdRowDoctorPrice.textContent = doctorServiceTableValue[2].price
  } else {
    thirdRowDoctorName.textContent = ''
    thirdRowDoctorDescription.textContent = ''
    thirdRowDoctorPrice.textContent = ''
  }

  if (doctorServiceTableValue[1]) {
    fourthRowDoctorName.textContent = doctorServiceTableValue[3].service
    fourthRowDoctorDescription.textContent = doctorServiceTableValue[3].description
    fourthRowDoctorPrice.textContent = doctorServiceTableValue[3].price
  } else {
    fourthRowDoctorName.textContent = ''
    fourthRowDoctorDescription.textContent = ''
    fourthRowDoctorPrice.textContent = ''
  }
}

function updateServices() {
  if (servicesTableValue[0]) {
    firstRowAllName.textContent = servicesTableValue[0].service
    firstRowAllDescription.textContent = servicesTableValue[0].description
    firstRowAllPrice.textContent = servicesTableValue[0].price
  } else {
    firstRowAllName.textContent = ''
    firstRowAllDescription.textContent = ''
    firstRowAllPrice.textContent = ''
  }

  if (servicesTableValue[1]) {
    secondRowAllName.textContent = servicesTableValue[1].service
    secondRowAllDescription.textContent = servicesTableValue[1].description
    secondRowAllPrice.textContent = servicesTableValue[1].price
  } else {
    secondRowAllName.textContent = ''
    secondRowAllDescription.textContent = ''
    secondRowAllPrice.textContent = ''
  }

  if (servicesTableValue[2]) {
    thirdRowAllName.textContent = servicesTableValue[2].service
    thirdRowAllDescription.textContent = servicesTableValue[2].description
    thirdRowAllPrice.textContent = servicesTableValue[2].price
  } else {
    thirdRowAllName.textContent = ''
    thirdRowAllDescription.textContent = ''
    thirdRowAllPrice.textContent = ''
  }

  if (servicesTableValue[1]) {
    fourthRowAllName.textContent = servicesTableValue[3].service
    fourthRowAllDescription.textContent = servicesTableValue[3].description
    fourthRowAllPrice.textContent = servicesTableValue[3].price
  } else {
    fourthRowAllName.textContent = ''
    fourthRowAllDescription.textContent = ''
    fourthRowAllPrice.textContent = ''
  }
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
  filteredDoctorsValue = [];
  doctorsValue
    .filter((doctorInfo) => doctorInfo.specialization.includes(selectedOption) || doctorSelector.selectedIndex === 0)
    .forEach((doctor) => filteredDoctorsValue.push(doctor));
  updateDoctors();
}

function openDialog(doctorId) {
  GetUrl(`doctor/${doctorId}`).then(data => {
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
  doctorsDialog.show();
}

function imageUploaded() {
  var file = document.querySelector(
    'input[type=file]')['files'][0];

  var reader = new FileReader();

  reader.onload = function () {
    imageString = reader.result;
  }
  reader.readAsDataURL(file);
}


firstRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 0) {
    firstRowDoctorCell1.classList.remove("cell-services-of-patient")
    firstRowDoctorCell1.classList.add("cell-services-of-patient-selected")
    firstRowDoctorCell2.classList.remove("cell-services-of-patient")
    firstRowDoctorCell2.classList.add("cell-services-of-patient-selected")
    firstRowDoctorCell3.classList.remove("cell-services-of-patient")
    firstRowDoctorCell3.classList.add("cell-services-of-patient-selected")

    secondRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell1.classList.add("cell-services-of-patient")
    secondRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell2.classList.add("cell-services-of-patient")
    secondRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell3.classList.add("cell-services-of-patient")

    thirdRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell1.classList.add("cell-services-of-patient")
    thirdRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell2.classList.add("cell-services-of-patient")
    thirdRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell3.classList.add("cell-services-of-patient")

    fourthRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell1.classList.add("cell-services-of-patient")
    fourthRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell2.classList.add("cell-services-of-patient")
    fourthRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell3.classList.add("cell-services-of-patient")

    selectedRowDoctorService = 0;
  } else {
    firstRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell1.classList.add("cell-services-of-patient")
    firstRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell2.classList.add("cell-services-of-patient")
    firstRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell3.classList.add("cell-services-of-patient")
    selectedRowDoctorService = -1;
  }
})

secondRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 1) {
    secondRowDoctorCell1.classList.remove("cell-services-of-patient")
    secondRowDoctorCell1.classList.add("cell-services-of-patient-selected")
    secondRowDoctorCell2.classList.remove("cell-services-of-patient")
    secondRowDoctorCell2.classList.add("cell-services-of-patient-selected")
    secondRowDoctorCell3.classList.remove("cell-services-of-patient")
    secondRowDoctorCell3.classList.add("cell-services-of-patient-selected")

    firstRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell1.classList.add("cell-services-of-patient")
    firstRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell2.classList.add("cell-services-of-patient")
    firstRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell3.classList.add("cell-services-of-patient")

    thirdRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell1.classList.add("cell-services-of-patient")
    thirdRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell2.classList.add("cell-services-of-patient")
    thirdRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell3.classList.add("cell-services-of-patient")

    fourthRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell1.classList.add("cell-services-of-patient")
    fourthRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell2.classList.add("cell-services-of-patient")
    fourthRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell3.classList.add("cell-services-of-patient")

    selectedRowDoctorService = 1;
  } else {
    secondRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell1.classList.add("cell-services-of-patient")
    secondRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell2.classList.add("cell-services-of-patient")
    secondRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell3.classList.add("cell-services-of-patient")
    selectedRowDoctorService = -1;
  }
})

thirdRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 2) {
    thirdRowDoctorCell1.classList.remove("cell-services-of-patient")
    thirdRowDoctorCell1.classList.add("cell-services-of-patient-selected")
    thirdRowDoctorCell2.classList.remove("cell-services-of-patient")
    thirdRowDoctorCell2.classList.add("cell-services-of-patient-selected")
    thirdRowDoctorCell3.classList.remove("cell-services-of-patient")
    thirdRowDoctorCell3.classList.add("cell-services-of-patient-selected")

    firstRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell1.classList.add("cell-services-of-patient")
    firstRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell2.classList.add("cell-services-of-patient")
    firstRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell3.classList.add("cell-services-of-patient")

    secondRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell1.classList.add("cell-services-of-patient")
    secondRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell2.classList.add("cell-services-of-patient")
    secondRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell3.classList.add("cell-services-of-patient")

    fourthRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell1.classList.add("cell-services-of-patient")
    fourthRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell2.classList.add("cell-services-of-patient")
    fourthRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell3.classList.add("cell-services-of-patient")

    selectedRowDoctorService = 2;
  } else {
    thirdRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell1.classList.add("cell-services-of-patient")
    thirdRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell2.classList.add("cell-services-of-patient")
    thirdRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell3.classList.add("cell-services-of-patient")
    selectedRowDoctorService = -1;
  }
})

fourthRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 3) {
    fourthRowDoctorCell1.classList.remove("cell-services-of-patient")
    fourthRowDoctorCell1.classList.add("cell-services-of-patient-selected")
    fourthRowDoctorCell2.classList.remove("cell-services-of-patient")
    fourthRowDoctorCell2.classList.add("cell-services-of-patient-selected")
    fourthRowDoctorCell3.classList.remove("cell-services-of-patient")
    fourthRowDoctorCell3.classList.add("cell-services-of-patient-selected")

    firstRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell1.classList.add("cell-services-of-patient")
    firstRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell2.classList.add("cell-services-of-patient")
    firstRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    firstRowDoctorCell3.classList.add("cell-services-of-patient")

    secondRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell1.classList.add("cell-services-of-patient")
    secondRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell2.classList.add("cell-services-of-patient")
    secondRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    secondRowDoctorCell3.classList.add("cell-services-of-patient")

    thirdRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell1.classList.add("cell-services-of-patient")
    thirdRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell2.classList.add("cell-services-of-patient")
    thirdRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowDoctorCell3.classList.add("cell-services-of-patient")

    selectedRowDoctorService = 3;
  } else {
    fourthRowDoctorCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell1.classList.add("cell-services-of-patient")
    fourthRowDoctorCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell2.classList.add("cell-services-of-patient")
    fourthRowDoctorCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowDoctorCell3.classList.add("cell-services-of-patient")
    selectedRowDoctorService = -1;
  }
})


firstRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 0) {
    firstRowAllCell1.classList.remove("cell-services-of-patient")
    firstRowAllCell1.classList.add("cell-services-of-patient-selected")
    firstRowAllCell2.classList.remove("cell-services-of-patient")
    firstRowAllCell2.classList.add("cell-services-of-patient-selected")
    firstRowAllCell3.classList.remove("cell-services-of-patient")
    firstRowAllCell3.classList.add("cell-services-of-patient-selected")

    secondRowAllCell1.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell1.classList.add("cell-services-of-patient")
    secondRowAllCell2.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell2.classList.add("cell-services-of-patient")
    secondRowAllCell3.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell3.classList.add("cell-services-of-patient")

    thirdRowAllCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell1.classList.add("cell-services-of-patient")
    thirdRowAllCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell2.classList.add("cell-services-of-patient")
    thirdRowAllCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell3.classList.add("cell-services-of-patient")

    fourthRowAllCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell1.classList.add("cell-services-of-patient")
    fourthRowAllCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell2.classList.add("cell-services-of-patient")
    fourthRowAllCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell3.classList.add("cell-services-of-patient")

    selectedRowServices = 0;
  } else {
    firstRowAllCell1.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell1.classList.add("cell-services-of-patient")
    firstRowAllCell2.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell2.classList.add("cell-services-of-patient")
    firstRowAllCell3.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell3.classList.add("cell-services-of-patient")
    selectedRowServices = -1;
  }
})

secondRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 1) {
    secondRowAllCell1.classList.remove("cell-services-of-patient")
    secondRowAllCell1.classList.add("cell-services-of-patient-selected")
    secondRowAllCell2.classList.remove("cell-services-of-patient")
    secondRowAllCell2.classList.add("cell-services-of-patient-selected")
    secondRowAllCell3.classList.remove("cell-services-of-patient")
    secondRowAllCell3.classList.add("cell-services-of-patient-selected")

    firstRowAllCell1.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell1.classList.add("cell-services-of-patient")
    firstRowAllCell2.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell2.classList.add("cell-services-of-patient")
    firstRowAllCell3.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell3.classList.add("cell-services-of-patient")

    thirdRowAllCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell1.classList.add("cell-services-of-patient")
    thirdRowAllCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell2.classList.add("cell-services-of-patient")
    thirdRowAllCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell3.classList.add("cell-services-of-patient")

    fourthRowAllCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell1.classList.add("cell-services-of-patient")
    fourthRowAllCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell2.classList.add("cell-services-of-patient")
    fourthRowAllCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell3.classList.add("cell-services-of-patient")

    selectedRowServices = 1;
  } else {
    secondRowAllCell1.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell1.classList.add("cell-services-of-patient")
    secondRowAllCell2.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell2.classList.add("cell-services-of-patient")
    secondRowAllCell3.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell3.classList.add("cell-services-of-patient")
    selectedRowServices = -1;
  }
})

thirdRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 2) {
    thirdRowAllCell1.classList.remove("cell-services-of-patient")
    thirdRowAllCell1.classList.add("cell-services-of-patient-selected")
    thirdRowAllCell2.classList.remove("cell-services-of-patient")
    thirdRowAllCell2.classList.add("cell-services-of-patient-selected")
    thirdRowAllCell3.classList.remove("cell-services-of-patient")
    thirdRowAllCell3.classList.add("cell-services-of-patient-selected")

    firstRowAllCell1.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell1.classList.add("cell-services-of-patient")
    firstRowAllCell2.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell2.classList.add("cell-services-of-patient")
    firstRowAllCell3.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell3.classList.add("cell-services-of-patient")

    secondRowAllCell1.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell1.classList.add("cell-services-of-patient")
    secondRowAllCell2.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell2.classList.add("cell-services-of-patient")
    secondRowAllCell3.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell3.classList.add("cell-services-of-patient")

    fourthRowAllCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell1.classList.add("cell-services-of-patient")
    fourthRowAllCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell2.classList.add("cell-services-of-patient")
    fourthRowAllCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell3.classList.add("cell-services-of-patient")

    selectedRowServices = 2;
  } else {
    thirdRowAllCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell1.classList.add("cell-services-of-patient")
    thirdRowAllCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell2.classList.add("cell-services-of-patient")
    thirdRowAllCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell3.classList.add("cell-services-of-patient")
    selectedRowServices = -1;
  }
})

fourthRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 3) {
    fourthRowAllCell1.classList.remove("cell-services-of-patient")
    fourthRowAllCell1.classList.add("cell-services-of-patient-selected")
    fourthRowAllCell2.classList.remove("cell-services-of-patient")
    fourthRowAllCell2.classList.add("cell-services-of-patient-selected")
    fourthRowAllCell3.classList.remove("cell-services-of-patient")
    fourthRowAllCell3.classList.add("cell-services-of-patient-selected")

    firstRowAllCell1.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell1.classList.add("cell-services-of-patient")
    firstRowAllCell2.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell2.classList.add("cell-services-of-patient")
    firstRowAllCell3.classList.remove("cell-services-of-patient-selected")
    firstRowAllCell3.classList.add("cell-services-of-patient")

    secondRowAllCell1.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell1.classList.add("cell-services-of-patient")
    secondRowAllCell2.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell2.classList.add("cell-services-of-patient")
    secondRowAllCell3.classList.remove("cell-services-of-patient-selected")
    secondRowAllCell3.classList.add("cell-services-of-patient")

    thirdRowAllCell1.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell1.classList.add("cell-services-of-patient")
    thirdRowAllCell2.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell2.classList.add("cell-services-of-patient")
    thirdRowAllCell3.classList.remove("cell-services-of-patient-selected")
    thirdRowAllCell3.classList.add("cell-services-of-patient")

    selectedRowServices = 3;
  } else {
    fourthRowAllCell1.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell1.classList.add("cell-services-of-patient")
    fourthRowAllCell2.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell2.classList.add("cell-services-of-patient")
    fourthRowAllCell3.classList.remove("cell-services-of-patient-selected")
    fourthRowAllCell3.classList.add("cell-services-of-patient")
    selectedRowServices = -1;
  }
})



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
