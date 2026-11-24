<?php
include("conexion.php");

// Consulta ejemplo: contar personas por género
$sql = "SELECT genero, COUNT(*) AS total FROM apoyo GROUP BY genero";
$result = $conn->query($sql);

$generos = [];
$totales = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $generos[] = $row["genero"];
        $totales[] = $row["total"];
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Dashboard - Red de Apoyo</title>
    <link rel="stylesheet" href="css/estilos.css">
    <!-- ✅ Carga Chart.js desde el CDN oficial -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <h1 style="text-align:center;">📊 Dashboard - Sistema Red de Apoyo</h1>

    <!-- Contenedor de la gráfica -->
    <div style="width:70%; margin:40px auto;">
        <canvas id="graficaGenero"></canvas>
    </div>

    <script>
        // 📊 Datos recibidos desde PHP
        const generos = <?php echo json_encode($generos); ?>;
        const totales = <?php echo json_encode($totales); ?>;

        // 🧠 Configuración de la gráfica
        const ctx = document.getElementById('graficaGenero').getContext('2d');
        const graficaGenero = new Chart(ctx, {
            type: 'bar', // Puedes cambiar a 'pie', 'line', etc.
            data: {
                labels: generos,
                datasets: [{
                    label: 'Cantidad por género',
                    data: totales,
                    borderWidth: 1,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)'
                    ]
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    </script>
</body>
</html>
