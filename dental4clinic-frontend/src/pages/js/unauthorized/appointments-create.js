import { postWithoutResponse } from "../core/rest.js";
import {filteredDoctorsTableValue, initAppointmentsCreate} from "../core/page/appointments-create.js";
import * as pageElements from "../core/elements/appointments-create.js";
import {changeClassRows} from "../core/table.js";
import {AppointmentBodyUnauthorized} from "../core/model/appointment.js";

let selectedRow;

initAppointmentsCreate();

pageElements.firstRow.addEventListener("click", (e) => {
  if (selectedRow !== 0) {
    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.secondRowCell1,
      pageElements.secondRowCell2,
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2,
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 0;
  } else {
    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

pageElements.secondRow.addEventListener("click", (e) => {
  if (selectedRow !== 1) {
    changeClassRows([
      pageElements.secondRowCell1,
      pageElements.secondRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2,
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2,
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 1;
  } else {
    changeClassRows([
      pageElements.secondRowCell1,
      pageElements.secondRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

pageElements.thirdRow.addEventListener("click", (e) => {
  if (selectedRow !== 2) {
    changeClassRows([
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2,
      pageElements.secondRowCell1,
      pageElements.secondRowCell2,
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 2;
  } else {
    changeClassRows([
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

pageElements.recordButton.addEventListener("click", (e) => {
  e.preventDefault();
  const name = pageElements.appointmentForm.name.value;
  const description = pageElements.appointmentForm.description.value;
  const phone = pageElements.appointmentForm.phone.value;
  const surname = pageElements.appointmentForm.surname.value;
  const date = pageElements.appointmentForm.date.value;
  const datetime = pageElements.appointmentForm.datetime.value;

  if (selectedRow >= 0) {
    const appointmentBody = new AppointmentBodyUnauthorized(
      name,
      date,
      datetime,
      description,
      filteredDoctorsTableValue[selectedRow][`doctor-id`],
      phone,
      surname
  );

    postWithoutResponse("appointments/create/unauthorized", appointmentBody).then(data => {
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
})
