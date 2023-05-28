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
