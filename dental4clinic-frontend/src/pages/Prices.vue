<script>
import {get} from "@/pages/js/core/rest.js";

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
      priceId: null,
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
    }
  }
}
</script>

<template>
  <main class="prices-page">
    <div class="prices-body">
      <div class="prices-body-notification">Познакомьтесь с ценами на самые популярные услуги в центре «Dental4Clinic». Не пропустите специальные предложения и акции!</div>
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
    <dialog class="prices-dialog-blackout" id="pricesDialog" ref="pricesDialog">
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
          <div class="prices-dialog-footer-button" onclick="location.assign('/appointments/create');">Записаться</div>
        </div>
      </div>
    </dialog>
  </main>
</template>

<style scoped>
@import "../assets/styles/core/prices.scss";
</style>
