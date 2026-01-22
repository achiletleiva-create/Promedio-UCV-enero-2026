function calcularTodo() {
    const getVal = (id) => {
        const input = document.getElementById(id);
        return (input && input.value !== "") ? parseFloat(input.value) : null;
    };

    const pa1 = getVal('pa1');
    const ep = getVal('ep');
    const rec1 = getVal('rec1');
    const pa2 = getVal('pa2');
    const pa3 = getVal('pa3');
    const ef = getVal('ef');
    const rec2 = getVal('rec2');

    // Recuperación reemplaza nota de examen (EP o EF) si es mayor
    let epFinal = (rec1 !== null && rec1 > (ep || 0)) ? rec1 : (ep || 0);
    let efFinal = (rec2 !== null && rec2 > (ef || 0)) ? rec2 : (ef || 0);

    // Cálculos basados en el sílabo
    let m1 = (pa1 !== null ? pa1 * 0.4 : 0) + (epFinal * 0.6);
    let m2 = (pa2 !== null ? pa2 * 0.3 : 0) + (pa3 !== null ? pa3 * 0.1 : 0) + (efFinal * 0.6);
    let pf = (m1 + m2) / 2;

    // Mostrar resultados en pantalla
    document.getElementById('display-results').classList.remove('hidden');
    document.getElementById('res-m1').innerText = m1.toFixed(2);
    document.getElementById('res-m2').innerText = m2.toFixed(2);
    document.getElementById('res-pf').innerText = pf.toFixed(2);

    const statusLabel = document.getElementById('status-label');
    const aiSuggestion = document.getElementById('ai-suggestion');

    let consejo = "";
    let estado = "";

    // --- LÓGICA DE CONSEJOS IA ---
    if (pa1 !== null && ep === null) {
        estado = "🔵 EN PROGRESO";
        let notaNecesaria = (14 - (pa1 * 0.4)) / 0.6;
        consejo = `Has iniciado tu Módulo I con el PA1. Para aprobar el módulo con 14, necesitas un <b>${notaNecesaria.toFixed(1)}</b> en tu Examen Parcial. ¡Sigue esforzándote!`;
    } 
    else if (ep !== null && pa2 === null && ef === null) {
        if (m1 >= 14) {
            estado = "🟢 MÓDULO I APROBADO";
            consejo = `¡Excelente! Aprobaste el Módulo I. Ahora enfócate en el Módulo II. Recuerda que los PA2 y PA3 <b>no son recuperables</b>, asegúralos desde el inicio.`;
        } else {
            estado = "🟡 MÓDULO I EN REZAGADO";
            let notaRec = (14 - (pa1 * 0.4)) / 0.6;
            consejo = `Tu promedio del Módulo I (${m1.toFixed(2)}) es bajo. Pero tienes la oportunidad de rendir el examen de recuperación. Con un <b>${notaRec.toFixed(1)}</b> aprobarás el módulo.`;
        }
    }
    else if (ef === null && (pa2 !== null || pa3 !== null)) {
        estado = "🔵 MÓDULO II EN CURSO";
        let notaEF = (14 - ((pa2 || 0) * 0.3 + (pa3 || 0) * 0.1)) / 0.6;
        consejo = `Estás definiendo tu Módulo II. Necesitas un <b>${notaEF.toFixed(1)}</b> en el Examen Final para aprobar este módulo. ¡Tú puedes!`;
    }
    else if (ef !== null) {
        if (pf >= 13.5) {
            estado = "✅ CURSO APROBADO";
            consejo = "¡Felicidades! Lograste la acreditación de Computación III. Ya puedes descargar tu certificado CISCO.";
        } else {
            estado = "❌ NO ALCANZADO";
            consejo = "Tu promedio final es menor a 14. Verifica si aún puedes rendir un examen de recuperación del Módulo II para subir tu nota final.";
        }
    }

    statusLabel.innerHTML = estado;
    statusLabel.style.color = (estado.includes("✅") || estado.includes("🟢")) ? "#27ae60" : "#2980b9";
    aiSuggestion.innerHTML = consejo;
}
function calcularPromedioCisco() {
    const porcentajeCisco = parseFloat(document.getElementById('cisco_v').value) || 0;
    const notaCuestionario = parseFloat(document.getElementById('cisco_e').value) || 0;
    
    // Conversión de porcentaje (0-100) a escala (0-20)
    const notaVirtualConvertida = (porcentajeCisco / 100) * 20;
    
    // Promedio final para PA3
    const promedio = (notaVirtualConvertida + notaCuestionario) / 2;
    
    document.getElementById('pa3').value = promedio.toFixed(2);
}


