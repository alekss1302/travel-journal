import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

const App = () => {
    const [users, setUsers] = useState([]); // Holds user list
    const [editingUser, setEditingUser] = useState(null); // Tracks user being edited
    const [message, setMessage] = useState(""); // Success/error messages

    // Fetch Users
    const fetchUsers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_USER_RETRIEVE_URL);
            setUsers(Array.isArray(response.data) ? response.data : []); // Ensure response is an array
        } catch (error) {
            console.error("Error fetching users:", error);
            setMessage("Error fetching users. Please check the backend.");
        }
    };
    

    useEffect(() => {
        fetchUsers();
        console.log(users); // Debug the state
    }, []);
    

    // Handle Create or Update
    const handleFormSubmit = async (formData) => {
        try {
            if (formData.userID) {
                // Update existing user
                await axios.put(`${process.env.REACT_APP_USER_UPDATE_URL}/${formData.userID}`, formData);
                setMessage("User updated successfully!");
            } else {
                // Create new user
                await axios.post(process.env.REACT_APP_USER_CREATE_URL, formData);
                setMessage("User created successfully!");
            }
            fetchUsers(); // Refresh user list
            setEditingUser(null); // Reset editing form
        } catch (error) {
            console.error("Error saving user:", error);
            setMessage("Error saving user. Please try again.");
        }
    };

    // Handle Edit
    const handleEdit = (user) => {
        setEditingUser(user);
    };

    // Handle Delete
    const handleDelete = async (userID) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await axios.delete(`${process.env.REACT_APP_USER_DELETE_URL}/${userID}`);
                setUsers(users.filter((user) => user.userID !== userID)); // Remove from state
                setMessage("User deleted successfully!");
            } catch (error) {
                console.error("Error deleting user:", error);
                setMessage("Error deleting user. Please try again.");
            }
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{ textAlign: "center" }}>User Management</h1>
            {message && <p style={{ color: "green" }}>{message}</p>}
            <UserForm onSubmit={handleFormSubmit} initialData={editingUser} />
            <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default App;
