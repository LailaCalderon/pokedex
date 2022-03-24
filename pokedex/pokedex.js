const pokeInput = document.getElementById("pokeName");
const pokeNum = document.getElementById("pokeNum");
const pokemoves = document.getElementById("moves");
const pokeTipo = document.getElementById("tipo");
const pokeHabs = document.getElementById("habs");
const pokePeso = document.getElementById("peso");
const pokeAltura = document.getElementById("altura");
const boton = document.getElementById("btn");



const fetchPokemon = () => {
    let pokeInput = pokeName.value.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeInput}`;
    fetch(url).then((res) => {
        if (res.status != "200"){
            console.log(res);
            pokeImage("img/nofind.png");
            borrar();
        }
        else{
            return res.json();
        }
        
    }).then((data) => {
        console.log(data);
        let pokeImg = data.sprites.front_default;
        console.log(pokeImg);
        pokeImage(pokeImg);
        let pokeId = data.id;
        let pokeNom = data.name.toUpperCase();
        pokeNum.innerHTML = `Nº:${pokeId} ${pokeNom}`;
        let moves = data.moves;
        verMoves(moves);
        let type = data.types[0].type.name;
        verTipo(type);
        let stats = data.stats;
        verHabs(stats);
        let pokeWeight = data.weight;
        verPeso(pokeWeight);
        let pokeHeight = data.height;
        verAltura(pokeHeight);
    })
}

/* Imagen */
const pokeImage = (url) => {
    const pokeImg = document.getElementById("pokeImg");
    pokeImg.src = url;
}

/* Tipo de pokemon */
const verTipo = (type) => {
    pokeTipo.textContent = `Tipo: ${type}`
}

/* Movimientos */
const verMoves = (moves) => {
     pokemoves.innerHTML = "<b>MOVIMIENTOS</b>";
    for (let i=0; i<5; i++){
        const movimientos = document.createElement("li");
        movimientos.innerHTML = `${moves[i].move.name}`;
        pokemoves.appendChild(movimientos);
    }
}

/* Estadisticas */

const verHabs = (habs) => {
    pokeHabs.innerHTML = "<b>HABILIDADES</b>";
    habs.forEach((habilitie) => {
        const habilidad = document.createElement("li");
        habilidad.innerHTML = `${habilitie.stat.name}: <span>${habilitie.base_stat}</span>`;
        pokeHabs.appendChild(habilidad);

    })
}

/* Peso */
const verPeso = (weight) => {
    pokePeso.textContent = `Peso: ${weight/10}kg`;
}

const verAltura =(height) => {
    pokeAltura.textContent = `Altura: ${height/10}m`;
}

const borrar = () => {
    pokeNum.innerHTML = " ";
    pokemoves.innerHTML = " ";
    pokeTipo.innerHTML = " ";
    pokeHabs.innerHTML = " ";
    pokePeso.innerHTML = " ";
    pokeAltura.innerHTML = " ";
    
}

boton.addEventListener("click", fetchPokemon);

