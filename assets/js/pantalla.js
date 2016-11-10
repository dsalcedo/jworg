
$('#bienvenida-timer-canvas').pietimer({
  seconds: 60,
  // color of the pie timer
  color: 'rgba(255, 255, 255, 1)',
  // width / height of the pie timer
  height: "500",
  width: "500",
//percent : 40,
  // is reversed?
  is_reversed: false
}, function(){
	$('.container').each(function(index, item){
		$(item).addClass('hide');
	});
  	$('#bienvenida').removeClass('hide');
});

function checkTime(i)
{
	return (i < 10) ? "0" + i : i;
}

function esconder()
{
	$('.container').each(function(index, item){
				$(item).addClass('hide');
	});
}

function startTime()
{
	var today = new Date(),
		h = checkTime(today.getHours()),
	    m = checkTime(today.getMinutes()),
	    s = checkTime(today.getSeconds());
	    var timer =  h + ":" + m + ":" + s;
	    
	    if(timer=='17:59:00' || timer=='11:59:00') {
	    	$('.container').each(function(index, item){
				$(item).addClass('hide');
			});

	    	$('#bienvenida-timer').removeClass('hide');
	    	$('#bienvenida-timer-canvas').pietimer('start');
	    }

	   // document.getElementById('time').innerHTML = timer;
	    t = setTimeout(function () {
		    	startTime();
		    }, 500);
}

var timerAsig,
	minAsig = 0,
	segAsig = 0;

function timerAsignacion(iniciada)
{
	if(iniciada == 'no'){
		timerAsig  = setInterval(function(){
			segAsig = segAsig + 1;	
			if(segAsig>59){
				    segAsig = 0;
				    minAsig = minAsig + 1;
				  }
				  
				  minTxt = (minAsig < 10) ? '0' + minAsig : minAsig;
				  segTxt = (segAsig < 10) ? '0' + segAsig : segAsig;

				  $('#crono-txt').text(minTxt + ':' + segTxt)
		
			}, 1000);
		}else{
			clearInterval(timerAsig);
			minAsig = 0, segAsig = 0;
		}

}

startTime();

//Mostrar en pantalla
socket.on('mostrar:tiempos::asignacion', function(proyectar){
	esconder();
	if(proyectar == 'si'){
		$('#crono').removeClass('hide');
	}else{
		$('#crono').addClass('hide');
		$('#bienvenida').removeClass('hide');
	}
});

//Tiempos
socket.on('tiempo::asignacion', function(iniciado){
	timerAsignacion(iniciado);
});





socket.on('slave:mostar', function(res){
	$('.container').each(function(index, item){
		$(item).addClass('hide');
	});
	$('#'+res.selector).removeClass('hide');
});

// TIMER ASIGNACIONES
var timer,
	min = 0,
	seg = 0;

socket.on('timer', function(res){

	if(res.iniciar=='iniciar'){

		timer  = setInterval(function(){
				  seg = seg + 1;
		
				  if(seg>59){
				    seg = 0;
				    min = min + 1;
				  }
				  
				  minTxt = (min < 10) ? '0' + min : min;
				  segTxt = (seg < 10) ? '0' + seg : seg;

				  $('#crono-txt').text('00:' + minTxt + ':' + segTxt)
		
				}, 1000);

	}else{
		clearInterval(timer);
		min = 0, seg = 0;
	}
	
});

//