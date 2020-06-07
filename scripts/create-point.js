// Função utilizando arrow function para abreviar o codigo. Onde chamo a API localidades.
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then(states => {
        for(state of states) {  //Interpolar ${}
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

// Função que chama a cidade.
function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {      
        for ( const city of cities) {  //Interpolar ${} * Parte que adicionamos codigo novo.
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) // Ao mudar ao Estado ele habilita a cidade.


// Itens de coleta (2 parte da pagina)
// Adicionar todos o items da lista (li)
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

//Criando uma coleção de dados puxando o input do HTML
let selectedItems = []

function handleSelectedItem(event) {
    
    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = event.target.dataset.id
    
    
    
    //verificar se existem  itens selecionados, se sim
    // pegar os items selecionados                   //arrowfunction
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId // isso será true ou False
        return itemFound
    })

    // se já estiver selecionado 
    if(alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemsIsDifferent = item != itemId //false
            return itemsIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        //adicionar a seleção
        selectedItems.push(itemId)
    }
       
    //atualizar o campo escondido com os itens selecionado
    collectedItems.value = selectedItems

}


