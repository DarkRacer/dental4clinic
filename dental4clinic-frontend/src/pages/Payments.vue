<script>
import {changeClassRows} from "@/pages/js/core/table.js";
import {get, post} from "@/pages/js/core/rest.js";
import {useCookies} from "@vueuse/integrations/useCookies";
import {useJwt} from "@vueuse/integrations/useJwt";

export default {
  data() {
    return {
      paymentsTableValue: [],
      selectedIndex: -1
    }
  },
  setup() {
    const cookies = useCookies(['access_token'])
    const { payload } = useJwt(cookies.get('access_token'))

    return {
      payload
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
  mounted() {
    if (this.user.role === 'DIRECTOR') {
      this.$refs.buttonsBlock.style.columnGap = '5%'
    } else {
      this.$refs.buttonsBlock.style.columnGap = '40%'
    }
  },
  computed: {
    user: function () {
      return {
        id: this.payload.id,
        role: this.payload.role
      }
    }
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

      if (index < this.paymentsTableValue.length) {
        this.selectedIndex = index
        changeClassRows(this.$refs.tableRow[index].children, "cell-payments", "cell-payments-selected")
      }

      for(let i = 0; i < 7; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRow[i].children, "cell-payments-selected", "cell-payments")
        }
      }
    },
    openDeleteDialog: function () {
      if (this.selectedIndex > -1) {
        this.$refs.deleteDialog.style.display = 'flex'
        this.$refs.deleteDialog.show()
      }
    },
    closeDeleteDialog: function () {
      this.$refs.deleteDialog.style.display = null
      this.$refs.deleteDialog.close()
    },
    deletePayments: function () {
      post('payments/delete', this.getSelectedPayment()).then((data) => {
        this.paymentsTableValue = data
        this.closeDeleteDialog()
      }).catch((error) => console.error(error))
    }
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
      <div class="buttons" ref="buttonsBlock">
        <div class="paid" @click="paid">Оплачено</div>
        <div class="no-paid" @click="noPaid">Не оплачено</div>
        <div class="delete-payment" @click="openDeleteDialog" v-if="user.role === 'DIRECTOR'">Удалить</div>
      </div>
    </div>
    <dialog class="delete-dialog-blackout" ref="deleteDialog">
      <div class="delete-dialog-content">
        <div class="delete-dialog-title">
          <div class="delete-dialog-title-text">Удаление оплаты</div>
        </div>
        <div class="delete-dialog-body-content">
          <div class="delete-dialog-content-description">Вы уверены что хотите удалить оплату? Это действие отменить невозможно</div>
        </div>
        <div class="delete-dialog-footer">
          <div class="delete-dialog-footer-button" @click="deletePayments">Удалить</div>
          <div class="delete-dialog-footer-button" @click="closeDeleteDialog">Отмена</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/admin/payments.scss";
@import "../assets/styles/director/payments.scss";
@import "../../src/main.scss";
</style>
