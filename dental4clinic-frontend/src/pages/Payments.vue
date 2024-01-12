<script>
import {changeClassRows} from "@/pages/js/core/table.js";
import {get, post} from "@/pages/js/core/rest.js";

export default {
  data() {
    return {
      paymentsTableValue: [],
      selectedIndex: -1
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getPayments()
      },
      { immediate: true }
    )
  },
  methods: {
    getPayments: function () {
      get('payments/all').then((data) => {
        this.paymentsTableValue = data
      }).catch((error) => console.error(error))
    },
    getSelectedPayment: function() {
      return this.selectedIndex > -1 ? this.paymentsTableValue[this.selectedIndex] : null;
    },
    paymentActiveMapper: function (isActive) {
      return isActive ? '' : 'Оплачено'
    },
    paid: function () {
      const paymentsToUpdate = this.getSelectedPayment()
      if (paymentsToUpdate) {
        paymentsToUpdate.isActive = false;
        post('payments/update', paymentsToUpdate).then((data) => {
          this.paymentsTableValue = data
        }).catch((error) => console.error(error))
      }
    },
    noPaid: function () {
      const paymentsToUpdate = this.getSelectedPayment()
      if (paymentsToUpdate) {
        paymentsToUpdate.isActive = true;
        post('payments/update', paymentsToUpdate).then((data) => {
          this.paymentsTableValue = data
        }).catch((error) => console.error(error))
      }
    },
    selectRow: function (index) {
      if (this.selectedIndex === index) {
        this.selectedIndex = -1
        for(let i = 0; i < 7; i++) {
          changeClassRows(this.$refs.tableRow[index].cells, "cell-payments-selected", "cell-payments")
        }
        return
      }
      this.selectedIndex = index

      changeClassRows(this.$refs.tableRow[index].children, "cell-payments", "cell-payments-selected")
      for(let i = 0; i < 7; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRow[i].children, "cell-payments-selected", "cell-payments")
        }
      }
    },
  }
}
</script>

<template>
  <main class="payments-page">
    <div class="payments-body">
      <table class="table">
        <tbody class="table">
        <tr class="row-header-payments">
          <th class="cell-header-payments">
            <div class="cell-header-content">Дата</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content">Пациент</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content">Врач</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content">Услуга</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content">Цена</div>
          </th>
          <th class="cell-header-payments-last">
            <div class="cell-header-content">Оплата</div>
          </th>
        </tr>

        <tr class="row-payments" v-for="(n, index) in 7" :key="index" ref="tableRow" @click="selectRow(index)">
          <th class="cell-payments">
            <div class="cell-content" v-text="paymentsTableValue[index] ? paymentsTableValue[index].date : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content" v-text="paymentsTableValue[index] ? paymentsTableValue[index]['user-name'] : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content" v-text="paymentsTableValue[index] ? paymentsTableValue[index]['doctor-name'] : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content" v-text="paymentsTableValue[index] ? paymentsTableValue[index].service : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content" v-text="paymentsTableValue[index] ? paymentsTableValue[index].price : ''"></div>
          </th>
          <th class="cell-payments-last">
            <div class="cell-content" v-text="paymentsTableValue[index] ? paymentActiveMapper(paymentsTableValue[index].isActive) : ''"></div>
          </th>
        </tr>
        </tbody>
      </table>
      <div class="buttons">
        <div class="paid" @click="paid">Оплачено</div>
        <div class="no-paid" @click="noPaid">Не оплачено</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "../assets/styles/admin/payments.scss";
@import "../../src/main.scss";
</style>
