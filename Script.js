function calcularPromedio() {
    // Obtener valores de los inputs
    const pa1 = parseFloat(document.getElementById('pa1').value) || 0;
    const ep = parseFloat(document.getElementById('ep').value) || 0;
    const pa2 = parseFloat(document.getElementById('pa2').value) || 0;
    const pa3 = parseFloat(document.getElementById('pa3').value) || 0;
    const ef = parseFloat(document.getElementById('ef').value) || 0;

    // Fórmulas del Numeral 8.2 del Sílabo
    const p1 = (pa1 * 0.40) + (ep * 0.60);
    const p2 = (pa2 * 0.30) + (pa3 * 0.10) + (ef * 0.60);
    const pf = (p1 + p2) / 2;

    // Mostrar resultados
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    
    // El sílabo indica que el mínimo aprobatorio es 14
    // Se aplica la regla del 0.5 a favor en el promedio final
    const finalRedondeado = pf >= 13.5 ? Math.round(pf) : Math.floor(pf);
    const esAprobado = finalRedondeado >= 14;

    resultDiv.className = 'result-container ' + (esAprobado ? 'aprobado' : 'desaprobado');
    
    resultDiv.innerHTML = `
        <div>Promedio Módulo 1: ${p1.toFixed(2)}</div>
        <div>Promedio Módulo 2: ${p2.toFixed(2)}</div>
        <hr>
        <div style="font-size: 1.4rem;"><strong>Final: ${pf.toFixed(2)}</strong></div>
        <div style="font-weight: bold; margin-top: 10px;">
            ${esAprobado ? '✅ ESTADO: APROBADO' : '❌ ESTADO: DESAPROBADO'}
        </div>
    `;
}