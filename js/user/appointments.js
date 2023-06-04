const url ='https://localhost:8000/';
var token = GetCookie("access_token")
const headers = {
  "Host": "localhost:8000",
  "Origin": "https://localhost:8000",
  "Accept": "*/*"
}
var userId = 1;

const monthName = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
const date = new Date();
let currentDiffMonth = 0;
const monthBefore = document.getElementById("monthBefore");
const monthNext = document.getElementById("monthNext");
const calendarDateGroup = document.getElementById("calendarDateGroup");
const calendarTitle = document.getElementById("calendarTitle");
const contactBodyInfo = document.getElementById("contactBodyInfo");
const submitForm = document.getElementById("submitForm");
const submitButton = document.getElementById("submitButton");
let calendarDateGroupChild = [];
let calendarDateAppointments = [];

monthBefore.addEventListener("click", (e) => {
  currentDiffMonth--;
  const newDate = changeMonths(date, currentDiffMonth);
  createCalendar(newDate.getMonth(), newDate.getFullYear())
})
monthNext.addEventListener("click", (e) => {
  currentDiffMonth++;
  const newDate = changeMonths(date, currentDiffMonth);
  createCalendar(newDate.getMonth(), newDate.getFullYear())
})

submitButton.addEventListener("click", (e) => {
  const name = submitForm.name.value;
  const phone = submitForm.phone.value;
  const description = submitForm.description.value

  const requestBody = {
    name: name,
    phone: phone,
    description: description
  }
  PostUrl('request/create', requestBody).then(() => alert("Заявка отправлена")).catch((error) => alert("Заявка не отправлена"))
});

getAppointments()
getUserInfo()

function getAppointments() {
  GetUrl(`appointments/user/${userId}`).then((data) => {
    calendarDateAppointments = data;
    createCalendar(date.getMonth(), date.getFullYear());
  }).catch((error) => {
    console.error(error)
    createCalendar(date.getMonth(), date.getFullYear())
  })
}

function getUserInfo() {
  GetUrl(`user/${userId}`).then(data => {
    contactBodyInfo.innerText = data.name + ", мы рады что вы пользуетесь нашими услугами, вы можете посмотреть ваши записи к врачам или запросить звонок, если у Вас возникли вопросы"
  }).catch(error => {
    contactBodyInfo.innerText = "Mы рады что вы пользуетесь нашими услугами, вы можете посмотреть ваши записи к врачам или запросить звонок, если у Вас возникли вопросы"
    console.error(error)
  });
}

function getInfoByDate({date, appointments}, month, year) {
  contactBodyInfo.innerText = `${date} ${monthName[month]} ${year} :
`
  appointments.forEach((appointment) => {
    contactBodyInfo.innerText += `${appointment.datetime} - ${appointment['doctor-name']} - ${appointment['service-name']}
`
  })
}

function createCalendar(month, year) {
  calendarDateGroupChild.forEach((child) => {
    calendarDateGroup.removeChild(child);
  })
  calendarDateGroupChild = [];
  calendarTitle.innerText = monthName[month] + " " + year;
  let weekMap = createNewWeekMap();
  let lastWeek = true;
  for (let day = 1; day <= daysInMonth(month, year); day++) {
    var d = new Date(year, month, day);
    let appointments = calendarDateAppointments.filter((appointment) => {
      var appointmentDate = new Date(appointment.date);
      appointmentDate.setHours(0,0,0,0)
      return appointmentDate.getTime() === d.getTime()
    });
    if (appointments.length === 0) {
      appointments = null;
    }
    if (d.getDay() === 0) {
      weekMap.set(6, {date: day, appointments: appointments})
      let calendarDateGroupRow = createCalendarDateGroupRow(weekMap, month, year)
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
    let calendarDateGroupRow = createCalendarDateGroupRow(weekMap, month, year)
    calendarDateGroup.appendChild(calendarDateGroupRow);
    calendarDateGroupChild.push(calendarDateGroupRow)
  }

}

function createNewWeekMap() {
  let weekMap =  new Map();
  weekMap.set(0, {date: 0, appointments: null});
  weekMap.set(1, {date: 0, appointments: null});
  weekMap.set(2, {date: 0, appointments: null});
  weekMap.set(3, {date: 0, appointments: null});
  weekMap.set(4, {date: 0, appointments: null});
  weekMap.set(5, {date: 0, appointments: null});
  weekMap.set(6, {date: 0, appointments: null});
  return weekMap;
}

function createCalendarDateGroupRow(weekMap, month, year) {
  let calendarDateGroupRow = document.createElement('div');
  calendarDateGroupRow.classList.add("calendar-date-group-row");

  for (let day of weekMap.values()) {
    let calendarDate = document.createElement('div');
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



function GetCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function GetUrl(getUrl) {
  return fetch(url + getUrl, {
    method: 'GET',
    headers: headers
  })
    .then(response => response.json())
}

function PostUrl(postUrl, body) {
  return fetch(url + postUrl, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(body)
  })
    .then(response => response)
}