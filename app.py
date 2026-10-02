import requests
import os
from dotenv import load_dotenv

load_dotenv() 
api_key = os.getenv("API_KEY")

ville = "Nantes"
url = f"http://api.openweathermap.org/data/2.5/weather?q={ville}&appid={api_key}&units=metric&lang=fr"
response = requests.get(url)
#print(f"Code de statut : {response.status_code}")

#Traitement des données
if response.status_code == 200:
    donnees = response.json()
    temperature = donnees["main"]["temp"]

    description = donnees["weather"][0]["description"]

    print(f"La température à {ville} est de {temperature}°C ({description}).")
else:
    print(f"Erreur lors de la récupération des données météo : {response.status_code}")