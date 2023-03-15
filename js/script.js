
// for (let i=0; i<pokemonList.length; i++){
//     document.write(pokemonList[i].name   +  '  (height:  '  + pokemonList[i].height  + ')  ')
//     if (pokemonList[i].height>10){
//         document.write(" - Wow, that´s big! <br>") 
//     } else {
//         document.write("<br>")
//     }
// }

// PART 1

// // pokemonList.forEach(function(pokemon) {
// //     document.write(pokemon.name + " (height: " + pokemon.height + "), ");
// // });


// PART 2



let pokemonRepository = (function(){

    let pokemonList=[
    {name:'Bulbasaur', weight: 4, type: ['grass','poison']},
    {name:'Charmander', weight:12, type: ['fire','fight']},
    {name:'Squirtle', weight:9, type: ['water', 'ice']},
    {name:'Hypno', weight: 10, type: ['psychic','dark']}
    ];

    function getAll () {
        return pokemonList
        };
    function add(pokemon){
            pokemonRepository.add(pokemon);
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

    function showDetails(pokemon){
        console.log(pokemon);
    }
// bonus task
     function buttonClick(button,pokemon){
        button.addEventListener('click',function(){showDetails(pokemon)})
     }

    return { 
        getAll: getAll, 
        add: add,
        addListItem: addListItem,
        showDetails: showDetails,
        buttonClick: buttonClick
     }
    }   
)();



pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem (pokemon)
});
   // ATTEMPT AT BONUS: DOESNT WORK "POKEMON IS NOT DEFINED"
        // if (
        //     typeof pokemon === 'object' &
        //     typeof pokemon.name === 'string' &
        //     typeof pokemon.weight === 'number' &
        //     Array.isArray(pokemon.type)
        //     ) {
        //         pokemonList.push(pokemon);
        //     } else {
        //         console.log('Invalid') 
        //     }

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

