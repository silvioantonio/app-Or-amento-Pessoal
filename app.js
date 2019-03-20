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

    recuperarTodosRegistros(){
        let despesas = Array()
        let id = localStorage.getItem('id')
        
        //recupera todas as despesas cadastradas em localstorage
        for(let i = 1; i <= id; i++){
            //converte o parse passando pra variavel que é um objeto literal
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa != null) {   
                despesa.id = i
                despesas.push(despesa)//adiciona cada item dentro do array
            }
        }
        return despesas
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()

        //retorna truou false se o valos pesquisado existe na tabela 
        if(despesa.ano != '')
            despesasFiltradas = despesasFiltradas.filter(f => f.ano == despesa.ano)
        if(despesa.mes != '')
            despesasFiltradas = despesasFiltradas.filter(f => f.mes == despesa.mes)
        if(despesa.dia != '')
            despesasFiltradas = despesasFiltradas.filter(f => f.dia == despesa.dia)
        if(despesa.tipo != '')
            despesasFiltradas = despesasFiltradas.filter(f => f.tipo == despesa.tipo)
        if(despesa.descricao != '')
            despesasFiltradas = despesasFiltradas.filter(f => f.descricao == despesa.descricao)
        if(despesa.valor != '')
            despesasFiltradas = despesasFiltradas.filter(f => f.valor == despesa.valor)
        
        return despesasFiltradas
    }

    remover(id){
        localStorage.removeItem(id)
    }

}

let bd = new Bd()

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

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''

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

function carregaListaDespesas(metodo){
    //cria um novo array passando os objetos como parametro pro array
    let d = Array()
    d = metodo
    let listaDespesas = document.getElementById('listaDeDespesas')
    listaDespesas.innerHTML = ''

    d.forEach(function(despesa){
        //cria uma linha para cada elemento do array
        let linha = listaDespesas.insertRow()
        
        //cria uma coluna para cada elemento
        linha.insertCell(0).innerHTML = `${despesa.dia}/${despesa.mes}/${despesa.ano}`

        //ajustar o tipo
        switch (despesa.tipo) {
            case '1': despesa.tipo = 'Alimentaçao'
                break;
            case '2': despesa.tipo = 'Educaçao'
                break;
            case '3': despesa.tipo = 'Lazer'
                break;
            case '4': despesa.tipo = 'Saude'
                break;
            case '5': despesad.tipo = 'Tranporte'
                break;
        }
        linha.insertCell(1).innerHTML = despesa.tipo
        linha.insertCell(2).innerHTML = despesa.descricao
        linha.insertCell(3).innerHTML = despesa.valor

        let btn = document.createElement('button')
        btn.className = 'btn btn-danger'
        btn.innerHTML = '<i class = "fas fa-times"/>'
        btn.id = `id_despesa_${despesa.id}`
        btn.onclick = function(){
            bd.remover(despesa.id)
            carregaListaDespesas(bd.recuperarTodosRegistros())
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesas(ano, mes, dia, tipo, descricao, valor)

    //Chamada de funçao passando como paramentro o resultado de outra funçao
    carregaListaDespesas(bd.pesquisar(despesa))

}
