// Fetch
//
// POST

const BASE_URL = 'https://pokeapi.co/api/v2/'; 

// Fetch no async
/*
fetch(BASE_URL + 'pokemon/ditto')
    .then(res => res.json())
    .then(data => console.log(data));
*/
// fetch async


//Agregar al Local Storage
const fetchPokemon = async (pokemon) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemon}`);
        if (!response.ok) {
            throw new Error(`Error fetching Pokémon: ${response.status}`);
        }
        const parsedResponse = await response.json();
        localStorage.setItem('pokemon', JSON.stringify(parsedResponse));
        return parsedResponse;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

// Obtener pokemon
document.getElementById('get-btn')
    .addEventListener('click', async () => {
        const text = document.getElementById('poke-name').value.toLowerCase();
        const pokemon = await fetchPokemon(text);
        localStorage.setItem('currentPokeId', pokemon.id);
        console.log(pokemon.name);
        await fetchAndShowPokemon(pokemon.id);
    })

document.addEventListener('DOMContentLoaded', async () => {
    const storedId = localStorage.getItem('currentPokeId');
    const initialId = storedId ? parseInt(storedId) : 1;
    const pokemon = await fetchPokemon(initialId);
    console.log(pokemon.name);
    await fetchAndShowPokemon(initialId);
})

// obtener el anterior


document.getElementById('previous-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = Math.max(1, currentPokeId -1);
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon.name);
        await fetchAndShowPokemon(newId);
    })

    //Obtener el siguiente
document.getElementById('next-btn')
    .addEventListener('click', async () => {
        const currentPokeId = parseInt(localStorage.getItem('currentPokeId'));
        const newId = currentPokeId + 1;
        const pokemon = await fetchPokemon(newId);
        console.log(pokemon);
        await fetchAndShowPokemon(newId);
    })




/////////////////// EJERCICIOS

// - Manipular el DOM y agregar una tarjeta del pokemon.
const showPokemonCard = (pokemonData) => {
    const container = document.getElementById('pokemon-container');
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    if (pokemonData && pokemonData.name && pokemonData.id && pokemonData.weight && pokemonData.sprites && pokemonData.sprites.front_default) {
    card.innerHTML = `
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <h2>${pokemonData.name}</h2>
        <p>ID: ${pokemonData.id}</p>
        <p>Peso: ${pokemonData.weight}</p>
    `;
    }
    else {
        card.innerHTML = 
        `<p>Pokémon not found.</p>`;
    }
    container.appendChild(card);
}

// - La tarjeta debe mantenerse en la pantalla.
const fetchAndShowPokemon = async (pokemonId) => {
    try {
        const response = await fetch(`${BASE_URL}pokemon/${pokemonId}`);
        if (!response.ok) {
            throw new Error('Pokémon not found: ${response.status}');
        }
        const pokemonData = await response.json();
        showPokemonCard(pokemonData);
    } catch (err) {
        console.error(err);
    }
}