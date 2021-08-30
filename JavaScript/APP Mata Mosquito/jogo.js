
var altura = 0
var largura = 0
var vidas = 1

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	//console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

function posicaoRandomica() {

	//remover mosquito anterior

	if (document.getElementById("mosquito")) {

		document.getElementById("mosquito").remove()

		if (vidas > 3) {
			//
		} else {

			document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png"
			vidas++
			
		}


	}

	var x = Math.floor(Math.random() * largura) - 90
	var y = Math.floor(Math.random() * altura) - 90

	x = x < 0 ? 0 : x
	y = y < 0 ? 0 : y

	// Criar o elemento HTML

	var mosquito = document.createElement('img')

	mosquito.src = 'imagens/mosca.png'
	mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio()

	mosquito.style.left = x + "px"
	mosquito.style.top = y + "px"
	mosquito.style.position = 'absolute'

	mosquito.id = 'mosquito'

	mosquito.onclick = function() {
		this.remove()
	}

	document.body.appendChild(mosquito)


}

function tamanhoAleatorio() {
	var classe = Math.floor(Math.random() * 3)

	switch(classe) {
		case 0:
			return 'mosquito1'
			
		case 1:
			return 'mosquito2'			

		case 2:
			return 'mosquito3'
	}
}

function ladoAleatorio() {
	var lado = Math.floor(Math.random() * 2)

	switch(lado) {
		case 0:
			return 'ladoA'
			
		case 1:
			return 'ladoB'
	}

}