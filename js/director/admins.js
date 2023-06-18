const url = 'https://cc66-46-164-217-97.ngrok-free.app/';
var token = GetCookie("access_token")
const headers = {
  "Host":  'cc66-46-164-217-97.ngrok-free.app',
  "Origin":  'https://cc66-46-164-217-97.ngrok-free.app/',
  "Accept": "*/*",
  'ngrok-skip-browser-warning':true
}

let firstRowAll = document.getElementById("firstRowAll");
let firstRowAllCell1 = document.getElementById("firstRowAllCell1");
let firstRowAllName = document.getElementById("firstRowAllName");
let firstRowAllCell2 = document.getElementById("firstRowAllCell2");
let firstRowAllSurname = document.getElementById("firstRowAllSurname");
let firstRowAllCell3 = document.getElementById("firstRowAllCell3");
let firstRowAllPatronymic = document.getElementById("firstRowAllPatronymic");

let secondRowAll = document.getElementById("secondRowAll");
let secondRowAllCell1 = document.getElementById("secondRowAllCell1");
let secondRowAllName = document.getElementById("secondRowAllName");
let secondRowAllCell2 = document.getElementById("secondRowAllCell2");
let secondRowAllSurname = document.getElementById("secondRowAllSurname");
let secondRowAllCell3 = document.getElementById("secondRowAllCell3");
let secondRowAllPatronymic = document.getElementById("secondRowAllPatronymic");

let thirdRowAll = document.getElementById("thirdRowAll");
let thirdRowAllCell1 = document.getElementById("thirdRowAllCell1");
let thirdRowAllName = document.getElementById("thirdRowAllName");
let thirdRowAllCell2 = document.getElementById("thirdRowAllCell2");
let thirdRowAllSurname = document.getElementById("thirdRowAllSurname");
let thirdRowAllCell3 = document.getElementById("thirdRowAllCell3");
let thirdRowAllPatronymic = document.getElementById("thirdRowAllPatronymic");

let fourthRowAll = document.getElementById("fourthRowAll");
let fourthRowAllCell1 = document.getElementById("fourthRowAllCell1");
let fourthRowAllName = document.getElementById("fourthRowAllName");
let fourthRowAllCell2 = document.getElementById("fourthRowAllCell2");
let fourthRowAllSurname = document.getElementById("fourthRowAllSurname");
let fourthRowAllCell3 = document.getElementById("fourthRowAllCell3");
let fourthRowAllPatronymic = document.getElementById("fourthRowAllPatronymic");

let fifthRowAll = document.getElementById("fifthRowAll");
let fifthRowAllCell1 = document.getElementById("fifthRowAllCell1");
let fifthRowAllName = document.getElementById("fifthRowAllName");
let fifthRowAllCell2 = document.getElementById("fifthRowAllCell2");
let fifthRowAllSurname = document.getElementById("fifthRowAllSurname");
let fifthRowAllCell3 = document.getElementById("fifthRowAllCell3");
let fifthRowAllPatronymic = document.getElementById("fifthRowAllPatronymic");

let sixthRowAll = document.getElementById("sixthRowAll");
let sixthRowAllCell1 = document.getElementById("sixthRowAllCell1");
let sixthRowAllName = document.getElementById("sixthRowAllName");
let sixthRowAllCell2 = document.getElementById("sixthRowAllCell2");
let sixthRowAllSurname = document.getElementById("sixthRowAllSurname");
let sixthRowAllCell3 = document.getElementById("sixthRowAllCell3");
let sixthRowAllPatronymic = document.getElementById("sixthRowAllPatronymic");

let seventhRowAll = document.getElementById("seventhRowAll");
let seventhRowAllCell1 = document.getElementById("seventhRowAllCell1");
let seventhRowAllName = document.getElementById("seventhRowAllName");
let seventhRowAllCell2 = document.getElementById("seventhRowAllCell2");
let seventhRowAllSurname = document.getElementById("seventhRowAllSurname");
let seventhRowAllCell3 = document.getElementById("seventhRowAllCell3");
let seventhRowAllPatronymic = document.getElementById("seventhRowAllPatronymic");

let eighthRowAll = document.getElementById("eighthRowAll");
let eighthRowAllCell1 = document.getElementById("eighthRowAllCell1");
let eighthRowAllName = document.getElementById("eighthRowAllName");
let eighthRowAllCell2 = document.getElementById("eighthRowAllCell2");
let eighthRowAllSurname = document.getElementById("eighthRowAllSurname");
let eighthRowAllCell3 = document.getElementById("eighthRowAllCell3");
let eighthRowAllPatronymic = document.getElementById("eighthRowAllPatronymic");

let createForm = document.getElementById("create-form");
let editForm = document.getElementById("edit-form");

let adminsTableValue = [];
let selectedRowAdmins = -1;
let imageString ='';

var deleteDialog = document.querySelector('#deleteDialog');
document.querySelector('#openDeleteDialog').onclick = function() {
  deleteDialog.show();
}
document.querySelector('#deleteDialogClose').onclick = function() {
  PostUrl('admins/delete', adminsTableValue[selectedRowAdmins]).then((data) => {
    adminsTableValue = data;
    updateAdmins();
    deleteDialog.close();
  }).catch((error) => console.error(error))

}
document.querySelector('#backButtonDeleteDialogClose').onclick = function() {
  deleteDialog.close();
}

var createAdminDialog = document.querySelector('#createAdminDialog');
document.querySelector('#openCreateAdminDialog').onclick = function() {
  createAdminDialog.show();
}
document.querySelector('#createAdminDialogClose').onclick = function() {
  createAdminDialog.close();
}
document.querySelector('#createAdminDialogSave').onclick = function() {
  const createAdminBody = {
    name: createForm.name.value,
    surname: createForm.surname.value,
    patronymic: createForm.patronymic.value,
    photo: imageString
  }
  PostUrl('admins/create', createAdminBody).then((data) => {
    adminsTableValue = data;
    updateAdmins();
    imageString = '';
    createAdminDialog.close();
  }).catch((error) => {
    imageString = '';
    console.error(error)
  })

}

var editAdminDialog = document.querySelector('#editAdminDialog');
document.querySelector('#openEditAdminDialog').onclick = function() {
  editForm.nameEdit.value = adminsTableValue[selectedRowAdmins].name
  editForm.surnameEdit.value = adminsTableValue[selectedRowAdmins].surname
  editForm.patronymicEdit.value = adminsTableValue[selectedRowAdmins].patronymic
  editAdminDialog.show();
}
document.querySelector('#editAdminDialogClose').onclick = function() {
  editAdminDialog.close();
}
document.querySelector('#editAdminDialogSave').onclick = function() {
  const editAdminBody = {
    name: editForm.nameEdit.value,
    surname: editForm.surnameEdit.value,
    patronymic: editForm.patronymicEdit.value,
    photo: imageString,
  }
  PostUrl('admins/edit', editAdminBody).then((data) => {
    adminsTableValue = data;
    updateAdmins();
    imageString = '';
    editAdminDialog.close();
  }).catch((error) => {
    imageString = '';
    console.error(error)
  })
}

getAdmins()



function getAdmins() {
  GetUrl("admins/all").then((data) => {
    adminsTableValue = data;
    updateAdmins();
  }).catch((error) => console.log(error))
}

function updateAdmins() {
  if (adminsTableValue[0]) {
    firstRowAllName.textContent = adminsTableValue[0].name
    firstRowAllSurname.textContent = adminsTableValue[0].surname
    firstRowAllPatronymic.textContent = adminsTableValue[0].patronymic
  } else {
    firstRowAllName.textContent = ''
    firstRowAllSurname.textContent = ''
    firstRowAllPatronymic.textContent = ''
  }

  if (adminsTableValue[1]) {
    secondRowAllName.textContent = adminsTableValue[1].name
    secondRowAllSurname.textContent = adminsTableValue[1].surname
    secondRowAllPatronymic.textContent = adminsTableValue[1].patronymic
  } else {
    secondRowAllName.textContent = ''
    secondRowAllSurname.textContent = ''
    secondRowAllPatronymic.textContent = ''
  }

  if (adminsTableValue[2]) {
    thirdRowAllName.textContent = adminsTableValue[2].name
    thirdRowAllSurname.textContent = adminsTableValue[2].surname
    thirdRowAllPatronymic.textContent = adminsTableValue[2].patronymic
  } else {
    thirdRowAllName.textContent = ''
    thirdRowAllSurname.textContent = ''
    thirdRowAllPatronymic.textContent = ''
  }

  if (adminsTableValue[3]) {
    fourthRowAllName.textContent = adminsTableValue[3].name
    fourthRowAllSurname.textContent = adminsTableValue[3].surname
    fourthRowAllPatronymic.textContent = adminsTableValue[3].patronymic
  } else {
    fourthRowAllName.textContent = ''
    fourthRowAllSurname.textContent = ''
    fourthRowAllPatronymic.textContent = ''
  }

  if (adminsTableValue[4]) {
    fifthRowAllName.textContent = adminsTableValue[4].name
    fifthRowAllSurname.textContent = adminsTableValue[4].surname
    fifthRowAllPatronymic.textContent = adminsTableValue[4].patronymic
  } else {
    fifthRowAllName.textContent = ''
    fifthRowAllSurname.textContent = ''
    fifthRowAllPatronymic.textContent = ''
  }

  if (adminsTableValue[5]) {
    sixthRowAllName.textContent = adminsTableValue[5].name
    sixthRowAllSurname.textContent = adminsTableValue[5].surname
    sixthRowAllPatronymic.textContent = adminsTableValue[5].patronymic
  } else {
    sixthRowAllName.textContent = ''
    sixthRowAllSurname.textContent = ''
    sixthRowAllPatronymic.textContent = ''
  }

  if (adminsTableValue[6]) {
    seventhRowAllName.textContent = adminsTableValue[6].name
    seventhRowAllSurname.textContent = adminsTableValue[6].surname
    seventhRowAllPatronymic.textContent = adminsTableValue[6].patronymic
  } else {
    seventhRowAllName.textContent = ''
    seventhRowAllSurname.textContent = ''
    seventhRowAllPatronymic.textContent = ''
  }

  if (adminsTableValue[7]) {
    eighthRowAllName.textContent = adminsTableValue[7].name
    eighthRowAllSurname.textContent = adminsTableValue[7].surname
    eighthRowAllPatronymic.textContent = adminsTableValue[7].patronymic
  } else {
    eighthRowAllName.textContent = ''
    eighthRowAllSurname.textContent = ''
    eighthRowAllPatronymic.textContent = ''
  }
}

firstRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 0) {
    firstRowAllCell1.classList.remove("cell")
    firstRowAllCell1.classList.add("cell-selected")
    firstRowAllCell2.classList.remove("cell")
    firstRowAllCell2.classList.add("cell-selected")
    firstRowAllCell3.classList.remove("cell")
    firstRowAllCell3.classList.add("cell-selected")

    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")

    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")

    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")

    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")

    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")

    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")

    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")

    selectedRowAdmins = 0;
  } else {
    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

secondRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 1) {
    secondRowAllCell1.classList.remove("cell")
    secondRowAllCell1.classList.add("cell-selected")
    secondRowAllCell2.classList.remove("cell")
    secondRowAllCell2.classList.add("cell-selected")
    secondRowAllCell3.classList.remove("cell")
    secondRowAllCell3.classList.add("cell-selected")

    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")

    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")

    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")

    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")

    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")

    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")

    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")

    selectedRowAdmins = 1;
  } else {
    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

thirdRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 2) {
    thirdRowAllCell1.classList.remove("cell")
    thirdRowAllCell1.classList.add("cell-selected")
    thirdRowAllCell2.classList.remove("cell")
    thirdRowAllCell2.classList.add("cell-selected")
    thirdRowAllCell3.classList.remove("cell")
    thirdRowAllCell3.classList.add("cell-selected")

    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")

    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")

    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")

    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")

    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")

    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")

    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")

    selectedRowAdmins = 2;
  } else {
    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

fourthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 3) {
    fourthRowAllCell1.classList.remove("cell")
    fourthRowAllCell1.classList.add("cell-selected")
    fourthRowAllCell2.classList.remove("cell")
    fourthRowAllCell2.classList.add("cell-selected")
    fourthRowAllCell3.classList.remove("cell")
    fourthRowAllCell3.classList.add("cell-selected")

    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")

    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")

    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")

    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")

    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")

    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")

    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")

    selectedRowAdmins = 3;
  } else {
    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

fifthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 4) {
    fifthRowAllCell1.classList.remove("cell")
    fifthRowAllCell1.classList.add("cell-selected")
    fifthRowAllCell2.classList.remove("cell")
    fifthRowAllCell2.classList.add("cell-selected")
    fifthRowAllCell3.classList.remove("cell")
    fifthRowAllCell3.classList.add("cell-selected")

    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")

    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")

    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")

    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")

    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")

    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")

    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")

    selectedRowAdmins = 4;
  } else {
    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

sixthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 5) {
    sixthRowAllCell1.classList.remove("cell")
    sixthRowAllCell1.classList.add("cell-selected")
    sixthRowAllCell2.classList.remove("cell")
    sixthRowAllCell2.classList.add("cell-selected")
    sixthRowAllCell3.classList.remove("cell")
    sixthRowAllCell3.classList.add("cell-selected")

    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")

    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")

    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")

    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")

    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")

    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")

    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")

    selectedRowAdmins = 5;
  } else {
    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

seventhRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 6) {
    seventhRowAllCell1.classList.remove("cell")
    seventhRowAllCell1.classList.add("cell-selected")
    seventhRowAllCell2.classList.remove("cell")
    seventhRowAllCell2.classList.add("cell-selected")
    seventhRowAllCell3.classList.remove("cell")
    seventhRowAllCell3.classList.add("cell-selected")

    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")

    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")

    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")

    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")

    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")

    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")

    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")

    selectedRowAdmins = 6;
  } else {
    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

eighthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 7) {
    eighthRowAllCell1.classList.remove("cell")
    eighthRowAllCell1.classList.add("cell-selected")
    eighthRowAllCell2.classList.remove("cell")
    eighthRowAllCell2.classList.add("cell-selected")
    eighthRowAllCell3.classList.remove("cell")
    eighthRowAllCell3.classList.add("cell-selected")

    secondRowAllCell1.classList.remove("cell-selected")
    secondRowAllCell1.classList.add("cell")
    secondRowAllCell2.classList.remove("cell-selected")
    secondRowAllCell2.classList.add("cell")
    secondRowAllCell3.classList.remove("cell-selected")
    secondRowAllCell3.classList.add("cell")

    thirdRowAllCell1.classList.remove("cell-selected")
    thirdRowAllCell1.classList.add("cell")
    thirdRowAllCell2.classList.remove("cell-selected")
    thirdRowAllCell2.classList.add("cell")
    thirdRowAllCell3.classList.remove("cell-selected")
    thirdRowAllCell3.classList.add("cell")

    fourthRowAllCell1.classList.remove("cell-selected")
    fourthRowAllCell1.classList.add("cell")
    fourthRowAllCell2.classList.remove("cell-selected")
    fourthRowAllCell2.classList.add("cell")
    fourthRowAllCell3.classList.remove("cell-selected")
    fourthRowAllCell3.classList.add("cell")

    fifthRowAllCell1.classList.remove("cell-selected")
    fifthRowAllCell1.classList.add("cell")
    fifthRowAllCell2.classList.remove("cell-selected")
    fifthRowAllCell2.classList.add("cell")
    fifthRowAllCell3.classList.remove("cell-selected")
    fifthRowAllCell3.classList.add("cell")

    sixthRowAllCell1.classList.remove("cell-selected")
    sixthRowAllCell1.classList.add("cell")
    sixthRowAllCell2.classList.remove("cell-selected")
    sixthRowAllCell2.classList.add("cell")
    sixthRowAllCell3.classList.remove("cell-selected")
    sixthRowAllCell3.classList.add("cell")

    seventhRowAllCell1.classList.remove("cell-selected")
    seventhRowAllCell1.classList.add("cell")
    seventhRowAllCell2.classList.remove("cell-selected")
    seventhRowAllCell2.classList.add("cell")
    seventhRowAllCell3.classList.remove("cell-selected")
    seventhRowAllCell3.classList.add("cell")

    firstRowAllCell1.classList.remove("cell-selected")
    firstRowAllCell1.classList.add("cell")
    firstRowAllCell2.classList.remove("cell-selected")
    firstRowAllCell2.classList.add("cell")
    firstRowAllCell3.classList.remove("cell-selected")
    firstRowAllCell3.classList.add("cell")

    selectedRowAdmins = 7;
  } else {
    eighthRowAllCell1.classList.remove("cell-selected")
    eighthRowAllCell1.classList.add("cell")
    eighthRowAllCell2.classList.remove("cell-selected")
    eighthRowAllCell2.classList.add("cell")
    eighthRowAllCell3.classList.remove("cell-selected")
    eighthRowAllCell3.classList.add("cell")
    selectedRowAdmins = -1;
  }
})

function imageUploaded() {
  var file = document.querySelector(
    'input[type=file]')['files'][0];

  var reader = new FileReader();

  reader.onload = function () {
    imageString = reader.result;
  }
  reader.readAsDataURL(file);
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
