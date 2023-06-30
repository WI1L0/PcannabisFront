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


//formulario
function mostrar(){
  // document.getElementById('layout3').style.display = 'block';
  var layout3 = document.getElementById('layout3');
  layout3.style.display = 'block';
  layout3.scrollIntoView({ behavior: 'smooth' });
  }
//formulario

//distribuidor
