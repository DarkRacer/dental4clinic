const url = 'https://af2f-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'af2f-46-164-217-97.ngrok-free.app',
  "Origin":  'https://af2f-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

const doctorField = document.getElementById("doctor-field");
const serviceField = document.getElementById("service-field");

const firstDoctor = document.getElementById("first-doctor");
const firstServices = document.getElementById("first-services");
const secondDoctor = document.getElementById("second-doctor");
const secondServices = document.getElementById("second-services");
const thirdDoctor = document.getElementById("third-doctor");
const thirdServices = document.getElementById("third-services");

const firstRow = document.getElementById("first-row");
const firstRowCell1 = document.getElementById("first-row-cell-1");
const firstRowCell2 = document.getElementById("first-row-cell-2");

const secondRow = document.getElementById("second-row");
const secondRowCell1 = document.getElementById("second-row-cell-1");
const secondRowCell2 = document.getElementById("second-row-cell-2");

const thirdRow = document.getElementById("third-row");
const thirdRowCell1 = document.getElementById("third-row-cell-1");
const thirdRowCell2 = document.getElementById("third-row-cell-2");

const appointmentForm = document.getElementById("appointment-form");
const recordButton = document.getElementById("record-button");

let doctorValue = "";
let serviceValue = "";
let doctorsTableValue = [];
let filteredDoctorsTableValue = [];
let selectedRow;


GetUrl("doctors/services").then(data => {
  doctorsTableValue = data
  filteredDoctorsTableValue = doctorsTableValue
  updateDoctorTable()
})
  .catch((error) => {
    console.error('Error:', error);
  });

doctorField.addEventListener("input", (e) => {
  doctorValue = e.target.value
  findDoctors()
})

serviceField.addEventListener("input", (e) => {
  serviceValue = e.target.value
  findDoctors()
})

function findDoctors() {
  if (doctorValue && serviceValue) {
    filteredDoctorsTableValue = doctorsTableValue.filter((info) => info.doctor.toLowerCase().includes(doctorValue.toLowerCase()) && info.services.toLowerCase().includes(serviceValue.toLowerCase()))
  } else if (doctorValue) {
    filteredDoctorsTableValue = doctorsTableValue.filter((info) => info.doctor.toLowerCase().includes(doctorValue.toLowerCase()))
  } else if (serviceValue) {
    filteredDoctorsTableValue = doctorsTableValue.filter((info) => info.services.toLowerCase().includes(serviceValue.toLowerCase()))
  } else {
    filteredDoctorsTableValue = doctorsTableValue
  }
  updateDoctorTable()
}

function updateDoctorTable() {
  if (filteredDoctorsTableValue[0]) {
    firstDoctor.textContent = filteredDoctorsTableValue[0].doctor
    firstServices.textContent = filteredDoctorsTableValue[0].services
  } else {
    firstDoctor.textContent = ''
    firstServices.textContent = ''
  }

  if (filteredDoctorsTableValue[1]) {
    secondDoctor.textContent = filteredDoctorsTableValue[1].doctor
    secondServices.textContent = filteredDoctorsTableValue[1].services
  } else {
    secondDoctor.textContent = ''
    secondServices.textContent = ''
  }

  if (filteredDoctorsTableValue[2]) {
    thirdDoctor.textContent = filteredDoctorsTableValue[2].doctor
    thirdServices.textContent = filteredDoctorsTableValue[2].services
  } else {
    thirdDoctor.textContent = ''
    thirdServices.textContent = ''
  }
}

firstRow.addEventListener("click", (e) => {
  if (selectedRow !== 0) {
    firstRowCell1.classList.remove("cell-recording")
    firstRowCell1.classList.add("cell-recording-selected")
    firstRowCell2.classList.remove("cell-recording")
    firstRowCell2.classList.add("cell-recording-selected")

    secondRowCell1.classList.remove("cell-recording-selected")
    secondRowCell1.classList.add("cell-recording")
    secondRowCell2.classList.remove("cell-recording-selected")
    secondRowCell2.classList.add("cell-recording")

    thirdRowCell1.classList.remove("cell-recording-selected")
    thirdRowCell1.classList.add("cell-recording")
    thirdRowCell2.classList.remove("cell-recording-selected")
    thirdRowCell2.classList.add("cell-recording")

    selectedRow = 0;
  } else {
    firstRowCell1.classList.remove("cell-recording-selected")
    firstRowCell1.classList.add("cell-recording")
    firstRowCell2.classList.remove("cell-recording-selected")
    firstRowCell2.classList.add("cell-recording")
    selectedRow = -1;
  }
})

secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    secondRowCell1.classList.remove("cell-recording")
    secondRowCell1.classList.add("cell-recording-selected")
    secondRowCell2.classList.remove("cell-recording")
    secondRowCell2.classList.add("cell-recording-selected")

    firstRowCell1.classList.remove("cell-recording-selected")
    firstRowCell1.classList.add("cell-recording")
    firstRowCell2.classList.remove("cell-recording-selected")
    firstRowCell2.classList.add("cell-recording")

    thirdRowCell1.classList.remove("cell-recording-selected")
    thirdRowCell1.classList.add("cell-recording")
    thirdRowCell2.classList.remove("cell-recording-selected")
    thirdRowCell2.classList.add("cell-recording")

    selectedRow = 1;
  } else {
    secondRowCell1.classList.remove("cell-recording-selected")
    secondRowCell1.classList.add("cell-recording")
    secondRowCell2.classList.remove("cell-recording-selected")
    secondRowCell2.classList.add("cell-recording")
    selectedRow = -1;
  }
})

thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    thirdRowCell1.classList.remove("cell-recording")
    thirdRowCell1.classList.add("cell-recording-selected")
    thirdRowCell2.classList.remove("cell-recording")
    thirdRowCell2.classList.add("cell-recording-selected")

    firstRowCell1.classList.remove("cell-recording-selected")
    firstRowCell1.classList.add("cell-recording")
    firstRowCell2.classList.remove("cell-recording-selected")
    firstRowCell2.classList.add("cell-recording")

    secondRowCell1.classList.remove("cell-recording-selected")
    secondRowCell1.classList.add("cell-recording")
    secondRowCell2.classList.remove("cell-recording-selected")
    secondRowCell2.classList.add("cell-recording")

    selectedRow = 2;
  } else {
    thirdRowCell1.classList.remove("cell-recording-selected")
    thirdRowCell1.classList.add("cell-recording")
    thirdRowCell2.classList.remove("cell-recording-selected")
    thirdRowCell2.classList.add("cell-recording")
    selectedRow = -1;
  }
})

recordButton.addEventListener("click", (e) => {
  e.preventDefault();
  const name = appointmentForm.name.value;
  const description = appointmentForm.description.value;
  const phone = appointmentForm.phone.value;
  const surname = appointmentForm.surname.value;
  const date = appointmentForm.date.value;
  const datetime = appointmentForm.datetime.value;

  if (selectedRow >= 0) {
    const appointmentBody = {
      name: name,
      description: description,
      phone: phone,
      surname: surname,
      date: date,
      datetime: datetime,
      doctorId: filteredDoctorsTableValue[selectedRow][`doctor-id`]
    }
    console.log(appointmentBody)

    PostUrl("appointments/create/unauthorized", appointmentBody).then(data => {
      console.log("Success")
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
})


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
    .then(response => response)
}
