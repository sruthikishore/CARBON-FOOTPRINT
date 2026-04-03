from groq import Groq
import os

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def get_ai_suggestion(data, emission):

    prompt = f"""
User carbon footprint is {emission} kg CO2.

Transport: {data.get("vehicle_type")} - {data.get("vehicle_km_month")} km/month
Flights: {data.get("flight_frequency")}
Energy: {data.get("energy_source")}, efficiency: {data.get("energy_efficiency")}
Diet: {data.get("diet")}
Waste: {data.get("waste_level")}, recycling: {data.get("recycling")}

Give ONLY 3 short actionable suggestions.
Each suggestion must be one line.
No paragraph. No explanation.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content