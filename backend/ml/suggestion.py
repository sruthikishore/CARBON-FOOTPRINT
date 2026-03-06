from groq import Groq
import os

client = Groq(api_key="")


def get_ai_suggestion(user_data, question):

    prompt = f"""
    A user has the following lifestyle data:

    {user_data}

    The user asks: {question}

    Provide practical ways to reduce carbon footprint.
    """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.choices[0].message.content


if __name__ == "__main__":

    user_data = {
        "Transport": "car",
        "Vehicle Monthly Distance Km": 300,
        "Frequency of Traveling by Air": "frequently",
        "Energy efficiency": "no"
    }

    question = "How can I reduce transport emissions?"

    result = get_ai_suggestion(user_data, question)

    print("\nAI Suggestion:\n")
    print(result)