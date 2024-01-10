<script>
export default {
  data() {
    return {
      date: new Date(),
      calendarDate: new Date(),
      currentDiffMonth: 0,
      monthName: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
    }
  },
  props: {
    appointments: {
      type: Array
    },
    getInfoByDate: {
      type: Function,
    }
  },
  computed: {
    month: function () {
      return this.calendarDate.getMonth()
    },
    year: function () {
      return this.calendarDate.getFullYear()
    },
    weeksInCalendar: function () {
      let weeks = []
      let weekMap = this.createNewWeekMap();
      let lastWeek = true;

      for (let day = 1; day <= this.daysInMonth(this.month, this.year); day++) {
        const d = new Date(this.year, this.month, day);

        let appointments = this.appointments.filter((appointment) => {
          const appointmentDate = new Date(appointment.date);
          appointmentDate.setHours(0,0,0,0)
          return appointmentDate.getTime() === d.getTime()
        });
        if (appointments.length === 0) {
          appointments = null;
        }
        if (d.getDay() === 0) {
          weekMap.set(6, {date: day, appointments: appointments})
          weeks.push(weekMap)
          weekMap = this.createNewWeekMap();
          lastWeek = false;
        } else {
          weekMap.set(d.getDay() - 1, {date: day, appointments: appointments})
          lastWeek = true;
        }
      }
      if (lastWeek) {
        weeks.push(weekMap)
      }

      return weeks
    }
  },
  methods: {
    createNewWeekMap() {
      const weekMap =  new Map();
      weekMap.set(0, {date: 0, appointments: null});
      weekMap.set(1, {date: 0, appointments: null});
      weekMap.set(2, {date: 0, appointments: null});
      weekMap.set(3, {date: 0, appointments: null});
      weekMap.set(4, {date: 0, appointments: null});
      weekMap.set(5, {date: 0, appointments: null});
      weekMap.set(6, {date: 0, appointments: null});
      return weekMap;
    },
    changeMonths(date, months) {
      const dateCopy = new Date(date);
      dateCopy.setMonth(dateCopy.getMonth() + months);
      return dateCopy;
    },
    daysInMonth(month, year) {
      return new Date(year, month+1, 0).getDate();
    },
    monthBefore() {
      this.currentDiffMonth--
      this.calendarDate = this.changeMonths(this.date, this.currentDiffMonth);
    },
    monthNext() {
      this.currentDiffMonth++
      this.calendarDate = this.changeMonths(this.date, this.currentDiffMonth);
    }
  }
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-month-year">
      <img class="calendar-month-before" src="../img/arrow.png" id="monthBefore" @click="monthBefore"/>
      <div class="calendar-month-year-content" v-text="this.monthName[this.month] + ' ' + this.year">       </div>
      <img class="calendar-month-next" src="../img/arrow.png" id="monthNext" @click="monthNext"/>
    </div>
    <div class="calendar-date-group" id="calendarDateGroup">
      <div class="calendar-date-group-row">
        <div class="week-day">Понедельник</div>
        <div class="week-day">Вторник</div>
        <div class="week-day">Среда</div>
        <div class="week-day">Четверг</div>
        <div class="week-day">Пятница</div>
        <div class="week-day">Суббота</div>
        <div class="week-day">Воскресенье</div>
      </div>
      <div class="calendar-date-group-row" v-for="weekMap in weeksInCalendar">
        <div class="date" v-for="day in weekMap.values()">
          <div class="date-selected" v-if="day.appointments" @click="getInfoByDate(day, this.month, this.year)" v-text="day.date !== 0 ? day.date : ''"></div>
          <div class="calendar-date" v-else v-text="day.date !== 0 ? day.date : ''"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "../../src/main.scss";
</style>
