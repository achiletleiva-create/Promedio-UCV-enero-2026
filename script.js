function calcularTodo() {
    // Captura de valores (manejamos vacíos como "null" para saber el progreso real)
    const getVal = (id) => {
        const input = document.getElementById(id);
        if (!input) return null;
        return input.value === "" ? null : parseFloat(input.value);
    };

    const pa1 = getVal('pa1');
    const ep = getVal('ep');
    const rec1 = getVal('rec1');
    const pa2 = getVal('pa2');
    const pa3 = getVal('pa3');
    const ef = getVal('ef');
    const rec2 = getVal('rec2');

    // --- LÓGICA DE RECUPERACIÓN (SÍLABO) ---
    // El examen de recuperación reemplaza la nota del parcial o final si es mayor
    let epEfectivo = (rec1 !== null && rec1 > (ep || 0)) ? rec1 : (ep || 0);
    let efEfectivo = (rec2 !== null && rec2 > (ef || 0)) ? rec2 : (ef || 0);

    // Fórmulas oficiales del Sílabo UCV
    let m1 = (pa1 !== null ? pa1 * 0.40 : 0) + (epEfectivo * 0.60);
    let m2 = (pa2 !== null ? pa2 * 0.30 : 0) + (pa3 !== null ? pa3 * 0.10 : 0) + (efEfectivo * 0.60);
    let pf = (m1 + m2) / 2;

    // --- ACTUALIZAR LA VISTA ---
    // Intentamos encontrar los IDs de ambas versiones para asegurar que se muestre
    const setInner = (id, text) => {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    };

    setInner('res-m1', m1.toFixed(2));
    setInner('res-m2', m2.toFixed(2));
    setInner('res-pf', pf.toFixed(2));
    
    // Mostramos el cuadro de resultados
    const resArea = document.getElementById('result-area') || document.getElementById('display-results');
    if (resArea) resArea.classList.remove('hidden');

    const statusBadge = document.getElementById('status-badge') || document.getElementById('status-label');
    const aiText = document.getElementById('ai-text') || document.getElementById('ai-suggestion');

    let consejo = "";
    let estado = "";

    // --- LÓGICA DE CONSEJOS IA SEGÚN EL PROGRESO ---
    
    // ESCENARIO: Solo PA1 rendido
    if (pa1 !== null && ep === null) {
        estado = "🔵 EN PROGRESO (MOD I)";
        let notaNec = (14 - (pa1 * 0.40)) / 0.60;
        consejo = `Has rendido tu PA1. Para aprobar el <strong>Módulo I</strong> con nota mínima de 14, necesitas un <strong>${notaNec.toFixed(1)}</strong> en tu Examen Parcial. ¡Aún tienes todo el camino para lograrlo!`;
    } 
    // ESCENARIO: Módulo I listo, Módulo II sin empezar
    else if (ep !== null && pa2 === null && pa3 === null && ef === null) {
        if (m1 >= 14) {
            estado = "🟢 MÓDULO I APROBADO";
            consejo = `¡Buen trabajo en el Módulo I! Tienes ${m1.toFixed(2)}. Ahora enfócate en el Módulo II; recuerda que los PA2 y PA3 <strong>no son recuperables</strong>, no los descuides.`;
        } else {
            estado = "🟡 MÓDULO I EN RIESGO";
            let notaRec = (14 - (pa1 * 0.40)) / 0.60;
            consejo = `Tu promedio del Módulo I es ${m1.toFixed(2)}. No te rindas, rinde tu examen de recuperación y con un <strong>${notaRec.toFixed(1)}</strong> aprobarás el módulo satisfactoriamente.`;
        }
    }
    // ESCENARIO: En medio del Módulo II
    else if ((pa2 !== null || pa3 !== null) && ef === null) {
        estado = "🔵 DEFINIENDO MÓDULO II";
        let acumM2 = (pa2 || 0) * 0.30 + (pa3 || 0) * 0.10;
        let notaEF = (14 - acumM2) / 0.60;
        consejo = `Vas avanzando en el Módulo II. Para aprobar este módulo, necesitas obtener un <strong>${notaEF.toFixed(1)}</strong> en el Examen Final. ¡Mucho éxito en el cierre!`;
    }
    // ESCENARIO: Todo completado
    else if (ef !== null) {
        if (pf >= 13.5) { // Redondeo UCV
            estado = "✅ CURSO APROBADO";
            consejo = "¡Felicidades! Has cumplido con los estándares de acreditación. No olvides descargar tu certificado internacional de CISCO.";
        } else {
            estado = "❌ POR DEBAJO DEL MÍNIMO";
            let notaRecFinal = (14 - ((pa2 || 0) * 0.30 + (pa3 || 0) * 0.10)) / 0.60;
            consejo = `Promedio final: ${pf.toFixed(2)}. Si tienes oportunidad de recuperación en el Módulo II, necesitas un <strong>${notaRecFinal.toFixed(1)}</strong> para aprobar. ¡Sigue adelante!`;
        }
    }

    if (statusBadge) {
        statusBadge.innerHTML = estado;
        statusBadge.style.color = (estado.includes("✅") || estado.includes("🟢")) ? "#27ae60" : 
                                 estado.includes("🔵") ? "#2980b9" : "#d32f2f";
    }
    if (aiText) aiText.innerHTML = consejo;
}
