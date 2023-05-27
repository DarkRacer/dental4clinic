var patientWithoutCalendarDialog = document.querySelector('#patientWithoutCalendarDialog');
document.querySelector('#openPatientWithoutCalendarDialog').onclick = function() {
  patientWithoutCalendarDialog.show();
}
document.querySelector('#patientWithoutCalendarDialogClose').onclick = function() {
  patientWithoutCalendarDialog.close();
}

var infoPatientDialog = document.querySelector('#infoPatientDialog');
document.querySelector('#openInfoPatientDialog').onclick = function() {
  infoPatientDialog.show();
}
document.querySelector('#infoPatientDialogClose').onclick = function() {
  infoPatientDialog.close();
}
