import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header style={{ padding: "10px", background: "#333", color: "#fff", textAlign: "center" }}>
            <nav>
                <Link to="/" style={{ color: "#fff", margin: "0 10px" }}>Home</Link>
                <Link to="/user-management" style={{ color: "#fff", margin: "0 10px" }}>User Management</Link>
                <Link to="/journal-entries" style={{ color: "#fff", margin: "0 10px" }}>Journal Entries</Link>
            </nav>
        </header>
    );
};

export default Header;
