function calcularTodo() {
    // Captura de valores
    const getVal = (id) => parseFloat(document.getElementById(id).value) || 0;

    let pa1 = getVal('pa1'), ep = getVal('ep'), rec1 = getVal('rec1');
    let pa2 = getVal('pa2'), pa3 = getVal('pa3'), ef = getVal('ef'), rec2 = getVal('rec2');

    // Lógica de Recuperación (Reemplaza la nota más baja según el sílabo)
    let epReal = (rec1 > ep) ? rec1 : ep;
    let efReal = (rec2 > ef) ? rec2 : ef;

    // Fórmulas oficiales del sílabo
    let m1 = (pa1 * 0.40) + (epReal * 0.60);
    let m2 = (pa2 * 0.30) + (pa3 * 0.10) + (efReal * 0.60);
    let pf = (m1 + m2) / 2;

    // Mostrar resultados
    document.getElementById('result-area').classList.remove('hidden');
    document.getElementById('res-m1').innerText = m1.toFixed(2);
    document.getElementById('res-m2').innerText = m2.toFixed(2);
    document.getElementById('res-pf').innerText = pf.toFixed(2);

    const badge = document.getElementById('status-badge');
    const aiText = document.getElementById('ai-text');

    // Lógica de aprobación (Nota mínima 14 según el sílabo punto 1)
    if (pf >= 13.5) { // La UCV suele redondear 13.5 a 14 en actas finales
        badge.innerHTML = '<span style="color: green">✅ APROBADO</span>';
        aiText.innerText = "¡Excelente trabajo! Has superado el estándar de acreditación. Recuerda descargar tu certificado CISCO al finalizar.";
    } else {
        badge.innerHTML = '<span style="color: red">❌ DESAPROBADO</span>';
        
        // Consejos de "IA" basados en el sílabo
        if (rec1 === 0 && rec2 === 0) {
            aiText.innerText = "Tu promedio es menor a 14. Según el Sílabo (Pág 6, punto 8), tienes derecho a un examen de RECUPERACIÓN. Intenta simular una nota arriba para ver cómo cambia tu promedio.";
        } else if (pf < 14 && (rec1 > 0 || rec2 > 0)) {
            aiText.innerText = "Incluso con recuperación, la nota es baja. Te aconsejo reforzar PA1 y PA2 en el próximo ciclo o contactar con el Docente Chilet para tutorías adicionales.";
        }
    }
}
