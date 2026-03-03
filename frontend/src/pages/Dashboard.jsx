import { useEffect, useState } from "react";
import { getDashboard } from "../services/api";
import Navbar from "../components/Navbar";
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

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await getDashboard();
                setDashboardData(response.data);
            } catch (error) {
                console.error("Error fetching dashboard:", error);
            }
        };

        fetchDashboard();
    }, []);

    const totalEmission = dashboardData?.totalEmission || 0;
    const pieData = dashboardData?.breakdown || [];
    const lineData = dashboardData?.monthlyTrend || [];

    const COLORS = ["#16a34a", "#22c55e", "#4ade80", "#86efac"];

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 p-6">
                <div className="max-w-7xl mx-auto space-y-8">

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