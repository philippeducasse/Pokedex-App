
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
            pokemonList.appendChild(listItem);
        let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add = 'new-pokemon';   
        listItem.appendChild(button);
        buttonClick(button,pokemon);
    }

    function showModal(title,text,image) {

        modalContainer.innerHTML= '';
        let modal = document.createElement('div');
        modal.classList.add('modal');
        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'close';
        closeButtonElement.addEventListener('click', hideDetails);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = 'weight: ' + text;
        
        let contentImage = document.createElement('img');
        contentImage.src = image;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modal.appendChild(contentImage);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

    };

    window.addEventListener('keydown', (e) => {
        
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
          hideDetails();  
        }
      });

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {

            showModal(pokemon.name, pokemon.weight, pokemon.imageURL);
        });
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



