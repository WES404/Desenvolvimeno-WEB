
var altura = 0
var largura = 0

function ajustaTamanhoPalcoJogo() {
	altura = window.innerHeight
	largura = window.innerWidth

	//console.log(altura, largura)
}

ajustaTamanhoPalcoJogo()

function posicaoRandomica() {

	var x = Math.floor(Math.random() * largura) - 90
	var y = Math.floor(Math.random() * altura) - 90

	x = x < 0 ? 0 : x
	y = y < 0 ? 0 : y

	// Criar o elemento HTML

	var mosquito = document.createElement('img')

	mosquito.src = 'imagens/mosca.png'
	mosquito.className = 'mosquito1'

	mosquito.style.left = x + "px"
	mosquito.style.top = y + "px"
	mosquito.style.position = 'absolute'

	document.body.appendChild(mosquito)
}