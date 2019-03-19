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

class Bd{

    constructor(){
        let id = localStorage.getItem('id')
        if(id===null){
            localStorage.setItem('id', 0 )
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }
    
    gravar(despesas){
        let id = this.getProximoId()
        localStorage.setItem(id,JSON.stringify(despesas))
        localStorage.setItem('id',id)
    }
}

let bd = new Bd

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
    
    bd.gravar(despesas)

}
