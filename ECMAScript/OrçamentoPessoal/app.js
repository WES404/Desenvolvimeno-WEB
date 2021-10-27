class Despesas {

    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {

        for(let i in this) {
            //this.i == this[i]
            if(this[i] == undefined || this[i] == "" || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem("id") 

        if (id == null) {
            // se não existir será 0
            localStorage.setItem("id", 0)
        }

    }

    getProximoId() {
        // Vai fazer um novo id
        let proximoId = localStorage.getItem("id")
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        // Gravando o item no local Storage
        
        let id = this.getProximoId()

        // Precisa passar o item como JSON
        localStorage.setItem(id, JSON.stringify(d))

        // Atualiza o numero de ids
        localStorage.setItem("id", id)
    }

    recuperarRegistros() {
        
        //Consulta
        let despesas = []

        let id = localStorage.getItem("id")

        // Recupera todas as despesas no localstorage
        for(let i = 1; i <= id; i++){

            let despesa = JSON.parse(localStorage.getItem(i))

            if (despesa === null) { 
                // se o registro for null pula
                continue
            }
            despesas.push(despesa)
        }
        
        return despesas
    }

    pesquisar(despesa) {
        //Consulta

        let filtradas = []
        filtradas = this.recuperarRegistros()

        if(despesa.anos !== ""){
            filtradas = filtradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes !== ""){
            filtradas = filtradas.filter(d => d.mes == despesa.mes)
        }

        if(despesa.dia !== ""){
            filtradas = filtradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.descricao !== ""){
            filtradas = filtradas.filter(d => d.descricao == despesa.descricao)
        }

        if(despesa.tipo !== ""){
            filtradas = filtradas.filter(d => d.tipo == despesa.tipo)
        }

        if(despesa.valor !== ""){
            filtradas = filtradas.filter(d => d.valor == despesa.valor)
        }

        return filtradas
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    //Pegando os valores
    let ano = document.getElementById("ano")
    let mes = document.getElementById("mes")
    let dia = document.getElementById("dia")
    let tipo = document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor")
    
    //Instanciando o Objeto
    let despesa = new Despesas(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value,
    )

    if(despesa.validarDados()) {

        //Gravando os dados
        bd.gravar(despesa)

        // Mudando a exibição do Modal
        document.getElementById("modal-titulo").innerHTML = "Cadastrado"
        document.getElementById("tipo_modal").className = "modal header text-success"
        document.getElementById("modal-body").innerHTML = "Registro cadastrado com Sucesso"
        document.getElementById("button_tipo").innerHTML = "Voltar"
        document.getElementById("button_tipo").className = "btn btn-success"

        // Exibindo o Modal
        $('#modalRegistroDespesa').modal("show")

        ano.value = ""
        mes.value = "" 
        dia.value = ""
        tipo.value = ""
        descricao.value = "" 
        valor.value = ""

    } else {
        
        // Mudando a exibição do Modal
        document.getElementById("modal-titulo").innerHTML = "Não cadastrado"
        document.getElementById("tipo_modal").className = "modal header text-danger"
        document.getElementById("modal-body").innerHTML = "Registro não cadastro por error nos dados"
        document.getElementById("button_tipo").innerHTML = "Voltar e Corrigir"
        document.getElementById("button_tipo").className = "btn btn-danger"

        // Exibindo o Modal
        $('#modalRegistroDespesa').modal("show")
    }
    
}

function carregaListaDespesa(despesas = [], filtro = false) {

    //Função tbm usada para consultar com filtros em pesquisarDespesa()

    if (despesas.length == 0 && filtro == false) {
        despesas = bd.recuperarRegistros()
    }

    // elemento tbody
    let listaDespesa = document.getElementById("lista_despesa") 

    listaDespesa.innerHTML = ""

    despesas.forEach(function(d) {
        
        // tr
        let linha = listaDespesa.insertRow()

        // th
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Mudando o valor do "tipo"
        switch(d.tipo) {

            case "1":
                d.tipo = "Alimentação"
                break
            
            case "2":
                d.tipo = "Educação"
                break

            case "3":
                d.tipo = "Lazer"
                break
                    
            case "4":
                d.tipo = "Saúde"
                break
            
            case "4":
                d.tipo = "Transporte"
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    })
}

function pesquisarDespesa() {
    
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let valor = document.getElementById("valor").value
    let descricao = document.getElementById("descricao").value
    let tipo = document.getElementById("tipo").value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    let filtradas = bd.pesquisar(despesa)

    carregaListaDespesa(filtradas, true)

}
