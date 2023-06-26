const monthName = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const date = new Date();
let currentDiffMonth = 0;
const monthBefore = document.getElementById("monthBefore");
const monthNext = document.getElementById("monthNext");
const calendarDateGroup = document.getElementById("calendarDateGroup");
let calendarTitle = document.getElementById("calendarTitle");
let calendarDateGroupChild = [];
let calendarDateAppointments = [];
let currentInfoByDate = ({date, appointments}, month, year) => {};

monthBefore.addEventListener("click", (e) => {
  currentDiffMonth--;
  const newDate = changeMonths(date, currentDiffMonth);
  createCalendar(calendarDateAppointments, newDate.getMonth(), newDate.getFullYear())
})
monthNext.addEventListener("click", (e) => {
  currentDiffMonth++;
  const newDate = changeMonths(date, currentDiffMonth);
  createCalendar(calendarDateAppointments, newDate.getMonth(), newDate.getFullYear())
})

function createCalendar(data, month, year, getInfoByDate = currentInfoByDate, reset = false) {
  if (reset) {
    currentDiffMonth = 0;
  }
  currentInfoByDate = getInfoByDate;
  calendarDateAppointments = data;
  calendarDateGroupChild.forEach((child) => {
    calendarDateGroup.removeChild(child);
  })
  calendarDateGroupChild = [];
  calendarTitle.innerText = monthName[month] + " " + year;
  let weekMap = createNewWeekMap();
  let lastWeek = true;
  for (let day = 1; day <= daysInMonth(month, year); day++) {
    const d = new Date(year, month, day);
    let appointments = calendarDateAppointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0,0,0,0)
      return appointmentDate.getTime() === d.getTime()
    });
    if (appointments.length === 0) {
      appointments = null;
    }
    if (d.getDay() === 0) {
      weekMap.set(6, {date: day, appointments: appointments})
      const calendarDateGroupRow = createCalendarDateGroupRow(weekMap, month, year, getInfoByDate)
      calendarDateGroup.appendChild(calendarDateGroupRow);
      calendarDateGroupChild.push(calendarDateGroupRow);
      weekMap = createNewWeekMap();
      lastWeek = false;
    } else {
      weekMap.set(d.getDay() - 1, {date: day, appointments: appointments})
      lastWeek = true;
    }
  }

  if (lastWeek) {
    const calendarDateGroupRow = createCalendarDateGroupRow(weekMap, month, year, getInfoByDate)
    calendarDateGroup.appendChild(calendarDateGroupRow);
    calendarDateGroupChild.push(calendarDateGroupRow)
  }

}

function createNewWeekMap() {
  const weekMap =  new Map();
  weekMap.set(0, {date: 0, appointments: null});
  weekMap.set(1, {date: 0, appointments: null});
  weekMap.set(2, {date: 0, appointments: null});
  weekMap.set(3, {date: 0, appointments: null});
  weekMap.set(4, {date: 0, appointments: null});
  weekMap.set(5, {date: 0, appointments: null});
  weekMap.set(6, {date: 0, appointments: null});
  return weekMap;
}

function createCalendarDateGroupRow(weekMap, month, year, getInfoByDate) {
  const calendarDateGroupRow = document.createElement('div');
  calendarDateGroupRow.classList.add("calendar-date-group-row");

  for (const day of weekMap.values()) {
    const calendarDate = document.createElement('div');
    if (day.appointments) {
      calendarDate.classList.add("date-selected");
      calendarDate.addEventListener("click", (e) => {
        getInfoByDate(day, month, year);
      })
    } else {
      calendarDate.classList.add("calendar-date");
    }

    if (day.date !== 0) {
      calendarDate.innerText = day.date;
    }

    calendarDateGroupRow.appendChild(calendarDate);
  }

  return calendarDateGroupRow;
}
function changeMonths(date, months) {
  const dateCopy = new Date(date);

  dateCopy.setMonth(dateCopy.getMonth() + months);

  return dateCopy;
}

function daysInMonth (month, year) {
  return new Date(year, month+1, 0).getDate();
}

export { createCalendar, monthName }
