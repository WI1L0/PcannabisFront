// SLIDER

// SLIDER


// EQUIPO
// EQUIPO


// IMAGENES
function qs(selector) { return document.querySelector(selector); }

var imgAmpliada = qs("#ampliacao img");
var miniaturas = qs("#miniaturas");

miniaturas.addEventListener("click", function(event){
  event.preventDefault();

  var urlAmpliacao = event.target.parentNode.href;
  imgAmpliada.src = urlAmpliacao;
  
}, true);
// IMAGENES


// VALORES
$(function(){
    $('a[title]').tooltip();
    });
// VALORES