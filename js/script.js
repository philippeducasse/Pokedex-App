let pokemonRepository = (function () {

    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll() {
        return pokemonList
    };
    function add(pokemon) {
        pokemonList.push(pokemon);
    }
    
    // sort pokemon by order
    function sortPokemonByNumber(pokemonData) {
        return pokemonData.sort((a, b) => a.id - b.id);
    }
    // adds pokemon to list element

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');



        loadDetails(pokemon).then(function () { // loadDetails is needed to get type and image 
            listItem.classList.add('list-group-item')
            pokemonList.appendChild(listItem);
            button.innerHTML += "<h3>" + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + "</h3>";
            button.innerHTML += '<img src="' + pokemon.imageURL + '" alt="' + pokemon.name + "'s image and button\" >";
            button.classList.add('btn', 'pokemon-button', 'btn-primary', pokemon.types[0]);
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '.modal');
            button.setAttribute('type', 'button');
            listItem.appendChild(button);
            pokemonList.appendChild(listItem);
            buttonClick(button, pokemon);
        })

    }

    // combines the modal creation with the specific pokemon
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    // creates a modal (written in JQUERY)

    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        modalTitle.empty();
        modalBody.empty();
        let pokemonName = $('<h1>' + pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) + '</h1>');
        let pokemonImage = $('<img class = modal-image>');

        pokemonImage.attr("src", pokemon.modalImageURL);
        let pokemonWeight = $('<p>' + 'Weight : ' + pokemon.weight + ' lb' + '</p>');
        let pokemonHeight = $('<p>' + 'Height : ' + pokemon.height + ' ft' + '</p>');
        let pokemonType = $('<p>' + 'Type : ' + pokemon.types[0] + '</p>')
        if (pokemon.types.length > 1) {
            pokemonType.append(", " + pokemon.types[1]);
        }

        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonWeight);
        modalBody.append(pokemonHeight);
        modalBody.append(pokemonType);
    }

    // creates a function to open the modal when button is clicked
    function buttonClick(button, pokemon) {
        button.addEventListener('click', function () { showDetails(pokemon) })
    }

    // gets pokemon name and URL to get more infos for each Pokemon

    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            hideLoadingMessage();
            // this isn't working / not doing anything
            const sortedPokemonList = sortPokemonByNumber(

                json.results.forEach(function (item, index) {
                    let pokemon = {
                        id: index + 1,
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                })
            );
            pokemonList = sortedPokemonList; // Update the pokemonList with sorted data
            pokemonList.forEach(function (pokemon) {
                add(pokemon);
            });
        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }

    // retrieves specific details for each pokemon

    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoadingMessage();
            item.imageURL = details.sprites.front_default;
            item.modalImageURL = details.sprites.other.dream_world.front_default;
            item.id = details.id;
            item.weight = details.weight;
            item.height = details.height;
            item.types = [];
            for (let i = 0; i < details.types.length; i++) {
                item.types[i] = details.types[i]["type"]["name"];
            }
            item.hp = details.stats[1].base_stat;
            item.attack = details.stats[2].base_stat;
            item.defense = details.stats[3].base_stat;

        }).catch(function (e) {
            hideLoadingMessage();
            console.error(e);
        })
    }
    // shows loading message when API is loading

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

// gets all pokemons

let allPokemons = pokemonRepository.getAll();

pokemonRepository.loadList().then(function () {
    allPokemons.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    })
});

// search Pokemons by name 
const searchBar = document.querySelector('.form-control');
searchBar.value = '';

searchBar.addEventListener('input', (input) => {
    let searchValue = input.target.value
    filterPokemons(searchValue);
})

let filteredPokemons = [];
let selectedType = '';
let searchValue;

function filterPokemons(searchInput) {
    searchValue = searchInput.toLowerCase();
    filteredPokemons = allPokemons.filter((pokemon) => {
        return pokemon.name.includes(searchValue);
    })

}
// search pokemons by type

let typeFilters = document.querySelector('#type-filter');


typeFilters.addEventListener('change', function () {

    selectedType = typeFilters.value
    if (!typeFilters.classList.contains(selectedType)) {
        typeFilters.className = "";
        typeFilters.classList.add(selectedType);
    }

    // this will always filter all pkms
    filteredPokemons = allPokemons.filter(function (pokemon) {
        return pokemon.types.includes(selectedType);
    })
    filteredPokemons.forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon)
    })

    updatePokemons(filteredPokemons);
    if (selectedType === "all") {
        allPokemons.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    }
});


// updates the pokemon list based on the search criteria

// think of all the conditions that will happen when filtering

function updatePokemons(filteredPokemons) {
    let pokemonList = document.querySelector('.pokemon-list');
    pokemonList.innerHTML = '';

    if (filteredPokemons.length === 0 && selectedType !== 'all') {
        const noItem = document.createElement('p')
        noItem.innerText = 'No Pokemons found!'
        pokemonList.appendChild(noItem)
        const button = document.createElement('button');
        button.innerText = 'Reload All Pokemons';
        button.classList.add('btn', 'btn-primary');
        button.addEventListener('click', function () {
            pokemonList.innerHTML = '';
            selectedType = 'all';
            searchBar.value = '';
            allPokemons.forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon)
            })
        })
        pokemonList.appendChild(button);

    } else if (!filteredPokemons) {
        allPokemons.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon)
        })
    } else if (filteredPokemons.length > 0) {
        const button = document.createElement('button');
        button.innerText = 'Reload all Pokemons';
        button.classList.add('btn', 'btn-primary');
        console.log('click');
        button.addEventListener('click', function () {
            pokemonList.innerHTML = '';
            searchBar.value = '';
            allPokemons.forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon)
            })
        })
        selectedType = 'all';
        pokemonList.innerHTML = '';
        filteredPokemons.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon)
        })
        pokemonList.appendChild(button);
    } else if (selectedType = 'all') {
        const button = document.querySelector('.btn');
        button.innerHTML = '';
    }
    else {
        filteredPokemons.forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon)
        })
        const button = document.createElement('button');
        button.innerText = 'Reload all Pokemons';
        button.classList.add('btn', 'btn-primary');
        button.addEventListener('click', function () {
            pokemonList.innerHTML = '';
            allPokemons.forEach(function (pokemon) {
                pokemonRepository.addListItem(pokemon)
            })
        })
        pokemonList.appendChild(button);
    }
}

const searchButton = document.querySelector('#searchButton')
searchButton.addEventListener('click', function (e) {
    e.preventDefault();
    updatePokemons(filteredPokemons)
});

