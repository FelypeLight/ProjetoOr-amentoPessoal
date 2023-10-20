class Despesa {
	constructor (ano, mes, dia, tipo, descricao, valor) {
		this.ano = ano
 		this.mes = mes
		this.dia = dia
		this.tipo = tipo
		this.descricao = descricao
		this.valor = valor
	}

	 validarDados () {
		for(let i in this) {
			if(this[i] ==  undefined || this[i] == '' || this[i] == null){
		 		return false
			}
		}
		return true
	}
}
class Bd{
	constructor(){
		let id = localStorage.getItem('id')
		if( id === null ) {
			localStorage.setItem('id', 0)
		 }
	}

	getProximoId() {
		let proximoId = localStorage.getItem('id')

		return parseInt(proximoId) + 1
	}

	gravar(d) {
		let id = this.getProximoId()

		localStorage.setItem(id, JSON.stringify(d))

		localStorage.setItem('id', id)
	}
	recuperarTodosRegistros() {
		// Array de Despesas
		let despesas = Array()

		let id = localStorage.getItem('is')

		// Recuperar todas as despesas cadastradas em localStorage
		for (let i = 1; i <= id; i++) {

			//Recuperar a despesa
		let despesa = JSON.parse(localStorage.getItem(i))

			// Existe a possibilidade de haver índices que foram pulados/removidos
			// Nestes casos nós vamos pular esses índices
			if (despesa === null) {
				continue
			}
			despesa.id = i
			despesas.push(despesa)
		}

		return despesas
	}
	pesquisar(despesa) {

		let despesasFiltradas = Array()
		despesasFiltradas = this.recuperarTodosRegistros()
		console.log(despesasFiltradas);
		console.log(despesa)

		// Ano
		if(despesa.ano != '') {
			console.log("filtro de ano");
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}

		// Mês
		if(despesa.mes != '') {
			console.log("filtro de mes");
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}

		// Dia
		if(despesa.dia != '') {
			console.log("filtro de dia");
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}

		// Tipo
		if(despesa.tipo != '') {
			console.log("filtro de tipo");
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}

		// Descrição
		if(despesa.descricao != '') {
			console.log("filtro de descricao");
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}

		// Valor
		if(despesa.valor != '') {
			console.log("filtro de valor");
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}

		return despesasFiltradass
	}

	remover(id) {
		localStorage.removeItem(id)
	}
}

let bd = new Bd()

function cadastrarDespesa() {
	let ano = document.getElementById('ano')
	let mes = document.getElementById('mes')
	let dia = document.getElementById('dia')
	let tipo = document.getElementById('tipo')
	let descricao = document.getElementById('descricao')
	let valor = document.getElementById('valor')

	let despesa = new Despesa(
		ano.value,
		mes.value,
		dia.value,
		tipo.value,
		descricao.value,
		valor.value)

	if(despesa.validarDados()) {
		bd.gravar(despesa)

		document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
		document.getElementById('modal_titulo_div').className = 'modal-header text-success'
		document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
		document.getElementById('modal_btn').innerHTML = 'Voltar'
		document.getElementById('modal_btn').className = 'btn btn-success'

		// Diálogo de sucesso
		$('#modalRegiastraDespesa').modal('show')

		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
	} else {
		document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão de registros'
		document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
		document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preeenchidos corretamente!'
		document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
		document.getElementById('modal_btn').className = 'btn btn-danger'

		// Diálogo de erro
		$('#modalRegiastraDespesa').modal('show')
	}
}

function carregarListaDespesas(despesas = Array(), filtro = false) {

	if(despesas.legnth == 0 && filtro == false) {
		despesas = bd.recuperarTodosRegistros()
	}

	/* 

	<tr>
		<td>15/03/2023</td>
		<td>Alimentação</td>
		<td>Compra do mês</td>
		<td>444.75</td>
	</tr>

	*/

	let listaDespesas = document.getElementById("listaDespesas")
	listaDespesas.innerHTML = ''
	despesas.forEach(function(d){

		//Criando a linha (tr)
		var linha = listaDespesas.insertRow();

		//Criando as colunas (td)
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

		//Ajustar o tipo
		switch(d.tipo){
			case '1': d.tipo = 'Alimentação' break
			case '2': d.tipo = 'Educação' break
			case '3': d.tipo = 'Lazer' break
			case '4': d.tipo = 'Saúde' break
			case '5': d.tipo = 'Transporte' break
		}
		linha.insertCell(1).innerHTML = d.tipo
		linha.insertCell(2).innerHTML = d.descricao
		linha.insertCell(3).innerHTML = d.valor

		//Criar o botão de exclusão
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger'
		btn.innerHTML = '<i class="fa fa-times" ></i>'
		btn.id = `id_despesa_${d.id}`
		btn.onclick = function(){
			
		}
	})
}