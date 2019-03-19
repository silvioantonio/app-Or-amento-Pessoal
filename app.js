class Despesas{
    constructor(ano, mes, dia, tipo, descricao, valor){
        this.ano = ano
        this.dia = dia
        this.mes = mes
        this.descricao = descricao
        this.valor = valor
        this.tipo = tipo
    }

    isDadosValidos(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null)
                return false
        }
        return true
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
    
    if(despesas.isDadosValidos()){
        bd.gravar(despesas)
        $('#tituloDoModal').html('Registro Inserido com Sucesso')
        $('.modal-header').removeClass('text-danger')
        $('.modal-header').addClass('text-success')
        $('.modal-body').html('Despesa foi cadastrada no LocalStorage do navegador!')
        $('.modal-footer button').removeClass('btn-danger')
        $('.modal-footer button').addClass('btn btn-success')
        $('.modal-footer button').html('Voltar')
        $('#modalRegistraDespesas').modal('show')
    }else{
        $('#tituloDoModal').html('Falha ao inserir Registro')
        $('.modal-header').removeClass('text-success')
        $('.modal-header').addClass('text-danger')
        $('.modal-body').html('Despesa nao foi cadastrada, todos os dados devem ser preenchidos!')
        $('.modal-footer button').removeClass('btn-success')
        $('.modal-footer button').addClass('btn btn-danger')
        $('.modal-footer button').html('Voltar e Corrigir')
        $('#modalRegistraDespesas').modal('show')
    }

}
