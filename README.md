Part 1: forEach() Loops

Use a forEach() function instead of the for loop you have to iterate over the Pokémon in your pokemonList array in order to print the details of each one. We recommend revisiting and carefully studying the userList example in this Exercise before doing this part of the task. Commit and push the changes to your GitHub repository.

Part 2: IIFE

    In the “scripts.js” file of your project, wrap your pokemonList array in an IIFE to avoid accidentally accessing the global state.
    Before anything else, create a new pokemonRepository variable to hold what your IIFE will return, then assign the IIFE to that variable.
    The IIFE should return an object with the following public functions assigned as keys:
        getAll: return all items (pokemonRepository.getAll(); should return the pokemonList array)
        add: add a single item to the pokemonList array (calling pokemonRepository.add(item); should add the Pokémon referred to with item to the pokemonList array)
    Make sure both functions are defined separately with the function keyword. Also, the IIFE returns only an object with the same names for keys as values (see the last paragraph of the Exercise)
    Outside of and below the IIFE, you should already have a forEach() loop that iterates over each Pokémon in the repository. But since you’ve limited access to the pokemonList array that’s inside the IIFE (so that it’s only accessible through one of the two functions returned by the IIFE), you need to update the loop code to cope with the new changes. Essentially, you need to use one of the two functions returned by the IIFE in order to retrieve the pokemonList array.
    Commit and push the changes to your GitHub repository. If all has gone well, your “index.html” file should look the same as before, but the code in "scripts.js" will look a whole lot more complicated. It’s also much more stable and ready to grow into a real app!
    Submit the link to your GitHub repository here. Feel free to share additional thoughts or ask questions on your submissions page.

Bonus Task

    Want even more practice? You may have noticed that the add() function lets you add anything to pokemonList within the repository. You can even add strings or numbers. That’s not good. In a real application, you’d want to make sure pokemonList can only be modified with the correct type of data. Inside the addv function, you can check if the typeof parameter is an object. In combination with a conditional, make sure you can only add the passed argument of the function to pokemonList if it’s an object.
    In addition to the type, you can also validate whether all Object.keys() of the parameter are equal to the specific keys you expect.
    If you’re feeling truly adventurous, you can take a look at how the filter() function works and create a whole new public function for pokemonRepository that allows you to find specific Pokémon only by name.
