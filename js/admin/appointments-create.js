var requestsDialog = document.querySelector('#requestsDialog');
document.querySelector('#openRequestsDialog').onclick = function() {
  requestsDialog.show();
}
document.querySelector('#requestsDialogClose').onclick = function() {
  requestsDialog.close();
}
document.querySelector('#requestsSelectDialogClose').onclick = function() {
  requestsDialog.close();
}
