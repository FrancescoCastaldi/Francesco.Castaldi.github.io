document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    // Funzione per contare le visite globali del sito (non per pagina)
    function visitCounter() {
        console.log('visitCounter function called');

        // Usa una chiave globale per tutto il sito
        const GLOBAL_COUNTER_KEY = 'site_total_views';

        if (localStorage.getItem(GLOBAL_COUNTER_KEY)) {
            // Incrementa il contatore se esiste già
            localStorage.setItem(GLOBAL_COUNTER_KEY, Number(localStorage.getItem(GLOBAL_COUNTER_KEY)) + 1);
        } else {
            // Imposta il contatore a 1 per la prima visita
            localStorage.setItem(GLOBAL_COUNTER_KEY, 1);
        }

        // Mostra il numero di visite totali del sito
        const visitCountElement = document.getElementById('visit-count');
        if (visitCountElement) {
            console.log('visit-count element found');
            visitCountElement.innerText = 'Total Site Views: ' + localStorage.getItem(GLOBAL_COUNTER_KEY);
        } else {
            console.log('visit-count element not found');
        }
    }

    // Esegui la funzione quando la pagina viene caricata
    visitCounter();
});
