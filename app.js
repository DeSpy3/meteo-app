const resultat = document.getElementById('resultatMeteo');

// ==========================================
// 1. GÉOLOCALISATION AU CHARGEMENT
// ==========================================
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        fetch(`http://127.0.0.1:8000/api/meteo/coord/${lat}/${lon}`)
            .then(response => {
                if (!response.ok) throw new Error("Erreur de récupération de la météo locale");
                return response.json();
            })
            .then(data => {
                resultat.innerHTML = `
                    <div class="meteo-carte">
                        <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Icône de la météo">
                        <p>Il fait <strong>${data.temperature}°C</strong> à ${data.ville} (${data.description}).</p>
                        <p>💧 Humidité : ${data.humidity}% | 💨 Vent : ${data.vitesse_vent} m/s</p>
                    </div>`;
            })
            .catch(error => {
                console.error("Erreur météo locale : ", error);
            });
    },
    (error) => {
        console.error("Erreur de géolocalisation : ", error);
    });
} else {
    console.log("La géolocalisation n'est pas disponible sur ce navigateur.");
}

// ==========================================
// 2. RECHERCHE MANUELLE PAR VILLE
// ==========================================
document.getElementById('rechercherBtn').addEventListener('click', () => {
    const villeInput = document.getElementById('villeInput');
    const ville = villeInput.value;

    villeInput.value = '';

    if (!ville) {
        resultat.textContent = "Veuillez entrer une ville.";
        return;
    }

    fetch(`http://127.0.0.1:8000/api/meteo/${ville}`)
        .then(response => {
            if (!response.ok) throw new Error("Ville introuvable");
            return response.json();
        })
        .then(data => {
            resultat.innerHTML = `
                <div class="meteo-carte">
                    <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Icône de la météo">
                    <p>Il fait <strong>${data.temperature}°C</strong> à ${data.ville} (${data.description}).</p>
                    <p>💧 Humidité : ${data.humidity}% | 💨 Vent : ${data.vitesse_vent} m/s</p>
                </div>`;
        })
        .catch(error => {
            resultat.textContent = "Erreur : " + error.message;
        });
});

// ==========================================
// 3. ÉCOUTEUR POUR LA TOUCHE ENTRÉE
// ==========================================
document.getElementById('villeInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('rechercherBtn').click();
    }
});