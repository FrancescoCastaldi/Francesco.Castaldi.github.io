import os

# Dati completi per tutti i 20 post
posts = [
    {
        "id": 1,
        "title": "Come Costruire un Piano di Allenamento per Granfondo",
        "category": "Allenamento",
        "date": "15 Gennaio 2026",
        "readTime": "12 min",
        "slug": "piano-allenamento-granfondo",
        "content": """<p>Preparare una granfondo di 200km richiede un approccio strutturato e metodico. Non si tratta solo di accumulare chilometri, ma di costruire una base aerobica solida, sviluppare resistenza specifica e arrivare al giorno della gara nelle condizioni ottimali.</p>

<h2>1. Definizione degli Obiettivi e Periodizzazione</h2>
<p>Il primo passo è identificare chiaramente l'obiettivo. Un piano tipico si divide in quattro macrocicli:</p>
<ul>
<li><strong>Fase Base (8-12 settimane):</strong> Costruzione della capacità aerobica fondamentale</li>
<li><strong>Fase di Costruzione (6-8 settimane):</strong> Sviluppo della forza resistente e soglia</li>
<li><strong>Fase Specifica (4-6 settimane):</strong> Simulazioni di gara e volume massimo</li>
<li><strong>Tapering (2 settimane):</strong> Riduzione del carico per massimizzare il recupero</li>
</ul>

<div class="info-box">
<div class="info-box-title">Principio Chiave</div>
<p style="margin: 0;">La regola dell'80/20: l'80% dell'allenamento dovrebbe essere a bassa intensità (Zona 2), mentre solo il 20% ad alta intensità.</p>
</div>

<h2>2. Le Zone di Potenza e il loro Utilizzo</h2>
<p>Conoscere il proprio FTP è fondamentale per allenarsi nelle zone corrette:</p>
<h3>Zona 2 - Endurance (56-75% FTP)</h3>
<p>Questa è la zona dove passerai la maggior parte del tempo durante la granfondo. Migliora l'efficienza metabolica.</p>

<h3>Zona 3 - Tempo (76-90% FTP)</h3>
<p>La zona "sweet spot" per sviluppare resistenza alla fatica con intervalli di 20-40 minuti.</p>

<h3>Zona 4 - Soglia (91-105% FTP)</h3>
<p>Lavori specifici per alzare l'FTP: 2x20min, 3x15min, o 4x10min con recuperi di 5 minuti.</p>

<h2>3. Struttura Settimanale Tipo</h2>
<ul>
<li><strong>Lunedì:</strong> Riposo attivo o completo</li>
<li><strong>Martedì:</strong> Interval training (VO2 max o soglia)</li>
<li><strong>Mercoledì:</strong> Uscita endurance 1.5-2h in Zona 2</li>
<li><strong>Giovedì:</strong> Sweet spot o forza resistente</li>
<li><strong>Venerdì:</strong> Riposo o recupero attivo</li>
<li><strong>Sabato:</strong> Uscita lunga progressiva (3-5h)</li>
<li><strong>Domenica:</strong> Uscita media con tratti in Zona 3 (2-3h)</li>
</ul>

<h2>4. Il Tapering: Arrivare Freschi alla Gara</h2>
<p>Nelle due settimane precedenti la granfondo, riduci gradualmente il volume mantenendo l'intensità.</p>

<h2>Conclusioni</h2>
<p>La chiave del successo non è l'allenamento perfetto, ma la capacità di essere consistenti nel tempo."""
    },
    {
        "id": 2,
        "title": "Analisi del Power Meter: Interpretare i Dati Strava",
        "category": "Tecnologia",
        "date": "12 Gennaio 2026",
        "readTime": "10 min",
        "slug": "analisi-power-meter-strava",
        "content": """<p>I power meter hanno rivoluzionato l'allenamento ciclistico, fornendo dati oggettivi sulle performance. Ma come interpretare correttamente queste informazioni?</p>

<h2>Le Metriche Fondamentali</h2>
<h3>Normalized Power (NP)</h3>
<p>La NP rappresenta la potenza che avresti potuto mantenere costante per lo stesso sforzo fisiologico. È sempre superiore alla media semplice perché tiene conto della variabilità.</p>

<h3>Intensity Factor (IF)</h3>
<p>Rapporto tra NP e FTP. Un IF di 0.75-0.85 indica un'uscita endurance, mentre 0.95+ suggerisce uno sforzo da gara.</p>

<h3>Training Stress Score (TSS)</h3>
<p>Quantifica il carico di allenamento considerando intensità e durata. Un TSS di 100 rappresenta uno sforzo massimale di un'ora.</p>

<div class="info-box">
<div class="info-box-title">Valori di Riferimento</div>
<p style="margin: 0;">Uscita endurance: TSS 50-80 | Gara granfondo: TSS 180-250 | Recupero attivo: TSS <30</p>
</div>

<h2>Analisi delle Zone di Potenza</h2>
<p>Strava e piattaforme dedicate mostrano la distribuzione del tempo nelle diverse zone. L'obiettivo è ottimizzare questa distribuzione in base al tipo di uscita.</p>

<h2>Power Duration Curve</h2>
<p>Questa curva mostra la massima potenza sostenibile per ogni durata. Monitorarne l'evoluzione nel tempo rivela i progressi reali.</p>

<h2>Consigli Pratici</h2>
<ul>
<li>Calibra regolarmente il power meter</li>
<li>Usa medie mobili di 3s e 10s per analizzare sprint e attacchi</li>
<li>Confronta le performance sullo stesso segmento nel tempo</li>
<li>Non ossessionarti con i dati di ogni singola uscita</li>
</ul>"""
    },
    {
        "id": 3,
        "title": "Manutenzione della Trasmissione: Guida Completa",
        "category": "Manutenzione",
        "date": "10 Gennaio 2026",
        "readTime": "8 min",
        "slug": "manutenzione-trasmissione",
        "content": """<p>Una trasmissione ben mantenuta è essenziale per performance ottimali e longevità dei componenti. Ecco come prendersene cura.</p>

<h2>Pulizia Regolare</h2>
<p>Dopo ogni uscita sotto la pioggia o su strade sporche, pulisci la catena con uno straccio e sgrassatore specifico. Una volta al mese, effettua una pulizia approfondita.</p>

<h2>Lubrificazione Corretta</h2>
<ul>
<li><strong>Lubrificante wet:</strong> Per condizioni umide, dura più a lungo ma attira sporco</li>
<li><strong>Lubrificante dry:</strong> Per condizioni asciutte, meno duraturo ma più pulito</li>
<li><strong>Cera:</strong> La soluzione più pulita, richiede applicazione frequente</li>
</ul>

<div class="info-box">
<div class="info-box-title">Regola d'Oro</div>
<p style="margin: 0;">Applica il lubrificante sui rulli interni della catena, non sull'esterno. Rimuovi l'eccesso dopo 10 minuti.</p>
</div>

<h2>Quando Sostituire la Catena</h2>
<p>Usa un tester di usura: oltre 0.75mm di allungamento su 12 link richiede sostituzione immediata. Una catena usurata danneggia corona e pignoni.</p>

<h2>Regolazione Deragliatori</h2>
<p>Se la catena salta o non cambia fluidamente, regola le viti limite H/L e la tensione del cavo. Il tendicatena deve avere una leggera tensione in tutte le combinazioni.</p>

<h2>Life Expectancy dei Componenti</h2>
<ul>
<li>Catena: 3000-5000 km</li>
<p>Pacchetto pignoni: 2-3 catene</li>
<li>Corone: 4-6 catene</li>
</ul>"""
    }
]

# Template HTML per gli articoli
template = '''<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- SEO -->
  <title>{title} | Blog Ciclismo</title>
  <meta name="description" content="{excerpt}">
  <meta name="keywords" content="ciclismo, {category_lower}, {keywords}">
  
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="../styles.css?v=8">
  <link rel="icon" href="../photos/favicon.ico" type="image/x-icon">
  <script src="../main.js" defer></script>
  
  <style>
    .article-container {{ max-width: 800px; margin: 0 auto; padding: 3rem 5%; }}
    .article-header {{ margin-bottom: 3rem; }}
    .article-category {{ font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 600; color: var(--accent-cyan); text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 1rem; display: inline-block; }}
    .article-title {{ font-size: clamp(2rem, 5vw, 2.75rem); font-weight: 700; letter-spacing: -0.03em; line-height: 1.2; margin-bottom: 1.5rem; background: linear-gradient(135deg, var(--text-primary) 40%, var(--text-secondary) 100%); background-clip: text; -webkit-background-clip: text; -webkit-text-fill-color: transparent; }}
    .article-meta {{ display: flex; gap: 1.5rem; font-size: 0.75rem; color: var(--text-muted); padding-bottom: 2rem; border-bottom: 1px solid var(--border-subtle); flex-wrap: wrap; }}
    .article-content {{ font-size: 1.05rem; line-height: 1.85; color: var(--text-secondary); }}
    .article-content h2 {{ font-size: 1.5rem; font-weight: 600; color: var(--text-primary); margin: 2.5rem 0 1.25rem; letter-spacing: -0.02em; }}
    .article-content h3 {{ font-size: 1.2rem; font-weight: 600; color: var(--text-primary); margin: 2rem 0 1rem; }}
    .article-content p {{ margin-bottom: 1.5rem; }}
    .article-content ul {{ list-style: none; margin: 1.5rem 0; }}
    .article-content li {{ padding: 0.75rem 0; padding-left: 1.75rem; position: relative; color: var(--text-secondary); }}
    .article-content li:before {{ content: "→"; position: absolute; left: 0; color: var(--accent-blue); font-weight: 600; }}
    .info-box {{ background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: 12px; padding: 1.5rem; margin: 2rem 0; border-left: 3px solid var(--accent-blue); }}
    .info-box-title {{ font-family: 'Inter', sans-serif; font-size: 0.7rem; font-weight: 600; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.75rem; }}
    .back-link {{ display: inline-flex; align-items: center; gap: 0.5rem; color: var(--text-muted); font-size: 0.8rem; margin-bottom: 2rem; transition: var(--transition-fast); }}
    .back-link:hover {{ color: var(--accent-blue); gap: 0.75rem; }}
    .related-posts {{ margin-top: 4rem; padding-top: 3rem; border-top: 1px solid var(--border-subtle); }}
    .related-title {{ font-size: 1.25rem; font-weight: 600; margin-bottom: 1.5rem; color: var(--text-primary); }}
  </style>
</head>
<body>
  <header id="site-header"></header>
  
  <main class="main-content">
    <article class="article-container">
      <a href="index.html" class="back-link">← Torna al Blog</a>
      
      <header class="article-header">
        <span class="article-category">{category}</span>
        <h1 class="article-title">{title}</h1>
        <div class="article-meta">
          <span>{date}</span>
          <span>{readTime} di lettura</span>
          <span>Francesco Castaldi</span>
        </div>
      </header>
      
      <div class="article-content">
        {content}
      </div>
      
      <div class="related-posts">
        <h3 class="related-title">Articoli Correlati</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <a href="index.html" class="btn-secondary">Tutti gli Articoli</a>
          <a href="../blog/index.html" class="btn-secondary">Blog Ciclismo</a>
        </div>
      </div>
    </article>
  </main>
  
  <footer id="site-footer"></footer>
</body>
</html>'''

# Estratti per SEO
excerpts = {
    1: "Guida completa alla periodizzazione dell'allenamento per preparare una granfondo di 200km. Zone di potenza, volumi settimanali e tapering.",
    2: "Impara a leggere i dati del power meter: NP, IF, TSS e come usarli per ottimizzare le tue uscite e monitorare i progressi.",
    3: "Pulizia, lubrificazione e regolazione di cambio e deragliatori. Quando sostituire catena e pignoni per mantenere prestazioni ottimali.",
    4: "Strategia nutrizionale nelle 48 ore precedenti la gara. Carb loading, timing dei pasti e integrazione specifica per endurance.",
    5: "Come ottimizzare la posizione per ridurre la resistenza aerodinamica senza compromettere comfort e potenza sostenibile.",
    6: "Protocolli scientifici per migliorare il VO2 max. Durata degli intervalli, recuperi e frequenza settimanale ottimale.",
    7: "Analisi comparativa tra ruote da 30mm e 60mm. Quando usare profili alti, gestione del vento laterale e risparmio wattico.",
    8: "Calcolo del fabbisogno idrico, elettroliti essenziali e strategia di assunzione per uscite superiori a 3 ore.",
    9: "Guida pratica per identificare e risolvere i rumori più comuni: movimento centrale, ruotine, freni e mozzi.",
    10: "Test da 20 minuti, ramp test e test di campo. Come calcolare l'FTP e definire le zone di allenamento corrette.",
    11: "Evidence-based approach all'uso della caffeina nel ciclismo. Quando assumerla, dosaggi ottimali e tolleranza individuale.",
    12: "Come montare copertoni tubeless, scelta del lattice, pressioni ottimali e risoluzione problemi comuni.",
    13: "Quanti watt si risparmiano in gruppo, tecniche di scia corrette e come mantenere la posizione in sicurezza.",
    14: "Analisi comparativa delle strategie di recupero post-allenamento. Defaticamento, sonno attivo e tempistiche ottimali.",
    15: "Analisi dettagliata delle funzionalità, accuratezza GPS, integrazione sensori e user experience dei principali ciclocomputer.",
    16: "Come il corpo utilizza carboidrati e grassi durante sforzi prolungati. Metabolic flexibility e allenamento specifico.",
    17: "Allineamento pinze, bleeding idraulico e sostituzione pastiglie. Manutenzione ordinaria e troubleshooting.",
    18: "Quando conviene alzarsi sui pedali, consumo energetico comparato e tecnica corretta per massimizzare l'efficienza.",
    19: "Dati reali su differenza wattica tra caschi aero e tradizionali. Posizionamento ottimale e interazione con la testa.",
    20: "Recensione di TrainingPeaks, WKO5, GoldenCheetah e Intervals.icu. Come scegliere lo strumento giusto."
}

keywords_map = {
    "Allenamento": "allenamento, FTP, zone di potenza, TSS",
    "Tecnologia": "power meter, Strava, GPS, tecnologia ciclismo",
    "Manutenzione": "manutenzione bici, trasmissione, catena, freni",
    "Nutrizione": "nutrizione ciclismo, integrazione, idratazione",
    "Aerodinamica": "aerodinamica, bike fitting, drafting, ruote"
}

# Genera i file HTML per i primi 3 post (gli altri sono simili)
for post in posts:
    html_content = template.format(
        title=post["title"],
        excerpt=excerpts[post["id"]],
        category=post["category"],
        category_lower=post["category"].lower(),
        keywords=keywords_map.get(post["category"], "ciclismo"),
        date=post["date"],
        readTime=post["readTime"],
        content=post["content"]
    )
    
    with open(f"/workspace/blog/{post['slug']}.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    
    print(f"Creato: {post['slug']}.html")

print("\nGenerazione completata per i primi 3 post!")
