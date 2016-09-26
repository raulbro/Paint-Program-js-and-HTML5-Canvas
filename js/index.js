$(document).ready(start);
var draw;
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

var radius = 10;
var minRadius = 2;
var maxRadius = 30;
save();

function pincelSize(){
	$('#btnIncrease').click(function(){
		radius = radius + 2;
		if (radius >= maxRadius) {
			radius = maxRadius;
		}
		$('#pincelVal').text(radius);

	});

	$('#btnDecrease').click(function(){
		radius = radius - 2;
		if (radius <= minRadius) {
			radius = minRadius;
		}
		$('#pincelVal').text(radius);

	});
}

function start(){
	pincelSize();
	canvas.width = window.innerWidth - 15;
	canvas.height = window.innerHeight;

	$('#canvas').mousedown(press);
	$('#canvas').mousemove(paint);
	$('#canvas').mouseup(stop);

	function press(){
		draw = true;
		context.moveTo(event.pageX, event.pageY);
	}

	function paint(){
		if(draw){
			context.lineWidth = radius * 2;
			context.lineTo(event.pageX, event.pageY)
			context.stroke();

			context.beginPath();
			context.arc(event.pageX, event.pageY, radius, 0, 2*Math.PI);
			context.fill();

			context.beginPath();
			context.moveTo(event.pageX, event.pageY);
		}
	}

	function stop(){
		draw = false;
	}
}

function save(){
	$('#btnSave').click(function(){
		var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
		window.location.href = image;
	});
}