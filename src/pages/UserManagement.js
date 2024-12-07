import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./UserList";

const UserManagement = () => {
    const [users, setUsers] = useState([]); // Initialize the users state
    const [message, setMessage] = useState(""); // For user feedback

    // Fetch users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_USER_RETRIEVE_URL);
            setUsers(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
            setMessage(""); // Clear any previous messages
        } catch (error) {
            console.error("Error fetching users:", error);
            setMessage("Failed to fetch users. Please try again.");
        }
    };

    // Run fetchUsers once when the component mounts
    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle user edit
    const handleEdit = (user) => {
        console.log("Edit user:", user);
        // Implement edit logic here, such as opening a form or modal with user data
    };

    // Handle user delete
    const handleDelete = async (userId) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_USER_DELETE_URL}/${userId}`);
                fetchUsers(); // Refresh the users list
                setMessage("User deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
                setMessage("Failed to delete user. Please try again.");
            }
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center", color: "#333" }}>User Management</h1>
            {/* Display feedback messages */}
            {message && (
                <div style={{ margin: "10px 0", color: message.startsWith("Failed") ? "red" : "green" }}>
                    {message}
                </div>
            )}
            {/* Render the UserList component */}
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default UserManagement;
