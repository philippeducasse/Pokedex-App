
let pokemonRepository = (function(){

    let pokemonList=[];

    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function getAll () {
        return pokemonList
        };
    function add(pokemon){
        pokemonList.push(pokemon);
        } 
    function addListItem(pokemon){
    
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
            pokemonList.appendChild(listItem);
        let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add = 'new-pokemon';   
        listItem.appendChild(button);
        buttonClick(button,pokemon);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
      }
// bonus task
     function buttonClick(button,pokemon){
        button.addEventListener('click',function(){showDetails(pokemon)})
     }

     function loadList(){
        showLoadingMessage();
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function(json) {
            hideLoadingMessage();
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e){
            hideLoadingMessage();
            console.error(e);
        })
     }

     function loadDetails(item){
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            hideLoadingMessage();
            item.imageURL = details.sprites.front_default;
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function(e){
            hideLoadingMessage();
            console.error(e);
        })
     }
// bonus task 1.7

let mainTitle = document.querySelector('.main-title');
let loadingMessage = document.querySelector('.loading-message');

     function showLoadingMessage(){
            loadingMessage.innerText = 'loading...'
            mainTitle.appendChild(loadingMessage);
     }

     function hideLoadingMessage(){
        mainTitle.appendChild(loadingMessage);
        loadingMessage.classList.add('invisible');
     }

        
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
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem (pokemon)
    });
}); 

   // ATTEMPT AT BONUS: DOESNT WORK "POKEMON IS NOT DEFINED"
     
//    if (
//     typeof pokemon === 'object' &
//     typeof pokemon.name === 'string' &
//     typeof pokemon.weight === 'number' &
//     Array.isArray(pokemon.type)
//     ) {
//         pokemonList.push(pokemon);
//     } else {
//         console.log('Invalid') 
//     };
        // dont get this bit
// forEach loop

// pokemonRepository.getAll().forEach(function(pokemon) {
    
//     document.write(pokemon.name + " (weight: " + pokemon.weight + "), ");
//         }); 
// how would I add a pokemon using the add function?

// ATTEMPT AT LAST BONUS PART 


// let result = pokemonRepository.filter (pokemon => pokemon.name === pokemon);

// console.log (result)

// pokemonRepository.getAll().forEach(function(pokemon) {
//     let newList = document.querySelector('.pokemon-list');
//     let listItem = document.createElement('li');
//         newList.appendChild(listItem);
//     let button = document.createElement('button');
//         button.innerText = pokemon.name;
//         button.classList.add = 'new-pokemon';
//     listItem.appendChild(button);

//             }); 

