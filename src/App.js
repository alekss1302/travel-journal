import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserManagement from "./pages/UserManagement";
import JournalManagement from "./pages/JournalManagement";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    const handleFormSubmit = async (data) => {
        try {
            // API call logic...
            toast.success("User saved successfully!");
        } catch (error) {
            toast.error("Error saving user.");
        }
    };

    return (
        <div>
            <ToastContainer />
            {
                <Router>
                    <Header />
                    <main style={{ minHeight: "80vh" }}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/user-management" element={<UserManagement />} />
                            <Route path="/journal-entries" element={<JournalManagement />} />
                        </Routes>
                    </main>
                    <Footer />
                </Router>
            }
        </div>
    );
};

export default App;
