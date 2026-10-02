document.getElementById('rechercherBtn').addEventListener('click', () => {
    // 1. On récupère la ville tapée
    const ville = document.getElementById('villeInput').value;
    const resultat = document.getElementById('resultatMeteo');

    if (!ville) {
        resultat.textContent = "Veuillez entrer une ville.";
        return;
    }

    // 2. Interrogation API FastAPI
    fetch(`http://127.0.0.1:8000/api/meteo/${ville}`)
        .then(response => {
            if (!response.ok) throw new Error("Ville introuvable");
            return response.json();
        })
        .then(data => {
            // 3. On affiche le résultat sur la page
            resultat.textContent = `Il fait ${data.temperature}°C à ${data.ville} (${data.description}).`;
        })
        .catch(error => {
            resultat.textContent = "Erreur : " + error.message;
        });
});