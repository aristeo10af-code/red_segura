// Elementos del DOM
const loginPage = document.getElementById('loginPage');
const registerPage = document.getElementById('registerPage');
const appPage = document.getElementById('appPage');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');
const userWelcome = document.getElementById('userWelcome');

const emergencyBtn = document.getElementById('emergencyBtn');
const emergencyModal = document.getElementById('emergencyModal');
const cancelEmergency = document.getElementById('cancelEmergency');
const confirmEmergency = document.getElementById('confirmEmergency');
const countdownElement = document.getElementById('countdown');
const callButtons = document.querySelectorAll('.call-button');

// Variables para la cuenta regresiva
let countdown;
let countdownValue = 10;

// Mostrar página de registro
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginPage.style.display = 'none';
    registerPage.style.display = 'flex';
});

// Mostrar página de login
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerPage.style.display = 'none';
    loginPage.style.display = 'flex';
});

// Procesar login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Simulación de autenticación
    if (username && password) {
        // En una aplicación real, aquí se verificarían las credenciales con el servidor
        userWelcome.textContent = `Bienvenida, ${username}`;
        loginPage.style.display = 'none';
        appPage.style.display = 'block';
        
        // Guardar usuario en localStorage
        localStorage.setItem('currentUser', username);
    } else {
        alert('Por favor, completa todos los campos');
    }
});

// Procesar registro
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }
    
    // En una aplicación real, aquí se enviarían los datos al servidor
    alert('Cuenta creada exitosamente. Ahora puedes iniciar sesión.');
    registerPage.style.display = 'none';
    loginPage.style.display = 'flex';
});

// Cerrar sesión
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    appPage.style.display = 'none';
    loginPage.style.display = 'flex';
});

// Verificar si hay un usuario logueado al cargar la página
window.addEventListener('load', () => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        userWelcome.textContent = `Bienvenida, ${currentUser}`;
        loginPage.style.display = 'none';
        appPage.style.display = 'block';
    }
});

// Abrir modal de emergencia
emergencyBtn.addEventListener('click', () => {
    emergencyModal.style.display = 'flex';
    countdownValue = 10;
    countdownElement.textContent = countdownValue;
    
    // Iniciar cuenta regresiva
    countdown = setInterval(() => {
        countdownValue--;
        countdownElement.textContent = countdownValue;
        
        if (countdownValue <= 0) {
            clearInterval(countdown);
            triggerEmergencyCall();
        }
    }, 1000);
});

// Cancelar emergencia
cancelEmergency.addEventListener('click', () => {
    clearInterval(countdown);
    emergencyModal.style.display = 'none';
});

// Confirmar emergencia inmediata
confirmEmergency.addEventListener('click', () => {
    clearInterval(countdown);
    triggerEmergencyCall();
});

// Función para simular llamada de emergencia
function triggerEmergencyCall() {
    emergencyModal.style.display = 'none';
    alert('¡EMERGENCIA CONFIRMADA! Se ha enviado una alerta a los servicios de emergencia con tu ubicación aproximada.');
    // En una aplicación real, aquí se enviaría una solicitud al servidor
    // con la ubicación del usuario y se contactaría a los servicios de emergencia
}

// Funcionalidad para botones de llamada
callButtons.forEach(button => {
    button.addEventListener('click', () => {
        const number = button.getAttribute('data-number');
        alert(`Llamando al ${number}. En una aplicación real, esto abriría el marcador de teléfono.`);
        // En una aplicación real, esto abriría el marcador de teléfono:
        // window.open(`tel:${number}`, '_self');
    });
});

// Simulación de geolocalización (en una app real usaríamos la API de geolocalización)
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Ubicación obtenida:", position.coords.latitude, position.coords.longitude);
                // En una aplicación real, enviaríamos estas coordenadas al servidor
            },
            (error) => {
                console.log("Error obteniendo ubicación:", error);
                // En caso de error, usar ubicación aproximada por IP
            }
        );
    }
}

// Al cargar la página, intentar obtener la ubicación
window.addEventListener('load', getLocation);