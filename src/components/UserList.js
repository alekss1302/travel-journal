import React, { useState } from "react";

const UserList = ({ users, onEdit, onDelete }) => {
    console.log("Users in UserList:", users);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5; // Number of users to show per page

    // Calculate the indexes of the current page
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (!users.length) {
        return <p style={{ textAlign: "center", marginTop: "20px" }}>No users found.</p>;
    }

    return (
        <div style={{ maxWidth: "900px", margin: "20px auto", overflowX: "auto" }}>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    textAlign: "left",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "5px",
                }}
            >
                <thead>
                    <tr
                        style={{
                            backgroundColor: "#007BFF",
                            color: "white",
                            textAlign: "center",
                            fontWeight: "bold",
                        }}
                    >
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>ID</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Email</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Bio</th>
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Created At</th> {/* New Column */}
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Updated At</th> {/* New Column */}
                        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map((user, index) => (
                        <tr
                            key={user.id} // Use `id` instead of `userId`
                            style={{
                                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e6f7ff")}
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    index % 2 === 0 ? "#f9f9f9" : "white")
                            }
                        >
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {user.id || "N/A"}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {user.name}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {user.email}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {user.bio || "N/A"}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {user.createdAt ? new Date(user.createdAt).toLocaleString() : "N/A"} {/* Format timestamp */}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"} {/* Format timestamp */}
                            </td>
                            <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                                <button
                                    onClick={() => onEdit(user)}
                                    style={{
                                        marginRight: "5px",
                                        padding: "5px 10px",
                                        backgroundColor: "#FFC107",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(user.id)} // Use `id` instead of `userId`
                                    style={{
                                        padding: "5px 10px",
                                        backgroundColor: "#DC3545",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div style={{ textAlign: "center", margin: "20px 0" }}>
                {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        style={{
                            margin: "0 5px",
                            padding: "5px 10px",
                            backgroundColor: currentPage === index + 1 ? "#007BFF" : "#f0f0f0",
                            color: currentPage === index + 1 ? "#fff" : "#000",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                            cursor: "pointer",
                        }}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default UserList;
