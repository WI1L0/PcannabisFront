function miFuncionmensaje() {
	console.log('¡Hola desde JavaScript! ffffffffffffffffffffffffffffffffff');
}


//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches


var errorMessage = "Por favor complete todos los campos obligatorios";
$(".next").click(function () {
	if (animating) return false;

	// todo este lleno
	var formCompleted = true;
	$(this).parent().find('input[required], textarea[required]','file[required]').each(function () {
		if ($.trim($(this).val()) == '') {
			formCompleted = false;
			Swal.fire({
				position: 'top-right',
				title: errorMessage,
				showConfirmButton: false,
				timer: 1900,
				background: '#fffff',
				padding: '1.20rem',
				width: '20rem',
				FontFace:'14px',
				allowOutsideClick: false,
				allowEscapeKey: false,
				fontFamily: 'Monserrat'
			});
		} else {
			$(this).on('input', function () {
				Swal.close();
			});
		}
	});
	if (formCompleted) {
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
	} else {
		// Prevent the action from executing
		return false;
	}
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
	const derecha = document.getElementById('derecha'); // Agrega esta línea para obtener el elemento "derecha"
  
	console.log(txtarea); // Verificar si el elemento se está encontrando correctamente
	if (txtarea) {
	  const contenido = txtarea.value;
  
	  // Crear una nueva tarjeta con el contenido del textarea
	  const nuevaTarjeta = document.createElement('div');
	  nuevaTarjeta.classList.add('card');
	  nuevaTarjeta.innerHTML = `
		<p class="nom">Parrafo</p>
		<div class="contenido-card">
		  <textarea rows="5" type="text" name="ubicacion" id="txtarea"  ></textarea>
		</div>
	  `;
	  if (derecha) {
		// Obtener la última tarjeta existente en "derecha"
		const ultimaTarjeta = derecha.querySelector('.card:last-child');
  
		// Agregar la nueva tarjeta debajo de la última tarjeta
		derecha.insertBefore(nuevaTarjeta, ultimaTarjeta ? ultimaTarjeta.nextElementSibling : null);
  
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


  document.getElementById('btnfotos').addEventListener('click', function() {
	var inputFotos = document.getElementById('fotos');
	var files = inputFotos.files; // Obtener los archivos seleccionados
  
	for (var i = 0; i < files.length; i++) {
	  var file = files[i];
	  var reader = new FileReader();
  
	  reader.onload = function(e) {
		var previewCard = document.createElement('div');
		previewCard.classList.add('preview-card');
		previewCard.style.display = 'inline-block'; // Establecer el estilo de visualización en línea
		
		var img = document.createElement('img');
		img.src = e.target.result;
		img.alt = 'Previsualización de la foto';
		img.classList.add('preview-image');
		img.style.width = '400px'; // Establecer el ancho de la imagen
		img.style.height = '400px'; 
		previewCard.appendChild(img);
		
		document.getElementById('previsualizacion').appendChild(previewCard);
	  };
  
	  reader.readAsDataURL(file);
	}
  });