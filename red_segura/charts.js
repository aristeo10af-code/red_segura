function crearGrafico(id, tipo, datos, titulo) {
    const ctx = document.getElementById(id);
    new Chart(ctx, {
        type: tipo,
        data: {
            labels: Object.keys(datos),
            datasets: [{
                label: titulo,
                data: Object.values(datos),
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(153, 102, 255, 0.6)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
        }
    });
}

crearGrafico('grafGenero', 'pie', dataGenero, 'Distribución por Género');
crearGrafico('grafZona', 'doughnut', dataZona, 'Distribución por Zona');
crearGrafico('grafBienestar', 'bar', dataBienestar, 'Bienestar Emocional');
crearGrafico('grafRedApoyo', 'pie', dataRed, 'Personas con Red de Apoyo');
crearGrafico('grafViolencia', 'bar', dataViolencia, 'Ha Vivido Violencia');
crearGrafico('grafTipoViolencia', 'bar', dataTipos, 'Tipos de Violencia');
