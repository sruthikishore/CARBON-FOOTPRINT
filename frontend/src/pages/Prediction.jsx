import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getPredictions } from "../services/api";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Prediction = () => {
    const [predictionData, setPredictionData] = useState([]);

    useEffect(() => {
        const fetchPredictions = async () => {
            try {
                const response = await getPredictions();
                setPredictionData(response.data);
            } catch (error) {
                console.error("Error fetching predictions:", error);
            }
        };

        fetchPredictions();
    }, []);

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 p-6">
                <div className="max-w-6xl mx-auto space-y-8">

                    {/* Chart */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                            Future Emission Predictions
                        </h2>

                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={predictionData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="predictedEmission"
                                    stroke="#16a34a"
                                    strokeWidth={3}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Table */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">
                            Monthly Prediction Table
                        </h3>

                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-green-100">
                                    <th className="p-3 text-left">Month</th>
                                    <th className="p-3 text-left">Predicted CO₂ (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {predictionData.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="p-3">{item.month}</td>
                                        <td className="p-3">{item.predictedEmission}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Prediction;