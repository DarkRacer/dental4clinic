var doctorsDialog = document.querySelector('#doctorsDialog');
document.querySelector('#openDoctorsDialog').onclick = function() {
  doctorsDialog.show();
}
document.querySelector('#doctorsDialogClose').onclick = function() {
  doctorsDialog.close();
}

var createDoctorDialog = document.querySelector('#createDoctorDialog');
document.querySelector('#openCreateDoctorDialog').onclick = function() {
  createDoctorDialog.show();
}
document.querySelector('#createDoctorDialogClose').onclick = function() {
  createDoctorDialog.close();
}
document.querySelector('#createDoctorDialogSave').onclick = function() {
  createDoctorDialog.close();
}

var editDoctorDialog = document.querySelector('#editDoctorDialog');
document.querySelector('#openEditDoctorDialog').onclick = function() {
  doctorsDialog.close();
  editDoctorDialog.show();
}
document.querySelector('#editDoctorDialogClose').onclick = function() {
  doctorsDialog.show();
  editDoctorDialog.close();
}
document.querySelector('#editDoctorDialogSave').onclick = function() {
  editDoctorDialog.close();
}

