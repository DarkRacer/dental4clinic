<script>
import {get} from "@/pages/js/core/rest.js";
import {changeClassRows} from "@/pages/js/core/table.js";

export default {
  data() {
    return {
      paymentsTableValue: [],
      selectedRow: [],
      paymentInfo: 'Вами не выбрано услуг для оплаты',
      paymentInfoPrice: ''
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getPayments()
      },
      {immediate: true}
    )
  },
  methods: {
    getPayments: function () {
      get(`payments/user/${this.$route.params.userId}`).then(data => {
        this.paymentsTableValue = data
      })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    updatePaymentInfo: function() {
      let summary = 0;
      this.selectedRow.forEach((selected) => {
        summary += this.paymentsTableValue[selected].price;
      })

      this.paymentInfo = `Вами выбрано ${this.selectedRow.length} услуг`
      this.paymentInfoPrice = `Итоговая сумма на оплату ${summary} рублей`

      if (this.selectedRow.length === 0) {
        this.paymentInfo = 'Вами не выбрано услуг для оплаты'
        this.paymentInfoPrice = ''
      }
    },
    paymentActiveMapper: function (isActive) {
      return isActive ? "" : "Оплачено"
    },
    selectRow: function (index) {
      if (this.paymentsTableValue[index] && this.paymentsTableValue[index].isActive) {
        const ind = this.selectedRow.findIndex((selected) => selected === index);
        if (ind === -1) {
          changeClassRows(this.$refs.tableRow[index].children, 'cell-payments', 'cell-payments-selected')
          this.selectedRow.push(index);
        } else {
          changeClassRows(this.$refs.tableRow[index].children, 'cell-payments-selected', 'cell-payments')
          this.selectedRow.splice(ind, 1);
        }
      }
      this.updatePaymentInfo()
    }
  }
}
</script>

<template>
  <main class="payments-page">
    <div class="payments-body">
      <div class="payments-notification">Выберите из таблицы не оплаченных услуг, услуги, которые желаете оплатить</div>
      <table class="table">
        <tbody class="table">
        <tr class="row-header-payments">
          <th class="cell-header-payments">
            <div class="cell-header-content-payments">Дата</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content-payments">Врач</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content-payments">Услуга</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content-payments">Цена</div>
          </th>
          <th class="cell-header-payments">
            <div class="cell-header-content-payments">Оплата</div>
          </th>
        </tr>

        <tr class="row-payments" v-for="(n, index) in 5" :key="index" ref="tableRow" @click="selectRow(index)">
          <th class="cell-payments">
            <div class="cell-content-payments" v-text="paymentsTableValue[index] ? paymentsTableValue[index].date : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content-payments" v-text="paymentsTableValue[index] ? paymentsTableValue[index].doctor : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content-payments" v-text="paymentsTableValue[index] ? paymentsTableValue[index].service : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content-payments" v-text="paymentsTableValue[index] ? paymentsTableValue[index].price : ''"></div>
          </th>
          <th class="cell-payments">
            <div class="cell-content-payments" v-text="paymentsTableValue[index] ? paymentActiveMapper(paymentsTableValue[index].isActive) : ''"></div>
          </th>
        </tr>
        </tbody>
      </table>
      <div class="payment-info-card">
        <p class="card-title">Информация об оплате</p>
        <div class="payment-info-card-text" id="payment-info" v-text="paymentInfo"></div>
        <div class="payment-info-card-text" id="payment-info-price" v-text="paymentInfoPrice"></div>
        <div class="payment-info-card-button" onclick="location.assign('https://robokassa.com/')">Оплатить</div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "../../src/assets/styles/user/payments.scss";
@import "../../src/main.scss";
</style>
