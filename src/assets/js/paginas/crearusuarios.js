
//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches


var errorMessage = "Por favor complete todos los campos obligatorios";
var errorMessage2 = "Las contraseñas no coinciden"
$(".next").click(function () {
	if (animating) return false;

	// todo este lleno
	var formCompleted = true;
	$(this).parent().find('input[required], select[required]').each(function () {
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

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

//validar
// $(document).ready(function() {
// 	$(".submit").click(function() {
// 	  var pass = $("input[name=pass]").val();
// 	  var cpass = $("#cpass").val();
// 	  if (pass != cpass) {
// 		Event.preventDefault(); 
// 		Swal.fire({
// 			position: 'top-right',
// 			title: errorMessage2,
// 			showConfirmButton: false,
// 			timer: 1900,
// 			background: '#fffff',
// 			padding: '1.20rem',
// 			width: '20rem',
// 			FontFace:'14px',
// 			allowOutsideClick: false,
// 			allowEscapeKey: false,
// 			fontFamily: 'Monserrat'
// 		});
// 		return false;
// 	  }
// 	});
//   });



  //
