// Seleziona il video
var video = document.getElementById("myVideo");

// Inizializza il contatore di loop
var loopCount = 0;

// Definisci il numero massimo di loop
var maxLoops = 3;

// Assegna un evento 'ended' che si attiva ogni volta che il video finisce
video.addEventListener('ended', function() {
    loopCount++;
    if (loopCount < maxLoops) {
        // Riproduci nuovamente il video se non ha ancora raggiunto il massimo dei loop
        video.play();
    }
});
