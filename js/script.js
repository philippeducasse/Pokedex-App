let pokemonRepository = (function(){

    let pokemonList=[];

    let apiUrl= 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    let modalContainer= document.querySelector('#modal-container');

    function getAll () {
        return pokemonList
        };
    function add(pokemon){
        pokemonList.push(pokemon);
        } 

    function addListItem(pokemon){
    
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
            listItem.classList.add('list-group-item')
            pokemonList.appendChild(listItem);
        let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add = 'btn-block btn-primary pokemon-button';   
            button.setAttribute('data-toggle','modal')
            button.setAttribute('data-target','#example-modal')
        listItem.appendChild(button);
        pokemonList.appendChild(listItem)
        buttonClick(button,pokemon);
    }

    window.addEventListener('keydown', (e) => {
        
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideDetails();  
        }
      });

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {

            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalBody= $('.modal-body');
        let modalTitle= $('.modal-title');
        modalTitle.empty();
        modalBody.empty();
        let pokemonName = $('<h1>' + pokemon.name + '</h1>')   
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr('src', pokemon.imageUrl);
        let pokemonWeight = $('<p>' + 'Weight : ' + pokemon.weight + '</p>');  

        modalTitle.append(pokemonName);
        modalBody.append(pokemonImage);
        modalBody.append(pokemonWeight);
    }

        function hideDetails (){
            modalContainer.classList.remove('is-visible');
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
pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem (pokemon)
    });
}); 