
var altura = 0
var largura = 0
var vidas = 1
var tempo = 10

var nivel = window.location.search.replace("?", "")

var criaMosquitoTempo

if(nivel === "normal") {

	criaMosquitoTempo = 1500

} else if(nivel === "dificil") {

	criaMosquitoTempo = 1000

} else if(nivel === "chucknorris") {

	criaMosquitoTempo = 750

}

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {

	tempo -= 1

	if(tempo = 0) {
		// Se tempo der 0 o jogo é vencido. Não há necessidade de checar os corações

		clearInterval(cronometro)
		clearInterval(Criamosquito)
		window.location.href = "vitoria.html"

	}else{

	document.getElementById("cronometro").innerHTML = tempo

	}
}, 1000)

function posicaoRandomica() {

	//remover mosquito anterior

	if (document.getElementById("mosquito")) {

		document.getElementById("mosquito").remove()

		if (vidas > 3) {
			
			window.location.href = "fim_de_jogo.html"

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
		// Ao clicar, remove o mosquito
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