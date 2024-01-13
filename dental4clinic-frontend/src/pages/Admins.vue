<script >
import {post} from "@/pages/js/core/rest.js";
import {changeClassRows} from "@/pages/js/core/table.js";

export default {
  data() {
    return {
      adminsTableValue: [],
      selectedIndex: -1,
      adminForm: {
        id: null,
        name: '',
        surname: '',
        patronymic: '',
        photo: '',
        photoName: ''
      }
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getAdmins()
      },
      { immediate: true }
    )
  },
  methods: {
    getAdmins: function () {
      post("admins/all").then((data) => {
        this.adminsTableValue = data;
      }).catch((error) => console.log(error))
    },
    getSelectedAdmin: function() {
      return this.selectedIndex > -1 ? this.adminsTableValue[this.selectedIndex] : null;
    },
    imageUploaded: function(id) {
      const file = document.querySelector(id)['files'][0];

      const reader = new FileReader();
      this.adminForm.photoName = file.name;

      reader.onload = () => this.adminForm.photo = reader.result;
      reader.readAsDataURL(file);
    },
    selectRow: function (index) {
      if (this.selectedIndex === index) {
        this.selectedIndex = -1
        for(let i = 0; i < 8; i++) {
          changeClassRows(this.$refs.tableRow[index].cells, "cell-selected", "cell")
        }
        return
      }

      if (this.selectedIndex < this.adminsTableValue.length) {
        this.selectedIndex = index
        changeClassRows(this.$refs.tableRow[index].children, "cell", "cell-selected")
      }

      for(let i = 0; i < 8; i++) {
        if (index !== i) {
          changeClassRows(this.$refs.tableRow[i].children, "cell-selected", "cell")
        }
      }
    },
    openCreateAdminDialog: function () {
      this.$refs.createAdminDialog.style.display = 'flex'
      this.$refs.createAdminDialog.show()
    },
    closeCreateAdminDialog: function () {
      this.$refs.createAdminDialog.style.display = null
      this.$refs.createAdminDialog.close()
      this.adminForm.name = ''
      this.adminForm.surname = ''
      this.adminForm.patronymic = ''
      this.adminForm.photo = ''
      this.adminForm.photoName = ''
    },
    createAdmin: function () {
      post('admins/create', this.adminForm).then((data) => {
        this.adminsTableValue = data;
        this.closeCreateAdminDialog()
      }).catch((error) => console.error(error))
    },
    openEditAdminDialog: function () {
      this.adminForm = this.getSelectedAdmin()
      this.$refs.editAdminDialog.style.display = 'flex'
      this.$refs.editAdminDialog.show()
    },
    closeEditAdminDialog: function () {
      this.$refs.editAdminDialog.style.display = null
      this.$refs.editAdminDialog.close()
      this.adminForm.name = ''
      this.adminForm.surname = ''
      this.adminForm.patronymic = ''
      this.adminForm.photo = ''
      this.adminForm.photoName = ''
    },
    editAdmin: function () {
      post('admins/edit', this.adminForm).then((data) => {
        this.adminsTableValue = data;
        this.closeEditAdminDialog()
      }).catch((error) => console.error(error))
    },
    openDeleteAdminDialog: function () {
      this.$refs.deleteAdminDialog.style.display = 'flex'
      this.$refs.deleteAdminDialog.show()
    },
    closeDeleteAdminDialog: function () {
      this.$refs.deleteAdminDialog.style.display = null
      this.$refs.deleteAdminDialog.close()
    },
    cancelDeleteAdmin: function () {
      this.$refs.deleteAdminDialog.style.display = null
      this.$refs.deleteAdminDialog.close()
    },
    deleteAdmin: function() {
      post('admins/delete', this.getSelectedAdmin()).then((data) => {
        this.adminsTableValue = data;
        this.closeDeleteAdminDialog()
      }).catch((error) => console.error(error))
    }
  }
}
</script>

<template>
  <main class="admins-page">
    <div class="admins-body">
      <table class="table">
        <tbody class="table">
        <tr class="row-header">
          <th class="cell-header">
            <div class="cell-header-content">Фамилия</div>
          </th>
          <th class="cell-header">
            <div class="cell-header-content">Имя</div>
          </th>
          <th class="cell-header">
            <div class="cell-header-content">Отчество</div>
          </th>
        </tr>
        <tr class="row" v-for="(n, index) in 8" :key="index" ref="tableRow" @click="selectRow(index)">
          <th class="cell">
            <div class="cell-content" v-text="adminsTableValue[index] ? adminsTableValue[index].name : ''"></div>
          </th>
          <th class="cell">
            <div class="cell-content" v-text="adminsTableValue[index] ? adminsTableValue[index].surname : ''"></div>
          </th>
          <th class="cell">
            <div class="cell-content" v-text="adminsTableValue[index] ? adminsTableValue[index].patronymic : ''"></div>
          </th>
        </tr>
        </tbody>
      </table>
      <div class="buttons">
        <div class="admin-buttons-button" @click="openCreateAdminDialog">Создать</div>
        <div class="admin-buttons-button" @click="openEditAdminDialog">Редактировать</div>
        <div class="admin-buttons-button" @click="openDeleteAdminDialog">Удалить</div>
      </div>
    </div>
    <dialog class="create-admin-dialog-blackout" ref="createAdminDialog" >
      <div class="create-admin-dialog-content">
        <div class="create-admin-dialog-title">
          <div class="create-admin-dialog-title-text">Добавить администратора</div>
          <div class="create-admin-dialog-close-div" id="createAdminDialogClose">
            <img class="create-admin-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="create-admin-dialog-body-content">
          <form class="form" id="create-form">
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Имя</div>
                <input type="text" name="name" placeholder="Имя" class="required-field-input" v-model="adminForm.name">
              </div>
              <div class="required-field">
                <div class="required-field-title">Фамилия</div>
                <input type="text" name="surname" placeholder="Фамилия" class="required-field-input" v-model="adminForm.surname">
              </div>
              <div class="required-field">
                <div class="required-field-title">Отчество</div>
                <input type="text" name="patronymic" placeholder="Отчество" class="required-field-input" v-model="adminForm.patronymic">
              </div>
              <div class="photo-field">
                <div class="photo-field-title">Фотография</div>
                <input type="file" name="photo" multiple accept="image/*,image/jpeg" id="photo" class="photo-field-input" @change="imageUploaded('#photo')">
              </div>
            </div>
            <div class="save-button" @click="createAdmin">Создать</div>
          </form>
        </div>
      </div>
    </dialog>
    <dialog class="create-admin-dialog-blackout" ref="editAdminDialog" >
      <div class="create-admin-dialog-content">
        <div class="create-admin-dialog-title">
          <div class="create-admin-dialog-title-text">Изменить информацию об администраторе</div>
          <div class="create-admin-dialog-close-div" id="editAdminDialogClose">
            <img class="create-admin-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="create-admin-dialog-body-content">
          <form class="form" id="edit-form">
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Имя</div>
                <input type="text" name="name" placeholder="Имя" class="required-field-input" v-model="adminForm.name">
              </div>
              <div class="required-field">
                <div class="required-field-title">Фамилия</div>
                <input type="text" name="surname" placeholder="Фамилия" class="required-field-input" v-model="adminForm.surname">
              </div>
              <div class="required-field">
                <div class="required-field-title">Отчество</div>
                <input type="text" name="patronymic" placeholder="Отчество" class="required-field-input" v-model="adminForm.patronymic">
              </div>
              <div class="photo-field">
                <div class="photo-field-title">Фотография</div>
                <input type="file" id="photoEdit" name="photo" multiple accept="image/*,image/jpeg" class="photo-field-input" @change="imageUploaded('#photoEdit')">
              </div>
            </div>
            <div class="save-button" @click="editAdmin">Сохранить</div>
          </form>
        </div>
      </div>
    </dialog>
    <dialog class="delete-dialog-blackout" ref="deleteAdminDialog">
      <div class="delete-dialog-content">
        <div class="delete-dialog-title">
          <div class="delete-dialog-title-text">Удаление администратора</div>
        </div>
        <div class="delete-dialog-body-content">
          <div class="delete-dialog-content-description">Вы уверены что хотите удалить администратора? Это действие отменить невозможно</div>
        </div>
        <div class="delete-dialog-footer">
          <div class="delete-dialog-footer-button" @click="deleteAdmin">Удалить</div>
          <div class="delete-dialog-footer-button" @click="cancelDeleteAdmin">Отмена</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/director/admins.scss";
@import "../../src/main.scss";
</style>
