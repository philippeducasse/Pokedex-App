
// for (let i=0; i<pokemonList.length; i++){
//     document.write(pokemonList[i].name   +  '  (height:  '  + pokemonList[i].height  + ')  ')
//     if (pokemonList[i].height>10){
//         document.write(" - Wow, that´s big! <br>") 
//     } else {
//         document.write("<br>")
//     }
// }

// PART 1

// pokemonList.forEach(function(pokemon) {
//     document.write(pokemon.name + " (height: " + pokemon.height + "), ");
// });


// PART 2



let pokemonRepository = (function(){

    let pokemonList=[
    {name:'Bulbasaur', height: 4, type: ['grass','poison']},
    {name:'Charmander', height:12, type: ['fire','fight']},
    {name:'Squirtle', height:9, type: ['water', 'ice']},
    {name:'Hypno', height: 10, type: ['psychic','dark']}
    ];

    function getAll () {
        return pokemonList
        };
    function add(pokemon){
            pokemonRepository.add(pokemon);
        }
        // dont get this bit
    return { 
        getAll: getAll, 
        add: add,
     }
    }   
    )();

document.write (pokemonRepository.getAll());