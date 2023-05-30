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

var deletePriceDialog = document.querySelector('#deletePriceDialog');
document.querySelector('#openDeletePriceDialog').onclick = function() {
  pricesDialog.close();
  deletePriceDialog.show();
}
document.querySelector('#deletePriceDialogClose').onclick = function() {
  deletePriceDialog.close();
}
document.querySelector('#backButtonDeletePriceDialogClose').onclick = function() {
  deletePriceDialog.close();
  pricesDialog.show();
}

let goToTop = document.getElementById("goToTop");
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTop.style.display = "block";
  } else {
    goToTop.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
