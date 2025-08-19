const pokemonName1 = document.querySelector('.pokemonName1');
const pokemonNumber1 = document.querySelector('.pokemonNumber1');
const pokemonImage1 = document.querySelector('.pokemonImage1');
const form1 = document.querySelector('.form1');
const input1 = document.querySelector('.inputSearch1');
const buttonPrev1 = document.querySelector('.btn-prev1');
const buttonNext1 = document.querySelector('.btn-next1');
const type0 = document.querySelector('.pokemonType0');
const type1 = document.querySelector('.pokemonType1')

const pokemonName2 = document.querySelector('.pokemonName2');
const pokemonNumber2 = document.querySelector('.pokemonNumber2');
const pokemonImage2 = document.querySelector('.pokemonImage2');
const form2 = document.querySelector('.form2')
const input2 = document.querySelector('.inputSearch2');
const buttonPrev2 = document.querySelector('.btn-prev2');
const buttonNext2 = document.querySelector('.btn-next2');
const type2 = document.querySelector('.pokemonType2');
const type3 = document.querySelector('.pokemonType3');

let searchPokemon1 = 1;
let searchPokemon2 = 6;

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

    type0.innerHTML = data.types[0].type.name;
    type1.innerHTML = data.types[1].type.name;
}

const renderPokemonBack = async (pokemon) => {
    const data = await fetchPokemon(pokemon)

    pokemonName2.innerHTML = data.name;
    pokemonNumber2.innerHTML = data.id;

    pokemonImage2.style.display = 'block';
    pokemonImage2.src = data['sprites']['versions']['generation-v']['black-white']['animated']['back_default'];

    type2.innerHTML = data.types[0].type.name;
    type3.innerHTML = data.types[1].type.name;
}

renderPokemonFront(searchPokemon1);
renderPokemonBack(searchPokemon2);


form1.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemonFront(input1.value.toLowerCase());
})

buttonPrev1.addEventListener('click', () => {
    searchPokemon1--;
    if (searchPokemon1 < 1){
        searchPokemon1 = 1;
    }
    renderPokemonFront(searchPokemon1);
})

buttonNext1.addEventListener('click', () => {
    searchPokemon1++;
    renderPokemonFront(searchPokemon1);
})

