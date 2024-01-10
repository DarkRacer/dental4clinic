import { get, post } from "../core/rest.js";
import {updateDoctors, initDoctors, doctorsDialog, currentDoctor, updateDoctorsValue} from "../core/page/doctors.js";
import {Doctor} from "../core/model/user.js";
import {changeClassRows} from "../core/table.js";

const doctorId = 1;

const firstRowDoctor = document.getElementById("firstRowDoctor");
const firstRowDoctorCell1 = document.getElementById("firstRowDoctorCell1");
const firstRowDoctorName = document.getElementById("firstRowDoctorName");
const firstRowDoctorCell2 = document.getElementById("firstRowDoctorCell2");
const firstRowDoctorDescription = document.getElementById("firstRowDoctorDescription");
const firstRowDoctorCell3 = document.getElementById("firstRowDoctorCell3");
const firstRowDoctorPrice = document.getElementById("firstRowDoctorPrice");

const secondRowDoctor = document.getElementById("secondRowDoctor");
const secondRowDoctorCell1 = document.getElementById("secondRowDoctorCell1");
const secondRowDoctorName = document.getElementById("secondRowDoctorName");
const secondRowDoctorCell2 = document.getElementById("secondRowDoctorCell2");
const secondRowDoctorDescription = document.getElementById("secondRowDoctorDescription");
const secondRowDoctorCell3 = document.getElementById("secondRowDoctorCell3");
const secondRowDoctorPrice = document.getElementById("secondRowDoctorPrice");

const thirdRowDoctor = document.getElementById("thirdRowDoctor");
const thirdRowDoctorCell1 = document.getElementById("thirdRowDoctorCell1");
const thirdRowDoctorName = document.getElementById("thirdRowDoctorName");
const thirdRowDoctorCell2 = document.getElementById("thirdRowDoctorCell2");
const thirdRowDoctorDescription = document.getElementById("thirdRowDoctorDescription");
const thirdRowDoctorCell3 = document.getElementById("thirdRowDoctorCell3");
const thirdRowDoctorPrice = document.getElementById("thirdRowDoctorPrice");

const fourthRowDoctor = document.getElementById("fourthRowDoctor");
const fourthRowDoctorCell1 = document.getElementById("fourthRowDoctorCell1");
const fourthRowDoctorName = document.getElementById("fourthRowDoctorName");
const fourthRowDoctorCell2 = document.getElementById("fourthRowDoctorCell2");
const fourthRowDoctorDescription = document.getElementById("fourthRowDoctorDescription");
const fourthRowDoctorCell3 = document.getElementById("fourthRowDoctorCell3");
const fourthRowDoctorPrice = document.getElementById("fourthRowDoctorPrice");


const firstRowAll = document.getElementById("firstRowAll");
const firstRowAllCell1 = document.getElementById("firstRowAllCell1");
const firstRowAllName = document.getElementById("firstRowAllName");
const firstRowAllCell2 = document.getElementById("firstRowAllCell2");
const firstRowAllDescription = document.getElementById("firstRowAllDescription");
const firstRowAllCell3 = document.getElementById("firstRowAllCell3");
const firstRowAllPrice = document.getElementById("firstRowAllPrice");

const secondRowAll = document.getElementById("secondRowAll");
const secondRowAllCell1 = document.getElementById("secondRowAllCell1");
const secondRowAllName = document.getElementById("secondRowAllName");
const secondRowAllCell2 = document.getElementById("secondRowAllCell2");
const secondRowAllDescription = document.getElementById("secondRowAllDescription");
const secondRowAllCell3 = document.getElementById("secondRowAllCell3");
const secondRowAllPrice = document.getElementById("secondRowAllPrice");

const thirdRowAll = document.getElementById("thirdRowAll");
const thirdRowAllCell1 = document.getElementById("thirdRowAllCell1");
const thirdRowAllName = document.getElementById("thirdRowAllName");
const thirdRowAllCell2 = document.getElementById("thirdRowAllCell2");
const thirdRowAllDescription = document.getElementById("thirdRowAllDescription");
const thirdRowAllCell3 = document.getElementById("thirdRowAllCell3");
const thirdRowAllPrice = document.getElementById("thirdRowAllPrice");

const fourthRowAll = document.getElementById("fourthRowAll");
const fourthRowAllCell1 = document.getElementById("fourthRowAllCell1");
const fourthRowAllName = document.getElementById("fourthRowAllName");
const fourthRowAllCell2 = document.getElementById("fourthRowAllCell2");
const fourthRowAllDescription = document.getElementById("fourthRowAllDescription");
const fourthRowAllCell3 = document.getElementById("fourthRowAllCell3");
const fourthRowAllPrice = document.getElementById("fourthRowAllPrice");

const deleteButton = document.getElementById("deleteButton");
const addButton = document.getElementById("addButton");

const createForm = document.getElementById("create-form");
const editForm = document.getElementById("edit-form");
const photoField = document.getElementById("photo");
const photoEditField = document.getElementById("photoEdit");
const doctorNameServices = document.getElementById("doctorNameServices");

const createDoctorDialog = document.querySelector('#createDoctorDialog');

let imageString ='';
let fileName ='';
let doctorServiceTableValue = [];
let servicesTableValue = [];
let selectedRowDoctorService = -1;
let selectedRowServices = -1;

initDoctors();

document.querySelector('#openCreateDoctorDialog').onclick = () => {
  createDoctorDialog.style.display = 'flex';
  createDoctorDialog.show();
}
document.querySelector('#createDoctorDialogClose').onclick = () => {
  createDoctorDialog.style.display = null;
  createDoctorDialog.close();
}
document.querySelector('#createDoctorDialogSave').onclick = () => {
  const createDoctorBody = new Doctor(
    null,
    createForm.name.value,
    createForm.surname.value,
    createForm.patronymic.value,
    createForm.spec.options[createForm.spec.selectedIndex].value,
    createForm.description.value,
    imageString,
    fileName,
    createForm.pluses.value
  )
  post('doctor/create', createDoctorBody).then((data) => {
    updateDoctorsValue(data);
    updateDoctors();
    imageString = '';
    fileName = '';
    createDoctorDialog.style.display = null;
    createDoctorDialog.close();
  }).catch((error) => {
    imageString = '';
    fileName = '';
    console.error(error)
  })
}

const editDoctorDialog = document.querySelector('#editDoctorDialog');
document.querySelector('#openEditDoctorDialog').onclick = () => {
  doctorsDialog.style.display = null;
  doctorsDialog.close();
  editForm.nameEdit.value = currentDoctor['part-name']
  editForm.surnameEdit.value = currentDoctor.surname
  editForm.patronymicEdit.value = currentDoctor.patronymic
  editForm.descriptionEdit.value = currentDoctor.description
  editForm.plusesEdit.value = currentDoctor.pluses
  editDoctorDialog.style.display = 'flex';
  editDoctorDialog.show();
}
document.querySelector('#editDoctorDialogClose').onclick = () => {
  editDoctorDialog.style.display = null;
  editDoctorDialog.close();
  doctorsDialog.style.display = 'flex';
  doctorsDialog.show();
}
document.querySelector('#editDoctorDialogSave').onclick = () => {
  const editDoctorBody = new Doctor(
    currentDoctor.id,
    editForm.nameEdit.value,
    editForm.surnameEdit.value,
    editForm.patronymicEdit.value,
    editForm.specEdit.options[editForm.specEdit.selectedIndex].value,
    editForm.descriptionEdit.value,
    imageString,
    fileName,
    editForm.plusesEdit.value
)
  post('doctor/edit', editDoctorBody).then((data) => {
    updateDoctorsValue(data);
    updateDoctors();
    imageString = '';
    fileName = '';
    editDoctorDialog.style.display = null;
    editDoctorDialog.close();
  }).catch((error) => {
    imageString = '';
    fileName = '';
    console.error(error)
  })
}

const deleteDoctorDialog = document.querySelector('#deleteDoctorDialog');
document.querySelector('#openDeleteDoctorDialog').onclick = () => {
  doctorsDialog.style.display = null;
  doctorsDialog.close();
  deleteDoctorDialog.style.display = 'flex';
  deleteDoctorDialog.show();
}
document.querySelector('#backButtonDeleteDoctorDialogClose').onclick = () => {
  deleteDoctorDialog.style.display = null;
  deleteDoctorDialog.close();
  doctorsDialog.style.display = 'flex';
  doctorsDialog.show();
}
document.querySelector('#deleteDoctorDialogClose').onclick = () => {
  post('doctor/delete', currentDoctor).then((data) => {
    updateDoctorsValue(data);
    updateDoctors();
    deleteDoctorDialog.style.display = null;
    deleteDoctorDialog.close();
  }).catch((error) => console.error(error))
}

const servicesDoctorDialog = document.querySelector('#servicesDoctorDialog');
document.querySelector('#openCreateServicesDoctorDialog').onclick = () => {
  openDoctorService(`${createForm.surname.value} ${createForm.name.value} ${createForm.patronymic.value}`);
}
document.querySelector('#openEditServicesDoctorDialog').onclick = () => {
  openDoctorService(`${editForm.surnameEdit.value} ${editForm.nameEdit.value} ${editForm.patronymicEdit.value}`);
}
document.querySelector('#openServicesDoctorDialog').onclick = () => {
  openDoctorService(currentDoctor.name);
}
document.querySelector('#servicesDoctorDialogClose').onclick = () => {
  servicesDoctorDialog.style.display = null;
  servicesDoctorDialog.close();
}
photoField.addEventListener("change", (e) => {
  imageUploaded();
})
photoEditField.addEventListener("change", (e) => {
  imageUploaded();
})

deleteButton.addEventListener("click", (e) => {
  if (selectedRowDoctorService > -1) {
    post(`services/doctor/delete/${doctorId}`, doctorServiceTableValue[selectedRowDoctorService]).then((data) => {
      doctorServiceTableValue = data;
      updateDoctorServices();
      clearDoctorService();
    }).catch((error) => {
      console.error(error)
    })
  }
});

addButton.addEventListener("click", (e) => {
  if (selectedRowServices > -1) {
    post(`services/doctor/add/${doctorId}`, servicesTableValue[selectedRowServices]).then((data) => {
      doctorServiceTableValue = data;
      updateDoctorServices();
      clearDoctorService();
    }).catch((error) => {
      console.error(error)
    })
  }
})

const getServicesForDoctor = () => {
  get(`services/doctor/${doctorId}`).then((data) => {
    doctorServiceTableValue = data;
    updateDoctorServices();
  }).catch((error) => console.log(error))
}

const getServices = () => {
  get("services/all").then((data) => {
    servicesTableValue = data;
    updateServices();
  }).catch((error) => console.log(error))
}

const updateDoctorServices = () => {
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

  if (doctorServiceTableValue[3]) {
    fourthRowDoctorName.textContent = doctorServiceTableValue[3].service
    fourthRowDoctorDescription.textContent = doctorServiceTableValue[3].description
    fourthRowDoctorPrice.textContent = doctorServiceTableValue[3].price
  } else {
    fourthRowDoctorName.textContent = ''
    fourthRowDoctorDescription.textContent = ''
    fourthRowDoctorPrice.textContent = ''
  }
}

const updateServices = () => {
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

  if (servicesTableValue[3]) {
    fourthRowAllName.textContent = servicesTableValue[3].service
    fourthRowAllDescription.textContent = servicesTableValue[3].description
    fourthRowAllPrice.textContent = servicesTableValue[3].price
  } else {
    fourthRowAllName.textContent = ''
    fourthRowAllDescription.textContent = ''
    fourthRowAllPrice.textContent = ''
  }
}

const imageUploaded = () => {
  const file = document.querySelector(
    'input[type=file]')['files'][0];

  const reader = new FileReader();
  fileName = file.name;

  reader.onload = () => imageString = reader.result;
  reader.readAsDataURL(file);
}

const openDoctorService = (name) => {
  clearDoctorService();
  doctorNameServices.innerText = `${name}`
  getServicesForDoctor()
  getServices()
  servicesDoctorDialog.style.display = 'flex';
  servicesDoctorDialog.show();
}

firstRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 0) {
    changeClassRows([
      firstRowDoctorCell1,
      firstRowDoctorCell2,
      firstRowDoctorCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      secondRowDoctorCell1,
      secondRowDoctorCell2,
      secondRowDoctorCell3,
      thirdRowDoctorCell1,
      thirdRowDoctorCell2,
      thirdRowDoctorCell3,
      fourthRowDoctorCell1,
      fourthRowDoctorCell2,
      fourthRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = 0;
  } else {
    changeClassRows([
      firstRowDoctorCell1,
      firstRowDoctorCell2,
      firstRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = -1;
  }
})

secondRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 1) {
    changeClassRows([
      secondRowDoctorCell1,
      secondRowDoctorCell2,
      secondRowDoctorCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      firstRowDoctorCell1,
      firstRowDoctorCell2,
      firstRowDoctorCell3,
      thirdRowDoctorCell1,
      thirdRowDoctorCell2,
      thirdRowDoctorCell3,
      fourthRowDoctorCell1,
      fourthRowDoctorCell2,
      fourthRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = 1;
  } else {
    changeClassRows([
      secondRowDoctorCell1,
      secondRowDoctorCell2,
      secondRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = -1;
  }
})

thirdRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 2) {
    changeClassRows([
      thirdRowDoctorCell1,
      thirdRowDoctorCell2,
      thirdRowDoctorCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      firstRowDoctorCell1,
      firstRowDoctorCell2,
      firstRowDoctorCell3,
      secondRowDoctorCell1,
      secondRowDoctorCell2,
      secondRowDoctorCell3,
      fourthRowDoctorCell1,
      fourthRowDoctorCell2,
      fourthRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = 2;
  } else {
    changeClassRows([
      thirdRowDoctorCell1,
      thirdRowDoctorCell2,
      thirdRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = -1;
  }
})

fourthRowDoctor.addEventListener("click", (e) => {
  if (selectedRowDoctorService !== 3) {
    changeClassRows([
      fourthRowDoctorCell1,
      fourthRowDoctorCell2,
      fourthRowDoctorCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      firstRowDoctorCell1,
      firstRowDoctorCell2,
      firstRowDoctorCell3,
      secondRowDoctorCell1,
      secondRowDoctorCell2,
      secondRowDoctorCell3,
      thirdRowDoctorCell1,
      thirdRowDoctorCell2,
      thirdRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = 3;
  } else {
    changeClassRows([
      fourthRowDoctorCell1,
      fourthRowDoctorCell2,
      fourthRowDoctorCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowDoctorService = -1;
  }
})


firstRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 0) {
    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3,
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3,
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = 0;
  } else {
    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = -1;
  }
})

secondRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 1) {
    changeClassRows([
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3,
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3,
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = 1;
  } else {
    changeClassRows([
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = -1;
  }
})

thirdRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 2) {
    changeClassRows([
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3,
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3,
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = 2;
  } else {
    changeClassRows([
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = -1;
  }
})

fourthRowAll.addEventListener("click", (e) => {
  if (selectedRowServices !== 3) {
    changeClassRows([
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3
    ], "cell-services-of-patient", "cell-services-of-patient-selected")

    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3,
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3,
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = 3;
  } else {
    changeClassRows([
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3
    ], "cell-services-of-patient-selected", "cell-services-of-patient")

    selectedRowServices = -1;
  }
})

const clearDoctorService = () => {
  changeClassRows([
    firstRowDoctorCell1,
    firstRowDoctorCell2,
    firstRowDoctorCell3,
    secondRowDoctorCell1,
    secondRowDoctorCell2,
    secondRowDoctorCell3,
    thirdRowDoctorCell1,
    thirdRowDoctorCell2,
    thirdRowDoctorCell3,
    fourthRowDoctorCell1,
    fourthRowDoctorCell2,
    fourthRowDoctorCell3
  ], "cell-services-of-patient-selected", "cell-services-of-patient")

  changeClassRows([
    firstRowAllCell1,
    firstRowAllCell2,
    firstRowAllCell3,
    secondRowAllCell1,
    secondRowAllCell2,
    secondRowAllCell3,
    thirdRowAllCell1,
    thirdRowAllCell2,
    thirdRowAllCell3,
    fourthRowAllCell1,
    fourthRowAllCell2,
    fourthRowAllCell3
  ], "cell-services-of-patient-selected", "cell-services-of-patient")

  selectedRowDoctorService = -1;
  selectedRowServices = -1;
}
