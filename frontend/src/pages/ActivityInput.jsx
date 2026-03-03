import Navbar from "../components/Navbar";
import { useState } from "react";

const ActivityInput = () => {
    const [formData, setFormData] = useState({
        transportType: "",
        distancePerWeek: "",
        fuelType: "",
        electricityUsage: "",
        flightsPerYear: "",
        shoppingFrequency: "",
        wasteGenerated: "",
        dietType: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Activity Data:", formData);
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-green-50 py-10 px-4">
                <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-10">
                    <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
                        Enter Your Lifestyle Data
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* Transportation */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                                Transportation
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    name="transportType"
                                    placeholder="Transport Type (Car/Bus/Train)"
                                    onChange={handleChange}
                                    className="p-3 border rounded-lg"
                                />
                                <input
                                    type="number"
                                    name="distancePerWeek"
                                    placeholder="Distance per week (km)"
                                    onChange={handleChange}
                                    className="p-3 border rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="fuelType"
                                    placeholder="Fuel Type"
                                    onChange={handleChange}
                                    className="p-3 border rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Electricity */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                                Electricity
                            </h3>

                            <input
                                type="number"
                                name="electricityUsage"
                                placeholder="Monthly electricity usage (kWh)"
                                onChange={handleChange}
                                className="p-3 border rounded-lg w-full"
                            />
                        </div>

                        {/* Lifestyle */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                                Lifestyle
                            </h3>

                            <div className="grid md:grid-cols-3 gap-4">
                                <input
                                    type="number"
                                    name="flightsPerYear"
                                    placeholder="Flights per year"
                                    onChange={handleChange}
                                    className="p-3 border rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="shoppingFrequency"
                                    placeholder="Online shopping frequency"
                                    onChange={handleChange}
                                    className="p-3 border rounded-lg"
                                />
                                <input
                                    type="text"
                                    name="wasteGenerated"
                                    placeholder="Waste generated (kg)"
                                    onChange={handleChange}
                                    className="p-3 border rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Food Habits */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                                Food Habits
                            </h3>

                            <select
                                name="dietType"
                                onChange={handleChange}
                                className="p-3 border rounded-lg w-full"
                            >
                                <option value="">Select Diet Type</option>
                                <option value="vegetarian">Vegetarian</option>
                                <option value="non-vegetarian">Non-Vegetarian</option>
                                <option value="vegan">Vegan</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
                        >
                            Calculate Carbon Footprint
                        </button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default ActivityInput;