# 🌤️ Application Météo - Liquid Glass Design

Une application web de météo moderne, élégante et réactive. Ce projet intègre une interface utilisateur basée sur la tendance **"Liquid Glass" (Glassmorphism)**, offrant une expérience fluide avec des animations soignées. 

L'application permet aux utilisateurs de :
- Rechercher la météo en temps réel d'une ville spécifique.
- Détecter automatiquement la météo de leur emplacement actuel grâce à la géolocalisation du navigateur.

## 🛠️ Technologies et Architecture

Ce projet repose sur une architecture découplée (Frontend / Backend) :

*   **Frontend :** HTML5, CSS3 (Variables natives, animations, Glassmorphism), JavaScript Vanilla (API Fetch, Geolocation API).
*   **Backend :** Python 3, **FastAPI** (pour la création des routes API), Uvicorn (Serveur ASGI), `requests` (pour l'appel à l'API distante).
*   **API Externe :** [OpenWeatherMap](https://openweathermap.org/api)

## ⚖️ Conformité Légale (RGPD & CNIL)

Ce projet a été développé en respectant les principes de confidentialité des données (*Privacy by Design*) :
*   **Consentement explicite :** L'accès à la position de l'utilisateur repose strictement sur l'API native `navigator.geolocation` du navigateur. Aucune localisation n'est forcée sans l'accord préalable via la fenêtre d'autorisation du navigateur.
*   **Minimisation et zéro stockage :** Le serveur ne possède aucune base de données. Les coordonnées GPS et les historiques de recherche ne sont pas sauvegardés côté backend et ne vivent que le temps de la requête (principe de minimisation).
*   **Transparence :** Les données de localisation ou les noms de villes sont uniquement transmis à l'API tierce OpenWeatherMap dans le but exclusif de récupérer les données météorologiques. Aucune donnée n'est revendue ou exploitée à des fins commerciales.

---

## 📋 Prérequis

Pour exécuter ce projet localement, vous devez avoir installé :
*   [Python 3.8 ou supérieur](https://www.python.org/downloads/)
*   Git
*   Une clé API gratuite générée sur [OpenWeatherMap](https://openweathermap.org/).

---

## 🚀 Installation

**1. Cloner le dépôt**
```bash
git clone [https://github.com/votre-nom-utilisateur/meteo-app.git](https://github.com/votre-nom-utilisateur/meteo-app.git)
cd meteo-app
```

**2. Créer et activer un environnement virtuel (Recommandé)**
* Sur Linux / macOS :
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```
* Sur Windows :
  ```bash
  python -m venv venv
  venv\Scripts\activate
  ```

**3. Installer les dépendances Python**
```bash
pip install -r requirements.txt
```

**4. Configurer les variables d'environnement**
Créez un fichier `.env` à la racine du projet et insérez-y votre clé API OpenWeatherMap :
```env
API_KEY=votre_cle_api_openweathermap_ici
```

---

## 💻 Utilisation (Lancement des serveurs locaux)

En raison des restrictions de sécurité des navigateurs modernes concernant la géolocalisation, le frontend doit être servi via un serveur local. Vous aurez besoin de **deux terminaux** ouverts à la racine du projet.

**Étape 1 : Lancer le Backend (FastAPI)**
Dans votre premier terminal (avec l'environnement virtuel activé) :
```bash
uvicorn app:app --reload
```
*L'API est désormais accessible sur `http://127.0.0.1:8000`*

**Étape 2 : Lancer le Frontend (Serveur Web)**
Dans votre second terminal :
```bash
python -m http.server 5500
```

**Étape 3 : Ouvrir l'application**
Rendez-vous dans votre navigateur web à l'adresse exacte suivante :
👉 **`http://127.0.0.1:5500`**