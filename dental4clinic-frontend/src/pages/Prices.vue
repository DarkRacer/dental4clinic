<script>
import {get, post} from "@/pages/js/core/rest.js";
import {useCookies} from "@vueuse/integrations/useCookies";

export default {
  data() {
    return {
      prices: [],
      emptyCurrentPrice: {
        name: '',
        description: 'Упс. Что-то пошло не так...',
        price: '',
        pluses: ''
      },
      currentPrice: {
        name: '',
        description: 'Упс. Что-то пошло не так...',
        price: '',
        pluses: ''
      },
      priceForm: {
        name: '',
        description: '',
        price: '',
        pluses: ''
      },
      priceId: null,
      computedDisplay: 'none'
    }
  },
  setup() {
    const cookies = useCookies(['user_id', 'role', 'access_token'])
    return {
      cookies,
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.getPrices()
      },
      { immediate: true }
    )
    window.addEventListener('scroll', this.handleScroll);
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  computed: {
    user: function () {
      return {
        id: this.cookies.get("user_id"),
        role: this.cookies.get("role"),
        token: this.cookies.get("access_token")
      }
    }
  },
  methods: {
    topFunction: function () {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    getPrices: function () {
      get('prices').then(data => {
        this.prices = data
      }).catch(error => {
        console.error(error)
      })
    },
    openPriceCard: function () {
      get(`price/${this.priceId}`).then(data => {
        this.currentPrice = data;
        this.$refs.pricesDialog.style.display = 'flex';
        this.$refs.pricesDialog.show()
      }).catch(() => {
        this.currentPrice = this.emptyCurrentPrice
        this.$refs.pricesDialog.style.display = 'flex';
        this.$refs.pricesDialog.show()
      })
    },
    closePriceCard: function () {
      this.$refs.pricesDialog.style.display = null;
      this.$refs.pricesDialog.close()
      this.priceId = null
      this.currentPrice = this.emptyCurrentPrice
    },
    handleScroll: function () {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        this.computedDisplay = "block";
      } else {
        this.computedDisplay = "none";
      }
    },
    openCreatePriceDialog: function () {
      this.$refs.createPriceDialog.style.display = 'flex'
      this.$refs.createPriceDialog.show()
    },
    closeCreatePriceDialog: function () {
      this.$refs.createPriceDialog.style.display = null
      this.$refs.createPriceDialog.close()
      this.priceForm.name = ''
      this.priceForm.description = ''
      this.priceForm.price = ''
      this.priceForm.pluses = ''
    },
    createPrice: function () {
      post('price/create', this.priceForm).then((data) => {
        this.prices = data;
        this.closeCreatePriceDialog()
      }).catch((error) => console.error(error))
    },
    openEditPriceDialog: function () {
      this.priceForm = this.currentPrice
      this.$refs.editPriceDialog.style.display = 'flex'
      this.$refs.pricesDialog.style.display = null;
      this.$refs.pricesDialog.close()
      this.$refs.editPriceDialog.show()
    },
    closeEditPriceDialog: function () {
      this.$refs.editPriceDialog.style.display = null
      this.$refs.editPriceDialog.close()
      this.$refs.pricesDialog.style.display = 'flex';
      this.$refs.pricesDialog.show()
    },
    editPrice: function () {
      post('price/edit', this.priceForm).then((data) => {
        this.prices = data;
        this.$refs.editPriceDialog.style.display = null
        this.$refs.editPriceDialog.close()
        this.priceForm.name = ''
        this.priceForm.description = ''
        this.priceForm.price = ''
        this.priceForm.pluses = ''
      }).catch((error) => console.error(error))
    },
    openDeletePriceDialog: function () {
      this.$refs.pricesDialog.style.display = null;
      this.$refs.pricesDialog.close()
      this.$refs.deletePriceDialog.style.display = 'flex'
      this.$refs.deletePriceDialog.show()
    },
    closeDeletePriceDialog: function () {
      this.$refs.deletePriceDialog.style.display = null
      this.$refs.deletePriceDialog.close()
      this.currentPrice = this.emptyCurrentPrice
    },
    cancelDeletePrice: function () {
      this.$refs.deletePriceDialog.style.display = null
      this.$refs.deletePriceDialog.close()
      this.$refs.pricesDialog.style.display = 'flex';
      this.$refs.pricesDialog.show()
    },
    deletePrice: function() {
      post('price/delete', this.currentPrice).then((data) => {
        this.prices = data;
        this.closePriceCard()
        this.closeDeletePriceDialog()
      }).catch((error) => console.error(error))
    }
  }
}
</script>

<template>
  <main class="prices-page">
    <div class="prices-content">
      <div class="prices-body-create" @click="openCreatePriceDialog">Создать услугу</div>
    </div>
    <div class="prices-body">
      <div class="prices-body-notification" v-if="user.role !== 'DIRECTOR'">Познакомьтесь с ценами на самые популярные услуги в центре «Dental4Clinic». Не пропустите специальные предложения и акции!</div>
      <div class="prices-content" id="pricesContent">
        <div class="prices-group" v-for="price in prices">
          <div class="prices-group-title" v-text="price.group"></div>
          <div class="prices-group-content" v-for="service in price.services">
            <div class="prices-group-content-item" @click="this.priceId = service['service-id']; openPriceCard()">
              <div class="prices-group-content-item-name" v-text="service.name"></div>
              <div class="prices-group-content-item-price" v-text="service.price + ' ₽'"></div>
            </div>
          </div>
        </div>
      </div>
      <img class="go-to-top" @click="topFunction()" src="../img/arrow.png" v-bind:style="{ display: computedDisplay }"/>
    </div>
    <dialog class="create-price-dialog-blackout" ref="createPriceDialog">
      <div class="create-price-dialog-content">
        <div class="create-price-dialog-title">
          <div class="create-price-dialog-title-text">Создать услугу</div>
          <div class="create-price-dialog-close-div" @click="closeCreatePriceDialog">
            <img class="create-price-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="create-price-dialog-body-content">
          <form class="form" id="create-form">
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Название услуги</div>
                <input type="text" name="name" placeholder="Название услуги" class="required-field-input" v-model="priceForm.name">
              </div>
              <div class="required-field">
                <div class="required-field-title">Стоимость</div>
                <input type="text" name="cost" placeholder="Стоимость (Р.)" class="required-field-input" v-model="priceForm.price">
              </div>
            </div>
            <div class="additional-fields">
              <div class="additional-field">
                <div class="additional-field-title">Описание</div>
                <textarea type="text" name="description" placeholder="Описание" class="additional-field-input" v-model="priceForm.description"></textarea>
              </div>
              <div class="additional-field">
                <div class="additional-field-title">Что входит в стоимость</div>
                <textarea type="text" name="pluses" placeholder="Что входит в стоимость" class="additional-field-input" v-model="priceForm.pluses"></textarea>
              </div>
            </div>
            <div class="save-button" @click="createPrice">Создать</div>
          </form>
        </div>
      </div>
    </dialog>
    <dialog class="prices-dialog-blackout" ref="pricesDialog">
      <div class="prices-dialog-content">
        <div class="prices-dialog-title">
          <div class="prices-dialog-title-text" id="pricesDialogTitle" v-text="currentPrice.name"></div>
          <div class="prices-dialog-close-div" id="pricesDialogClose" @click="closePriceCard()">
            <img class="prices-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="prices-dialog-body-content">
          <div class="prices-dialog-content-description" id="pricesDialogDescription" v-text="currentPrice.description" ></div>
          <div class="pluses-group" id="pricesDialogPluses">
            <div class="pluses-group-title" v-if="currentPrice.name !== ''">{{ currentPrice.name }} владеет следующими профессиональными навыками:</div>
            <div class="plus-price-group" v-if="currentPrice.pluses !== ''" v-for="plus in currentPrice.pluses.split('.')">
              <img class="doctors-dialog-content-plus" src="../img/point-plus.png"/>
              <div class="doctors-dialog-content-text">{{plus}}</div>
            </div>
          </div>
        </div>
        <div class="prices-dialog-footer">
          <div class="prices-dialog-footer-price" id="pricesDialogPrice" v-if="currentPrice.price !== ''" v-text="currentPrice.price + ' ₽'"></div>
          <div class="prices-dialog-footer-button" v-if="user.role !== 'DIRECTOR'" onclick="location.assign('/appointments/create');">Записаться</div>
          <div class="prices-dialog-footer-buttons" v-if="user.role === 'DIRECTOR'">
            <div class="prices-dialog-footer-button" @click="openDeletePriceDialog">Удалить</div>
            <div class="prices-dialog-footer-button" @click="openEditPriceDialog">Редактировать</div>
          </div>
        </div>
      </div>
    </dialog>
    <dialog class="create-price-dialog-blackout" ref="editPriceDialog">
      <div class="create-price-dialog-content">
        <div class="create-price-dialog-title">
          <div class="create-price-dialog-title-text">Изменить информацию о услуге</div>
          <div class="create-price-dialog-close-div" @click="closeEditPriceDialog">
            <img class="create-price-dialog-close" src="../img/point-plus.png"/>
          </div>
        </div>
        <div class="create-price-dialog-body-content">
          <form class="form" id="edit-form">
            <div class="required-fields">
              <div class="required-field">
                <div class="required-field-title">Название услуги</div>
                <input type="text" name="name" placeholder="Название услуги" class="required-field-input" v-model="priceForm.name">
              </div>
              <div class="required-field">
                <div class="required-field-title">Стоимость</div>
                <input type="text" name="cost" placeholder="Стоимость (Р.)" class="required-field-input" v-model="priceForm.price">
              </div>
            </div>
            <div class="additional-fields">
              <div class="additional-field">
                <div class="additional-field-title">Описание</div>
                <textarea type="text" name="description" placeholder="Описание" class="additional-field-input" v-model="priceForm.description">
              </textarea>
              </div>
              <div class="additional-field">
                <div class="additional-field-title">Что входит в стоимость</div>
                <textarea type="text" name="pluses" placeholder="Что входит в стоимость" class="additional-field-input" v-model="priceForm.pluses"></textarea>
              </div>
            </div>
            <div class="save-button" @click="editPrice">Сохранить</div>
          </form>
        </div>
      </div>
    </dialog>
    <dialog class="delete-dialog-blackout" ref="deletePriceDialog">
      <div class="delete-dialog-content">
        <div class="delete-dialog-title">
          <div class="delete-dialog-title-text">Удаление услуги</div>
        </div>
        <div class="delete-dialog-body-content">
          <div class="delete-dialog-content-description">Вы уверены что хотите удалить услугу? Это действие отменить невозможно</div>
        </div>
        <div class="delete-dialog-footer">
          <div class="delete-dialog-footer-button" @click="deletePrice">Удалить</div>
          <div class="delete-dialog-footer-button" @click="cancelDeletePrice">Отмена</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/director/prices.scss";
@import "../../src/main.scss";
</style>
