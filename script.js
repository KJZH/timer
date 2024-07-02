//Se está guardando la etiqueta
const html = document.querySelector('html');


//Se guarda cada clase de los botones
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
//Se guarda la clase asociada a la imagen
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
//Se quiere que todos los botones sufran el mismo cambio por eso el querySelectorAll
// Crea una variable para almacenar todos los botones con la clase appCardButton 
//utilizando document.querySelectorAll.
const botones = document.querySelectorAll('.app__card-button');

//Se guarda el id del input del toggle en una constante
//variable llamada `InputEnfoqueMusica utilizando 
//document.querySelector y pasa el id del input como parámetro
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonIniciarPausar = document.querySelector('#start-pause');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon')

const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;

//Se llama y almacena al elemento de audio, se crea un objeto audio
//nueva variable llamada musica y utiliza el objeto Audio 
//para crear una instancia de él con la ruta del archivo de 
//música "('./sonidos/luna-rise-part-one.mp3”
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const sonidoReproducir = new Audio('./sonidos/play.wav');
const sonidoPausar = new Audio('./sonidos/pause.mp3');
const sonidoBeep = new Audio('./sonidos/beep.mp3');

//se va a utilizar también la etiqueta para cambiar el texto
const textoIniciarPausar = document.querySelector('#start-pause span');

//atributo loop del objeto Audio como true para reproducir la música en bucle.
musica.loop = true;

//Se añade un evento de escucha, cuando el imput del toggle cambie, se cumplen las condiciones
//Estas condiciones contienen propiedades disponibles como controles básicos del audio
//play pause currentTime volume
//para reproducir o pausar la música cuando cambie el estado del botón toggle

//evento de cambio al input InputEnfoqueMusica utilizando addEventListener.
// función anónima dentro del evento para verificar 
//si la música está pausada utilizando la propiedad paused del objeto Audio:
//Si está pausada, utiliza el método play para reproducirla.
//En caso contrario, utiliza el método pause para pausar la música.
inputEnfoqueMusica.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }
    else{
        musica.pause();
    }
})


//Se añade una escucha para cambiar el evento del elemento html por uno de los botones (el callback)
// Dentro de los eventListener de cada botón, 
//utiliza el método classList.add para añadir la clase active cuando se hace clic en el botón.
botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})

// En la función cambiarContexto', utiliza el bucle forEach para iterar por cada botón
// y crea una función que elimine la clase 'active' de los botones no seleccionados.
function cambiarContexto(contexto){
    mostrarTiempo();  
    //Agregamos la función de desactivar los otros fondos 
    botones.forEach(function(contexto){
        contexto.classList.remove('active')
    }) 

    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src',`/imagenes/${contexto}.png`);
    //cambio de nuevo párrafo cuando cambie el parámetro contexto
    switch(contexto){
        case "enfoque":
            titulo.innerHTML = `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case "descanso-corto":
            titulo.innerHTML = `¿Qué tal tomar un respiro?,<br>
                <strong class="app__title-strong">¡Haz una pausa corta!</strong>`;
            break;
        case "descanso-largo":
            titulo.innerHTML = `Hora de volver a la superficie,<br>
                <strong class="app__title-strong">Haz una pausa larga</strong>`;
            break;
        default:
            break;
    }
    
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <=0){
        sonidoBeep.play();
        alert("Tiempo finalizado")
        reiniciar();  
        return;
    }
    textoIniciarPausar.textContent = "Pausar";
    tiempoTranscurridoEnSegundos--;
    mostrarTiempo();
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar () {
    if(idIntervalo){
        sonidoPausar.play();
        reiniciar();
        return;
    }
    sonidoReproducir.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    cambiarIconoIniciarPausar ();
}

function reiniciar () {
    clearInterval(idIntervalo);
    idIntervalo = null;
    textoIniciarPausar.textContent = "Comenzar";
    cambiarIconoIniciarPausar ();
}

function cambiarIconoIniciarPausar (){
    if(idIntervalo == null)
    iconoIniciarPausar.setAttribute('src',`/imagenes/play_arrow.png`);
    else 
    iconoIniciarPausar.setAttribute('src',`/imagenes/pause.png`);
}

function mostrarTiempo(){
    const tiempo = new Date (tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute: '2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}
  
mostrarTiempo();  