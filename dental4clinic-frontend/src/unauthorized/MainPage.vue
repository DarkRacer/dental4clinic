<script setup>

</script>

<template>
  <main class="main-page">
    <div class="header-for-all">
      <div class="header-div-left">
        <div class="logo" onclick="location.assign('/unauthorized/home');">
          <img class="logo-img" src="../img/logo.png"/>
          <p class="dental4clinic-logo">Dental4Clinic</p>
        </div>
        <p class="header-item" onclick="location.assign('/unauthorized/appointments/create');">Записаться</p>
        <p class="header-item" onclick="location.assign('/unauthorized/prices');">Цены</p>
        <p class="header-item" onclick="location.assign('/unauthorized/doctors');">Врачи</p>
        <div class="header-item" onclick="location.assign('/unauthorized/clinic/info');">О нас</div>
      </div>
      <div class="header-div-right">
        <div class="logo-user" onclick="window.location='/login';">
          <img class="logo-user-image" src="../img/user-logo.png"/>
        </div>
        <div class="phone-number">
          <img class="phone" src="../img/phone.png"/>
          <p class="number">+7 473-222-22-22</p>
        </div>
      </div>
    </div>
    <div class="content-main-page">
      <div class="card-pluses">
        <div class="card-pluses-image">
          <div class="card-pluses-cover-slider">
            <div class="pseudo">
            </div>
            <img class="main-page-image" src="../img/main-page-image.png"/>
          </div>
        </div>
        <div class="card-pluses-cover-inner">
          <div class="card-pluses-cover-background">
            <div class="card-pluses-cover-header">
              Стоматология
              <br/>
              «Dental4Clinic»
              <br/>
              в Воронеже
            </div>
            <div class="card-pluses-slogan-list">
              <div class="card-pluses-slogan-item">
                <div class="card-pluses-slogan-item-group">
                  <img class="slogan-modern" src="../img/slogan.png"/>
                  <div class="first-line">
                  </div>
                </div>
                <div class="card-pluses-item-sub-header">Современно</div>
                <div class="card-pluses-item-text">Передовые технологии</div>
              </div>
              <div class="card-pluses-slogan-item">
                <div class="card-pluses-slogan-item-group">
                  <img class="slogan-shield" src="../img/shield.png"/>
                  <div class="second-line">
                  </div>
                </div>
                <div class="card-pluses-item-sub-header">Стабильно</div>
                <div class="card-pluses-item-text">Многолетний успех</div>
              </div>
              <div class="card-pluses-slogan-last-item">
                <img class="slogan-thumbs" src="../img/thumbs.png"/>
                <div class="card-pluses-item-sub-header">Качественно</div>
                <div class="card-pluses-item-text">Опытные специалисты</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="plus-group">
        <div class="group-header">Беспрецедентный комфорт на всех этапах лечения</div>
        <div class="group-body">
          <div class="group-plus-text">
            <div class="plus">
              <div class="plus-point">
                <img class="point-plus" src="../img/point-plus.png"/>
                <span class="point-text">КОМФОРТНАЯ ОБСТАНОВКА</span>
              </div>
              <span class="sub-text">
                 Наша основная задача — создать комфортную атмосферу: в холлах клиник вы ощутите домашний уют, а в кресле врача будете чувствовать себя легко и спокойно.
            </span>
            </div>
            <div class="plus">
              <div class="plus-point">
                <img class="point-plus" src="../img/point-plus.png"/>
                <span class="point-text">ОПЕРАТИВНАЯ И ТОЧНАЯ ПОСТАНОВКА ДИАГНОЗА</span>
              </div>
              <span class="sub-text">
                 Современные компьютерные томографы, визиографы и операционные микроскопы позволяют вовремя поставить точный диагноз.
            </span>
            </div>
            <div class="plus">
              <div class="plus-point">
                <img class="point-plus" src="../img/point-plus.png"/>
                <span class="point-text">СТОМАТОЛОГИЧЕСКИЕ ТЕХНОЛОГИИ 21 ВЕКА</span>
              </div>
              <span class="sub-text">
                 К вашим услугам 3D технологии для лечения, имплантации и протезирования зубов.
            </span>
            </div>
            <div class="plus">
              <div class="plus-point">
                <img class="point-plus" src="../img/point-plus.png"/>
                <span class="point-text">СБАЛАНСИРОВАННАЯ ЦЕНОВАЯ ПОЛИТИКА</span>
              </div>
              <span class="sub-text">Оптимальный план лечения и разумные цены на услуги стоматологов в Воронеже.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
@import "../main.scss";
</style>
