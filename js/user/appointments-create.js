import { postWithoutResponse } from "../core/rest.js";
import * as pageElements from '../core/elements/appointments-create.js';
import { changeClassRows } from "../core/table.js";
import { filteredDoctorsTableValue, initAppointmentsCreate } from "../core/page/appointments-create.js";
import {AppointmentBodyUser} from "../core/model/appointment.js";

const userId = 1;

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
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
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
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
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
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
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

pageElements.fourthRow.addEventListener("click", (e) => {
  if (selectedRow !== 3) {
    changeClassRows([
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
    ], "cell-recording", "cell-recording-selected")

    changeClassRows([
      pageElements.firstRowCell1,
      pageElements.firstRowCell2,
      pageElements.secondRowCell1,
      pageElements.secondRowCell2,
      pageElements.thirdRowCell1,
      pageElements.thirdRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = 3;
  } else {
    changeClassRows([
      pageElements.fourthRowCell1,
      pageElements.fourthRowCell2
    ], "cell-recording-selected", "cell-recording")

    selectedRow = -1;
  }
})

pageElements.recordButton.addEventListener("click", (e) => {
  e.preventDefault();
  const description = pageElements.appointmentForm.description.value;
  const date = pageElements.appointmentForm.date.value;
  const datetime = pageElements.appointmentForm.datetime.value;

  if (selectedRow >= 0) {
    const appointmentBody = new AppointmentBodyUser(
      userId,
      date,
      datetime,
      description,
      filteredDoctorsTableValue[selectedRow][`doctor-id`]
  );

    postWithoutResponse("appointments/create/user", appointmentBody).then(data => {
      location.assign('/user/appointments');
    })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
})
