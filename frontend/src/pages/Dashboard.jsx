import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getSuggestions } from "../services/api";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
} from "recharts";

const Dashboard = () => {

    const [dashboardData, setDashboardData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [suggestion, setSuggestion] = useState("");

    const navigate = useNavigate();

    const location = useLocation();
    const successMessage = location.state?.message;

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await getDashboard();
                setDashboardData(response.data);

                await fetchSuggestion();

            } catch (error) {
                console.error("Error fetching dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchSuggestion = async () => {
            try {
                const res = await getSuggestions({
                    user_data: {
                        transport: pieData?.find(item => item.name === "Transport")?.value || 0,
                        electricity: pieData?.find(item => item.name === "Electricity")?.value || 0
                    },
                    question: "How can I reduce my carbon footprint?"
                });

                setSuggestion(res.data.suggestion);

            } catch (error) {
                console.error("Suggestion error:", error);
            }
        };

        fetchDashboard();
    }, []);

    const totalEmission = dashboardData?.totalEmission || 0;
    const pieData = dashboardData?.breakdown || [];
    const lineData = dashboardData?.monthlyTrend || [];

    const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center bg-green-50">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-green-600"></div>
                </div>
            </>
        );
    }

    if (totalEmission === 0) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">
                        No activity yet
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Add your lifestyle data to calculate your carbon footprint
                    </p>

                    <button
                        onClick={() => navigate("/activity")}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                    >
                        Add Your Lifestyle Data
                    </button>
                </div>
            </>
        );
    }

    if (!dashboardData || dashboardData.total_emission === 0) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
                    <h2 className="text-3xl font-bold text-gray-700 mb-4">
                        No activity data yet
                    </h2>

                    <p className="text-gray-500 mb-6">
                        Add your lifestyle data to calculate your carbon footprint.
                    </p>

                    <button
                        onClick={() => navigate("/activity")}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
                    >
                        Add Your Lifestyle Data
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 p-6">
                <div className="max-w-7xl mx-auto space-y-8">

                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                            ✅ {successMessage}
                        </div>
                    )}

                    {/* Category Cards */}
                    <div className="grid md:grid-cols-4 gap-6">
                        {pieData.map((item, index) => (
                            <div key={index} className="bg-white shadow-md rounded-xl p-4">
                                <h4 className="text-gray-500 text-sm">{item.name}</h4>
                                <p className="text-2xl font-bold text-green-600">
                                    {item.value} kg
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                            Total Monthly Emission
                        </h2>
                        <p className="text-4xl font-bold text-green-600">
                            {totalEmission} kg CO₂
                        </p>
                    </div>

                    {/* Charts Grid */}
                    <div className="grid md:grid-cols-2 gap-8">

                        {/* AI Suggestions */}
                        <div className="bg-white shadow-lg rounded-2xl p-6">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">
                                AI Sustainability Suggestions
                            </h3>

                            <p className="text-gray-600">
                                {suggestion || "Generating suggestions..."}
                            </p>
                        </div>

                        {/* Pie Chart */}
                        <div className="bg-white shadow-lg rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                                Emission Breakdown
                            </h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={100}
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Line Chart */}
                        <div className="bg-white shadow-lg rounded-2xl p-6">
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                                Monthly Trend
                            </h3>

                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={lineData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="emission"
                                        stroke="#16a34a"
                                        strokeWidth={3}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;