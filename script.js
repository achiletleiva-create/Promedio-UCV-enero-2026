function calcularSimulacion() {
    // Captura de valores (si está vacío, tratamos como null para saber que no se ha rendido)
    const getVal = (id) => {
        const v = document.getElementById(id).value;
        return v === "" ? null : parseFloat(v);
    };

    const pa1 = getVal('pa1');
    const ep = getVal('ep');
    const rec1 = getVal('rec1');
    const pa2 = getVal('pa2');
    const pa3 = getVal('pa3');
    const ef = getVal('ef');
    const rec2 = getVal('rec2');

    // --- LÓGICA DE CÁLCULO ---
    let epEfectivo = (rec1 !== null && rec1 > (ep || 0)) ? rec1 : (ep || 0);
    let efEfectivo = (rec2 !== null && rec2 > (ef || 0)) ? rec2 : (ef || 0);

    let m1 = (pa1 !== null ? pa1 * 0.40 : 0) + (epEfectivo * 0.60);
    let m2 = (pa2 !== null ? pa2 * 0.30 : 0) + (pa3 !== null ? pa3 * 0.10 : 0) + (efEfectivo * 0.60);
    let pf = (m1 + m2) / 2;

    // --- ACTUALIZAR INTERFAZ ---
    document.getElementById('display-results').classList.remove('hidden');
    document.getElementById('out-m1').innerText = m1.toFixed(2);
    document.getElementById('out-m2').innerText = m2.toFixed(2);
    document.getElementById('out-pf').innerText = pf.toFixed(2);

    const statusLabel = document.getElementById('status-label');
    const aiSuggestion = document.getElementById('ai-suggestion');

    // --- LÓGICA DE CONSEJOS IA (MENTORÍA) ---
    let consejo = "";
    let estadoVisual = "";

    // ESCENARIO 1: Solo PA1 (Inicio del curso)
    if (pa1 !== null && ep === null) {
        estadoVisual = "🔵 EN PROGRESO";
        let notaNecesaria = (14 - (pa1 * 0.40)) / 0.60;
        consejo = `Has iniciado con tu PA1. Para aprobar el <strong>Módulo I</strong> con la nota mínima de 14, necesitarás obtener al menos <strong>${notaNecesaria.toFixed(1)}</strong> en tu Examen Parcial. ¡Aún estás a tiempo de asegurar tu promedio!`;
    } 
    
    // ESCENARIO 2: Módulo I completado pero Módulo II vacío
    else if (ep !== null && pa2 === null && pa3 === null && ef === null) {
        if (m1 >= 14) {
            estadoVisual = "🟢 MÓDULO I APROBADO";
            consejo = `¡Excelente! Lograste superar el Módulo I con ${m1.toFixed(2)}. Ahora enfócate en el Módulo II. Recuerda que los PA2 y PA3 <strong>no son recuperables</strong>, así que dales prioridad desde el inicio.`;
        } else {
            estadoVisual = "🟡 MÓDULO I EN RIESGO";
            let notaRec = (14 - (pa1 * 0.40)) / 0.60;
            consejo = `Tu promedio del Módulo I (${m1.toFixed(2)}) es menor a 14. <strong>No te rindas:</strong> Según el sílabo, puedes rendir el examen de recuperación. Si logras un <strong>${notaRec.toFixed(1)}</strong>, reemplazarás tu nota del Parcial y aprobarás el módulo.`;
        }
    }

    // ESCENARIO 3: En pleno Módulo II
    else if ((pa2 !== null || pa3 !== null) && ef === null) {
        estadoVisual = "🔵 DEFINIENDO MÓDULO II";
        let acumuladoM2 = (pa2 || 0) * 0.30 + (pa3 || 0) * 0.10;
        let notaNecesariaEF = (14 - acumuladoM2) / 0.60;
        
        consejo = `Estás avanzando en el Módulo II. Basado en tus PAs, necesitas un <strong>${notaNecesariaEF.toFixed(1)}</strong> en el Examen Final para aprobar este módulo. Recuerda: El examen final tiene el peso más alto (60%), ¡prepárate bien!`;
    }

    // ESCENARIO 4: Todo completado (Final del curso)
    else if (ef !== null) {
        if (pf >= 13.5) { // 13.5 redondea a 14 en sistema UCV
            estadoVisual = "✅ CURSO APROBADO";
            consejo = "¡Felicidades! Has cumplido con los estándares de la acreditación de Computación III. Ya puedes solicitar tu certificado digital.";
        } else {
            estadoVisual = "❌ NO ALCANZÓ EL MÍNIMO";
            let notaRecFinal = (14 - ((pa2 || 0) * 0.30 + (pa3 || 0) * 0.10)) / 0.60;
            consejo = `Tu promedio final es ${pf.toFixed(2)}. Si aún no has rendido el examen de recuperación del Módulo II, necesitas un <strong>${notaRecFinal.toFixed(1)}</strong> para aprobar. Si ya agotaste tus oportunidades, recuerda que los PAs no son recuperables. ¡Mucho ánimo para la próxima!`;
        }
    }

    statusLabel.innerHTML = estadoVisual;
    statusLabel.style.color = estadoVisual.includes("✅") || estadoVisual.includes("🟢") ? "#27ae60" : 
                             estadoVisual.includes("🔵") ? "#2980b9" : "#e67e22";
    aiSuggestion.innerHTML = consejo;
}
