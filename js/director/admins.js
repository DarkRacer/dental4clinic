var deleteDialog = document.querySelector('#deleteDialog');
document.querySelector('#openDeleteDialog').onclick = function() {
  deleteDialog.show();
}
document.querySelector('#deleteDialogClose').onclick = function() {
  deleteDialog.close();
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
  createAdminDialog.close();
}

var editAdminDialog = document.querySelector('#editAdminDialog');
document.querySelector('#openEditAdminDialog').onclick = function() {
  editAdminDialog.show();
}
document.querySelector('#editAdminDialogClose').onclick = function() {
  editAdminDialog.close();
}
document.querySelector('#editAdminDialogSave').onclick = function() {
  editAdminDialog.close();
}
