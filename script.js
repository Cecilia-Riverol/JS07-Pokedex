/*Código para crear mi propia pokedex*/

//Buscar datos del pokemon a partir de su número o nombre
function buscarPokemon (contenedorNumero){
    let inputId = `pokemonInput${contenedorNumero}`;
    //Trimp para eliminar espacios y lowercase para que los datos sean minusculas
    let nombrePokemon = document.getElementById(inputId).value.trim().toLowerCase();
    const URLAPI = `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`;


    fetch(URLAPI)
    .then(Response => Response.json())
    .then(datosPokemon => mostrarPokemon(datosPokemon, contenedorNumero))
    //En este caso hago una función para catch porque quiero que se despliegue un texto en específico cuando no cargue el pokemon
    .catch(() => mostrarError(contenedorNumero))
    
}

//Mostrar información del Pokemon
function mostrarPokemon(datosPokemon, contenedorNumero){
    //Guardo la información del pokemon en LocalStorage
    localStorage.setItem(`lastPokemon${contenedorNumero}`, JSON.stringify(datosPokemon));
    //Con esto seleccionamos que sea el DIV correspondiente a la carta
    let infoDivID = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivID);

    // Varaible para extraer el tipo de pokemon de su array y enlistarlo
    let tiposHTML = datosPokemon.types.map(tipo => `<li>${tipo.type.name}</li>`).join('');


    //Creamos los elementos en el HTML
    infoDiv.innerHTML = `
    <img class="poke-img" src="${datosPokemon.sprites.other.home.front_default}">
    <h2 class = "poke-name">${datosPokemon.name.toUpperCase()}</h2>
    <p> <b> Número de ID:</b> ${datosPokemon.id} </p>
    <p> <b>Peso:</b> ${datosPokemon.weight/10} Kg</p>
    <p> <b>Altura:</b> ${datosPokemon.height/10} m</p>
    <p> <b>Tipo(s):</b></p>
    <ul>${tiposHTML}</ul>
    `
}

//Función para mostrar error y que aparezca texto en pantalla
function mostrarError(contenedorNumero){
    let infoDivID = `pokemonInfo${contenedorNumero}`;
    let infoDiv = document.getElementById(infoDivID);
    infoDiv.innerHTML = `
    <p class = "pk-error"> El pokemón que estás buscando no existe. <br> Por favor revisa la redacción e intenta de nuevo. </p>
   `
}



//Mostrar el último Poken visto o a Eevee en la ventana
window.onload = function(){
    let contenedorNumero = 1;
    let savedPokemon = localStorage.getItem(`lastPokemon${contenedorNumero}`);
    if (savedPokemon) {
        mostrarPokemon(JSON.parse(savedPokemon), contenedorNumero);
    } else {
        document.getElementById("pokemonInput1").value="133"; //133 es Eevee
        buscarPokemon(contenedorNumero);
    }
}