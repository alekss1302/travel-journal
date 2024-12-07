import React, { useState } from "react";

const UserForm = ({ onSubmit, initialData = {} }) => {
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        email: initialData?.email || "",
        bio: initialData?.bio || "",
        userID: initialData?.userID || null, // Include userID for updates
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData); // Pass formData to parent
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
            <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
                <label>Bio:</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange}></textarea>
            </div>
            <button type="submit" style={{ backgroundColor: "green", color: "white", padding: "5px 10px" }}>
                Submit
            </button>
        </form>
    );
};

export default UserForm;
