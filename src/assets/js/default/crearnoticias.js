
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50) + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
				'transform': 'scale(' + scale + ')',
				'position': 'absolute'
			});
			next_fs.css({ 'left': left, 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1 - now) * 50) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'left': left });
			previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
		},
		duration: 800,
		complete: function () {
			current_fs.hide();
			animating = false;
		},
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

//validar
$(document).ready(function () {
	$(".submit").click(function () {
		var pass = $("input[name=pass]").val();
		var cpass = $("#cpass").val();
		if (pass != cpass) {
			alert("Las contraseñas no coinciden. Por favor, inténtelo de nuevo.");
			return false;
		}
	});
});



//PARRAFOS
// var parrafoInput = document.getElementById('parrafo-input');
// var agregarBtn = document.getElementById('agregar-btn');

// agregarBtn.addEventListener('click', function() {
//     // Aquí puedes hacer lo que necesites con el valor del textarea, como enviarlo a un servidor para guardarlo en una base de datos.
//     console.log('Valor del textarea:', parrafoInput.value);

//     parrafoInput.value = ''; // Limpiar el textarea
//   });
document.addEventListener('DOMContentLoaded', function () {
	var parrafoInput = document.getElementById('parrafo-input');
	var agregarBtn = document.getElementById('agregar-btn');

	agregarBtn.addEventListener('click', function () {
		// Aquí puedes hacer lo que necesites con el valor del textarea, como enviarlo a un servidor para guardarlo en una base de datos.
		console.log('Valor del textarea:', parrafoInput.value);

		parrafoInput.value = ''; // Limpiar el textarea
	});
});

// PREVISUALIZAR LA FOTO
const inputFoto = document.getElementById('foto');
const imagenPreview = document.getElementById('imagen-preview');

if (imagenPreview) {
	inputFoto.addEventListener('change', () => {
		const file = inputFoto.files[0];
		const reader = new FileReader();

		reader.addEventListener('load', () => {
			if (imagenPreview) {
				imagenPreview.setAttribute('src', reader.result);
				imagenPreview.style.display = 'block';
			}
		});

		reader.readAsDataURL(file);
	});
}

//Agregar parrafos
const btnAgregar = document.getElementById('botones');
const derecha = document.getElementById('derecha');

btnAgregar.addEventListener('click', function () {
  const txtarea = document.getElementById('txtarea');
  // Obtener la última tarjeta existente
  const ultimaTarjeta = derecha.querySelector('.card:last-child');

  console.log(txtarea); // Verificar si el elemento se está encontrando correctamente
  if (txtarea) {
    const contenido = txtarea.value;

    // Crear una nueva tarjeta con el contenido del textarea
    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.classList.add('card');
    nuevaTarjeta.innerHTML = `
      <p class="nom">Parrafo</p>
	  <button class="botoncito">Quitar</button>
      <div class="contenido-card">
        <textarea placeholder="Parrafo" type="text" name="titulo_noti" class="txtarea" readonly>${contenido}</textarea>
      </div>
    `;
    if (derecha) {
      // Agregar la nueva tarjeta debajo de la última tarjeta
      derecha.insertBefore(nuevaTarjeta, ultimaTarjeta.nextElementSibling);

	  
      // Agregar controlador de eventos para el botón "quitar"
      const btnQuitar = nuevaTarjeta.querySelector('.botoncito');
      btnQuitar.addEventListener('click', function () {
        nuevaTarjeta.remove();
      });

      // Limpiar el contenido del textarea
      txtarea.value = '';
    } else {
      console.error('No se encontró el elemento derecha.');
    }
  } else {
    console.error('No se encontró el elemento txtarea.');
  }
});