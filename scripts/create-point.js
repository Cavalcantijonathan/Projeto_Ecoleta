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

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for ( const city of cities) {  //Interpolar ${}
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities) // Ao mudar ao Estado ele habilita a cidade.

