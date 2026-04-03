import { submitActivity } from "../services/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

const ActivityInput = () => {

    // ✅ FIX 1 — Hooks inside component
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        vehicle_type: "",
        vehicle_km_month: "",
        flight_frequency: "",

        energy_source: "",
        energy_efficiency: false,
        tv_pc_hours: "",
        internet_hours: "",

        diet: "",
        grocery_bill: "",
        cooking_method: "",

        waste_level: "",
        recycling: "",

        screen_time: "",
        shower_frequency: ""
    });

    const navigate = useNavigate();

    const nextStep = () => {
        if (!validateStep()) {
            alert("Please fill all fields before continuing");
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) {
            alert("Please fill all fields before submitting");
            return;
        }

        try {
            await submitActivity({
                ...formData,
                vehicle_km_month: Number(formData.vehicle_km_month),
                tv_pc_hours: Number(formData.tv_pc_hours),
                internet_hours: Number(formData.internet_hours),
                grocery_bill: Number(formData.grocery_bill),
                screen_time: Number(formData.screen_time),
            });

            navigate("/dashboard");

        } catch (error) {
            console.error(error);
            alert(error.response?.data?.detail || "Failed to save activity");
        }

        console.log("Submitting...");
        console.log(formData);

    };

    // ✅ FIX 2 — renderStep inside component BEFORE return
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className="space-y-5">

                        <h3 className="text-lg font-semibold">🚗 Transport</h3>

                        {/* Vehicle */}
                        <div>
                            <label className="block mb-1 font-medium">
                                How do you usually travel?
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.vehicle_type}
                                onChange={(e) => setFormData({ ...formData, vehicle_type: e.target.value })}
                            >
                                <option value="">Select vehicle</option>
                                <option value="car">Car</option>
                                <option value="bus">Bus</option>
                                <option value="train">Train</option>
                                <option value="bike">Bike</option>
                                <option value="walk">Walk</option>
                            </select>
                        </div>

                        {/* KM */}
                        <div>
                            <label className="block mb-1 font-medium">
                                How many kilometers do you travel per month?
                            </label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={formData.vehicle_km_month}
                                placeholder="e.g. 200"
                                onChange={(e) => setFormData({ ...formData, vehicle_km_month: e.target.value })}
                            />

                        </div>

                        {/* Flights */}
                        <div>
                            <label className="block mb-1 font-medium">
                                How often do you take flights?
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.flight_frequency}
                                onChange={(e) => setFormData({ ...formData, flight_frequency: e.target.value })}
                            >
                                <option value="">Select frequency</option>
                                <option value="never">Never</option>
                                <option value="rarely">Rarely (1–2/year)</option>
                                <option value="sometimes">Sometimes (3–5/year)</option>
                                <option value="frequently">Frequently (6+)</option>
                            </select>
                        </div>

                    </div>
                );

            case 2:
                return (
                    <div className="space-y-5">

                        <h3 className="text-lg font-semibold">⚡ Energy</h3>

                        <div>
                            <label className="block mb-1 font-medium">
                                What is your main energy source?
                            </label>
                            <select className="w-full border p-2 rounded"
                                value={formData.energy_source}
                                onChange={(e) => setFormData({ ...formData, energy_source: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="electricity">Electricity</option>
                                <option value="gas">Gas</option>
                                <option value="mixed">Mixed</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Do you use energy-efficient appliances?
                            </label>
                            <select className="w-full border p-2 rounded"
                                value={formData.energy_efficiency ? "yes" : ""}
                                onChange={(e) => setFormData({ ...formData, energy_efficiency: e.target.value === "yes" })}
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                TV/PC usage (hours/day)
                            </label>
                            <input type="number" className="w-full border p-2 rounded"
                                value={formData.tv_pc_hours}
                                onChange={(e) => setFormData({ ...formData, tv_pc_hours: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">
                                Internet/device usage (hours/day)
                            </label>
                            <input type="number" className="w-full border p-2 rounded"
                                value={formData.internet_hours}
                                onChange={(e) => setFormData({ ...formData, internet_hours: e.target.value })}
                            />
                        </div>

                    </div>
                );

            case 3:
                return (
                    <div className="space-y-5">

                        <h3 className="text-lg font-semibold">🍽️ Food</h3>

                        {/* Diet */}
                        <div>
                            <label className="block mb-1 font-medium">
                                What type of diet do you follow?
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.diet}
                                onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                            >
                                <option value="">Select diet</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="non-vegetarian">Non-Vegetarian</option>
                                <option value="vegan">Vegan</option>
                            </select>
                        </div>

                        {/* Grocery */}
                        <div>
                            <label className="block mb-1 font-medium">
                                How much do you spend on groceries per month (₹)?
                            </label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={formData.grocery_bill}
                                placeholder="e.g. 8000"
                                onChange={(e) => setFormData({ ...formData, grocery_bill: e.target.value })}
                            />
                        </div>

                        {/* Cooking */}
                        <div>
                            <label className="block mb-1 font-medium">
                                What is your primary cooking method?
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.cooking_method}
                                onChange={(e) => setFormData({ ...formData, cooking_method: e.target.value })}
                            >
                                <option value="">Select method</option>
                                <option value="gas">Gas stove</option>
                                <option value="electric">Electric stove</option>
                                <option value="mixed">Mixed</option>
                            </select>
                        </div>

                    </div>
                );

            case 4:
                return (
                    <div className="space-y-5">

                        <h3 className="text-lg font-semibold">🗑️ Waste</h3>

                        {/* Waste level */}
                        <div>
                            <label className="block mb-1 font-medium">
                                How much waste does your household generate?
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.waste_level}
                                onChange={(e) => setFormData({ ...formData, waste_level: e.target.value })}
                            >
                                <option value="">Select level</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </div>

                        {/* Recycling */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Do you recycle regularly?
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.recycling}
                                onChange={(e) => setFormData({ ...formData, recycling: e.target.value })}
                            >
                                <option value="">Select option</option>
                                <option value="yes">Yes</option>
                                <option value="sometimes">Sometimes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                    </div>
                );

            case 5:
                return (
                    <div className="space-y-5">

                        <h3 className="text-lg font-semibold">📱 Lifestyle</h3>

                        {/* Screen time */}
                        <div>
                            <label className="block mb-1 font-medium">
                                Total screen time per day (hours)
                            </label>
                            <input
                                type="number"
                                className="w-full border p-2 rounded"
                                value={formData.screen_time}
                                placeholder="e.g. 6"
                                onChange={(e) => setFormData({ ...formData, screen_time: e.target.value })}
                            />
                        </div>

                        {/* Shower */}
                        <div>
                            <label className="block mb-1 font-medium">
                                How often do you shower?
                            </label>
                            <select
                                className="w-full border p-2 rounded"
                                value={formData.shower_frequency}
                                onChange={(e) => setFormData({ ...formData, shower_frequency: e.target.value })}
                            >
                                <option value="">Select frequency</option>
                                <option value="once">Once a day</option>
                                <option value="twice">Twice a day</option>
                                <option value="few_days">Every few days</option>
                            </select>
                        </div>

                    </div>
                );

            default:
                return null;
        }
    };

    const validateStep = () => {
        switch (step) {
            case 1:
                return formData.vehicle_type && formData.vehicle_km_month && formData.flight_frequency;

            case 2:
                return formData.energy_source && formData.tv_pc_hours && formData.internet_hours;

            case 3:
                return formData.diet && formData.grocery_bill && formData.cooking_method;

            case 4:
                return formData.waste_level && formData.recycling;

            case 5:
                return formData.screen_time && formData.shower_frequency;

            default:
                return true;
        }
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 py-10 px-4">
                <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">

                    <h2 className="text-2xl font-bold text-center mb-4">
                        Step {step} of 5
                    </h2>

                    <div className="w-full bg-gray-200 h-2 rounded mb-6">
                        <div
                            className="bg-green-500 h-2 rounded"
                            style={{ width: `${(step / 5) * 100}%` }}
                        />
                    </div>

                    {renderStep()}

                    <div className="flex justify-between mt-6">
                        {step > 1 && (
                            <button onClick={prevStep} className="px-4 py-2 bg-gray-300 rounded">
                                Back
                            </button>
                        )}

                        {step < 5 ? (
                            <button onClick={nextStep} className="px-4 py-2 bg-green-600 text-white rounded">
                                Next
                            </button>
                        ) : (
                            <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded">
                                Submit
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default ActivityInput;