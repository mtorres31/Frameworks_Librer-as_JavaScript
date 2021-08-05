//Cambia el color del titulo y alterna
function cambioColor(selector) {
	$(selector).animate({
			opacity: '1',
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
			},
			queue: true
		}, 600)
		.delay(1000)
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'white');
			},
			queue: true
		})
		.animate({
			opacity: '1'
		}, {
			step: function () {
				$(this).css('color', 'yellow');
				cambioColor('h1.main-titulo');
			},
			queue: true
		});
}

//Función para generar números aleatorios
function numerosAleatorios(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

// Obtiene filas o columnas de dulces
function arreglosDulces(tipoArreglo, index) {

	var dulceColumna1 = $('.col-1').children();
	var dulceColumna2 = $('.col-2').children();
	var dulceColumna3 = $('.col-3').children();
	var dulceColumna4 = $('.col-4').children();
	var dulceColumna5 = $('.col-5').children();
	var dulceColumna6 = $('.col-6').children();
	var dulceColumna7 = $('.col-7').children();

	var columnaDulces = $([dulceColumna1, dulceColumna2, dulceColumna3, dulceColumna4,
		dulceColumna5, dulceColumna6, dulceColumna7
	]);

	if (typeof index === 'number') {
		var filaDulce = $([dulceColumna1.eq(index), dulceColumna2.eq(index), dulceColumna3.eq(index),
			dulceColumna4.eq(index), dulceColumna5.eq(index), dulceColumna6.eq(index),
			dulceColumna7.eq(index)
		]);
	} else {
		index = '';
	}

	if (tipoArreglo === 'columns') {
		return columnaDulces;
	} else if (tipoArreglo === 'rows' && index !== '') {
		return filaDulce;
	}
}

// Funcion de arreglos de filas
function filaDulces(index) {
	var filaDulce = arreglosDulces('rows', index);
	return filaDulce;
}

// Funcion de arreglos de colunmnas
function columnaDulces(index) {
	var columnaDulce = arreglosDulces('columns');
	return columnaDulce[index];
}

// Validación dulces que se eliminarán en una columna
function validacionColumna() {
	for (var j = 0; j < 7; j++) {
		var contador = 0;
		var posicionDulce = [];
		var posicionDulceExtra = [];
		var columnaDulce = columnaDulces(j);
		var comparacionValor = columnaDulce.eq(0);
		var gap = false;
		for (var i = 1; i < columnaDulce.length; i++) {
			var comparacionSRC = comparacionValor.attr('src');
			var dulceSRC = columnaDulce.eq(i).attr('src');

			if (comparacionSRC != dulceSRC) {
				if (posicionDulce.length >= 3) {
					gap = true;
				} else {
					posicionDulce = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!gap) {
						posicionDulce.push(i - 1);
					} else {
						posicionDulceExtra.push(i - 1);
					}
				}
				if (!gap) {
					posicionDulce.push(i);
				} else {
					posicionDulceExtra.push(i);
				}
				contador += 1;
			}
			comparacionValor = columnaDulce.eq(i);
		}
		if (posicionDulceExtra.length > 2) {
			posicionDulce = $.merge(posicionDulce, posicionDulceExtra);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		cuentaDulce = posicionDulce.length;
		if (cuentaDulce >= 3) {
			eliminarcolumnaDulce(posicionDulce, columnaDulce);
			establecerPuntaje(cuentaDulce);
		}
	}
}
function eliminarcolumnaDulce(posicionDulce, columnaDulce) {
	for (var i = 0; i < posicionDulce.length; i++) {
		columnaDulce.eq(posicionDulce[i]).addClass('delete');
	}
}

// Validación dulces que se eliminarán en una fila
function validacionFila() {
	for (var j = 0; j < 6; j++) {
		var contador = 0;
		var posicionDulce = [];
		var posicionDulceExtra = [];
		var filaDulce = filaDulces(j);
		var comparacionValor = filaDulce[0];
		var gap = false;
		for (var i = 1; i < filaDulce.length; i++) {
			var comparacionSRC = comparacionValor.attr('src');
			var dulceSRC = filaDulce[i].attr('src');

			if (comparacionSRC != dulceSRC) {
				if (posicionDulce.length >= 3) {
					gap = true;
				} else {
					posicionDulce = [];
				}
				contador = 0;
			} else {
				if (contador == 0) {
					if (!gap) {
						posicionDulce.push(i - 1);
					} else {
						posicionDulceExtra.push(i - 1);
					}
				}
				if (!gap) {
					posicionDulce.push(i);
				} else {
					posicionDulceExtra.push(i);
				}
				contador += 1;
			}
			comparacionValor = filaDulce[i];
		}
		if (posicionDulceExtra.length > 2) {
			posicionDulce = $.merge(posicionDulce, posicionDulceExtra);
		}
		if (posicionDulce.length <= 2) {
			posicionDulce = [];
		}
		cuentaDulce = posicionDulce.length;
		if (cuentaDulce >= 3) {
			eliminarHorizontal(posicionDulce, filaDulce);
			establecerPuntaje(cuentaDulce);
		}
	}
}
function eliminarHorizontal(posicionDulce, filaDulce) {
	for (var i = 0; i < posicionDulce.length; i++) {
		filaDulce[posicionDulce[i]].addClass('delete');
	}
}

//Contador que muestra la puntuacion
function establecerPuntaje(cuentaDulce) {
	var puntaje = Number($('#puntaje-text').text());
	switch (cuentaDulce) {
		case 3:
			puntaje += 25;
			break;
		case 4:
			puntaje += 50;
			break;
		case 5:
			puntaje += 75;
			break;
		case 6:
			puntaje += 100;
			break;
		case 7:
			puntaje += 200;
	}
	$('#puntaje-text').text(puntaje);
}

//Llena de dulce el tablero
function verificarTablero() {
	llenarTableroDulces();
}

function llenarTableroDulces() {
	var top = 6;
	var column = $('[class^="col-"]');

	column.each(function () {
		var dulces = $(this).children().length;
		var agregarDulces = top - dulces;
		for (var i = 0; i < agregarDulces; i++) {
			var claseDulce = numerosAleatorios(1, 5);
			if (i === 0 && dulces < 1) {
				$(this).append('<img src="image/' + claseDulce + '.png" class="element"></img>');
			} else {
				$(this).find('img:eq(0)').before('<img src="image/' + claseDulce + '.png" class="element"></img>');
			}
		}
	});
	agregaeventosDulces();
	validarDulces();
}

// Validacion de dulces que borrar
function validarDulces() {
	validacionColumna();
	validacionFila();
	if ($('img.delete').length !== 0) {
		eliminardulceAnimacion();
	}
}


//Evento del usuario con el elemento dulce drag and drop y efecto de movimiento entre los caramelos
function agregaeventosDulces() {
	$('img').draggable({
		containment: '.panel-tablero',
		droppable: 'img',
		revert: true,
		revertDuration: 500,
		grid: [100, 100],
		zIndex: 10,
		drag: movimientoDulce
	});
	$('img').droppable({
		drop: cambioDulce
	});
	activarEventoDulces();
}

function desactivarEventoDulces() {
	$('img').draggable('disable');
	$('img').droppable('disable');
}

function activarEventoDulces() {
	$('img').draggable('enable');
	$('img').droppable('enable');
}

//Funcion de control movimiento dulce
function movimientoDulce(event, arrastrarDulce) {
	arrastrarDulce.position.top = Math.min(100, arrastrarDulce.position.top);
	arrastrarDulce.position.bottom = Math.min(100, arrastrarDulce.position.bottom);
	arrastrarDulce.position.left = Math.min(100, arrastrarDulce.position.left);
	arrastrarDulce.position.right = Math.min(100, arrastrarDulce.position.right);
}

//Funcion que reemplaza a los dulces anteriores
function cambioDulce(event, arrastrarDulce) {
	var arrastrarDulce = $(arrastrarDulce.draggable);
	var arrastraSRC = arrastrarDulce.attr('src');
	var sueltaDulce = $(this);
	var soltarSRC = sueltaDulce.attr('src');
	arrastrarDulce.attr('src', soltarSRC);
	sueltaDulce.attr('src', arrastraSRC);

	setTimeout(function () {
		verificarTablero();
		if ($('img.delete').length === 0) {
			arrastrarDulce.attr('src', arrastraSRC);
			sueltaDulce.attr('src', soltarSRC);
		} else {
			actualizacionMovimientos();
		}
	}, 500);

}

function verificacionTablero(result) {
	if (result) {
		verificarTablero();
	}
}

//Funcion verificacion puntuacion por cantidad de elementos en linea
function actualizacionMovimientos() {
	var valorActualPuntuacion = Number($('#movimientos-text').text());
	var result = valorActualPuntuacion += 1;
	$('#movimientos-text').text(result);
}

// Funcion que elimina automaticament los elementos
function eliminardulceAnimacion() {
	desactivarEventoDulces();
	$('img.delete').effect('pulsate', 400);
	$('img.delete').animate({
			opacity: '0'
		}, {
			duration: 300
		})
		.animate({
			opacity: '0'
		}, {
			duration: 400,
			complete: function () {
				eliminarDulce()
					.then(verificacionTablero)
					.catch(muestraError);
			},
			queue: true
		});
}

//Funcion que llena automaticamente de los espacios con elementos
function muestraError(error) {
	console.log(error);
}

function eliminarDulce() {
	return new Promise(function (resolve, reject) {
		if ($('img.delete').remove()) {
			resolve(true);
		} else {
			reject('No se pudo eliminar Candy...');
		}
	})
}

//Evento temporizador y boton reiniciar

// Evento para finalizar el juego
function finalizarJuego() {
	$('div.panel-tablero, div.time').effect('fold');
	$('h1.main-titulo').addClass('title-over')
		.text('Gracias por jugar!');
	$('div.puntaje, div.moves, div.panel-puntaje').width('100%');

}

// Funcion iniciador del juego
function iniciarJuego() {

	cambioColor('h1.main-titulo');

	$('.btn-reinicio').click(function () {
		if ($(this).text() === 'Reiniciar') {
			location.reload(true);
		}
		verificarTablero();
		$(this).text('Reiniciar');
		$('#timer').startTimer({
			onComplete: finalizarJuego
		})
	});
}

// Ejecucion Iniciar el juego
$(function() {
	iniciarJuego();
});
