const pokemonName1 = document.querySelector('.pokemonName1');
const pokemonNumber1 = document.querySelector('.pokemonNumber1');
const pokemonImage1 = document.querySelector('.pokemonImage1');

const form1 = document.querySelector('.form1');
const input1 = document.querySelector('.inputSearch1');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon1 = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}
`);

    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;    
    }
}

const renderPokemonFront = async (pokemon) => {
    const data = await fetchPokemon(pokemon)

    pokemonName1.innerHTML = data.name;
    pokemonNumber1.innerHTML = data.id;
    pokemonImage1.style.display = 'block';
    pokemonImage1.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon1 = data.id;
    input1.value = '';
}

form1.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemonFront(input1.value.toLowerCase());
})