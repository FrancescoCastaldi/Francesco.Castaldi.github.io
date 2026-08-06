(function () {
  'use strict';

  var DAYS = ['Luned\u00EC', 'Marted\u00EC', 'Mercoled\u00EC', 'Gioved\u00EC', 'Venerd\u00EC', 'Sabato', 'Domenica'];

  var TYPES = {
    R: { label: 'Recupero' },
    E: { label: 'Endurance' },
    T: { label: 'Tempo' },
    I: { label: 'Interval' },
    L: { label: 'Lungo' },
    X: { label: 'Tecnica' }
  };

  var GOALS = [
    { id: 'granfondo',     label: 'Granfondo',     icon: '\uD83C\uDFD4\uFE0F' },
    { id: 'ftp',           label: 'FTP+',           icon: '\u26A1' },
    { id: 'resistenza',    label: 'Resistenza',     icon: '\uD83C\uDFC3' },
    { id: 'dimagrimento',  label: 'Dimagrimento',   icon: '\uD83D\uDD25' },
    { id: 'mantenimento',  label: 'Mantenimento',   icon: '\uD83D\uDD04' }
  ];

  var LEVELS = [
    { id: 'principiante', label: 'Principiante' },
    { id: 'intermedio',   label: 'Intermedio' },
    { id: 'avanzato',     label: 'Avanzato' }
  ];

  var HOURS_OPTS = [
    { id: '3-4', label: '3-4h' },
    { id: '5-6', label: '5-6h' },
    { id: '7-8', label: '7-8h' },
    { id: '9+',  label: '9+h' }
  ];

  var state = { goal: null, level: null, hours: null };
  var bodyEl = null;

  function expandTime(h) {
    var t = typeof h === 'number' ? h + 'h' : h;
    return t;
  }

  // Each plan entry: [typeChar, duration, zone, note]
  // null = rest day
  var PLANS = {};

  // ── GRANFONDO ──────────────────────────────────────────
  PLANS.granfondo = {
    principiante: {
      '3-4': [null, ['E','1h','Z2','Ritmo conversazione, rullo o strada'], null, null, ['E','1h','Z2','Andatura fluida'], ['R','45min','Z1','Rullo, stretching'], ['L','2h','Z2','Pianura, gestione ritmo']],
      '5-6': [null, ['E','1h15','Z2','Ritmo conversazione'], ['X','1h','Z2','Cambi di ritmo, tornanti'], null, ['E','1h15','Z2','Aggiungi saliscendi'], ['R','45min','Z1','Rullo, allungamenti'], ['L','2h30','Z2','Misto pianura/salite']],
      '7-8': [null, ['E','1h30','Z2','Ritmo fluido, Z2 costante'], ['X','1h','Z2','Cambi di ritmo, curve'], ['E','1h15','Z2','Saliscendi leggeri'], null, ['R','1h','Z1','Rullo o camminata'], ['L','3h','Z2','Lungo domenicale, nutrizione']],
      '9+':  [null, ['E','1h30','Z2','Base aerobica'], ['X','1h15','Z2','Tecnica di gruppo, scia'], ['E','1h30','Z2','Misto salite'], ['R','1h','Z1','Recupero attivo'], ['E','1h','Z2','Ritmo rilassato'], ['L','3h30','Z2','Lungo, simulazione ritmo gara']]
    },
    intermedio: {
      '3-4': [null, ['T','1h','Z3','Tempo costante, 20min Z3'], null, null, ['E','1h15','Z2','Recupero attivo'], ['R','45min','Z1','Rullo, stretching'], ['L','2h','Z2-Z3','Lungo, ultimi 30min Z3']],
      '5-6': [null, ['I','1h','Z4','4x4min sopra-soglia, rec 3min'], ['E','1h15','Z2','Ritmo conversazione'], null, ['E','1h15','Z2','Saliscendi'], ['R','45min','Z1','Rullo, mobilit\u00E0'], ['L','2h30','Z2-Z3','Lungo, progressione finale']],
      '7-8': [null, ['I','1h15','Z4','5x4min Z4, rec 3min'], ['E','1h30','Z2','Z2 costante, no strappi'], ['T','1h','Z3','1h Z3, ritmo granfondo'], null, ['R','1h','Z1','Recupero attivo'], ['L','3h','Z2-Z3','Lungo con tratti Z3']],
      '9+':  [null, ['I','1h15','Z4','6x4min Z4, rec 2min30'], ['E','1h30','Z2','Base aerobica'], ['T','1h15','Z3','Tempo rolling, simulate'], ['R','45min','Z1','Rullo, stretching'], ['E','1h30','Z2','Ritmo rilassato'], ['L','3h30','Z2-Z3','Lungo, simulazione gara']]
    },
    avanzato: {
      '3-4': [null, ['I','1h15','Z4-Z5','4x5min Z5, rec 4min'], null, null, ['T','1h15','Z3','Tempo 3x15min Z3'], ['R','45min','Z1','Rullo, mobilit\u00E0'], ['L','2h','Z2-Z4','Lungo, tratti Z4 simulazione']],
      '5-6': [null, ['I','1h15','Z4-Z5','5x5min Z5, rec 4min'], ['E','1h30','Z2','Z2, idratazione'], null, ['T','1h15','Z3','20-20-20 min Z3'], ['R','45min','Z1','Recupero attivo, foam roller'], ['L','3h','Z2-Z4','Lungo, simulazione granfondo']],
      '7-8': [null, ['I','1h30','Z4-Z5','6x5min Z5, rec 3min'], ['E','1h30','Z2','Z2 aerobica'], ['T','1h30','Z3','Tempo 3x20min Z3'], null, ['R','1h','Z1','Recupero attivo, stretching'], ['L','3h30','Z2-Z4','Lungo, ultima ora Z3-Z4']],
      '9+':  [['R','1h','Z1','Rullo o stretching'], ['I','1h30','Z4-Z5','8x4min Z5, rec 2min'], ['E','2h','Z2','Lungo Z2 mattutino'], ['T','1h30','Z3','4x15min Z3, rec 5min'], ['E','1h30','Z2','Ritmo rilassato'], ['R','1h','Z1','Recupero, foam roller'], ['L','4h','Z2-Z4','Lungo, simulazione gara completo']]
    }
  };

  // ── FTP+ ───────────────────────────────────────────────
  PLANS.ftp = {
    principiante: {
      '3-4': [null, ['I','1h','Z4','3x4min Z4, rec 4min'], null, ['E','1h','Z2','Recupero attivo Z2'], null, ['R','45min','Z1','Rullo'], ['E','1h30','Z2','Lungo Z2']],
      '5-6': [null, ['I','1h','Z4','4x4min Z4, rec 3min'], ['E','1h','Z2','Z2'], null, ['I','1h','Z4','3x4min Z4, rec 4min'], ['R','45min','Z1','Rullo, stretching'], ['L','2h','Z2','Lungo Z2']],
      '7-8': [null, ['I','1h15','Z4','5x4min Z4, rec 3min'], ['E','1h15','Z2','Z2'], ['I','1h','Z4','3x4min Z4, rec 4min'], null, ['R','1h','Z1','Recupero attivo'], ['L','2h30','Z2','Lungo Z2']],
      '9+':  [null, ['I','1h15','Z4','6x4min Z4, rec 3min'], ['E','1h30','Z2','Z2'], ['I','1h','Z4','4x4min Z4, rec 3min'], ['E','1h','Z2','Z2 rilassato'], ['R','45min','Z1','Rullo'], ['L','3h','Z2','Lungo Z2']]
    },
    intermedio: {
      '3-4': [null, ['I','1h15','Z4','4x6min Z4, rec 3min'], null, ['T','1h','Z3','2x15min Z3'], null, ['R','45min','Z1','Rullo, stretching'], ['L','2h','Z2','Lungo Z2']],
      '5-6': [null, ['I','1h15','Z4','5x6min Z4, rec 3min'], ['E','1h15','Z2','Z2'], null, ['I','1h','Z4','4x4min Z4, rec 3min'], ['R','45min','Z1','Recupero'], ['L','2h30','Z2','Lungo Z2']],
      '7-8': [null, ['I','1h30','Z4','6x6min Z4, rec 3min'], ['E','1h30','Z2','Z2'], ['I','1h15','Z4','4x5min Z4, rec 3min'], null, ['R','1h','Z1','Recupero attivo'], ['L','2h30','Z2','Lungo Z2']],
      '9+':  [null, ['I','1h30','Z4','7x6min Z4, rec 2min30'], ['E','1h30','Z2','Z2'], ['I','1h15','Z4','5x5min Z4, rec 2min'], ['E','1h15','Z2','Z2'], ['R','1h','Z1','Recupero'], ['L','3h','Z2','Lungo Z2']]
    },
    avanzato: {
      '3-4': [null, ['I','1h30','Z4-Z5','5x5min Z5, rec 5min'], null, ['T','1h15','Z3','3x15min Z3, rec 5min'], null, ['R','45min','Z1','Rullo'], ['E','2h','Z2','Lungo Z2']],
      '5-6': [null, ['I','1h30','Z4-Z5','6x5min Z5, rec 4min'], ['E','1h15','Z2','Z2'], null, ['I','1h15','Z4','4x6min Z4, rec 3min'], ['R','1h','Z1','Recupero'], ['L','2h30','Z2','Lungo Z2']],
      '7-8': [null, ['I','1h45','Z4-Z5','8x4min Z5, rec 3min'], ['E','1h30','Z2','Z2'], ['I','1h30','Z4','5x8min Z4, rec 3min'], null, ['R','1h','Z1','Recupero'], ['L','3h','Z2','Lungo Z2']],
      '9+':  [['R','1h','Z1','Rullo leggero'], ['I','1h45','Z4-Z5','10x4min Z5, rec 2min'], ['E','2h','Z2','Z2'], ['I','1h30','Z4','6x6min Z4, rec 2min'], ['E','1h30','Z2','Z2'], ['R','1h','Z1','Recupero'], ['L','3h30','Z2','Lungo Z2']]
    }
  };

  // ── RESISTENZA ─────────────────────────────────────────
  PLANS.resistenza = {
    principiante: {
      '3-4': [null, ['E','1h','Z2'], null, ['E','1h','Z2'], null, ['R','45min','Z1'], ['L','1h30','Z2']],
      '5-6': [null, ['E','1h15','Z2'], ['E','1h','Z2'], null, ['E','1h','Z2'], ['R','45min','Z1'], ['L','2h','Z2']],
      '7-8': [null, ['E','1h30','Z2'], ['E','1h','Z2'], ['E','1h15','Z2'], null, ['R','1h','Z1'], ['L','2h30','Z2']],
      '9+':  [null, ['E','1h30','Z2'], ['E','1h15','Z2'], ['E','1h30','Z2'], ['E','1h','Z2'], ['R','1h','Z1'], ['L','3h','Z2']]
    },
    intermedio: {
      '3-4': [null, ['E','1h15','Z2'], null, ['E','1h15','Z2','Aggiungi saliscendi'], null, ['R','45min','Z1'], ['L','2h','Z2']],
      '5-6': [null, ['E','1h30','Z2'], ['E','1h','Z2'], ['E','1h15','Z2'], null, ['R','1h','Z1'], ['L','2h30','Z2','Lungo, progressione']],
      '7-8': [null, ['E','1h45','Z2'], ['E','1h15','Z2'], ['E','1h30','Z2'], ['E','1h','Z2'], ['R','45min','Z1'], ['L','3h','Z2']],
      '9+':  [null, ['E','2h','Z2'], ['E','1h30','Z2'], ['E','2h','Z2'], ['E','1h15','Z2'], ['R','1h','Z1'], ['L','3h30','Z2']]
    },
    avanzato: {
      '3-4': [null, ['E','1h30','Z2'], null, ['E','1h30','Z2','Rolling hills'], null, ['R','45min','Z1'], ['L','2h30','Z2']],
      '5-6': [null, ['E','1h45','Z2'], ['E','1h15','Z2'], ['E','1h30','Z2','Saliscendi'], null, ['R','1h','Z1'], ['L','3h','Z2']],
      '7-8': [null, ['E','2h','Z2'], ['E','1h30','Z2'], ['E','1h45','Z2'], ['E','1h15','Z2'], ['R','1h','Z1'], ['L','3h30','Z2']],
      '9+':  [['R','45min','Z1'], ['E','2h','Z2'], ['E','2h','Z2'], ['E','2h','Z2'], ['E','1h30','Z2'], ['R','1h','Z1'], ['L','4h','Z2']]
    }
  };

  // ── DIMAGRIMENTO ───────────────────────────────────────
  PLANS.dimagrimento = {
    principiante: {
      '3-4': [null, ['E','1h','Z2','A digiuno o colazione leggera'], null, ['E','1h','Z2'], null, ['E','1h','Z2'], ['L','1h30','Z2']],
      '5-6': [null, ['E','1h15','Z2','Mattina presto'], ['E','1h','Z2'], null, ['E','1h','Z2'], ['E','1h','Z2'], ['L','2h','Z2']],
      '7-8': [null, ['E','1h30','Z2'], ['E','1h','Z2'], ['E','1h15','Z2'], null, ['E','1h15','Z2'], ['L','2h30','Z2']],
      '9+':  [['E','45min','Z2','Mattina'], ['E','1h30','Z2'], ['E','1h','Z2'], ['E','1h30','Z2'], ['E','1h','Z2'], ['E','1h15','Z2'], ['L','3h','Z2']]
    },
    intermedio: {
      '3-4': [null, ['E','1h15','Z2','Fasted cardio'], null, ['E','1h15','Z2','Saliscendi'], null, ['E','1h15','Z2'], ['L','2h','Z2']],
      '5-6': [null, ['E','1h30','Z2','Mattina, a digiuno'], ['E','1h','Z2'], null, ['E','1h15','Z2'], ['E','1h15','Z2','Rullo'], ['L','2h30','Z2']],
      '7-8': [null, ['E','1h45','Z2'], ['E','1h15','Z2'], ['E','1h30','Z2','Saliscendi'], null, ['E','1h30','Z2'], ['L','3h','Z2']],
      '9+':  [['E','1h','Z2','Mattina'], ['E','2h','Z2'], ['E','1h15','Z2'], ['E','1h45','Z2'], ['E','1h15','Z2'], ['E','1h30','Z2'], ['L','3h30','Z2']]
    },
    avanzato: {
      '3-4': [null, ['E','1h30','Z2','Fasted, mattina'], null, ['E','1h30','Z2','Rolling'], null, ['E','1h15','Z2'], ['L','2h30','Z2']],
      '5-6': [null, ['E','1h45','Z2','A digiuno'], ['E','1h15','Z2'], null, ['E','1h30','Z2'], ['E','1h30','Z2'], ['L','3h','Z2']],
      '7-8': [null, ['E','2h','Z2'], ['E','1h30','Z2'], ['E','1h45','Z2','Saliscendi'], null, ['E','1h45','Z2'], ['L','3h30','Z2']],
      '9+':  [['E','1h','Z2','Mattina'], ['E','2h','Z2'], ['E','1h30','Z2'], ['E','2h','Z2'], ['E','1h30','Z2'], ['E','1h30','Z2'], ['L','4h','Z2']]
    }
  };

  // ── MANTENIMENTO ───────────────────────────────────────
  PLANS.mantenimento = {
    principiante: {
      '3-4': [null, ['E','1h','Z2','Ritmo rilassato'], null, ['X','1h','Z2','Cambi di ritmo'], null, ['R','45min','Z1'], ['E','1h30','Z2']],
      '5-6': [null, ['E','1h','Z2'], ['I','45min','Z4','3x3min Z4, rec 3min'], null, ['E','1h','Z2'], ['R','45min','Z1'], ['L','2h','Z2']],
      '7-8': [null, ['I','1h','Z4','3x4min Z4, rec 3min'], ['E','1h15','Z2'], ['X','1h','Z2'], null, ['R','1h','Z1'], ['L','2h30','Z2']],
      '9+':  [null, ['I','1h','Z4','4x4min Z4, rec 3min'], ['E','1h30','Z2'], ['T','1h','Z3','2x15min Z3'], ['E','1h','Z2'], ['R','1h','Z1'], ['L','3h','Z2']]
    },
    intermedio: {
      '3-4': [null, ['I','1h','Z4','3x5min Z4, rec 3min'], null, ['E','1h15','Z2'], null, ['R','45min','Z1'], ['L','2h','Z2']],
      '5-6': [null, ['I','1h15','Z4','4x5min Z4, rec 3min'], ['E','1h15','Z2'], null, ['X','1h','Z2','Tecnica'], ['R','45min','Z1'], ['L','2h30','Z2']],
      '7-8': [null, ['I','1h15','Z4','5x5min Z4, rec 3min'], ['E','1h30','Z2'], ['T','1h15','Z3','2x20min Z3'], null, ['R','1h','Z1'], ['L','3h','Z2-Z3']],
      '9+':  [null, ['I','1h30','Z4','6x5min Z4, rec 2min30'], ['E','1h30','Z2'], ['T','1h15','Z3','3x15min Z3'], ['E','1h15','Z2'], ['R','1h','Z1'], ['L','3h30','Z2-Z3']]
    },
    avanzato: {
      '3-4': [null, ['I','1h15','Z4-Z5','4x4min Z5, rec 4min'], null, ['T','1h15','Z3','3x12min Z3'], null, ['R','45min','Z1'], ['L','2h','Z2-Z3']],
      '5-6': [null, ['I','1h30','Z4-Z5','5x4min Z5, rec 3min'], ['E','1h15','Z2'], null, ['T','1h15','Z3','20-20min Z3'], ['R','1h','Z1'], ['L','2h30','Z2-Z3']],
      '7-8': [null, ['I','1h30','Z4-Z5','6x4min Z5, rec 3min'], ['E','1h30','Z2'], ['T','1h30','Z3','3x15min Z3'], null, ['R','1h','Z1'], ['L','3h','Z2-Z4']],
      '9+':  [['R','45min','Z1'], ['I','1h30','Z4-Z5','8x4min Z5, rec 2min30'], ['E','2h','Z2'], ['T','1h30','Z3','4x15min Z3'], ['E','1h','Z2'], ['R','1h','Z1'], ['L','3h30','Z2-Z4']]
    }
  };

  // ── UI ──────────────────────────────────────────────────

  function clearBody() {
    while (bodyEl.firstChild) bodyEl.removeChild(bodyEl.firstChild);
  }

  function renderStep(title, contentFn) {
    clearBody();
    var line = document.createElement('div');
    line.className = 't-line';
    line.innerHTML = '<span class="t-prompt">$></span> <span class="t-cmd">' + title + '</span>';
    bodyEl.appendChild(line);
    var out = document.createElement('div');
    out.className = 't-output tg-step';
    contentFn(out);
    bodyEl.appendChild(out);
  }

  function makeOptions(options, selectedId, onChange) {
    var wrap = document.createElement('div');
    wrap.className = 'tg-options';
    options.forEach(function (opt) {
      var btn = document.createElement('button');
      btn.className = 'tg-option' + (opt.id === selectedId ? ' selected' : '');
      btn.textContent = opt.icon ? opt.icon + ' ' + opt.label : opt.label;
      btn.addEventListener('click', function () {
        onChange(opt.id);
      });
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function showGoalStep() {
    renderStep('Qual \u00E8 il tuo obiettivo?', function (out) {
      var opts = makeOptions(GOALS, state.goal, function (id) {
        state.goal = id;
        state.level = null;
        state.hours = null;
        showLevelStep();
      });
      out.appendChild(opts);
    });
  }

  function showLevelStep() {
    renderStep('Qual \u00E8 il tuo livello attuale?', function (out) {
      var goal = GOALS.filter(function (g) { return g.id === state.goal; })[0];
      var back = document.createElement('button');
      back.className = 'tg-back';
      back.textContent = '\u2190 ' + goal.label;
      back.addEventListener('click', function () { showGoalStep(); });
      out.appendChild(back);
      var opts = makeOptions(LEVELS, state.level, function (id) {
        state.level = id;
        state.hours = null;
        showHoursStep();
      });
      out.appendChild(opts);
    });
  }

  function showHoursStep() {
    renderStep('Ore disponibili a settimana?', function (out) {
      var level = LEVELS.filter(function (l) { return l.id === state.level; })[0];
      var back = document.createElement('button');
      back.className = 'tg-back';
      back.textContent = '\u2190 ' + level.label;
      back.addEventListener('click', function () { showLevelStep(); });
      out.appendChild(back);
      var opts = makeOptions(HOURS_OPTS, state.hours, function (id) {
        state.hours = id;
        showConfirmStep();
      });
      out.appendChild(opts);
    });
  }

  function showConfirmStep() {
    renderStep('Conferma e genera piano', function (out) {
      var hours = HOURS_OPTS.filter(function (h) { return h.id === state.hours; })[0];
      var back = document.createElement('button');
      back.className = 'tg-back';
      back.textContent = '\u2190 ' + hours.label;
      back.addEventListener('click', function () { showHoursStep(); });
      out.appendChild(back);

      var summary = document.createElement('div');
      summary.className = 'tg-summary';
      summary.textContent = GOALS.filter(function (g) { return g.id === state.goal; })[0].label + ' \u00B7 ' + LEVELS.filter(function (l) { return l.id === state.level; })[0].label + ' \u00B7 ' + hours.label + '/sett';
      out.appendChild(summary);

      var genBtn = document.createElement('button');
      genBtn.className = 'tg-generate';
      genBtn.innerHTML = '\u26A1 GENERA PIANO';
      genBtn.addEventListener('click', function () {
        showPlan();
      });
      out.appendChild(genBtn);
    });
  }

  // ── PLAN GENERATION ─────────────────────────────────────

  function showPlan() {
    var goalData = PLANS[state.goal][state.level][state.hours];
    if (!goalData) {
      renderStep('Errore: piano non trovato', function (out) {
        out.textContent = 'Riprova con una combinazione diversa.';
      });
      return;
    }

    clearBody();

    var goalLabel = GOALS.filter(function (g) { return g.id === state.goal; })[0].label;
    var levelLabel = LEVELS.filter(function (l) { return l.id === state.level; })[0].label;
    var hoursLabel = HOURS_OPTS.filter(function (h) { return h.id === state.hours; })[0].label;

    var infoLine = document.createElement('div');
    infoLine.className = 't-line';
    infoLine.innerHTML = '<span class="t-prompt">$></span> <span class="t-cmd">piano generato per: ' + goalLabel + ' | ' + levelLabel + ' | ' + hoursLabel + '/sett</span>';
    bodyEl.appendChild(infoLine);

    var table = document.createElement('div');
    table.className = 'tg-plan-table';

    // Header row
    var header = document.createElement('div');
    header.className = 'tg-plan-row tg-plan-header';
    header.innerHTML = '<span class="tg-col-day">GIORNO</span><span class="tg-col-type">TIPO</span><span class="tg-col-dur">DURATA</span><span class="tg-col-zone">INT.</span><span class="tg-col-note">NOTE</span>';
    table.appendChild(header);

    // Separator
    var sep = document.createElement('div');
    sep.className = 'tg-plan-sep';
    sep.textContent = '\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500';
    table.appendChild(sep);

    // Day rows
    goalData.forEach(function (entry, i) {
      var row = document.createElement('div');
      row.className = 'tg-plan-row';
      if (!entry) {
        row.innerHTML = '<span class="tg-col-day">' + DAYS[i] + '</span><span class="tg-col-type tg-rest">Riposo</span><span class="tg-col-dur tg-rest">\u2014</span><span class="tg-col-zone tg-rest">\u2014</span><span class="tg-col-note tg-rest">Recupero, stretching, mobilit\u00E0</span>';
      } else {
        var typeChar = entry[0];
        var typeLabel = TYPES[typeChar] ? TYPES[typeChar].label : typeChar;
        var dur = entry[1];
        var zone = entry[2];
        var note = entry[3] || '';
        var zoneClass = 'tg-zone-' + zone.replace('Z', '');
        row.innerHTML = '<span class="tg-col-day">' + DAYS[i] + '</span><span class="tg-col-type">' + typeLabel + '</span><span class="tg-col-dur">' + dur + '</span><span class="tg-col-zone ' + zoneClass + '">' + zone + '</span><span class="tg-col-note">' + note + '</span>';
      }
      table.appendChild(row);
    });

    bodyEl.appendChild(table);

    // Legend
    var legend = document.createElement('div');
    legend.className = 'tg-legend';
    legend.innerHTML = '<strong>Legenda zone:</strong> Z1 Recovery | Z2 Endurance | Z3 Tempo | Z4 Threshold | Z5 VO\u2082max';
    bodyEl.appendChild(legend);

    // Reset button
    var resetBtn = document.createElement('button');
    resetBtn.className = 'tg-generate tg-reset';
    resetBtn.textContent = '\u2190 NUOVO PIANO';
    resetBtn.addEventListener('click', function () {
      state.goal = null;
      state.level = null;
      state.hours = null;
      showGoalStep();
    });
    bodyEl.appendChild(resetBtn);
  }

  // ── INIT ────────────────────────────────────────────────

  function initTrainingGenerator() {
    bodyEl = document.getElementById('tg-body');
    if (!bodyEl) return;
    showGoalStep();
  }

  // Hook into DOMContentLoaded (safely, without overwriting existing listeners)
  var existingReady = window.addEventListener;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTrainingGenerator);
  } else {
    initTrainingGenerator();
  }

})();
