let pokemonRepository = (function () {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList
    };
    function add(pokemon) {
        // if( typeof pokemon === 'name' && 'detailsURL' in pokemon){
        pokemonList.push(pokemon);
        // } else {
        //     console.log('invalid pokemmon');
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item')
        pokemonList.appendChild(listItem);
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary')
        button.setAttribute('data-toggle', 'modal')
        button.setAttribute('data-target', '.modal')
        button.setAttribute('type', 'button')
        listItem.appendChild(button);
        pokemonList.appendChild(listItem);
        buttonClick(button, pokemon);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        modalTitle.empty();
        modalBody.empty();
        let pokemonName = $('<h1>' + pokemon.name + '</h1>');
        let pokemonImage = $('<img class = modal-image>');

        pokemonImage.attr("src", pokemon.imageURL);
        let pokemonWeight = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');
        let pokemonType = $('<p>' + 'Type : ' + pokemon.types + '</p>')

        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonType);
    }




    // bonus task
    function buttonClick(button, pokemon) {

        button.addEventListener('click', function () { showDetails(pokemon) })
    }

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            item.imageURL = details.sprites.front_default;
            item.weight = details.weight;
            item.types = [];
            for (var i = 0; i < details.types.length; i++) {
                item.types.push(' ' + details.types[i].type.name);
            }
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }
    // bonus task 1.7

    let mainTitle = document.querySelector('.main-title');
    let loadingMessage = document.querySelector('.loading-message');

    function showLoadingMessage() {
        loadingMessage.innerText = 'loading...'
        mainTitle.appendChild(loadingMessage);
    }

    function hideLoadingMessage() {
        mainTitle.appendChild(loadingMessage);
        loadingMessage.classList.add('invisible');
    }

    // these are methods that can be called outside IIFE   


    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        showDetails: showDetails,
        buttonClick: buttonClick,
        loadList: loadList,
        loadDetails: loadDetails,
        showLoadingMessage: showLoadingMessage,
        hideLoadingMessage: hideLoadingMessage,
    }
}
)();

// this is outside the IIFE
let allPokemons = pokemonRepository.getAll();

pokemonRepository.loadList().then(function () {
    allPokemons.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    })
});
const searchBar = document.querySelector('.form-control');

searchBar.addEventListener('input', (input) => {
    let searchValue = input.target.value
    filterPokemons(searchValue);
})


function filterPokemons(searchInput) {
    let value = searchInput.toLowerCase();
    console.log(value);
    console.log(allPokemons)
    let filteredPokemons = allPokemons.filter((pokemon) => {
       return pokemon.name.includes(value);
    })
    console.log(filteredPokemons);
    // allPokemons = [];
    
}

function updatePokemons(filteredPokemons){
    allPokemons= [];
    pokemonRepository.addListItem(filteredPokemons)
    console.log('click')
}
const searchButton = document.querySelector('#searchButton')
searchButton.addEventListener('click', updatePokemons);





// if (value && value.trim().length > 0) {
// value = value.trim().toLowerCase();
//     filterPokemons(value);
//     pokemonRepository.addListItem(filteredPokemons)
// }

