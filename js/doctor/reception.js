var patientWithoutCalendarDialog = document.querySelector('#patientWithoutCalendarDialog');
document.querySelector('#openPatientWithoutCalendarDialog').onclick = function() {
  patientWithoutCalendarDialog.show();
}
document.querySelector('#patientWithoutCalendarDialogClose').onclick = function() {
  patientWithoutCalendarDialog.close();
}

// var diagnosisDialog = document.querySelector('#diagnosisDialog');
// document.querySelector('#openDiagnosisDialog').onclick = function() {
//   diagnosisDialog.show();
// }
// document.querySelector('#diagnosisDialogClose').onclick = function() {
//   diagnosisDialog.close();
// }
