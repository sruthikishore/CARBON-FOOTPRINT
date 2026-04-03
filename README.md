# 🌱 AI-Powered Carbon Footprint Tracker

A full-stack web application that helps users calculate their carbon footprint based on lifestyle activities and provides AI-driven sustainability suggestions.

---

## 🚀 Project Overview

This project allows users to:

* Input daily lifestyle activities (transport, energy, food, waste)
* Calculate their carbon emissions
* Visualize emissions using an interactive dashboard
* Receive AI-powered suggestions to reduce their carbon footprint
* Track activity history over time

---

## 🧠 AI & ML Integration

### 🤖 Machine Learning Model

* A trained model (RandomForest) is integrated for emission prediction
* Currently uses fallback logic due to feature mismatch
* Ensures system reliability even if ML prediction fails

### 💡 AI Suggestions (LLM)

* Uses **Groq API (Llama 3.1)**
* Generates personalized sustainability tips based on user data
* Optimized to return short, actionable suggestions

---

## 🛠 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Axios
* Recharts (for visualization)

### Backend

* FastAPI (Python)
* SQLAlchemy ORM
* JWT Authentication

### Database

* MySQL

### AI / ML

* Scikit-learn (RandomForest)
* Joblib (model loading)
* Groq API (Llama 3.1)

---

## 📂 Project Structure

```
backend/
│── app/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── auth.py
│   ├── database.py
│   ├── routes/
│   │   ├── activity_routes.py
│   │   ├── dashboard_routes.py
│   │   ├── auth_routes.py
│   │   ├── suggestions_routes.py
│
│── ml/
│   ├── predict.py
│   ├── suggestion.py
│   ├── carbon_model.pkl

frontend/
│── src/
│   ├── pages/
│   ├── components/
│   ├── services/
```

---

## ✨ Features

* 🔐 User Authentication (JWT)
* 📊 Dashboard with emission breakdown
* 🧾 Activity tracking & history
* 🤖 AI-powered sustainability suggestions
* ⚡ Fast API responses with FastAPI
* 🎨 Modern UI with Tailwind CSS

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/YOUR_USERNAME/carbon-footprint-tracker.git
cd carbon-footprint-tracker
```

---

### 2️⃣ Backend Setup

```
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```

---

### 4️⃣ Environment Variables

Create a `.env` file in `backend/`:

```
GROQ_API_KEY=your_api_key_here
SECRET_KEY=your_secret_key
```

---

## ⚠️ Important Notes

* The ML model currently expects more features than the UI provides
* A fallback calculation is used to maintain system functionality
* Future work includes retraining the model with updated inputs

---

## 🔮 Future Enhancements

* Retrain ML model with updated feature set
* Add goal tracking and progress monitoring
* Deploy to cloud (Render / Vercel)
* Improve UI with animations and dark mode
* Add real-time emission comparison

---

## 📸 Screenshots

*Add your project screenshots here*

---

## 👩‍💻 Author

**Jaishree J**
B.Tech IT Student
Web Developer | React | FastAPI

---

## 🌟 Acknowledgements

* Groq API (Llama 3.1)
* FastAPI
* React
* Scikit-learn

---

## 📌 Conclusion

This project demonstrates the integration of full-stack development with AI technologies to solve a real-world problem — helping users become more environmentally conscious through data and insights.

---
