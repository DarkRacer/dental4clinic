import {get, post, postWithoutResponse} from "../core/rest.js";
import {User} from "../core/model/user.js";
import {changeClassRows} from "../core/table.js";

const userId = 2;

const left8Up = document.getElementById("left8Up");
const left8Down = document.getElementById("left8Down");
const right1Up = document.getElementById("right1Up");
const right1Down = document.getElementById("right1Down");
const left7Up = document.getElementById("left7Up");
const left7Down = document.getElementById("left7Down");
const right2Up = document.getElementById("right2Up");
const right2Down = document.getElementById("right2Down");
const left6Up = document.getElementById("left6Up");
const left6Down = document.getElementById("left6Down");
const right3Up = document.getElementById("right3Up");
const right3Down = document.getElementById("right3Down");
const left5Up = document.getElementById("left5Up");
const left5Down = document.getElementById("left5Down");
const right4Up = document.getElementById("right4Up");
const right4Down = document.getElementById("right4Down");
const left4Up = document.getElementById("left4Up");
const left4Down = document.getElementById("left4Down");
const right5Up = document.getElementById("right5Up");
const right5Down = document.getElementById("right5Down");
const left3Up = document.getElementById("left3Up");
const left3Down = document.getElementById("left3Down");
const right6Up = document.getElementById("right6Up");
const right6Down = document.getElementById("right6Down");
const left2Up = document.getElementById("left2Up");
const left2Down = document.getElementById("left2Down");
const right7Up = document.getElementById("right7Up");
const right7Down = document.getElementById("right7Down");
const left1Up = document.getElementById("left1Up");
const left1Down = document.getElementById("left1Down");
const right8Up = document.getElementById("right8Up");
const right8Down = document.getElementById("right8Down");


const firstRequestCell1 = document.getElementById("first-request-cell1");
const firstRequestCell2 = document.getElementById("first-request-cell2");
const secondRequestCell1 = document.getElementById("second-request-cell1");
const secondRequestCell2 = document.getElementById("second-request-cell2");
const thirdRequestCell1 = document.getElementById("third-request-cell1");
const thirdRequestCell2 = document.getElementById("third-request-cell2");

const firstRowDiagnosisOfPatient = document.getElementById("firstRowDiagnosisOfPatient")
const firstRowDiagnosisOfPatientCell1 = document.getElementById("firstRowDiagnosisOfPatientCell1")
const firstDiagnosisOfPatientDiagnose = document.getElementById("firstDiagnosisOfPatientDiagnose")
const firstRowDiagnosisOfPatientCell2 = document.getElementById("firstRowDiagnosisOfPatientCell2")
const firstDiagnosisOfPatientDescription = document.getElementById("firstDiagnosisOfPatientDescription")
const firstRowDiagnosisOfPatientCell3 = document.getElementById("firstRowDiagnosisOfPatientCell3")
const firstDiagnosisOfPatientStatus = document.getElementById("firstDiagnosisOfPatientStatus")

const secondRowDiagnosisOfPatient = document.getElementById("secondRowDiagnosisOfPatient")
const secondRowDiagnosisOfPatientCell1 = document.getElementById("secondRowDiagnosisOfPatientCell1")
const secondDiagnosisOfPatientDiagnose = document.getElementById("secondDiagnosisOfPatientDiagnose")
const secondRowDiagnosisOfPatientCell2 = document.getElementById("secondRowDiagnosisOfPatientCell2")
const secondDiagnosisOfPatientDescription = document.getElementById("secondDiagnosisOfPatientDescription")
const secondRowDiagnosisOfPatientCell3 = document.getElementById("secondRowDiagnosisOfPatientCell3")
const secondDiagnosisOfPatientStatus = document.getElementById("secondDiagnosisOfPatientStatus")

const thirdRowDiagnosisOfPatient = document.getElementById("thirdRowDiagnosisOfPatient")
const thirdRowDiagnosisOfPatientCell1 = document.getElementById("thirdRowDiagnosisOfPatientCell1")
const thirdDiagnosisOfPatientDiagnose = document.getElementById("thirdDiagnosisOfPatientDiagnose")
const thirdRowDiagnosisOfPatientCell2 = document.getElementById("thirdRowDiagnosisOfPatientCell2")
const thirdDiagnosisOfPatientDescription = document.getElementById("thirdDiagnosisOfPatientDescription")
const thirdRowDiagnosisOfPatientCell3 = document.getElementById("thirdRowDiagnosisOfPatientCell3")
const thirdDiagnosisOfPatientStatus = document.getElementById("thirdDiagnosisOfPatientStatus")

const fourthRowDiagnosisOfPatient = document.getElementById("fourthRowDiagnosisOfPatient")
const fourthRowDiagnosisOfPatientCell1 = document.getElementById("fourthRowDiagnosisOfPatientCell1")
const fourthDiagnosisOfPatientDiagnose = document.getElementById("fourthDiagnosisOfPatientDiagnose")
const fourthRowDiagnosisOfPatientCell2 = document.getElementById("fourthRowDiagnosisOfPatientCell2")
const fourthDiagnosisOfPatientDescription = document.getElementById("fourthDiagnosisOfPatientDescription")
const fourthRowDiagnosisOfPatientCell3 = document.getElementById("fourthRowDiagnosisOfPatientCell3")
const fourthDiagnosisOfPatientStatus = document.getElementById("fourthDiagnosisOfPatientStatus")

const firstRowDiagnosisFromDoctor = document.getElementById("firstRowDiagnosisFromDoctor")
const firstRowDiagnosisFromDoctorCell1 = document.getElementById("firstRowDiagnosisFromDoctorCell1")
const firstDiagnosisFromDoctorDiagnose = document.getElementById("firstDiagnosisFromDoctorDiagnose")
const firstRowDiagnosisFromDoctorCell2 = document.getElementById("firstRowDiagnosisFromDoctorCell2")
const firstDiagnosisFromDoctorDescription = document.getElementById("firstDiagnosisFromDoctorDescription")

const secondRowDiagnosisFromDoctor = document.getElementById("secondRowDiagnosisFromDoctor")
const secondRowDiagnosisFromDoctorCell1 = document.getElementById("secondRowDiagnosisFromDoctorCell1")
const secondDiagnosisFromDoctorDiagnose = document.getElementById("secondDiagnosisFromDoctorDiagnose")
const secondRowDiagnosisFromDoctorCell2 = document.getElementById("secondRowDiagnosisFromDoctorCell2")
const secondDiagnosisFromDoctorDescription = document.getElementById("secondDiagnosisFromDoctorDescription")

const thirdRowDiagnosisFromDoctor = document.getElementById("thirdRowDiagnosisFromDoctor")
const thirdRowDiagnosisFromDoctorCell1 = document.getElementById("thirdRowDiagnosisFromDoctorCell1")
const thirdDiagnosisFromDoctorDiagnose = document.getElementById("thirdDiagnosisFromDoctorDiagnose")
const thirdRowDiagnosisFromDoctorCell2 = document.getElementById("thirdRowDiagnosisFromDoctorCell2")
const thirdDiagnosisFromDoctorDescription = document.getElementById("thirdDiagnosisFromDoctorDescription")

const fourthRowDiagnosisFromDoctor = document.getElementById("fourthRowDiagnosisFromDoctor")
const fourthRowDiagnosisFromDoctorCell1 = document.getElementById("fourthRowDiagnosisFromDoctorCell1")
const fourthDiagnosisFromDoctorDiagnose = document.getElementById("fourthDiagnosisFromDoctorDiagnose")
const fourthRowDiagnosisFromDoctorCell2 = document.getElementById("fourthRowDiagnosisFromDoctorCell2")
const fourthDiagnosisFromDoctorDescription = document.getElementById("fourthDiagnosisFromDoctorDescription")

const curedButton = document.getElementById("cured-button")
const addDiagnoseButton = document.getElementById("add-diagnose-button")

const toothPictures = document.getElementById("toothPictures");

const firstRowCheckBox = document.getElementById("first");
const secondRowCheckBox = document.getElementById("second");
const thirdRowCheckBox = document.getElementById("third");
const fourthRowCheckBox = document.getElementById("fourth");
const paymentsForm = document.getElementById("paymentsForm");

const firstRowService = document.getElementById("firstRowService")
const firstRowDescription = document.getElementById("firstRowDescription")
const firstRowPrice = document.getElementById("firstRowPrice")

const secondRowService = document.getElementById("secondRowService")
const secondRowDescription = document.getElementById("secondRowDescription")
const secondRowPrice = document.getElementById("secondRowPrice")

const thirdRowService = document.getElementById("thirdRowService")
const thirdRowDescription = document.getElementById("thirdRowDescription")
const thirdRowPrice = document.getElementById("thirdRowPrice")

const fourthRowService = document.getElementById("fourthRowService")
const fourthRowDescription = document.getElementById("fourthRowDescription")
const fourthRowPrice = document.getElementById("fourthRowPrice")

const servicesDone = document.getElementById("services-done")
const cost = document.getElementById("cost")
const paymentButton = document.getElementById("paymentButton")

const nameField = document.getElementById("name");
const dateOfBirthdayField = document.getElementById("dateOfBirthday");
const phoneField = document.getElementById("phone");
const eMailField = document.getElementById("e-mail");
const allergiesField = document.getElementById("allergies");
let dataAppointment = {};
let toothCard = {};
let selectedRowDiagnosisOfPatient = -1;
let selectedRowDiagnosisFromDoctor = -1;
let diagnosisTableValue = [];
let diagnosisFromDoctorTableValue = [];
const selectedPayments = [];
let services = [];


const getAppointment = () => {
  const query = window.location.href.split('/');
  const appointmentId = query[query.length - 1]
  get(`appointments/${appointmentId}`).then((data) => {
    dataAppointment = data;
    getUserInfo(dataAppointment['user-id'])
    getRequests(dataAppointment['user-id'])
    getUserToothCard(dataAppointment['user-id'])
  }).catch((error) => {
    console.error(error)
  })
}

getAppointment()

const getUserInfo = (patientId) => {
  get(`user/${patientId}`).then(data => {
    const {id, name, surname, patronymic, dateOfBirthday, phone, allergies, photo, photoName, address} = data;
    const email = data['e-mail'];
    const patient = new User(
      id,
      name,
      surname,
      patronymic,
      dateOfBirthday,
      phone,
      email,
      allergies,
      photo,
      photoName,
      address
    )
    nameField.innerText = patient.fullName;
    dateOfBirthdayField.innerText = patient.dateOfBirthday
    phoneField.innerText = patient.phone
    eMailField.innerText = patient.email
    allergiesField.innerText = patient.allergies
  }).catch(error => console.error(error));
}

const getRequests = (patientId) => {
  get(`user/requests/${patientId}`).then(data => {
    firstRequestCell1.innerText = data[0] ? data[0].date : '';
    firstRequestCell2.innerText = data[0] ? data[0].description : '';
    secondRequestCell1.innerText = data[1] ? data[1].date : '';
    secondRequestCell2.innerText = data[1] ? data[1].description : '';
    thirdRequestCell1.innerText = data[2] ? data[2].date : '';
    thirdRequestCell2.innerText = data[2] ? data[2].description : '';
  }).catch(error => console.error(error));
}

const getServices = () => {
  get(`doctors/${userId}/services`).then(data => {
    services = data;
    updateServicesTable()
  }).catch(error => console.error(error));
}

const getUserToothCard = (patientId) => {
  get(`user/tooth-card/${patientId}`).then((data) => {
    toothCard = data;
    updateToothCard();
  }).catch(error => console.error(error));
}

const getToothPictures = (patientId) => {
  get(`user/tooth/${patientId}`).then(data => {
    while (toothPictures.firstChild) {
      toothPictures.removeChild(toothPictures.lastChild);
    }
    data.forEach((picture) => {
      const img = document.createElement('img');
      img.classList.add("tooth-picture");
      img.src = picture.data;
      toothPictures.appendChild(img);
    })
  }).catch(error => console.error(error));
}

const getUserDiagnosis = (patientId) => {
  get(`user/diagnosis/${patientId}`).then(data => {
    diagnosisTableValue = data
    updateDiagnosisTable()
  }).catch(error => console.error(error));
}

const getDiagnosis = () => {
  get(`diagnosis`).then(data => {
    diagnosisFromDoctorTableValue = data
    updateDiagnosisFromDoctorTable()
  }).catch(error => console.error(error));
}

const updateDiagnosisTable = () => {
  if (diagnosisTableValue[0]) {
    firstDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[0].name
    firstDiagnosisOfPatientDescription.textContent = diagnosisTableValue[0].description
    firstDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[0].isActual)
  } else {
    firstDiagnosisOfPatientDiagnose.textContent = ''
    firstDiagnosisOfPatientDescription.textContent = ''
    firstDiagnosisOfPatientStatus.textContent = ''
  }

  if (diagnosisTableValue[1]) {
    secondDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[1].name
    secondDiagnosisOfPatientDescription.textContent = diagnosisTableValue[1].description
    secondDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[1].isActual)
  } else {
    secondDiagnosisOfPatientDiagnose.textContent = ''
    secondDiagnosisOfPatientDescription.textContent = ''
    secondDiagnosisOfPatientStatus.textContent = ''
  }

  if (diagnosisTableValue[2]) {
    thirdDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[2].name
    thirdDiagnosisOfPatientDescription.textContent = diagnosisTableValue[2].description
    thirdDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[2].isActual)
  } else {
    thirdDiagnosisOfPatientDiagnose.textContent = ''
    thirdDiagnosisOfPatientDescription.textContent = ''
    thirdDiagnosisOfPatientStatus.textContent = ''
  }

  if (diagnosisTableValue[3]) {
    fourthDiagnosisOfPatientDiagnose.textContent = diagnosisTableValue[3].name
    fourthDiagnosisOfPatientDescription.textContent = diagnosisTableValue[3].description
    fourthDiagnosisOfPatientStatus.textContent = actualDiagnosisMapper(diagnosisTableValue[3].isActual)
  } else {
    fourthDiagnosisOfPatientDiagnose.textContent = ''
    fourthDiagnosisOfPatientDescription.textContent = ''
    fourthDiagnosisOfPatientStatus.textContent = ''
  }
}

const updateDiagnosisFromDoctorTable = () => {
  if (diagnosisFromDoctorTableValue[0]) {
    firstDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[0].name
    firstDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[0].description
  } else {
    firstDiagnosisFromDoctorDiagnose.textContent = ''
    firstDiagnosisFromDoctorDiagnose.textContent = ''
  }

  if (diagnosisFromDoctorTableValue[1]) {
    secondDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[1].name
    secondDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[1].description
  } else {
    secondDiagnosisFromDoctorDiagnose.textContent = ''
    secondDiagnosisFromDoctorDescription.textContent = ''
  }

  if (diagnosisFromDoctorTableValue[2]) {
    thirdDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[2].name
    thirdDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[2].description
  } else {
    thirdDiagnosisFromDoctorDiagnose.textContent = ''
    thirdDiagnosisFromDoctorDescription.textContent = ''
  }

  if (diagnosisFromDoctorTableValue[3]) {
    fourthDiagnosisFromDoctorDiagnose.textContent = diagnosisFromDoctorTableValue[3].name
    fourthDiagnosisFromDoctorDescription.textContent = diagnosisFromDoctorTableValue[3].description
  } else {
    fourthDiagnosisFromDoctorDiagnose.textContent = ''
    fourthDiagnosisFromDoctorDescription.textContent = ''
  }
}

const updateServicesTable = () => {
  if (services[0]) {
    firstRowService.textContent = services[0].service
    firstRowDescription.textContent = services[0].description
    firstRowPrice.textContent = services[0].price
  } else {
    firstRowService.textContent = ''
    firstRowDescription.textContent = ''
    firstRowPrice.textContent = ''
  }

  if (services[1]) {
    secondRowService.textContent = services[1].service
    secondRowDescription.textContent = services[1].description
    secondRowPrice.textContent = services[1].price
  } else {
    secondRowService.textContent = ''
    secondRowDescription.textContent = ''
    secondRowPrice.textContent = ''
  }

  if (services[2]) {
    thirdRowService.textContent = services[2].service
    thirdRowDescription.textContent = services[2].description
    thirdRowPrice.textContent = services[2].price
  } else {
    thirdRowService.textContent = ''
    thirdRowDescription.textContent = ''
    thirdRowPrice.textContent = ''
  }

  if (services[3]) {
    fourthRowService.textContent = services[3].service
    fourthRowDescription.textContent = services[3].description
    fourthRowPrice.textContent = services[3].price
  } else {
    fourthRowService.textContent = ''
    fourthRowDescription.textContent = ''
    fourthRowPrice.textContent = ''
  }
}

firstRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 0) {
    changeClassRows([
      firstRowDiagnosisFromDoctorCell1,
      firstRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor", "cell-diagnosis-from-doctor-selected")

    changeClassRows([
      secondRowDiagnosisFromDoctorCell1,
      secondRowDiagnosisFromDoctorCell2,
      thirdRowDiagnosisFromDoctorCell1,
      thirdRowDiagnosisFromDoctorCell2,
      fourthRowDiagnosisFromDoctorCell1,
      fourthRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 0;
  } else {
    changeClassRows([
      firstRowDiagnosisFromDoctorCell1,
      firstRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = -1;
  }
})

secondRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 1) {
    changeClassRows([
      secondRowDiagnosisFromDoctorCell1,
      secondRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor", "cell-diagnosis-from-doctor-selected")

    changeClassRows([
      firstRowDiagnosisFromDoctorCell1,
      firstRowDiagnosisFromDoctorCell2,
      thirdRowDiagnosisFromDoctorCell1,
      thirdRowDiagnosisFromDoctorCell2,
      fourthRowDiagnosisFromDoctorCell1,
      fourthRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 1;
  } else {
    changeClassRows([
      secondRowDiagnosisFromDoctorCell1,
      secondRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = -1;
  }
})

thirdRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 2) {
    changeClassRows([
      thirdRowDiagnosisFromDoctorCell1,
      thirdRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor", "cell-diagnosis-from-doctor-selected")

    changeClassRows([
      firstRowDiagnosisFromDoctorCell1,
      firstRowDiagnosisFromDoctorCell2,
      secondRowDiagnosisFromDoctorCell1,
      secondRowDiagnosisFromDoctorCell2,
      fourthRowDiagnosisFromDoctorCell1,
      fourthRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 2;
  } else {
    changeClassRows([
      thirdRowDiagnosisFromDoctorCell1,
      thirdRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = -1;
  }
})

fourthRowDiagnosisFromDoctor.addEventListener("click", (e) => {
  if (selectedRowDiagnosisFromDoctor !== 3) {
    changeClassRows([
      fourthRowDiagnosisFromDoctorCell1,
      fourthRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor", "cell-diagnosis-from-doctor-selected")

    changeClassRows([
      firstRowDiagnosisFromDoctorCell1,
      firstRowDiagnosisFromDoctorCell2,
      secondRowDiagnosisFromDoctorCell1,
      secondRowDiagnosisFromDoctorCell2,
      thirdRowDiagnosisFromDoctorCell1,
      thirdRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

    selectedRowDiagnosisFromDoctor = 3;
  } else {
    changeClassRows([
      fourthRowDiagnosisFromDoctorCell1,
      fourthRowDiagnosisFromDoctorCell2
    ], "cell-diagnosis-from-doctor", "cell-diagnosis-from-doctor-selected")

    selectedRowDiagnosisFromDoctor = -1;
  }
})


const actualDiagnosisMapper = (isActual) => {
  return isActual ? "Не вылечено" : "Вылечено"
}

const toothPictureDialog = document.querySelector('#toothPicture');
document.querySelector('#openToothPicture').onclick = () => {
  getToothPictures(dataAppointment['user-id'])
  toothPictureDialog.style.display = 'flex';
  toothPictureDialog.show();
}
document.querySelector('#toothPictureClose').onclick = () => {
  toothPictureDialog.style.display = null;
  toothPictureDialog.close();
}

const diagnosisDialog = document.querySelector('#diagnosisDialog');
document.querySelector('#openDiagnosisDialog').onclick = () => {
  getUserDiagnosis(dataAppointment['user-id'])
  getDiagnosis()
  diagnosisDialog.style.display = 'flex';
  diagnosisDialog.show();
}
document.querySelector('#diagnosisDialogClose').onclick = () => {
  diagnosisDialog.style.display = null;
  diagnosisDialog.close();
}

const paymentsDialog = document.querySelector('#paymentsDialog');
document.querySelector('#openPaymentsDialog').onclick = () => {
  getServices()
  paymentsDialog.style.display = 'flex';
  paymentsDialog.show();
}
document.querySelector('#paymentsDialogClose').onclick = () => {
  paymentsDialog.style.display = null;
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

firstRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 0) {
    changeClassRows([
      firstRowDiagnosisOfPatientCell1,
      firstRowDiagnosisOfPatientCell2,
      firstRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient", "cell-diagnosis-of-patient-selected")

    changeClassRows([
      secondRowDiagnosisOfPatientCell1,
      secondRowDiagnosisOfPatientCell2,
      secondRowDiagnosisOfPatientCell3,
      thirdRowDiagnosisOfPatientCell1,
      thirdRowDiagnosisOfPatientCell2,
      thirdRowDiagnosisOfPatientCell3,
      fourthRowDiagnosisOfPatientCell1,
      fourthRowDiagnosisOfPatientCell2,
      fourthRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 0;
  } else {
    changeClassRows([
      firstRowDiagnosisOfPatientCell1,
      firstRowDiagnosisOfPatientCell2,
      firstRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = -1;
  }
})

secondRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 1) {
    changeClassRows([
      secondRowDiagnosisOfPatientCell1,
      secondRowDiagnosisOfPatientCell2,
      secondRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient", "cell-diagnosis-of-patient-selected")

    changeClassRows([
      firstRowDiagnosisOfPatientCell1,
      firstRowDiagnosisOfPatientCell2,
      firstRowDiagnosisOfPatientCell3,
      thirdRowDiagnosisOfPatientCell1,
      thirdRowDiagnosisOfPatientCell2,
      thirdRowDiagnosisOfPatientCell3,
      fourthRowDiagnosisOfPatientCell1,
      fourthRowDiagnosisOfPatientCell2,
      fourthRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 1;
  } else {
    changeClassRows([
      secondRowDiagnosisOfPatientCell1,
      secondRowDiagnosisOfPatientCell2,
      secondRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = -1;
  }
})

thirdRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 2) {
    changeClassRows([
      thirdRowDiagnosisOfPatientCell1,
      thirdRowDiagnosisOfPatientCell2,
      thirdRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient", "cell-diagnosis-of-patient-selected")

    changeClassRows([
      firstRowDiagnosisOfPatientCell1,
      firstRowDiagnosisOfPatientCell2,
      firstRowDiagnosisOfPatientCell3,
      secondRowDiagnosisOfPatientCell1,
      secondRowDiagnosisOfPatientCell2,
      secondRowDiagnosisOfPatientCell3,
      fourthRowDiagnosisOfPatientCell1,
      fourthRowDiagnosisOfPatientCell2,
      fourthRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 2;
  } else {
    changeClassRows([
      thirdRowDiagnosisOfPatientCell1,
      thirdRowDiagnosisOfPatientCell2,
      thirdRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = -1;
  }
})

fourthRowDiagnosisOfPatient.addEventListener("click", (e) => {
  if (selectedRowDiagnosisOfPatient !== 0) {
    changeClassRows([
      fourthRowDiagnosisOfPatientCell1,
      fourthRowDiagnosisOfPatientCell2,
      fourthRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient", "cell-diagnosis-of-patient-selected")

    changeClassRows([
      firstRowDiagnosisOfPatientCell1,
      firstRowDiagnosisOfPatientCell2,
      firstRowDiagnosisOfPatientCell3,
      secondRowDiagnosisOfPatientCell1,
      secondRowDiagnosisOfPatientCell2,
      secondRowDiagnosisOfPatientCell3,
      thirdRowDiagnosisOfPatientCell1,
      thirdRowDiagnosisOfPatientCell2,
      thirdRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = 0;
  } else {
    changeClassRows([
      fourthRowDiagnosisOfPatientCell1,
      fourthRowDiagnosisOfPatientCell2,
      fourthRowDiagnosisOfPatientCell3
    ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

    selectedRowDiagnosisOfPatient = -1;
  }
})


curedButton.addEventListener("click", (e) => {
  const diagnoseOfPatient = diagnosisTableValue[selectedRowDiagnosisOfPatient]
  diagnoseOfPatient.isActual = false

  const updateBody = {
    userId: dataAppointment['user-id'],
    diagnose: diagnoseOfPatient
  }

  post('user/diagnosis/update', updateBody)
    .then((data) => {
      alert("Статус диагноза изменен")
      diagnosisTableValue = data
      updateDiagnosisTable()
      clearDiagnosisOfPatient()
    })
    .catch((error) =>  alert("Статус диагноза не изменен"));
})

addDiagnoseButton.addEventListener("click", (e) => {
  const newDiagnose = diagnosisFromDoctorTableValue[selectedRowDiagnosisFromDoctor]

  const createBody = {
    userId: dataAppointment['user-id'],
    diagnose: newDiagnose
  }

  post('user/diagnosis/create', createBody)
    .then((data) => {
      alert("Диагноз добавлен")
      diagnosisTableValue = data
      updateDiagnosisTable()
      clearDiagnosisOfPatient()
    })
    .catch((error) =>  alert("Диагноз не добавлен"));
})

const clearDiagnosisOfPatient =() => {
  changeClassRows([
    firstRowDiagnosisOfPatientCell1,
    firstRowDiagnosisOfPatientCell2,
    firstRowDiagnosisOfPatientCell3,
    secondRowDiagnosisOfPatientCell1,
    secondRowDiagnosisOfPatientCell2,
    secondRowDiagnosisOfPatientCell3,
    thirdRowDiagnosisOfPatientCell1,
    thirdRowDiagnosisOfPatientCell2,
    thirdRowDiagnosisOfPatientCell3,
    fourthRowDiagnosisOfPatientCell1,
    fourthRowDiagnosisOfPatientCell2,
    fourthRowDiagnosisOfPatientCell3
  ], "cell-diagnosis-of-patient-selected", "cell-diagnosis-of-patient")

  changeClassRows([
    firstRowDiagnosisFromDoctorCell1,
    firstRowDiagnosisFromDoctorCell2,
    secondRowDiagnosisFromDoctorCell1,
    secondRowDiagnosisFromDoctorCell2,
    thirdRowDiagnosisFromDoctorCell1,
    thirdRowDiagnosisFromDoctorCell2,
    fourthRowDiagnosisFromDoctorCell1,
    fourthRowDiagnosisFromDoctorCell2
  ], "cell-diagnosis-from-doctor-selected", "cell-diagnosis-from-doctor")

  selectedRowDiagnosisFromDoctor = -1;
  selectedRowDiagnosisOfPatient = -1;
}

firstRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 0);
  paymentsForm.first.checked ? selectedPayments.push(0) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})
secondRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 1);
  paymentsForm.second.checked ? selectedPayments.push(1) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})
thirdRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 2);
  paymentsForm.third.checked ? selectedPayments.push(2) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})
fourthRowCheckBox.addEventListener("change", (e) => {
  const index = selectedPayments.findIndex((selected) => selected === 3);
  paymentsForm.fourth.checked ? selectedPayments.push(3) : selectedPayments.splice(index, 1);
  updatePaymentInfo()
})

paymentButton.addEventListener("click", (e) => {
  if (selectedPayments.length > 0) {
    const resultServices = []
    selectedPayments.forEach((selected) => {
      resultServices.push(services[selected]);
    });

    const paymentBody = {
      userId: dataAppointment['user-id'],
      services: resultServices
    }
    postWithoutResponse(`appointments/${dataAppointment.id}/finish`, paymentBody).then((data) => {
      postWithoutResponse(`user/tooth-card/${dataAppointment['user-id']}/update`, toothCard).then((data) => {
        alert("Приём окончен");
        location.assign('/doctor/reception');
      }).catch((error) => console.log(error))
    }).catch((error) => console.log(error))
  }
})

const updatePaymentInfo = () => {
  let summary = 0
  servicesDone.innerText = "Оказанные услуги: "
  cost.innerText = "Стоимость: "
  selectedPayments.forEach((selected) => {
    if (services[selected]) {
      servicesDone.innerText += " " + services[selected].service + ", "
      summary += services[selected].price
    }
  })
  cost.innerText += " " + summary + " Р."
}

const updateToothCard = () => {
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
