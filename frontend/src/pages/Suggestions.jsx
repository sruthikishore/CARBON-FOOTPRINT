import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getRecommendations } from "../services/api";

const Suggestions = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await getRecommendations();
                setRecommendations(response.data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 p-6">
                <div className="max-w-6xl mx-auto space-y-8">

                    <h2 className="text-3xl font-bold text-green-700">
                        AI Sustainability Recommendations
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {recommendations.length === 0 ? (
                            <p className="text-gray-600">
                                No recommendations available yet.
                            </p>
                        ) : (
                            recommendations.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition"
                                >
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                                        Recommendation {index + 1}
                                    </h3>
                                    <p className="text-gray-600">
                                        {item.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default Suggestions;