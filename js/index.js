// 06-02-2017
// Antony.exe@gmail.com
Rad1US = {
	// Guardar numeros en memoria
	saveNum: [],
	// Fn para validar si el numero esta en memoria
	numExist: function(numero) {
		for (var i = 0; i < Rad1US.saveNum.length; i++) {
			if (Rad1US.saveNum[i] == numero) {
				return true;
			}
		}
	},
	// Fn Ordenar numeros de forma ascendente
	snippetSort: function(arreglo){
    for(i=0;i<(arreglo.length-1);i++)
			for(j=0;j<(arreglo.length-i);j++){
				if(arreglo[j]>arreglo[j+1]){
					aux=arreglo[j];
					arreglo[j]=arreglo[j+1];
					arreglo[j+1]=aux;
				}
			}
    return arreglo;
	},
	// Aceptar solo numeros en el campo de texto
	runSort: function(){
		var sortNum = $('#sortNum'),
				listNum = $("#listNum");
		sortNum.show();
		sortNum.unbind('click').bind('click', function(e){
			// Limpiamos la lista
			listNum.html('');
			// Ordenamos el Array en memoria
			var sorted = Rad1US.snippetSort(Rad1US.saveNum);
			console.log(sorted);
			// Mostramos los datos ordenados
			for (var a = 0; a < sorted.length; a++) {
				listNum.append('<li>'+ sorted[a] +'</li>');
			}
		});
	},
	// Document.Ready
	loadWebPage: function(){
		var inputNum = $('input[name=txtNum]'),
				idLogin = $('#login'),
				listNum = $("#listNum"),
				sortNum = $('#sortNum');
		// Ocultamos el btn
		sortNum.hide();
		$('.login-form').unbind('submit').bind('submit', function(e){
			var getNumText = inputNum.val();
			// Validamos si el numero se encuentra en la lista
			if (Rad1US.numExist(getNumText)) {
				idLogin.addClass('error_1');
				setTimeout(function () {
					idLogin.removeClass('error_1');
				}, 4000);
			} else {
				Rad1US.saveNum.push(getNumText);
				// Mostramos la lista de numeros ingresados, que no se repitan
				listNum.append('<li>'+ getNumText +'</li>');
				// Limpiamos el campo de texto
				inputNum.val('');
				// Invocamos a la funcion para ordenar si existe mas de dos valores en memoria
				if(Rad1US.saveNum.length > 1){
					Rad1US.runSort();
				}
			}
			e.preventDefault();
		});
	}
}

$(function(){
	Rad1US.loadWebPage();
});
