var pricesDialog = document.querySelector('#pricesDialog');
document.querySelector('#openPricesDialog').onclick = function() {
  pricesDialog.show();
}
document.querySelector('#pricesDialogClose').onclick = function() {
  pricesDialog.close();
}

let goToTop = document.getElementById("goToTop");
window.onscroll = function() {scrollFunction()};

goToTop.addEventListener("click", (e) => {
  topFunction();
})

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    goToTop.style.display = "block";
  } else {
    goToTop.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
