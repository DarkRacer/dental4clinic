import { post } from "../core/rest.js";
import {GenericUser} from "../core/model/user.js";
import {changeClassRows} from "../core/table.js";

const firstRowAll = document.getElementById("firstRowAll");
const firstRowAllCell1 = document.getElementById("firstRowAllCell1");
const firstRowAllName = document.getElementById("firstRowAllName");
const firstRowAllCell2 = document.getElementById("firstRowAllCell2");
const firstRowAllSurname = document.getElementById("firstRowAllSurname");
const firstRowAllCell3 = document.getElementById("firstRowAllCell3");
const firstRowAllPatronymic = document.getElementById("firstRowAllPatronymic");

const secondRowAll = document.getElementById("secondRowAll");
const secondRowAllCell1 = document.getElementById("secondRowAllCell1");
const secondRowAllName = document.getElementById("secondRowAllName");
const secondRowAllCell2 = document.getElementById("secondRowAllCell2");
const secondRowAllSurname = document.getElementById("secondRowAllSurname");
const secondRowAllCell3 = document.getElementById("secondRowAllCell3");
const secondRowAllPatronymic = document.getElementById("secondRowAllPatronymic");

const thirdRowAll = document.getElementById("thirdRowAll");
const thirdRowAllCell1 = document.getElementById("thirdRowAllCell1");
const thirdRowAllName = document.getElementById("thirdRowAllName");
const thirdRowAllCell2 = document.getElementById("thirdRowAllCell2");
const thirdRowAllSurname = document.getElementById("thirdRowAllSurname");
const thirdRowAllCell3 = document.getElementById("thirdRowAllCell3");
const thirdRowAllPatronymic = document.getElementById("thirdRowAllPatronymic");

const fourthRowAll = document.getElementById("fourthRowAll");
const fourthRowAllCell1 = document.getElementById("fourthRowAllCell1");
const fourthRowAllName = document.getElementById("fourthRowAllName");
const fourthRowAllCell2 = document.getElementById("fourthRowAllCell2");
const fourthRowAllSurname = document.getElementById("fourthRowAllSurname");
const fourthRowAllCell3 = document.getElementById("fourthRowAllCell3");
const fourthRowAllPatronymic = document.getElementById("fourthRowAllPatronymic");

const fifthRowAll = document.getElementById("fifthRowAll");
const fifthRowAllCell1 = document.getElementById("fifthRowAllCell1");
const fifthRowAllName = document.getElementById("fifthRowAllName");
const fifthRowAllCell2 = document.getElementById("fifthRowAllCell2");
const fifthRowAllSurname = document.getElementById("fifthRowAllSurname");
const fifthRowAllCell3 = document.getElementById("fifthRowAllCell3");
const fifthRowAllPatronymic = document.getElementById("fifthRowAllPatronymic");

const sixthRowAll = document.getElementById("sixthRowAll");
const sixthRowAllCell1 = document.getElementById("sixthRowAllCell1");
const sixthRowAllName = document.getElementById("sixthRowAllName");
const sixthRowAllCell2 = document.getElementById("sixthRowAllCell2");
const sixthRowAllSurname = document.getElementById("sixthRowAllSurname");
const sixthRowAllCell3 = document.getElementById("sixthRowAllCell3");
const sixthRowAllPatronymic = document.getElementById("sixthRowAllPatronymic");

const seventhRowAll = document.getElementById("seventhRowAll");
const seventhRowAllCell1 = document.getElementById("seventhRowAllCell1");
const seventhRowAllName = document.getElementById("seventhRowAllName");
const seventhRowAllCell2 = document.getElementById("seventhRowAllCell2");
const seventhRowAllSurname = document.getElementById("seventhRowAllSurname");
const seventhRowAllCell3 = document.getElementById("seventhRowAllCell3");
const seventhRowAllPatronymic = document.getElementById("seventhRowAllPatronymic");

const eighthRowAll = document.getElementById("eighthRowAll");
const eighthRowAllCell1 = document.getElementById("eighthRowAllCell1");
const eighthRowAllName = document.getElementById("eighthRowAllName");
const eighthRowAllCell2 = document.getElementById("eighthRowAllCell2");
const eighthRowAllSurname = document.getElementById("eighthRowAllSurname");
const eighthRowAllCell3 = document.getElementById("eighthRowAllCell3");
const eighthRowAllPatronymic = document.getElementById("eighthRowAllPatronymic");

const createForm = document.getElementById("create-form");
const editForm = document.getElementById("edit-form");
const photoField = document.getElementById("photo");
const photoEditField = document.getElementById("photoEdit");

let adminsTableValue = [];
let selectedRowAdmins = -1;
let imageString ='';
let fileName ='';

const deleteDialog = document.querySelector('#deleteDialog');
document.querySelector('#openDeleteDialog').onclick = () => {
  deleteDialog.style.display = 'flex';
  deleteDialog.show();
}
document.querySelector('#deleteDialogClose').onclick = () => {
  post('admins/delete', adminsTableValue[selectedRowAdmins]).then((data) => {
    updateAdminTableValue(data);
    deleteDialog.style.display = null;
    deleteDialog.close();
  }).catch((error) => console.error(error))

}
document.querySelector('#backButtonDeleteDialogClose').onclick = () => {
  deleteDialog.style.display = null;
  deleteDialog.close();
}

const createAdminDialog = document.querySelector('#createAdminDialog');
document.querySelector('#openCreateAdminDialog').onclick = () => {
  createAdminDialog.style.display = 'flex';
  createAdminDialog.show();
}
document.querySelector('#createAdminDialogClose').onclick = () => {
  createAdminDialog.style.display = null;
  createAdminDialog.close();
}
document.querySelector('#createAdminDialogSave').onclick = () => {
  const createAdminBody = new GenericUser(
    null,
    createForm.name.value,
    createForm.surname.value,
    createForm.patronymic.value,
    imageString,
    fileName
  )
  post('admins/create', createAdminBody).then((data) => {
    updateAdminTableValue(data);
    createAdminDialog.style.display = null;
    createAdminDialog.close();
  }).catch((error) => {
    imageString = '';
    console.error(error)
  })

}

const editAdminDialog = document.querySelector('#editAdminDialog');
document.querySelector('#openEditAdminDialog').onclick = () => {
  editForm.nameEdit.value = adminsTableValue[selectedRowAdmins].name
  editForm.surnameEdit.value = adminsTableValue[selectedRowAdmins].surname
  editForm.patronymicEdit.value = adminsTableValue[selectedRowAdmins].patronymic
  editAdminDialog.style.display = 'flex';
  editAdminDialog.show();
}
document.querySelector('#editAdminDialogClose').onclick = () => {
  editAdminDialog.style.display = null;
  editAdminDialog.close();
}
document.querySelector('#editAdminDialogSave').onclick = () => {
  const editAdminBody = new GenericUser(
    adminsTableValue[selectedRowAdmins].id,
    editForm.nameEdit.value,
    editForm.surnameEdit.value,
    editForm.patronymicEdit.value,
    imageString,
    fileName
  )
  post('admins/edit', editAdminBody).then((data) => {
    updateAdminTableValue(data);
    editAdminDialog.close();
  }).catch((error) => {
    imageString = '';
    console.error(error)
  })
}

const getAdmins = () => {
  post("admins/all").then((data) => {
    updateAdminTableValue(data);
  }).catch((error) => console.log(error))
}

getAdmins()

const updateAdmins = () => {
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
    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3
    ], "cell", "cell-selected")

    changeClassRows([
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3,
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3,
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3,
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3,
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3,
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3,
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 0;
  } else {
    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

secondRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 1) {
    changeClassRows([
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3
    ], "cell", "cell-selected")

    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3,
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3,
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3,
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3,
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3,
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3,
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 1;
  } else {
    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

thirdRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 2) {
    changeClassRows([
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3
    ], "cell", "cell-selected")

    changeClassRows([
      firstRowAllCell1,
      firstRowAllCell2,
      firstRowAllCell3,
      secondRowAllCell1,
      secondRowAllCell2,
      secondRowAllCell3,
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3,
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3,
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3,
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3,
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 2;
  } else {
    changeClassRows([
      thirdRowAllCell1,
      thirdRowAllCell2,
      thirdRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

fourthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 3) {
    changeClassRows([
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3
    ], "cell", "cell-selected")

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
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3,
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3,
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3,
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 3;
  } else {
    changeClassRows([
      fourthRowAllCell1,
      fourthRowAllCell2,
      fourthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

fifthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 4) {
    changeClassRows([
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3
    ], "cell", "cell-selected")

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
      fourthRowAllCell3,
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3,
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3,
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 4;
  } else {
    changeClassRows([
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

sixthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 5) {
    changeClassRows([
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3
    ], "cell", "cell-selected")

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
      fourthRowAllCell3,
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3,
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3,
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 5;
  } else {
    changeClassRows([
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

seventhRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 6) {
    changeClassRows([
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3
    ], "cell", "cell-selected")

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
      fourthRowAllCell3,
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3,
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3,
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 6;
  } else {
    changeClassRows([
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

eighthRowAll.addEventListener("click", (e) => {
  if (selectedRowAdmins !== 7) {
    changeClassRows([
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell", "cell-selected")

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
      fourthRowAllCell3,
      fifthRowAllCell1,
      fifthRowAllCell2,
      fifthRowAllCell3,
      sixthRowAllCell1,
      sixthRowAllCell2,
      sixthRowAllCell3,
      seventhRowAllCell1,
      seventhRowAllCell2,
      seventhRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = 7;
  } else {
    changeClassRows([
      eighthRowAllCell1,
      eighthRowAllCell2,
      eighthRowAllCell3
    ], "cell-selected", "cell")

    selectedRowAdmins = -1;
  }
})

photoField.addEventListener("change", (e) => {
  imageUploaded();
})
photoEditField.addEventListener("change", (e) => {
  imageUploaded();
})

const imageUploaded = () => {
  const file = document.querySelector(
    'input[type=file]')['files'][0];

  const reader = new FileReader();
  fileName = file.name;

  reader.onload = () => imageString = reader.result;
  reader.readAsDataURL(file);
}

const updateAdminTableValue = (data) => {
  adminsTableValue = data;
  updateAdmins();
  imageString = '';
}
