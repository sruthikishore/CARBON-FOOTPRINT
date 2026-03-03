import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

const Landing = () => {
    return (
        <>
            <Navbar />

            {/* Hero Section */}
            <section className="bg-green-50 min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
                <h1 className="text-5xl md:text-6xl font-bold text-green-700 mb-6">
                    AI-Enhanced Carbon Footprint Predictor
                </h1>

                <p className="text-lg text-gray-600 max-w-2xl mb-8">
                    Analyze your household emissions, track sustainability goals,
                    and receive AI-powered recommendations to reduce your
                    environmental impact.
                </p>

                <Link
                    to="/signup"
                    className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                >
                    Get Started
                </Link>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-12">
                        Platform Features
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 shadow-lg rounded-xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-4 text-green-600">
                                Emission Analytics
                            </h3>
                            <p className="text-gray-600">
                                Detailed breakdown of transport, electricity, food,
                                and lifestyle emissions.
                            </p>
                        </div>

                        <div className="p-6 shadow-lg rounded-xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-4 text-green-600">
                                AI Predictions
                            </h3>
                            <p className="text-gray-600">
                                Forecast future carbon emissions using intelligent
                                prediction models.
                            </p>
                        </div>

                        <div className="p-6 shadow-lg rounded-xl hover:shadow-xl transition">
                            <h3 className="text-xl font-semibold mb-4 text-green-600">
                                Sustainability Goals
                            </h3>
                            <p className="text-gray-600">
                                Set reduction targets and monitor your progress
                                toward a greener lifestyle.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 text-center text-gray-600">
                © 2026 CarbonAI. All rights reserved.
            </footer>
        </>
    );
};

export default Landing;