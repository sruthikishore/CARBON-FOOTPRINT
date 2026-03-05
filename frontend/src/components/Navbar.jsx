import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-green-600">
                    CarbonAI
                </h1>

                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-green-600">
                        Home
                    </Link>

                    {!user ? (
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-green-600">
                                Login
                            </Link>
                            <Link to="/signup" className="text-gray-700 hover:text-green-600">
                                Signup
                            </Link>

                        </>
                    ) : (
                        <>
                            <Link
                                to="/activity"
                                className="text-gray-700 hover:text-green-600"
                            >
                                Activity
                            </Link>

                            <Link
                                to="/history"
                                className="text-gray-700 hover:text-green-600"
                            >
                                History
                            </Link>

                            <Link
                                to="/dashboard"
                                className="text-gray-700 hover:text-green-600"
                            >
                                Dashboard
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="text-red-500 hover:text-red-600 font-medium"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;