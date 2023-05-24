// CAROUSEL
// CAROUSEL

//ALL
(function () {
    "use strict";
    var menuId;
    function init() {
        menuId = document.getElementById("menu");
        document.addEventListener("scroll", scrollMenu, false);
    }
    function scrollMenu() {
        if (document.documentElement.scrollTop > 50) {
            menuId.classList.add("scroll");
            console.log('scroll');
        }
        else {
            menuId.classList.remove("scroll");
            console.log('no-scroll');
        }
    }
    document.addEventListener("DOMContentLoaded", init, false);
})();

(function () {
    "use strict";
    var mobBtn, topMenu;

    function init() {
        mobBtn = document.getElementById("mobile-btn");
        topMenu = document.getElementById("top-menu");
        mobBtn.addEventListener("click", mobileMenu, false);
    }

    function mobileMenu() {
        if (topMenu.classList.contains("mobile-open")) {
            topMenu.classList.remove("mobile-open");
        } else {
            topMenu.classList.add("mobile-open");
        }
        if (mobBtn.classList.contains("hamburger-cross")) {
            mobBtn.classList.remove("hamburger-cross");
        }
        else {
            mobBtn.classList.add("hamburger-cross");
        }
    }

    document.addEventListener("DOMContentLoaded", init);

})();
// ALL





// CARACTERISTICAS

// CARACTERISTICAS





// NUNAKAY
// Script Goes Here...
const leftSlide = document.querySelector(".left-slides");
const rightSlide = document.querySelector(".right-slides");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const slidesLength = leftSlide.querySelectorAll("div").length;

let currentSlide = 0;

rightSlide.style.transform = `translateY(-${(slidesLength - 1) * 100}%)`;

leftBtn.addEventListener("click", () => changeSlide("left"));
rightBtn.addEventListener("click", () => changeSlide("right"));

function changeSlide(btn) {
  if (btn == "right") {
    currentSlide++;

    if (currentSlide > slidesLength - 1) {
      currentSlide = 0;
    }
  } else if (btn == "left") {
    currentSlide--;

    if (currentSlide < 0) {
      currentSlide = slidesLength - 1;
    }
  }

  rightSlide.style.transform = `translateY(-${
    (slidesLength - 1 - currentSlide) * 100
  }%)`;
  leftSlide.style.transform = `translateY(-${currentSlide * 100}%)`;
}

setInterval(autoChangeSlide, 3000);

function autoChangeSlide() {

  currentSlide++;

  if (currentSlide > slidesLength - 1) {
    currentSlide = 0;
  }

  rightSlide.style.transform = `translateY(-${
    (slidesLength - 1 - currentSlide) * 100
  }%)`;
  leftSlide.style.transform = `translateY(-${currentSlide * 100}%)`;
}
// NUNAKAY