import os
import requests
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("API_KEY")


# Initialisation de l'application FastAPI
app = FastAPI(title="Météo API")

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Autorise toutes les origines pour le développement
    allow_methods=["*"],
)

@app.get("/api/meteo/{ville}")
def get_weather(ville: str):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={ville}&appid={api_key}&units=metric&lang=fr"
    response = requests.get(url)
    
    if response.status_code == 200:
        donnees = response.json()
        # FastAPI convertit automatiquement ce dictionnaire en réponse JSON propre
        return {
            "ville": ville.capitalize(),
            "temperature": donnees["main"]["temp"],
            "description": donnees["weather"][0]["description"]
        }
    else:
        # On renvoie une vraie erreur HTTP au client si la ville n'existe pas
        raise HTTPException(status_code=response.status_code, detail="Ville introuvable ou erreur réseau")
    