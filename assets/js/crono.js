var reloj = '00:00:00';
var $hora = $('#hora');

function checkTime(i) {
	return (i < 10) ? "0" + i : i;
}

function horaActual() {
	var today = new Date(),
		h = checkTime(today.getHours()),
		m = checkTime(today.getMinutes()),
		s = checkTime(today.getSeconds());
		
		reloj =  h + ":" + m + ":" + s;	
		$hora.text(reloj);
		t = setTimeout(function () { horaActual(); }, 500);
	}

horaActual();

var timerReunion,
	minReunion = 0,
	segReunion = 0;

$(document).on('click', '#btnTiempoReunion', function (e) {

	var iniciada = $(this).data('iniciada');

		if(iniciada == 'no'){
			timerReunion  = setInterval(function(){
				  segReunion = segReunion + 1;
		
				  if(segReunion>59) {
				    segReunion = 0;
				    minReunion = minReunion + 1;
				  }
				  
				  minTxt = (minReunion < 10) ? '0' + minReunion : minReunion;
				  segTxt = (segReunion < 10) ? '0' + segReunion : segReunion;

				  $('#transcurridoReu').text(minTxt + ':' + segTxt)
		
				}, 1000);

			$(this).addClass('btn-danger').removeClass('btn-topBar').data('iniciada','si').empty().text('Parar reunion');
		}else{
			$(this).addClass('btn-topBar').removeClass('btn-danger').data('iniciada','no').empty().text('Comenzar reunion');
			clearInterval(timerReunion);
			minReunion = 0, 
			segReunion = 0;
		}
		e.preventDefault();

});

var timerAsignacion,
	minAsig = 0,
	segAsig = 0;

	$(document).on('click', '#btnTiempoAsignacion', function (e) {
		var iniciada = $(this).data('iniciada');

		if(iniciada == 'no'){
			timerAsignacion  = setInterval(function(){
				  segAsig = segAsig + 1;
		
				  if(segAsig>59) {
				    segAsig = 0;
				    minAsig = minAsig + 1;
				  }
				  
				  minTxt = (minAsig < 10) ? '0' + minAsig : minAsig;
				  segTxt = (segAsig < 10) ? '0' + segAsig : segAsig;

				  $('#transcurridoAsig').text(minTxt + ':' + segTxt)
		
				}, 1000);

			$(this).addClass('btn-danger').removeClass('btn-topBar').data('iniciada','si').empty().text('Parar asignacion');
		}else{
			$(this).addClass('btn-topBar').removeClass('btn-danger').data('iniciada','no').empty().text('Comenzar asignacion');
			clearInterval(timerAsignacion);
			minAsig = 0, 
			segAsig = 0;
		}
		e.preventDefault();
	});
