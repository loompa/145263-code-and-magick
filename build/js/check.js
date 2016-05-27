var getMessage = function (a,b) {
	if ( (typeof a) === "boolean") {
		if (a) {
			return "Я попал в " + b ;
		}
		else {
			return "Я никуда не попал" ;
		}
	}

	if ( (typeof a) === "number" ) {
		return "Я прыгнул на " + a*100 + " сантиметров" ;
	}

	if (Array.isArray(a) && Array.isArray(b)) {
		
		var length = 0 ;
			for (var i=0; i < a.length; i++) {
				length = length + a[i] * b[i] ;
			}
		return "Я прошёл " + length + " метров" ;
	}
	else {
		if (Array.isArray(a)) {
			var sum = 0 ;
												//массив [a] состоит из 4 элементов
			for (var i=0; i < a.length; i++) {	//1 2 2 4
				sum = sum + a[i] ;   			//сумма в цикле на первом шаге и втором
				} 					  			//верная (1 и 3), на третьем почему-то
		return "Я прошел "  + sum + " шагов" ;  //3+2=6 и в итоге sum=10
		}
   }

}

