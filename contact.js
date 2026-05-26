/**
 * contact.js — Gestione modulo di contatto con EmailJS
 * Invia i messaggi a info@francescocastaldi.it
 * Richiede che EmailJS SDK sia già incluso nella pagina HTML
 */

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Leggi Service ID e Template ID da attributi data (opzionale, ma più flessibile)
    // Se non presenti, usa i valori di default (modifica con i tuoi ID se necessario)
    const serviceId = form.getAttribute('data-service-id') || 'service_ir661io';
    const templateId = form.getAttribute('data-template-id') || 'template_p0m1rk3';

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        const messageDiv = document.getElementById('form-message');
        
        // Disabilita il pulsante
        btn.disabled = true;
        btn.textContent = 'Invio in corso...';
        
        // Raccogli i dati del form
        const formData = new FormData(form);
        // Costruisci i parametri da inviare a EmailJS
        // Aggiungiamo il campo "to_email" con l'indirizzo di destinazione fisso
        const templateParams = {
            to_email: 'info@francescocastaldi.it',   // ← DESTINATARIO FISSO
            from_name: formData.get('from_name') || '',
            reply_to: formData.get('reply_to') || '',
            message: formData.get('message') || ''
        };
        
        // Invia i parametri via EmailJS (send invece di sendForm per controllo totale)
        emailjs.send(serviceId, templateId, templateParams)
            .then(function(response) {
                console.log('Successo!', response);
                if (messageDiv) {
                    messageDiv.innerHTML = '<span style="color: #10b981;">✅ Messaggio inviato! Ti risponderò presto.</span>';
                }
                form.reset();
            })
            .catch(function(error) {
                console.error('Errore durante l\'invio:', error);
                if (messageDiv) {
                    let errorMsg = '❌ Errore nell\'invio. Riprova più tardi.';
                    if (error.text) errorMsg += ` (${error.text})`;
                    messageDiv.innerHTML = `<span style="color: #ef4444;">${errorMsg}</span>`;
                }
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = originalText;
            });
    });
});
