import React, { useState, useEffect } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import UserList from "../components/UserList";

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const fetchUsers = async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_USER_RETRIEVE_URL);
            console.log("Fetched users response:", response.data);
    
            // Extract Documents from the response
            const usersArray = response.data?.users?.Documents || [];
            console.log("Extracted users array:", usersArray);
    
            setUsers(usersArray); // Set the extracted array in the state
        } catch (error) {
            console.error("Error fetching users:", error);
            setUsers([]); // Ensure users state is an empty array on error
        }
    };
    

    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter users based on search query
    useEffect(() => {
        setFilteredUsers(
            users.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, users]);

    const handleFormSubmit = async (user) => {
        try {
          if (user.userId) {
            // Update existing user
            const updatedUser = {
              ...user,
              createdAt: user.createdAt, // Preserve original `createdAt`
            };
            const url = `${process.env.REACT_APP_USER_UPDATE_URL}`;
            const response = await axios.put(url, updatedUser, {
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (response.status === 200) {
              setMessage("User updated successfully!");
              fetchUsers(); // Refresh the user list
              setEditingUser(null); // Reset editing state
            } else {
              setMessage("Failed to update user.");
            }
          } else {
            // Create new user
            const url = `${process.env.REACT_APP_USER_CREATE_URL}`;
            const response = await axios.post(url, user, {
              headers: {
                "Content-Type": "application/json",
              },
            });
      
            if (response.status === 201) {
              setMessage("User created successfully!");
              fetchUsers(); // Refresh the user list
            } else {
              setMessage("Failed to create user.");
            }
          }
        } catch (error) {
          console.error("Error saving user:", error);
          setMessage("An error occurred.");
        } finally {
          setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
        }
      };
      
    

    const handleEdit = (user) => {
        setEditingUser({
          userId: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          createdAt: user.createdAt,
        });
      };
    

    const handleDelete = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
    
        try {
            const url = `${process.env.REACT_APP_USER_DELETE_URL}&id=${userId}`;
            const response = await axios.delete(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            if (response.status === 200) {
                setMessage("User deleted successfully!");
                fetchUsers(); // Refresh the list
                setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
            } else {
                setMessage("Failed to delete user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setMessage("An error occurred.");
        }
    };
    
    
    return (
        <div>
            <h1 style={{ textAlign: "center", margin: "20px 0" }}>User Management</h1>
            {message && (
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                        color: message.includes("Failed") ? "red" : "green",
                    }}
                >
                    {message}
                </div>
            )}
            <div style={{ maxWidth: "500px", margin: "0 auto 20px" }}>
                <input
                    type="text"
                    placeholder="Search users by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                    }}
                />
            </div>
            <UserForm onSubmit={handleFormSubmit} initialData={editingUser} />
            <UserList users={filteredUsers} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default UserManagement;
