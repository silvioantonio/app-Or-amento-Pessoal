class Despesas{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.dia = dia
        this.mes = mes
        this.descricao = descricao
        this.valor = valor
        this.tipo = tipo
    }
}

function cadastrarDespesas(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesas = new Despesas(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
        console.log(despesas)
}