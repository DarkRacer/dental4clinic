<script>
import {get, post} from "@/pages/js/core/rest.js";
import {changeClassRows} from "@/pages/js/core/table.js";

export default {
  data() {
    return {
      requestsTableValue: [],
      selectedIndex: -1
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getRequests()
      },
      { immediate: true }
    )
  },
  methods: {
    getRequests: function () {
      get('requests/all').then((data) => {
        this.requestsTableValue = data
      }).catch((error) => console.error(error))
    },
    selectRow: function (index) {
      if (this.selectedIndex === index) {
        this.selectedIndex = -1
        for(let i = 0; i < 5; i++) {
          changeClassRows(this.$refs.tableRow[index].cells, "cell-requests-selected", "cell-requests")
        }
        return
      }

      if (index < this.requestsTableValue.length) {
        this.selectedIndex = index
        changeClassRows(this.$refs.tableRow[index].children, "cell-requests", "cell-requests-selected")
      }

      for(let i = 0; i < 5; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRow[i].children, "cell-requests-selected", "cell-requests")
        }
      }
    },
    statusMapper: function (isActual) {
      return isActual ? '' : 'Рассмотрено'
    },
    checked: function () {
      const requestToUpdate = this.getSelectedRequest()
      if (requestToUpdate) {
        requestToUpdate.isActual = false;
        post('requests/update', requestToUpdate).then((data) => {
          this.requestsTableValue = data
        }).catch((error) => console.error(error))
      }
    },
    getSelectedRequest: function () {
      return this.selectedIndex > -1 ? this.requestsTableValue[this.selectedIndex] : null;
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
    deleteRequest: function () {
      post('requests/delete', this.getSelectedRequest()).then((data) => {
        this.requestsTableValue = data
        this.closeDeleteDialog()
      }).catch((error) => console.error(error))
    }
  }
}
</script>

<template>
  <main class="requests-page">
    <div class="requests-body">
      <table class="table">
        <tbody class="table">
        <tr class="row-header-requests">
          <th class="cell-header-requests">
            <div class="cell-header-content">Имя</div>
          </th>
          <th class="cell-header-requests">
            <div class="cell-header-content">Телефон</div>
          </th>
          <th class="cell-header-requests">
            <div class="cell-header-content">Проблема</div>
          </th>
          <th class="cell-header-requests">
            <div class="cell-header-content">Статус</div>
          </th>
        </tr>
        <tr class="row-requests" v-for="(n, index) in 5" :key="index" ref="tableRow" @click="selectRow(index)">
          <th class="cell-requests">
            <div class="cell-content" v-text="requestsTableValue[index] ? requestsTableValue[index].name : ''"></div>
          </th>
          <th class="cell-requests">
            <div class="cell-content" v-text="requestsTableValue[index] ? requestsTableValue[index].phone : ''"></div>
          </th>
          <th class="cell-requests" id="firstRowCell3">
            <div class="cell-content" v-text="requestsTableValue[index] ? requestsTableValue[index].description : ''"></div>
          </th>
          <th class="cell-requests" id="firstRowCell4">
            <div class="cell-content" v-text="requestsTableValue[index] ? statusMapper(requestsTableValue[index].isActual) : ''"></div>
          </th>
        </tr>
        </tbody>
      </table>
      <div class="buttons">
        <div class="checked" @click="checked">Рассмострено</div>
        <div class="delete-request" @click="openDeleteDialog">Удалить</div>
      </div>
    </div>
    <dialog class="delete-dialog-blackout" ref="deleteDialog">
      <div class="delete-dialog-content">
        <div class="delete-dialog-title">
          <div class="delete-dialog-title-text">Удаление заявки</div>
        </div>
        <div class="delete-dialog-body-content">
          <div class="delete-dialog-content-description">Вы уверены что хотите удалить заявку? Это действие отменить невозможно</div>
        </div>
        <div class="delete-dialog-footer">
          <div class="delete-dialog-footer-button" @click="deleteRequest">Удалить</div>
          <div class="delete-dialog-footer-button" @click="closeDeleteDialog">Отмена</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/director/requests.scss";
@import "../../src/main.scss";
</style>
