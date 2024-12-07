import React from "react";

const UserList = ({ users, onEdit, onDelete }) => {
    if (users.length === 0) return <p>No users found.</p>;

    return (
        <table style={{ width: "100%", borderCollapse: "collapse", margin: "20px 0" }}>
            <thead>
                <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Name</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Email</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Bio</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.userID}>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.name}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.email}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>{user.bio}</td>
                        <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                            <button onClick={() => onEdit(user)} style={{ marginRight: "10px" }}>
                                Edit
                            </button>
                            <button onClick={() => onDelete(user.userID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default UserList;
