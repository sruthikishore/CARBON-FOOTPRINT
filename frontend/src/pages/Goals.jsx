import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getGoalProgress } from "../services/api";

const Goals = () => {
    const [goalData, setGoalData] = useState(null);

    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await getGoalProgress();
                setGoalData(response.data);
            } catch (error) {
                console.error("Error fetching goal progress:", error);
            }
        };

        fetchGoal();
    }, []);

    const progress = goalData?.progressPercentage || 0;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 p-6">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Goal Summary */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            Sustainability Goal
                        </h2>

                        <p className="text-lg text-gray-600 mb-2">
                            {goalData?.goalDescription || "No goal set yet"}
                        </p>

                        <p className="text-green-600 font-semibold">
                            Target Reduction: {goalData?.targetReduction || 0}%
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-white shadow-lg rounded-2xl p-6">
                        <h3 className="text-xl font-semibold mb-4 text-gray-700">
                            Progress
                        </h3>

                        <div className="w-full bg-gray-200 rounded-full h-6">
                            <div
                                className="bg-green-600 h-6 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        <p className="mt-4 text-gray-700">
                            {progress}% completed
                        </p>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Goals;