import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getActivityHistory } from "../services/api";
import { Link } from "react-router-dom";

const ActivityHistory = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const res = await getActivityHistory();
        setActivities(res.data);
    };

    if (activities.length === 0) {
        return (
            <>
                <Navbar />

                <div className="min-h-screen flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">
                        No activity history yet
                    </h2>

                    <Link
                        to="/activity"
                        className="bg-green-600 text-white px-6 py-3 rounded-lg"
                    >
                        Add Activity
                    </Link>

                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 p-6">
                <h2 className="text-2xl font-bold mb-6">Activity History</h2>

                <div className="grid md:grid-cols-2 gap-6">

                    {activities.map((a, index) => (

                        <div
                            key={index}
                            className="bg-white shadow-md rounded-xl p-6 border"
                        >

                            <p className="text-gray-500 text-sm mb-2">
                                📅 {a.created_at ? new Date(a.created_at).toLocaleDateString() : "No Date"}
                            </p>

                            <p className="text-gray-700">
                                🚗 Transport:
                                <span className="font-semibold ml-2">
                                    {a.transport_type}
                                </span>
                            </p>

                            <p className="text-gray-700">
                                ⚡ Electricity:
                                <span className="font-semibold ml-2">
                                    {a.electricity_usage}
                                </span>
                            </p>

                            <p className="text-green-600 font-bold mt-2">
                                🌍 {a.total_emission} kg CO₂
                            </p>

                        </div>

                    ))}

                </div>
            </div>
        </>
    );
};

export default ActivityHistory;