var dialog = document.querySelector('#toothPicture');
document.querySelector('#openToothPicture').onclick = function() {
  dialog.show();
}
document.querySelector('#toothPictureClose').onclick = function() {
  dialog.close();
}
