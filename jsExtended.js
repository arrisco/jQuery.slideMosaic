/*!
 * jsExtended
 * Arrisco - Publicidade e Design, Lda
 * Copyright (c) Arrisco - Publicidade e Design, Lda
 * Version: 0.01 (21-10-2010)
 * Licenciado em MIT e GPL3.
 */


if (!Array.prototype.shuffle) {
	Array.prototype.shuffle = function() {
	
		var copia = this.concat();
		var resultado = new Array(); 
		
		var i = 0;
		
		while(copia.length > 0){
			indice = Math.floor(Math.random() * copia.length);
			resultado[i] = copia.splice(indice, 1);
			i++;
			
			
		}
		
		return resultado;
		
	};
}


