var toothPictureDialog = document.querySelector('#toothPicture');
document.querySelector('#openToothPicture').onclick = function() {
  toothPictureDialog.show();
}
document.querySelector('#toothPictureClose').onclick = function() {
  toothPictureDialog.close();
}

var diagnosisDialog = document.querySelector('#diagnosisDialog');
document.querySelector('#openDiagnosisDialog').onclick = function() {
  diagnosisDialog.show();
}
document.querySelector('#diagnosisDialogClose').onclick = function() {
  diagnosisDialog.close();
}
