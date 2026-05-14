/**
 * contact.js — Gestione modulo di contatto con EmailJS
 * Richiede che EmailJS SDK sia già incluso nella pagina HTML
 */

// Attendi che il DOM sia completamente caricato
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Leggi Service ID e Template ID da attributi data (opzionale, ma più flessibile)
    // Se non presenti, usa i valori di default (che hai già)
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
        
        // Invia il form via EmailJS
        emailjs.sendForm(serviceId, templateId, this)
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
                    // Mostra un messaggio di errore più descrittivo se possibile
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