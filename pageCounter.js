document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Funzione per contare le visite usando localStorage
    function visitCounter() {
        console.log('visitCounter function called');
        
        if (localStorage.getItem('page_view')) {
            // Incrementa il contatore se esiste già
            localStorage.setItem('page_view', Number(localStorage.getItem('page_view')) + 1);
        } else {
            // Imposta il contatore a 1 per la prima visita
            localStorage.setItem('page_view', 1);
        }
        
        // Mostra il numero di visite
        const visitCountElement = document.getElementById('visit-count');
        if (visitCountElement) {
            console.log('visit-count element found');
            visitCountElement.innerText = 'Page Views: ' + localStorage.getItem('page_view');
        } else {
            console.log('visit-count element not found');
        }
    }

    // Esegui la funzione quando la pagina viene caricata
    visitCounter();
});