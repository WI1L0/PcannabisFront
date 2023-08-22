// FONDO
$(document).scroll(function() {
    navbarScroll();
  });
  
  function navbarScroll() {
    var y = window.scrollY;
    if (y > 10) {
      $('.header').addClass('small');
    } else if (y < 10) {
      $('.header').removeClass('small');
    }
  }
// FONDO

// CARD Y MODAL
function openModal(){
    let modal= document.querySelector('#modal-window');
    let fondo= document.querySelector('.cardsView');
    modal.classList.add("showModal");
    modal.style.display = "block";
    modal.classList.toggle("ocultar-tarjeta");
    fondo.classList.toggle("ocultar-fondo");
  }
  
  function closeM(){
      let m= document.querySelector('#modal-window');
    m.classList.remove("showModal");
    modal.style.display = "none";
  }
  
  const cardItems = document.querySelectorAll('.main-card');
  const modalHeader = document.querySelector('.modalHeader-js');
  const modalCardPrice = document.querySelector('.amount');
  
  cardItems.forEach((cardItem) => {
    cardItem.addEventListener('click', function () {
      const cardHeader = cardItem.querySelector('.cardText-js');
      const cardPrice = cardItem.querySelector('.card-price');
  
      modalHeader.innerText = cardHeader.innerText;
      modalCardPrice.innerText = cardPrice.innerText;
    });
  });
  
  window.onkeydown = function (event) {
    if(event.keyCode == 27) {
      closeM();
    }
  }
  
  var modal =  document.querySelector('#modal-window');
  window.onclick = function (event) {
    if(event.target == modal) {
      closeM();
    }
  }
// CARD Y MODAL
