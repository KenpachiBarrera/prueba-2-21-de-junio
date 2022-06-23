const baseUrl = `https://pokeapi.co/api/v2/pokemon/`; // llamamos a la API
const pokemon = document.getElementById('pokemonName'); // Cost que almance el dato
const buttonPokemon = document.getElementById('searchPokemon'); // imput de lupa
const buttonClear = document.getElementById('clearPokemon'); // imput de clean
const appNode = document.getElementById('app'); // Nodo donde se muestran los pokemon


// Eventos - Busqueda de pokemon sobre la imagen
buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //En dispositvos moviles - touchstart

// Eventos - Borrar pokemon sobre la imagen
buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //En dispositvos moviles - touchstart

// Mostar pokemon
async function insertPokemon() {
  try {
    const res = await fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`) //para eliminar los errores en altas y bajas
    const pokemonDataJSON = await res.json() //la respuesta que nos mostrara en JSON

    const allItems = [];
    const result = []; //Guardaremos la respuesta en el array

    for (let pokemonInfo in pokemonDataJSON) { //Convertimos el objeto JSON a array
      result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]); // mostramos 
    }

    // console.table(result); //! Mostramos la tabla

    //Que información vamos a consualtar de API

    //Imagen a consultar - Frente
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_shiny; //Imagen que nos muestra - Indicamos en camino

    //Imagen a consultar - Espalada
    const pokemonImageBack = document.createElement('img');
    pokemonImage.src = result[14][1].front_shiny; //Imagen que nos muestra - Indicamos en camino

    //Nombre de pokemon e ID
    const pokemonName = document.createElement('h2'); // lponemos sobre un h2
    pokemonName.innerText = `Name: ${result[10][1]}  ID: ${result[6][1]}`; // Mostramos nombre  y ID del pokemon

    //Tipo de pokemon
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Type: ${result[16][1][0].type.name}`; // Mostramos Tipo de pokemon

    //* Pokemon HP
    const hp = document.createElement('p');
    hp.innerText = `HP: ${result[15][1][0].base_stat}`; //*HP of pokemon
    hp.classList.add('pokemonStats');

    //* Attack power
    const attack = document.createElement('p');
    attack.innerText = `Attack: ${result[15][1][1].base_stat}`; //* Attack power of pokemon
    attack.classList.add('pokemonStats');

    //* Defense
    const defense = document.createElement('p');
    defense.innerText = `Defense: ${result[15][1][2].base_stat}`; //* Pokemon defense
    defense.classList.add('pokemonStats');

    //* Special Attack
    const specialAttack = document.createElement('p');
    specialAttack.innerText = `Special Attack: ${result[15][1][3].base_stat}`; //* Pokemon special attack
    specialAttack.classList.add('pokemonStats');

    //* Special Defense
    const specialDefense = document.createElement('p');
    specialDefense.innerText = `Special Defense: ${result[15][1][4].base_stat}`; //* Pokemon special defense
    specialDefense.classList.add('pokemonStats');

    //* Speed
    const speed = document.createElement('p');
    speed.innerText = `Speed: ${result[15][1][5].base_stat}`; //* Pokemon special attack
    speed.classList.add('pokemonStats');

    //* Contenerdor de stats
    const stats = document.createElement('div');
    stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
    stats.classList.add('pokemonStatsContainer');

    //Contenedor que muestra los elementos elegidos
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonImageBack , pokemonName ,pokemonType, stats); // Ponemos valores a mostrar
    container.classList.add('container');

    allItems.push(container); // Asignamos a la cosntante pokemonImageBack el valor mostrado en el container

    appNode.append(...allItems); // Que vamos a mostar 

  } catch (error) {
    alert("Vuelve a interlo Maestro Pokémon."); //error de busqueda
  }
}

function deletePokemons() {             // eliminamos las busquedas recientes 
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}