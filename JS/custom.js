const pokemonFront = {
    name: document.querySelector('.pokemonName1'),
    number: document.querySelector('.pokemonNumber1'),
    image: document.querySelector('.pokemonImage1'),
    input: document.querySelector('.inputSearch1'),
    form: document.querySelector('.form1'),
    btnPrev: document.querySelector('.btn-prev1'),
    btnNext: document.querySelector('.btn-next1'),
    types: [
        document.querySelector('.pokemonType0'),
        document.querySelector('.pokemonType1')
    ],
    searchId: 1
};

const pokemonBack = {
    name: document.querySelector('.pokemonName2'),
    number: document.querySelector('.pokemonNumber2'),
    image: document.querySelector('.pokemonImage2'),
    input: document.querySelector('.inputSearch2'),
    form: document.querySelector('.form2'),
    btnPrev: document.querySelector('.btn-prev2'),
    btnNext: document.querySelector('.btn-next2'),
    types: [
        document.querySelector('.pokemonType2'),
        document.querySelector('.pokemonType3')
    ],
    searchId: 1
}

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200){
        return await APIResponse.json();
    }
};

const renderPokemon = async (pokemon, elements, spriteKey) => {
    const data = await fetchPokemon(pokemon);

    elements.name.innerHTML = data.name;
    elements.number.innerHTML = data.id;
    elements.image.style.display = 'block';
    elements.image.src = data['sprites']['versions']['generation-v']['black-white']['animated'][spriteKey];

    elements.types[0].innerHTML = data.types[0].type.name;
    if(data.types.length > 1){
        elements.types[1].innerHTML = data.types[1].type.name;
        elements.types[1].style.display = 'inline';
    }else{
        elements.types[1].innerHTML = '';
        elements.types[1].style.display = 'none'
    }

    return data.id
}

const initPkm = (side, spriteKey) => {
    renderPokemon(side.searchId, side, spriteKey);

    side.form.addEventListener('submit', (event) => {
        event.preventDefault();
        renderPokemon(side.input.value.toLowerCase(), side, spriteKey).then(id => {
            side.searchId = id;
        });
    });

    side.btnPrev.addEventListener('click', () => {
        side.searchId = Math.max(1, side.searchId -1);
        renderPokemon(side.searchId, side, spriteKey);
    });

    side.btnNext.addEventListener('click', () => {
        side.searchId++;
        renderPokemon(side.searchId, side, spriteKey);
    });
};

initPkm(pokemonFront, 'front_default');
initPkm(pokemonBack, 'back_default');
