var createPriceDialog = document.querySelector('#createPriceDialog');
document.querySelector('#openCreatePriceDialog').onclick = function() {
  createPriceDialog.show();
}
document.querySelector('#createPriceDialogClose').onclick = function() {
  createPriceDialog.close();
}
document.querySelector('#createPriceDialogSave').onclick = function() {
  createPriceDialog.close();
}

var pricesDialog = document.querySelector('#pricesDialog');
document.querySelector('#openPricesDialog').onclick = function() {
  pricesDialog.show();
}
document.querySelector('#pricesDialogClose').onclick = function() {
  pricesDialog.close();
}

var editPriceDialog = document.querySelector('#editPriceDialog');
document.querySelector('#openEditPriceDialog').onclick = function() {
  pricesDialog.close();
  editPriceDialog.show();
}
document.querySelector('#editPriceDialogClose').onclick = function() {
  editPriceDialog.close();
}
document.querySelector('#editPriceDialogSave').onclick = function() {
  editPriceDialog.close();
}
