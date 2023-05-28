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
  editDoctorDialog.close();
  doctorsDialog.show();
}
document.querySelector('#editDoctorDialogSave').onclick = function() {
  editDoctorDialog.close();
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
  deleteDoctorDialog.close();
}

var servicesDoctorDialog = document.querySelector('#servicesDoctorDialog');
document.querySelector('#openCreateServicesDoctorDialog').onclick = function() {
  servicesDoctorDialog.show();
}
document.querySelector('#openEditServicesDoctorDialog').onclick = function() {
  servicesDoctorDialog.show();
}
document.querySelector('#openServicesDoctorDialog').onclick = function() {
  servicesDoctorDialog.show();
}
document.querySelector('#servicesDoctorDialogClose').onclick = function() {
  servicesDoctorDialog.close();
}


