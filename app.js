document.getElementById('rechercherBtn').addEventListener('click', () => {
    const villeInput = document.getElementById('villeInput');
    // 1. On récupère la ville tapée
    const ville = villeInput.value;
    const resultat = document.getElementById('resultatMeteo');

    // 2. On vide le champ immédiatement pour la prochaine recherche
    villeInput.value = '';

    if (!ville) {
        resultat.textContent = "Veuillez entrer une ville.";
        return;
    }

    // 3. Interrogation API FastAPI
    fetch(`http://127.0.0.1:8000/api/meteo/${ville}`)
        .then(response => {
            if (!response.ok) throw new Error("Ville introuvable");
            return response.json();
        })
        .then(data => {
            // 4. On affiche le résultat sur la page
            resultat.innerHTML = `
                <div class="meteo-carte">
                    <img src="https://openweathermap.org/img/wn/${data.icon}@2x.png" alt="Icône de la météo">
                    <p>Il fait <strong>${data.temperature}°C</strong> à ${data.ville} (${data.description}).</p>
                    <p>💧 Humidité : ${data.humidite}% | 💨 Vent : ${data.vitesse_vent} m/s</p>
                </div>`;
        })
        .catch(error => {
            resultat.textContent = "Erreur : " + error.message;
        });
});

// Écouteur pour la touche Entrée
document.getElementById('villeInput').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        document.getElementById('rechercherBtn').click();
    }
});